import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { panel, heading, text, copyable, divider } from '@metamask/snaps-ui';
import { deriveKeyPair } from './privateKey';
import { assertInput, assertConfirmation } from './utils';

module.exports.onRpcRequest = async ({ origin, request }) => {
  // if (
  //   !origin ||
  //   (
  //     !origin.match(/^https?:\/\/localhost:[0-9]{1,4}$/) &&
  //     !origin.match(/^https?:\/\/(?:\S+\.)?solflare.com$/) &&
  //     !origin.match(/^https?:\/\/(?:\S+\.)?solflare.dev$/)
  //   )
  // ) {
  //   throw new Error('Invalid origin');
  // }

  const dappOrigin = request?.params?.origin || origin;
  const dappHost = (new URL(dappOrigin))?.host;

  switch (request.method) {
    case 'getPublicKey': {
      const { derivationPath, confirm = false } = request.params || {};

      assertInput(derivationPath);

      const keyPair = await deriveKeyPair(derivationPath);
      const pubkey = bs58.encode(keyPair.publicKey);

      if (confirm) {
        const accepted = await snap.request({
          method: 'snap_dialog',
          params: {
            type: 'confirmation',
            content: panel([
              heading('Confirm access'),
              text(dappHost),
              divider(),
              text(pubkey)
            ])
          }
        });

        assertConfirmation(accepted);
      }

      return pubkey;
    }
    case 'signTransaction': {
      const { derivationPath, message, simulationResult } = request.params || {};

      assertInput(derivationPath);
      assertInput(message);

      const simulationResultItems = Array.isArray(simulationResult) ? simulationResult.map((item) => text(item)) : [];

      const accepted = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Sign transaction'),
            text(dappHost),
            divider(),
            ...simulationResultItems,
            copyable(message)
          ])
        }
      });

      assertConfirmation(accepted);

      const keyPair = await deriveKeyPair(derivationPath);
      const signature = nacl.sign.detached(bs58.decode(message), keyPair.secretKey);
      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signature: bs58.encode(signature)
      };
    }
    case 'signAllTransactions': {
      const { derivationPath, messages, simulationResults } = request.params || {};

      assertInput(derivationPath);
      assertInput(messages);
      assertInput(messages.length);

      const keyPair = await deriveKeyPair(derivationPath);

      const uiElements = [];

      for (let i = 0; i < messages?.length; i++) {
        uiElements.push(divider());
        uiElements.push(text(`Transaction ${i + 1}`));
        if (Array.isArray(simulationResults?.[i])) {
          simulationResults[i].forEach((item) => uiElements.push(text(item)));
        }
        uiElements.push(copyable(messages?.[i]));
      }

      const accepted = await snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            heading('Sign transactions'),
            text(dappHost),
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
      const { derivationPath, message, display = 'utf8' } = request.params || {};

      assertInput(derivationPath);
      assertInput(message);

      const keyPair = await deriveKeyPair(derivationPath);

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
            text(dappHost),
            divider(),
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
