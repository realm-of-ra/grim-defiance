#[starknet::component]
mod CombatComponent {
    use dojo::world::WorldStorage;
    use starknet::ContractAddress;

    use grim_defiance::store::{Store, StoreTrait};
    use grim_defiance::models::equipment::Equipment;

    // Storage
    #[storage]
    struct Storage {}

    // Events
    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {}

    // Errors
    mod errors {}

    #[generate_trait]
    impl InternalImpl<
        TContractState, +HasComponent<TContractState>
    > of InternalTrait<TContractState> {}
}
