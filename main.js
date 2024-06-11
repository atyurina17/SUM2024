import * as vector from './math/vec.js'
//import * as shd from './shaders.js'
//import * as buf from './buffers.js'
import * as render from './render.js'

export function main() {
  const rnd = render.render(document.getElementById("MyCan"));
  rnd.camSet(vector.vec3(0, 0, 1), vector.vec3(0, 0, 0), vector.vec3(0, 1, 0), 0.1, 1000);
  rnd.init();
  rnd.camSet(vector.vec3(0, 0, 1), vector.vec3(0, 0, 0), vector.vec3(0, 1, 0), 0.1, 1000);
  rnd.mainloop();
};

 window.addEventListener('load', () => {
  main();
 });
 