import React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import {BubbleChart as UmapIcon} from "@mui/icons-material";
import {Stop as ObjIcon} from "@mui/icons-material";
import * as utils from "./utils";

import * as nj from 'numjs';
import {SVD} from 'svd-js'

function get_Rx(t) {
    const S = Math.sin(t), C = Math.cos(t)
    return nj.array([
        [1, 0, 0],
        [0, C, -S],
        [0, S, C]
    ])
}

function get_Ry(t) {
    const S = Math.sin(t), C = Math.cos(t)
    return nj.array([
        [C, 0, S],
        [0, 1, 0],
        [-S, 0, C]
    ])
}


export default class KeyViewer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {blend: 0.}
        this.canvasRef = React.createRef()

        this.animationFrameId = null
        this.R = nj.identity(3)
        this.lastX = null
        this.lastY = null
        this.allowRotation = false
        this.gl = null
        this.request = null
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props !== prevProps) this.load()
    }

    componentWillUnmount() {
        if (this.animationFrameId !== null)
            window.cancelAnimationFrame(this.animationFrameId)
        if (this.request !== null){
            this.request.abort()
            this.request = null
        }
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        this.gl = canvas.getContext('webgl')
        this.gl.viewport(0, 0, canvas.width, canvas.height)
        this.load()
    }

    load() {
        this.componentWillUnmount()
        const gl = this.gl
        const program = utils.createProgram(gl,
            utils.createShader(gl, gl.VERTEX_SHADER, `
                attribute vec4 objPos;
                attribute vec4 umapPos;
                attribute vec3 col;
                varying vec3 colOut;
                
                uniform mat4 M;
                uniform float blend;
                
                void main() {
                    colOut = col;
                    vec4 pos = ((1.-blend) * objPos + blend * umapPos) * vec4(.95, .95, .95, 1.);
                    pos = M * pos;
                    gl_Position = pos * vec4(1., 1., -1., 1.);
                    gl_PointSize = 2.0;
                }
            `),
            utils.createShader(gl, gl.FRAGMENT_SHADER, `
                precision mediump float;
                varying vec3 colOut;
                void main() {
                    gl_FragColor = vec4(colOut, 1);
                }
            `)
        )

        const dataBuffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer)
        let vertexCount = 0

        this.request = utils.loadFloat32Array(this.props.urlRoot + '-keydata.bin', data => {
            gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW)
            vertexCount = data.length / 9
        })

        const objPosLoc = gl.getAttribLocation(program, 'objPos')
        const umapPosLoc = gl.getAttribLocation(program, 'umapPos')
        const colLoc = gl.getAttribLocation(program, 'col')

        const mLoc = gl.getUniformLocation(program, 'M')
        const blendLoc = gl.getUniformLocation(program, 'blend')

        let lastR = null, lastBlend = null;

        gl.clearColor(0.0, 0.0, 0.0, 0.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        const glRender = () => {
            if ((lastR !== this.R || lastBlend !== this.state.blend) && vertexCount > 0) {
                lastBlend = this.state.blend
                lastR = this.R

                gl.clearColor(0.0, 0.0, 0.0, 0.0)
                gl.clear(gl.COLOR_BUFFER_BIT)
                gl.enable(gl.DEPTH_TEST)
                gl.useProgram(program)

                gl.uniform1fv(blendLoc, [this.state.blend])

                const R_ = nj.concatenate([this.R, nj.zeros([3, 1])])
                gl.uniformMatrix4fv(mLoc, gl.false, [...R_.reshape(-1).tolist(), 0, 0, 0, 1])

                gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer)

                gl.enableVertexAttribArray(objPosLoc)
                gl.vertexAttribPointer(objPosLoc, 3, gl.FLOAT, false, 4 * 9, 0)

                gl.enableVertexAttribArray(umapPosLoc)
                gl.vertexAttribPointer(umapPosLoc, 3, gl.FLOAT, false, 4 * 9, 4 * 3)

                gl.enableVertexAttribArray(colLoc)
                gl.vertexAttribPointer(colLoc, 3, gl.FLOAT, false, 4 * 9, 4 * 6)

                gl.drawArrays(gl.POINTS, 0, vertexCount)
            }
            this.animationFrameId = window.requestAnimationFrame(glRender)
        }
        glRender()
    }

    rotate(e) {
        if (this.allowRotation) {
            const {x, y} = utils.getRelativeMousePos(e)
            if (this.lastX !== null && this.lastY !== null) {
                const dx = x - this.lastX, dy = y - this.lastY
                const s = -1e-2
                const dR = get_Rx(dy * s).dot(get_Ry(dx * s))
                let {u, v} = SVD(this.R.dot(dR).tolist())
                this.R = nj.array(u).dot(nj.array(v).T)
            }
            this.lastX = x
            this.lastY = y
        }
    }

    startRotation(e) {
        this.allowRotation = true
        const {x, y} = utils.getRelativeMousePos(e)
        this.lastX = x
        this.lastY = y
    }

    stopRotation() {
        this.allowRotation = false
        this.lastX = null
        this.lastY = null
    }

    render() {
        return (<div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <canvas ref={this.canvasRef} width="224" height="224"
                        style={{width: 224, cursor: 'move', touchAction: 'none'}}
                        onMouseMove={e => this.rotate(e)} onTouchMove={e => this.rotate(e)}
                        onMouseDown={e => this.startRotation(e)} onTouchStart={e => this.startRotation(e)}
                        onMouseLeave={() => this.stopRotation()} onMouseUp={() => this.stopRotation()}
                        onTouchEnd={() => this.stopRotation()}
                />
                <Stack direction="column" spacing={2} sx={{mb: 1}} alignItems="center" style={{height: 224}}>
                    <UmapIcon/>
                    <Slider orientation='vertical' min={0} max={100}
                            value={this.state.blend * 100}
                            onChange={(e, newBlend) => this.setState({blend: newBlend / 100})}
                    />
                    <ObjIcon/>
                </Stack>
            </div>
        </div>)
    }
}