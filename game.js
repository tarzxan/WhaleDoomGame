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
            console.log('Attempting to load player sprite:', imagePaths.player);
            console.log('Attempting to load enemy sprite:', imagePaths.enemy);
            console.log('Attempting to load gun sprite:', imagePaths.gun);
            this.sprites.player = await this.loadImage(imagePaths.player);
            this.sprites.enemy = await this.loadImage(imagePaths.enemy);
            this.sprites.gun = imagePaths.gun ? await this.loadImage(imagePaths.gun) : this.createGunSprite();
            this.sprites.bullet = this.createBulletSprite();
            this.sprites.powerup = this.createPowerUpSprite();
            this.sprites.particle = this.createParticleSprite();
            this.sprites.explosion = this.createExplosionSprites();
            this.imagesLoaded = true;
            console.log('Sprites loaded successfully');
        } catch (error) {
            console.error('Failed to load sprites:', error);
            this.fallbackToCanvasSprites();
        }
    }

    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                console.log(`Loaded image: ${src}`);
                resolve(img);
            };
            img.onerror = () => {
                console.error(`Failed to load image: ${src}`);
                reject(new Error(`Failed to load image: ${src}`));
            };
        });
    }

    fallbackToCanvasSprites() {
        console.log('Falling back to canvas sprites');
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

    createShootSound() {
        const duration = 0.1;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const frequency = 800 * Math.pow(0.5, t * 10);
            const envelope = Math.exp(-t * 20);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
        }
        return buffer;
    }

    createEnemyHitSound() {
        const duration = 0.15;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const frequency = 300 + Math.sin(t * 50) * 100;
            const envelope = Math.exp(-t * 8);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2;
        }
        return buffer;
    }

    createEnemyDeathSound() {
        const duration = 0.3;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const frequency = 200 * Math.pow(0.3, t * 2);
            const envelope = Math.exp(-t * 3);
            const noise = (Math.random() - 0.5) * 0.1;
            data[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.4;
        }
        return buffer;
    }

    createPlayerHurtSound() {
        const duration = 0.25;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const frequency = 150 + Math.sin(t * 30) * 50;
            const envelope = Math.exp(-t * 6);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3;
        }
        return buffer;
    }

    createPowerUpSound() {
        const duration = 0.4;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const frequency = 400 + t * 800;
            const envelope = Math.sin(t * Math.PI);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2;
        }
        return buffer;
    }

    createGameOverSound() {
        const duration = 1.0;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const frequency = 100 * Math.pow(0.5, t);
            const envelope = Math.exp(-t * 2);
            data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.5;
        }
        return buffer;
    }

    createVictorySound() {
        const duration = 1.5;
        const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < data.length; i++) {
            const t = i / this.audioContext.sampleRate;
            const freq1 = 523.25;
            const freq2 = 659.25;
            const freq3 = 783.99;
            const envelope = Math.sin(t * Math.PI * 0.67);
            const note1 = Math.sin(2 * Math.PI * freq1 * t) * (t < 0.5 ? 1 : 0);
            const note2 = Math.sin(2 * Math.PI * freq2 * t) * (t > 0.3 && t < 0.8 ? 1 : 0);
            const note3 = Math.sin(2 * Math.PI * freq3 * t) * (t > 0.6 ? 1 : 0);
            data[i] = (note1 + note2 + note3) * envelope * 0.2;
        }
        return buffer;
    }

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
            gainNode.gain.value = volume * this.masterVolume;
            source.connect(gainNode);
            gainNode.connect(this.masterGain);
            source.start(0);
        } catch (e) {
            console.warn('Failed to play sound:', e);
        }
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.spriteManager = new SpriteManager();
        this.soundManager = new SoundManager();
        
        this.tileSize = 64;
        this.mapWidth = 12;
        this.mapHeight = 12;
        this.map = [
            [1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,1,0,0,0,0,1,1,0,1],
            [1,0,1,0,0,0,0,0,0,1,0,1],
            [1,0,0,0,0,1,1,0,0,0,0,1],
            [1,0,0,0,0,1,1,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,1,0,0,0,0,0,0,1,0,1],
            [1,0,1,1,0,0,0,0,1,1,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1]
        ];

        this.fov = Math.PI / 3;
        this.halfFov = this.fov / 2;
        this.numRays = this.canvas.width / 2;
        this.maxDepth = this.mapWidth * this.tileSize;
        this.wallHeight = 64;

        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.explosions = [];
        this.powerUps = [];
        this.particles = [];

        this.keys = {};
        this.gameState = 'menu';
        this.waveNumber = 1;
        this.score = 0;
        this.health = 100;
        this.enemiesKilled = 0;
        this.waitingForNextWave = false;
        this.waveCooldown = 5000;
        this.waveTimer = 0;

        // Mobile touch support
        this.activeTouches = {};

        this.init();
    }

    async init() {
        await this.spriteManager.initializeSprites();
        this.setupEventListeners();
        this.startGame();
        this.gameLoop();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
        });
        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.gameState === 'playing') {
                this.shoot();
            }
        });

        this.canvas.addEventListener('pointerlockchange', () => {
            if (!document.pointerLockElement) {
                // Pointer lock lost - could pause or show message
            }
        });

        // Mobile touch controls
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            this.canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
            this.canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
            this.canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e), { passive: false });
        }
    }

    // Mobile touch handlers
    handleTouchStart(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        for (let touch of e.changedTouches) {
            const touchX = touch.clientX - rect.left;
            const touchY = touch.clientY - rect.top;
            const id = touch.identifier;
            this.activeTouches[id] = {
                startX: touchX,
                startY: touchY,
                currentX: touchX,
                currentY: touchY,
                isMovement: touchX < this.canvas.width / 2,
                hasMoved: false
            };
        }
    }

    handleTouchMove(e) {
        e.preventDefault();
        const rect = this.canvas.getBoundingClientRect();
        for (let touch of e.changedTouches) {
            const id = touch.identifier;
            if (this.activeTouches[id]) {
                const touchX = touch.clientX - rect.left;
                const touchY = touch.clientY - rect.top;
                const control = this.activeTouches[id];
                const dx = touchX - control.currentX;
                control.currentX = touchX;
                control.currentY = touchY;

                const dist = Math.hypot(touchX - control.startX, touchY - control.startY);
                if (dist > 10) {
                    control.hasMoved = true;
                }

                if (!control.isMovement && this.player) {
                    // Look around (rotate view)
                    this.player.angle += dx * 0.006; // Sensitivity - adjust as needed
                }
            }
        }
    }

    handleTouchEnd(e) {
        e.preventDefault();
        for (let touch of e.changedTouches) {
            const id = touch.identifier;
            if (this.activeTouches[id]) {
                if (!this.activeTouches[id].isMovement && !this.activeTouches[id].hasMoved) {
                    // Quick tap on right side = shoot
                    this.shoot();
                }
                delete this.activeTouches[id];
            }
        }
    }

    startGame() {
        this.player = new Player(100, 100, 0);
        this.enemies = [];
        this.bullets = [];
        this.explosions = [];
        this.powerUps = [];
        this.particles = [];
        this.score = 0;
        this.health = 100;
        this.waveNumber = 1;
        this.enemiesKilled = 0;
        this.spawnEnemiesForWave();
        this.gameState = 'playing';
    }

    spawnEnemiesForWave() {
        const enemyCount = 3 + this.waveNumber * 2;
        for (let i = 0; i < enemyCount; i++) {
            let x, y;
            do {
                x = Math.random() * (this.mapWidth * this.tileSize - 100) + 50;
                y = Math.random() * (this.mapHeight * this.tileSize - 100) + 50;
            } while (this.isCollidingWithWall(x, y) || this.distanceToPlayer(x, y) < 150);
            this.enemies.push(new Enemy(x, y, this.waveNumber));
        }
        document.getElementById('enemiesDisplay').textContent = this.enemies.length;
    }

    isCollidingWithWall(x, y) {
        const mapX = Math.floor(x / this.tileSize);
        const mapY = Math.floor(y / this.tileSize);
        return this.map[mapY][mapX] === 1;
    }

    distanceToPlayer(x, y) {
        return Math.hypot(x - this.player.x, y - this.player.y);
    }

    shoot() {
        if (this.gameState !== 'playing' || !this.player) return;
        const bullet = new Bullet(this.player.x, this.player.y, this.player.angle);
        this.bullets.push(bullet);
        this.soundManager.playSound('shoot');
        // Muzzle flash effect could be added here
    }

    update() {
        if (this.gameState !== 'playing') return;

        this.player.update(this.keys, this);

        // Touch-based movement (virtual joystick)
        let movementTouch = null;
        for (let id in this.activeTouches) {
            if (this.activeTouches[id].isMovement) {
                movementTouch = this.activeTouches[id];
                break;
            }
        }
        if (movementTouch) {
            const dx = movementTouch.currentX - movementTouch.startX;
            const dy = movementTouch.currentY - movementTouch.startY;
            const dist = Math.hypot(dx, dy);
            const deadzone = 20;
            if (dist > deadzone) {
                let forward = -dy / dist; // Up on screen = forward
                let strafe = dx / dist;
                const magnitude = Math.min(1, (dist - deadzone) / 100);
                const moveX = Math.cos(this.player.angle) * forward * this.player.speed * magnitude
                            - Math.sin(this.player.angle) * strafe * this.player.speed * magnitude;
                const moveY = Math.sin(this.player.angle) * forward * this.player.speed * magnitude
                            + Math.cos(this.player.angle) * strafe * this.player.speed * magnitude;

                const newX = this.player.x + moveX;
                const newY = this.player.y + moveY;
                if (this.player.canMoveTo(newX, this.player.y, this)) {
                    this.player.x = newX;
                }
                if (this.player.canMoveTo(this.player.x, newY, this)) {
                    this.player.y = newY;
                }
            }
        }

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(this.player, this));

        // Update bullets
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.update(this);
            if (bullet.hitWall) {
                this.bullets.splice(i, 1);
                continue;
            }

            // Check bullet-enemy collision
            for (let j = this.enemies.length - 1; j >= 0; j--) {
                const enemy = this.enemies[j];
                const dx = bullet.x - enemy.x;
                const dy = bullet.y - enemy.y;
                if (Math.hypot(dx, dy) < enemy.radius) {
                    enemy.takeDamage(50);
                    this.bullets.splice(i, 1);
                    this.soundManager.playSound('enemyHit');
                    if (enemy.health <= 0) {
                        this.enemies.splice(j, 1);
                        this.score += 100;
                        this.enemiesKilled++;
                        this.soundManager.playSound('enemyDeath');
                        this.explosions.push(new Explosion(enemy.x, enemy.y));
                        document.getElementById('enemiesDisplay').textContent = this.enemies.length;
                    }
                    break;
                }
            }
        }

        // Update explosions
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            this.explosions[i].update();
            if (this.explosions[i].finished) {
                this.explosions.splice(i, 1);
            }
        }

        // Check win condition
        if (this.enemies.length === 0 && !this.waitingForNextWave) {
            this.waitingForNextWave = true;
            this.waveTimer = Date.now();
            this.waveNumber++;
        }

        if (this.waitingForNextWave && Date.now() - this.waveTimer > this.waveCooldown) {
            this.spawnEnemiesForWave();
            this.waitingForNextWave = false;
        }

        // Update UI
        document.getElementById('healthDisplay').textContent = this.player.health;
        document.getElementById('scoreDisplay').textContent = this.score;

        if (this.player.health <= 0) {
            this.gameOver(false);
        }
    }

    gameOver(victory = false) {
        this.gameState = 'gameOver';
        document.getElementById('gameOverTitle').textContent = victory ? 'VICTORY!' : 'GAME OVER';
        document.getElementById('timeSurvived').textContent = Math.floor((Date.now() - this.startTime) / 1000);
        document.getElementById('finalKills').textContent = this.enemiesKilled;
        document.getElementById('finalWave').textContent = this.waveNumber;
        this.soundManager.playSound(victory ? 'victory' : 'gameOver');
    }

    castRay(startX, startY, angle) {
        const rayDirX = Math.cos(angle);
        const rayDirY = Math.sin(angle);
        let mapX = Math.floor(startX / this.tileSize);
        let mapY = Math.floor(startY / this.tileSize);
        const deltaDistX = Math.abs(1 / rayDirX);
        const deltaDistY = Math.abs(1 / rayDirY);
        let stepX, stepY;
        let sideDistX, sideDistY;
        if (rayDirX < 0) {
            stepX = -1;
            sideDistX = (startX / this.tileSize - mapX) * deltaDistX;
        } else {
            stepX = 1;
            sideDistX = (mapX + 1.0 - startX / this.tileSize) * deltaDistX;
        }
        if (rayDirY < 0) {
            stepY = -1;
            sideDistY = (startY / this.tileSize - mapY) * deltaDistY;
        } else {
            stepY = 1;
            sideDistY = (mapY + 1.0 - startY / this.tileSize) * deltaDistY;
        }
        let hit = 0;
        let side;
        while (hit === 0) {
            if (sideDistX < sideDistY) {
                sideDistX += deltaDistX;
                mapX += stepX;
                side = 0;
            } else {
                sideDistY += deltaDistY;
                mapY += stepY;
                side = 1;
            }
            if (mapX < 0 || mapX >= this.mapWidth || mapY < 0 || mapY >= this.mapHeight || this.map[mapY][mapX] > 0) {
                hit = 1;
            }
        }
        let perpWallDist;
        if (side === 0) {
            perpWallDist = (mapX - startX / this.tileSize + (1 - stepX) / 2) / rayDirX;
        } else {
            perpWallDist = (mapY - startY / this.tileSize + (1 - stepY) / 2) / rayDirY;
        }
        return {
            distance: perpWallDist * this.tileSize,
            side: side,
            mapX: mapX,
            mapY: mapY
        };
    }

    render() {
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.gameState !== 'playing') return;

        // Sky and floor
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
        this.ctx.fillStyle = '#666666';
        this.ctx.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);

        if (!this.player) return;

        // Raycasting walls
        const rayAngleStep = this.fov / this.numRays;
        const rayStartAngle = this.player.angle - this.halfFov;
        for (let i = 0; i < this.numRays; i++) {
            const rayAngle = rayStartAngle + i * rayAngleStep;
            const rayResult = this.castRay(this.player.x, this.player.y, rayAngle);
            const wallHeight = (this.canvas.height / rayResult.distance) * this.wallHeight;
            const wallTop = (this.canvas.height - wallHeight) / 2;
            const distanceFactor = Math.max(0.1, 1 - rayResult.distance / this.maxDepth);
            const brightness = (rayResult.side === 0 ? 1.0 : 0.7) * distanceFactor;
            this.ctx.fillStyle = `rgb(${Math.floor(139 * brightness)}, ${Math.floor(69 * brightness)}, ${Math.floor(19 * brightness)})`;
            this.ctx.fillRect(i * 2, wallTop, 2, wallHeight);
        }

        this.render3DSprites();

        // Draw gun
        if (this.spriteManager.sprites.gun && this.spriteManager.imagesLoaded) {
            const gun = this.spriteManager.sprites.gun;
            const scale = 1.8;
            this.ctx.drawImage(
                gun,
                this.canvas.width / 2 - (gun.width * scale) / 2,
                this.canvas.height - gun.height * scale + 20,
                gun.width * scale,
                gun.height * scale
            );
        }

        this.drawCrosshair();
        this.drawWaveIndicator();
        this.drawMinimap();

        if (this.waitingForNextWave) {
            this.drawWaveTimer();
        }

        // Draw virtual joystick (mobile only)
        if (Object.keys(this.activeTouches).length > 0) {
            const joystickRadius = 60;
            this.ctx.save();
            this.ctx.globalAlpha = 0.4;
            for (let id in this.activeTouches) {
                const control = this.activeTouches[id];
                if (control.isMovement) {
                    // Base
                    this.ctx.beginPath();
                    this.ctx.arc(control.startX, control.startY, joystickRadius, 0, Math.PI * 2);
                    this.ctx.fillStyle = '#ff6b6b';
                    this.ctx.fill();
                    this.ctx.strokeStyle = '#ffffff';
                    this.ctx.lineWidth = 3;
                    this.ctx.stroke();

                    // Thumb
                    let thumbX = control.currentX;
                    let thumbY = control.currentY;
                    const dx = control.currentX - control.startX;
                    const dy = control.currentY - control.startY;
                    const dist = Math.hypot(dx, dy);
                    if (dist > joystickRadius) {
                        thumbX = control.startX + (dx / dist) * joystickRadius;
                        thumbY = control.startY + (dy / dist) * joystickRadius;
                    }
                    this.ctx.beginPath();
                    this.ctx.arc(thumbX, thumbY, joystickRadius / 2, 0, Math.PI * 2);
                    this.ctx.fillStyle = '#ffffff';
                    this.ctx.fill();
                }
            }
            this.ctx.restore();
        }
    }

    render3DSprites() {
        const sprites = [];

        this.enemies.forEach(enemy => {
            const dx = enemy.x - this.player.x;
            const dy = enemy.y - this.player.y;
            const distance = Math.hypot(dx, dy);
            sprites.push({ type: 'enemy', object: enemy, distance });
        });

        this.powerUps.forEach(powerUp => {
            const dx = powerUp.x - this.player.x;
            const dy = powerUp.y - this.player.y;
            const distance = Math.hypot(dx, dy);
            sprites.push({ type: 'powerup', object: powerUp, distance });
        });

        this.bullets.forEach(bullet => {
            const dx = bullet.x - this.player.x;
            const dy = bullet.y - this.player.y;
            const distance = Math.hypot(dx, dy);
            sprites.push({ type: 'bullet', object: bullet, distance });
        });

        this.explosions.forEach(explosion => {
            const dx = explosion.x - this.player.x;
            const dy = explosion.y - this.player.y;
            const distance = Math.hypot(dx, dy);
            sprites.push({ type: 'explosion', object: explosion, distance, frame: explosion.frame });
        });

        sprites.sort((a, b) => b.distance - a.distance);

        sprites.forEach(sprite => {
            this.render3DSprite(sprite.object, sprite.type, sprite.distance, sprite.frame || 0);
        });
    }

    render3DSprite(object, type, distance, frame = 0) {
        const dx = object.x - this.player.x;
        const dy = object.y - this.player.y;
        const spriteAngle = Math.atan2(dy, dx);
        let angleDiff = spriteAngle - this.player.angle;
        while (angleDiff > Math.PI) angleDiff -= 2 * Math.PI;
        while (angleDiff < -Math.PI) angleDiff += 2 * Math.PI;

        if (Math.abs(angleDiff) > this.halfFov) return;

        const screenX = (angleDiff / this.halfFov) * (this.canvas.width / 2) + this.canvas.width / 2;
        const spriteSize = (this.canvas.height / distance) * 50;
        const spriteTop = (this.canvas.height - spriteSize) / 2;

        const brightness = Math.max(0.2, 1 - distance / this.maxDepth);
        this.ctx.save();
        this.ctx.globalAlpha = brightness;

        let scale = spriteSize / (this.spriteManager.sprites[type]?.width || 32);
        if (type === 'powerup') scale *= 0.5;
        if (type === 'bullet') scale *= 0.3;

        this.spriteManager.drawSprite(this.ctx, type, screenX, spriteTop + spriteSize / 2, 0, scale, frame);
        this.ctx.restore();
    }

    drawCrosshair() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const size = 15;
        this.ctx.strokeStyle = '#ff6b6b';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX - size, centerY);
        this.ctx.lineTo(centerX + size, centerY);
        this.ctx.moveTo(centerX, centerY - size);
        this.ctx.lineTo(centerX, centerY + size);
        this.ctx.stroke();
    }

    drawWaveIndicator() {
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = '20px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Wave ${this.waveNumber}`, this.canvas.width / 2, 40);
    }

    drawWaveTimer() {
        const timeRemaining = Math.max(0, Math.ceil((this.waveCooldown - (Date.now() - this.waveTimer)) / 1000));
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = '18px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Next wave in ${timeRemaining}s`, this.canvas.width / 2, 70);
    }

    drawMinimap() {
        const size = 120;
        const x = this.canvas.width - size - 10;
        const y = 10;
        const scale = size / (this.mapWidth * this.tileSize);

        this.ctx.fillStyle = 'rgba(0,0,0,0.5)';
        this.ctx.fillRect(x, y, size, size);

        for (let my = 0; my < this.mapHeight; my++) {
            for (let mx = 0; mx < this.mapWidth; mx++) {
                if (this.map[my][mx] === 1) {
                    this.ctx.fillStyle = '#8B4513';
                    this.ctx.fillRect(x + mx * this.tileSize * scale, y + my * this.tileSize * scale,
                                     this.tileSize * scale, this.tileSize * scale);
                }
            }
        }

        if (this.player) {
            this.ctx.fillStyle = '#00ff00';
            const px = x + this.player.x * scale;
            const py = y + this.player.y * scale;
            this.ctx.fillRect(px - 3, py - 3, 6, 6);

            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(px, py);
            this.ctx.lineTo(px + Math.cos(this.player.angle) * 15, py + Math.sin(this.player.angle) * 15);
            this.ctx.stroke();
        }

        this.enemies.forEach(enemy => {
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(x + enemy.x * scale - 2, y + enemy.y * scale - 2, 4, 4);
        });
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
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
        let moveX = 0;
        let moveY = 0;

        if (keys['w']) {
            moveX += Math.cos(this.angle) * this.speed;
            moveY += Math.sin(this.angle) * this.speed;
        }
        if (keys['s']) {
            moveX -= Math.cos(this.angle) * this.speed;
            moveY -= Math.sin(this.angle) * this.speed;
        }
        if (keys['a']) {
            moveX += Math.cos(this.angle - Math.PI/2) * this.speed;
            moveY += Math.sin(this.angle - Math.PI/2) * this.speed;
        }
        if (keys['d']) {
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

        if (keys['arrowleft']) this.angle -= this.rotationSpeed;
        if (keys['arrowright']) this.angle += this.rotationSpeed;
    }

    canMoveTo(x, y, game) {
        if (x < this.radius || x > game.mapWidth * game.tileSize - this.radius ||
            y < this.radius || y > game.mapHeight * game.tileSize - this.radius) {
            return false;
        }
        const mapX = Math.floor(x / game.tileSize);
        const mapY = Math.floor(y / game.tileSize);
        if (game.map[mapY] && game.map[mapY][mapX] === 1) {
            return false;
        }
        return true;
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }
}

