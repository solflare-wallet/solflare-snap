import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { deriveKeyPair } from './privateKey';

module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'getPublicKey': {
      const [ path ] = request.params || [];
      const keyPair = await deriveKeyPair(path);
      return bs58.encode(keyPair.publicKey);
    }
    case 'signTransaction': {
      const [ path, message ] = request.params || [];

      const accepted = await wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: 'Sign transaction',
          description: `${origin} is requesting to sign the following transaction`,
          textAreaContent: message
        }]
      });

      if (!accepted) {
        throw {
          code: 4001,
          message: 'Rejected by the user'
        };
      }

      const keyPair = await deriveKeyPair(path);
      const signature = nacl.sign.detached(bs58.decode(message), keyPair.secretKey);
      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signature: bs58.encode(signature)
      };
    }
    case 'signAllTransactions': {
      const [ path, messages ] = request.params || [];

      const keyPair = await deriveKeyPair(path);

      const accepted = await wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: 'Sign transaction',
          description: `${origin} is requesting to sign the following transactions`,
          textAreaContent: messages.map((message) => {
            const maxSize = Math.floor(1800 / messages.length - 50);
            if (message.length > maxSize) {
              return message.slice(0, maxSize) + '...';
            }
            return message;
          }).map((message, index) => `Transaction ${index + 1}\n\n${message}`).join('\n\n\n')
        }]
      });

      if (!accepted) {
        throw {
          code: 4001,
          message: 'Rejected by the user'
        };
      }

      const signatures = messages
        .map((message) => bs58.decode(message))
        .map((message) => nacl.sign.detached(message, keyPair.secretKey))
        .map((signature) => bs58.encode(signature));
      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signatures
      };
    }
    case 'signMessage': {
      const [ path, message, display = 'utf8' ] = request.params || [];

      const keyPair = await deriveKeyPair(path);

      const messageBytes = bs58.decode(message);

      let decodedMessage = '';
      if (display.toLowerCase() === 'utf8') {
        decodedMessage = (new TextDecoder()).decode(messageBytes);
      } else if (display.toLowerCase() === 'hex') {
        decodedMessage = `0x${Array.prototype.map.call(messageBytes, (x) => (`00${x.toString(16)}`).slice(-2)).join('')}`;
      } else {
        decodedMessage = 'Unable to decode message'
      }

      const accepted = await wallet.request({
        method: 'snap_confirm',
        params: [{
          prompt: 'Sign transaction',
          description: `${origin} is requesting to sign the following message`,
          textAreaContent: decodedMessage
        }]
      });

      if (!accepted) {
        throw {
          code: 4001,
          message: 'Rejected by the user'
        };
      }

      const signature = nacl.sign.detached(messageBytes, keyPair.secretKey);
      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signature: bs58.encode(signature)
      };
    }
    default:
      throw {
        code: 4200,
        message: 'Method not supported'
      };
  }
};
