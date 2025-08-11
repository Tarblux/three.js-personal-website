uniform float uTime;
uniform sampler2D uTexture1;
uniform sampler2D uTexture2;
uniform sampler2D uTexture3;
uniform sampler2D uTexture4;
uniform sampler2D uTexture5;
uniform float uSpeed;
varying vec2 vUv;

void main() {
    // Create a continuous scrolling offset that moves from right to left
    float scroll = uTime * uSpeed;
    
    // Each image takes exactly 1.0 unit of scroll to completely cross the screen
    // We want 5 images total, so our cycle length is 5.0
    float cyclePosition = mod(scroll, 5.0);
    
    // Calculate the current UV position for our "conveyor belt"
    // vUv.x ranges from 0 to 1 across the screen
    // We offset it by cyclePosition to create the scrolling effect
    float currentX = vUv.x + cyclePosition;
    
    // Determine which image should be visible at this X position
    int imageIndex = int(floor(currentX));
    
    // Get the local UV coordinates within the current image
    vec2 localUV = vec2(mod(currentX, 1.0), vUv.y);
    
    vec4 color = vec4(0.0); // Default to transparent/black
    
    // Sample the appropriate texture based on image index
    // We use modulo to cycle through our 5 images infinitely
    int textureIndex = imageIndex % 5;
    
    if (textureIndex == 0) {
        color = texture2D(uTexture1, localUV);
    } else if (textureIndex == 1) {
        color = texture2D(uTexture2, localUV);
    } else if (textureIndex == 2) {
        color = texture2D(uTexture3, localUV);
    } else if (textureIndex == 3) {
        color = texture2D(uTexture4, localUV);
    } else if (textureIndex == 4) {
        color = texture2D(uTexture5, localUV);
    }
    
    gl_FragColor = color;
} 