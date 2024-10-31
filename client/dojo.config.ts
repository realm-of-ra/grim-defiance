import local from "../contracts/manifests/dev/deployment/manifest.json";

export type Config = ReturnType<typeof dojoConfig>;

export function dojoConfig() {
  return {
    rpcUrl: "https://api.cartridge.gg/x/gs/katana",
    toriiUrl: "https://api.cartridge.gg/x/gs/torii",
    masterAddress:
      "0x6f3c5e9f3161c9b2545d8a0a08183df56e6e9adcd04864c31e591b6c8343afe",
    masterPrivateKey:
      "0x503b610edf67c295099d5184f75159e0e9e044940c86db2e10d07595ecc6e3c",
    accountClassHash:
      "0x05400e90f7e0ae78bd02c77cd75527280470e2fe19c54970dd79dc37a9d3645c",
    feeTokenAddress:
      "0x49d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
    manifest: local,
  };
}
