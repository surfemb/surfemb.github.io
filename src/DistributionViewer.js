import React, {useRef, useEffect} from 'react';
import * as utils from "./utils";

export default function DistributionViewer(props) {
    const {urlRoot, embDim} = props
    const nTextures = embDim / 3
    const textureRange = [...Array(nTextures).keys()]

    const canvasRef = useRef(null)
    const imgCanvasCursorRef = useRef(null)
    const queryCanvasCursorRef = useRef(null)
    const canvasCursorRefs = [imgCanvasCursorRef, queryCanvasCursorRef]

    let queries = null
    let query = null
    let max_act = null
    let alpha = null

    utils.loadFloat32Array(urlRoot + '-queries.bin', data => {
        queries = data;
    })

    let cursorPos = null;

    const mouseMove = event => {
        let {x, y} = utils.getRelativeMousePos(event)
        y = Math.min(223, Math.max(0, y))
        x = Math.min(223, Math.max(0, x))
        cursorPos = [x, y]
        if (queries !== null) {
            const l = (Math.round(y) * 224 + Math.round(x)) * (embDim + 2)
            query = queries.slice(l, l + embDim)
            max_act = queries[l + embDim]
            alpha = queries[l + embDim + 1]
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl2')
        //gl.getExtension('OES_texture_float')
        //TODO: change back to webgl with OES texture float support to support IOS
        let animationFrameId

        const vertexShader = utils.createShader(gl, gl.VERTEX_SHADER, `#version 300 es
            in vec4 pos;
            out vec2 vTextureCoord;           
            void main() {
                gl_Position = pos;
                vTextureCoord = pos.xy * vec2(0.5, -0.5) + 0.5;
            }
        `)

        const fragmentShader = utils.createShader(gl, gl.FRAGMENT_SHADER, `#version 300 es
            precision mediump float;
            in vec2 vTextureCoord;
            ${textureRange.map(i => 'uniform sampler2D keySampler' + i + ';').join('\n')}
            ${textureRange.map(i => 'uniform vec3 q' + i + ';').join('\n')}
            uniform float a;
            uniform float alpha;
            out vec4 outCol;
            void main() {
                ${textureRange.map(i => 'vec3 k' + i + '=texture(keySampler' + i + ',vTextureCoord).xyz;').join('\n')}
                vec3 dpv = ${textureRange.map(i => 'q' + i + '*k' + i).join('+')};
                float dp = dpv.x + dpv.y + dpv.z;
                float v = pow(exp(dp - a), 0.5) * alpha;
                if (${textureRange.map(i => ['x', 'y', 'z'].map(x => 'k' + i + '.' + x + '==0.').join('&&')).join('&&')})
                    v = 0.;
                outCol = vec4(v, 0., 0., v);
            }
        `)

        const program = utils.createProgram(gl, vertexShader, fragmentShader);

        const posBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            -1., 1., 1., 1., 1., -1.,
            -1., 1., 1., -1., -1, -1,
        ]), gl.STATIC_DRAW)
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

        const keyTextures = textureRange.map(() => gl.createTexture())
        keyTextures.forEach((tex, i) => {
            gl.bindTexture(gl.TEXTURE_2D, tex)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
            utils.loadFloat32Array(urlRoot + '-keys-' + i + '.bin', data => {
                gl.bindTexture(gl.TEXTURE_2D, tex)
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB32F, 224, 224, 0, gl.RGB, gl.FLOAT, data)
            })
        })

        const posLoc = gl.getAttribLocation(program, 'pos')
        const keySamplerLocs = textureRange.map(i => gl.getUniformLocation(program, 'keySampler' + i))
        const qLocs = textureRange.map(i => gl.getUniformLocation(program, 'q' + i))
        const aLoc = gl.getUniformLocation(program, 'a')
        const alphaLoc = gl.getUniformLocation(program, 'alpha')

        // cursor
        const ctxs = canvasCursorRefs.map(ref => ref.current.getContext('2d'))

        let lastQuery = null;
        gl.clearColor(0.0, 0.0, 0.0, 0.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        const render = () => {
            if (lastQuery !== query) {
                lastQuery = query

                gl.clearColor(0.0, 0.0, 0.0, 0.0)
                gl.clear(gl.COLOR_BUFFER_BIT)
                gl.useProgram(program)

                gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
                gl.enableVertexAttribArray(posLoc)
                gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

                textureRange.forEach((i) => {
                    gl.activeTexture(gl['TEXTURE' + i])
                    gl.bindTexture(gl.TEXTURE_2D, keyTextures[i])
                    gl.uniform1i(keySamplerLocs[i], i)
                })

                if (query !== null) {
                    qLocs.forEach((qLoc, i) => {
                        gl.uniform3fv(qLoc, query.slice(i * 3, (i + 1) * 3))
                    })
                    gl.uniform1fv(aLoc, [max_act])
                    gl.uniform1fv(alphaLoc, [alpha])

                    gl.drawArrays(gl.TRIANGLES, 0, 6)
                }

                // cursor
                //ctx.clearColor(0., 0., 0., 0.)
                ctxs.forEach(ctx => {
                    ctx.clearRect(0, 0, 224, 224)
                    if (query !== null) {
                        ctx.beginPath()
                        ctx.arc(...cursorPos, 8, 0, Math.PI * 2)
                        ctx.strokeStyle = 'white'
                        ctx.stroke()
                    }
                })
            }
            animationFrameId = window.requestAnimationFrame(render)
        };
        render()

        return () => window.cancelAnimationFrame(animationFrameId)
    })

    const containerStyle = {position: 'relative', width: 224, height: 224, borderRadius: 10, overflow: 'hidden'}
    const imgStyle = {width: 224, height: 224}
    const canvasStyle = {
        width: 224, height: 224, position: 'absolute',
        left: 0, top: 0, cursor: 'none', touchAction: 'none'
    }

    return [
        <div style={containerStyle} key={0}>
            <img src={urlRoot + '-img.png'} alt="input" style={imgStyle}/>
            <canvas ref={canvasRef} width="224" height="224" style={canvasStyle}/>
            <canvas ref={imgCanvasCursorRef} width="224" height="224" style={canvasStyle}
                    onMouseMove={mouseMove} onTouchMove={mouseMove}
                    onMouseLeave={() => query = null}
            />
        </div>,
        <div style={containerStyle} key={1}>
            <img src={urlRoot + '-queryimg.png'} alt="queries" style={imgStyle}/>
            <canvas ref={queryCanvasCursorRef} width="224" height="224" style={canvasStyle}
                    onMouseMove={mouseMove} onTouchMove={mouseMove}
                    onMouseLeave={() => query = null}
            />
        </div>
    ]
}