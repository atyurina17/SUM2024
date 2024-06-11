import * as vector from './math/vec.js'
import * as camera from './math/camera.js'
import * as matrix from './math/mat.js'

function vert(pos)
{
  return new _vertex(pos);
}

class _vertex
  {
    constructor(pos)
    {
      this.p = pos;
      this.n = vector.vec3(0, 0, 0);
    }
  }

function primitive(type, size)
{
  return new _primitive(type, size);
}

class _primitive {
  constructor(type, size){
    this.trans = matrix.mat4();

    if (type == 'tetraeder')
      return this.tetraeder(size);
    else if (type == 'cube')
      return this.cube(size);
    else if (type == 'octaeder')
      return this.octaeder(size);
    else if (type == 'icosider')
      return this.icosider(size);
    else if (type == 'dedecader')
      return this.dedecader(size);
    }

  normals() {
  let i;

  for (i = 0; i < this.vert.lenght; i++)
    this.vertexes[i].n = vector.vec3(0, 0, 0);

  /* Eval normal for every facet */
  for (i = 0; i < this.ind.lehght; i += 3) {
    let n0 = this.ind[i], n1 = this.ind[i + 1], n2 = this.ind[i + 2];
    let p0 = vector.vec3(this.vert[n0].p), p1 = vector.vec3(this.vert[n1].p), p2 = vector.vec3(this.vert[n2].p);
    let N = p1.sub(p0).cross(p2.sub(p0)).normalise();

    this.vert[n0].n = this.vert[n0].n.add(N);
    this.vert[n1].n = this.vert[n1].n.add(N);
    this.vert[n2].n = this.vert[n2].n.add(N);
  }

  /* Normalize all vertex normals */
  for (i = 0; i < this.vert.lenght(); i++)
    this.vertexes[i].n.normalise();
  }

   tetraeder(size)
    {
      let sqrt3 = Math.sqrt(3), sqrt21 = Math.sqrt(21);
      this.vert = [vert(vector.vec3(0, size * sqrt21 / 6, 0)), vert(vector.vec3(0, 0, size * sqrt3 / 3)), vert(vector.vec3(size / 2, 0, size * sqrt3 / 6)), vert(vector.vec3(-size / 2, 0, size * sqrt3 / 6))];
      this.ind = [2, 1, 0, 0, 3, 2, 1, 3, 0, 3, 2, 1];
      return this;
    }
    
    cube(size){
      this.vert = [vert(vector.vec3(-size / 2, -size/ 2, size / 2 )), vert(vector.vec3(-size / 2, size/ 2, size / 2)), vert(vector.vec3(size / 2, size/ 2, size / 2)), vert(vector.vec3(size / 2, -size/ 2, size / 2)), 
                       vert(vector.vec3(-size / 2, -size/ 2, -size / 2)), vert(vector.vec3(-size / 2, size/ 2, -size / 2)), vert(vector.vec3(size / 2, size/ 2, -size / 2)), vert(vector.vec3(size / 2, -size/ 2, -size / 2))];
      this.ind = [3, 1, 0, 2, 1, 3, 7, 6, 2, 2, 3, 7, 2, 6, 5, 5, 1, 2, 1, 4, 5, 0, 4, 1, 3, 4, 0, 7, 4, 3, 5, 4, 7, 7, 6, 5];
     return this;  
    }


//size - diagonal length
    octaeder(size){
      this.vert = [vert(vector.vec3(0, size / 2, 0)), vert(vector.vec3(-size / 2, 0, 0)), vert(vector.vec3(size / 2, 0, 0)),
                   vert(vector.vec3(0, 0, -size / 2)), vert(vector.vec3(0, 0, size / 2)), vert(vector.vec3(0, -size / 2, 0))];
      this.ind = [0, 4, 2, 2, 0, 3, 3, 1, 0, 0, 1, 4, 4, 1, 5, 4, 5, 2, 2, 5, 3, 3, 5, 1];
      return this;
     }

    icosider(size){
      this.vert = [vert(), vert(), vert(), vert(), vert(), vert(),
                   vert(), vert(), vert(), vert(), vert(), vert()];
      this.ind = [];
      return this;
    }

    dedecader(size){
      this.vert = [];
      this.ind = [];
      return this;
    }
} 

