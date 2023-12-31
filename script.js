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
        // this.mesh.position.y = Math.random() * 10 - 20;
        this.mesh.position.y = 1;
        this.mesh.position.z = -10; // Adjust the z-position for parallax effect
    }

    update() {
        // Move the obstacle downwards
        this.mesh.position.z += 0.1;

        // If the obstacle is out of the screen, reset its position
        if (this.mesh.position.z > 3) {
            this.resetPosition();
        }
    }

}

// Create an array to hold the obstacles
const obstacles = [];
for (let i = 0; i < 2; i++) {
    const obstacle = new Obstacle();
    obstacles.push(obstacle);
}

// Define movement and jumping variables (same as before)
const moveSpeed = 0.1;
let jumpForce = 0;

// Check if the character is on the ground
let isGrounded = false;

// Keyboard input (for arrow keys)
const keyboard = {};

document.addEventListener('keydown', (event) => {
    keyboard[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keyboard[event.code] = false;
});

// Touch input (for swipe gestures)
const touchArea = document.body;
const touchManager = new Hammer.Manager(touchArea);

// Swipe left and right
const swipe = new Hammer.Swipe();
touchManager.add(swipe);

touchManager.on('swipeleft', () => {
    keyboard['ArrowLeft'] = true;
    setTimeout(() => {
        keyboard['ArrowLeft'] = false;
    }, 1000); // Adjust the duration of the key press as needed
});

touchManager.on('swiperight', () => {
    keyboard['ArrowRight'] = true;
    setTimeout(() => {
        keyboard['ArrowRight'] = false;
    }, 1000); // Adjust the duration of the key press as needed
});

// Swipe up (for jump)
const tap = new Hammer.Tap();
touchManager.add(tap);

touchManager.on('tap', () => {
    keyboard['ArrowUp'] = true;
    setTimeout(() => {
        keyboard['ArrowUp'] = false;
    }, 1000); // Adjust the duration of the key press as needed
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

    // Update obstacles
    obstacles.forEach(obstacle => {
        obstacle.update();
    });

    renderer.render(scene, camera);
}
animate();


// Rest of the code (keyboard input, physics update, animate) remains unchanged.
