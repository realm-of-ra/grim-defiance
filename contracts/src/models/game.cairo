// Intenral imports
use grim_defiance::models::index::Game;

pub mod errors {}

#[generate_trait]
impl GameImpl of GameTrait {
  #[inline]
fn new_name() -> Game {
    Game {
      game_id: 0,
      wave: 1,
      difficulty: 1,
      start_time: 0,
      is_active: true
    }
};

//#[generate_trait]
//impl GameAssert of AssertTrait {}
