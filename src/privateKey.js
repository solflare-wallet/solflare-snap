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

  const bytes = Buffer.from(solanaNode.key, 'base64');

  const segments = path.split('/').slice(3).filter(Boolean);

  if (!segments.length) {
    return getKeyPairFromSeed(bytes);
  }

  const seed = segments.reduce((parentKey, segment) => deriveChildKey(segment, parentKey), bytes);

  return getKeyPairFromSeed(seed);
}
