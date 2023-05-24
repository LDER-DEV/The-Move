export function spCode() {
  return `
    let audio = input();
    let pointerDown = input();
    
    
    setMaxIterations(5);
    let s = getSpace();
    let r = getRayDirection();
    
    let n1 = noise(r * 4 +vec3(0, time, vec3(0, time, time))*.5 );
    let n = noise(s + vec3(0, 0, time*.5) + n1);
    
    metal(n*.5+.5);
    shine(n*.5+.5);
    
    color(normal * .1 + vec3(1, 0.8, 0.0));
    displace(mouse.x * 2, mouse.y * 2, 0);
    boxFrame(vec3(2), abs(n) * .1 + .04 );
    mixGeo(pointerDown);
    sphere(n * .5 + .8);
  `;
}