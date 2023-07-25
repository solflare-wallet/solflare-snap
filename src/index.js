import nacl from 'tweetnacl';
import bs58 from 'bs58';
import { deriveKeyPair } from './privateKey';
import { assertInput, assertConfirmation, assertAllStrings, assertIsString, assertIsBoolean, assertIsArray } from './utils';
import { renderGetPublicKey, renderSignTransaction, renderSignAllTransactions, renderSignMessage } from './ui';

module.exports.onRpcRequest = async ({ origin, request }) => {
  if (
    !origin ||
    (
      !origin.match(/^https?:\/\/localhost:[0-9]{1,4}$/) &&
      !origin.match(/^https?:\/\/(?:\S+\.)?solflare\.com$/) &&
      !origin.match(/^https?:\/\/(?:\S+\.)?solflare\.dev$/)
    )
  ) {
    throw new Error('Invalid origin');
  }

  const dappOrigin = request?.params?.origin || origin;
  const dappHost = (new URL(dappOrigin))?.host;

  switch (request.method) {
    case 'getPublicKey': {
      const { derivationPath, confirm = false } = request.params || {};

      assertInput(derivationPath);
      assertIsString(derivationPath);
      assertIsBoolean(confirm);

      const keyPair = await deriveKeyPair(derivationPath);
      const pubkey = bs58.encode(keyPair.publicKey);

      if (confirm) {
        const accepted = await renderGetPublicKey(dappHost, pubkey);
        assertConfirmation(accepted);
      }

      return pubkey;
    }
    case 'signTransaction': {
      const { derivationPath, message, simulationResult = [], displayMessage = true } = request.params || {};

      assertInput(derivationPath);
      assertIsString(derivationPath);
      assertInput(message);
      assertIsString(message);
      assertIsArray(simulationResult);
      assertAllStrings(simulationResult);
      assertIsBoolean(displayMessage);

      const accepted = await renderSignTransaction(dappHost, message, simulationResult, displayMessage);
      assertConfirmation(accepted);

      const keyPair = await deriveKeyPair(derivationPath);
      const signature = nacl.sign.detached(bs58.decode(message), keyPair.secretKey);

      return {
        publicKey: bs58.encode(keyPair.publicKey),
        signature: bs58.encode(signature)
      };
    }
    case 'signAllTransactions': {
      const { derivationPath, messages, simulationResults = [], displayMessage = true } = request.params || {};

      assertInput(derivationPath);
      assertIsString(derivationPath);
      assertInput(messages);
      assertIsArray(messages);
      assertInput(messages.length);
      assertAllStrings(messages);
      assertIsArray(simulationResults);
      assertInput(messages.length === simulationResults.length);
      assertIsBoolean(displayMessage);

      const accepted = await renderSignAllTransactions(dappHost, messages, simulationResults, displayMessage);
      assertConfirmation(accepted);

      const keyPair = await deriveKeyPair(derivationPath);
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
      assertIsString(derivationPath);
      assertInput(message);
      assertIsString(message);
      assertIsString(display);

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

      const accepted = await renderSignMessage(dappHost, decodedMessage);
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
