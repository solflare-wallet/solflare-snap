import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { panel, heading, text, copyable, divider } from '@metamask/snaps-ui';
import { deriveKeyPair } from './privateKey';
import { assertInput, assertConfirmation } from './utils';

module.exports.onRpcRequest = async ({ origin, request }) => {
  switch (request.method) {
    case 'getPublicKey': {
      const [ path, confirm = false ] = request.params || [];

      assertInput(path);

      if (confirm) {
        const accepted = await snap.request({
          method: 'snap_dialog',
          params: {
            type: 'confirmation',
            content: panel([
              heading('Confirm access'),
              text(`${origin} wants to know your Solana address`)
            ])
          }
        });

        assertConfirmation(accepted);
      }

      const keyPair = await deriveKeyPair(path);
      return bs58.encode(keyPair.publicKey);
    }
    case 'signTransaction': {
      const [ path, message ] = request.params || [];

      assertInput(path);
      assertInput(message);

      const accepted = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Sign transaction'),
            text(`${origin} is requesting to sign the following transaction`),
            copyable(message)
          ])
        }
      });

      assertConfirmation(accepted);

      const keyPair = await deriveKeyPair(path);
      const signature = nacl.sign.detached(bs58.decode(message), keyPair.secretKey);
      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signature: bs58.encode(signature)
      };
    }
    case 'signAllTransactions': {
      const [ path, messages ] = request.params || [];

      assertInput(path);
      assertInput(messages);
      assertInput(messages.length);

      const keyPair = await deriveKeyPair(path);

      const uiElements = [];

      for (let i = 0; i < messages?.length; i++) {
        uiElements.push(divider());
        uiElements.push(text(`Transaction ${i + 1}`));
        uiElements.push(copyable(messages?.[i]));
      }

      const accepted = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Sign transactions'),
            text(`${origin} is requesting to sign the following transactions`),
            ...uiElements
          ])
        }
      });

      assertConfirmation(accepted);

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

      assertInput(path);
      assertInput(message);

      const keyPair = await deriveKeyPair(path);

      const messageBytes = bs58.decode(message);

      let decodedMessage = '';
      if (display.toLowerCase() === 'utf8') {
        decodedMessage = (new TextDecoder()).decode(messageBytes);
      } else if (display.toLowerCase() === 'hex') {
        decodedMessage = `0x${Array.prototype.map.call(messageBytes, (x) => (`00${x.toString(16)}`).slice(-2)).join('')}`;
      } else {
        decodedMessage = 'Unable to decode message';
      }

      const accepted = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Sign message'),
            text(`${origin} is requesting to sign the following message`),
            copyable(decodedMessage)
          ])
        }
      });

      assertConfirmation(accepted);

      const signature = nacl.sign.detached(messageBytes, keyPair.secretKey);

      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signature: bs58.encode(signature)
      };
    }
    default:
      throw {
        code: 4200,
        message: 'The requested method is not supported.'
      };
  }
};
