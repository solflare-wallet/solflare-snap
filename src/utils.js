export function assertInput(path) {
  if (!path) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertConfirmation(confirmed) {
  if (!confirmed) {
    throw {
      code: 4001,
      message: 'User rejected the request.'
    };
  }
}
