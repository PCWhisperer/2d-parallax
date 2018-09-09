#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

uniform sampler2D u_tex;
uniform sampler2D u_texDP;

float getZ(sampler2D tex, vec2 uv){
  vec4 pixel = texture2D(tex, uv);
  return (pixel.r * 256.0 * 256.0 + pixel.g * 256.0 + pixel.b) * 255.0;  
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  float currDepth = 1.0 - (getZ(u_texDP, uv) - 884148.0) / 225731.0;

  vec2 normMousePos = u_mouse.xy / u_resolution.xy;
  vec2 deltaMouse = normMousePos - 0.5;

  vec2 delta = deltaMouse * currDepth * 0.05;

  vec2 displacedUV = uv + delta;
  vec2 reversedDisplacedUV = uv - delta;
  // float displacedDepth = (getZ(u_texDP, displacedUV) - 884148.0) / 225731.0;

  if (currDepth > 0.01)    
    gl_FragColor = texture2D(u_tex, displacedUV);  
  else
    gl_FragColor = texture2D(u_tex, uv); 

  //gl_FragColor = vec4(dp / 65536.0, 0.0, 0.0, 1.0);

  // if (abs(uv.x - normMousePos.x) < 0.01 || abs(uv.y - normMousePos.y) < 0.01)
  //   gl_FragColor = vec4(1.0,0.0,0.0,1.0);
  // else
  //   gl_FragColor = texture2D(u_tex, uv);  
}