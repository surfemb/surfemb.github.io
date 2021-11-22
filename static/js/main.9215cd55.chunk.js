(this["webpackJsonpsurfemb-site"]=this["webpackJsonpsurfemb-site"]||[]).push([[0],{132:function(e,t,n){},136:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),a=n(70),i=n.n(a),s=n(184),c=n(182),l=n(13),u=n(187),d=n(186),b=n(188),h=n(178),j=n(185),f=n(183),m=n(15),x=n(74),p=n(75),v=n(83),O=n(82),y=n(180),g=n(168),R=n(172),T=n(176);function E(e,t){var n=new XMLHttpRequest;return n.open("GET",e,!0),n.responseType="arraybuffer",n.onload=function(){200===n.status&&t(new Float32Array(n.response))},n.send(null),n}function A(e){var t=0,n=0;do{t+=e.offsetTop||0,n+=e.offsetLeft||0,e=e.offsetParent}while(e);return{top:t,left:n}}function w(e){var t,n,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=e.nativeEvent;o.touches?(t=o.touches[0].pageX,n=o.touches[0].pageY):(t=o.pageX,n=o.pageY);var a=A(e.target);return t-=a.left,n-=a.top,r&&(t=Math.round(t),n=Math.round(n)),{x:t,y:n}}function D(e,t,n){var r=e.createShader(t);if(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS))return r;console.log(e.getShaderInfoLog(r)),e.deleteShader(r)}function S(e,t,n){var r=e.createProgram();if(e.attachShader(r,t),e.attachShader(r,n),e.linkProgram(r),e.getProgramParameter(r,e.LINK_STATUS))return r;console.log(e.getProgramInfoLog(r)),e.deleteProgram(r)}var M=n(29),B=n(76),P=n(0);var _=function(e){Object(v.a)(n,e);var t=Object(O.a)(n);function n(e){var r;return Object(x.a)(this,n),(r=t.call(this,e)).state={blend:0},r.canvasRef=o.a.createRef(),r.animationFrameId=null,r.R=M.identity(3),r.lastX=null,r.lastY=null,r.allowRotation=!1,r.gl=null,r.request=null,r}return Object(p.a)(n,[{key:"componentDidUpdate",value:function(e,t,n){this.props!==e&&this.load()}},{key:"componentWillUnmount",value:function(){null!==this.animationFrameId&&window.cancelAnimationFrame(this.animationFrameId),null!==this.request&&(this.request.abort(),this.request=null)}},{key:"componentDidMount",value:function(){var e=this.canvasRef.current;this.gl=e.getContext("webgl"),this.gl.viewport(0,0,e.width,e.height),this.load()}},{key:"load",value:function(){var e=this;this.componentWillUnmount();var t=this.gl,n=S(t,D(t,t.VERTEX_SHADER,"\n                attribute vec4 objPos;\n                attribute vec4 umapPos;\n                attribute vec3 col;\n                varying vec3 colOut;\n                \n                uniform mat4 M;\n                uniform float blend;\n                \n                void main() {\n                    colOut = col;\n                    vec4 pos = ((1.-blend) * objPos + blend * umapPos) * vec4(.95, .95, .95, 1.);\n                    pos = M * pos;\n                    gl_Position = pos * vec4(1., 1., -1., 1.);\n                    gl_PointSize = 2.0;\n                }\n            "),D(t,t.FRAGMENT_SHADER,"\n                precision mediump float;\n                varying vec3 colOut;\n                void main() {\n                    gl_FragColor = vec4(colOut, 1);\n                }\n            ")),r=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,r);var o=0;this.request=E(this.props.urlRoot+"-keydata.bin",(function(e){t.bufferData(t.ARRAY_BUFFER,e,t.STATIC_DRAW),o=e.length/9}));var a=t.getAttribLocation(n,"objPos"),i=t.getAttribLocation(n,"umapPos"),s=t.getAttribLocation(n,"col"),c=t.getUniformLocation(n,"M"),l=t.getUniformLocation(n,"blend"),u=null,d=null;t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT);!function b(){if((u!==e.R||d!==e.state.blend)&&o>0){d=e.state.blend,u=e.R,t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.enable(t.DEPTH_TEST),t.useProgram(n),t.uniform1fv(l,[e.state.blend]);var h=M.concatenate([e.R,M.zeros([3,1])]);t.uniformMatrix4fv(c,t.false,[].concat(Object(m.a)(h.reshape(-1).tolist()),[0,0,0,1])),t.bindBuffer(t.ARRAY_BUFFER,r),t.enableVertexAttribArray(a),t.vertexAttribPointer(a,3,t.FLOAT,!1,36,0),t.enableVertexAttribArray(i),t.vertexAttribPointer(i,3,t.FLOAT,!1,36,12),t.enableVertexAttribArray(s),t.vertexAttribPointer(s,3,t.FLOAT,!1,36,24),t.drawArrays(t.POINTS,0,o)}e.animationFrameId=window.requestAnimationFrame(b)}()}},{key:"rotate",value:function(e){if(this.allowRotation){var t=w(e),n=t.x,r=t.y;if(null!==this.lastX&&null!==this.lastY){var o=n-this.lastX,a=function(e){var t=Math.sin(e),n=Math.cos(e);return M.array([[1,0,0],[0,n,-t],[0,t,n]])}(-.01*(r-this.lastY)).dot(function(e){var t=Math.sin(e),n=Math.cos(e);return M.array([[n,0,t],[0,1,0],[-t,0,n]])}(-.01*o)),i=Object(B.SVD)(this.R.dot(a).tolist()),s=i.u,c=i.v;this.R=M.array(s).dot(M.array(c).T)}this.lastX=n,this.lastY=r}}},{key:"startRotation",value:function(e){this.allowRotation=!0;var t=w(e),n=t.x,r=t.y;this.lastX=n,this.lastY=r}},{key:"stopRotation",value:function(){this.allowRotation=!1,this.lastX=null,this.lastY=null}},{key:"render",value:function(){var e=this;return Object(P.jsx)("div",{style:{display:"flex",flexDirection:"column"},children:Object(P.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(P.jsx)("canvas",{ref:this.canvasRef,width:"224",height:"224",style:{width:224,cursor:"move",touchAction:"none"},onMouseMove:function(t){return e.rotate(t)},onTouchMove:function(t){return e.rotate(t)},onMouseDown:function(t){return e.startRotation(t)},onTouchStart:function(t){return e.startRotation(t)},onMouseLeave:function(){return e.stopRotation()},onMouseUp:function(){return e.stopRotation()},onTouchEnd:function(){return e.stopRotation()}}),Object(P.jsxs)(g.a,{direction:"column",spacing:2,sx:{mb:1},alignItems:"center",style:{height:224},children:[Object(P.jsx)(R.a,{}),Object(P.jsx)(y.a,{orientation:"vertical",min:0,max:100,value:100*this.state.blend,onChange:function(t,n){return e.setState({blend:n/100})}}),Object(P.jsx)(T.a,{})]})]})})}}]),n}(o.a.Component),I=n(80);function C(e){var t=e.urlRoot,n=e.embDim,o=n/3,a=Object(m.a)(Array(o).keys()),i=Object(r.useRef)(null),s=Object(r.useRef)(null),c=Object(r.useRef)(null),l=[s,c],u=null,d=null,b=null,h=null,j=[];j.push(E(t+"-queries.bin",(function(e){u=e})));var f=null,x=function(e){var t=w(e),r=t.x,o=t.y;if(o=Math.min(223,Math.max(0,o)),r=Math.min(223,Math.max(0,r)),f=[r,o],null!==u){var a=(224*Math.round(o)+Math.round(r))*(n+2);d=u.slice(a,a+n),b=u[a+n],h=u[a+n+1]}};Object(r.useEffect)((function(){var e,n=i.current.getContext("webgl");n.getExtension("OES_texture_float");var r=D(n,n.VERTEX_SHADER,"\n            attribute vec4 pos;\n            varying vec2 vTextureCoord;           \n            void main() {\n                gl_Position = pos;\n                vTextureCoord = pos.xy * vec2(0.5, -0.5) + 0.5;\n            }\n        "),o=D(n,n.FRAGMENT_SHADER,"\n            precision mediump float;\n            varying vec2 vTextureCoord;\n            ".concat(a.map((function(e){return"uniform sampler2D keySampler"+e+";"})).join("\n"),"\n            ").concat(a.map((function(e){return"uniform vec3 q"+e+";"})).join("\n"),"\n            uniform float a;\n            uniform float alpha;\n            void main() {\n                ").concat(a.map((function(e){return"vec3 k"+e+"=texture2D(keySampler"+e+",vTextureCoord).xyz;"})).join("\n"),"\n                vec3 dpv = ").concat(a.map((function(e){return"q"+e+"*k"+e})).join("+"),";\n                float dp = dpv.x + dpv.y + dpv.z;\n                float v = pow(exp(dp - a), 0.5) * alpha;\n                if (").concat(a.map((function(e){return["x","y","z"].map((function(t){return"k"+e+"."+t+"==0."})).join("&&")})).join("&&"),")\n                    v = 0.;\n                gl_FragColor = vec4(v, 0., 0., v);\n            }\n        ")),s=S(n,r,o),c=n.createBuffer();n.bindBuffer(n.ARRAY_BUFFER,c),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,1,1,1,1,-1,-1,1,1,-1,-1,-1]),n.STATIC_DRAW),n.viewport(0,0,n.canvas.width,n.canvas.height);var u=a.map((function(){return n.createTexture()}));u.forEach((function(e,r){n.bindTexture(n.TEXTURE_2D,e),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MAG_FILTER,n.NEAREST),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),j.push(E(t+"-keys-"+r+".bin",(function(t){n.bindTexture(n.TEXTURE_2D,e),n.texImage2D(n.TEXTURE_2D,0,n.RGB,224,224,0,n.RGB,n.FLOAT,t)})))}));var x=n.getAttribLocation(s,"pos"),p=a.map((function(e){return n.getUniformLocation(s,"keySampler"+e)})),v=a.map((function(e){return n.getUniformLocation(s,"q"+e)})),O=n.getUniformLocation(s,"a"),y=n.getUniformLocation(s,"alpha"),g=l.map((function(e){return e.current.getContext("2d")})),R=null;n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT);return function t(){R!==d&&(R=d,n.clearColor(0,0,0,0),n.clear(n.COLOR_BUFFER_BIT),n.useProgram(s),n.bindBuffer(n.ARRAY_BUFFER,c),n.enableVertexAttribArray(x),n.vertexAttribPointer(x,2,n.FLOAT,!1,0,0),a.forEach((function(e){n.activeTexture(n["TEXTURE"+e]),n.bindTexture(n.TEXTURE_2D,u[e]),n.uniform1i(p[e],e)})),null!==d&&(v.forEach((function(e,t){n.uniform3fv(e,d.slice(3*t,3*(t+1)))})),n.uniform1fv(O,[b]),n.uniform1fv(y,[h]),n.drawArrays(n.TRIANGLES,0,6)),g.forEach((function(e){e.clearRect(0,0,224,224),null!==d&&(e.beginPath(),e.arc.apply(e,Object(m.a)(f).concat([8,0,2*Math.PI])),e.strokeStyle="white",e.stroke())}))),e=window.requestAnimationFrame(t)}(),function(){window.cancelAnimationFrame(e);var t,n=Object(I.a)(j);try{for(n.s();!(t=n.n()).done;){t.value.abort()}}catch(r){n.e(r)}finally{n.f()}}}));var p={position:"relative",width:224,height:224,borderRadius:10,overflow:"hidden"},v={width:224,height:224},O={width:224,height:224,position:"absolute",left:0,top:0,cursor:"none",touchAction:"none"};return[Object(P.jsxs)("div",{style:p,children:[Object(P.jsx)("img",{src:t+"-img.png",alt:"input",style:v}),Object(P.jsx)("canvas",{ref:i,width:"224",height:"224",style:O}),Object(P.jsx)("canvas",{ref:s,width:"224",height:"224",style:O,onMouseMove:x,onTouchMove:x,onMouseLeave:function(){return d=null}})]},0),Object(P.jsxs)("div",{style:p,children:[Object(P.jsx)("img",{src:t+"-queryimg.png",alt:"queries",style:v}),Object(P.jsx)("canvas",{ref:c,width:"224",height:"224",style:O,onMouseMove:x,onTouchMove:x,onMouseLeave:function(){return d=null}})]},1)]}var L=n(193),F=n(195),U=n(190),k=n(191),X=n(194),G=n(192),q=n(196);function Y(e,t,n,r,o,a,i,s,c,l,u,d){return{key:e,method:t,domain:n,synth:r,lmo:o,tless:a,tudl:i,icbin:s,itodd:c,hb:l,ycbv:u,avg:d}}var N=["Method","Domain","Synth","LM-O","T-LESS","TUD-L","IC-BIN","ITODD","HB","YCB-V","Avg"],W=[Y(-1,Object(P.jsx)("b",{children:"SurfEmb"}),"RGB","\u2713",Object(P.jsx)("b",{children:"0.656"}),Object(P.jsx)("b",{children:"0.741"}),Object(P.jsx)("b",{children:"0.715"}),Object(P.jsx)("b",{children:"0.585"}),Object(P.jsx)("b",{children:"0.387"}),Object(P.jsx)("b",{children:"0.793"}),Object(P.jsx)("b",{children:"0.653"}),Object(P.jsx)("b",{children:"0.647"})),Y(0,"Epos","RGB","\u2713",.547,.467,.558,.363,.186,"0.580",.499,.457),Y(1,"CDPNv2","RGB","\u2713",.624,.407,.588,.473,.102,.722,"0.390",.472),Y(2,"DPODv2","RGB","\u2713",.584,.636,"-","-","-",.725,"-","-"),Y(3,"PVNet","RGB","\u2713",.575,"-","-","-","-","-","-","-"),Y(4,"CosyPose","RGB","\u2713",.633,"0.640",.685,.583,.216,.656,.574,"0.570")],V=[Y(5,Object(P.jsx)("b",{children:"SurfEmb"}),"RGB-D","\u2713",Object(P.jsx)("b",{children:"0.758"}),Object(P.jsx)("b",{children:"0.828"}),.854,Object(P.jsx)("b",{children:"0.656"}),.498,Object(P.jsx)("b",{children:"0.867"}),.806,Object(P.jsx)("b",{children:"0.752"})),Y(6,Object(P.jsx)("b",{children:"SurfEmb"}),"RGB-D","\u2717",Object(P.jsx)("b",{children:"0.758"}),Object(P.jsx)("b",{children:"0.833"}),.933,Object(P.jsx)("b",{children:"0.656"}),.498,Object(P.jsx)("b",{children:"0.867"}),.824,Object(P.jsx)("b",{children:"0.767"})),Y(7,"Drost","RGB-D","*",.515,"0.500",.851,.368,Object(P.jsx)("b",{children:"0.570"}),.671,.375,"0.550"),Y(8,"Vidal Sensors","D","*",.582,.538,.876,.393,.435,.706,"0.450",.569),Y(9,"Koenig-Hybrid","RGB-D","\u2717",.631,.655,"0.920","0.430",.483,.651,.701,.639),Y(10,"Pix2Pose","RGB-D","\u2717",.588,.512,"0.820","0.390",.351,.695,"0.780",.591),Y(11,"CosyPose","RGB-D","\u2717",.714,.701,Object(P.jsx)("b",{children:"0.939"}),.647,.313,.712,Object(P.jsx)("b",{children:"0.861"}),.698)],H=function(e){return e.map((function(e){return Object(P.jsx)(q.a,{children:N.map((function(t){return Object(P.jsx)(U.a,{children:e[t.replace("-","").toLowerCase()]},e.key+t)}))},e.key)}))},z=function(e){return Object(P.jsx)(q.a,{children:Object(P.jsx)(U.a,{colSpan:11,style:{textAlign:"center"},children:Object(P.jsx)("i",{children:e.children})})})};function J(){return Object(P.jsx)(k.a,{component:G.a,children:Object(P.jsxs)(L.a,{size:"small",sx:{minWidth:852},children:[Object(P.jsx)(X.a,{children:Object(P.jsx)(q.a,{children:N.map((function(e){return Object(P.jsx)(U.a,{children:e},e)}))})}),Object(P.jsxs)(F.a,{children:[Object(P.jsx)(z,{children:"Methods using color, trained purely on synthetic images"}),H(W),Object(P.jsx)(z,{children:"Methods using depth"}),H(V)]})]})})}n(132);var K=["LM-O","T-LESS","TUD-L","IC-BIN","ITODD","HB","YCB-V"].map((function(e){return e.replace("-","").toLowerCase()})),Q=[[1,5,6,8,9,10,11,12],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],[1,2,3],[1,2],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33],[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]];function Z(e){var t=e.objIdx,n=e.setObjIdx,r=e.objIds;return Object(P.jsx)(h.a,{variant:"scrollable",scrollButtons:!0,allowScrollButtonsMobile:!0,value:t,onChange:function(e,t){return n(t)},children:r.map((function(e,t){return Object(P.jsx)(j.a,{label:e},t)}))})}function $(e){return Object(P.jsx)(d.a,{variant:"h6",style:{marginTop:"1.5em"},children:e.children})}function ee(){var e=r.useState({datasetIdx:1,objIdx:1}),t=Object(l.a)(e,2),n=t[0],o=n.datasetIdx,a=n.objIdx,i=t[1],s="/data12/"+K[o]+"-"+a,c=function(e){var t=e.dataset,n=e.obj;return"string"===typeof t&&(t=K.indexOf(t)),"string"===typeof n&&(n=Q[t].indexOf(parseInt(n))),Object(P.jsxs)("span",{children:[Object(P.jsx)("span",{children:" "}),Object(P.jsxs)(f.a,{style:{padding:0,minWidth:0,color:"#143b96"},onClick:function(){return i({datasetIdx:t,objIdx:n})},children:[K[t]," ",Q[t][n]]})]})};return Object(P.jsxs)(u.a,{style:{maxWidth:900},children:[Object(P.jsxs)(b.a,{sx:{my:4},children:[Object(P.jsx)(d.a,{variant:"h4",component:"h1",gutterBottom:!0,textAlign:"center",children:"SurfEmb"}),Object(P.jsxs)(d.a,{textAlign:"center",fontSize:18,children:["Dense and Continuous Correspondence Distributions ",Object(P.jsx)("br",{}),"for Object Pose Estimation with Learnt Surface Embeddings"]})]}),Object(P.jsx)($,{children:"Abstract"}),Object(P.jsx)("p",{children:"We present an approach to learn dense, continuous 2D-3D correspondence distributions over the surface of objects from data with no prior knowledge of visual ambiguities like symmetry. We also present a new method for 6D pose estimation of rigid objects using the learnt distributions to sample, score and refine pose hypotheses. The correspondence distributions are learnt with a contrastive loss, represented in object-specific latent spaces by an encoder-decoder query model and a small fully connected key model. Our method is unsupervised with respect to visual ambiguities, yet we show that the query- and key models learn to represent accurate multi-modal surface distributions. Our pose estimation method improves the state-of-the-art significantly on the comprehensive BOP Challenge, trained purely on synthetic data, even compared with methods trained on real data."}),Object(P.jsx)($,{children:"Estimated Correspondence Distributions"}),Object(P.jsx)("p",{children:"Hover over the input image (left) or query image (middle) to see the estimated correspondence distribution. Drag the keys (right) to rotate them, or drag the slider to interpolate between keys' object coordinates and UMAP projection."}),Object(P.jsxs)("p",{children:["Interesting examples include discrete rotational symmetry:",Object(P.jsx)(c,{dataset:"tless",obj:"2"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"27"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"23"}),",",Object(P.jsx)(c,{dataset:"itodd",obj:"7"}),",",Object(P.jsx)("span",{children:" "}),"full rotational symmetry:",Object(P.jsx)(c,{dataset:"tless",obj:"14"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"15"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"17"}),",",Object(P.jsx)("span",{children:" "}),"and no symmetry:",Object(P.jsx)(c,{dataset:"tless",obj:"7"}),",",Object(P.jsx)(c,{dataset:"tless",obj:"25"}),",",Object(P.jsx)(c,{dataset:"lmo",obj:"8"}),",",Object(P.jsx)(c,{dataset:"tudl",obj:"1"}),",",Object(P.jsx)(c,{dataset:"icbin",obj:"1"}),",",Object(P.jsx)(c,{dataset:"hb",obj:"1"}),",",Object(P.jsx)(c,{dataset:"ycbv",obj:"1"}),"."]}),Object(P.jsx)(b.a,{sx:{width:"100%",marginBottom:2},children:Object(P.jsxs)(b.a,{children:[Object(P.jsx)(h.a,{variant:"scrollable",scrollButtons:!0,allowScrollButtonsMobile:!0,value:o,onChange:function(e,t){!function(e){i({datasetIdx:e,objIdx:0})}(t),console.log(t)},children:K.map((function(e,t){return Object(P.jsx)(j.a,{label:e},t)}))}),Object(P.jsx)(Z,{objIds:Q[o],objIdx:a,setObjIdx:function(e){return i({datasetIdx:o,objIdx:e})}})]})}),Object(P.jsx)(b.a,{children:Object(P.jsxs)("div",{style:{display:"flex",flexDirection:"row",justifyContent:"center",flexWrap:"wrap",gap:20,userSelect:"none"},children:[Object(P.jsx)(C,{embDim:12,urlRoot:s}),Object(P.jsx)(_,{urlRoot:s},2)]})}),Object(P.jsx)("p",{children:"The UMAP projection of keys shows the key manifold and primarily provides insight to constant ambiguities, like global symmetry. A query can also represent view-dependent ambiguities which is best seen by exploring the distributions."}),Object(P.jsx)("p",{children:"Examples are chosen randomly for each object in the seven BOP Challenge datasets. Models are trained purely on synthetic images and shown on real images except for ITODD and HB, shown on synthetic images, because ground truth poses are not publicly available on the real images."}),Object(P.jsxs)("p",{children:["Distributions may appear worse than they are because of poor ground truth poses:",Object(P.jsx)(c,{dataset:"lmo",obj:"1"})," (see the distributions near the edges), or poor meshes:",Object(P.jsx)(c,{dataset:"tudl",obj:"1"}),"."]}),Object(P.jsx)($,{children:"Pose Estimation"}),Object(P.jsx)("p",{children:" We use the distributions to sample, score and refine pose hypotheses. Our pose estimation method is trained and evaluated on the seven BOP Challenge datasets:"}),Object(P.jsx)(J,{}),Object(P.jsx)("p",{children:"Synth: Method is trained purely on synthetic images. Note that only T-LESS, TUD-L and YCBV provide real images for training. * Methods do not use the available training data."}),Object(P.jsx)("p",{children:"\xa0"})]})}var te=n(33),ne=n(81),re=Object(ne.a)({palette:{primary:{main:"#556cd6"},secondary:{main:"#19857b"},error:{main:te.a.A400}}});i.a.render(Object(P.jsxs)(c.a,{theme:re,children:[Object(P.jsx)(s.a,{}),Object(P.jsx)(ee,{})]}),document.querySelector("#root"))}},[[136,1,2]]]);
//# sourceMappingURL=main.9215cd55.chunk.js.map