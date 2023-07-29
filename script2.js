// script.js

// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // Enable shadows
document.body.appendChild(renderer.domElement);

// Create a cube object (character)
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.castShadow = true; // Enable shadows for the character
scene.add(cube);

// Set the initial position of the character
cube.position.y = 1;

// Set the camera position
camera.position.set(0, 3, 5);
camera.lookAt(cube.position);

// Add ambient light to illuminate the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Add directional light to cast shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 5);
directionalLight.castShadow = true; // Enable shadows for the light
directionalLight.shadow.mapSize.width = 1024; // Shadow resolution
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Set up shadow properties for the light (same as before)
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;
// Obstacle class
class Obstacle {
    constructor() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.castShadow = true; // Enable shadows for the obstacle
        this.resetPosition();
        scene.add(this.mesh);
    }

    resetPosition() {
        // Randomize the position of the obstacle above the screen
        this.mesh.position.x = Math.random() * 6 - 3;
        this.mesh.position.y = 10;
        this.mesh.position.z = Math.random() * 4 - 2;
    }

    update() {
        // Move the obstacle downwards
        this.mesh.position.y -= 0.1;

        // If the obstacle is out of the screen, reset its position
        if (this.mesh.position.y < -1) {
            this.resetPosition();
        }
    }
}

// Create an array to hold the obstacles
const obstacles = [];
for (let i = 0; i < 10; i++) {
    const obstacle = new Obstacle();
    obstacles.push(obstacle);
}

// Define movement and jumping variables (same as before)
const moveSpeed = 0.1;
let jumpForce = 0;

// Check if the character is on the ground
let isGrounded = false;

// Keyboard input
const keyboard = {};

document.addEventListener('keydown', (event) => {
    keyboard[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});

// Physics update
function updatePhysics() {
    // Apply gravity
    jumpForce -= 0.01;
    cube.position.y += jumpForce;

    // Check if the character is on the ground
    if (cube.position.y <= 1) {
        cube.position.y = 1;
        jumpForce = 0;
        isGrounded = true;
    }

    // Movement
    if (keyboard['ArrowLeft']) {
        cube.position.x -= moveSpeed;
    }
    if (keyboard['ArrowRight']) {
        cube.position.x += moveSpeed;
    }

    // Jumping
    if (isGrounded && keyboard['ArrowUp']) {
        jumpForce = 0.2;
        isGrounded = false;
    }

    // Check for collisions with obstacles
    const characterBox = new THREE.Box3().setFromObject(cube);

    obstacles.forEach(obstacle => {
        const obstacleBox = new THREE.Box3().setFromObject(obstacle.mesh);

        if (characterBox.intersectsBox(obstacleBox)) {
            // Collision detected, handle the action (e.g., end the game)
            console.log('Collision with obstacle!');
            // Add your game-over logic here, e.g., reset the game or reduce the character's health.
        }
    });
}


// Rendering loop
function animate() {
    requestAnimationFrame(animate);

    // Update physics (movement and jumping)
    updatePhysics();

    renderer.render(scene, camera);
}
animate();


// Rest of the code (keyboard input, physics update, animate) remains unchanged.
