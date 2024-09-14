// Constants

// Walls
const WALL: number[] = [66];
const FULL_WALL: number[] = [70];
const SINGLE_WALL: number[] = [37];
const NORTH_WALL: number[] = [2, 3, 4, 5];
const SOUTH_WALL: number[] = [42, 43, 44, 45, 52, 53];
const EAST_WALL: number[] = [16, 26, 36];
const WEST_WALL: number[] = [11, 21, 31];
const NORTHEAST_CLOSING_WALL: number[] = [6];
const NORTHWEST_CLOSING_WALL: number[] = [1];
const NORTHEAST_OPENING_WALL: number[] = [2, 3, 4, 5];
const NORTHWEST_OPENING_WALL: number[] = [2, 3, 4, 5];
const SOUTHEAST_CLOSING_WALL: number[] = [46];
const SOUTHWEST_CLOSING_WALL: number[] = [41];
const SOUTHEAST_OPENING_WALL: number[] = [51, 55];
const SOUTHWEST_OPENING_WALL: number[] = [54, 56];
const EAST_SINGLE_HORIZONTAL_WALL: number[] = [38];
const CENTER_SINGLE_HORIZONTAL_WALL: number[] = [39];
const WEST_SINGLE_HORIZONTAL_WALL: number[] = [40];
const NORTH_SINGLE_VERTICAL_WALL: number[] = [67];
const CENTER_SINGLE_VERTICAL_WALL: number[] = [57];
const SOUTH_SINGLE_VERTICAL_WALL: number[] = [47];

// Floors
const FLOOR: number[] = [23, 24, 10, 20, 30, 7, 8, 9, 10, 17, 18, 19, 20, 27, 28, 29, 30];
const SINGLE_FLOOR: number[] = [61];
const NORTH_OPENING_FLOOR: number[] = [13, 14];
const SOUTH_OPENING_FLOOR: number[] = [33, 34];
const EAST_OPENING_FLOOR: number[] = [25];
const WEST_OPENING_FLOOR: number[] = [22];
const NORTH_CLOSING_FLOOR: number[] = [71];
const SOUTH_CLOSING_FLOOR: number[] = [91];
const EAST_CLOSING_FLOOR: number[] = [64];
const WEST_CLOSING_FLOOR: number[] = [62];
const NORTHEAST_FLOOR: number[] = [15];
const NORTHWEST_FLOOR: number[] = [12];
const SOUTHEAST_FLOOR: number[] = [35];
const SOUTHWEST_FLOOR: number[] = [32];
const CENTER_HORIZONTAL_FLOOR: number[] = [63];
const CENTER_VERTICAL_FLOOR: number[] = [81];
const CORNER_FLOOR: number[] = [65];

export interface Neighbors {
  n: boolean;
  s: boolean;
  e: boolean;
  w: boolean;
  ne: boolean;
  nw: boolean;
  se: boolean;
  sw: boolean;
}

export interface Tilemap {
  evaluate(nbs: Neighbors, value: number): number;
  neighbors(width: number, height: number, index: number, bitmap: number[]): Neighbors;
  extract(width: number, height: number, tilemap: bigint): number[];
  generate(width: number, height: number, tilemap: bigint): any;
}