class Enemy {
    constructor(x, y, wave = 1) {
        this.x = x;
        this.y = y;
        this.radius = 12;
        this.speed = 1.0 + wave * 0.15;
        this.health = 50 + wave * 10;
        this.maxHealth = this.health;
    }

    update(player, game) {
        if (!player) return;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.hypot(dx, dy);
        if (distance > 30) {
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;
            if (this.canMoveTo(this.x + moveX, this.y, game)) this.x += moveX;
            if (this.canMoveTo(this.x, this.y + moveY, game)) this.y += moveY;
        }
    }

    canMoveTo(x, y, game) {
        const mapX = Math.floor(x / game.tileSize);
        const mapY = Math.floor(y / game.tileSize);
        return !(mapX < 0 || mapX >= game.mapWidth || mapY < 0 || mapY >= game.mapHeight || game.map[mapY][mapX] === 1);
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }
}

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.speed = 12;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.hitWall = false;
    }

    update(game) {
        const newX = this.x + this.vx;
        const newY = this.y + this.vy;
        const mapX = Math.floor(newX / game.tileSize);
        const mapY = Math.floor(newY / game.tileSize);
        if (mapX < 0 || mapX >= game.mapWidth || mapY < 0 || mapY >= game.mapHeight || game.map[mapY][mapX] === 1) {
            this.hitWall = true;
            return;
        }
        this.x = newX;
        this.y = newY;
    }
}

class Explosion {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.maxFrames = 8;
        this.frameCounter = 0;
        this.frameRate = 3;
        this.finished = false;
    }

    update() {
        this.frameCounter++;
        if (this.frameCounter >= this.frameRate) {
            this.frame++;
            this.frameCounter = 0;
            if (this.frame >= this.maxFrames) this.finished = true;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});
