import { EventBus } from "../EventBus";
import { Scene } from "phaser";
import { Tilemap } from "../helpers/tilemap";
import GameManager from "../managers/game";
import { Room } from "@/dojo/models/room";
import Character from "../components/character";

// Constants

const CAMERA_SPEED: number = 0.01;
const CAMERAS_EPSILON: number = 0.1;

export class Game extends Scene {
  map: Phaser.Tilemaps.Tilemap | null = null;
  tileset: Phaser.Tilemaps.Tileset | null = null;
  animatedTiles: any = undefined;
  rooms: string[] = [];
  player: Character | null = null;
  private target: { fromX: number; fromY: number; toX: number; toY: number } | null = null;

  constructor() {
    super("Game");
  }

  init() {}

  preload() {
    // Camera
    this.cameras.main.scaleManager.scaleMode = Phaser.Scale.ScaleModes.RESIZE;
    // Tilemap
    this.load.scenePlugin(
      "AnimatedTiles",
      "https://raw.githubusercontent.com/nkholski/phaser-animated-tiles/master/dist/AnimatedTiles.js",
      "animatedTiles",
      "animatedTiles",
    );
    this.load.image("tiles", "assets/tilemaps/tileset.png");
    this.load.tilemapTiledJSON("tilemap", "assets/tilemaps/tilemap.json");
  }

  create() {
    // Tilemap
    this.map = this.make.tilemap({
      key: "tilemap",
      width: this.renderer.width,
      height: this.renderer.height,
    });
    this.tileset = this.map.addTilesetImage("tileset", "tiles");
    
    // Player
    const step = this.map!.tileWidth;
    const bounds = {
      minX: 0,
      minY: 0,
      maxX: this.map.widthInPixels - 2 * step,
      maxY: this.map.heightInPixels - 2 * step,
    };
    const character = new Character(
      this,
      0,
      0,
      step,
      bounds,
      true,
    );
    this.player = this.add.existing(character);
    this.player.setVisible(false);
    this.player.setDepth(1);

    // Physics
    // this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

    // Cameras]
    this.cameras.main.setZoom(2.5);

    // Listeners
    this.scale.on("resize", this.resize, this);

    // Events
    EventBus.emit("current-scene-ready", this);
  }

  update() {
    // Update map
    const rooms = GameManager.getInstance().rooms;
    if (!!rooms && this.rooms.length !== rooms.length) {
      rooms.forEach((room: Room) => {
        // Check if room is already created
        const key = `${room.x}-${room.y}`;
        if (this.rooms.includes(key)) return;
        // Create room
        const tilemap = Tilemap.generate(room.width, room.height, room.grid);
        this.generate(tilemap, room.x, -room.y);
        // Store room
        this.rooms.push(key);
      });
    }

    // Update player
    const adventurer = GameManager.getInstance().adventurer;
    if (!!adventurer) {
      // Update player
      this.player?.setVisible(true);
      this.player?.update(adventurer);
      // Update Camera
      const x = adventurer.x;
      const y = -adventurer.y;
      const signX = x == 0 ? 0 : x / Math.abs(x);
      const signY = y == 0 ? 0 : y / Math.abs(y);
      const worldX = x * this.map!.width * this.map!.tileWidth + signX;
      const worldY = y * this.map!.height * this.map!.tileWidth + signY;
      const cameraX = -this.renderer.width / 2 + this.map!.widthInPixels / 2 + worldX;
      const cameraY = -this.renderer.height / 2 + this.map!.heightInPixels / 2 + worldY;
      if (!this.target && (this.cameras.main.scrollX !== cameraX || this.cameras.main.scrollY !== cameraY)) {
        // Create camera position order if the camera is not at the expected position
          this.target = { fromX: this.cameras.main.scrollX, fromY: this.cameras.main.scrollY, toX: cameraX, toY: cameraY };
      } else if (!!this.target && Math.abs(this.cameras.main.scrollX - this.target.toX) < CAMERAS_EPSILON && this.cameras.main.scrollY - this.target.toY < CAMERAS_EPSILON) {
        // Camera is close to the target, then fix it
        this.cameras.main.scrollX = this.target.toX;
        this.cameras.main.scrollY = this.target.toY;  
        this.target = null;
      } else if (!!this.target) {
        // Move camera to target
        const dx = this.target.toX - this.target.fromX;
        const dy = this.target.toY - this.target.fromY;
        this.cameras.main.scrollX += dx * CAMERA_SPEED;
        this.cameras.main.scrollY += dy * CAMERA_SPEED;
        console.log(this.cameras.main.scrollX, this.cameras.main.scrollY, this.target.toX, this.target.toY)
      }
    }
  }

  generate(data: any, x: number, y: number) {
    const signX = x == 0 ? 0 : x / Math.abs(x);
    const signY = y == 0 ? 0 : y / Math.abs(y);
    const worldX = x * this.map!.width * this.map!.tileWidth + signX;
    const worldY = y * this.map!.height * this.map!.tileWidth + signY;
    data.layers.forEach((layer: any) => {
      const name = `${layer.name}-${x}-${y}`;
      const newLayer = this.map!.createBlankLayer(name, this.tileset!, worldX, worldY);
      layer.data.forEach((tile: any, index: number) => {
        if (!tile) return;
        const x = index % data.width;
        const y = Math.floor(index / data.width);
        newLayer!.putTileAt(tile, x, y);
      });
    });
    this.animatedTiles.init(this.map!);
  }

  resize(
    gameSize: { width: number; height: number },
    baseSize: number,
    displaySize: number,
    resolution: number,
  ) {
  }

  toGameOver() {
    this.scene.start("GameOver");
  }

  toMenu() {
    this.scene.start("Menu");
  }
}