export const Tilemap: Tilemap = {
  evaluate(nbs: Neighbors,value: number) {
    // ■: wall
    // □: floor
    // *: either wall or floor
    const self: boolean = value === 0;
    // Evaluate walls
    if (self && nbs.n && nbs.s && nbs.e && nbs.w && nbs.ne && nbs.nw && nbs.se && nbs.sw) {
      // ■ ■ ■
      // ■ ■ ■
      // ■ ■ ■
      return FULL_WALL[Math.floor(Math.random() * FULL_WALL.length)];
    } else if (self && !nbs.n && !nbs.s && !nbs.e && !nbs.w) {
      // * □ *
      // □ ■ □
      // * □ *
      return SINGLE_WALL[Math.floor(Math.random() * SINGLE_WALL.length)];
    } else if (self && !nbs.s && nbs.n && nbs.e && nbs.w) {
      // * ■ *
      // ■ ■ ■
      // * □ *
      return NORTH_WALL[Math.floor(Math.random() * NORTH_WALL.length)];
    } else if (self && !nbs.n && nbs.s && nbs.e && nbs.w && nbs.se && nbs.sw) {
      // * □ *
      // ■ ■ ■
      // ■ ■ ■
      return SOUTH_WALL[Math.floor(Math.random() * SOUTH_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && !nbs.w) {
      // * ■ *
      // □ ■ ■
      // * ■ *
      return EAST_WALL[Math.floor(Math.random() * EAST_WALL.length)];
    } else if (self && nbs.n && nbs.s && !nbs.e && nbs.w) {
      // * ■ *
      // ■ ■ □
      // * ■ *
      return WEST_WALL[Math.floor(Math.random() * WEST_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && nbs.w && !nbs.sw && nbs.se) {
      // * ■ *
      // ■ ■ ■
      // □ ■ ■
      return EAST_WALL[Math.floor(Math.random() * EAST_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && nbs.w && !nbs.se && nbs.sw) {
      // * ■ *
      // ■ ■ ■
      // ■ ■ □
      return WEST_WALL[Math.floor(Math.random() * WEST_WALL.length)];
    } else if (self && nbs.n && !nbs.s && !nbs.e && !nbs.w) {
      // * ■ *
      // □ ■ □
      // * □ *
      return NORTH_SINGLE_VERTICAL_WALL[Math.floor(Math.random() * NORTH_SINGLE_VERTICAL_WALL.length)];
    } else if (self && !nbs.n && nbs.s && !nbs.e && !nbs.w) {
      // * □ *
      // □ ■ □
      // * ■ *
      return SOUTH_SINGLE_VERTICAL_WALL[Math.floor(Math.random() * SOUTH_SINGLE_VERTICAL_WALL.length)];
    } else if (self && !nbs.n && !nbs.s && nbs.e && !nbs.w) {
      // * □ *
      // □ ■ ■
      // * □ *
      return EAST_SINGLE_HORIZONTAL_WALL[Math.floor(Math.random() * EAST_SINGLE_HORIZONTAL_WALL.length)];
    } else if (self && !nbs.n && !nbs.s && !nbs.e && nbs.w) {
      // * □ *
      // ■ ■ □
      // * □ *
      return WEST_SINGLE_HORIZONTAL_WALL[Math.floor(Math.random() * WEST_SINGLE_HORIZONTAL_WALL.length)];
    } else if (self && !nbs.n && !nbs.s && nbs.e && nbs.w) {
      // * □ *
      // ■ ■ ■
      // * □ *
      return CENTER_SINGLE_HORIZONTAL_WALL[Math.floor(Math.random() * CENTER_SINGLE_HORIZONTAL_WALL.length)];
    } else if (self && nbs.n && nbs.s && !nbs.e && !nbs.w) {
      // * ■ *
      // □ ■ □
      // * ■ *
      return CENTER_SINGLE_VERTICAL_WALL[Math.floor(Math.random() * CENTER_SINGLE_VERTICAL_WALL.length)];
    } else if (self && nbs.s && nbs.e && nbs.w && !nbs.se && !nbs.sw) {
      // * * *
      // ■ ■ ■
      // □ ■ □
      return CENTER_SINGLE_VERTICAL_WALL[Math.floor(Math.random() * CENTER_SINGLE_VERTICAL_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && nbs.w && nbs.nw && nbs.se && !nbs.sw) {
      // ■ ■ *
      // ■ ■ ■
      // □ ■ ■
      return NORTHEAST_CLOSING_WALL[Math.floor(Math.random() * NORTHEAST_CLOSING_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && nbs.w && nbs.ne && nbs.sw && !nbs.se) {
      // * ■ ■
      // ■ ■ ■
      // ■ ■ □
      return NORTHWEST_CLOSING_WALL[Math.floor(Math.random() * NORTHWEST_CLOSING_WALL.length)];
    } else if (self && nbs.n && !nbs.s && nbs.e && !nbs.w) {
      // * ■ *
      // □ ■ ■
      // * □ *
      return NORTHEAST_OPENING_WALL[Math.floor(Math.random() * NORTHEAST_OPENING_WALL.length)];
    } else if (self && nbs.n && !nbs.s && !nbs.e && nbs.w) {
      // * ■ *
      // ■ ■ □
      // * □ *
      return NORTHWEST_OPENING_WALL[Math.floor(Math.random() * NORTHWEST_OPENING_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && nbs.w && nbs.ne && !nbs.nw && nbs.sw) {
      // □ ■ ■
      // ■ ■ ■
      // ■ ■ *
      return SOUTHEAST_CLOSING_WALL[Math.floor(Math.random() * SOUTHEAST_CLOSING_WALL.length)];
    } else if (self && nbs.n && nbs.s && nbs.e && nbs.w && !nbs.ne && nbs.nw && nbs.se) {
      // ■ ■ □
      // ■ ■ ■
      // * ■ ■
      return SOUTHWEST_CLOSING_WALL[Math.floor(Math.random() * SOUTHWEST_CLOSING_WALL.length)];
    } else if (self && !nbs.n && nbs.s && nbs.e && (!nbs.w || !nbs.sw) && nbs.se) {
      // * □ *      * □ *
      // □ ■ ■  or  * ■ ■
      // * ■ ■      □ ■ ■
      return SOUTHEAST_OPENING_WALL[Math.floor(Math.random() * SOUTHEAST_OPENING_WALL.length)];
    } else if (self && !nbs.n && nbs.s && (!nbs.e || !nbs.se) && nbs.w && nbs.sw) {
      // * □ *      * □ *
      // ■ ■ □  or  ■ ■ *
      // ■ ■ *      ■ ■ □
      return SOUTHWEST_OPENING_WALL[Math.floor(Math.random() * SOUTHWEST_OPENING_WALL.length)];
    } else if (self) {
      // * * *
      // * ■ *
      // * * *
      return WALL[Math.floor(Math.random() * WALL.length)];
    }
   
    // Evaluate floors
    if (nbs.n && nbs.s && nbs.e && nbs.w) {
      // * ■ *
      // ■ * ■
      // * ■ *
      return SINGLE_FLOOR[Math.floor(Math.random() * SINGLE_FLOOR.length)];
    } else if (nbs.n && !nbs.s && !nbs.e && !nbs.w) {
      // * ■ *
      // □ * □
      // * □ *
      return NORTH_OPENING_FLOOR[Math.floor(Math.random() * NORTH_OPENING_FLOOR.length)];
    } else if (nbs.n && !nbs.s && nbs.e && nbs.w) {
      // * ■ *
      // ■ * ■
      // * □ *
      return NORTH_CLOSING_FLOOR[Math.floor(Math.random() * NORTH_CLOSING_FLOOR.length)];
    } else if (!nbs.n && nbs.s && !nbs.e && !nbs.w) {
      // * □ *
      // □ * □
      // * ■ *
      return SOUTH_OPENING_FLOOR[Math.floor(Math.random() * SOUTH_OPENING_FLOOR.length)];
    } else if (!nbs.n && nbs.s && nbs.e && nbs.w) {
      // * □ *
      // ■ * ■
      // * ■ *
      return SOUTH_CLOSING_FLOOR[Math.floor(Math.random() * SOUTH_CLOSING_FLOOR.length)];
    } else if (!nbs.n && !nbs.s && nbs.e && !nbs.w) {
      // * □ *
      // □ * ■
      // * □ *
      return EAST_OPENING_FLOOR[Math.floor(Math.random() * EAST_OPENING_FLOOR.length)];
    } else if (nbs.n && nbs.s && nbs.e && !nbs.w) {
      // * ■ *
      // □ * ■
      // * ■ *
      return EAST_CLOSING_FLOOR[Math.floor(Math.random() * EAST_CLOSING_FLOOR.length)];
    } else if (!nbs.n && !nbs.s && !nbs.e && nbs.w) {
      // * □ *
      // ■ * □
      // * □ *
      return WEST_OPENING_FLOOR[Math.floor(Math.random() * WEST_OPENING_FLOOR.length)];
    } else if (nbs.n && nbs.s && !nbs.e && nbs.w) {
      // * ■ *
      // ■ * □
      // * ■ *
      return WEST_CLOSING_FLOOR[Math.floor(Math.random() * WEST_CLOSING_FLOOR.length)];
    } else if (nbs.n && nbs.e) {
      // * ■ *
      // * * ■
      // * * *
      return NORTHEAST_FLOOR[Math.floor(Math.random() * NORTHEAST_FLOOR.length)];
    } else if (nbs.n && nbs.w) {
      // * ■ *
      // ■ * *
      // * * *
      return NORTHWEST_FLOOR[Math.floor(Math.random() * NORTHWEST_FLOOR.length)];
    } else if (nbs.s && nbs.e) {
      // * * *
      // * * ■
      // * ■ *
      return SOUTHEAST_FLOOR[Math.floor(Math.random() * SOUTHEAST_FLOOR.length)];
    } else if (nbs.s && nbs.w) {
      // * * *
      // ■ * *
      // * ■ *
      return SOUTHWEST_FLOOR[Math.floor(Math.random() * SOUTHWEST_FLOOR.length)];
    } else if (nbs.n && nbs.s) {
      // * ■ *
      // * * *
      // * ■ *
      return CENTER_HORIZONTAL_FLOOR[Math.floor(Math.random() * CENTER_HORIZONTAL_FLOOR.length)];
    } else if (nbs.e && nbs.w) {
      // * * *
      // ■ * ■
      // * * *
      return CENTER_VERTICAL_FLOOR[Math.floor(Math.random() * CENTER_VERTICAL_FLOOR.length)];
    } else if (nbs.ne || nbs.nw || nbs.se || nbs.sw) {
      // ■ * ■
      // * * *
      // ■ * ■
      return CORNER_FLOOR[Math.floor(Math.random() * CORNER_FLOOR.length)];
    } else {
      return FLOOR[Math.floor(Math.random() * FLOOR.length)];
    }
  },


  neighbors(width: number, height: number, position: number, bitmap: number[]) {
    const x: number = position % width;
    const y: number = Math.floor(position / width);
    return {
      n: y < height - 1 ? bitmap[position + width] === 0 : true,
      s: y > 0 ? bitmap[position - width] === 0 : true,
      e: x > 0 ? bitmap[position - 1] === 0 : true,
      w: x < width - 1 ? bitmap[position + 1] === 0 : true,
      ne: y < height - 1 && x > 0 ? bitmap[position + width - 1] === 0 : true,
      nw: y < height - 1 && x < width - 1 ? bitmap[position + width + 1] === 0 : true,
      se: y > 0 && x > 0 ? bitmap[position - width - 1] === 0 : true,
      sw: y > 0 && x < width - 1 ? bitmap[position - width + 1] === 0 : true,
    };
  },

  extract(width: number, height: number, tilemap: bigint) {
    const n = width * height;
    const bitmap: number[] = tilemap.toString(2).padStart(n, '0').split('').reverse().map((value: string) => parseInt(value));
    return bitmap.map((value: number, index: number) => {
      const neighbors: Neighbors = this.neighbors(width, height, index, bitmap);
      return this.evaluate(neighbors, value);
    }).reverse();
  },

  generate(width: number, height: number, tilemap: bigint) {
    const ground = this.extract(width, height, tilemap);
    return { compressionlevel:-1,
      height: height,
      infinite:false,
      layers:[
             {
              data: ground,
              height,
              id: 1,
              name: "Ground",
              opacity: 1,
              type: "tilelayer",
              visible: true,
              width,
              x: 0,
              y: 0,
             }, 
             {
              data:[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 72,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              height,
              id: 3,
              name: "Details",
              opacity:1,
              type: "tilelayer",
              visible: true,
              width,
              x: 0,
              y: 0
             }, 
             {
              data:[75, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 76, 77,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 87,
                 95, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 97],
              height,
              id:7,
              name:"Fog",
              opacity:1,
              type:"tilelayer",
              visible:true,
              width,
              x:0,
              y:0
             }],
      nextlayerid:8,
      nextobjectid:1,
      orientation:"orthogonal",
      renderorder:"right-down",
      tiledversion:"1.10.2",
      tileheight:16,
      tilesets:[
             {
              columns:10,
              firstgid:1,
              image:"tileset.png",
              imageheight:160,
              imagewidth:160,
              margin:0,
              name:"tileset",
              spacing:0,
              tilecount:100,
              tileheight:16,
              tiles:[
                     {
                      animation:[
                             {
                              duration:200,
                              tileid:71
                             }, 
                             {
                              duration:200,
                              tileid:72
                             }, 
                             {
                              duration:200,
                              tileid:73
                             }, 
                             {
                              duration:200,
                              tileid:72
                             }],
                      id:71
                     }, 
                     {
                      animation:[
                             {
                              duration:200,
                              tileid:81
                             }, 
                             {
                              duration:200,
                              tileid:82
                             }, 
                             {
                              duration:200,
                              tileid:83
                             }, 
                             {
                              duration:200,
                              tileid:82
                             }],
                      id:81
                     }, 
                     {
                      animation:[
                             {
                              duration:200,
                              tileid:91
                             }, 
                             {
                              duration:200,
                              tileid:92
                             }, 
                             {
                              duration:200,
                              tileid:93
                             }, 
                             {
                              duration:200,
                              tileid:92
                             }],
                      id:91
                     }],
              tilewidth:16
             }],
      tilewidth:16,
      type:"map",
      version:1.10,
      width:15
     }
  },
}