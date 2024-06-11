import {D2R} from './mymath.js';
import * as vector from './vec.js';

//matrix function
export function mat4(...args) {
    return new _mat4(...args);
} //End of 'mat4' function

//class '_mat4'
class _mat4 {
    constructor(m = null) {
        if (m == null)
          this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
        else if (typeof m == 'object' && m.lenght == 4)
          this.m = m;
          else
            this.m = m.m;
    }

    toArray(){
    let arr;

    for (let i = 0; i < 4; i++)
      for(let j = 0; j < 4; j++)
        arr[i * 4 + j] = this.m[i][j];
    return arr;
    }


    //Translate
       setTranslate(dx, dy, dz) {
          if (dx == undefined)
            dx = 0, dy = 0, dz = 0;
          else if (typeof x == 'object')
            if (dx.lenght == 3)
              dx = x[0], dy = x[1], dz = x[2];
            else 
              dx = x.x, dy = x.y, dz = x.z;
            if (dy == undefined || dz == undefined)
              dx = dx, dy = dx, dz == dx;
            this.m = [[1, 0, 0, 0],[0, 1, 0, 0],[0, 0, 1, 0],[dx, dy, dz, 1]];
        return this;
    };

    //Transpose
    setTranspose() {
         this.m = [[this.m[0][0], this.m[1][0], this.m[2][0], this.m[3][0]], [this.m[0][1], this.m[1][1], this.m[2][1], this.m[3][1]], 
         [this.m[0][2], this.m[1][2], this.m[2][2], this.m[3][2]], [this.m[0][3], this.m[1][3], this.m[2][3], this.m[3][3]]];
         return this;
    };

    //Mul matrix
    mulMatr(m) {
        this.m = [[this.m[0][0] * m.m[0][0] + this.m[0][1] * m.m[1][0] + this.m[0][2] * m.m[2][0] + this.m[0][3] * m.m[3][0],
                   this.m[0][0] * m.m[0][1] + this.m[0][1] * m.m[1][1] + this.m[0][2] * m.m[2][1] + this.m[0][3] * m.m[3][1],
                   this.m[0][0] * m.m[0][2] + this.m[0][1] * m.m[1][2] + this.m[0][2] * m.m[2][2] + this.m[0][3] * m.m[3][2],
                   this.m[0][0] * m.m[0][3] + this.m[0][1] * m.m[1][3] + this.m[0][2] * m.m[2][3] + this.m[0][3] * m.m[3][3]],

                  [this.m[1][0] * m.m[0][0] + this.m[1][1] * m.m[1][0] + this.m[1][2] * m.m[2][0] + this.m[1][3] * m.m[3][0],
                   this.m[1][0] * m.m[0][1] + this.m[1][1] * m.m[1][1] + this.m[1][2] * m.m[2][1] + this.m[1][3] * m.m[3][1],
                   this.m[1][0] * m.m[0][2] + this.m[1][1] * m.m[1][2] + this.m[1][2] * m.m[2][2] + this.m[1][3] * m.m[3][2],
                   this.m[1][0] * m.m[0][3] + this.m[1][1] * m.m[1][3] + this.m[1][2] * m.m[2][3] + this.m[1][3] * m.m[3][3]],
 
                  [this.m[2][0] * m.m[0][0] + this.m[2][1] * m.m[1][0] + this.m[2][2] * m.m[2][0] + this.m[2][3] * m.m[3][0],
                   this.m[2][0] * m.m[0][1] + this.m[2][1] * m.m[1][1] + this.m[2][2] * m.m[2][1] + this.m[2][3] * m.m[3][1],
                   this.m[2][0] * m.m[0][2] + this.m[2][1] * m.m[1][2] + this.m[2][2] * m.m[2][2] + this.m[2][3] * m.m[3][2],
                   this.m[2][0] * m.m[0][3] + this.m[2][1] * m.m[1][3] + this.m[2][2] * m.m[2][3] + this.m[2][3] * m.m[3][3]],

                 [this.m[3][0] * m.m[0][0] + this.m[3][1] * m.m[1][0] + this.m[3][2] * m.m[2][0] + this.m[3][3] * m.m[3][0],
                  this.m[3][0] * m.m[0][1] + this.m[3][1] * m.m[1][1] + this.m[3][2] * m.m[2][1] + this.m[3][3] * m.m[3][1],
                  this.m[3][0] * m.m[0][2] + this.m[3][1] * m.m[1][2] + this.m[3][2] * m.m[2][2] + this.m[3][3] * m.m[3][2],
                  this.m[3][0] * m.m[0][3] + this.m[3][1] * m.m[1][3] + this.m[3][2] * m.m[2][3] + this.m[3][3] * m.m[3][3]]];

       return this;
    }; //End of 'mulmatr' function

    //Inverse
    matrDeterm3x3(m11, m12, m13, m21, m22, m23, m31, m32, m33) {
       return m11 * m22 * m33 + m12 * m23 * m31 + m13 * m21 * m32 - m11 * m23 * m32 - m12 * m21 * m33 - m13 * m22 * m31;
     };//End of 'MatrDeterm3x3' function 

