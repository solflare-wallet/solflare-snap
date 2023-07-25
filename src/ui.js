import { panel, heading, text, copyable, divider } from '@metamask/snaps-ui';
import { assertAllStrings, assertInput, assertIsArray } from './utils';

export function renderGetPublicKey(host, pubkey) {
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Confirm access'),
        text(host),
        divider(),
        text(pubkey)
      ])
    }
  });
}

export function renderSignTransaction(host, message, simulationResult, displayMessage = true) {
  const simulationResultItems = simulationResult.map((item) => text(item));

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Sign transaction'),
        text(host),
        ...(simulationResultItems.length > 0 || displayMessage ? [divider()] : []),
        ...simulationResultItems,
        ...(displayMessage ? [copyable(message)] : [])
      ])
    }
  });
}

export function renderSignAllTransactions(host, messages, simulationResults, displayMessage = true) {
  if (messages.length === 1) {
    return renderSignTransaction(host, messages[0], simulationResults[0], displayMessage);
  }

  const uiElements = [];

  for (let i = 0; i < messages.length; i++) {
    uiElements.push(divider());
    uiElements.push(text(`Transaction ${i + 1}`));

    assertIsArray(simulationResults[i]);
    assertInput(simulationResults[i].length);
    assertAllStrings(simulationResults[i]);

    simulationResults[i].forEach((item) => uiElements.push(text(item)));
    if (displayMessage) {
      uiElements.push(copyable(messages[i]));
    }
  }

  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Sign transactions'),
        text(host),
        ...uiElements
      ])
    }
  });
}

export function renderSignMessage(host, message) {
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Sign message'),
        text(host),
        divider(),
        copyable(message)
      ])
    }
  });
}
