# RPC Methods

### getPublicKey

Returns the wallet's public key encoded as Base58.

#### Parameters

An object containing:

- `derivationPath` - A human-readable BIP-44 HD tree path. It must begin with m/44'/501'
- `confirm` - Whether to show a confirm dialog.

#### Returns

Base58 encoded public key.

Example:

```javascript
ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:@solflare-wallet/solana-snap',
    request: {
      method: 'getPublicKey',
      params: {
        derivationPath: `m/44'/501'/0'/0'`,
        confirm: true
      }
   }
  }
});
```

### signTransaction

Sign a transaction and return the signature encoded as Base58.

#### Parameters

An object containing:

- `derivationPath` - A human-readable BIP-44 HD tree path. It must begin with m/44'/501'
- `message` - Transaction message encoded as Base58
- `simulationResult` - An array of strings, each representing a balance change, delegation or any other change formatted with Markdown
- `displayMessage` - Whether to show the raw transaction message (as Base58) in the confirm dialog

#### Returns

An object containing:

- `publicKey` - Base58 encoded public key
- `signature` - Transaction signature encoded as Base58

Example:

```javascript
ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:@solflare-wallet/solana-snap',
    request: {
      method: 'signTransaction',
      params: {
        derivationPath: `m/44'/501'/0'/0'`,
        message: '...',
        simulationResult: ['+10 USDC', '-0.1 SOL'],
        displayMessage: true
      }
   }
  }
});
```

### signAllTransactions

Sign multiple transactions and return the signatures encoded as Base58.

#### Parameters

An object containing:

- `derivationPath` - A human-readable BIP-44 HD tree path. It must begin with m/44'/501'
- `messages` - An array of transaction messages encoded as Base58
- `simulationResults` - An array of arrays of strings, each representing a balance change, delegation or any other change formatted with Markdown
- `displayMessage` - Whether to show the raw transaction messages (as Base58) in the confirm dialog

#### Returns

An object containing:

- `publicKey` - Base58 encoded public key
- `signatures` - An array of transaction signatures encoded as Base58

Example:

```javascript
ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:@solflare-wallet/solana-snap',
    request: {
      method: 'signAllTransactions',
      params: {
        derivationPath: `m/44'/501'/0'/0'`,
        messages: ['...', '...'],
        simulationResults: [['+10 USDC', '-0.1 SOL'], ['-0.00001 SOL']],
        displayMessage: true
      }
   }
  }
});
```

### signMessage

Sign a message (can be either arbitrary bytes or a UTF-8 string) and return the signature encoded as Base58.

#### Parameters

An object containing:

- `derivationPath` - A human-readable BIP-44 HD tree path. It must begin with m/44'/501'
- `message` - Message encoded as Base58
- `display` - How to decode and display the message, `utf8` or `hex`

#### Returns

An object containing:

- `publicKey` - Base58 encoded public key
- `signature` - Message signature encoded as Base58

Example:

```javascript
const bytes = new TextEncoder().encode('Lorem ipsum');
const base58Message = base58.encode(bytes);

ethereum.request({
  method: 'wallet_invokeSnap',
  params: {
    snapId: 'npm:@solflare-wallet/solana-snap',
    request: {
      method: 'signMessage',
      params: {
        derivationPath: `m/44'/501'/0'/0'`,
        message: base58Message,
        display: 'utf8'
      }
   }
  }
});
```
