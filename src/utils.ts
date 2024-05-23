export function assertInput(path: any): asserts path {
  if (!path) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertAllStrings(input: any): asserts input is string[] {
  if (!Array.isArray(input) || !input.every((item) => typeof item === 'string')) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertIsArray(input: any): asserts input is any[] {
  if (!Array.isArray(input)) {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertIsString(input: any): asserts input is string {
  if (typeof input !== 'string') {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertIsBoolean(input: any): asserts input is boolean {
  if (typeof input !== 'boolean') {
    throw {
      code: -32000,
      message: 'Invalid input.'
    };
  }
}

export function assertConfirmation(confirmed: any): asserts confirmed is true {
  if (!confirmed) {
    throw {
      code: 4001,
      message: 'User rejected the request.'
    };
  }
}
