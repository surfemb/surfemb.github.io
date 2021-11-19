(this["webpackJsonpsurfemb-site"]=this["webpackJsonpsurfemb-site"]||[]).push([[0],{126:function(t,e,n){},130:function(t,e,n){"use strict";n.r(e);var o=n(0),a=n.n(o),r=n(68),i=n.n(r),s=n(171),c=n(169),l=n(12),u=n(173),d=n(175),h=n(174),b=n(165),f=n(172),j=n(170),m=n(14),v=n(69),p=n(70),x=n(77),g=n(76),y=n(167),O=n(155),R=n(159),T=n(163);function E(t,e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="arraybuffer",n.onload=function(){return e(new Float32Array(n.response))},n.send(null)}function A(t){var e=0,n=0;do{e+=t.offsetTop||0,n+=t.offsetLeft||0,t=t.offsetParent}while(t);return{top:e,left:n}}function w(t){var e,n,o=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=t.nativeEvent;a.touches?(e=a.touches[0].pageX,n=a.touches[0].pageY):(e=a.pageX,n=a.pageY);var r=A(t.target);return e-=r.left,n-=r.top,o&&(e=Math.round(e),n=Math.round(n)),{x:e,y:n}}function M(t,e,n){var o=t.createShader(e);if(t.shaderSource(o,n),t.compileShader(o),t.getShaderParameter(o,t.COMPILE_STATUS))return o;console.log(t.getShaderInfoLog(o)),t.deleteShader(o)}function _(t,e,n){var o=t.createProgram();if(t.attachShader(o,e),t.attachShader(o,n),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS))return o;console.log(t.getProgramInfoLog(o)),t.deleteProgram(o)}var I=n(28),S=n(71),P=n(1);var D=function(t){Object(x.a)(n,t);var e=Object(g.a)(n);function n(t){var o;return Object(v.a)(this,n),(o=e.call(this,t)).state={blend:0},o.canvasRef=a.a.createRef(),o.animationFrameId=null,o.R=I.identity(3),o.lastX=null,o.lastY=null,o.allowRotation=!1,o.gl=null,o}return Object(p.a)(n,[{key:"componentDidUpdate",value:function(t,e,n){this.props!==t&&this.load()}},{key:"componentWillUnmount",value:function(){null!==this.animationFrameId&&window.cancelAnimationFrame(this.animationFrameId)}},{key:"componentDidMount",value:function(){var t=this.canvasRef.current;this.gl=t.getContext("webgl"),this.gl.viewport(0,0,t.width,t.height),this.load()}},{key:"load",value:function(){var t=this;this.componentWillUnmount();var e=this.gl,n=_(e,M(e,e.VERTEX_SHADER,"\n                attribute vec4 objPos;\n                attribute vec4 umapPos;\n                attribute vec3 col;\n                varying vec3 colOut;\n                \n                uniform mat4 M;\n                uniform float blend;\n                \n                void main() {\n                    colOut = col;\n                    vec4 pos = ((1.-blend) * objPos + blend * umapPos) * vec4(.95, .95, .95, 1.);\n                    pos = M * pos;\n                    gl_Position = pos * vec4(1., 1., -1., 1.);\n                    gl_PointSize = 2.0;\n                }\n            "),M(e,e.FRAGMENT_SHADER,"\n                precision mediump float;\n                varying vec3 colOut;\n                void main() {\n                    gl_FragColor = vec4(colOut, 1);\n                }\n            ")),o=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,o);var a=0;E(this.props.urlRoot+"-keydata.bin",(function(t){e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),a=t.length/9}));var r=e.getAttribLocation(n,"objPos"),i=e.getAttribLocation(n,"umapPos"),s=e.getAttribLocation(n,"col"),c=e.getUniformLocation(n,"M"),l=e.getUniformLocation(n,"blend"),u=null,d=null;!function h(){if((u!==t.R||d!==t.state.blend)&&a>0){d=t.state.blend,u=t.R,e.clearColor(0,0,0,0),e.clear(e.COLOR_BUFFER_BIT),e.enable(e.DEPTH_TEST),e.useProgram(n),e.uniform1fv(l,[t.state.blend]);var b=I.concatenate([t.R,I.zeros([3,1])]);e.uniformMatrix4fv(c,e.false,[].concat(Object(m.a)(b.reshape(-1).tolist()),[0,0,0,1])),e.bindBuffer(e.ARRAY_BUFFER,o),e.enableVertexAttribArray(r),e.vertexAttribPointer(r,3,e.FLOAT,!1,36,0),e.enableVertexAttribArray(i),e.vertexAttribPointer(i,3,e.FLOAT,!1,36,12),e.enableVertexAttribArray(s),e.vertexAttribPointer(s,3,e.FLOAT,!1,36,24),e.drawArrays(e.POINTS,0,a)}t.animationFrameId=window.requestAnimationFrame(h)}()}},{key:"rotate",value:function(t){if(this.allowRotation){var e=w(t),n=e.x,o=e.y;if(null!==this.lastX&&null!==this.lastY){var a=n-this.lastX,r=function(t){var e=Math.sin(t),n=Math.cos(t);return I.array([[1,0,0],[0,n,-e],[0,e,n]])}(-.01*(o-this.lastY)).dot(function(t){var e=Math.sin(t),n=Math.cos(t);return I.array([[n,0,e],[0,1,0],[-e,0,n]])}(-.01*a)),i=Object(S.SVD)(this.R.dot(r).tolist()),s=i.u,c=i.v;this.R=I.array(s).dot(I.array(c).T)}this.lastX=n,this.lastY=o}}},{key:"startRotation",value:function(t){this.allowRotation=!0;var e=w(t),n=e.x,o=e.y;this.lastX=n,this.lastY=o}},{key:"stopRotation",value:function(){this.allowRotation=!1,this.lastX=null,this.lastY=null}},{key:"render",value:function(){var t=this;return Object(P.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(P.jsx)("canvas",{ref:this.canvasRef,width:"224",height:"224",style:{width:224,cursor:"move",touchAction:"none"},onMouseMove:function(e){return t.rotate(e)},onTouchMove:function(e){return t.rotate(e)},onMouseDown:function(e){return t.startRotation(e)},onTouchStart:function(e){return t.startRotation(e)},onMouseLeave:function(){return t.stopRotation()},onMouseUp:function(){return t.stopRotation()},onTouchEnd:function(){return t.stopRotation()}}),Object(P.jsxs)(O.a,{direction:"column",spacing:2,sx:{mb:1},alignItems:"center",style:{height:224},children:[Object(P.jsx)(R.a,{}),Object(P.jsx)(y.a,{orientation:"vertical",min:0,max:100,value:100*this.state.blend,onChange:function(e,n){return t.setState({blend:n/100})}}),Object(P.jsx)(T.a,{})]})]})}}]),n}(a.a.Component);function F(t){var e=t.urlRoot,n=t.embDim,a=n/3,r=Object(m.a)(Array(a).keys()),i=Object(o.useRef)(null),s=Object(o.useRef)(null),c=Object(o.useRef)(null),l=[s,c],u=null,d=null,h=null,b=null;E(e+"-queries.bin",(function(t){u=t}));var f=null,j=function(t){var e=w(t),o=e.x,a=e.y;if(a=Math.min(223,Math.max(0,a)),o=Math.min(223,Math.max(0,o)),f=[o,a],null!==u){var r=(224*Math.round(a)+Math.round(o))*(n+2);d=u.slice(r,r+n),h=u[r+n],b=u[r+n+1]}};Object(o.useEffect)((function(){var t,n=i.current.getContext("webgl2"),o=M(n,n.VERTEX_SHADER,"#version 300 es\n            in vec4 pos;\n            out vec2 vTextureCoord;           \n            void main() {\n                gl_Position = pos;\n                vTextureCoord = pos.xy * vec2(0.5, -0.5) + 0.5;\n            }\n        "),a=M(n,n.FRAGMENT_SHADER,"#version 300 es\n            precision mediump float;\n            in vec2 vTextureCoord;\n            ".concat(r.map((function(t){return"uniform sampler2D keySampler"+t+";"})).join("\n"),"\n            ").concat(r.map((function(t){return"uniform vec3 q"+t+";"})).join("\n"),"\n            uniform float a;\n            uniform float alpha;\n            out vec4 outCol;\n            void main() {\n                ").concat(r.map((function(t){return"vec3 k"+t+"=texture(keySampler"+t+",vTextureCoord).xyz;"})).join("\n"),"\n                vec3 dpv = ").concat(r.map((function(t){return"q"+t+"*k"+t})).join("+"),";\n                float dp = dpv.x + dpv.y + dpv.z;\n                float v = pow(exp(dp - a), 0.5) * alpha;\n                if (").concat(r.map((function(t){return["x","y","z"].map((function(e){return"k"+t+"."+e+"==0."})).join("&&")})).join("&&"),")\n                    v = 0.;\n                outCol = vec4(v, 0., 0., v);\n            }\n        ")),s=_(n,o,a),c=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,c),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,1,1,1,1,-1,-1,1,1,-1,-1,-1]),n.STATIC_DRAW),n.viewport(0,0,n.canvas.width,n.canvas.height);var u=r.map((function(){return n.createTexture()}));u.forEach((function(t,o){n.bindTexture(n.TEXTURE_2D,t),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),E(e+"-keys-"+o+".bin",(function(e){n.bindTexture(n.TEXTURE_2D,t),n.texImage2D(n.TEXTURE_2D,0,n.RGB32F,224,224,0,n.RGB,n.FLOAT,e)}))}));var j=n.getAttribLocation(s,"pos"),v=r.map((function(t){return n.getUniformLocation(s,"keySampler"+t)})),p=r.map((function(t){return n.getUniformLocation(s,"q"+t)})),x=n.getUniformLocation(s,"a"),g=n.getUniformLocation(s,"alpha"),y=l.map((function(t){return t.current.getContext("2d")})),O=null;return function e(){O!==d&&(O=d,n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(s),n.bindBuffer(n.ARRAY_BUFFER,c),n.enableVertexAttribArray(j),n.vertexAttribPointer(j,2,n.FLOAT,!1,0,0),r.forEach((function(t){n.activeTexture(n["TEXTURE"+t]),n.bindTexture(n.TEXTURE_2D,u[t]),n.uniform1i(v[t],t)})),null!==d&&(p.forEach((function(t,e){n.uniform3fv(t,d.slice(3*e,3*(e+1)))})),n.uniform1fv(x,[h]),n.uniform1fv(g,[b]),n.drawArrays(n.TRIANGLES,0,6)),y.forEach((function(t){t.clearRect(0,0,224,224),null!==d&&(t.beginPath(),t.arc.apply(t,Object(m.a)(f).concat([8,0,2*Math.PI])),t.strokeStyle="white",t.stroke())}))),t=window.requestAnimationFrame(e)}(),function(){return window.cancelAnimationFrame(t)}}));var v={position:"relative",width:224,height:224,borderRadius:10,overflow:"hidden"},p={width:224,height:224},x={width:224,height:224,position:"absolute",left:0,top:0,cursor:"none",touchAction:"none"};return[Object(P.jsxs)("div",{style:v,children:[Object(P.jsx)("img",{src:e+"-img.png",alt:"input",style:p}),Object(P.jsx)("canvas",{ref:i,width:"224",height:"224",style:x}),Object(P.jsx)("canvas",{ref:s,width:"224",height:"224",style:x,onMouseMove:j,onTouchMove:j,onMouseLeave:function(){return d=null}})]},0),Object(P.jsxs)("div",{style:v,children:[Object(P.jsx)("img",{src:e+"-queryimg.png",alt:"queries",style:p}),Object(P.jsx)("canvas",{ref:c,width:"224",height:"224",style:x,onMouseMove:j,onTouchMove:j,onMouseLeave:function(){return d=null}})]},1)]}n(126);var L=["LM-O","T-LESS","TUD-L","IC-BIN","ITODD","HB","YCB-V"].map((function(t){return t.replace("-","").toLowerCase()})),U=[[1,5,6,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],[1,2,3],[1,2],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]];function C(t){var e=t.objIdx,n=t.setObjIdx,o=t.objIds;return Object(P.jsx)(b.a,{variant:"scrollable",scrollButtons:!0,allowScrollButtonsMobile:!0,value:e,onChange:function(t,e){return n(e)},children:o.map((function(t,e){return Object(P.jsx)(f.a,{label:t},e)}))})}function k(){var t=o.useState({datasetIdx:1,objIdx:0}),e=Object(l.a)(t,2),n=e[0],a=n.datasetIdx,r=n.objIdx,i=e[1],s="/data12/"+L[a]+"-"+r,c=function(t){var e=t.dataset,n=t.obj;return"string"===typeof e&&(e=L.indexOf(e)),"string"===typeof n&&(n=U[e].indexOf(parseInt(n))),[Object(P.jsx)("span",{children:" "}),Object(P.jsxs)(j.a,{style:{padding:0,minWidth:0,color:"#143b96"},onClick:function(){return i({datasetIdx:e,objIdx:n})},children:[L[e],"/",U[e][n]]})]};return Object(P.jsxs)(u.a,{style:{maxWidth:900},children:[Object(P.jsxs)(h.a,{sx:{my:4},children:[Object(P.jsx)(d.a,{variant:"h4",component:"h1",gutterBottom:!0,textAlign:"center",children:"SurfEmb"}),Object(P.jsxs)(d.a,{textAlign:"center",fontSize:18,children:["Dense and Continuous Correspondence Distributions ",Object(P.jsx)("br",{}),"for Object Pose Estimation with Learnt Surface Embeddings"]})]}),Object(P.jsx)(h.a,{sx:{width:"100%",marginBottom:2},children:Object(P.jsxs)(h.a,{children:[Object(P.jsx)(b.a,{variant:"scrollable",scrollButtons:!0,allowScrollButtonsMobile:!0,value:a,onChange:function(t,e){!function(t){i({datasetIdx:t,objIdx:0})}(e),console.log(e)},children:L.map((function(t,e){return Object(P.jsx)(f.a,{label:t},e)}))}),Object(P.jsx)(C,{objIds:U[a],objIdx:r,setObjIdx:function(t){return i({datasetIdx:a,objIdx:t})}})]})}),Object(P.jsx)(h.a,{children:Object(P.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",flexWrap:"wrap",gap:20,userSelect:"none"},children:[Object(P.jsx)(F,{embDim:12,urlRoot:s}),Object(P.jsx)(D,{urlRoot:s},2)]})}),Object(P.jsxs)(h.a,{children:[Object(P.jsx)("p",{children:"From left to right: input image, query image, keys. Hover the mouse over the input or query image to see the estimated distribution over the object surface, imposed on the image in the ground truth pose. Drag the keys to rotate them. Drag the slider to interpolate between keys' object coordinates or UMAP 3D-projection."}),Object(P.jsxs)("p",{children:["Interesting examples include discrete rotational symmetry:",Object(P.jsx)(c,{dataset:"tless",obj:"2"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"27"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"30"}),",",Object(P.jsx)(c,{dataset:"ycbv",obj:"21"}),",",Object(P.jsx)(c,{dataset:"itodd",obj:"7"}),",",Object(P.jsx)("span",{children:" "}),"and full rotational symmetry:",Object(P.jsx)(c,{dataset:"tless",obj:"14"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"15"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"17"}),". The distributions may look worse because of poor ground truth poses:",Object(P.jsx)(c,{dataset:"lmo",obj:"1"}),", or poor meshes:",Object(P.jsx)(c,{dataset:"tudl",obj:"1"}),". You can get an idea about the ground truth pose quality by hovering the mouse over the edges of the object."]}),Object(P.jsx)("p",{children:"The UMAP projection of keys shows the key manifold and thus primarily provides insight to constant ambiguities, like symmetry. A query can represent more ambiguities which is best seen by exploring the distributions."}),Object(P.jsx)("p",{children:"Examples are chosen randomly for each object in the seven BOP Challenge datasets. Models are trained purely on synthetic images and shown on real images except for ITODD and HB, where ground truth poses are not publicly available on the test images. For those datasets, we show examples on synthetic images instead."})]})]})}var B=n(31),X=n(75),Y=Object(X.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:B.a.A400}}});i.a.render(Object(P.jsxs)(c.a,{theme:Y,children:[Object(P.jsx)(s.a,{}),Object(P.jsx)(k,{})]}),document.querySelector("#root"))}},[[130,1,2]]]);
//# sourceMappingURL=main.09fd607a.chunk.js.map