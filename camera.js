import * as vector from './vec.js';
import * as matrix from './mat.js';

//Camera function
export function cam(loc, at, up, frameW, frameH) {
    return new _cam(loc, at, up, frameW, frameH);
}; //End of 'cam' function

//class '_cam'
class _cam {
    constructor(loc, at, up, frameW, frameH)
    {
        this.loc = vector.vec3(loc);
        this.at = vector.vec3(at);
        this.matrProj = matrix.mat4();
        this.matrView = matrix.mat4().matrView(loc, at, up);
        this.matrVP = this.matrView.mulMatr(this.matrProj);
        this.frameW = frameW;
        this.frameH = frameH;

        this.right = vector.vec3(this.matrView.m[0][0], this.matrView.m[1][0], this.matrView.m[2][0]);
        this.up = vector.vec3(this.matrView.m[0][1], this.matrView.m[1][1], this.matrView.m[2][1]);
        this.dir = vector.vec3(-this.matrView.m[0][2],-this.matrView.m[1][2], -this.matrView.m[2][2]);
    }

     camSetProj(size, dist, farClip) {
            let rx = size, ry = size;
            this.projSize = size;
            this.projDist = dist;
            this.farClip = farClip;

            if (this.frameW >= this.frameH)
                rx *= this.frameW / this.frameH;
            else
                ry *= this.frameH / this.frameW;

            this.wp = rx;
            this.hp = ry;
            this.matrProj = this.matrProj.matrFrustrum(-rx / 2, rx / 2, -ry / 2, ry / 2, this.projDist, this.farClip); 
            this.matrVP.mulMatr(this.matrView, this.matrProj);
            return this;
            }; 

        camSetSize(frameW, frameH) {
            this.frameW = frameW;
            this.frameH = frameH;
            return this.camSetProj()
        };

        camRespounse(){
            
        }
    }
 //End of '_cam' class