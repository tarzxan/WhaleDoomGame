class SpriteManager {
    constructor() {
        this.sprites = {};
        this.particlePool = [];
        this.maxParticles = 100;
        this.imagesLoaded = false;
    }

    async initializeSprites() {
        const imagePaths = {
            player: 'assets/images/player.png',
            enemy: 'assets/images/enemy.png',
            gun: 'assets/images/gun.png',
            bullet: 'assets/images/bullet.png',
            powerup: 'assets/images/powerup.png',
            particle: 'assets/images/particle.png',
            explosion: [
                'assets/images/explosion_0.png',
                'assets/images/explosion_1.png',
                'assets/images/explosion_2.png',
                'assets/images/explosion_3.png',
                'assets/images/explosion_4.png',
                'assets/images/explosion_5.png',
                'assets/images/explosion_6.png',
                'assets/images/explosion_7.png'
            ]
        };

        try {
            this.sprites.player = await this.loadImage(imagePaths.player);
            this.sprites.enemy = await this.loadImage(imagePaths.enemy);
            this.sprites.gun = imagePaths.gun ? await this.loadImage(imagePaths.gun) : this.createGunSprite();
            this.sprites.bullet = this.createBulletSprite();
            this.sprites.powerup = this.createPowerUpSprite();
            this.sprites.particle = this.createParticleSprite();
            this.sprites.explosion = this.createExplosionSprites();
            this.imagesLoaded = true;
        } catch (error) {
            console.error('Failed to load sprites:', error);
            this.fallbackToCanvasSprites();
        }
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        });
    }

    fallbackToCanvasSprites() {
        this.sprites.player = this.createPlayerSprite();
        this.sprites.enemy = this.createEnemySprite();
        this.sprites.gun = this.createGunSprite();
        this.sprites.bullet = this.createBulletSprite();
        this.sprites.explosion = this.createExplosionSprites();
        this.sprites.particle = this.createParticleSprite();
        this.sprites.powerup = this.createPowerUpSprite();
        this.imagesLoaded = true;
    }

    createPlayerSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#00ff00';
        ctx.fillRect(12, 8, 8, 16);
        ctx.fillStyle = '#90EE90';
        ctx.fillRect(14, 6, 4, 4);
        ctx.fillStyle = '#228B22';
        ctx.fillRect(10, 12, 4, 8);
        ctx.fillRect(18, 12, 4, 8);
        ctx.fillStyle = '#006400';
        ctx.fillRect(12, 20, 8, 8);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(22, 14, 6, 2);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(15, 7, 1, 1);
        ctx.fillRect(17, 7, 1, 1);
        
        return canvas;
    }

    createEnemySprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(12, 8, 8, 16);
        ctx.fillStyle = '#ff6666';
        ctx.fillRect(14, 6, 4, 4);
        ctx.fillStyle = '#cc0000';
        ctx.fillRect(10, 12, 4, 8);
        ctx.fillRect(18, 12, 4, 8);
        ctx.fillStyle = '#990000';
        ctx.fillRect(12, 20, 8, 8);
        ctx.fillStyle = '#660000';
        ctx.fillRect(13, 4, 2, 2);
        ctx.fillRect(17, 4, 2, 2);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(15, 7, 1, 1);
        ctx.fillRect(17, 7, 1, 1);
        
        return canvas;
    }

    createGunSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#808080';
        ctx.fillRect(20, 20, 32, 12);
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(20, 32, 12, 20);
        ctx.fillStyle = '#404040';
        ctx.fillRect(20, 32, 8, 8);
        
        return canvas;
    }

    createBulletSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 8;
        canvas.height = 8;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(2, 2, 4, 4);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(3, 3, 2, 2);
        
        return canvas;
    }

    createExplosionSprites() {
        const explosions = [];
        for (let frame = 0; frame < 8; frame++) {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            
            const size = 4 + frame * 3;
            const alpha = 1 - (frame / 8);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#ff6600';
            ctx.fillRect(16 - size/2, 16 - size/2, size, size);
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(16 - size/3, 16 - size/3, size/1.5, size/1.5);
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(16 - size/4, 16 - size/4, size/2, size/2);
            
            explosions.push(canvas);
        }
        return explosions;
    }

    createParticleSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 4;
        canvas.height = 4;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(1, 1, 2, 2);
        
        return canvas;
    }

    createPowerUpSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 24;
        canvas.height = 24;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(8, 8, 8, 8);
        ctx.fillStyle = '#ff0000';
        ctx.fillRect(10, 9, 4, 2);
        ctx.fillRect(11, 8, 2, 4);
        
        return canvas;
    }

    drawSprite(ctx, spriteType, x, y, rotation = 0, scale = 1, frame = 0) {
        const sprite = this.sprites[spriteType];
        if (!sprite || !this.imagesLoaded) {
            return;
        }
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(scale, scale);
        
        if (Array.isArray(sprite)) {
            const frameIndex = Math.min(frame, sprite.length - 1);
            ctx.drawImage(sprite[frameIndex], -sprite[frameIndex].width/2, -sprite[frameIndex].height/2);
        } else {
            ctx.drawImage(sprite, -sprite.width/2, -sprite.height/2);
        }
        
        ctx.restore();
    }

    createParticleEffect(x, y, color, count = 10) {
        const particles = [];
        for (let i = 0; i < count; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.03,
                color: color,
                size: 2 + Math.random() * 3
            });
        }
        return particles;
    }

    updateParticles(particles) {
        for (let i = particles.length - 1; i >= 0; i--) {
            const particle = particles[i];
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vx *= 0.98;
            particle.vy *= 0.98;
            particle.life -= particle.decay;
            if (particle.life <= 0) {
                particles.splice(i, 1);
            }
        }
    }

    drawParticles(ctx, particles) {
        if (!this.sprites.particle || !this.imagesLoaded) {
            particles.forEach(particle => {
                ctx.save();
                ctx.globalAlpha = particle.life;
                ctx.fillStyle = particle.color;
                ctx.fillRect(particle.x - particle.size/2, particle.y - particle.size/2, 
                            particle.size, particle.size);
                ctx.restore();
            });
            return;
        }
        particles.forEach(particle => {
            ctx.save();
            ctx.globalAlpha = particle.life;
            ctx.translate(particle.x, particle.y);
            ctx.scale(particle.size / this.sprites.particle.width, particle.size / this.sprites.particle.height);
            ctx.drawImage(this.sprites.particle, -this.sprites.particle.width/2, -this.sprites.particle.height/2);
            ctx.restore();
        });
    }

    createMuzzleFlash(ctx, x, y, angle) {
        const flashLength = 20;
        const flashWidth = 8;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(0, -flashWidth/4, flashLength, flashWidth/2);
        ctx.fillStyle = '#ff6600';
        ctx.fillRect(0, -flashWidth/2, flashLength * 0.8, flashWidth);
        ctx.restore();
    }
}

