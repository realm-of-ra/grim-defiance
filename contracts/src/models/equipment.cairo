// Intenral imports
use grim_defiance::models::index::Equipment;

pub mod errors {}

#[generate_trait]
impl EquipmentImpl of EquipmentTrait {}
