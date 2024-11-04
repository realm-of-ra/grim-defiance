//! Store struct and component management methods.
use dojo::world::WorldStorage;
use dojo::model::ModelStorage;

use starknet::ContractAddress;

use grim_defiance::models::equipment::Equipment;
use grim_defiance::models::game::Game;
use grim_defiance::models::player::Player;

#[derive(Copy, Drop)]
struct Store {
    world: WorldStorage,
}

#[generate_trait]
impl StoreImpl of StoreTrait {
    #[inline]
    fn new(world: WorldStorage) -> Store {
        Store { world: world }
    }

    #[inline]
    fn get_equipment(self: Store, player: ContractAddress) -> Equipment {
        self.world.read_model(player)
    }

    #[inline]
    fn get_game(self: Store, game_id: u32) -> Game {
        self.world.read_model(game_id)
    }

    #[inline]
    fn get_player(self: Store, player: ContractAddress) -> Player {
        self.world.read_model(player)
    }

    #[inline]
    fn set_equipment(ref self: Store, equipment: Equipment) {
        self.world.write_model(@equipment);
    }

    #[inline]
    fn set_game(ref self: Store, game: Game) {
        self.world.write_model(@game);
    }

    #[inline]
    fn set_player(ref self: Store, player: Player) {
        self.world.write_model(@player);
    }
}
