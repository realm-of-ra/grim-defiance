import { useEffect } from 'react';
import Phaser from 'phaser';
import AnimationManager from './managers/animation';

var player: any;
var animationManager: AnimationManager | undefined;
var lastDirection: string;

class Enemy {
  sprite: Phaser.Physics.Arcade.Sprite;
  
  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.sprite(x, y, 'skeleton-worker').setScale(2);
    this.sprite.setCollideWorldBounds(true);
  }

  update(player: Phaser.GameObjects.Sprite) {
    // Move towards the player
    const direction = new Phaser.Math.Vector2(player.x - this.sprite.x, player.y - this.sprite.y);
    direction.normalize().scale(100); // Speed of the enemy
    this.sprite.setVelocity(direction.x, direction.y);
  }
}

class GameScene extends Phaser.Scene {
  enemies: Enemy[] = []; // Array to hold enemies

  preload() {
    this.load.spritesheet("human-fighter", "assets/units/human-fighter.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet("skeleton-worker", "assets/units/skeleton-worker.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    // Load animations for skeleton-worker
    this.anims.create({
      key: 'skeleton-worker-move',
      frames: this.anims.generateFrameNumbers('skeleton-worker', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });
  }

  create() {
    // const graphics = this.add.graphics();
    // graphics.fillStyle(0xff0000, 0.5);
    // graphics.fillRect(400 - 32, 300 - 32, 64, 64);

    player = this.physics.add.sprite(400, 300, "human-fighter").setScale(2); 
    player.setCollideWorldBounds(true);

    animationManager = AnimationManager.getInstance();
    animationManager.addAnimations(this);

    this.time.addEvent({
      delay: 2000, // Generate an enemy every 2 seconds
      callback: this.addEnemy,
      callbackScope: this,
      loop: true
    });
  }

  addEnemy() {
    const x = Phaser.Math.Between(0, this.cameras.main.width);
    const y = Phaser.Math.Between(0, this.cameras.main.height);
    const enemy = new Enemy(this, x, y);
    this.enemies.push(enemy);
  }

  update() {
    const cursors = this.input.keyboard?.createCursorKeys();
    const enterKey = this.input.keyboard?.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

    if (cursors?.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('human-fighter-move-left', true);
      lastDirection = 'left';
    } else if (cursors?.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('human-fighter-move-right', true);
      lastDirection = 'right';
    } else {
      player.setVelocityX(0);
      player.anims.play('human-fighter-move-down', true);
    }

    if (cursors?.up.isDown) {
      player.setVelocityY(-160);
      player.anims.play('human-fighter-move-up', true);
      lastDirection = 'up';
    } else if (cursors?.down.isDown) {
      player.setVelocityY(160);
      player.anims.play('human-fighter-move-down', true);
      lastDirection = 'down';
    } else {
      player.setVelocityY(0);
      player.anims.play(`human-fighter-idle-${lastDirection}`, true);
    }

    if (enterKey?.isDown) {
        player.anims.play(`human-fighter-hit-${lastDirection}`, true); // Play hit animation
    }

    console.log(lastDirection);

    // Check for collision between player and enemies
    this.enemies.forEach((enemy, index) => {
        if (Phaser.Geom.Intersects.RectangleToRectangle(player.getBounds(), enemy.sprite.getBounds())) {
            // Play hit animation
            player.anims.play(`human-fighter-hit-${lastDirection}`, true);
            // Remove enemy from the scene
            enemy.sprite.destroy();
            this.enemies.splice(index, 1); // Remove enemy from the array
        }
    });

    // Update each enemy to move towards the player
    this.enemies.forEach(enemy => enemy.update(player));
  }
}

function GameScreen() {
  const config = {
    type: Phaser.AUTO,
    parent: 'phaser-container',
    width: window.innerWidth,
    height: window.innerHeight,
    scene: GameScene,
    physics: {
      default: "arcade",
      arcade: { 
        gravity: { y: 200 },
      },
    },
    scale: {
      mode: Phaser.Scale.RESIZE,
      width: "100%",
      height: "100%",
    },
  };
  useEffect(() => {
    const game = new Phaser.Game(config as any);

    return () => {
      game.destroy(true)
    }
  }, [])
  return (
    <div />
  );
}

export default GameScreen;