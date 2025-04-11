# 🎮 Super Cublox 

[![Play Now](https://img.shields.io/badge/PLAY-NOW-brightgreen?style=for-the-badge)](https://parishamaheshj18.github.io/SuperCublox/)
[![GitHub stars](https://img.shields.io/github/stars/parishamaheshj18/SuperCublox?style=social)](https://github.com/parishamaheshj18/SuperCublox/stargazers)

A dynamic 3D obstacle-dodging game built with Three.js, featuring physics-based movement and shadow effects. Control a cube character to avoid falling obstacles!

![Gameplay Screenshot](https://i.imgur.com/JQ8w5zP.png) *(Replace with actual gameplay GIF/screenshot)*

## 🚀 Technical Highlights
- **Three.js-powered 3D engine** with smooth rendering (60fps)
- **Physics-based movement system** with gravity and jumping
- **Shadow mapping** for realistic lighting (directional + ambient)
- **Collision detection** using `THREE.Box3` bounding boxes
- **Procedurally generated obstacles** with random positions

## 🕹️ How to Play
| Control       | Action                |
|---------------|-----------------------|
| ← → Arrow Keys| Move left/right       |
| ↑ Arrow Key   | Jump                  |
| Avoid         | Red falling cubes     |

## 🧠 Code Architecture
```javascript
// Core Systems:
1. Three.js Scene Setup
   - WebGL renderer with antialiasing
   - Phong materials for realistic lighting
   - Shadow-enabled directional light

2. Game Entities:
   - Player (Green cube with jump physics)
   - Obstacles (Red cubes with procedural spawning)

3. Game Loop:
   - animate() → updatePhysics() → collision detection
