
// Generated by dojo-bindgen on Thu, 19 Sep 2024 20:28:45 +0000. Do not modify this file manually.
// Import the necessary types from the recs SDK
// generate again with `sozo build --typescript` 
import { defineComponent, Type as RecsType, World } from "@dojoengine/recs";

export type ContractComponents = Awaited<ReturnType<typeof defineContractComponents>>;



// Type definition for `dojo::model::layout::Layout` enum
export type Layout = { type: 'Fixed'; value: RecsType.NumberArray; } | { type: 'Struct'; value: RecsType.StringArray; } | { type: 'Tuple'; value: RecsType.StringArray; } | { type: 'Array'; value: RecsType.StringArray; } | { type: 'ByteArray'; } | { type: 'Enum'; value: RecsType.StringArray; };

export const LayoutDefinition = {
    type: RecsType.String,
    value: RecsType.String
};
        
// Type definition for `grimscape::models::index::Adventurer` struct
export interface Adventurer {
    realm_id: Number;
    dungeon_id: Number;
    id: Number;
    x: Number;
    y: Number;
    position: Number;
    health: Number;
    base_health: Number;
    xp: Number;
    gold: Number;
    weapon: Number;
    gears: Number;
    attributes: Number;
    seed: BigInt;
    player_id: BigInt;
    
}
export const AdventurerDefinition = {
    realm_id: RecsType.Number,
    dungeon_id: RecsType.Number,
    id: RecsType.Number,
    x: RecsType.Number,
    y: RecsType.Number,
    position: RecsType.Number,
    health: RecsType.Number,
    base_health: RecsType.Number,
    xp: RecsType.Number,
    gold: RecsType.Number,
    weapon: RecsType.Number,
    gears: RecsType.Number,
    attributes: RecsType.Number,
    seed: RecsType.BigInt,
    player_id: RecsType.BigInt,
    
};

// Type definition for `core::byte_array::ByteArray` struct
export interface ByteArray {
    data: String[];
    pending_word: BigInt;
    pending_word_len: Number;
    
}
export const ByteArrayDefinition = {
    data: RecsType.StringArray,
    pending_word: RecsType.BigInt,
    pending_word_len: RecsType.Number,
    
};

// Type definition for `dojo::model::layout::FieldLayout` struct
export interface FieldLayout {
    selector: BigInt;
    layout: Layout;
    
}
export const FieldLayoutDefinition = {
    selector: RecsType.BigInt,
    layout: LayoutDefinition,
    
};

// Type definition for `grimscape::models::index::Mob` struct
export interface Mob {
    realm_id: Number;
    dungeon_id: Number;
    adventurer_id: Number;
    x: Number;
    y: Number;
    id: Number;
    position: Number;
    distance: Number;
    next: Number;
    beast: Number;
    health: Number;
    base_health: Number;
    
}
export const MobDefinition = {
    realm_id: RecsType.Number,
    dungeon_id: RecsType.Number,
    adventurer_id: RecsType.Number,
    x: RecsType.Number,
    y: RecsType.Number,
    id: RecsType.Number,
    position: RecsType.Number,
    distance: RecsType.Number,
    next: RecsType.Number,
    beast: RecsType.Number,
    health: RecsType.Number,
    base_health: RecsType.Number,
    
};


// Type definition for `grimscape::events::AdventurerUpdate` struct
export interface AdventurerUpdate {
    id: Number;
    adventurer: Adventurer;
    
}
export const AdventurerUpdateDefinition = {
    id: RecsType.Number,
    adventurer: AdventurerDefinition,
    
};


// Type definition for `grimscape::events::AdventurerHit` struct
export interface AdventurerHit {
    id: Number;
    adventurer: Adventurer;
    mob: Mob;
    
}
export const AdventurerHitDefinition = {
    id: RecsType.Number,
    adventurer: AdventurerDefinition,
    mob: MobDefinition,
    
};


// Type definition for `grimscape::models::index::Dungeon` struct
export interface Dungeon {
    realm_id: Number;
    id: Number;
    nonce: Number;
    claimer: BigInt;
    seed: BigInt;
    
}
export const DungeonDefinition = {
    realm_id: RecsType.Number,
    id: RecsType.Number,
    nonce: RecsType.Number,
    claimer: RecsType.BigInt,
    seed: RecsType.BigInt,
    
};



// Type definition for `grimscape::events::MobHit` struct
export interface MobHit {
    id: Number;
    mob: Mob;
    adventurer: Adventurer;
    
}
export const MobHitDefinition = {
    id: RecsType.Number,
    mob: MobDefinition,
    adventurer: AdventurerDefinition,
    
};


// Type definition for `grimscape::events::MobUpdate` struct
export interface MobUpdate {
    id: Number;
    mob: Mob;
    
}
export const MobUpdateDefinition = {
    id: RecsType.Number,
    mob: MobDefinition,
    
};


// Type definition for `grimscape::models::index::Player` struct
export interface Player {
    id: BigInt;
    adventurer_id: Number;
    name: BigInt;
    
}
export const PlayerDefinition = {
    id: RecsType.BigInt,
    adventurer_id: RecsType.Number,
    name: RecsType.BigInt,
    
};


