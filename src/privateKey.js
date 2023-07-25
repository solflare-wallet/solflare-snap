import nacl from 'tweetnacl';
import { SLIP10Node } from '@metamask/key-tree';

export async function deriveKeyPair(path = '') {
  if (!path.startsWith(`m/44'/501'`)) {
    throw {
      code: 4001,
      message: 'Invalid derivation path'
    }
  }

  const rootNode = await snap.request({
    method: 'snap_getBip32Entropy',
    params: {
      path: [`m`, `44'`, `501'`],
      curve: 'ed25519'
    }
  });

  const segments = path.split('/').slice(3).filter(Boolean);

  const node = await SLIP10Node.fromJSON(rootNode);

  const keypair = await node.derive(segments.map((segment) => `slip10:${segment}`));

  return nacl.sign.keyPair.fromSeed(Uint8Array.from(keypair.privateKeyBytes));
}
