#[starknet::component]
mod PlayableComponent {
    use dojo::world::WorldStorage;
    use starknet::ContractAddress;

    use grim_defiance::store::{Store, StoreTrait};
    use grim_defiance::models::player::{Player, PlayerTrait};

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
    > of InternalTrait<TContractState> {
        fn new_player(
            self: @ComponentState<TContractState>, world: WorldStorage, player: ContractAddress
        ) {
            // [Setup] Datastore
            let mut store: Store = StoreTrait::new(world);

            // [Effect] Create game
            let player = PlayerTrait::new(player);

            // [Effect] Store game
            store.set_player(player);
        }
    }
}