class SoundManager {
    constructor() {
        this.audioContext = null;
        this.sounds = {};
        this.masterVolume = 0.7;
        this.soundEnabled = true;
        this.initializeAudio();
    }

    initializeAudio() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.masterGain = this.audioContext.createGain();
            this.masterGain.gain.value = this.masterVolume;
            this.masterGain.connect(this.audioContext.destination);
            this.generateSounds();
        } catch (error) {
            console.warn('Web Audio API not supported:', error);
            this.soundEnabled = false;
        }
    }

    generateSounds() {
        this.sounds.shoot = this.createShootSound();
        this.sounds.enemyHit = this.createEnemyHitSound();
        this.sounds.enemyDeath = this.createEnemyDeathSound();
        this.sounds.playerHurt = this.createPlayerHurtSound();
        this.sounds.powerUp = this.createPowerUpSound();
        this.sounds.gameOver = this.createGameOverSound();
        this.sounds.victory = this.createVictorySound();
    }

    // ... all your original create*Sound methods (shoot, enemyHit, enemyDeath, playerHurt, powerUp, gameOver, victory)

    playSound(soundName, volume = 1.0, pitch = 1.0) {
        if (!this.soundEnabled || !this.sounds[soundName]) {
            return;
        }
        try {
            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            source.buffer = this.sounds[soundName];
            source.playbackRate.value = pitch;
            gainNode.gain.value = volume;
            source.connect(gainNode);
            gainNode.connect(this.masterGain);
            source.start();
            source.onended = () => {
                source.disconnect();
                gainNode.disconnect();
            };
        } catch (error) {
            console.warn('Error playing sound:', error);
        }
    }

    // ... setMasterVolume, toggleSound, playAmbientSound unchanged
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.spriteManager = new SpriteManager();
        this.soundManager = new SoundManager();
        
        this.gameState = 'menu';
        this.score = 0;
        this.startTime = 0;
        this.gameTime = 0;
        this.enemiesKilled = 0;
        this.waveNumber = 1;
        
        this.fov = Math.PI / 3;
        this.halfFov = this.fov / 2;
        this.numRays = this.canvas.width / 2;
        this.maxDepth = 800;
        this.wallHeight = 100;
        
        this.mapWidth = 20;
        this.mapHeight = 15;
        this.tileSize = 32;
        this.map = this.generateMap();
        
        this.player = null;
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        this.explosions = [];
        this.powerUps = [];
        
        this.keys = {};
        this.mouse = { x: 0, y: 0, pressed: false, lastX: 0 };
        this.lastShotTime = 0;
        this.shotCooldown = 150;
        this.mouseSensitivity = 0.0015;
        
        this.powerUpSpawnChance = 0.001;
        this.waveCooldown = 60000;
        this.waveTimer = 0;
        this.waitingForNextWave = false;
        this.enemiesPerWave = 5;
        this.maxWaves = 7;

        // Mobile support
        this.isMobile = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.virtualKeys = { w: false, a: false, s: false, d: false };
        this.joystickActive = false;
        this.joystickCenter = { x: 0, y: 0 };
        this.lookTouchId = null;
        this.lastLookX = 0;

        this.spriteManager.initializeSprites().then(() => {
            this.initializeEventListeners();
            this.initializeUI();
            this.gameLoop();
        }).catch(error => {
            console.error('Sprite initialization failed:', error);
            this.initializeEventListeners();
            this.initializeUI();
            this.gameLoop();
        });
    }

    // ... all your original methods unchanged (generateMap, spawnEnemies, spawnPowerUp, update, checkCollision, updateUI, castRay, render, render3DSprites, render3DSprite, drawMinimap, drawCrosshair, drawWaveIndicator, drawWaveTimer, gameLoop)

    initializeEventListeners() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (['w', 'a', 's', 'd', ' '].includes(e.key.toLowerCase())) {
                e.preventDefault();
            }
        });

        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        if (!this.isMobile) {
            this.canvas.addEventListener('mousemove', (e) => {
                if (this.gameState !== 'playing') return;
                const rect = this.canvas.getBoundingClientRect();
                const deltaX = (e.clientX - rect.left) * (this.canvas.width / rect.width) - this.mouse.lastX;
                if (this.player) this.player.angle += deltaX * this.mouseSensitivity;
                this.mouse.lastX = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            });

            this.canvas.addEventListener('mousedown', (e) => {
                this.handleShooting();
            });

            this.canvas.addEventListener('mouseup', () => {
                this.mouse.pressed = false;
            });
        }

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        if (this.isMobile) {
            this.setupMobileControls();
        }
    }

    setupMobileControls() {
        document.getElementById('mobileControls').classList.remove('hidden');

        const container = document.getElementById('joystickContainer');
        const knob = document.getElementById('joystickKnob');

        container.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            this.joystickActive = true;
            const rect = container.getBoundingClientRect();
            this.joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            this.updateJoystick(touch, knob);
        });

        container.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.joystickActive) return;
            const touch = e.touches[0];
            this.updateJoystick(touch, knob);
        });

        document.addEventListener('touchend', (e) => {
            if (this.joystickActive && e.touches.length === 0) {
                this.joystickActive = false;
                this.virtualKeys = { w: false, a: false, s: false, d: false };
                knob.style.transform = 'translate(-50%, -50%)';
            }
            if (this.lookTouchId !== null && !Array.from(e.touches).some(t => t.identifier === this.lookTouchId)) {
                this.lookTouchId = null;
            }
        });

        this.canvas.addEventListener('touchstart', (e) => {
            if (this.gameState !== 'playing') return;
            for (let touch of e.touches) {
                const rect = this.canvas.getBoundingClientRect();
                const x = touch.clientX - rect.left;
                if (x > rect.width / 2) {
                    if (this.lookTouchId === null) {
                        this.lookTouchId = touch.identifier;
                        this.lastLookX = touch.clientX;
                    }
                    this.handleShooting();
                }
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.gameState !== 'playing' || !this.player) return;
            for (let touch of e.touches) {
                if (touch.identifier === this.lookTouchId) {
                    const deltaX = touch.clientX - this.lastLookX;
                    this.player.angle += deltaX * 0.006;
                    this.lastLookX = touch.clientX;
                }
            }
        });
    }

    updateJoystick(touch, knob) {
        const dx = touch.clientX - this.joystickCenter.x;
        const dy = touch.clientY - this.joystickCenter.y;
        const dist = Math.min(60, Math.hypot(dx, dy));
        const angle = Math.atan2(dy, dx);

        const knobX = Math.cos(angle) * dist;
        const knobY = Math.sin(angle) * dist;
        knob.style.transform = `translate(calc(-50% + ${knobX}px), calc(-50% + ${knobY}px))`;

        const threshold = 20;
        this.virtualKeys.w = knobY < -threshold;
        this.virtualKeys.s = knobY > threshold;
        this.virtualKeys.a = knobX < -threshold;
        this.virtualKeys.d = knobX > threshold;
    }

    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.startTime = Date.now();
        this.gameTime = 0;
        this.enemiesKilled = 0;
        this.waveNumber = 1;
        this.waitingForNextWave = false;
        this.waveTimer = 0;
        this.bullets = [];
        this.enemies = [];
        this.particles = [];
        this.explosions = [];
        this.powerUps = [];
        this.player = new Player(2.5 * this.tileSize, 2.5 * this.tileSize, Math.PI / 4);
        this.spawnEnemies(this.enemiesPerWave);
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('instructions').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        document.getElementById('gameOver').classList.add('hidden');
        this.soundManager.playAmbientSound();
        this.updateUI();

        if (this.isMobile) {
            document.getElementById('mobileControls').classList.remove('hidden');
        }
    }

    // ... rest of Game class (handleShooting, createMuzzleFlash, etc.) unchanged
}

