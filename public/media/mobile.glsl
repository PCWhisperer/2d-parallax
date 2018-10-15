#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HALF_PI 1.57079632679

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform vec4 u_date;


// glslCanvas vscode extension
// #define u_tex u_texture_0
// #define u_sprite u_texture_1

uniform sampler2D u_tex;
uniform float u_startTime;

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution.xy;  

  gl_FragColor = texture2D(u_tex, st);    

  if(u_startTime>0.0){
    float alpha = smoothstep(0.0, 0.5, u_time - u_startTime);
    gl_FragColor = mix(vec4(1.0,0.0,0.0,1.0), gl_FragColor, alpha);
  }

}