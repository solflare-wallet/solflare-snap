import { panel, heading, text, copyable, divider, DialogResult } from '@metamask/snaps-sdk';

export async function renderGetPublicKey(host: string, pubkey: string): Promise<DialogResult> {
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

export async function renderSignTransaction(host: string, message: string): Promise<DialogResult> {
  return snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        heading('Sign transaction'),
        text(host),
        divider(),
        copyable(message)
      ])
    }
  });
}

export async function renderSignAllTransactions(host: string, messages: string[]): Promise<DialogResult> {
  if (messages.length === 1) {
    return renderSignTransaction(host, messages[0]);
  }

  const uiElements: any[] = [];

  for (let i = 0; i < messages.length; i++) {
    uiElements.push(divider());
    uiElements.push(text(`Transaction ${i + 1}`));
    uiElements.push(copyable(messages[i]));
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

export async function renderSignMessage(host: string, message: string): Promise<DialogResult> {
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
