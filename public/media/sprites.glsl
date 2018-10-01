#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define HALF_PI 1.57079632679

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// glslCanvas vscode extension
// #define u_tex u_texture_0
// #define u_sprite u_texture_1

uniform sampler2D u_tex;
uniform sampler2D u_sprite;

/* Math 2D Transformations */
mat2 rotate2d(in float angle){
  return mat2(cos(angle),-sin(angle), sin(angle), cos(angle));
}

// pos: sprite center, a: angle, size: sprite scale
vec4 sprite(vec2 pos, float a, float size){
  // current pixel
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  // sprite uv in [0-1] relative to current pixel and sprite center
  vec2 new_st = (st - pos + size * 0.5) / size;

  // to origin and back for rotation
  new_st -= vec2(0.5);
  new_st = rotate2d(a) * new_st;
  new_st += vec2(0.5);

  // transparent if out-of-bound to prevent texture wrapping  
  if (new_st.x < 0.0 || new_st.x > 1.0 || new_st.y < 0.0 || new_st.y > 1.0)
    return vec4(0.0);
  return texture2D(u_sprite, new_st);
}

void main(){
  vec2 st = gl_FragCoord.xy / u_resolution.xy;

  float a = mod(u_time * 5.0, 2.0 * PI);  

  gl_FragColor = texture2D(u_tex, st);  

  for (float x = 0.05;x < 1.0;x += 0.1) {
    for (float y = 0.05;y < 1.0;y += 0.1) {
      vec4 spriteColor = sprite(vec2(x,y), a, 0.05);
      gl_FragColor = mix(gl_FragColor, spriteColor, spriteColor.a);
    }
  }
}