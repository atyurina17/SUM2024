//vector function
export function vec3(...args) {
    return new _vec3(...args);
}; // End of 'vec3' function

//class '_vec3'
class _vec3 {
    constructor(x, y, z) {
        if (x == undefined)
          this.x = 0, this.y = 0, this.z = 0;
        else       
           if (typeof x == 'object')
             if (x.lenght == 3)
               this.x = x[0], this.y = x[1], this.z = x[2];
              else 
                this.x = x.x, this.y = x.y, this.z = x.z;
           else 
              if (y == undefined || z == undefined)
              this.x = x, this.y = x, this.z == x;
              else
              this.x =x, this.y = y, this.z = z;
            }

    dot(v) {
     return this.x * v.x + this.y * v.y + this.z * v.z;
    }
    add(v){
        if (typeof v == 'number')
          return vec3(this.x + v, this.y + v, this.z + v);
        else
          return vec3(this.x + v.x, this.y + v.y, this.z + v.z); 
    }
     sub(v){
        if (typeof v == 'number')
          return vec3(this.x - v, this.y - v, this.z - v);
        else
          return vec3(this.x - v.x, this.y - v.y, this.z - v.z); 
      }

    mulNum(n){
        return vec3(this.x * n, this.y * n, this.z * n);
    }

    normalise() {
        let len = this.x * this.x + this.y * this.y + this.z * this.z;
        
        if (len != 0 && len != 1)
        {
            len = Math.sqrt(len);
            return vec3(this.x / len, this.y / len, this.z / len);
        }
        return vec3(this); 
    }

    cross(v){
      return vec3( this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x); 
  } 
} //End of class '_vec3'