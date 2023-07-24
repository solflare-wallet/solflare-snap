export function assertInput(path) {
  if (!path) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertAllStrings(input) {
  if (!Array.isArray(input) || !input.every((item) => typeof item === 'string')) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertIsArray(input) {
  if (!Array.isArray(input)) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertIsString(input) {
  if (typeof input !== 'string') {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertIsBoolean(input) {
  if (typeof input !== 'boolean') {
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
