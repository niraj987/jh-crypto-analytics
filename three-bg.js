const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();

// Deep space fog for depth perception
scene.fog = new THREE.FogExp2(0x030308, 0.015);

// Camera Setup
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 9;

const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Group to house the 3D Core Model and its orbiting rings
const hologramGroup = new THREE.Group();
scene.add(hologramGroup);

// 1. Core Model: Glowing Holographic Cryptographic Torus Knot
// We use a TorusKnot to represent complex crypto data structures, styled like a digital crystal.
const coreGeometry = new THREE.TorusKnotGeometry(1.6, 0.45, 150, 20, 3, 4);

// Premium translucent glassmorphic material that reacts beautifully to moving lights
const coreMaterial = new THREE.MeshStandardMaterial({
    color: 0x00f2fe,
    emissive: 0x081b2b,
    roughness: 0.15,
    metalness: 0.9,
    transparent: true,
    opacity: 0.35,
    wireframe: false,
    flatShading: true // Gives a stunning low-poly digital crystal look
});

const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
hologramGroup.add(coreMesh);

// Add a glowing neon wireframe overlay to highlight the digital edges
const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0x7b2ff7,
    wireframe: true,
    transparent: true,
    opacity: 0.25
});
const wireframeOverlay = new THREE.Mesh(coreGeometry, wireframeMaterial);
hologramGroup.add(wireframeOverlay);

// 2. Interactive Orbital Rings (Data Channels)
const ringGeo1 = new THREE.TorusGeometry(3.2, 0.03, 8, 100);
const ringMat1 = new THREE.MeshBasicMaterial({
    color: 0x00f2fe,
    transparent: true,
    opacity: 0.4,
    wireframe: true
});
const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
ring1.rotation.x = Math.PI / 2.5;
hologramGroup.add(ring1);

const ringGeo2 = new THREE.TorusGeometry(3.6, 0.02, 8, 100);
const ringMat2 = new THREE.MeshBasicMaterial({
    color: 0xff007f,
    transparent: true,
    opacity: 0.3,
    wireframe: true
});
const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
ring2.rotation.x = -Math.PI / 3;
ring2.rotation.y = Math.PI / 4;
hologramGroup.add(ring2);

// 3. Futuristic Lighting System
const ambientLight = new THREE.AmbientLight(0x0a0a20);
scene.add(ambientLight);

// Two moving point lights that orbit the core, creating shifting specular highlights and crystal reflections
const cyanLight = new THREE.PointLight(0x00f2fe, 6, 30);
scene.add(cyanLight);

const magentaLight = new THREE.PointLight(0xff007f, 6, 30);
scene.add(magentaLight);

// Helper helper spheres for debugging (hidden by default)
cyanLight.position.set(5, 5, 5);
magentaLight.position.set(-5, -5, 5);

// 4. Data Particle Cloud (Orbiting Node Network)
const particlesGeo = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);
const colorsArray = new Float32Array(particlesCount * 3);

const colorPalette = [
    new THREE.Color(0x00f2fe), // Cyan
    new THREE.Color(0xff007f), // Pink
    new THREE.Color(0x7b2ff7), // Purple
    new THREE.Color(0xffffff)  // White
];

for (let i = 0; i < particlesCount * 3; i += 3) {
    // Generate particles in a spherical layout
    const radius = 25;
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = Math.cbrt(Math.random()) * radius;

    posArray[i] = r * Math.sin(phi) * Math.cos(theta);
    posArray[i + 1] = r * Math.sin(phi) * Math.sin(theta);
    posArray[i + 2] = r * Math.cos(phi);

    const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    colorsArray[i] = color.r;
    colorsArray[i + 1] = color.g;
    colorsArray[i + 2] = color.b;
}

particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeo.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

const particleMat = new THREE.PointsMaterial({
    size: 0.045,
    vertexColors: true,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending
});
const particleSystem = new THREE.Points(particlesGeo, particleMat);
scene.add(particleSystem);

// Mouse tracking parallax
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
});

// Animation clock
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // 1. Smooth mouse parallax
    targetX = mouseX * 0.0008;
    targetY = mouseY * 0.0008;

    hologramGroup.rotation.y += 0.04 * (targetX - hologramGroup.rotation.y);
    hologramGroup.rotation.x += 0.04 * (targetY - hologramGroup.rotation.x);

    // 2. Slow hypnotic model rotation
    coreMesh.rotation.y = time * 0.15;
    coreMesh.rotation.z = time * 0.08;
    wireframeOverlay.rotation.y = time * 0.15;
    wireframeOverlay.rotation.z = time * 0.08;

    // 3. Counter-rotating rings
    ring1.rotation.z = time * 0.2;
    ring2.rotation.z = -time * 0.3;

    // 4. Slow spin of particle cloud
    particleSystem.rotation.y = time * 0.01;
    particleSystem.rotation.x = time * 0.005;

    // 5. Pulsing holographic scale
    const pulse = 1.0 + Math.sin(time * 1.5) * 0.03;
    hologramGroup.scale.set(pulse, pulse, pulse);

    // 6. Rotate point lights around the core to create dynamic crystal reflections
    cyanLight.position.x = Math.sin(time * 0.8) * 6;
    cyanLight.position.z = Math.cos(time * 0.8) * 6;
    cyanLight.position.y = Math.sin(time * 0.4) * 3;

    magentaLight.position.x = Math.sin(time * 0.8 + Math.PI) * 6;
    magentaLight.position.z = Math.cos(time * 0.8 + Math.PI) * 6;
    magentaLight.position.y = Math.cos(time * 0.4) * 3;

    renderer.render(scene, camera);
}

animate();

// Window Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
