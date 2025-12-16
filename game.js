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
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#00ff00'; ctx.fillRect(12, 8, 8, 16);
        ctx.fillStyle = '#90EE90'; ctx.fillRect(14, 6, 4, 4);
        ctx.fillStyle = '#228B22'; ctx.fillRect(10, 12, 4, 8); ctx.fillRect(18, 12, 4, 8);
        ctx.fillStyle = '#006400'; ctx.fillRect(12, 20, 8, 8);
        ctx.fillStyle = '#8B4513'; ctx.fillRect(22, 14, 6, 2);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(15, 7, 1, 1); ctx.fillRect(17, 7, 1, 1);
        return canvas;
    }
    createEnemySprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 32; canvas.height = 32;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ff0000'; ctx.fillRect(12, 8, 8, 16);
        ctx.fillStyle = '#ff6666'; ctx.fillRect(14, 6, 4, 4);
        ctx.fillStyle = '#cc0000'; ctx.fillRect(10, 12, 4, 8); ctx.fillRect(18, 12, 4, 8);
        ctx.fillStyle = '#990000'; ctx.fillRect(12, 20, 8, 8);
        ctx.fillStyle = '#660000'; ctx.fillRect(13, 4, 2, 2); ctx.fillRect(17, 4, 2, 2);
        ctx.fillStyle = '#ffff00'; ctx.fillRect(15, 7, 1, 1); ctx.fillRect(17, 7, 1, 1);
        return canvas;
    }
    createGunSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 64; canvas.height = 64;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#808080'; ctx.fillRect(20, 20, 32, 12);
        ctx.fillStyle = '#8B4513'; ctx.fillRect(20, 32, 12, 20);
        ctx.fillStyle = '#404040'; ctx.fillRect(20, 32, 8, 8);
        return canvas;
    }
    createBulletSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 8; canvas.height = 8;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffff00'; ctx.fillRect(2, 2, 4, 4);
        ctx.fillStyle = '#ffffff'; ctx.fillRect(3, 3, 2, 2);
        return canvas;
    }
    createExplosionSprites() {
        const explosions = [];
        for (let frame = 0; frame < 8; frame++) {
            const canvas = document.createElement('canvas');
            canvas.width = 32; canvas.height = 32;
            const ctx = canvas.getContext('2d');
            const size = 4 + frame * 3;
            const alpha = 1 - (frame / 8);
            ctx.globalAlpha = alpha;
            ctx.fillStyle = '#ff6600'; ctx.fillRect(16 - size/2, 16 - size/2, size, size);
            ctx.fillStyle = '#ffff00'; ctx.fillRect(16 - size/3, 16 - size/3, size/1.5, size/1.5);
            ctx.fillStyle = '#ff0000'; ctx.fillRect(16 - size/4, 16 - size/4, size/2, size/2);
            explosions.push(canvas);
        }
        return explosions;
    }
    createParticleSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 4; canvas.height = 4;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffff00'; ctx.fillRect(1, 1, 2, 2);
        return canvas;
    }
    createPowerUpSprite() {
        const canvas = document.createElement('canvas');
        canvas.width = 24; canvas.height = 24;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(8, 8, 8, 8);
        ctx.fillStyle = '#ff0000'; ctx.fillRect(10, 9, 4, 2); ctx.fillRect(11, 8, 2, 4);
        return canvas;
    }
    drawSprite(ctx, spriteType, x, y, rotation = 0, scale = 1, frame = 0) {
        const sprite = this.sprites[spriteType];
        if (!sprite || !this.imagesLoaded) return;
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
                x, y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                life: 1.0,
                decay: 0.02 + Math.random() * 0.03,
                color,
                size: 2 + Math.random() * 3
            });
        }
        return particles;
    }
    updateParticles(particles) {
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx; p.y += p.vy;
            p.vx *= 0.98; p.vy *= 0.98;
            p.life -= p.decay;
            if (p.life <= 0) particles.splice(i, 1);
        }
    }
    drawParticles(ctx, particles) {
        if (!this.sprites.particle || !this.imagesLoaded) {
            particles.forEach(p => {
                ctx.save();
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x - p.size/2, p.y - p.size/2, p.size, p.size);
                ctx.restore();
            });
            return;
        }
        particles.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.life;
            ctx.translate(p.x, p.y);
            ctx.scale(p.size / this.sprites.particle.width, p.size / this.sprites.particle.height);
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
    // (unchanged – same as your original)
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
    createShootSound() { /* same as before */ const duration = 0.1; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const frequency = 800 * Math.pow(0.5, t * 10); const envelope = Math.exp(-t * 20); data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3; } return buffer; }
    createEnemyHitSound() { /* ... */ const duration = 0.15; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const frequency = 300 + Math.sin(t * 50) * 100; const envelope = Math.exp(-t * 8); data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2; } return buffer; }
    createEnemyDeathSound() { /* ... */ const duration = 0.3; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const frequency = 200 * Math.pow(0.3, t * 2); const envelope = Math.exp(-t * 3); const noise = (Math.random() - 0.5) * 0.1; data[i] = (Math.sin(2 * Math.PI * frequency * t) + noise) * envelope * 0.4; } return buffer; }
    createPlayerHurtSound() { /* ... */ const duration = 0.25; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const frequency = 150 + Math.sin(t * 30) * 50; const envelope = Math.exp(-t * 6); data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.3; } return buffer; }
    createPowerUpSound() { /* ... */ const duration = 0.4; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const frequency = 400 + t * 800; const envelope = Math.sin(t * Math.PI); data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.2; } return buffer; }
    createGameOverSound() { /* ... */ const duration = 1.0; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const frequency = 100 * Math.pow(0.5, t); const envelope = Math.exp(-t * 2); data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope * 0.5; } return buffer; }
    createVictorySound() { /* ... */ const duration = 1.5; const buffer = this.audioContext.createBuffer(1, duration * this.audioContext.sampleRate, this.audioContext.sampleRate); const data = buffer.getChannelData(0); for (let i = 0; i < data.length; i++) { const t = i / this.audioContext.sampleRate; const freq1 = 523.25; const freq2 = 659.25; const freq3 = 783.99; const envelope = Math.sin(t * Math.PI * 0.67); const note1 = Math.sin(2 * Math.PI * freq1 * t) * (t < 0.5 ? 1 : 0); const note2 = Math.sin(2 * Math.PI * freq2 * t) * (t > 0.3 && t < 0.8 ? 1 : 0); const note3 = Math.sin(2 * Math.PI * freq3 * t) * (t > 0.6 ? 1 : 0); data[i] = (note1 + note2 + note3) * envelope * 0.2; } return buffer; }
    playSound(soundName, volume = 1.0, pitch = 1.0) {
        if (!this.soundEnabled || !this.sounds[soundName]) return;
        try {
            if (this.audioContext.state === 'suspended') this.audioContext.resume();
            const source = this.audioContext.createBufferSource();
            const gainNode = this.audioContext.createGain();
            source.buffer = this.sounds[soundName];
            source.playbackRate.value = pitch;
            gainNode.gain.value = volume;
            source.connect(gainNode);
            gainNode.connect(this.masterGain);
            source.start();
        } catch (error) { console.warn('Error playing sound:', error); }
    }
    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGain) this.masterGain.gain.value = this.masterVolume;
    }
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }
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

        // Mobile touch controls
        this.joystickActive = false;
        this.joystickCenter = { x: 0, y: 0 };
        this.joystickOffset = { x: 0, y: 0 };
        this.touchLookStart = { x: 0, y: 0 };
        this.isLooking = false;

        this.powerUpSpawnChance = 0.001;
        this.waveCooldown = 60000;
        this.waveTimer = 0;
        this.waitingForNextWave = false;
        this.enemiesPerWave = 5;
        this.maxWaves = 7;

        this.spriteManager.initializeSprites().then(() => {
            this.initializeEventListeners();
            this.initializeMobileControls();
            this.initializeUI();
            this.gameLoop();
        }).catch(error => {
            console.error('Sprite init failed:', error);
            this.initializeEventListeners();
            this.initializeMobileControls();
            this.initializeUI();
            this.gameLoop();
        });
    }

    generateMap() {
        const map = [];
        for (let y = 0; y < this.mapHeight; y++) {
            map[y] = [];
            for (let x = 0; x < this.mapWidth; x++) {
                if (x === 0 || x === this.mapWidth - 1 || y === 0 || y === this.mapHeight - 1) {
                    map[y][x] = 1;
                } else if (x % 3 === 0 && y % 3 === 0) {
                    map[y][x] = Math.random() < 0.7 ? 1 : 0;
                } else if (Math.random() < 0.1) {
                    map[y][x] = 1;
                } else {
                    map[y][x] = 0;
                }
            }
        }
        for (let y = 1; y < 4; y++) for (let x = 1; x < 4; x++) map[y][x] = 0;
        return map;
    }

    initializeEventListeners() {
        // Keyboard
        document.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            if (['w', 'a', 's', 'd', ' '].includes(e.key.toLowerCase())) e.preventDefault();
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Mouse for desktop
        this.canvas.addEventListener('mousemove', (e) => {
            if (this.gameState !== 'playing') return;
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            const deltaX = this.mouse.x - this.mouse.lastX;
            if (this.player && Math.abs(deltaX) > 0) {
                this.player.angle += deltaX * this.mouseSensitivity;
                this.mouse.lastX = this.mouse.x;
            }
        });
        this.canvas.addEventListener('mousedown', (e) => {
            this.handleShooting();
            if (this.gameState === 'playing') this.canvas.requestPointerLock();
        });

        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement === this.canvas) {
                document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            } else {
                document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            }
        });
        this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    }

    handleMouseMove(e) {
        if (this.gameState !== 'playing' || !this.player) return;
        this.player.angle += e.movementX * this.mouseSensitivity;
    }

    initializeMobileControls() {
        const joystick = document.getElementById('joystick');
        const knob = document.getElementById('joystickKnob');
        const fireButton = document.getElementById('fireButton');
        const mobileControls = document.getElementById('mobileControls');

        // Show controls only on mobile
        if (window.innerWidth <= 900) {
            mobileControls.classList.add('visible');
        }

        // Joystick
        joystick.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const rect = joystick.getBoundingClientRect();
            this.joystickCenter = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
            this.joystickActive = true;
            this.updateJoystick(touch);
        });

        joystick.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.joystickActive) return;
            this.updateJoystick(e.touches[0]);
        });

        ['touchend', 'touchcancel'].forEach(evt => {
            joystick.addEventListener(evt, (e) => {
                e.preventDefault();
                this.joystickActive = false;
                knob.style.transform = 'translate(-50%, -50%)';
                this.joystickOffset = { x: 0, y: 0 };
            });
        });

        // Fire button
        fireButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.handleShooting();
        });

        // Look with right side of screen
        this.canvas.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1 && e.touches[0].clientX > window.innerWidth / 2) {
                this.isLooking = true;
                this.touchLookStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.isLooking && e.touches.length === 1) {
                const touch = e.touches[0];
                const deltaX = touch.clientX - this.touchLookStart.x;
                if (this.player) {
                    this.player.angle += deltaX * 0.005;
                }
                this.touchLookStart = { x: touch.clientX, y: touch.clientY };
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.isLooking = false;
        });
    }

    updateJoystick(touch) {
        const knob = document.getElementById('joystickKnob');
        const dx = touch.clientX - this.joystickCenter.x;
        const dy = touch.clientY - this.joystickCenter.y;
        const dist = Math.min(50, Math.sqrt(dx * dx + dy * dy));
        const angle = Math.atan2(dy, dx);
        const offsetX = Math.cos(angle) * dist;
        const offsetY = Math.sin(angle) * dist;

        knob.style.transform = `translate(${offsetX}px, ${offsetY}px)`;

        this.joystickOffset = {
            x: offsetX / 50,  // normalized -1 to 1
            y: offsetY / 50
        };
    }

    initializeUI() {
        document.getElementById('startButton').addEventListener('click', () => this.startGame());
        document.getElementById('instructionsButton').addEventListener('click', () => this.showInstructions());
        document.getElementById('backButton').addEventListener('click', () => this.showMenu());
        document.getElementById('restartButton').addEventListener('click', () => this.startGame());
        document.getElementById('menuButton').addEventListener('click', () => this.showMenu());
    }

    showMenu() { /* unchanged */ }
    showInstructions() { /* unchanged */ }

    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.startTime = Date.now();
        this.enemiesKilled = 0;
        this.waveNumber = 1;
        this.waitingForNextWave = false;
        this.bullets = []; this.enemies = []; this.particles = []; this.explosions = []; this.powerUps = [];
        this.player = new Player(2.5 * this.tileSize, 2.5 * this.tileSize, Math.PI / 4);
        this.spawnEnemies(this.enemiesPerWave);

        document.getElementById('menu').classList.add('hidden');
        document.getElementById('instructions').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        document.getElementById('gameOver').classList.add('hidden');

        this.soundManager.playAmbientSound();
        this.updateUI();
    }

    handleShooting() {
        if (this.gameState !== 'playing' || !this.player) return;
        const now = Date.now();
        if (now - this.lastShotTime < this.shotCooldown) return;
        this.lastShotTime = now;

        const bullet = new Bullet(this.player.x, this.player.y, this.player.angle);
        this.bullets.push(bullet);
        this.soundManager.playSound('shoot', 0.5, 0.9 + Math.random() * 0.2);
        this.createMuzzleFlash(this.player.x, this.player.y, this.player.angle);
    }

    createMuzzleFlash(x, y, angle) {
        const flashParticles = this.spriteManager.createParticleEffect(x, y, '#ffff00', 5);
        flashParticles.forEach(p => {
            p.vx = Math.cos(angle) * 15 + (Math.random() - 0.5) * 5;
            p.vy = Math.sin(angle) * 15 + (Math.random() - 0.5) * 5;
            p.life = 0.3; p.decay = 0.1;
        });
        this.particles.push(...flashParticles);
    }

    spawnEnemies(count) { /* unchanged */ }
    spawnPowerUp() { /* unchanged */ }

    update() {
        if (this.gameState !== 'playing') return;

        // Apply mobile joystick input
        if (this.joystickActive && this.player) {
            const strength = Math.sqrt(this.joystickOffset.x ** 2 + this.joystickOffset.y ** 2);
            if (strength > 0.1) {
                const moveAngle = Math.atan2(this.joystickOffset.y, this.joystickOffset.x);
                const forward = Math.cos(moveAngle) * this.player.speed * strength;
                const strafe = Math.sin(moveAngle) * this.player.speed * strength;

                const newX = this.player.x + Math.cos(this.player.angle) * forward - Math.sin(this.player.angle) * strafe;
                const newY = this.player.y + Math.sin(this.player.angle) * forward + Math.cos(this.player.angle) * strafe;

                if (this.player.canMoveTo(newX, this.player.y, this)) this.player.x = newX;
                if (this.player.canMoveTo(this.player.x, newY, this)) this.player.y = newY;
            }
        }

        // Standard keyboard movement
        if (this.player) this.player.update(this.keys, this);

        // Rest of update logic unchanged (bullets, enemies, etc.)
        // ... (your original update code from bullets to spawnPowerUp)

        // Paste your original update() content here from bullets.forEach to spawnPowerUp()
        // (omitted for brevity – keep everything exactly as you had it)

        this.updateUI();
    }

    // Keep all your other methods: checkCollision, castRay, render, render3DSprites, etc.
    // (they remain unchanged)

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// Player, Enemy, Bullet, Explosion, PowerUp classes remain exactly the same as your original

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});
