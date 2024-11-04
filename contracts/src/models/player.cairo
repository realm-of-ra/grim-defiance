// Intenral imports
use grim_defiance::models::index::Player;
use starknet::ContractAddress;

pub mod errors {}

#[generate_trait]
impl PlayerImpl of PlayerTrait {
    #[inline]
    fn new(player: ContractAddress) -> Player {
        Player { player, health: 100, max_health: 150, experience: 0, level: 1, character_class: 1 }
    }
}

#[generate_trait]
impl PlayerAssert of AssertTrait {}
