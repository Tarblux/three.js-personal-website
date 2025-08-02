uniform float uTime;
uniform float uHorizontal;
uniform float uVertical;
uniform float uWaveHeight;
uniform float uSpeed;
uniform vec2 uOffset;

varying vec2 vUv;
varying vec3 vNormal;

void main() {
  vUv = uv;
  vNormal = normal;
  
  vec3 pos = position;
  
  // Add wave animation based on position and time
  // Use abs(pos.x) to ensure wave effect works from both sides of the flag
  float wave = sin(uHorizontal * pos.x + uVertical * pos.y - uTime * uSpeed + uOffset.x) * uWaveHeight * (abs(pos.x) + 0.1);
  pos.z += wave;
  
  // Update normal for lighting
  vNormal = normalize(normalMatrix * normal);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
} 