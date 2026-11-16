// Very light WebGL background for the hero: a slow warm gradient with fine grain.
// Half resolution, ~30 fps, paused off-screen and in hidden tabs.
const FRAG = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec3 a,b,c;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){vec2 uv=gl_FragCoord.xy/r;vec2 p=uv*vec2(r.x/r.y,1.)*1.6;
float v=n(p+vec2(t*.03,-t*.02))*.6+n(p*2.1-vec2(t*.02,t*.025))*.4;
vec3 col=mix(a,b,smoothstep(.25,.85,v*(.55+uv.x*.6)));
col=mix(col,c,smoothstep(.6,1.,1.-uv.y)*.35);
col+=(h(gl_FragCoord.xy+fract(t))-.5)*.025;
gl_FragColor=vec4(col,1.);}`;
const VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';

export function initShader() {
  const canvas = document.querySelector('[data-shader]');
  if (!canvas) return;
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power', preserveDrawingBuffer: false });
  if (!gl) return;

  const compile = (type, src) => {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  };
  const vs = compile(gl.VERTEX_SHADER, VERT);
  const fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const u = (name) => gl.getUniformLocation(prog, name);
  const uR = u('r'); const uT = u('t'); const uA = u('a'); const uB = u('b'); const uC = u('c');

  const readColors = () => {
    const cs = getComputedStyle(document.documentElement);
    const v = (name) => cs.getPropertyValue(name).trim().split(/\s+/).map(Number);
    gl.uniform3fv(uA, v('--shader-a'));
    gl.uniform3fv(uB, v('--shader-b'));
    gl.uniform3fv(uC, v('--shader-c'));
  };
  const resize = () => {
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.5;
    canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale));
    canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uR, canvas.width, canvas.height);
  };
  readColors();
  resize();

  let onScreen = true;
  let raf = 0;
  let last = 0;
  const start = performance.now();
  const frame = (now) => {
    raf = 0;
    if (!onScreen || document.hidden) return;
    if (now - last >= 33) {
      last = now;
      gl.uniform1f(uT, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      canvas.classList.add('is-on');
    }
    raf = requestAnimationFrame(frame);
  };
  const play = () => { if (!raf) raf = requestAnimationFrame(frame); };

  new IntersectionObserver(([e]) => { onScreen = e.isIntersecting; if (onScreen) play(); }).observe(canvas);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) play(); });
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('themechange', readColors);
  canvas.addEventListener('webglcontextlost', (e) => { e.preventDefault(); cancelAnimationFrame(raf); canvas.classList.remove('is-on'); });
  window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
    if (e.matches) { cancelAnimationFrame(raf); raf = 0; onScreen = false; canvas.classList.remove('is-on'); }
  });
  play();
}
