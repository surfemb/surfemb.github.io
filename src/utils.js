export function loadFloat32Array(url, onload) {
    const oReq = new XMLHttpRequest()
    oReq.open("GET", url, true)
    //oReq.setRequestHeader('Cache-Control', 'no-cache') // TODO: remove
    oReq.responseType = "arraybuffer"
    oReq.onload = () => onload(new Float32Array(oReq.response))
    oReq.send(null)
}

function cumulativeOffset(element) {
    let top = 0, left = 0
    do {
        top += element.offsetTop  || 0
        left += element.offsetLeft || 0
        element = element.offsetParent
    } while(element)
    return {top, left}
}

export function getRelativeMousePos(e, round=false){
    let x, y
    const ne = e.nativeEvent
    if (ne.touches){
        x = ne.touches[0].pageX
        y = ne.touches[0].pageY
    }else{
        x = ne.pageX
        y = ne.pageY
    }
    const offset = cumulativeOffset(e.target)
    x = x - offset.left
    y = y - offset.top
    if (round){
        x = Math.round(x)
        y = Math.round(y)
    }
    return {x, y}
}

export function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
}


export function createProgram(gl, vertexShader, fragmentShader) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}