     matrDeterm() {
        return this.m[0][0] * this.matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                                                 this.m[2][1], this.m[2][2], this.m[2][3],
                                                 this.m[3][1], this.m[3][2], this.m[3][3]) +
              -this.m[0][1] * this.matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                                                 this.m[2][0], this.m[2][2], this.m[2][3],
                                                 this.m[3][0], this.m[3][2], this.m[3][3]) +
              +this.m[0][2] * this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                                                 this.m[2][0], this.m[2][1], this.m[2][3],
                                                 this.m[3][0], this.m[3][1], this.m[3][3]) +
              -this.m[0][3] * this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                                                 this.m[2][0], this.m[2][1], this.m[2][2],
                                                 this.m[3][0], this.m[3][1], this.m[3][2]);
} // End of 'matrDeterm' function 

    setInverse() {
      let det = this.matrDeterm();
    
      if (det == 0)
        this.m = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
      else {
      this.m[0][0] = this.matrDeterm3x3(this.m[1][1], this.m[1][2], this.m[1][3],
                     this.m[2][1], this.m[2][2], this.m[2][3],
                     this.m[3][1], this.m[3][2], this.m[3][3]) / det;
    
      this.m[1][0] = -this.matrDeterm3x3(this.m[1][0], this.m[1][2], this.m[1][3],
                      this.m[2][0], this.m[2][2], this.m[2][3],
                      this.m[3][0], this.m[3][2], this.m[3][3]) / det;
    
      this.m[2][0] = this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][3],
                     this.m[2][0], this.m[2][1], this.m[2][3],
                     this.m[3][0], this.m[3][1], this.m[3][3]) / det;
    
      this.m[3][0] = -this.matrDeterm3x3(this.m[1][0], this.m[1][1], this.m[1][2],
                      this.m[2][0], this.m[2][1], this.m[2][2],
                      this.m[3][0], this.m[3][1], this.m[3][2]) / det;
    
      this.m[0][1] = -this.matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                      this.m[2][1], this.m[2][2], this.m[2][3],
                      this.m[3][1], this.m[3][2], this.m[3][3]) / det;
    
      this.m[1][1] = this.matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                     this.m[2][0], this.m[2][2], this.m[2][3],
                     this.m[3][0], this.m[3][2], this.m[3][3]) / det;
    
      this.m[2][1] = -this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                      this.m[2][0], this.m[2][1], this.m[2][3],
                      this.m[3][0], this.m[3][1], this.m[3][3]) / det;
    
      this.m[3][1] = this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                     this.m[2][0], this.m[2][1], this.m[2][2],
                     this.m[3][0], this.m[3][1], this.m[3][2]) / det;
    
    
      this.m[0][2] = this.matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                     this.m[1][1], this.m[1][2], this.m[1][3],
                     this.m[3][1], this.m[3][2], this.m[3][3]) / det;
   
      this.m[1][2] = -this.matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                      this.m[1][0], this.m[1][2], this.m[1][3],
                      this.m[3][0], this.m[3][2], this.m[3][3]) / det;
    
      this.m[2][2] = this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                     this.m[1][0], this.m[1][1], this.m[1][3],
                     this.m[3][0], this.m[3][1], this.m[3][3]) / det;
    
      this.m[3][2] = -this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                      this.m[1][0], this.m[1][1], this.m[1][2],
                      this.m[3][0], this.m[3][1], this.m[3][2]) / det;
       
      this.m[0][3] = -this.matrDeterm3x3(this.m[0][1], this.m[0][2], this.m[0][3],
                      this.m[1][1], this.m[1][2], this.m[1][3],
                      this.m[2][1], this.m[2][2], this.m[2][3]) / det;
    
      this.m[1][3] = this.matrDeterm3x3(this.m[0][0], this.m[0][2], this.m[0][3],
                     this.m[1][0], this.m[1][2], this.m[1][3],
                     this.m[2][0], this.m[2][2], this.m[2][3]) / det;
    
      this.m[2][3] = -this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][3],
                      this.m[1][0], this.m[1][1], this.m[1][3],
                      this.m[2][0], this.m[2][1], this.m[2][3]) / det;
   
      this.m[3][3] = this.matrDeterm3x3(this.m[0][0], this.m[0][1], this.m[0][2],
                     this.m[1][0], this.m[1][1], this.m[1][2],
                     this.m[2][0], this.m[2][1], this.m[2][2]) / det;
      } 
      return this; 
    };
    
     matrView(loc, at, up1) {
      let
       dir = at.add(loc.mulNum(-1)).normalise(),
       right = dir.cross(up1).normalise(),
       up = right.cross(dir);
       
       this.m = [[right.x, up.x, -dir.x, 0],
                [right.y, up.y, -dir.y, 0],
                [right.z, up.z, -dir.z, 0],
                [-loc.dot(right), -loc.dot(up), loc.dot(dir), 1]];
      return this;
     };

     matrFrustrum(l, r, t, b, n, f) {
      this.m = [[ 2 * n / (r - l), 0, 0, 0 ],
               [ 0, 2 *  n / (t - b), 0, 0 ],
               [ (r + l) / (r - l), (t + b) / (t - b), (f + n) / (n - f), -1 ],
               [ 0, 0, 2 * n * f / (n - f), 0]];
      return this;
     };

     matrRotateX(angle) {
        let a = D2R(angle);
        this.m = [[1, 0, 0, 0],
                  [0, Math.cos(a), Math.sin(a), 0],
                  [0, -Math.sin(a), Math.cos(a), 0],
                  [0, 0, 0, 1]];
        return this;
    };


     matrRotateY(angle) {
      let a = D2R(angle);
      this.m = [[Math.cos(a), 0, -Math.sin(a), 0],
                [0, 1, 0, 0],
                [Math.sin(a), 0, Math.cos(a), 0],
                [0, 0, 0, 1]];
      return this;
     };

     matrRotateZ(angle) {
      let a = D2R(angle);
       this.m = [[Math.cos(a), Math.sin(a), 0, 0],
                 [-Math.sin(a), Math.cos(a), 0, 0],
                 [0, 0, 1, 0],
                 [0, 0, 0, 1]];
       return this;
     };

     matrScale(v) {
      this.m = [[v.x, 0, 0, 0],
                [0, v.y, 0, 0],
                [0, 0, v.z, 0],
                [0, 0, 0, 1]];
      return this;        
     };
    }