# Solana Wallet Snap

The Solana Wallet Snap is a MetaMask extension that has Solana capabilities such as public key derivation, transaction signing, message signing.

## Starting the snap

Install the latest version of the Snaps CLI

```bash
npm install -g @metamask/snaps-cli
```

Install the dependencies

```bash
npm install
```

Build and start the local development server

```bash
npm start
```

## Using the snap

The production snap is available as Snap ID `npm:@solflare-wallet/solana-snap`.

The locally started snap is available as Snap ID `local:http://localhost:8081`.

See the [RPC API](./RPC.md) for more information on how to interact with the snap.
