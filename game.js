class SpriteManager {
    constructor() {
        this.sprites = {};
        this.particlePool = [];
        this.maxParticles = 100;
        this.imagesLoaded = false;
    }

    async initializeSprites() {
        const imagePaths = {
            player: 'assets/images/player.png', // Your custom player PNG
            enemy: 'assets/images/enemy.png', // Your custom enemy PNG
            gun: 'assets/images/gun.png', // Hand/gun placeholder
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
            // Use canvas fallbacks for other sprites
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
        
        // Barrel (gray)
        ctx.fillStyle = '#808080';
        ctx.fillRect(20, 20, 32, 12);
        // Handle (brown)
        ctx.fillStyle = '#8B4513';
        ctx.fillRect(20, 32, 12, 20);
        // Trigger guard (dark gray)
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
        console.log(`Drawing sprite: ${spriteType} at (${x}, ${y})`);
        const sprite = this.sprites[spriteType];
        if (!sprite || !this.imagesLoaded) {
            console.log(`No sprite or images not loaded for ${spriteType}`);
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

    createRadialGradient(ctx, x, y, radius, innerColor, outerColor) {
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, innerColor);
        gradient.addColorStop(1, outerColor);
        return gradient;
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
            const freq1 = 523.25; // C5
            const freq2 = 659.25; // E5
            const freq3 = 783.99; // G5
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

    setMasterVolume(volume) {
        this.masterVolume = Math.max(0, Math.min(1, volume));
        if (this.masterGain) {
            this.masterGain.gain.value = this.masterVolume;
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    playAmbientSound() {
        if (!this.soundEnabled) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 60;
        gainNode.gain.value = 0.05;
        oscillator.connect(gainNode);
        gainNode.connect(this.masterGain);
        oscillator.start();
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.05, this.audioContext.currentTime + 2);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 10);
        oscillator.stop(this.audioContext.currentTime + 10);
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
        
        this.powerUpSpawnChance = 0.001;
        this.waveCooldown = 60000; // 1 minute
        this.waveTimer = 0;
        this.waitingForNextWave = false;
        this.enemiesPerWave = 5;
        this.maxWaves = 7;
        
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
        for (let y = 1; y < 4; y++) {
            for (let x = 1; x < 4; x++) {
                map[y][x] = 0;
            }
        }
        return map;
    }

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

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.gameState !== 'playing') return;
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
            this.mouse.y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
            const deltaX = this.mouse.x - this.mouse.lastX;
            if (this.player && Math.abs(deltaX) > 0) {
                this.player.angle += deltaX * this.mouseSensitivity;
                this.mouse.lastX = this.mouse.x;
            }
        });

        this.canvas.addEventListener('mousedown', (e) => {
            this.mouse.pressed = true;
            this.handleShooting();
            if (this.gameState === 'playing') {
                this.canvas.requestPointerLock();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.mouse.pressed = false;
        });

        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement === this.canvas) {
                document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            } else {
                document.removeEventListener('mousemove', this.handleMouseMove.bind(this));
            }
        });

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    handleMouseMove(e) {
        if (this.gameState !== 'playing' || !this.player) return;
        this.player.angle += e.movementX * this.mouseSensitivity;
    }

    initializeUI() {
        document.getElementById('startButton').addEventListener('click', () => {
            this.startGame();
        });
        document.getElementById('instructionsButton').addEventListener('click', () => {
            this.showInstructions();
        });
        document.getElementById('backButton').addEventListener('click', () => {
            this.showMenu();
        });
        document.getElementById('restartButton').addEventListener('click', () => {
            this.startGame();
        });
        document.getElementById('menuButton').addEventListener('click', () => {
            this.showMenu();
        });
    }

    showMenu() {
        this.gameState = 'menu';
        document.getElementById('menu').classList.remove('hidden');
        document.getElementById('instructions').classList.add('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');
    }

    showInstructions() {
        this.gameState = 'instructions';
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('instructions').classList.remove('hidden');
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('gameOver').classList.add('hidden');
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
        console.log('Player initialized at:', this.player.x, this.player.y);
        this.spawnEnemies(this.enemiesPerWave);
        document.getElementById('menu').classList.add('hidden');
        document.getElementById('instructions').classList.add('hidden');
        document.getElementById('gameScreen').classList.remove('hidden');
        document.getElementById('gameOver').classList.add('hidden');
        this.soundManager.playAmbientSound();
        this.updateUI();
    }

    gameOver(victory = false) {
        this.gameState = 'gameOver';
        this.gameTime = Math.floor((Date.now() - this.startTime) / 1000);
        document.getElementById('timeSurvived').textContent = this.gameTime;
        document.getElementById('finalKills').textContent = this.enemiesKilled;
        document.getElementById('finalWave').textContent = this.waveNumber;
        const gameOverScreen = document.getElementById('gameOver');
        const gameOverTitle = document.getElementById('gameOverTitle');
        if (victory) {
            gameOverTitle.innerHTML = '<i class="fas fa-trophy"></i> VICTORY!';
            gameOverScreen.classList.add('victory');
            this.soundManager.playSound('victory');
        } else {
            gameOverTitle.innerHTML = '<i class="fas fa-skull-crossbones"></i> GAME OVER';
            gameOverScreen.classList.remove('victory');
            this.soundManager.playSound('gameOver');
        }
        document.getElementById('gameScreen').classList.add('hidden');
        document.getElementById('gameOver').classList.remove('hidden');
    }

    handleShooting() {
        if (this.gameState !== 'playing' || !this.player) return;
        const currentTime = Date.now();
        if (currentTime - this.lastShotTime < this.shotCooldown) return;
        this.lastShotTime = currentTime;
        const angle = this.player.angle;
        console.log('Spawning bullet at:', this.player.x, this.player.y);
        const bullet = new Bullet(this.player.x, this.player.y, angle);
        this.bullets.push(bullet);
        this.soundManager.playSound('shoot', 0.5, 0.9 + Math.random() * 0.2);
        this.createMuzzleFlash(this.player.x, this.player.y, angle);
    }

    createMuzzleFlash(x, y, angle) {
        const flashParticles = this.spriteManager.createParticleEffect(x, y, '#ffff00', 5);
        flashParticles.forEach(particle => {
            particle.vx = Math.cos(angle) * 15 + (Math.random() - 0.5) * 5;
            particle.vy = Math.sin(angle) * 15 + (Math.random() - 0.5) * 5;
            particle.life = 0.3;
            particle.decay = 0.1;
        });
        this.particles.push(...flashParticles);
    }

    spawnEnemies(count) {
        for (let i = 0; i < count; i++) {
            let x, y;
            let attempts = 0;
            do {
                x = Math.random() * (this.mapWidth - 2) + 1;
                y = Math.random() * (this.mapHeight - 2) + 1;
                attempts++;
            } while (this.map[Math.floor(y)][Math.floor(x)] === 1 && attempts < 50);
            x = x * this.tileSize + this.tileSize / 2;
            y = y * this.tileSize + this.tileSize / 2;
            const enemy = new Enemy(x, y, this.waveNumber);
            this.enemies.push(enemy);
        }
    }

    spawnPowerUp() {
        if (Math.random() < this.powerUpSpawnChance) {
            let x, y;
            let attempts = 0;
            do {
                x = Math.random() * (this.mapWidth - 2) + 1;
                y = Math.random() * (this.mapHeight - 2) + 1;
                attempts++;
            } while (this.map[Math.floor(y)][Math.floor(x)] === 1 && attempts < 50);
            x = x * this.tileSize + this.tileSize / 2;
            y = y * this.tileSize + this.tileSize / 2;
            this.powerUps.push(new PowerUp(x, y));
        }
    }

    update() {
        if (this.gameState !== 'playing') return;
        if (this.player) {
            this.player.update(this.keys, this);
        }
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            const bullet = this.bullets[i];
            bullet.update(this);
            if (bullet.hitWall || bullet.x < 0 || bullet.x > this.mapWidth * this.tileSize || 
                bullet.y < 0 || bullet.y > this.mapHeight * this.tileSize) {
                this.bullets.splice(i, 1);
            }
        }
        for (let i = this.enemies.length - 1; i >= 0; i--) {
            const enemy = this.enemies[i];
            enemy.update(this.player, this);
            if (this.player && this.checkCollision(enemy, this.player)) {
                this.player.takeDamage(10);
                this.soundManager.playSound('playerHurt', 0.7);
                const damageParticles = this.spriteManager.createParticleEffect(
                    this.player.x, this.player.y, '#ff0000', 8
                );
                this.particles.push(...damageParticles);
                if (this.player.health <= 0) {
                    this.gameOver(false);
                    return;
                }
            }
            for (let j = this.bullets.length - 1; j >= 0; j--) {
                const bullet = this.bullets[j];
                if (this.checkCollision(enemy, bullet)) {
                    enemy.takeDamage(25);
                    this.bullets.splice(j, 1);
                    const hitParticles = this.spriteManager.createParticleEffect(
                        enemy.x, enemy.y, '#ff6600', 6
                    );
                    this.particles.push(...hitParticles);
                    if (enemy.health <= 0) {
                        this.soundManager.playSound('enemyDeath', 0.6);
                        this.score += 100;
                        this.enemiesKilled++;
                        console.log('Spawning explosion at:', enemy.x, enemy.y);
                        this.explosions.push(new Explosion(enemy.x, enemy.y));
                        const deathParticles = this.spriteManager.createParticleEffect(
                            enemy.x, enemy.y, '#ff0000', 12
                        );
                        this.particles.push(...deathParticles);
                        this.enemies.splice(i, 1);
                    } else {
                        this.soundManager.playSound('enemyHit', 0.4);
                    }
                    break;
                }
            }
        }
        for (let i = this.explosions.length - 1; i >= 0; i--) {
            const explosion = this.explosions[i];
            explosion.update();
            if (explosion.finished) {
                this.explosions.splice(i, 1);
            }
        }
        this.spriteManager.updateParticles(this.particles);
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            const powerUp = this.powerUps[i];
            powerUp.update();
            if (this.player && this.checkCollision(powerUp, this.player)) {
                this.player.heal(25);
                this.soundManager.playSound('powerUp', 0.8);
                this.powerUps.splice(i, 1);
                this.score += 50;
            }
        }
        if (!this.waitingForNextWave) {
            if (this.enemies.length === 0) {
                this.waitingForNextWave = true;
                this.waveTimer = Date.now();
                this.score += 200;
                this.updateUI();
            }
        } else {
            const timeElapsed = Date.now() - this.waveTimer;
            if (timeElapsed >= this.waveCooldown && this.waveNumber < this.maxWaves) {
                this.waveNumber++;
                this.waitingForNextWave = false;
                this.waveTimer = 0;
                this.spawnEnemies(this.enemiesPerWave);
            }
        }
        if (this.waveNumber > this.maxWaves) {
            this.gameOver(true);
        }
        this.spawnPowerUp();
        this.updateUI();
    }

    checkCollision(obj1, obj2) {
        const distance = Math.sqrt(
            Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)
        );
        return distance < (obj1.radius + obj2.radius);
    }

    updateUI() {
        if (this.player) {
            document.getElementById('healthDisplay').textContent = this.player.health;
        }
        document.getElementById('scoreDisplay').textContent = this.score;
        document.getElementById('enemiesDisplay').textContent = this.enemies.length;
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
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height / 2);
        this.ctx.fillStyle = '#666666';
        this.ctx.fillRect(0, this.canvas.height / 2, this.canvas.width, this.canvas.height / 2);
        if (!this.player) {
            console.log('No player to render');
            return;
        }
        const rayAngleStep = this.fov / this.numRays;
        const rayStartAngle = this.player.angle - this.halfFov;
        for (let i = 0; i < this.numRays; i++) {
            const rayAngle = rayStartAngle + i * rayAngleStep;
            const rayResult = this.castRay(this.player.x, this.player.y, rayAngle);
            const wallHeight = (this.canvas.height / rayResult.distance) * this.wallHeight;
            const wallTop = (this.canvas.height - wallHeight) / 2;
            const wallBrightness = rayResult.side === 0 ? 1.0 : 0.7;
            const distanceFactor = Math.max(0.1, 1 - rayResult.distance / this.maxDepth);
            const brightness = wallBrightness * distanceFactor;
            this.ctx.fillStyle = `rgb(${Math.floor(139 * brightness)}, ${Math.floor(69 * brightness)}, ${Math.floor(19 * brightness)})`;
            this.ctx.fillRect(i * 2, wallTop, 2, wallHeight);
        }
        this.render3DSprites();
        // Draw hand/gun placeholder
        if (this.spriteManager.sprites.gun && this.spriteManager.imagesLoaded) {
            console.log('Drawing gun sprite');
            const gunWidth = this.spriteManager.sprites.gun.width;
            const gunHeight = this.spriteManager.sprites.gun.height;
            const scale = 1.5; // Adjust size
            this.ctx.drawImage(
                this.spriteManager.sprites.gun,
                this.canvas.width / 2 - (gunWidth * scale) / 2,
                this.canvas.height - gunHeight * scale,
                gunWidth * scale,
                gunHeight * scale
            );
        }
        this.drawCrosshair();
        this.drawWaveIndicator();
        this.drawMinimap();
        if (this.waitingForNextWave) {
            this.drawWaveTimer();
        }
    }

    render3DSprites() {
        console.log('Rendering 3D sprites, player exists:', !!this.player);
        const sprites = [];
        this.enemies.forEach(enemy => {
            const dx = enemy.x - this.player.x;
            const dy = enemy.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            sprites.push({ type: 'enemy', object: enemy, distance: distance });
        });
        this.powerUps.forEach(powerUp => {
            const dx = powerUp.x - this.player.x;
            const dy = powerUp.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            sprites.push({ type: 'powerup', object: powerUp, distance: distance });
        });
        this.bullets.forEach(bullet => {
            const dx = bullet.x - this.player.x;
            const dy = bullet.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            sprites.push({ type: 'bullet', object: bullet, distance: distance });
        });
        this.explosions.forEach(explosion => {
            const dx = explosion.x - this.player.x;
            const dy = explosion.y - this.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            sprites.push({ type: 'explosion', object: explosion, distance: distance, frame: explosion.frame });
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
        const brightness = Math.max(0.1, 1 - distance / this.maxDepth);
        this.ctx.save();
        this.ctx.globalAlpha = brightness;
        let scale = spriteSize / (this.spriteManager.sprites[type]?.width || 32);
        if (type === 'powerup') {
            scale *= 0.5;
        }
        if (type === 'bullet') {
            scale *= 0.3;
        }
        this.spriteManager.drawSprite(this.ctx, type, screenX, spriteTop + spriteSize/2, 0, scale, frame);
        this.ctx.restore();
    }

    drawMinimap() {
        const minimapSize = 120;
        const minimapX = this.canvas.width - minimapSize - 10;
        const minimapY = 10;
        const scale = minimapSize / (this.mapWidth * this.tileSize);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(minimapX, minimapY, minimapSize, minimapSize);
        for (let y = 0; y < this.mapHeight; y++) {
            for (let x = 0; x < this.mapWidth; x++) {
                if (this.map[y][x] === 1) {
                    this.ctx.fillStyle = '#8B4513';
                    this.ctx.fillRect(
                        minimapX + x * this.tileSize * scale,
                        minimapY + y * this.tileSize * scale,
                        this.tileSize * scale,
                        this.tileSize * scale
                    );
                }
            }
        }
        if (this.player) {
            this.ctx.fillStyle = '#00ff00';
            const playerX = minimapX + this.player.x * scale;
            const playerY = minimapY + this.player.y * scale;
            this.ctx.fillRect(playerX - 2, playerY - 2, 4, 4);
            this.ctx.strokeStyle = '#00ff00';
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(playerX, playerY);
            this.ctx.lineTo(
                playerX + Math.cos(this.player.angle) * 10,
                playerY + Math.sin(this.player.angle) * 10
            );
            this.ctx.stroke();
        }
        this.enemies.forEach(enemy => {
            this.ctx.fillStyle = '#ff0000';
            this.ctx.fillRect(
                minimapX + enemy.x * scale - 1,
                minimapY + enemy.y * scale - 1,
                2, 2
            );
        });
    }

    drawHealthBar(x, y, health, maxHealth) {
        const width = 30;
        const height = 4;
        const healthPercent = health / maxHealth;
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(x - width/2, y, width, height);
        const healthColor = healthPercent > 0.6 ? '#00ff00' : 
                           healthPercent > 0.3 ? '#ffff00' : '#ff0000';
        this.ctx.fillStyle = healthColor;
        this.ctx.fillRect(x - width/2, y, width * healthPercent, height);
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
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - size);
        this.ctx.lineTo(centerX, centerY + size);
        this.ctx.stroke();
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.fillRect(centerX - 1, centerY - 1, 2, 2);
    }

    drawWaveIndicator() {
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = '16px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Wave ${this.waveNumber}`, this.canvas.width / 2, 30);
    }

    drawWaveTimer() {
        const timeElapsed = Date.now() - this.waveTimer;
        const timeRemaining = Math.max(0, Math.floor((this.waveCooldown - timeElapsed) / 1000));
        this.ctx.fillStyle = '#ff6b6b';
        this.ctx.font = '16px Courier New';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(`Next Wave in ${timeRemaining}s`, this.canvas.width / 2, 50);
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
        if (keys['arrowleft']) {
            this.angle -= this.rotationSpeed;
        }
        if (keys['arrowright']) {
            this.angle += this.rotationSpeed;
        }
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
        const corners = [
            { x: x - this.radius, y: y - this.radius },
            { x: x + this.radius, y: y - this.radius },
            { x: x - this.radius, y: y + this.radius },
            { x: x + this.radius, y: y + this.radius }
        ];
        for (let corner of corners) {
            const cornerMapX = Math.floor(corner.x / game.tileSize);
            const cornerMapY = Math.floor(corner.y / game.tileSize);
            if (cornerMapX < 0 || cornerMapX >= game.mapWidth || 
                cornerMapY < 0 || cornerMapY >= game.mapHeight ||
                game.map[cornerMapY][cornerMapX] === 1) {
                return false;
            }
        }
        return true;
    }

    takeDamage(amount) {
        this.health = Math.max(0, this.health - amount);
    }

    heal(amount) {
        this.health = Math.min(this.maxHealth, this.health + amount);
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
        this.lastDamageTime = 0;
    }

    update(player, game) {
        if (!player) return;
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > 20) {
            const moveX = (dx / distance) * this.speed;
            const moveY = (dy / distance) * this.speed;
            if (this.canMoveTo(this.x + moveX, this.y, game)) {
                this.x += moveX;
            }
            if (this.canMoveTo(this.x, this.y + moveY, game)) {
                this.y += moveY;
            }
        }
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
        this.lastDamageTime = Date.now();
    }
}

class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.speed = 8;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.hitWall = false;
    }

    update(game) {
        const newX = this.x + this.vx;
        const newY = this.y + this.vy;
        const mapX = Math.floor(newX / game.tileSize);
        const mapY = Math.floor(newY / game.tileSize);
        if (mapX < 0 || mapX >= game.mapWidth || mapY < 0 || mapY >= game.mapHeight ||
            game.map[mapY][mapX] === 1) {
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
        this.frameRate = 3;
        this.frameCounter = 0;
        this.finished = false;
    }

    update() {
        this.frameCounter++;
        if (this.frameCounter >= this.frameRate) {
            this.frame++;
            this.frameCounter = 0;
            if (this.frame >= this.maxFrames) {
                this.finished = true;
            }
        }
    }
}

class PowerUp {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 12;
        this.bobOffset = 0;
        this.bobSpeed = 0.1;
    }

    update() {
        this.bobOffset += this.bobSpeed;
        this.y += Math.sin(this.bobOffset) * 0.5;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
});