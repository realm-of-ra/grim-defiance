use starknet::ContractAddress;

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Player {
    #[key]
    pub player: ContractAddress,
    pub health: u32,
    pub max_health: u32,
    pub experience: u32,
    pub level: u8,
    pub character_class: u8,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Position {
    #[key]
    pub player: ContractAddress,
    pub vec: Vec2,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Equipment {
    #[key]
    pub player: ContractAddress,
    pub weapon: u32,
    pub armor: u32,
    pub accessory: u32,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Skills {
    #[key]
    pub player: ContractAddress,
    pub skill_ids: Array<u32>,
    pub cooldowns: Array<u32>,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Enemy {
    #[key]
    pub enemy_id: u32,
    pub health: u32,
    pub damage: u32,
    pub enemy_type: u8,
    pub spawn_time: u64,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct GameState {
    #[key]
    pub game_id: u32,
    pub wave: u32,
    pub difficulty: u8,
    pub start_time: u64,
    pub is_active: bool,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Upgrades {
    #[key]
    pub player: ContractAddress,
    pub upgrade_ids: Array<u32>,
    pub upgrade_levels: Array<u8>,
}

#[derive(Copy, Drop, Serde, Debug)]
#[dojo::model]
pub struct Movement {
    #[key]
    pub entity: ContractAddress,
    pub speed: u32,
    pub direction: Direction,
    pub last_move_time: u64,
}

#[derive(Serde, Copy, Drop, Introspect, PartialEq, Debug)]
pub enum Direction {
    None,
    Left,
    Right,
    Up,
    Down,
}


#[derive(Copy, Drop, Serde, IntrospectPacked, Debug)]
pub struct Vec2 {
    pub x: u32,
    pub y: u32
}


impl DirectionIntoFelt252 of Into<Direction, felt252> {
    fn into(self: Direction) -> felt252 {
        match self {
            Direction::None => 0,
            Direction::Left => 1,
            Direction::Right => 2,
            Direction::Up => 3,
            Direction::Down => 4,
        }
    }
}


#[generate_trait]
impl Vec2Impl of Vec2Trait {
    fn is_zero(self: Vec2) -> bool {
        if self.x - self.y == 0 {
            return true;
        }
        false
    }

    fn is_equal(self: Vec2, b: Vec2) -> bool {
        self.x == b.x && self.y == b.y
    }
}

#[cfg(test)]
mod tests {
    use super::{Position, Vec2, Vec2Trait};

    #[test]
    fn test_vec_is_zero() {
        assert(Vec2Trait::is_zero(Vec2 { x: 0, y: 0 }), 'not zero');
    }

    #[test]
    fn test_vec_is_equal() {
        let position = Vec2 { x: 420, y: 0 };
        assert(position.is_equal(Vec2 { x: 420, y: 0 }), 'not equal');
    }
}
