uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  vec3 color = textureColor.rgb * uColor;
  
  // Add some lighting based on normal
  float light = dot(normalize(vNormal), normalize(vec3(1.0, 1.0, 1.0))) * 0.3 + 0.7;
  color *= light;
  
  gl_FragColor = vec4(color, textureColor.a);
} 