import nacl from 'tweetnacl';
import { deriveChildKey } from '@metamask/key-tree/dist/derivers/bip32';

function getKeyPairFromSeed (seed) {
  const { key } = splitKey(seed);
  return nacl.sign.keyPair.fromSeed(key);
}

function splitKey (seed) {
  const key = seed.slice(0, 32);
  const chainCode = seed.slice(32);
  return { key, chainCode };
}

export async function deriveKeyPair (path = '') {
  if (!path.startsWith(`m/44'/501'`)) {
    throw {
      code: 4001,
      message: 'Invalid derivation path'
    }
  }

  const solanaNode = await wallet.request({
    method: 'snap_getBip44Entropy_501'
  });

  const segments = path.split('/').slice(3).filter(Boolean);

  // const bip32Segments = segments.map((segment) => `bip32:${segment}`);
  //
  // const node = await SLIP10Node.fromJSON({
  //   ...solanaNode,
  //   curve: 'ed25519'
  // });
  //
  // console.log('node', node);
  //
  // const derived = await node.derive(bip32Segments);
  //
  // console.log('derived', derived);
  //
  // return nacl.sign.keyPair.fromSeed(derived.privateKeyBuffer);

  // const node = await deriveKeyFromPath({
  //   node: await BIP44Node.fromJSON(solanaNode),
  //   path: bip32Segments,
  //   depth: solanaNode.depth + bip32Segments.length,
  //   curve: 'ed25519'
  // });
  //
  // console.log('new node', node);
  //
  // const privKey = Uint8Array.from(node.privateKeyBuffer);
  // const pubKey = Uint8Array.from(node.publicKeyBuffer).slice(1);
  //
  // const secretKey = new Uint8Array(privKey.length + pubKey.length);
  // secretKey.set(privKey);
  // secretKey.set(pubKey, privKey.length);
  //
  // return nacl.sign.keyPair.fromSecretKey(secretKey);

  // old
  const bytes = Buffer.from(solanaNode.privateKey + solanaNode.chainCode, 'hex');

  if (!segments.length) {
    return getKeyPairFromSeed(bytes);
  }

  const seed = segments.reduce((parentKey, segment) => deriveChildKey(segment, parentKey), bytes);

  return getKeyPairFromSeed(seed);
}