// Type definition for `grimscape::models::index::Realm` struct
export interface Realm {
    id: Number;
    dungeon_count: Number;
    
}
export const RealmDefinition = {
    id: RecsType.Number,
    dungeon_count: RecsType.Number,
    
};


// Type definition for `grimscape::models::index::Room` struct
export interface Room {
    realm_id: Number;
    dungeon_id: Number;
    adventurer_id: Number;
    x: Number;
    y: Number;
    width: Number;
    height: Number;
    mob_count: Number;
    entities: BigInt;
    grid: BigInt;
    seed: BigInt;
    
}
export const RoomDefinition = {
    realm_id: RecsType.Number,
    dungeon_id: RecsType.Number,
    adventurer_id: RecsType.Number,
    x: RecsType.Number,
    y: RecsType.Number,
    width: RecsType.Number,
    height: RecsType.Number,
    mob_count: RecsType.Number,
    entities: RecsType.BigInt,
    grid: RecsType.BigInt,
    seed: RecsType.BigInt,
    
};


export function defineContractComponents(world: World) {
    return {

        // Model definition for `grimscape::models::index::Adventurer` model
        Adventurer: (() => {
            return defineComponent(
                world,
                {
                    realm_id: RecsType.Number,
                    dungeon_id: RecsType.Number,
                    id: RecsType.Number,
                    x: RecsType.Number,
                    y: RecsType.Number,
                    position: RecsType.Number,
                    health: RecsType.Number,
                    base_health: RecsType.Number,
                    xp: RecsType.Number,
                    gold: RecsType.Number,
                    weapon: RecsType.Number,
                    gears: RecsType.Number,
                    attributes: RecsType.Number,
                    seed: RecsType.BigInt,
                    player_id: RecsType.BigInt,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "Adventurer",
                        types: ["u32", "u32", "u32", "i32", "i32", "u8", "u16", "u16", "u16", "u16", "u8", "u32", "u32", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::events::AdventurerHit` model
        AdventurerHit: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    adventurer: AdventurerDefinition,
                    mob: MobDefinition,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "AdventurerHit",
                        types: ["u32"],
                        customTypes: ["Adventurer", "Mob"],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::events::AdventurerUpdate` model
        AdventurerUpdate: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    adventurer: AdventurerDefinition,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "AdventurerUpdate",
                        types: ["u32"],
                        customTypes: ["Adventurer"],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::models::index::Dungeon` model
        Dungeon: (() => {
            return defineComponent(
                world,
                {
                    realm_id: RecsType.Number,
                    id: RecsType.Number,
                    nonce: RecsType.Number,
                    claimer: RecsType.BigInt,
                    seed: RecsType.BigInt,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "Dungeon",
                        types: ["u32", "u32", "u32", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),

        Mob: (() => {
            return defineComponent(
                world,
                {
                    realm_id: RecsType.Number,
                    dungeon_id: RecsType.Number,
                    adventurer_id: RecsType.Number,
                    x: RecsType.Number,
                    y: RecsType.Number,
                    id: RecsType.Number,
                    position: RecsType.Number,
                    distance: RecsType.Number,
                    next: RecsType.Number,
                    beast: RecsType.Number,
                    health: RecsType.Number,
                    base_health: RecsType.Number,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "Mob",
                        types: ["u32", "u32", "u32", "i32", "i32", "u32", "u8", "u8", "u8", "u8", "u16", "u16"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::events::MobHit` model
        MobHit: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    mob: MobDefinition,
                    adventurer: AdventurerDefinition,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "MobHit",
                        types: ["u32"],
                        customTypes: ["Mob", "Adventurer"],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::events::MobUpdate` model
        MobUpdate: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    mob: MobDefinition,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "MobUpdate",
                        types: ["u32"],
                        customTypes: ["Mob"],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::models::index::Player` model
        Player: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.BigInt,
                    adventurer_id: RecsType.Number,
                    name: RecsType.BigInt,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "Player",
                        types: ["felt252", "u32", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::models::index::Realm` model
        Realm: (() => {
            return defineComponent(
                world,
                {
                    id: RecsType.Number,
                    dungeon_count: RecsType.Number,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "Realm",
                        types: ["u32", "u32"],
                        customTypes: [],
                    },
                }
            );
        })(),

        // Model definition for `grimscape::models::index::Room` model
        Room: (() => {
            return defineComponent(
                world,
                {
                    realm_id: RecsType.Number,
                    dungeon_id: RecsType.Number,
                    adventurer_id: RecsType.Number,
                    x: RecsType.Number,
                    y: RecsType.Number,
                    width: RecsType.Number,
                    height: RecsType.Number,
                    mob_count: RecsType.Number,
                    entities: RecsType.BigInt,
                    grid: RecsType.BigInt,
                    seed: RecsType.BigInt,
                },
                {
                    metadata: {
                        namespace: "grimscape",
                        name: "Room",
                        types: ["u32", "u32", "u32", "i32", "i32", "u8", "u8", "u8", "felt252", "felt252", "felt252"],
                        customTypes: [],
                    },
                }
            );
        })(),
    };
}
