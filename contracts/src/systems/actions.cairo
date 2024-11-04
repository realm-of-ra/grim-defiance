use starknet::ContractAddress;

// Interfaces
#[starknet::interface]
trait IActions<TContractState> {
    fn create_new_player(self: @TContractState, player: ContractAddress);
}

// dojo decorator
#[dojo::contract]
pub mod actions {
    use super::{IActions, ContractAddress};
    use starknet::{get_caller_address};

    use grim_defiance::components::playable::PlayableComponent;

    use dojo::world::WorldStorage;

    // Components
    component!(path: PlayableComponent, storage: playable, event: PlayableEvent);
    impl PlayableInternalImpl = PlayableComponent::InternalImpl<ContractState>;

    #[storage]
    struct Storage {
        #[substorage(v0)]
        playable: PlayableComponent::Storage,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        #[flat]
        PlayableEvent: PlayableComponent::Event,
    }

    // Errors
    mod errors {}

    #[abi(embed_v0)]
    impl ActionsImpl of IActions<ContractState> {
        fn create_new_player(self: @ContractState, player: ContractAddress) {
            // Get the default world.
            let world = self.world_storage();

            // Get the address of the current caller, possibly the player's address.
            let player = get_caller_address();
            self.playable.new_player(world, player)
        }
    }

    #[generate_trait]
    impl Private of PrivateTrait {
        fn world_storage(self: @ContractState) -> WorldStorage {
            self.world(@"grim_defiance")
        }
    }
}