export function render(canvas) {
    return new _render(canvas);
  }

 class _render
 {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = this.canvas.getContext("webgl2");
    this.frameW = this.canvas.width;
    this.frameH = this.canvas.height;
    }
    
    camSet(camLoc, camAt, camUp, projSize, farClip) {
       this.cam = camera.cam(camLoc, camAt, camUp, this.frameW, this.frameH);
       this.cam = this.cam.camSetProj(projSize, projSize, farClip);
       this.cam = this.cam.camSetSize(this.frameW, this.frameH);
    }

  init() {
    this.gl.clearColor(0.0, 0.0, 0.6, 1.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    //this.shader = shd.shader("default");
    //this.shader.apply();

    let fs_txt = 
    `#version 300 es
    precision highp float;
    out vec4 OutColor;
    in vec3 drawPos;
    uniform mat4 MatrW;
    uniform mat4 MatrWVP;
    uniform mat4 MatrWNorm;
      
    void main( void )
    {
      OutColor = vec4(1.0, 0.0, 0.0, 1.0);
    }
    `;

    let vs_txt = 
    `#version 300 es
    precision highp float;
    in vec3 InPosition;
    in vec3 InNormal;
    out vec3 drawPos;
   
    void main( void )
    {
      gl_Position = vec4(InPosition, 1);
    }
    `;

    let vs = this.loadShader(this.gl.VERTEX_SHADER, vs_txt),
         fs = this.loadShader(this.gl.FRAGMENT_SHADER, fs_txt),
         prg = this.gl.createProgram();
    this.prg = prg;
    this.gl.attachShader(prg, vs);
    this.gl.attachShader(prg, fs);
    this.gl.linkProgram(prg);
    if (!this.gl.getProgramParameter(prg, this.gl.LINK_STATUS)) {
      let buf = this.gl.getProgramInfoLog(prg);
      console.log("Program link fail: " + buf);
    }
    this.gl.useProgram(prg);
  };

  render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.primDraw(primitive("tetraeder", 0.5), matrix.mat4().matrScale(vector.vec3(0, 0, 0)));
  };

  mainloop() {
    const draw = () => {
    this.render();
    window.requestAnimationFrame(draw);
  }
  draw();
 };

  primDraw(prim, world)
  {
    prim.matw = prim.trans.mulMatr(world),
    prim.wnormal = prim.matw.setInverse().setTranspose(),
    prim.wvp =  prim.matw.mulMatr(this.cam.matrVP);

    let vertexes = [];
    for (let i = 0; i < prim.ind.length; i++)
      vertexes[i * 3] = prim.vert[prim.ind[i]].p.x, 
      vertexes[i * 3 + 1] = prim.vert[prim.ind[i]].p.y, 
      vertexes[i * 3 + 2] = prim.vert[prim.ind[i]].p.z;
      
    const posLoc = this.gl.getAttribLocation(this.prg, "InPosition");
    let vertexArray = this.gl.createVertexArray();
    this.gl.bindVertexArray(vertexArray);
    let vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, vertexBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertexes), this.gl.STATIC_DRAW);
    if (posLoc != -1) {
      this.gl.vertexAttribPointer(posLoc, 3, this.gl.FLOAT, false, 0, 0);
      this.gl.enableVertexAttribArray(posLoc);
    }
    this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, vertexes.length);
    /*
    let matrWLoc = this.gl.getUniformLocation(this.prg, "MatrV");
    let matrWNormLoc = this.gl.getUniformLocation(this.prg, "MatrVNorm");
    let matrWVPLoc = this.gl.getUniformLocation(this.prg, "MatrWVP");
    this.gl.uniform1fv(matrWLoc, prim.matw);
    this.gl.uniform1fv(matrWNormLoc, prim.wnormal);
    this.gl.uniform1fv(matrWVPLoc, prim.wvp);
    */
    }
  
   loadShader(shaderType, shaderSource) {
    const shader = this.gl.createShader(shaderType);
    this.gl.shaderSource(shader, shaderSource);
    this.gl.compileShader(shader);
    if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      let buf = this.gl.getShaderInfoLog(shader);
      console.log("Shader compile fail: " + buf);
    }
    return shader;
 }
}