class Player {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.radius = 8;
        this.speed = 3;
        this.health = 100;
        this.maxHealth = 100;
        this.rotationSpeed = 0.05;
    }

    update(keys, game) {
        const effectiveKeys = game.isMobile ? game.virtualKeys : keys;

        let moveX = 0;
        let moveY = 0;
        if (effectiveKeys['w']) {
            moveX += Math.cos(this.angle) * this.speed;
            moveY += Math.sin(this.angle) * this.speed;
        }
        if (effectiveKeys['s']) {
            moveX -= Math.cos(this.angle) * this.speed;
            moveY -= Math.sin(this.angle) * this.speed;
        }
        if (effectiveKeys['a']) {
            moveX += Math.cos(this.angle - Math.PI/2) * this.speed;
            moveY += Math.sin(this.angle - Math.PI/2) * this.speed;
        }
        if (effectiveKeys['d']) {
            moveX += Math.cos(this.angle + Math.PI/2) * this.speed;
            moveY += Math.sin(this.angle + Math.PI/2) * this.speed;
        }
        const newX = this.x + moveX;
        const newY = this.y + moveY;
        if (this.canMoveTo(newX, this.y, game)) {
            this.x = newX;
        }
        if (this.canMoveTo(this.x, newY, game)) {
            this.y = newY;
        }
        if (effectiveKeys['arrowleft']) {
            this.angle -= this.rotationSpeed;
        }
        if (effectiveKeys['arrowright']) {
            this.angle += this.rotationSpeed;
        }
    }
    
    // ... rest unchanged
}

// Enemy, Bullet, Explosion, PowerUp unchanged from your original

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});
