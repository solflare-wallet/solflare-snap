(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.snap = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
          "default": obj
        };
      }
      module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;
    }, {}],
    2: [function (require, module, exports) {
      "use strict";

      var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      var _BIP44CoinTypeNode_node;
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getBIP44AddressKeyDeriver = exports.deriveBIP44AddressKey = exports.BIP44CoinTypeNode = exports.BIP_44_COIN_TYPE_DEPTH = void 0;
      const BIP44Node_1 = require("./BIP44Node");
      const constants_1 = require("./constants");
      const SLIP10Node_1 = require("./SLIP10Node");
      const utils_1 = require("./utils");
      exports.BIP_44_COIN_TYPE_DEPTH = 2;
      class BIP44CoinTypeNode {
        constructor(node, coin_type) {
          _BIP44CoinTypeNode_node.set(this, void 0);
          __classPrivateFieldSet(this, _BIP44CoinTypeNode_node, node, "f");
          this.coin_type = coin_type;
          this.path = (0, utils_1.getBIP44CoinTypePathString)(coin_type);
          Object.freeze(this);
        }
        static async fromJSON(json, coin_type) {
          validateCoinType(coin_type);
          validateCoinTypeNodeDepth(json.depth);
          const node = await BIP44Node_1.BIP44Node.fromExtendedKey({
            depth: json.depth,
            index: json.index,
            parentFingerprint: json.parentFingerprint,
            chainCode: (0, utils_1.hexStringToBytes)(json.chainCode),
            privateKey: (0, utils_1.nullableHexStringToBytes)(json.privateKey),
            publicKey: (0, utils_1.hexStringToBytes)(json.publicKey)
          });
          return new BIP44CoinTypeNode(node, coin_type);
        }
        static async fromDerivationPath(derivationPath) {
          validateCoinTypeNodeDepth(derivationPath.length - 1);
          const node = await BIP44Node_1.BIP44Node.fromDerivationPath({
            derivationPath
          });
          const coinType = Number.parseInt(derivationPath[exports.BIP_44_COIN_TYPE_DEPTH].split(':')[1].replace(`'`, ''), 10);
          return new BIP44CoinTypeNode(node, coinType);
        }
        static async fromNode(node, coin_type) {
          if (!(node instanceof BIP44Node_1.BIP44Node)) {
            throw new Error('Invalid node: Expected an instance of BIP44Node.');
          }
          validateCoinType(coin_type);
          validateCoinTypeNodeDepth(node.depth);
          return Promise.resolve(new BIP44CoinTypeNode(node, coin_type));
        }
        get depth() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").depth;
        }
        get privateKeyBytes() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").privateKeyBytes;
        }
        get publicKeyBytes() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").publicKeyBytes;
        }
        get chainCodeBytes() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").chainCodeBytes;
        }
        get privateKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").privateKey;
        }
        get publicKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").publicKey;
        }
        get compressedPublicKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").compressedPublicKey;
        }
        get compressedPublicKeyBytes() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").compressedPublicKeyBytes;
        }
        get chainCode() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").chainCode;
        }
        get address() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").address;
        }
        get masterFingerprint() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").masterFingerprint;
        }
        get parentFingerprint() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").parentFingerprint;
        }
        get fingerprint() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").fingerprint;
        }
        get index() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").index;
        }
        get curve() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").curve;
        }
        get extendedKey() {
          return __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").extendedKey;
        }
        async deriveBIP44AddressKey({
          account = 0,
          change = 0,
          address_index
        }) {
          return await __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").derive((0, utils_1.getBIP44CoinTypeToAddressPathTuple)({
            account,
            change,
            address_index
          }));
        }
        toJSON() {
          return Object.assign(Object.assign({}, __classPrivateFieldGet(this, _BIP44CoinTypeNode_node, "f").toJSON()), {
            coin_type: this.coin_type,
            path: this.path
          });
        }
      }
      exports.BIP44CoinTypeNode = BIP44CoinTypeNode;
      _BIP44CoinTypeNode_node = new WeakMap();
      function validateCoinTypeNodeDepth(depth) {
        if (depth !== exports.BIP_44_COIN_TYPE_DEPTH) {
          throw new Error(`Invalid depth: Coin type nodes must be of depth ${exports.BIP_44_COIN_TYPE_DEPTH}. Received: "${depth}"`);
        }
      }
      function validateCoinType(coin_type) {
        if (typeof coin_type !== 'number' || !Number.isInteger(coin_type) || coin_type < 0) {
          throw new Error('Invalid coin type: The specified coin type must be a non-negative integer number.');
        }
      }
      async function deriveBIP44AddressKey(parentKeyOrNode, {
        account = 0,
        change = 0,
        address_index
      }) {
        const path = (0, utils_1.getBIP44CoinTypeToAddressPathTuple)({
          account,
          change,
          address_index
        });
        const node = await getNode(parentKeyOrNode);
        const childNode = await (0, SLIP10Node_1.deriveChildNode)({
          path,
          node
        });
        return new BIP44Node_1.BIP44Node(childNode);
      }
      exports.deriveBIP44AddressKey = deriveBIP44AddressKey;
      async function getBIP44AddressKeyDeriver(node, accountAndChangeIndices) {
        const {
          account = 0,
          change = 0
        } = accountAndChangeIndices !== null && accountAndChangeIndices !== void 0 ? accountAndChangeIndices : {};
        const actualNode = await getNode(node);
        const accountNode = (0, utils_1.getHardenedBIP32NodeToken)(account);
        const changeNode = (0, utils_1.getBIP32NodeToken)(change);
        const bip44AddressKeyDeriver = async (address_index, isHardened = false) => {
          const slip10Node = await (0, SLIP10Node_1.deriveChildNode)({
            path: [accountNode, changeNode, isHardened ? (0, utils_1.getHardenedBIP32NodeToken)(address_index) : (0, utils_1.getUnhardenedBIP32NodeToken)(address_index)],
            node: actualNode
          });
          return new BIP44Node_1.BIP44Node(slip10Node);
        };
        bip44AddressKeyDeriver.coin_type = actualNode.coin_type;
        bip44AddressKeyDeriver.path = (0, utils_1.getBIP44ChangePathString)(actualNode.path, {
          account,
          change
        });
        Object.freeze(bip44AddressKeyDeriver);
        return bip44AddressKeyDeriver;
      }
      exports.getBIP44AddressKeyDeriver = getBIP44AddressKeyDeriver;
      async function getNode(node) {
        if (node instanceof BIP44CoinTypeNode) {
          validateCoinTypeNodeDepth(node.depth);
          return node;
        }
        if (typeof node === 'string') {
          const bip44Node = await BIP44Node_1.BIP44Node.fromExtendedKey(node);
          const coinTypeNode = await BIP44CoinTypeNode.fromNode(bip44Node, bip44Node.index - constants_1.BIP_32_HARDENED_OFFSET);
          validateCoinTypeNodeDepth(coinTypeNode.depth);
          return coinTypeNode;
        }
        return BIP44CoinTypeNode.fromJSON(node, node.coin_type);
      }
    }, {
      "./BIP44Node": 3,
      "./SLIP10Node": 4,
      "./constants": 5,
      "./utils": 18
    }],
    3: [function (require, module, exports) {
      "use strict";

      var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      var _BIP44Node_node;
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.validateBIP44Depth = exports.BIP44Node = void 0;
      const utils_1 = require("@metamask/utils");
      const constants_1 = require("./constants");
      const extended_keys_1 = require("./extended-keys");
      const SLIP10Node_1 = require("./SLIP10Node");
      const utils_2 = require("./utils");
      class BIP44Node {
        constructor(node) {
          _BIP44Node_node.set(this, void 0);
          __classPrivateFieldSet(this, _BIP44Node_node, node, "f");
          Object.freeze(this);
        }
        static async fromJSON(json) {
          return BIP44Node.fromExtendedKey(json);
        }
        static async fromExtendedKey(options) {
          if (typeof options === 'string') {
            const extendedKey = (0, extended_keys_1.decodeExtendedKey)(options);
            const {
              chainCode,
              depth,
              parentFingerprint,
              index
            } = extendedKey;
            if (extendedKey.version === extended_keys_1.PRIVATE_KEY_VERSION) {
              const {
                privateKey
              } = extendedKey;
              return BIP44Node.fromExtendedKey({
                depth,
                parentFingerprint,
                index,
                privateKey,
                chainCode
              });
            }
            const {
              publicKey
            } = extendedKey;
            return BIP44Node.fromExtendedKey({
              depth,
              parentFingerprint,
              index,
              publicKey,
              chainCode
            });
          }
          const {
            privateKey,
            publicKey,
            chainCode,
            depth,
            parentFingerprint,
            index
          } = options;
          validateBIP44Depth(depth);
          const node = await SLIP10Node_1.SLIP10Node.fromExtendedKey({
            privateKey,
            publicKey,
            chainCode,
            depth,
            parentFingerprint,
            index,
            curve: 'secp256k1'
          });
          return new BIP44Node(node);
        }
        static async fromDerivationPath({
          derivationPath
        }) {
          validateBIP44Depth(derivationPath.length - 1);
          validateBIP44DerivationPath(derivationPath, constants_1.MIN_BIP_44_DEPTH);
          const node = await SLIP10Node_1.SLIP10Node.fromDerivationPath({
            derivationPath,
            curve: 'secp256k1'
          });
          return new BIP44Node(node);
        }
        get depth() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").depth;
        }
        get privateKeyBytes() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").privateKeyBytes;
        }
        get publicKeyBytes() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").publicKeyBytes;
        }
        get chainCodeBytes() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").chainCodeBytes;
        }
        get privateKey() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").privateKey;
        }
        get publicKey() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").publicKey;
        }
        get compressedPublicKey() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").compressedPublicKey;
        }
        get compressedPublicKeyBytes() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").compressedPublicKeyBytes;
        }
        get chainCode() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").chainCode;
        }
        get address() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").address;
        }
        get masterFingerprint() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").masterFingerprint;
        }
        get parentFingerprint() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").parentFingerprint;
        }
        get fingerprint() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").fingerprint;
        }
        get index() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").index;
        }
        get extendedKey() {
          const data = {
            depth: this.depth,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            chainCode: this.chainCodeBytes
          };
          if (this.privateKeyBytes) {
            return (0, extended_keys_1.encodeExtendedKey)(Object.assign(Object.assign({}, data), {
              version: extended_keys_1.PRIVATE_KEY_VERSION,
              privateKey: this.privateKeyBytes
            }));
          }
          return (0, extended_keys_1.encodeExtendedKey)(Object.assign(Object.assign({}, data), {
            version: extended_keys_1.PUBLIC_KEY_VERSION,
            publicKey: this.publicKeyBytes
          }));
        }
        get curve() {
          return __classPrivateFieldGet(this, _BIP44Node_node, "f").curve;
        }
        neuter() {
          const node = __classPrivateFieldGet(this, _BIP44Node_node, "f").neuter();
          return new BIP44Node(node);
        }
        async derive(path) {
          if (this.depth === constants_1.MAX_BIP_44_DEPTH) {
            throw new Error('Illegal operation: This HD tree node is already a leaf node.');
          }
          const newDepth = this.depth + path.length;
          validateBIP44Depth(newDepth);
          validateBIP44DerivationPath(path, this.depth + 1);
          const node = await __classPrivateFieldGet(this, _BIP44Node_node, "f").derive(path);
          return new BIP44Node(node);
        }
        toJSON() {
          return {
            depth: this.depth,
            masterFingerprint: this.masterFingerprint,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            chainCode: this.chainCode
          };
        }
      }
      exports.BIP44Node = BIP44Node;
      _BIP44Node_node = new WeakMap();
      function validateBIP44Depth(depth) {
        (0, SLIP10Node_1.validateBIP32Depth)(depth);
        if (depth < constants_1.MIN_BIP_44_DEPTH || depth > constants_1.MAX_BIP_44_DEPTH) {
          throw new Error(`Invalid HD tree path depth: The depth must be a positive integer N such that 0 <= N <= 5. Received: "${depth}"`);
        }
      }
      exports.validateBIP44Depth = validateBIP44Depth;
      function validateBIP44DerivationPath(path, startingDepth) {
        path.forEach((nodeToken, index) => {
          const currentDepth = startingDepth + index;
          if (currentDepth === constants_1.MIN_BIP_44_DEPTH) {
            if (!(nodeToken instanceof Uint8Array) && !constants_1.BIP_39_PATH_REGEX.test(nodeToken)) {
              throw new Error('Invalid derivation path: The "m" / seed node (depth 0) must be a BIP-39 node.');
            }
            return;
          }
          (0, utils_1.assert)(typeof nodeToken === 'string');
          switch (currentDepth) {
            case 1:
              if (nodeToken !== constants_1.BIP44PurposeNodeToken) {
                throw new Error(`Invalid derivation path: The "purpose" node (depth 1) must be the string "${constants_1.BIP44PurposeNodeToken}".`);
              }
              break;
            case 2:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken) || !(0, utils_2.isHardened)(nodeToken)) {
                throw new Error('Invalid derivation path: The "coin_type" node (depth 2) must be a hardened BIP-32 node.');
              }
              break;
            case 3:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken) || !(0, utils_2.isHardened)(nodeToken)) {
                throw new Error('Invalid derivation path: The "account" node (depth 3) must be a hardened BIP-32 node.');
              }
              break;
            case 4:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken)) {
                throw new Error('Invalid derivation path: The "change" node (depth 4) must be a BIP-32 node.');
              }
              break;
            case constants_1.MAX_BIP_44_DEPTH:
              if (!constants_1.BIP_32_PATH_REGEX.test(nodeToken)) {
                throw new Error('Invalid derivation path: The "address_index" node (depth 5) must be a BIP-32 node.');
              }
              break;
          }
        });
      }
    }, {
      "./SLIP10Node": 4,
      "./constants": 5,
      "./extended-keys": 16,
      "./utils": 18,
      "@metamask/utils": 59
    }],
    4: [function (require, module, exports) {
      "use strict";

      var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      var _a, _SLIP10Node_constructorGuard;
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.deriveChildNode = exports.validateRootIndex = exports.validateMasterParentFingerprint = exports.validateParentFingerprint = exports.validateBIP32Depth = exports.SLIP10Node = void 0;
      const utils_1 = require("@metamask/utils");
      const constants_1 = require("./constants");
      const curves_1 = require("./curves");
      const derivation_1 = require("./derivation");
      const bip32_1 = require("./derivers/bip32");
      const utils_2 = require("./utils");
      class SLIP10Node {
        constructor({
          depth,
          masterFingerprint,
          parentFingerprint,
          index,
          chainCode,
          privateKey,
          publicKey,
          curve
        }, constructorGuard) {
          (0, utils_1.assert)(constructorGuard === __classPrivateFieldGet(SLIP10Node, _a, "f", _SLIP10Node_constructorGuard), 'SLIP10Node can only be constructed using `SLIP10Node.fromJSON`, `SLIP10Node.fromExtendedKey`, or `SLIP10Node.fromDerivationPath`.');
          this.depth = depth;
          this.masterFingerprint = masterFingerprint;
          this.parentFingerprint = parentFingerprint;
          this.index = index;
          this.chainCodeBytes = chainCode;
          this.privateKeyBytes = privateKey;
          this.publicKeyBytes = publicKey;
          this.curve = curve;
          Object.freeze(this);
        }
        static async fromJSON(json) {
          return SLIP10Node.fromExtendedKey(json);
        }
        static async fromExtendedKey({
          depth,
          masterFingerprint,
          parentFingerprint,
          index,
          privateKey,
          publicKey,
          chainCode,
          curve
        }) {
          const chainCodeBytes = (0, utils_2.getBytes)(chainCode, constants_1.BYTES_KEY_LENGTH);
          (0, utils_2.validateCurve)(curve);
          validateBIP32Depth(depth);
          (0, utils_2.validateBIP32Index)(index);
          validateRootIndex(index, depth);
          validateParentFingerprint(parentFingerprint, depth);
          validateMasterParentFingerprint(masterFingerprint, parentFingerprint, depth);
          const curveObject = (0, curves_1.getCurveByName)(curve);
          if (privateKey) {
            const privateKeyBytes = (0, utils_2.getBytesUnsafe)(privateKey, constants_1.BYTES_KEY_LENGTH);
            (0, utils_1.assert)(curveObject.isValidPrivateKey(privateKeyBytes), `Invalid private key: Value is not a valid ${curve} private key.`);
            return new SLIP10Node({
              depth,
              masterFingerprint,
              parentFingerprint,
              index,
              chainCode: chainCodeBytes,
              privateKey: privateKeyBytes,
              publicKey: await curveObject.getPublicKey(privateKeyBytes),
              curve
            }, __classPrivateFieldGet(this, _a, "f", _SLIP10Node_constructorGuard));
          }
          if (publicKey) {
            const publicKeyBytes = (0, utils_2.getBytes)(publicKey, curveObject.publicKeyLength);
            return new SLIP10Node({
              depth,
              masterFingerprint,
              parentFingerprint,
              index,
              chainCode: chainCodeBytes,
              publicKey: publicKeyBytes,
              curve
            }, __classPrivateFieldGet(this, _a, "f", _SLIP10Node_constructorGuard));
          }
          throw new Error('Invalid options: Must provide either a private key or a public key.');
        }
        static async fromDerivationPath({
          derivationPath,
          curve
        }) {
          (0, utils_2.validateCurve)(curve);
          if (!derivationPath) {
            throw new Error('Invalid options: Must provide a derivation path.');
          }
          if (derivationPath.length === 0) {
            throw new Error('Invalid derivation path: May not specify an empty derivation path.');
          }
          return await (0, derivation_1.deriveKeyFromPath)({
            path: derivationPath,
            depth: derivationPath.length - 1,
            curve
          });
        }
        get chainCode() {
          return (0, utils_1.bytesToHex)(this.chainCodeBytes);
        }
        get privateKey() {
          if (this.privateKeyBytes) {
            return (0, utils_1.bytesToHex)(this.privateKeyBytes);
          }
          return undefined;
        }
        get publicKey() {
          return (0, utils_1.bytesToHex)(this.publicKeyBytes);
        }
        get compressedPublicKeyBytes() {
          return (0, curves_1.getCurveByName)(this.curve).compressPublicKey(this.publicKeyBytes);
        }
        get compressedPublicKey() {
          return (0, utils_1.bytesToHex)(this.compressedPublicKeyBytes);
        }
        get address() {
          if (this.curve !== 'secp256k1') {
            throw new Error('Unable to get address for this node: Only secp256k1 is supported.');
          }
          return (0, utils_1.bytesToHex)((0, bip32_1.publicKeyToEthAddress)(this.publicKeyBytes));
        }
        get fingerprint() {
          return (0, utils_2.getFingerprint)(this.compressedPublicKeyBytes);
        }
        neuter() {
          return new SLIP10Node({
            depth: this.depth,
            masterFingerprint: this.masterFingerprint,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            chainCode: this.chainCodeBytes,
            publicKey: this.publicKeyBytes,
            curve: this.curve
          }, __classPrivateFieldGet(SLIP10Node, _a, "f", _SLIP10Node_constructorGuard));
        }
        async derive(path) {
          return await deriveChildNode({
            path,
            node: this
          });
        }
        toJSON() {
          return {
            depth: this.depth,
            masterFingerprint: this.masterFingerprint,
            parentFingerprint: this.parentFingerprint,
            index: this.index,
            curve: this.curve,
            privateKey: this.privateKey,
            publicKey: this.publicKey,
            chainCode: this.chainCode
          };
        }
      }
      exports.SLIP10Node = SLIP10Node;
      _a = SLIP10Node;
      _SLIP10Node_constructorGuard = {
        value: Symbol('SLIP10Node.constructor')
      };
      function validateBIP32Depth(depth) {
        if (!(0, utils_2.isValidInteger)(depth)) {
          throw new Error(`Invalid HD tree path depth: The depth must be a positive integer. Received: "${String(depth)}".`);
        }
      }
      exports.validateBIP32Depth = validateBIP32Depth;
      function validateParentFingerprint(parentFingerprint, depth) {
        if (!(0, utils_2.isValidInteger)(parentFingerprint)) {
          throw new Error(`Invalid parent fingerprint: The fingerprint must be a positive integer. Received: "${String(parentFingerprint)}".`);
        }
        if (depth === 0 && parentFingerprint !== 0) {
          throw new Error(`Invalid parent fingerprint: The fingerprint of the root node must be 0. Received: "${String(parentFingerprint)}".`);
        }
        if (depth > 0 && parentFingerprint === 0) {
          throw new Error(`Invalid parent fingerprint: The fingerprint of a child node must not be 0. Received: "${String(parentFingerprint)}".`);
        }
      }
      exports.validateParentFingerprint = validateParentFingerprint;
      function validateMasterParentFingerprint(masterFingerprint, parentFingerprint, depth) {
        if (!masterFingerprint) {
          return;
        }
        if (depth >= 2 && masterFingerprint === parentFingerprint) {
          throw new Error(`Invalid parent fingerprint: The fingerprint of a child node cannot be equal to the master fingerprint. Received: "${String(parentFingerprint)}".`);
        }
      }
      exports.validateMasterParentFingerprint = validateMasterParentFingerprint;
      function validateRootIndex(index, depth) {
        if (depth === 0 && index !== 0) {
          throw new Error(`Invalid index: The index of the root node must be 0. Received: "${String(index)}".`);
        }
      }
      exports.validateRootIndex = validateRootIndex;
      async function deriveChildNode({
        path,
        node
      }) {
        if (path.length === 0) {
          throw new Error('Invalid HD tree derivation path: Deriving a path of length 0 is not defined.');
        }
        const newDepth = node.depth + path.length;
        validateBIP32Depth(newDepth);
        return await (0, derivation_1.deriveKeyFromPath)({
          path,
          node,
          depth: newDepth
        });
      }
      exports.deriveChildNode = deriveChildNode;
    }, {
      "./constants": 5,
      "./curves": 8,
      "./derivation": 10,
      "./derivers/bip32": 11,
      "./utils": 18,
      "@metamask/utils": 59
    }],
    5: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.BIP_32_HARDENED_OFFSET = exports.BIP_39_PATH_REGEX = exports.SLIP_10_PATH_REGEX = exports.BIP_32_PATH_REGEX = exports.UNPREFIXED_PATH_REGEX = exports.BIP44PurposeNodeToken = exports.MAX_BIP_32_INDEX = exports.MAX_BIP_44_DEPTH = exports.MIN_BIP_44_DEPTH = exports.BYTES_KEY_LENGTH = void 0;
      exports.BYTES_KEY_LENGTH = 32;
      exports.MIN_BIP_44_DEPTH = 0;
      exports.MAX_BIP_44_DEPTH = 5;
      exports.MAX_BIP_32_INDEX = 0xffffffff;
      exports.BIP44PurposeNodeToken = `bip32:44'`;
      exports.UNPREFIXED_PATH_REGEX = /^\d+$/u;
      exports.BIP_32_PATH_REGEX = /^bip32:\d+'?$/u;
      exports.SLIP_10_PATH_REGEX = /^slip10:\d+'?$/u;
      exports.BIP_39_PATH_REGEX = /^bip39:([a-z]+){1}( [a-z]+){11,23}$/u;
      exports.BIP_32_HARDENED_OFFSET = 0x80000000;
    }, {}],
    6: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.mod = exports.getCurveByName = exports.curves = void 0;
      const secp256k1_1 = require("@noble/secp256k1");
      const ed25519 = __importStar(require("./ed25519"));
      const secp256k1 = __importStar(require("./secp256k1"));
      exports.curves = {
        secp256k1,
        ed25519
      };
      function getCurveByName(curveName) {
        return exports.curves[curveName];
      }
      exports.getCurveByName = getCurveByName;
      exports.mod = secp256k1_1.utils.mod;
    }, {
      "./ed25519": 7,
      "./secp256k1": 9,
      "@noble/secp256k1": 78
    }],
    7: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.decompressPublicKey = exports.compressPublicKey = exports.publicAdd = exports.getPublicKey = exports.publicKeyLength = exports.deriveUnhardenedKeys = exports.isValidPrivateKey = exports.secret = exports.name = exports.curve = void 0;
      const utils_1 = require("@metamask/utils");
      const ed25519_1 = require("@noble/ed25519");
      var ed25519_2 = require("@noble/ed25519");
      Object.defineProperty(exports, "curve", {
        enumerable: true,
        get: function () {
          return ed25519_2.CURVE;
        }
      });
      exports.name = 'ed25519';
      exports.secret = (0, utils_1.stringToBytes)('ed25519 seed');
      const isValidPrivateKey = _privateKey => true;
      exports.isValidPrivateKey = isValidPrivateKey;
      exports.deriveUnhardenedKeys = false;
      exports.publicKeyLength = 33;
      const getPublicKey = async (privateKey, _compressed) => {
        const publicKey = await (0, ed25519_1.getPublicKey)(privateKey);
        return (0, utils_1.concatBytes)([new Uint8Array([0]), publicKey]);
      };
      exports.getPublicKey = getPublicKey;
      const publicAdd = (_publicKey, _tweak) => {
        throw new Error('Ed25519 does not support public key derivation.');
      };
      exports.publicAdd = publicAdd;
      const compressPublicKey = publicKey => {
        return publicKey;
      };
      exports.compressPublicKey = compressPublicKey;
      const decompressPublicKey = publicKey => {
        return publicKey;
      };
      exports.decompressPublicKey = decompressPublicKey;
    }, {
      "@metamask/utils": 59,
      "@noble/ed25519": 67
    }],
    8: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ed25519 = exports.secp256k1 = void 0;
      __exportStar(require("./curve"), exports);
      exports.secp256k1 = __importStar(require("./secp256k1"));
      exports.ed25519 = __importStar(require("./ed25519"));
    }, {
      "./curve": 6,
      "./ed25519": 7,
      "./secp256k1": 9
    }],
    9: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.decompressPublicKey = exports.compressPublicKey = exports.publicAdd = exports.getPublicKey = exports.isValidPrivateKey = exports.publicKeyLength = exports.deriveUnhardenedKeys = exports.secret = exports.name = exports.curve = void 0;
      const utils_1 = require("@metamask/utils");
      const secp256k1_1 = require("@noble/secp256k1");
      const utils_2 = require("../utils");
      var secp256k1_2 = require("@noble/secp256k1");
      Object.defineProperty(exports, "curve", {
        enumerable: true,
        get: function () {
          return secp256k1_2.CURVE;
        }
      });
      exports.name = 'secp256k1';
      exports.secret = (0, utils_1.stringToBytes)('Bitcoin seed');
      exports.deriveUnhardenedKeys = true;
      exports.publicKeyLength = 65;
      const isValidPrivateKey = privateKey => {
        return secp256k1_1.utils.isValidPrivateKey(privateKey);
      };
      exports.isValidPrivateKey = isValidPrivateKey;
      const getPublicKey = (privateKey, compressed) => (0, secp256k1_1.getPublicKey)(privateKey, compressed);
      exports.getPublicKey = getPublicKey;
      const publicAdd = (publicKey, tweak) => {
        (0, utils_1.assert)((0, utils_2.isValidBytesKey)(tweak, 32), 'Invalid tweak: Tweak must be a non-zero 32-byte Uint8Array.');
        const point = secp256k1_1.Point.fromHex(publicKey);
        const newPoint = point.add(secp256k1_1.Point.fromPrivateKey(tweak));
        newPoint.assertValidity();
        return newPoint.toRawBytes(false);
      };
      exports.publicAdd = publicAdd;
      const compressPublicKey = publicKey => {
        const point = secp256k1_1.Point.fromHex(publicKey);
        return point.toRawBytes(true);
      };
      exports.compressPublicKey = compressPublicKey;
      const decompressPublicKey = publicKey => {
        const point = secp256k1_1.Point.fromHex(publicKey);
        return point.toRawBytes(false);
      };
      exports.decompressPublicKey = decompressPublicKey;
    }, {
      "../utils": 18,
      "@metamask/utils": 59,
      "@noble/secp256k1": 78
    }],
    10: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.validatePathSegment = exports.deriveKeyFromPath = void 0;
      const utils_1 = require("@metamask/utils");
      const BIP44CoinTypeNode_1 = require("./BIP44CoinTypeNode");
      const BIP44Node_1 = require("./BIP44Node");
      const constants_1 = require("./constants");
      const curves_1 = require("./curves");
      const derivers_1 = require("./derivers");
      const SLIP10Node_1 = require("./SLIP10Node");
      async function deriveKeyFromPath(args) {
        const {
          path,
          depth = path.length
        } = args;
        const node = 'node' in args ? args.node : undefined;
        const curve = 'curve' in args ? args.curve : node === null || node === void 0 ? void 0 : node.curve;
        if (node && !(node instanceof SLIP10Node_1.SLIP10Node) && !(node instanceof BIP44Node_1.BIP44Node) && !(node instanceof BIP44CoinTypeNode_1.BIP44CoinTypeNode)) {
          throw new Error('Invalid arguments: Node must be a SLIP-10 node or a BIP-44 node when provided.');
        }
        if (!curve) {
          throw new Error('Invalid arguments: Must specify either a parent node or curve.');
        }
        validatePathSegment(path, Boolean(node === null || node === void 0 ? void 0 : node.privateKey) || Boolean(node === null || node === void 0 ? void 0 : node.publicKey), depth);
        return await path.reduce(async (promise, pathNode, index) => {
          const derivedNode = await promise;
          if (typeof pathNode === 'string') {
            const [pathType, pathPart] = pathNode.split(':');
            (0, utils_1.assert)(hasDeriver(pathType), `Unknown derivation type: "${pathType}".`);
            const deriver = derivers_1.derivers[pathType];
            return await deriver.deriveChildKey({
              path: pathPart,
              node: derivedNode,
              curve: (0, curves_1.getCurveByName)(curve)
            });
          }
          (0, utils_1.assert)(index === 0, getMalformedError());
          return await derivers_1.derivers.bip39.deriveChildKey({
            path: pathNode,
            node: derivedNode,
            curve: (0, curves_1.getCurveByName)(curve)
          });
        }, Promise.resolve(node));
      }
      exports.deriveKeyFromPath = deriveKeyFromPath;
      function hasDeriver(pathType) {
        return pathType in derivers_1.derivers;
      }
      function validatePathSegment(path, hasKey, depth) {
        if (path.length === 0) {
          throw new Error(`Invalid HD path segment: The segment must not be empty.`);
        }
        let startsWithBip39 = false;
        path.forEach((node, index) => {
          if (index === 0) {
            startsWithBip39 = node instanceof Uint8Array || constants_1.BIP_39_PATH_REGEX.test(node);
            if (!(node instanceof Uint8Array) && !startsWithBip39 && !constants_1.BIP_32_PATH_REGEX.test(node) && !constants_1.SLIP_10_PATH_REGEX.test(node)) {
              throw getMalformedError();
            }
          } else if (node instanceof Uint8Array || !constants_1.BIP_32_PATH_REGEX.test(node) && !constants_1.SLIP_10_PATH_REGEX.test(node)) {
            throw getMalformedError();
          }
        });
        if (depth === constants_1.MIN_BIP_44_DEPTH && (!startsWithBip39 || path.length !== 1)) {
          throw new Error(`Invalid HD path segment: The segment must consist of a single BIP-39 node for depths of ${constants_1.MIN_BIP_44_DEPTH}. Received: "${String(path)}".`);
        }
        if (!hasKey && !startsWithBip39) {
          throw new Error('Invalid derivation parameters: Must specify parent key if the first node of the path segment is not a BIP-39 node.');
        }
        if (hasKey && startsWithBip39) {
          throw new Error('Invalid derivation parameters: May not specify parent key if the path segment starts with a BIP-39 node.');
        }
        const pathWithoutKey = startsWithBip39 ? path.slice(1) : path;
        if (pathWithoutKey.length > 0) {
          const firstSegmentType = pathWithoutKey[0].split(':')[0];
          (0, utils_1.assert)(pathWithoutKey.every(segment => segment.startsWith(`${firstSegmentType}:`)), `Invalid HD path segment: Cannot mix 'bip32' and 'slip10' path segments.`);
        }
      }
      exports.validatePathSegment = validatePathSegment;
      function getMalformedError() {
        return new Error('Invalid HD path segment: The path segment is malformed.');
      }
    }, {
      "./BIP44CoinTypeNode": 2,
      "./BIP44Node": 3,
      "./SLIP10Node": 4,
      "./constants": 5,
      "./curves": 8,
      "./derivers": 13,
      "@metamask/utils": 59
    }],
    11: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.deriveChildKey = exports.publicKeyToEthAddress = exports.privateKeyToEthAddress = void 0;
      const utils_1 = require("@metamask/utils");
      const sha3_1 = require("@noble/hashes/sha3");
      const constants_1 = require("../constants");
      const curves_1 = require("../curves");
      const utils_2 = require("../utils");
      const shared_1 = require("./shared");
      function privateKeyToEthAddress(key) {
        (0, utils_1.assert)(key instanceof Uint8Array && (0, utils_2.isValidBytesKey)(key, constants_1.BYTES_KEY_LENGTH), 'Invalid key: The key must be a 32-byte, non-zero Uint8Array.');
        const publicKey = curves_1.secp256k1.getPublicKey(key, false);
        return publicKeyToEthAddress(publicKey);
      }
      exports.privateKeyToEthAddress = privateKeyToEthAddress;
      function publicKeyToEthAddress(key) {
        (0, utils_1.assert)(key instanceof Uint8Array && (0, utils_2.isValidBytesKey)(key, curves_1.secp256k1.publicKeyLength), 'Invalid key: The key must be a 65-byte, non-zero Uint8Array.');
        return (0, sha3_1.keccak_256)(key.slice(1)).slice(-20);
      }
      exports.publicKeyToEthAddress = publicKeyToEthAddress;
      async function deriveChildKey(options) {
        (0, utils_1.assert)(options.curve.name === 'secp256k1', 'Invalid curve: Only secp256k1 is supported by BIP-32.');
        return (0, shared_1.deriveChildKey)(options, handleError);
      }
      exports.deriveChildKey = deriveChildKey;
      async function handleError(_, options) {
        const {
          childIndex,
          privateKey,
          publicKey,
          isHardened,
          curve,
          chainCode
        } = options;
        (0, utils_2.validateBIP32Index)(childIndex + 1);
        if (privateKey) {
          const secretExtension = await (0, shared_1.deriveSecretExtension)({
            privateKey,
            childIndex: childIndex + 1,
            isHardened,
            curve
          });
          const newEntropy = (0, shared_1.generateEntropy)({
            chainCode,
            extension: secretExtension
          });
          return Object.assign(Object.assign({}, options), {
            childIndex: childIndex + 1,
            entropy: newEntropy
          });
        }
        const publicExtension = (0, shared_1.derivePublicExtension)({
          parentPublicKey: publicKey,
          childIndex: childIndex + 1
        });
        const newEntropy = (0, shared_1.generateEntropy)({
          chainCode,
          extension: publicExtension
        });
        return Object.assign(Object.assign({}, options), {
          childIndex: childIndex + 1,
          entropy: newEntropy
        });
      }
    }, {
      "../constants": 5,
      "../curves": 8,
      "../utils": 18,
      "./shared": 14,
      "@metamask/utils": 59,
      "@noble/hashes/sha3": 75
    }],
    12: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.createBip39KeyFromSeed = exports.deriveChildKey = exports.bip39MnemonicToMultipath = void 0;
      const scure_bip39_1 = require("@metamask/scure-bip39");
      const english_1 = require("@metamask/scure-bip39/dist/wordlists/english");
      const utils_1 = require("@metamask/utils");
      const hmac_1 = require("@noble/hashes/hmac");
      const sha512_1 = require("@noble/hashes/sha512");
      const constants_1 = require("../constants");
      const SLIP10Node_1 = require("../SLIP10Node");
      const utils_2 = require("../utils");
      function bip39MnemonicToMultipath(mnemonic) {
        return `bip39:${mnemonic.toLowerCase().trim()}`;
      }
      exports.bip39MnemonicToMultipath = bip39MnemonicToMultipath;
      async function deriveChildKey({
        path,
        curve
      }) {
        return createBip39KeyFromSeed(await (0, scure_bip39_1.mnemonicToSeed)(path, english_1.wordlist), curve);
      }
      exports.deriveChildKey = deriveChildKey;
      async function createBip39KeyFromSeed(seed, curve) {
        (0, utils_1.assert)(seed.length >= 16 && seed.length <= 64, 'Invalid seed: The seed must be between 16 and 64 bytes long.');
        const key = (0, hmac_1.hmac)(sha512_1.sha512, curve.secret, seed);
        const privateKey = key.slice(0, constants_1.BYTES_KEY_LENGTH);
        const chainCode = key.slice(constants_1.BYTES_KEY_LENGTH);
        (0, utils_1.assert)(curve.isValidPrivateKey(privateKey), 'Invalid private key: The private key must greater than 0 and less than the curve order.');
        const masterFingerprint = (0, utils_2.getFingerprint)(await curve.getPublicKey(privateKey, true));
        return SLIP10Node_1.SLIP10Node.fromExtendedKey({
          privateKey,
          chainCode,
          masterFingerprint,
          depth: 0,
          parentFingerprint: 0,
          index: 0,
          curve: curve.name
        });
      }
      exports.createBip39KeyFromSeed = createBip39KeyFromSeed;
    }, {
      "../SLIP10Node": 4,
      "../constants": 5,
      "../utils": 18,
      "@metamask/scure-bip39": 19,
      "@metamask/scure-bip39/dist/wordlists/english": 20,
      "@metamask/utils": 59,
      "@noble/hashes/hmac": 72,
      "@noble/hashes/sha512": 76
    }],
    13: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
        Object.defineProperty(o, "default", {
          enumerable: true,
          value: v
        });
      } : function (o, v) {
        o["default"] = v;
      });
      var __importStar = this && this.__importStar || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.derivers = void 0;
      const bip32 = __importStar(require("./bip32"));
      const bip39 = __importStar(require("./bip39"));
      const slip10 = __importStar(require("./slip10"));
      exports.derivers = {
        bip32,
        bip39,
        slip10
      };
    }, {
      "./bip32": 11,
      "./bip39": 12,
      "./slip10": 15
    }],
    14: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.validateNode = exports.generateEntropy = exports.privateAdd = exports.derivePublicChildKey = exports.derivePublicExtension = exports.deriveSecretExtension = exports.deriveChildKey = void 0;
      const utils_1 = require("@metamask/utils");
      const hmac_1 = require("@noble/hashes/hmac");
      const sha512_1 = require("@noble/hashes/sha512");
      const constants_1 = require("../constants");
      const curves_1 = require("../curves");
      const SLIP10Node_1 = require("../SLIP10Node");
      const utils_2 = require("../utils");
      async function deriveChildKey({
        path,
        node,
        curve
      }, handleError) {
        validateNode(node);
        const {
          childIndex,
          isHardened
        } = getValidatedPath(path, node, curve);
        const args = {
          chainCode: node.chainCodeBytes,
          childIndex,
          isHardened,
          depth: node.depth,
          parentFingerprint: node.fingerprint,
          masterFingerprint: node.masterFingerprint,
          curve
        };
        if (node.privateKeyBytes) {
          const secretExtension = await deriveSecretExtension({
            privateKey: node.privateKeyBytes,
            childIndex,
            isHardened,
            curve
          });
          const entropy = generateEntropy({
            chainCode: node.chainCodeBytes,
            extension: secretExtension
          });
          return await deriveNode(Object.assign({
            privateKey: node.privateKeyBytes,
            entropy
          }, args), handleError);
        }
        const publicExtension = derivePublicExtension({
          parentPublicKey: node.compressedPublicKeyBytes,
          childIndex
        });
        const entropy = generateEntropy({
          chainCode: node.chainCodeBytes,
          extension: publicExtension
        });
        return await deriveNode(Object.assign({
          publicKey: node.compressedPublicKeyBytes,
          entropy
        }, args), handleError);
      }
      exports.deriveChildKey = deriveChildKey;
      async function deriveNode(options, handleError) {
        const {
          privateKey,
          publicKey,
          entropy,
          childIndex,
          isHardened,
          depth,
          parentFingerprint,
          masterFingerprint,
          curve
        } = options;
        try {
          if (privateKey) {
            return await derivePrivateChildKey({
              entropy,
              privateKey,
              depth,
              masterFingerprint,
              parentFingerprint,
              childIndex,
              isHardened,
              curve
            });
          }
          return await derivePublicChildKey({
            entropy,
            publicKey,
            depth,
            masterFingerprint,
            parentFingerprint,
            childIndex,
            curve
          });
        } catch (error) {
          return await deriveNode(await handleError(error, options), handleError);
        }
      }
      async function deriveSecretExtension({
        privateKey,
        childIndex,
        isHardened,
        curve
      }) {
        if (isHardened) {
          return (0, utils_1.concatBytes)([new Uint8Array([0]), privateKey, (0, utils_2.numberToUint32)(childIndex + constants_1.BIP_32_HARDENED_OFFSET)]);
        }
        const parentPublicKey = await curve.getPublicKey(privateKey, true);
        return derivePublicExtension({
          parentPublicKey,
          childIndex
        });
      }
      exports.deriveSecretExtension = deriveSecretExtension;
      function derivePublicExtension({
        parentPublicKey,
        childIndex
      }) {
        return (0, utils_1.concatBytes)([parentPublicKey, (0, utils_2.numberToUint32)(childIndex)]);
      }
      exports.derivePublicExtension = derivePublicExtension;
      async function generateKey({
        privateKey,
        entropy,
        curve
      }) {
        const keyMaterial = entropy.slice(0, 32);
        const childChainCode = entropy.slice(32);
        if (curve.name === 'ed25519') {
          const publicKey = await curve.getPublicKey(keyMaterial);
          return {
            privateKey: keyMaterial,
            publicKey,
            chainCode: childChainCode
          };
        }
        const childPrivateKey = privateAdd(privateKey, keyMaterial, curve);
        const publicKey = await curve.getPublicKey(childPrivateKey);
        return {
          privateKey: childPrivateKey,
          publicKey,
          chainCode: childChainCode
        };
      }
      async function derivePrivateChildKey({
        entropy,
        privateKey,
        depth,
        masterFingerprint,
        parentFingerprint,
        childIndex,
        isHardened,
        curve
      }) {
        const actualChildIndex = childIndex + (isHardened ? constants_1.BIP_32_HARDENED_OFFSET : 0);
        const {
          privateKey: childPrivateKey,
          chainCode: childChainCode
        } = await generateKey({
          privateKey,
          entropy,
          curve
        });
        return await SLIP10Node_1.SLIP10Node.fromExtendedKey({
          privateKey: childPrivateKey,
          chainCode: childChainCode,
          depth: depth + 1,
          masterFingerprint,
          parentFingerprint,
          index: actualChildIndex,
          curve: curve.name
        });
      }
      function generatePublicKey({
        publicKey,
        entropy,
        curve
      }) {
        const keyMaterial = entropy.slice(0, 32);
        const childChainCode = entropy.slice(32);
        const childPublicKey = curve.publicAdd(publicKey, keyMaterial);
        return {
          publicKey: childPublicKey,
          chainCode: childChainCode
        };
      }
      async function derivePublicChildKey({
        entropy,
        publicKey,
        depth,
        masterFingerprint,
        parentFingerprint,
        childIndex,
        curve
      }) {
        const {
          publicKey: childPublicKey,
          chainCode: childChainCode
        } = generatePublicKey({
          publicKey,
          entropy,
          curve
        });
        return await SLIP10Node_1.SLIP10Node.fromExtendedKey({
          publicKey: childPublicKey,
          chainCode: childChainCode,
          depth: depth + 1,
          masterFingerprint,
          parentFingerprint,
          index: childIndex,
          curve: curve.name
        });
      }
      exports.derivePublicChildKey = derivePublicChildKey;
      function privateAdd(privateKeyBytes, tweakBytes, curve) {
        (0, utils_1.assert)((0, utils_2.isValidBytesKey)(tweakBytes, 32), 'Invalid tweak: Tweak must be a non-zero 32-byte Uint8Array.');
        const privateKey = (0, utils_1.bytesToBigInt)(privateKeyBytes);
        const tweak = (0, utils_1.bytesToBigInt)(tweakBytes);
        if (tweak >= curve.curve.n) {
          throw new Error('Invalid tweak: Tweak is larger than the curve order.');
        }
        const added = (0, curves_1.mod)(privateKey + tweak, curve.curve.n);
        const bytes = (0, utils_1.hexToBytes)(added.toString(16).padStart(64, '0'));
        if (!curve.isValidPrivateKey(bytes)) {
          throw new Error('Invalid private key or tweak: The resulting private key is invalid.');
        }
        return bytes;
      }
      exports.privateAdd = privateAdd;
      function generateEntropy({
        chainCode,
        extension
      }) {
        return (0, hmac_1.hmac)(sha512_1.sha512, chainCode, extension);
      }
      exports.generateEntropy = generateEntropy;
      function validateNode(node) {
        (0, utils_1.assert)(node, 'Invalid parameters: Must specify a node to derive from.');
      }
      exports.validateNode = validateNode;
      function validatePath(path, node, curve) {
        (0, utils_1.assert)(typeof path === 'string', 'Invalid path: Must be a string.');
        const isHardened = path.endsWith(`'`);
        (0, utils_1.assert)(!isHardened || node.privateKey, 'Invalid parameters: Cannot derive hardened child keys without a private key.');
        (0, utils_1.assert)(isHardened || curve.deriveUnhardenedKeys, `Invalid path: Cannot derive unhardened child keys with ${curve.name}.`);
      }
      function getValidatedPath(path, node, curve) {
        validatePath(path, node, curve);
        const indexPart = path.split(`'`)[0];
        const childIndex = parseInt(indexPart, 10);
        if (!constants_1.UNPREFIXED_PATH_REGEX.test(indexPart) || !Number.isInteger(childIndex) || childIndex < 0 || childIndex >= constants_1.BIP_32_HARDENED_OFFSET) {
          throw new Error(`Invalid path: The index must be a non-negative decimal integer less than ${constants_1.BIP_32_HARDENED_OFFSET}.`);
        }
        return {
          childIndex,
          isHardened: path.includes(`'`)
        };
      }
    }, {
      "../SLIP10Node": 4,
      "../constants": 5,
      "../curves": 8,
      "../utils": 18,
      "@metamask/utils": 59,
      "@noble/hashes/hmac": 72,
      "@noble/hashes/sha512": 76
    }],
    15: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.deriveChildKey = void 0;
      const utils_1 = require("@metamask/utils");
      const constants_1 = require("../constants");
      const utils_2 = require("../utils");
      const shared_1 = require("./shared");
      async function deriveChildKey(options) {
        return await (0, shared_1.deriveChildKey)(options, handleError);
      }
      exports.deriveChildKey = deriveChildKey;
      async function handleError(error, options) {
        const {
          curve,
          isHardened,
          childIndex,
          entropy,
          chainCode
        } = options;
        if (curve.name === 'ed25519') {
          throw error;
        }
        const actualChildIndex = isHardened ? childIndex + constants_1.BIP_32_HARDENED_OFFSET : childIndex;
        const newEntropy = (0, shared_1.generateEntropy)({
          chainCode,
          extension: (0, utils_1.concatBytes)([0x01, entropy.slice(32, 64), (0, utils_2.numberToUint32)(actualChildIndex)])
        });
        return Object.assign(Object.assign({}, options), {
          entropy: newEntropy
        });
      }
    }, {
      "../constants": 5,
      "../utils": 18,
      "./shared": 14,
      "@metamask/utils": 59
    }],
    16: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.encodeExtendedKey = exports.decodeExtendedKey = exports.PRIVATE_KEY_VERSION = exports.PUBLIC_KEY_VERSION = void 0;
      const utils_1 = require("@metamask/utils");
      const BIP44Node_1 = require("./BIP44Node");
      const secp256k1_1 = require("./curves/secp256k1");
      const utils_2 = require("./utils");
      exports.PUBLIC_KEY_VERSION = 0x0488b21e;
      exports.PRIVATE_KEY_VERSION = 0x0488ade4;
      const decodeExtendedKey = extendedKey => {
        const bytes = (0, utils_2.decodeBase58check)(extendedKey);
        if (bytes.length !== 78) {
          throw new Error(`Invalid extended key: Expected a length of 78, got ${bytes.length}.`);
        }
        const view = (0, utils_1.createDataView)(bytes);
        const version = view.getUint32(0, false);
        const depth = view.getUint8(4);
        (0, BIP44Node_1.validateBIP44Depth)(depth);
        const parentFingerprint = view.getUint32(5, false);
        const index = view.getUint32(9, false);
        const chainCode = bytes.slice(13, 45);
        if (!(0, utils_2.isValidBytesKey)(chainCode, 32)) {
          throw new Error(`Invalid extended key: Chain code must be a 32-byte non-zero byte array.`);
        }
        const key = bytes.slice(45, 78);
        if (!(0, utils_2.isValidBytesKey)(key, 33)) {
          throw new Error(`Invalid extended key: Key must be a 33-byte non-zero byte array.`);
        }
        const keyView = (0, utils_1.createDataView)(key);
        if (version === exports.PUBLIC_KEY_VERSION) {
          if (keyView.getUint8(0) !== 0x02 && keyView.getUint8(0) !== 0x03) {
            throw new Error(`Invalid extended key: Public key must start with 0x02 or 0x03.`);
          }
          return {
            version,
            depth,
            parentFingerprint,
            index,
            chainCode,
            publicKey: (0, secp256k1_1.decompressPublicKey)(key)
          };
        }
        if (version === exports.PRIVATE_KEY_VERSION) {
          if (keyView.getUint8(0) !== 0x00) {
            throw new Error(`Invalid extended key: Private key must start with 0x00.`);
          }
          return {
            version,
            depth,
            parentFingerprint,
            index,
            chainCode,
            privateKey: key.slice(1)
          };
        }
        throw new Error(`Invalid extended key: Expected a public (xpub) or private key (xprv) version.`);
      };
      exports.decodeExtendedKey = decodeExtendedKey;
      const encodeExtendedKey = extendedKey => {
        const {
          version,
          depth,
          parentFingerprint,
          index,
          chainCode
        } = extendedKey;
        const bytes = new Uint8Array(78);
        const view = (0, utils_1.createDataView)(bytes);
        view.setUint32(0, version, false);
        view.setUint8(4, depth);
        view.setUint32(5, parentFingerprint, false);
        view.setUint32(9, index, false);
        bytes.set(chainCode, 13);
        if (extendedKey.version === exports.PUBLIC_KEY_VERSION) {
          const {
            publicKey
          } = extendedKey;
          const compressedPublicKey = (0, secp256k1_1.compressPublicKey)(publicKey);
          bytes.set(compressedPublicKey, 45);
        }
        if (extendedKey.version === exports.PRIVATE_KEY_VERSION) {
          const {
            privateKey
          } = extendedKey;
          bytes.set(privateKey, 46);
        }
        return (0, utils_2.encodeBase58check)(bytes);
      };
      exports.encodeExtendedKey = encodeExtendedKey;
    }, {
      "./BIP44Node": 3,
      "./curves/secp256k1": 9,
      "./utils": 18,
      "@metamask/utils": 59
    }],
    17: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getBIP44AddressKeyDeriver = exports.deriveBIP44AddressKey = exports.BIP_44_COIN_TYPE_DEPTH = exports.BIP44CoinTypeNode = exports.ed25519 = exports.secp256k1 = exports.SLIP10Node = exports.BIP44Node = void 0;
      var BIP44Node_1 = require("./BIP44Node");
      Object.defineProperty(exports, "BIP44Node", {
        enumerable: true,
        get: function () {
          return BIP44Node_1.BIP44Node;
        }
      });
      var SLIP10Node_1 = require("./SLIP10Node");
      Object.defineProperty(exports, "SLIP10Node", {
        enumerable: true,
        get: function () {
          return SLIP10Node_1.SLIP10Node;
        }
      });
      var curves_1 = require("./curves");
      Object.defineProperty(exports, "secp256k1", {
        enumerable: true,
        get: function () {
          return curves_1.secp256k1;
        }
      });
      Object.defineProperty(exports, "ed25519", {
        enumerable: true,
        get: function () {
          return curves_1.ed25519;
        }
      });
      var BIP44CoinTypeNode_1 = require("./BIP44CoinTypeNode");
      Object.defineProperty(exports, "BIP44CoinTypeNode", {
        enumerable: true,
        get: function () {
          return BIP44CoinTypeNode_1.BIP44CoinTypeNode;
        }
      });
      Object.defineProperty(exports, "BIP_44_COIN_TYPE_DEPTH", {
        enumerable: true,
        get: function () {
          return BIP44CoinTypeNode_1.BIP_44_COIN_TYPE_DEPTH;
        }
      });
      Object.defineProperty(exports, "deriveBIP44AddressKey", {
        enumerable: true,
        get: function () {
          return BIP44CoinTypeNode_1.deriveBIP44AddressKey;
        }
      });
      Object.defineProperty(exports, "getBIP44AddressKeyDeriver", {
        enumerable: true,
        get: function () {
          return BIP44CoinTypeNode_1.getBIP44AddressKeyDeriver;
        }
      });
      __exportStar(require("./constants"), exports);
    }, {
      "./BIP44CoinTypeNode": 2,
      "./BIP44Node": 3,
      "./SLIP10Node": 4,
      "./constants": 5,
      "./curves": 8
    }],
    18: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.numberToUint32 = exports.validateCurve = exports.mnemonicPhraseToBytes = exports.getFingerprint = exports.encodeBase58check = exports.decodeBase58check = exports.getBytesUnsafe = exports.getBytes = exports.isValidInteger = exports.isValidBytesKey = exports.nullableHexStringToBytes = exports.hexStringToBytes = exports.isHardened = exports.isValidBIP32Index = exports.validateBIP32Index = exports.getBIP32NodeToken = exports.getUnhardenedBIP32NodeToken = exports.getHardenedBIP32NodeToken = exports.getBIP44CoinTypeToAddressPathTuple = exports.getBIP44ChangePathString = exports.getBIP44CoinTypePathString = void 0;
      const english_1 = require("@metamask/scure-bip39/dist/wordlists/english");
      const utils_1 = require("@metamask/utils");
      const ripemd160_1 = require("@noble/hashes/ripemd160");
      const sha256_1 = require("@noble/hashes/sha256");
      const base_1 = require("@scure/base");
      const constants_1 = require("./constants");
      const curves_1 = require("./curves");
      function getBIP44CoinTypePathString(coin_type) {
        return `m / ${constants_1.BIP44PurposeNodeToken} / ${getHardenedBIP32NodeToken(coin_type)}`;
      }
      exports.getBIP44CoinTypePathString = getBIP44CoinTypePathString;
      function getBIP44ChangePathString(coinTypePath, indices) {
        var _a, _b;
        return `${coinTypePath} / ${getHardenedBIP32NodeToken((_a = indices.account) !== null && _a !== void 0 ? _a : 0)} / ${getBIP32NodeToken((_b = indices.change) !== null && _b !== void 0 ? _b : 0)}`;
      }
      exports.getBIP44ChangePathString = getBIP44ChangePathString;
      function getBIP44CoinTypeToAddressPathTuple({
        account = 0,
        change = 0,
        address_index
      }) {
        return [getHardenedBIP32NodeToken(account), getBIP32NodeToken(change), getBIP32NodeToken(address_index)];
      }
      exports.getBIP44CoinTypeToAddressPathTuple = getBIP44CoinTypeToAddressPathTuple;
      function getHardenedBIP32NodeToken(index) {
        validateBIP32Index(index);
        return `${getUnhardenedBIP32NodeToken(index)}'`;
      }
      exports.getHardenedBIP32NodeToken = getHardenedBIP32NodeToken;
      function getUnhardenedBIP32NodeToken(index) {
        validateBIP32Index(index);
        return `bip32:${index}`;
      }
      exports.getUnhardenedBIP32NodeToken = getUnhardenedBIP32NodeToken;
      function getBIP32NodeToken(index) {
        if (typeof index === 'number') {
          return getUnhardenedBIP32NodeToken(index);
        }
        if (!index || !Number.isInteger(index.index) || typeof index.hardened !== 'boolean') {
          throw new Error('Invalid BIP-32 index: Must be an object containing the index and whether it is hardened.');
        }
        if (index.hardened) {
          return getHardenedBIP32NodeToken(index.index);
        }
        return getUnhardenedBIP32NodeToken(index.index);
      }
      exports.getBIP32NodeToken = getBIP32NodeToken;
      function validateBIP32Index(addressIndex) {
        if (!isValidBIP32Index(addressIndex)) {
          throw new Error(`Invalid BIP-32 index: Must be a non-negative integer.`);
        }
      }
      exports.validateBIP32Index = validateBIP32Index;
      function isValidBIP32Index(index) {
        return isValidInteger(index) && index <= constants_1.MAX_BIP_32_INDEX;
      }
      exports.isValidBIP32Index = isValidBIP32Index;
      function isHardened(bip32Token) {
        return bip32Token.endsWith(`'`);
      }
      exports.isHardened = isHardened;
      function hexStringToBytes(hexString) {
        if (hexString instanceof Uint8Array) {
          return hexString;
        }
        return (0, utils_1.hexToBytes)(hexString);
      }
      exports.hexStringToBytes = hexStringToBytes;
      function nullableHexStringToBytes(hexString) {
        if (hexString !== undefined) {
          return hexStringToBytes(hexString);
        }
        return undefined;
      }
      exports.nullableHexStringToBytes = nullableHexStringToBytes;
      function isValidBytesKey(bytes, expectedLength) {
        if (bytes.length !== expectedLength) {
          return false;
        }
        for (const byte of bytes) {
          if (byte !== 0) {
            return true;
          }
        }
        return false;
      }
      exports.isValidBytesKey = isValidBytesKey;
      function isValidInteger(value) {
        return typeof value === 'number' && Number.isInteger(value) && value >= 0;
      }
      exports.isValidInteger = isValidInteger;
      function getBytes(value, length) {
        if (value instanceof Uint8Array) {
          validateBytes(value, length);
          return value;
        }
        if (typeof value === 'string') {
          const bytes = (0, utils_1.hexToBytes)(value);
          validateBytes(bytes, length);
          return bytes;
        }
        throw new Error(`Invalid value: Expected an instance of Uint8Array or hexadecimal string.`);
      }
      exports.getBytes = getBytes;
      function getBytesUnsafe(value, length) {
        if (value instanceof Uint8Array) {
          (0, utils_1.assert)(value.length === length, `Invalid value: Must be a ${length}-byte byte array.`);
          return value;
        }
        if (typeof value === 'string') {
          return getBytesUnsafe((0, utils_1.hexToBytes)(value), length);
        }
        throw new Error(`Invalid value: Expected an instance of Uint8Array or hexadecimal string.`);
      }
      exports.getBytesUnsafe = getBytesUnsafe;
      function validateBytes(bytes, length) {
        if (!isValidBytesKey(bytes, length)) {
          throw new Error(`Invalid value: Must be a non-zero ${length}-byte byte array.`);
        }
      }
      const decodeBase58check = value => {
        const base58Check = (0, base_1.base58check)(sha256_1.sha256);
        try {
          return base58Check.decode(value);
        } catch (_a) {
          throw new Error(`Invalid extended key: Value is not base58-encoded, or the checksum is invalid.`);
        }
      };
      exports.decodeBase58check = decodeBase58check;
      const encodeBase58check = value => {
        const base58Check = (0, base_1.base58check)(sha256_1.sha256);
        return base58Check.encode(value);
      };
      exports.encodeBase58check = encodeBase58check;
      const getFingerprint = publicKey => {
        if (!isValidBytesKey(publicKey, 33)) {
          throw new Error(`Invalid public key: The key must be a 33-byte, non-zero byte array.`);
        }
        const bytes = (0, ripemd160_1.ripemd160)((0, sha256_1.sha256)(publicKey));
        const view = (0, utils_1.createDataView)(bytes);
        return view.getUint32(0, false);
      };
      exports.getFingerprint = getFingerprint;
      function mnemonicPhraseToBytes(mnemonicPhrase) {
        const words = mnemonicPhrase.split(' ');
        const indices = words.map(word => {
          const index = english_1.wordlist.indexOf(word);
          (0, utils_1.assert)(index !== -1, `Invalid mnemonic phrase: Unknown word "${word}".`);
          return index;
        });
        return new Uint8Array(new Uint16Array(indices).buffer);
      }
      exports.mnemonicPhraseToBytes = mnemonicPhraseToBytes;
      function validateCurve(curveName) {
        if (!curveName || typeof curveName !== 'string') {
          throw new Error('Invalid curve: Must specify a curve.');
        }
        if (!Object.keys(curves_1.curves).includes(curveName)) {
          throw new Error(`Invalid curve: Only the following curves are supported: ${Object.keys(curves_1.curves).join(', ')}.`);
        }
      }
      exports.validateCurve = validateCurve;
      function numberToUint32(value) {
        const bytes = new Uint8Array(4);
        const view = (0, utils_1.createDataView)(bytes);
        view.setUint32(0, value, false);
        return bytes;
      }
      exports.numberToUint32 = numberToUint32;
    }, {
      "./constants": 5,
      "./curves": 8,
      "@metamask/scure-bip39/dist/wordlists/english": 20,
      "@metamask/utils": 59,
      "@noble/hashes/ripemd160": 73,
      "@noble/hashes/sha256": 74,
      "@scure/base": 79
    }],
    19: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.mnemonicToSeedSync = exports.mnemonicToSeed = exports.validateMnemonic = exports.entropyToMnemonic = exports.mnemonicToEntropy = exports.generateMnemonic = void 0;
      const _assert_1 = require("@noble/hashes/_assert");
      const pbkdf2_1 = require("@noble/hashes/pbkdf2");
      const sha256_1 = require("@noble/hashes/sha256");
      const sha512_1 = require("@noble/hashes/sha512");
      const utils_1 = require("@noble/hashes/utils");
      const base_1 = require("@scure/base");
      function nfkd(str) {
        if (typeof str !== 'string') throw new TypeError(`Invalid mnemonic type: ${typeof str}`);
        return str.normalize('NFKD');
      }
      function normalize(str) {
        const norm = nfkd(str);
        const words = norm.split(' ');
        if (![12, 15, 18, 21, 24].includes(words.length)) throw new Error('Invalid mnemonic');
        return {
          nfkd: norm,
          words
        };
      }
      function assertEntropy(entropy) {
        _assert_1.default.bytes(entropy, 16, 20, 24, 28, 32);
      }
      function generateMnemonic(wordlist, strength = 128) {
        _assert_1.default.number(strength);
        if (strength % 32 !== 0 || strength > 256) throw new TypeError('Invalid entropy');
        return entropyToMnemonic((0, utils_1.randomBytes)(strength / 8), wordlist);
      }
      exports.generateMnemonic = generateMnemonic;
      const calcChecksum = entropy => {
        const bitsLeft = 8 - entropy.length / 4;
        return new Uint8Array([(0, sha256_1.sha256)(entropy)[0] >> bitsLeft << bitsLeft]);
      };
      function getCoder(wordlist) {
        if (!Array.isArray(wordlist) || wordlist.length !== 2 ** 11 || typeof wordlist[0] !== 'string') throw new Error('Worlist: expected array of 2048 strings');
        wordlist.forEach(i => {
          if (typeof i !== 'string') throw new Error(`Wordlist: non-string element: ${i}`);
        });
        return base_1.utils.chain(base_1.utils.checksum(1, calcChecksum), base_1.utils.radix2(11, true), base_1.utils.alphabet(wordlist));
      }
      function mnemonicToEntropy(mnemonic, wordlist) {
        let entropy;
        if (typeof mnemonic === 'string') {
          const {
            words
          } = normalize(mnemonic);
          entropy = getCoder(wordlist).decode(words);
        } else {
          entropy = getCoder(wordlist).decode(Array.from(new Uint16Array(mnemonic.buffer)).map(i => wordlist[i]));
        }
        assertEntropy(entropy);
        return entropy;
      }
      exports.mnemonicToEntropy = mnemonicToEntropy;
      function entropyToMnemonic(entropy, wordlist) {
        assertEntropy(entropy);
        const words = getCoder(wordlist).encode(entropy);
        const indices = words.map(word => wordlist.indexOf(word));
        const uInt8ArrayOfMnemonic = new Uint8Array(new Uint16Array(indices).buffer);
        return uInt8ArrayOfMnemonic;
      }
      exports.entropyToMnemonic = entropyToMnemonic;
      function validateMnemonic(mnemonic, wordlist) {
        try {
          mnemonicToEntropy(mnemonic, wordlist);
        } catch (e) {
          return false;
        }
        return true;
      }
      exports.validateMnemonic = validateMnemonic;
      const salt = passphrase => nfkd(`mnemonic${passphrase}`);
      function mnemonicToSeed(mnemonic, wordlist, passphrase = '') {
        const encodedMnemonicUint8Array = encodeMnemonicForSeedDerivation(mnemonic, wordlist);
        return (0, pbkdf2_1.pbkdf2Async)(sha512_1.sha512, encodedMnemonicUint8Array, salt(passphrase), {
          c: 2048,
          dkLen: 64
        });
      }
      exports.mnemonicToSeed = mnemonicToSeed;
      function mnemonicToSeedSync(mnemonic, wordlist, passphrase = '') {
        const encodedMnemonicUint8Array = encodeMnemonicForSeedDerivation(mnemonic, wordlist);
        return (0, pbkdf2_1.pbkdf2)(sha512_1.sha512, encodedMnemonicUint8Array, salt(passphrase), {
          c: 2048,
          dkLen: 64
        });
      }
      exports.mnemonicToSeedSync = mnemonicToSeedSync;
      function encodeMnemonicForSeedDerivation(mnemonic, wordlist) {
        let encodedMnemonicUint8Array;
        if (typeof mnemonic === 'string') {
          encodedMnemonicUint8Array = new TextEncoder().encode(normalize(mnemonic).nfkd);
        } else {
          encodedMnemonicUint8Array = new TextEncoder().encode(Array.from(new Uint16Array(mnemonic.buffer)).map(i => wordlist[i]).join(' '));
        }
        return encodedMnemonicUint8Array;
      }
    }, {
      "@noble/hashes/_assert": 21,
      "@noble/hashes/pbkdf2": 26,
      "@noble/hashes/sha256": 27,
      "@noble/hashes/sha512": 28,
      "@noble/hashes/utils": 29,
      "@scure/base": 79
    }],
    20: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.wordlist = void 0;
      exports.wordlist = `abandon
ability
able
about
above
absent
absorb
abstract
absurd
abuse
access
accident
account
accuse
achieve
acid
acoustic
acquire
across
act
action
actor
actress
actual
adapt
add
addict
address
adjust
admit
adult
advance
advice
aerobic
affair
afford
afraid
again
age
agent
agree
ahead
aim
air
airport
aisle
alarm
album
alcohol
alert
alien
all
alley
allow
almost
alone
alpha
already
also
alter
always
amateur
amazing
among
amount
amused
analyst
anchor
ancient
anger
angle
angry
animal
ankle
announce
annual
another
answer
antenna
antique
anxiety
any
apart
apology
appear
apple
approve
april
arch
arctic
area
arena
argue
arm
armed
armor
army
around
arrange
arrest
arrive
arrow
art
artefact
artist
artwork
ask
aspect
assault
asset
assist
assume
asthma
athlete
atom
attack
attend
attitude
attract
auction
audit
august
aunt
author
auto
autumn
average
avocado
avoid
awake
aware
away
awesome
awful
awkward
axis
baby
bachelor
bacon
badge
bag
balance
balcony
ball
bamboo
banana
banner
bar
barely
bargain
barrel
base
basic
basket
battle
beach
bean
beauty
because
become
beef
before
begin
behave
behind
believe
below
belt
bench
benefit
best
betray
better
between
beyond
bicycle
bid
bike
bind
biology
bird
birth
bitter
black
blade
blame
blanket
blast
bleak
bless
blind
blood
blossom
blouse
blue
blur
blush
board
boat
body
boil
bomb
bone
bonus
book
boost
border
boring
borrow
boss
bottom
bounce
box
boy
bracket
brain
brand
brass
brave
bread
breeze
brick
bridge
brief
bright
bring
brisk
broccoli
broken
bronze
broom
brother
brown
brush
bubble
buddy
budget
buffalo
build
bulb
bulk
bullet
bundle
bunker
burden
burger
burst
bus
business
busy
butter
buyer
buzz
cabbage
cabin
cable
cactus
cage
cake
call
calm
camera
camp
can
canal
cancel
candy
cannon
canoe
canvas
canyon
capable
capital
captain
car
carbon
card
cargo
carpet
carry
cart
case
cash
casino
castle
casual
cat
catalog
catch
category
cattle
caught
cause
caution
cave
ceiling
celery
cement
census
century
cereal
certain
chair
chalk
champion
change
chaos
chapter
charge
chase
chat
cheap
check
cheese
chef
cherry
chest
chicken
chief
child
chimney
choice
choose
chronic
chuckle
chunk
churn
cigar
cinnamon
circle
citizen
city
civil
claim
clap
clarify
claw
clay
clean
clerk
clever
click
client
cliff
climb
clinic
clip
clock
clog
close
cloth
cloud
clown
club
clump
cluster
clutch
coach
coast
coconut
code
coffee
coil
coin
collect
color
column
combine
come
comfort
comic
common
company
concert
conduct
confirm
congress
connect
consider
control
convince
cook
cool
copper
copy
coral
core
corn
correct
cost
cotton
couch
country
couple
course
cousin
cover
coyote
crack
cradle
craft
cram
crane
crash
crater
crawl
crazy
cream
credit
creek
crew
cricket
crime
crisp
critic
crop
cross
crouch
crowd
crucial
cruel
cruise
crumble
crunch
crush
cry
crystal
cube
culture
cup
cupboard
curious
current
curtain
curve
cushion
custom
cute
cycle
dad
damage
damp
dance
danger
daring
dash
daughter
dawn
day
deal
debate
debris
decade
december
decide
decline
decorate
decrease
deer
defense
define
defy
degree
delay
deliver
demand
demise
denial
dentist
deny
depart
depend
deposit
depth
deputy
derive
describe
desert
design
desk
despair
destroy
detail
detect
develop
device
devote
diagram
dial
diamond
diary
dice
diesel
diet
differ
digital
dignity
dilemma
dinner
dinosaur
direct
dirt
disagree
discover
disease
dish
dismiss
disorder
display
distance
divert
divide
divorce
dizzy
doctor
document
dog
doll
dolphin
domain
donate
donkey
donor
door
dose
double
dove
draft
dragon
drama
drastic
draw
dream
dress
drift
drill
drink
drip
drive
drop
drum
dry
duck
dumb
dune
during
dust
dutch
duty
dwarf
dynamic
eager
eagle
early
earn
earth
easily
east
easy
echo
ecology
economy
edge
edit
educate
effort
egg
eight
either
elbow
elder
electric
elegant
element
elephant
elevator
elite
else
embark
embody
embrace
emerge
emotion
employ
empower
empty
enable
enact
end
endless
endorse
enemy
energy
enforce
engage
engine
enhance
enjoy
enlist
enough
enrich
enroll
ensure
enter
entire
entry
envelope
episode
equal
equip
era
erase
erode
erosion
error
erupt
escape
essay
essence
estate
eternal
ethics
evidence
evil
evoke
evolve
exact
example
excess
exchange
excite
exclude
excuse
execute
exercise
exhaust
exhibit
exile
exist
exit
exotic
expand
expect
expire
explain
expose
express
extend
extra
eye
eyebrow
fabric
face
faculty
fade
faint
faith
fall
false
fame
family
famous
fan
fancy
fantasy
farm
fashion
fat
fatal
father
fatigue
fault
favorite
feature
february
federal
fee
feed
feel
female
fence
festival
fetch
fever
few
fiber
fiction
field
figure
file
film
filter
final
find
fine
finger
finish
fire
firm
first
fiscal
fish
fit
fitness
fix
flag
flame
flash
flat
flavor
flee
flight
flip
float
flock
floor
flower
fluid
flush
fly
foam
focus
fog
foil
fold
follow
food
foot
force
forest
forget
fork
fortune
forum
forward
fossil
foster
found
fox
fragile
frame
frequent
fresh
friend
fringe
frog
front
frost
frown
frozen
fruit
fuel
fun
funny
furnace
fury
future
gadget
gain
galaxy
gallery
game
gap
garage
garbage
garden
garlic
garment
gas
gasp
gate
gather
gauge
gaze
general
genius
genre
gentle
genuine
gesture
ghost
giant
gift
giggle
ginger
giraffe
girl
give
glad
glance
glare
glass
glide
glimpse
globe
gloom
glory
glove
glow
glue
goat
goddess
gold
good
goose
gorilla
gospel
gossip
govern
gown
grab
grace
grain
grant
grape
grass
gravity
great
green
grid
grief
grit
grocery
group
grow
grunt
guard
guess
guide
guilt
guitar
gun
gym
habit
hair
half
hammer
hamster
hand
happy
harbor
hard
harsh
harvest
hat
have
hawk
hazard
head
health
heart
heavy
hedgehog
height
hello
helmet
help
hen
hero
hidden
high
hill
hint
hip
hire
history
hobby
hockey
hold
hole
holiday
hollow
home
honey
hood
hope
horn
horror
horse
hospital
host
hotel
hour
hover
hub
huge
human
humble
humor
hundred
hungry
hunt
hurdle
hurry
hurt
husband
hybrid
ice
icon
idea
identify
idle
ignore
ill
illegal
illness
image
imitate
immense
immune
impact
impose
improve
impulse
inch
include
income
increase
index
indicate
indoor
industry
infant
inflict
inform
inhale
inherit
initial
inject
injury
inmate
inner
innocent
input
inquiry
insane
insect
inside
inspire
install
intact
interest
into
invest
invite
involve
iron
island
isolate
issue
item
ivory
jacket
jaguar
jar
jazz
jealous
jeans
jelly
jewel
job
join
joke
journey
joy
judge
juice
jump
jungle
junior
junk
just
kangaroo
keen
keep
ketchup
key
kick
kid
kidney
kind
kingdom
kiss
kit
kitchen
kite
kitten
kiwi
knee
knife
knock
know
lab
label
labor
ladder
lady
lake
lamp
language
laptop
large
later
latin
laugh
laundry
lava
law
lawn
lawsuit
layer
lazy
leader
leaf
learn
leave
lecture
left
leg
legal
legend
leisure
lemon
lend
length
lens
leopard
lesson
letter
level
liar
liberty
library
license
life
lift
light
like
limb
limit
link
lion
liquid
list
little
live
lizard
load
loan
lobster
local
lock
logic
lonely
long
loop
lottery
loud
lounge
love
loyal
lucky
luggage
lumber
lunar
lunch
luxury
lyrics
machine
mad
magic
magnet
maid
mail
main
major
make
mammal
man
manage
mandate
mango
mansion
manual
maple
marble
march
margin
marine
market
marriage
mask
mass
master
match
material
math
matrix
matter
maximum
maze
meadow
mean
measure
meat
mechanic
medal
media
melody
melt
member
memory
mention
menu
mercy
merge
merit
merry
mesh
message
metal
method
middle
midnight
milk
million
mimic
mind
minimum
minor
minute
miracle
mirror
misery
miss
mistake
mix
mixed
mixture
mobile
model
modify
mom
moment
monitor
monkey
monster
month
moon
moral
more
morning
mosquito
mother
motion
motor
mountain
mouse
move
movie
much
muffin
mule
multiply
muscle
museum
mushroom
music
must
mutual
myself
mystery
myth
naive
name
napkin
narrow
nasty
nation
nature
near
neck
need
negative
neglect
neither
nephew
nerve
nest
net
network
neutral
never
news
next
nice
night
noble
noise
nominee
noodle
normal
north
nose
notable
note
nothing
notice
novel
now
nuclear
number
nurse
nut
oak
obey
object
oblige
obscure
observe
obtain
obvious
occur
ocean
october
odor
off
offer
office
often
oil
okay
old
olive
olympic
omit
once
one
onion
online
only
open
opera
opinion
oppose
option
orange
orbit
orchard
order
ordinary
organ
orient
original
orphan
ostrich
other
outdoor
outer
output
outside
oval
oven
over
own
owner
oxygen
oyster
ozone
pact
paddle
page
pair
palace
palm
panda
panel
panic
panther
paper
parade
parent
park
parrot
party
pass
patch
path
patient
patrol
pattern
pause
pave
payment
peace
peanut
pear
peasant
pelican
pen
penalty
pencil
people
pepper
perfect
permit
person
pet
phone
photo
phrase
physical
piano
picnic
picture
piece
pig
pigeon
pill
pilot
pink
pioneer
pipe
pistol
pitch
pizza
place
planet
plastic
plate
play
please
pledge
pluck
plug
plunge
poem
poet
point
polar
pole
police
pond
pony
pool
popular
portion
position
possible
post
potato
pottery
poverty
powder
power
practice
praise
predict
prefer
prepare
present
pretty
prevent
price
pride
primary
print
priority
prison
private
prize
problem
process
produce
profit
program
project
promote
proof
property
prosper
protect
proud
provide
public
pudding
pull
pulp
pulse
pumpkin
punch
pupil
puppy
purchase
purity
purpose
purse
push
put
puzzle
pyramid
quality
quantum
quarter
question
quick
quit
quiz
quote
rabbit
raccoon
race
rack
radar
radio
rail
rain
raise
rally
ramp
ranch
random
range
rapid
rare
rate
rather
raven
raw
razor
ready
real
reason
rebel
rebuild
recall
receive
recipe
record
recycle
reduce
reflect
reform
refuse
region
regret
regular
reject
relax
release
relief
rely
remain
remember
remind
remove
render
renew
rent
reopen
repair
repeat
replace
report
require
rescue
resemble
resist
resource
response
result
retire
retreat
return
reunion
reveal
review
reward
rhythm
rib
ribbon
rice
rich
ride
ridge
rifle
right
rigid
ring
riot
ripple
risk
ritual
rival
river
road
roast
robot
robust
rocket
romance
roof
rookie
room
rose
rotate
rough
round
route
royal
rubber
rude
rug
rule
run
runway
rural
sad
saddle
sadness
safe
sail
salad
salmon
salon
salt
salute
same
sample
sand
satisfy
satoshi
sauce
sausage
save
say
scale
scan
scare
scatter
scene
scheme
school
science
scissors
scorpion
scout
scrap
screen
script
scrub
sea
search
season
seat
second
secret
section
security
seed
seek
segment
select
sell
seminar
senior
sense
sentence
series
service
session
settle
setup
seven
shadow
shaft
shallow
share
shed
shell
sheriff
shield
shift
shine
ship
shiver
shock
shoe
shoot
shop
short
shoulder
shove
shrimp
shrug
shuffle
shy
sibling
sick
side
siege
sight
sign
silent
silk
silly
silver
similar
simple
since
sing
siren
sister
situate
six
size
skate
sketch
ski
skill
skin
skirt
skull
slab
slam
sleep
slender
slice
slide
slight
slim
slogan
slot
slow
slush
small
smart
smile
smoke
smooth
snack
snake
snap
sniff
snow
soap
soccer
social
sock
soda
soft
solar
soldier
solid
solution
solve
someone
song
soon
sorry
sort
soul
sound
soup
source
south
space
spare
spatial
spawn
speak
special
speed
spell
spend
sphere
spice
spider
spike
spin
spirit
split
spoil
sponsor
spoon
sport
spot
spray
spread
spring
spy
square
squeeze
squirrel
stable
stadium
staff
stage
stairs
stamp
stand
start
state
stay
steak
steel
stem
step
stereo
stick
still
sting
stock
stomach
stone
stool
story
stove
strategy
street
strike
strong
struggle
student
stuff
stumble
style
subject
submit
subway
success
such
sudden
suffer
sugar
suggest
suit
summer
sun
sunny
sunset
super
supply
supreme
sure
surface
surge
surprise
surround
survey
suspect
sustain
swallow
swamp
swap
swarm
swear
sweet
swift
swim
swing
switch
sword
symbol
symptom
syrup
system
table
tackle
tag
tail
talent
talk
tank
tape
target
task
taste
tattoo
taxi
teach
team
tell
ten
tenant
tennis
tent
term
test
text
thank
that
theme
then
theory
there
they
thing
this
thought
three
thrive
throw
thumb
thunder
ticket
tide
tiger
tilt
timber
time
tiny
tip
tired
tissue
title
toast
tobacco
today
toddler
toe
together
toilet
token
tomato
tomorrow
tone
tongue
tonight
tool
tooth
top
topic
topple
torch
tornado
tortoise
toss
total
tourist
toward
tower
town
toy
track
trade
traffic
tragic
train
transfer
trap
trash
travel
tray
treat
tree
trend
trial
tribe
trick
trigger
trim
trip
trophy
trouble
truck
true
truly
trumpet
trust
truth
try
tube
tuition
tumble
tuna
tunnel
turkey
turn
turtle
twelve
twenty
twice
twin
twist
two
type
typical
ugly
umbrella
unable
unaware
uncle
uncover
under
undo
unfair
unfold
unhappy
uniform
unique
unit
universe
unknown
unlock
until
unusual
unveil
update
upgrade
uphold
upon
upper
upset
urban
urge
usage
use
used
useful
useless
usual
utility
vacant
vacuum
vague
valid
valley
valve
van
vanish
vapor
various
vast
vault
vehicle
velvet
vendor
venture
venue
verb
verify
version
very
vessel
veteran
viable
vibrant
vicious
victory
video
view
village
vintage
violin
virtual
virus
visa
visit
visual
vital
vivid
vocal
voice
void
volcano
volume
vote
voyage
wage
wagon
wait
walk
wall
walnut
want
warfare
warm
warrior
wash
wasp
waste
water
wave
way
wealth
weapon
wear
weasel
weather
web
wedding
weekend
weird
welcome
west
wet
whale
what
wheat
wheel
when
where
whip
whisper
wide
width
wife
wild
will
win
window
wine
wing
wink
winner
winter
wire
wisdom
wise
wish
witness
wolf
woman
wonder
wood
wool
word
work
world
worry
worth
wrap
wreck
wrestle
wrist
write
wrong
yard
year
yellow
you
young
youth
zebra
zero
zone
zoo`.split('\n');
    }, {}],
    21: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
      function number(n) {
        if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
      }
      exports.number = number;
      function bool(b) {
        if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
      }
      exports.bool = bool;
      function bytes(b, ...lengths) {
        if (!(b instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
        if (lengths.length > 0 && !lengths.includes(b.length)) throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
      }
      exports.bytes = bytes;
      function hash(hash) {
        if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
        number(hash.outputLen);
        number(hash.blockLen);
      }
      exports.hash = hash;
      function exists(instance, checkFinished = true) {
        if (instance.destroyed) throw new Error('Hash instance has been destroyed');
        if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
      }
      exports.exists = exists;
      function output(out, instance) {
        bytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error(`digestInto() expects output buffer of length at least ${min}`);
        }
      }
      exports.output = output;
      const assert = {
        number,
        bool,
        bytes,
        hash,
        exists,
        output
      };
      exports.default = assert;
    }, {}],
    22: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SHA2 = void 0;
      const _assert_js_1 = require("./_assert.js");
      const utils_js_1 = require("./utils.js");
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(0xffffffff);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      class SHA2 extends utils_js_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_js_1.createView)(this.buffer);
        }
        update(data) {
          _assert_js_1.default.exists(this);
          const {
            view,
            buffer,
            blockLen
          } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;
          for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_js_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          _assert_js_1.default.exists(this);
          _assert_js_1.default.output(out, this);
          this.finished = true;
          const {
            buffer,
            view,
            blockLen,
            isLE
          } = this;
          let {
            pos
          } = this;
          buffer[pos++] = 0b10000000;
          this.buffer.subarray(pos).fill(0);
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++) buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_js_1.createView)(out);
          const len = this.outputLen;
          if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
          for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const {
            buffer,
            outputLen
          } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const {
            blockLen,
            buffer,
            length,
            finished,
            destroyed,
            pos
          } = this;
          to.length = length;
          to.pos = pos;
          to.finished = finished;
          to.destroyed = destroyed;
          if (length % blockLen) to.buffer.set(buffer);
          return to;
        }
      }
      exports.SHA2 = SHA2;
    }, {
      "./_assert.js": 21,
      "./utils.js": 29
    }],
    23: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
      const U32_MASK64 = BigInt(2 ** 32 - 1);
      const _32n = BigInt(32);
      function fromBig(n, le = false) {
        if (le) return {
          h: Number(n & U32_MASK64),
          l: Number(n >> _32n & U32_MASK64)
        };
        return {
          h: Number(n >> _32n & U32_MASK64) | 0,
          l: Number(n & U32_MASK64) | 0
        };
      }
      exports.fromBig = fromBig;
      function split(lst, le = false) {
        let Ah = new Uint32Array(lst.length);
        let Al = new Uint32Array(lst.length);
        for (let i = 0; i < lst.length; i++) {
          const {
            h,
            l
          } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      exports.split = split;
      const toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports.toBig = toBig;
      const shrSH = (h, l, s) => h >>> s;
      const shrSL = (h, l, s) => h << 32 - s | l >>> s;
      const rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      const rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      const rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      const rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      const rotr32H = (h, l) => l;
      const rotr32L = (h, l) => h;
      const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return {
          h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
          l: l | 0
        };
      }
      exports.add = add;
      const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      const u64 = {
        fromBig,
        split,
        toBig: exports.toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }, {}],
    24: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.crypto = void 0;
      exports.crypto = {
        node: undefined,
        web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
      };
    }, {}],
    25: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.hmac = void 0;
      const _assert_js_1 = require("./_assert.js");
      const utils_js_1 = require("./utils.js");
      class HMAC extends utils_js_1.Hash {
        constructor(hash, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          _assert_js_1.default.hash(hash);
          const key = (0, utils_js_1.toBytes)(_key);
          this.iHash = hash.create();
          if (typeof this.iHash.update !== 'function') throw new TypeError('Expected instance of class which extends utils.Hash');
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36;
          this.iHash.update(pad);
          this.oHash = hash.create();
          for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36 ^ 0x5c;
          this.oHash.update(pad);
          pad.fill(0);
        }
        update(buf) {
          _assert_js_1.default.exists(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          _assert_js_1.default.exists(this);
          _assert_js_1.default.bytes(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const {
            oHash,
            iHash,
            finished,
            destroyed,
            blockLen,
            outputLen
          } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      }
      const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
      exports.hmac = hmac;
      exports.hmac.create = (hash, key) => new HMAC(hash, key);
    }, {
      "./_assert.js": 21,
      "./utils.js": 29
    }],
    26: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.pbkdf2Async = exports.pbkdf2 = void 0;
      const _assert_js_1 = require("./_assert.js");
      const hmac_js_1 = require("./hmac.js");
      const utils_js_1 = require("./utils.js");
      function pbkdf2Init(hash, _password, _salt, _opts) {
        _assert_js_1.default.hash(hash);
        const opts = (0, utils_js_1.checkOpts)({
          dkLen: 32,
          asyncTick: 10
        }, _opts);
        const {
          c,
          dkLen,
          asyncTick
        } = opts;
        _assert_js_1.default.number(c);
        _assert_js_1.default.number(dkLen);
        _assert_js_1.default.number(asyncTick);
        if (c < 1) throw new Error('PBKDF2: iterations (c) should be >= 1');
        const password = (0, utils_js_1.toBytes)(_password);
        const salt = (0, utils_js_1.toBytes)(_salt);
        const DK = new Uint8Array(dkLen);
        const PRF = hmac_js_1.hmac.create(hash, password);
        const PRFSalt = PRF._cloneInto().update(salt);
        return {
          c,
          dkLen,
          asyncTick,
          DK,
          PRF,
          PRFSalt
        };
      }
      function pbkdf2Output(PRF, PRFSalt, DK, prfW, u) {
        PRF.destroy();
        PRFSalt.destroy();
        if (prfW) prfW.destroy();
        u.fill(0);
        return DK;
      }
      function pbkdf2(hash, password, salt, opts) {
        const {
          c,
          dkLen,
          DK,
          PRF,
          PRFSalt
        } = pbkdf2Init(hash, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_js_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);
        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);
          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
          Ti.set(u.subarray(0, Ti.length));
          for (let ui = 1; ui < c; ui++) {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
          }
        }
        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }
      exports.pbkdf2 = pbkdf2;
      async function pbkdf2Async(hash, password, salt, opts) {
        const {
          c,
          dkLen,
          asyncTick,
          DK,
          PRF,
          PRFSalt
        } = pbkdf2Init(hash, password, salt, opts);
        let prfW;
        const arr = new Uint8Array(4);
        const view = (0, utils_js_1.createView)(arr);
        const u = new Uint8Array(PRF.outputLen);
        for (let ti = 1, pos = 0; pos < dkLen; ti++, pos += PRF.outputLen) {
          const Ti = DK.subarray(pos, pos + PRF.outputLen);
          view.setInt32(0, ti, false);
          (prfW = PRFSalt._cloneInto(prfW)).update(arr).digestInto(u);
          Ti.set(u.subarray(0, Ti.length));
          await (0, utils_js_1.asyncLoop)(c - 1, asyncTick, i => {
            PRF._cloneInto(prfW).update(u).digestInto(u);
            for (let i = 0; i < Ti.length; i++) Ti[i] ^= u[i];
          });
        }
        return pbkdf2Output(PRF, PRFSalt, DK, prfW, u);
      }
      exports.pbkdf2Async = pbkdf2Async;
    }, {
      "./_assert.js": 21,
      "./hmac.js": 25,
      "./utils.js": 29
    }],
    27: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sha224 = exports.sha256 = void 0;
      const _sha2_js_1 = require("./_sha2.js");
      const utils_js_1 = require("./utils.js");
      const Chi = (a, b, c) => a & b ^ ~a & c;
      const Maj = (a, b, c) => a & b ^ a & c ^ b & c;
      const SHA256_K = new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
      const IV = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
      const SHA256_W = new Uint32Array(64);
      class SHA256 extends _sha2_js_1.SHA2 {
        constructor() {
          super(64, 32, 8, false);
          this.A = IV[0] | 0;
          this.B = IV[1] | 0;
          this.C = IV[2] | 0;
          this.D = IV[3] | 0;
          this.E = IV[4] | 0;
          this.F = IV[5] | 0;
          this.G = IV[6] | 0;
          this.H = IV[7] | 0;
        }
        get() {
          const {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
          } = this;
          return [A, B, C, D, E, F, G, H];
        }
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
          } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          SHA256_W.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          this.buffer.fill(0);
        }
      }
      class SHA224 extends SHA256 {
        constructor() {
          super();
          this.A = 0xc1059ed8 | 0;
          this.B = 0x367cd507 | 0;
          this.C = 0x3070dd17 | 0;
          this.D = 0xf70e5939 | 0;
          this.E = 0xffc00b31 | 0;
          this.F = 0x68581511 | 0;
          this.G = 0x64f98fa7 | 0;
          this.H = 0xbefa4fa4 | 0;
          this.outputLen = 28;
        }
      }
      exports.sha256 = (0, utils_js_1.wrapConstructor)(() => new SHA256());
      exports.sha224 = (0, utils_js_1.wrapConstructor)(() => new SHA224());
    }, {
      "./_sha2.js": 22,
      "./utils.js": 29
    }],
    28: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sha384 = exports.sha512_256 = exports.sha512_224 = exports.sha512 = exports.SHA512 = void 0;
      const _sha2_js_1 = require("./_sha2.js");
      const _u64_js_1 = require("./_u64.js");
      const utils_js_1 = require("./utils.js");
      const [SHA512_Kh, SHA512_Kl] = _u64_js_1.default.split(['0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc', '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118', '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2', '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694', '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65', '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5', '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4', '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70', '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df', '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b', '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30', '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8', '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8', '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3', '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec', '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b', '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178', '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b', '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c', '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'].map(n => BigInt(n)));
      const SHA512_W_H = new Uint32Array(80);
      const SHA512_W_L = new Uint32Array(80);
      class SHA512 extends _sha2_js_1.SHA2 {
        constructor() {
          super(128, 64, 16, false);
          this.Ah = 0x6a09e667 | 0;
          this.Al = 0xf3bcc908 | 0;
          this.Bh = 0xbb67ae85 | 0;
          this.Bl = 0x84caa73b | 0;
          this.Ch = 0x3c6ef372 | 0;
          this.Cl = 0xfe94f82b | 0;
          this.Dh = 0xa54ff53a | 0;
          this.Dl = 0x5f1d36f1 | 0;
          this.Eh = 0x510e527f | 0;
          this.El = 0xade682d1 | 0;
          this.Fh = 0x9b05688c | 0;
          this.Fl = 0x2b3e6c1f | 0;
          this.Gh = 0x1f83d9ab | 0;
          this.Gl = 0xfb41bd6b | 0;
          this.Hh = 0x5be0cd19 | 0;
          this.Hl = 0x137e2179 | 0;
        }
        get() {
          const {
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
          } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = _u64_js_1.default.rotrSH(W15h, W15l, 1) ^ _u64_js_1.default.rotrSH(W15h, W15l, 8) ^ _u64_js_1.default.shrSH(W15h, W15l, 7);
            const s0l = _u64_js_1.default.rotrSL(W15h, W15l, 1) ^ _u64_js_1.default.rotrSL(W15h, W15l, 8) ^ _u64_js_1.default.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = _u64_js_1.default.rotrSH(W2h, W2l, 19) ^ _u64_js_1.default.rotrBH(W2h, W2l, 61) ^ _u64_js_1.default.shrSH(W2h, W2l, 6);
            const s1l = _u64_js_1.default.rotrSL(W2h, W2l, 19) ^ _u64_js_1.default.rotrBL(W2h, W2l, 61) ^ _u64_js_1.default.shrSL(W2h, W2l, 6);
            const SUMl = _u64_js_1.default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = _u64_js_1.default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }
          let {
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
          } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = _u64_js_1.default.rotrSH(Eh, El, 14) ^ _u64_js_1.default.rotrSH(Eh, El, 18) ^ _u64_js_1.default.rotrBH(Eh, El, 41);
            const sigma1l = _u64_js_1.default.rotrSL(Eh, El, 14) ^ _u64_js_1.default.rotrSL(Eh, El, 18) ^ _u64_js_1.default.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = _u64_js_1.default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = _u64_js_1.default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = _u64_js_1.default.rotrSH(Ah, Al, 28) ^ _u64_js_1.default.rotrBH(Ah, Al, 34) ^ _u64_js_1.default.rotrBH(Ah, Al, 39);
            const sigma0l = _u64_js_1.default.rotrSL(Ah, Al, 28) ^ _u64_js_1.default.rotrBL(Ah, Al, 34) ^ _u64_js_1.default.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({
              h: Eh,
              l: El
            } = _u64_js_1.default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = _u64_js_1.default.add3L(T1l, sigma0l, MAJl);
            Ah = _u64_js_1.default.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({
            h: Ah,
            l: Al
          } = _u64_js_1.default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({
            h: Bh,
            l: Bl
          } = _u64_js_1.default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({
            h: Ch,
            l: Cl
          } = _u64_js_1.default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({
            h: Dh,
            l: Dl
          } = _u64_js_1.default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({
            h: Eh,
            l: El
          } = _u64_js_1.default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({
            h: Fh,
            l: Fl
          } = _u64_js_1.default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({
            h: Gh,
            l: Gl
          } = _u64_js_1.default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({
            h: Hh,
            l: Hl
          } = _u64_js_1.default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          SHA512_W_H.fill(0);
          SHA512_W_L.fill(0);
        }
        destroy() {
          this.buffer.fill(0);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
      exports.SHA512 = SHA512;
      class SHA512_224 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0x8c3d37c8 | 0;
          this.Al = 0x19544da2 | 0;
          this.Bh = 0x73e19966 | 0;
          this.Bl = 0x89dcd4d6 | 0;
          this.Ch = 0x1dfab7ae | 0;
          this.Cl = 0x32ff9c82 | 0;
          this.Dh = 0x679dd514 | 0;
          this.Dl = 0x582f9fcf | 0;
          this.Eh = 0x0f6d2b69 | 0;
          this.El = 0x7bd44da8 | 0;
          this.Fh = 0x77e36f73 | 0;
          this.Fl = 0x04c48942 | 0;
          this.Gh = 0x3f9d85a8 | 0;
          this.Gl = 0x6a1d36c8 | 0;
          this.Hh = 0x1112e6ad | 0;
          this.Hl = 0x91d692a1 | 0;
          this.outputLen = 28;
        }
      }
      class SHA512_256 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0x22312194 | 0;
          this.Al = 0xfc2bf72c | 0;
          this.Bh = 0x9f555fa3 | 0;
          this.Bl = 0xc84c64c2 | 0;
          this.Ch = 0x2393b86b | 0;
          this.Cl = 0x6f53b151 | 0;
          this.Dh = 0x96387719 | 0;
          this.Dl = 0x5940eabd | 0;
          this.Eh = 0x96283ee2 | 0;
          this.El = 0xa88effe3 | 0;
          this.Fh = 0xbe5e1e25 | 0;
          this.Fl = 0x53863992 | 0;
          this.Gh = 0x2b0199fc | 0;
          this.Gl = 0x2c85b8aa | 0;
          this.Hh = 0x0eb72ddc | 0;
          this.Hl = 0x81c52ca2 | 0;
          this.outputLen = 32;
        }
      }
      class SHA384 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0xcbbb9d5d | 0;
          this.Al = 0xc1059ed8 | 0;
          this.Bh = 0x629a292a | 0;
          this.Bl = 0x367cd507 | 0;
          this.Ch = 0x9159015a | 0;
          this.Cl = 0x3070dd17 | 0;
          this.Dh = 0x152fecd8 | 0;
          this.Dl = 0xf70e5939 | 0;
          this.Eh = 0x67332667 | 0;
          this.El = 0xffc00b31 | 0;
          this.Fh = 0x8eb44a87 | 0;
          this.Fl = 0x68581511 | 0;
          this.Gh = 0xdb0c2e0d | 0;
          this.Gl = 0x64f98fa7 | 0;
          this.Hh = 0x47b5481d | 0;
          this.Hl = 0xbefa4fa4 | 0;
          this.outputLen = 48;
        }
      }
      exports.sha512 = (0, utils_js_1.wrapConstructor)(() => new SHA512());
      exports.sha512_224 = (0, utils_js_1.wrapConstructor)(() => new SHA512_224());
      exports.sha512_256 = (0, utils_js_1.wrapConstructor)(() => new SHA512_256());
      exports.sha384 = (0, utils_js_1.wrapConstructor)(() => new SHA384());
    }, {
      "./_sha2.js": 22,
      "./_u64.js": 23,
      "./utils.js": 29
    }],
    29: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.randomBytes = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
      const crypto_1 = require("@noble/hashes/crypto");
      const u8 = arr => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.u8 = u8;
      const u32 = arr => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      exports.u32 = u32;
      const createView = arr => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.createView = createView;
      const rotr = (word, shift) => word << 32 - shift | word >>> shift;
      exports.rotr = rotr;
      exports.isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
      if (!exports.isLE) throw new Error('Non little-endian hardware is not supported');
      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));
      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
        let hex = '';
        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }
        return hex;
      }
      exports.bytesToHex = bytesToHex;
      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }
        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
        const array = new Uint8Array(hex.length / 2);
        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }
        return array;
      }
      exports.hexToBytes = hexToBytes;
      const nextTick = async () => {};
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick) continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      exports.asyncLoop = asyncLoop;
      function utf8ToBytes(str) {
        if (typeof str !== 'string') {
          throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
        }
        return new TextEncoder().encode(str);
      }
      exports.utf8ToBytes = utf8ToBytes;
      function toBytes(data) {
        if (typeof data === 'string') data = utf8ToBytes(data);
        if (!(data instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof data})`);
        return data;
      }
      exports.toBytes = toBytes;
      function concatBytes(...arrays) {
        if (!arrays.every(a => a instanceof Uint8Array)) throw new Error('Uint8Array list expected');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }
        return result;
      }
      exports.concatBytes = concatBytes;
      class Hash {
        clone() {
          return this._cloneInto();
        }
      }
      exports.Hash = Hash;
      const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;
      function checkOpts(defaults, opts) {
        if (opts !== undefined && (typeof opts !== 'object' || !isPlainObject(opts))) throw new TypeError('Options should be object or undefined');
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      exports.checkOpts = checkOpts;
      function wrapConstructor(hashConstructor) {
        const hashC = message => hashConstructor().update(toBytes(message)).digest();
        const tmp = hashConstructor();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashConstructor();
        return hashC;
      }
      exports.wrapConstructor = wrapConstructor;
      function wrapConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = opts => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto.web) {
          return crypto_1.crypto.web.getRandomValues(new Uint8Array(bytesLength));
        } else if (crypto_1.crypto.node) {
          return new Uint8Array(crypto_1.crypto.node.randomBytes(bytesLength).buffer);
        } else {
          throw new Error("The environment doesn't have randomBytes function");
        }
      }
      exports.randomBytes = randomBytes;
    }, {
      "@noble/hashes/crypto": 24
    }],
    30: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.text = exports.spinner = exports.panel = exports.heading = exports.divider = exports.copyable = void 0;
      const utils_1 = require("@metamask/utils");
      const nodes_1 = require("./nodes");
      function createBuilder(type, struct, keys = []) {
        return (...args) => {
          if (args.length === 1 && (0, utils_1.isPlainObject)(args[0])) {
            const node = {
              ...args[0],
              type
            };
            (0, utils_1.assertStruct)(node, struct, `Invalid ${type} component`);
            return node;
          }
          const node = keys.reduce((partialNode, key, index) => {
            return {
              ...partialNode,
              [key]: args[index]
            };
          }, {
            type
          });
          (0, utils_1.assertStruct)(node, struct, `Invalid ${type} component`);
          return node;
        };
      }
      exports.copyable = createBuilder(nodes_1.NodeType.Copyable, nodes_1.CopyableStruct, ['value']);
      exports.divider = createBuilder(nodes_1.NodeType.Divider, nodes_1.DividerStruct);
      exports.heading = createBuilder(nodes_1.NodeType.Heading, nodes_1.HeadingStruct, ['value']);
      exports.panel = createBuilder(nodes_1.NodeType.Panel, nodes_1.PanelStruct, ['children']);
      exports.spinner = createBuilder(nodes_1.NodeType.Spinner, nodes_1.SpinnerStruct);
      exports.text = createBuilder(nodes_1.NodeType.Text, nodes_1.TextStruct, ['value']);
    }, {
      "./nodes": 32,
      "@metamask/utils": 42
    }],
    31: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      __exportStar(require("./builder"), exports);
      __exportStar(require("./nodes"), exports);
      __exportStar(require("./validation"), exports);
    }, {
      "./builder": 30,
      "./nodes": 32,
      "./validation": 33
    }],
    32: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ComponentStruct = exports.TextStruct = exports.SpinnerStruct = exports.PanelStruct = exports.HeadingStruct = exports.DividerStruct = exports.CopyableStruct = exports.NodeType = void 0;
      const superstruct_1 = require("superstruct");
      const NodeStruct = (0, superstruct_1.object)({
        type: (0, superstruct_1.string)()
      });
      const ParentStruct = (0, superstruct_1.assign)(NodeStruct, (0, superstruct_1.object)({
        children: (0, superstruct_1.array)((0, superstruct_1.lazy)(() => exports.ComponentStruct))
      }));
      const LiteralStruct = (0, superstruct_1.assign)(NodeStruct, (0, superstruct_1.object)({
        value: (0, superstruct_1.unknown)()
      }));
      var NodeType;
      (function (NodeType) {
        NodeType["Copyable"] = "copyable";
        NodeType["Divider"] = "divider";
        NodeType["Heading"] = "heading";
        NodeType["Panel"] = "panel";
        NodeType["Spinner"] = "spinner";
        NodeType["Text"] = "text";
      })(NodeType = exports.NodeType || (exports.NodeType = {}));
      exports.CopyableStruct = (0, superstruct_1.assign)(LiteralStruct, (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)(NodeType.Copyable),
        value: (0, superstruct_1.string)()
      }));
      exports.DividerStruct = (0, superstruct_1.assign)(NodeStruct, (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)(NodeType.Divider)
      }));
      exports.HeadingStruct = (0, superstruct_1.assign)(LiteralStruct, (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)(NodeType.Heading),
        value: (0, superstruct_1.string)()
      }));
      exports.PanelStruct = (0, superstruct_1.assign)(ParentStruct, (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)(NodeType.Panel)
      }));
      exports.SpinnerStruct = (0, superstruct_1.assign)(NodeStruct, (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)(NodeType.Spinner)
      }));
      exports.TextStruct = (0, superstruct_1.assign)(LiteralStruct, (0, superstruct_1.object)({
        type: (0, superstruct_1.literal)(NodeType.Text),
        value: (0, superstruct_1.string)()
      }));
      exports.ComponentStruct = (0, superstruct_1.union)([exports.CopyableStruct, exports.DividerStruct, exports.HeadingStruct, exports.PanelStruct, exports.SpinnerStruct, exports.TextStruct]);
    }, {
      "superstruct": 130
    }],
    33: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.assertIsComponent = exports.isComponent = void 0;
      const utils_1 = require("@metamask/utils");
      const superstruct_1 = require("superstruct");
      const nodes_1 = require("./nodes");
      function isComponent(value) {
        return (0, superstruct_1.is)(value, nodes_1.ComponentStruct);
      }
      exports.isComponent = isComponent;
      function assertIsComponent(value) {
        (0, utils_1.assertStruct)(value, nodes_1.ComponentStruct, 'Invalid component');
      }
      exports.assertIsComponent = assertIsComponent;
    }, {
      "./nodes": 32,
      "@metamask/utils": 42,
      "superstruct": 130
    }],
    34: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.assertExhaustive = exports.assertStruct = exports.assert = exports.AssertionError = void 0;
      const superstruct_1 = require("superstruct");
      function isErrorWithMessage(error) {
        return typeof error === 'object' && error !== null && 'message' in error;
      }
      function isConstructable(fn) {
        var _a, _b;
        return Boolean(typeof ((_b = (_a = fn === null || fn === void 0 ? void 0 : fn.prototype) === null || _a === void 0 ? void 0 : _a.constructor) === null || _b === void 0 ? void 0 : _b.name) === 'string');
      }
      function getErrorMessage(error) {
        const message = isErrorWithMessage(error) ? error.message : String(error);
        if (message.endsWith('.')) {
          return message.slice(0, -1);
        }
        return message;
      }
      function getError(ErrorWrapper, message) {
        if (isConstructable(ErrorWrapper)) {
          return new ErrorWrapper({
            message
          });
        }
        return ErrorWrapper({
          message
        });
      }
      class AssertionError extends Error {
        constructor(options) {
          super(options.message);
          this.code = 'ERR_ASSERTION';
        }
      }
      exports.AssertionError = AssertionError;
      function assert(value, message = 'Assertion failed.', ErrorWrapper = AssertionError) {
        if (!value) {
          if (message instanceof Error) {
            throw message;
          }
          throw getError(ErrorWrapper, message);
        }
      }
      exports.assert = assert;
      function assertStruct(value, struct, errorPrefix = 'Assertion failed', ErrorWrapper = AssertionError) {
        try {
          (0, superstruct_1.assert)(value, struct);
        } catch (error) {
          throw getError(ErrorWrapper, `${errorPrefix}: ${getErrorMessage(error)}.`);
        }
      }
      exports.assertStruct = assertStruct;
      function assertExhaustive(_object) {
        throw new Error('Invalid branch reached. Should be detected during compilation.');
      }
      exports.assertExhaustive = assertExhaustive;
    }, {
      "superstruct": 130
    }],
    35: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.base64 = void 0;
      const superstruct_1 = require("superstruct");
      const assert_1 = require("./assert");
      const base64 = (struct, options = {}) => {
        var _a, _b;
        const paddingRequired = (_a = options.paddingRequired) !== null && _a !== void 0 ? _a : false;
        const characterSet = (_b = options.characterSet) !== null && _b !== void 0 ? _b : 'base64';
        let letters;
        if (characterSet === 'base64') {
          letters = String.raw`[A-Za-z0-9+\/]`;
        } else {
          (0, assert_1.assert)(characterSet === 'base64url');
          letters = String.raw`[-_A-Za-z0-9]`;
        }
        let re;
        if (paddingRequired) {
          re = new RegExp(`^(?:${letters}{4})*(?:${letters}{3}=|${letters}{2}==)?$`, 'u');
        } else {
          re = new RegExp(`^(?:${letters}{4})*(?:${letters}{2,3}|${letters}{3}=|${letters}{2}==)?$`, 'u');
        }
        return (0, superstruct_1.pattern)(struct, re);
      };
      exports.base64 = base64;
    }, {
      "./assert": 34,
      "superstruct": 130
    }],
    36: [function (require, module, exports) {
      (function () {
        (function () {
          "use strict";

          Object.defineProperty(exports, "__esModule", {
            value: true
          });
          exports.createDataView = exports.concatBytes = exports.valueToBytes = exports.stringToBytes = exports.numberToBytes = exports.signedBigIntToBytes = exports.bigIntToBytes = exports.hexToBytes = exports.bytesToString = exports.bytesToNumber = exports.bytesToSignedBigInt = exports.bytesToBigInt = exports.bytesToHex = exports.assertIsBytes = exports.isBytes = void 0;
          const assert_1 = require("./assert");
          const hex_1 = require("./hex");
          const HEX_MINIMUM_NUMBER_CHARACTER = 48;
          const HEX_MAXIMUM_NUMBER_CHARACTER = 58;
          const HEX_CHARACTER_OFFSET = 87;
          function getPrecomputedHexValuesBuilder() {
            const lookupTable = [];
            return () => {
              if (lookupTable.length === 0) {
                for (let i = 0; i < 256; i++) {
                  lookupTable.push(i.toString(16).padStart(2, '0'));
                }
              }
              return lookupTable;
            };
          }
          const getPrecomputedHexValues = getPrecomputedHexValuesBuilder();
          function isBytes(value) {
            return value instanceof Uint8Array;
          }
          exports.isBytes = isBytes;
          function assertIsBytes(value) {
            (0, assert_1.assert)(isBytes(value), 'Value must be a Uint8Array.');
          }
          exports.assertIsBytes = assertIsBytes;
          function bytesToHex(bytes) {
            assertIsBytes(bytes);
            if (bytes.length === 0) {
              return '0x';
            }
            const lookupTable = getPrecomputedHexValues();
            const hexadecimal = new Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) {
              hexadecimal[i] = lookupTable[bytes[i]];
            }
            return (0, hex_1.add0x)(hexadecimal.join(''));
          }
          exports.bytesToHex = bytesToHex;
          function bytesToBigInt(bytes) {
            assertIsBytes(bytes);
            const hexadecimal = bytesToHex(bytes);
            return BigInt(hexadecimal);
          }
          exports.bytesToBigInt = bytesToBigInt;
          function bytesToSignedBigInt(bytes) {
            assertIsBytes(bytes);
            let value = BigInt(0);
            for (const byte of bytes) {
              value = (value << BigInt(8)) + BigInt(byte);
            }
            return BigInt.asIntN(bytes.length * 8, value);
          }
          exports.bytesToSignedBigInt = bytesToSignedBigInt;
          function bytesToNumber(bytes) {
            assertIsBytes(bytes);
            const bigint = bytesToBigInt(bytes);
            (0, assert_1.assert)(bigint <= BigInt(Number.MAX_SAFE_INTEGER), 'Number is not a safe integer. Use `bytesToBigInt` instead.');
            return Number(bigint);
          }
          exports.bytesToNumber = bytesToNumber;
          function bytesToString(bytes) {
            assertIsBytes(bytes);
            return new TextDecoder().decode(bytes);
          }
          exports.bytesToString = bytesToString;
          function hexToBytes(value) {
            var _a;
            if (((_a = value === null || value === void 0 ? void 0 : value.toLowerCase) === null || _a === void 0 ? void 0 : _a.call(value)) === '0x') {
              return new Uint8Array();
            }
            (0, hex_1.assertIsHexString)(value);
            const strippedValue = (0, hex_1.remove0x)(value).toLowerCase();
            const normalizedValue = strippedValue.length % 2 === 0 ? strippedValue : `0${strippedValue}`;
            const bytes = new Uint8Array(normalizedValue.length / 2);
            for (let i = 0; i < bytes.length; i++) {
              const c1 = normalizedValue.charCodeAt(i * 2);
              const c2 = normalizedValue.charCodeAt(i * 2 + 1);
              const n1 = c1 - (c1 < HEX_MAXIMUM_NUMBER_CHARACTER ? HEX_MINIMUM_NUMBER_CHARACTER : HEX_CHARACTER_OFFSET);
              const n2 = c2 - (c2 < HEX_MAXIMUM_NUMBER_CHARACTER ? HEX_MINIMUM_NUMBER_CHARACTER : HEX_CHARACTER_OFFSET);
              bytes[i] = n1 * 16 + n2;
            }
            return bytes;
          }
          exports.hexToBytes = hexToBytes;
          function bigIntToBytes(value) {
            (0, assert_1.assert)(typeof value === 'bigint', 'Value must be a bigint.');
            (0, assert_1.assert)(value >= BigInt(0), 'Value must be a non-negative bigint.');
            const hexadecimal = value.toString(16);
            return hexToBytes(hexadecimal);
          }
          exports.bigIntToBytes = bigIntToBytes;
          function bigIntFits(value, bytes) {
            (0, assert_1.assert)(bytes > 0);
            const mask = value >> BigInt(31);
            return !((~value & mask) + (value & ~mask) >> BigInt(bytes * 8 + ~0));
          }
          function signedBigIntToBytes(value, byteLength) {
            (0, assert_1.assert)(typeof value === 'bigint', 'Value must be a bigint.');
            (0, assert_1.assert)(typeof byteLength === 'number', 'Byte length must be a number.');
            (0, assert_1.assert)(byteLength > 0, 'Byte length must be greater than 0.');
            (0, assert_1.assert)(bigIntFits(value, byteLength), 'Byte length is too small to represent the given value.');
            let numberValue = value;
            const bytes = new Uint8Array(byteLength);
            for (let i = 0; i < bytes.length; i++) {
              bytes[i] = Number(BigInt.asUintN(8, numberValue));
              numberValue >>= BigInt(8);
            }
            return bytes.reverse();
          }
          exports.signedBigIntToBytes = signedBigIntToBytes;
          function numberToBytes(value) {
            (0, assert_1.assert)(typeof value === 'number', 'Value must be a number.');
            (0, assert_1.assert)(value >= 0, 'Value must be a non-negative number.');
            (0, assert_1.assert)(Number.isSafeInteger(value), 'Value is not a safe integer. Use `bigIntToBytes` instead.');
            const hexadecimal = value.toString(16);
            return hexToBytes(hexadecimal);
          }
          exports.numberToBytes = numberToBytes;
          function stringToBytes(value) {
            (0, assert_1.assert)(typeof value === 'string', 'Value must be a string.');
            return new TextEncoder().encode(value);
          }
          exports.stringToBytes = stringToBytes;
          function valueToBytes(value) {
            if (typeof value === 'bigint') {
              return bigIntToBytes(value);
            }
            if (typeof value === 'number') {
              return numberToBytes(value);
            }
            if (typeof value === 'string') {
              if (value.startsWith('0x')) {
                return hexToBytes(value);
              }
              return stringToBytes(value);
            }
            if (isBytes(value)) {
              return value;
            }
            throw new TypeError(`Unsupported value type: "${typeof value}".`);
          }
          exports.valueToBytes = valueToBytes;
          function concatBytes(values) {
            const normalizedValues = new Array(values.length);
            let byteLength = 0;
            for (let i = 0; i < values.length; i++) {
              const value = valueToBytes(values[i]);
              normalizedValues[i] = value;
              byteLength += value.length;
            }
            const bytes = new Uint8Array(byteLength);
            for (let i = 0, offset = 0; i < normalizedValues.length; i++) {
              bytes.set(normalizedValues[i], offset);
              offset += normalizedValues[i].length;
            }
            return bytes;
          }
          exports.concatBytes = concatBytes;
          function createDataView(bytes) {
            if (typeof Buffer !== 'undefined' && bytes instanceof Buffer) {
              const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
              return new DataView(buffer);
            }
            return new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
          }
          exports.createDataView = createDataView;
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "./assert": 34,
      "./hex": 41,
      "buffer": 139
    }],
    37: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ChecksumStruct = void 0;
      const superstruct_1 = require("superstruct");
      const base64_1 = require("./base64");
      exports.ChecksumStruct = (0, superstruct_1.size)((0, base64_1.base64)((0, superstruct_1.string)(), {
        paddingRequired: true
      }), 44, 44);
    }, {
      "./base64": 35,
      "superstruct": 130
    }],
    38: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.createHex = exports.createBytes = exports.createBigInt = exports.createNumber = void 0;
      const superstruct_1 = require("superstruct");
      const assert_1 = require("./assert");
      const bytes_1 = require("./bytes");
      const hex_1 = require("./hex");
      const NumberLikeStruct = (0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.bigint)(), (0, superstruct_1.string)(), hex_1.StrictHexStruct]);
      const NumberCoercer = (0, superstruct_1.coerce)((0, superstruct_1.number)(), NumberLikeStruct, Number);
      const BigIntCoercer = (0, superstruct_1.coerce)((0, superstruct_1.bigint)(), NumberLikeStruct, BigInt);
      const BytesLikeStruct = (0, superstruct_1.union)([hex_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array)]);
      const BytesCoercer = (0, superstruct_1.coerce)((0, superstruct_1.instance)(Uint8Array), (0, superstruct_1.union)([hex_1.StrictHexStruct]), bytes_1.hexToBytes);
      const HexCoercer = (0, superstruct_1.coerce)(hex_1.StrictHexStruct, (0, superstruct_1.instance)(Uint8Array), bytes_1.bytesToHex);
      function createNumber(value) {
        try {
          const result = (0, superstruct_1.create)(value, NumberCoercer);
          (0, assert_1.assert)(Number.isFinite(result), `Expected a number-like value, got "${value}".`);
          return result;
        } catch (error) {
          if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a number-like value, got "${value}".`);
          }
          throw error;
        }
      }
      exports.createNumber = createNumber;
      function createBigInt(value) {
        try {
          return (0, superstruct_1.create)(value, BigIntCoercer);
        } catch (error) {
          if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a number-like value, got "${String(error.value)}".`);
          }
          throw error;
        }
      }
      exports.createBigInt = createBigInt;
      function createBytes(value) {
        if (typeof value === 'string' && value.toLowerCase() === '0x') {
          return new Uint8Array();
        }
        try {
          return (0, superstruct_1.create)(value, BytesCoercer);
        } catch (error) {
          if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a bytes-like value, got "${String(error.value)}".`);
          }
          throw error;
        }
      }
      exports.createBytes = createBytes;
      function createHex(value) {
        if (value instanceof Uint8Array && value.length === 0 || typeof value === 'string' && value.toLowerCase() === '0x') {
          return '0x';
        }
        try {
          return (0, superstruct_1.create)(value, HexCoercer);
        } catch (error) {
          if (error instanceof superstruct_1.StructError) {
            throw new Error(`Expected a bytes-like value, got "${String(error.value)}".`);
          }
          throw error;
        }
      }
      exports.createHex = createHex;
    }, {
      "./assert": 34,
      "./bytes": 36,
      "./hex": 41,
      "superstruct": 130
    }],
    39: [function (require, module, exports) {
      "use strict";

      var __classPrivateFieldSet = this && this.__classPrivateFieldSet || function (receiver, state, value, kind, f) {
        if (kind === "m") throw new TypeError("Private method is not writable");
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
      };
      var __classPrivateFieldGet = this && this.__classPrivateFieldGet || function (receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
      };
      var _FrozenMap_map, _FrozenSet_set;
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.FrozenSet = exports.FrozenMap = void 0;
      class FrozenMap {
        constructor(entries) {
          _FrozenMap_map.set(this, void 0);
          __classPrivateFieldSet(this, _FrozenMap_map, new Map(entries), "f");
          Object.freeze(this);
        }
        get size() {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").size;
        }
        [(_FrozenMap_map = new WeakMap(), Symbol.iterator)]() {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f")[Symbol.iterator]();
        }
        entries() {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").entries();
        }
        forEach(callbackfn, thisArg) {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").forEach((value, key, _map) => callbackfn.call(thisArg, value, key, this));
        }
        get(key) {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").get(key);
        }
        has(key) {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").has(key);
        }
        keys() {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").keys();
        }
        values() {
          return __classPrivateFieldGet(this, _FrozenMap_map, "f").values();
        }
        toString() {
          return `FrozenMap(${this.size}) {${this.size > 0 ? ` ${[...this.entries()].map(([key, value]) => `${String(key)} => ${String(value)}`).join(', ')} ` : ''}}`;
        }
      }
      exports.FrozenMap = FrozenMap;
      class FrozenSet {
        constructor(values) {
          _FrozenSet_set.set(this, void 0);
          __classPrivateFieldSet(this, _FrozenSet_set, new Set(values), "f");
          Object.freeze(this);
        }
        get size() {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f").size;
        }
        [(_FrozenSet_set = new WeakMap(), Symbol.iterator)]() {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f")[Symbol.iterator]();
        }
        entries() {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f").entries();
        }
        forEach(callbackfn, thisArg) {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f").forEach((value, value2, _set) => callbackfn.call(thisArg, value, value2, this));
        }
        has(value) {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f").has(value);
        }
        keys() {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f").keys();
        }
        values() {
          return __classPrivateFieldGet(this, _FrozenSet_set, "f").values();
        }
        toString() {
          return `FrozenSet(${this.size}) {${this.size > 0 ? ` ${[...this.values()].map(member => String(member)).join(', ')} ` : ''}}`;
        }
      }
      exports.FrozenSet = FrozenSet;
      Object.freeze(FrozenMap);
      Object.freeze(FrozenMap.prototype);
      Object.freeze(FrozenSet);
      Object.freeze(FrozenSet.prototype);
    }, {}],
    40: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }, {}],
    41: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.remove0x = exports.add0x = exports.assertIsStrictHexString = exports.assertIsHexString = exports.isStrictHexString = exports.isHexString = exports.StrictHexStruct = exports.HexStruct = void 0;
      const superstruct_1 = require("superstruct");
      const assert_1 = require("./assert");
      exports.HexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^(?:0x)?[0-9a-f]+$/iu);
      exports.StrictHexStruct = (0, superstruct_1.pattern)((0, superstruct_1.string)(), /^0x[0-9a-f]+$/iu);
      function isHexString(value) {
        return (0, superstruct_1.is)(value, exports.HexStruct);
      }
      exports.isHexString = isHexString;
      function isStrictHexString(value) {
        return (0, superstruct_1.is)(value, exports.StrictHexStruct);
      }
      exports.isStrictHexString = isStrictHexString;
      function assertIsHexString(value) {
        (0, assert_1.assert)(isHexString(value), 'Value must be a hexadecimal string.');
      }
      exports.assertIsHexString = assertIsHexString;
      function assertIsStrictHexString(value) {
        (0, assert_1.assert)(isStrictHexString(value), 'Value must be a hexadecimal string, starting with "0x".');
      }
      exports.assertIsStrictHexString = assertIsStrictHexString;
      function add0x(hexadecimal) {
        if (hexadecimal.startsWith('0x')) {
          return hexadecimal;
        }
        if (hexadecimal.startsWith('0X')) {
          return `0x${hexadecimal.substring(2)}`;
        }
        return `0x${hexadecimal}`;
      }
      exports.add0x = add0x;
      function remove0x(hexadecimal) {
        if (hexadecimal.startsWith('0x') || hexadecimal.startsWith('0X')) {
          return hexadecimal.substring(2);
        }
        return hexadecimal;
      }
      exports.remove0x = remove0x;
    }, {
      "./assert": 34,
      "superstruct": 130
    }],
    42: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      __exportStar(require("./assert"), exports);
      __exportStar(require("./base64"), exports);
      __exportStar(require("./bytes"), exports);
      __exportStar(require("./checksum"), exports);
      __exportStar(require("./coercers"), exports);
      __exportStar(require("./collections"), exports);
      __exportStar(require("./encryption-types"), exports);
      __exportStar(require("./hex"), exports);
      __exportStar(require("./json"), exports);
      __exportStar(require("./keyring"), exports);
      __exportStar(require("./logging"), exports);
      __exportStar(require("./misc"), exports);
      __exportStar(require("./number"), exports);
      __exportStar(require("./opaque"), exports);
      __exportStar(require("./time"), exports);
      __exportStar(require("./transaction-types"), exports);
      __exportStar(require("./versions"), exports);
    }, {
      "./assert": 34,
      "./base64": 35,
      "./bytes": 36,
      "./checksum": 37,
      "./coercers": 38,
      "./collections": 39,
      "./encryption-types": 40,
      "./hex": 41,
      "./json": 43,
      "./keyring": 44,
      "./logging": 45,
      "./misc": 46,
      "./number": 47,
      "./opaque": 48,
      "./time": 49,
      "./transaction-types": 50,
      "./versions": 51
    }],
    43: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.getJsonRpcIdValidator = exports.assertIsJsonRpcError = exports.isJsonRpcError = exports.assertIsJsonRpcFailure = exports.isJsonRpcFailure = exports.assertIsJsonRpcSuccess = exports.isJsonRpcSuccess = exports.assertIsJsonRpcResponse = exports.isJsonRpcResponse = exports.assertIsPendingJsonRpcResponse = exports.isPendingJsonRpcResponse = exports.JsonRpcResponseStruct = exports.JsonRpcFailureStruct = exports.JsonRpcSuccessStruct = exports.PendingJsonRpcResponseStruct = exports.assertIsJsonRpcRequest = exports.isJsonRpcRequest = exports.assertIsJsonRpcNotification = exports.isJsonRpcNotification = exports.JsonRpcNotificationStruct = exports.JsonRpcRequestStruct = exports.JsonRpcParamsStruct = exports.JsonRpcErrorStruct = exports.JsonRpcIdStruct = exports.JsonRpcVersionStruct = exports.jsonrpc2 = exports.getJsonSize = exports.isValidJson = exports.JsonStruct = exports.UnsafeJsonStruct = void 0;
      const superstruct_1 = require("superstruct");
      const assert_1 = require("./assert");
      const finiteNumber = () => (0, superstruct_1.define)('finite number', value => {
        return (0, superstruct_1.is)(value, (0, superstruct_1.number)()) && Number.isFinite(value);
      });
      exports.UnsafeJsonStruct = (0, superstruct_1.union)([(0, superstruct_1.literal)(null), (0, superstruct_1.boolean)(), finiteNumber(), (0, superstruct_1.string)(), (0, superstruct_1.array)((0, superstruct_1.lazy)(() => exports.UnsafeJsonStruct)), (0, superstruct_1.record)((0, superstruct_1.string)(), (0, superstruct_1.lazy)(() => exports.UnsafeJsonStruct))]);
      exports.JsonStruct = (0, superstruct_1.define)('Json', (value, context) => {
        function checkStruct(innerValue, struct) {
          const iterator = struct.validator(innerValue, context);
          const errors = [...iterator];
          if (errors.length > 0) {
            return errors;
          }
          return true;
        }
        try {
          const unsafeResult = checkStruct(value, exports.UnsafeJsonStruct);
          if (unsafeResult !== true) {
            return unsafeResult;
          }
          return checkStruct(JSON.parse(JSON.stringify(value)), exports.UnsafeJsonStruct);
        } catch (error) {
          if (error instanceof RangeError) {
            return 'Circular reference detected';
          }
          return false;
        }
      });
      function isValidJson(value) {
        return (0, superstruct_1.is)(value, exports.JsonStruct);
      }
      exports.isValidJson = isValidJson;
      function getJsonSize(value) {
        (0, assert_1.assertStruct)(value, exports.JsonStruct, 'Invalid JSON value');
        const json = JSON.stringify(value);
        return new TextEncoder().encode(json).byteLength;
      }
      exports.getJsonSize = getJsonSize;
      exports.jsonrpc2 = '2.0';
      exports.JsonRpcVersionStruct = (0, superstruct_1.literal)(exports.jsonrpc2);
      exports.JsonRpcIdStruct = (0, superstruct_1.nullable)((0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.string)()]));
      exports.JsonRpcErrorStruct = (0, superstruct_1.object)({
        code: (0, superstruct_1.integer)(),
        message: (0, superstruct_1.string)(),
        data: (0, superstruct_1.optional)(exports.JsonStruct),
        stack: (0, superstruct_1.optional)((0, superstruct_1.string)())
      });
      exports.JsonRpcParamsStruct = (0, superstruct_1.optional)((0, superstruct_1.union)([(0, superstruct_1.record)((0, superstruct_1.string)(), exports.JsonStruct), (0, superstruct_1.array)(exports.JsonStruct)]));
      exports.JsonRpcRequestStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        method: (0, superstruct_1.string)(),
        params: exports.JsonRpcParamsStruct
      });
      exports.JsonRpcNotificationStruct = (0, superstruct_1.omit)(exports.JsonRpcRequestStruct, ['id']);
      function isJsonRpcNotification(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcNotificationStruct);
      }
      exports.isJsonRpcNotification = isJsonRpcNotification;
      function assertIsJsonRpcNotification(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcNotificationStruct, 'Invalid JSON-RPC notification', ErrorWrapper);
      }
      exports.assertIsJsonRpcNotification = assertIsJsonRpcNotification;
      function isJsonRpcRequest(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcRequestStruct);
      }
      exports.isJsonRpcRequest = isJsonRpcRequest;
      function assertIsJsonRpcRequest(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcRequestStruct, 'Invalid JSON-RPC request', ErrorWrapper);
      }
      exports.assertIsJsonRpcRequest = assertIsJsonRpcRequest;
      exports.PendingJsonRpcResponseStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        result: (0, superstruct_1.optional)((0, superstruct_1.unknown)()),
        error: (0, superstruct_1.optional)(exports.JsonRpcErrorStruct)
      });
      exports.JsonRpcSuccessStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        result: exports.JsonStruct
      });
      exports.JsonRpcFailureStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        error: exports.JsonRpcErrorStruct
      });
      exports.JsonRpcResponseStruct = (0, superstruct_1.union)([exports.JsonRpcSuccessStruct, exports.JsonRpcFailureStruct]);
      function isPendingJsonRpcResponse(response) {
        return (0, superstruct_1.is)(response, exports.PendingJsonRpcResponseStruct);
      }
      exports.isPendingJsonRpcResponse = isPendingJsonRpcResponse;
      function assertIsPendingJsonRpcResponse(response, ErrorWrapper) {
        (0, assert_1.assertStruct)(response, exports.PendingJsonRpcResponseStruct, 'Invalid pending JSON-RPC response', ErrorWrapper);
      }
      exports.assertIsPendingJsonRpcResponse = assertIsPendingJsonRpcResponse;
      function isJsonRpcResponse(response) {
        return (0, superstruct_1.is)(response, exports.JsonRpcResponseStruct);
      }
      exports.isJsonRpcResponse = isJsonRpcResponse;
      function assertIsJsonRpcResponse(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcResponseStruct, 'Invalid JSON-RPC response', ErrorWrapper);
      }
      exports.assertIsJsonRpcResponse = assertIsJsonRpcResponse;
      function isJsonRpcSuccess(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcSuccessStruct);
      }
      exports.isJsonRpcSuccess = isJsonRpcSuccess;
      function assertIsJsonRpcSuccess(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcSuccessStruct, 'Invalid JSON-RPC success response', ErrorWrapper);
      }
      exports.assertIsJsonRpcSuccess = assertIsJsonRpcSuccess;
      function isJsonRpcFailure(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcFailureStruct);
      }
      exports.isJsonRpcFailure = isJsonRpcFailure;
      function assertIsJsonRpcFailure(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcFailureStruct, 'Invalid JSON-RPC failure response', ErrorWrapper);
      }
      exports.assertIsJsonRpcFailure = assertIsJsonRpcFailure;
      function isJsonRpcError(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcErrorStruct);
      }
      exports.isJsonRpcError = isJsonRpcError;
      function assertIsJsonRpcError(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcErrorStruct, 'Invalid JSON-RPC error', ErrorWrapper);
      }
      exports.assertIsJsonRpcError = assertIsJsonRpcError;
      function getJsonRpcIdValidator(options) {
        const {
          permitEmptyString,
          permitFractions,
          permitNull
        } = Object.assign({
          permitEmptyString: true,
          permitFractions: false,
          permitNull: true
        }, options);
        const isValidJsonRpcId = id => {
          return Boolean(typeof id === 'number' && (permitFractions || Number.isInteger(id)) || typeof id === 'string' && (permitEmptyString || id.length > 0) || permitNull && id === null);
        };
        return isValidJsonRpcId;
      }
      exports.getJsonRpcIdValidator = getJsonRpcIdValidator;
    }, {
      "./assert": 34,
      "superstruct": 130
    }],
    44: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }, {}],
    45: [function (require, module, exports) {
      "use strict";

      var __importDefault = this && this.__importDefault || function (mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.createModuleLogger = exports.createProjectLogger = void 0;
      const debug_1 = __importDefault(require("debug"));
      const globalLogger = (0, debug_1.default)('metamask');
      function createProjectLogger(projectName) {
        return globalLogger.extend(projectName);
      }
      exports.createProjectLogger = createProjectLogger;
      function createModuleLogger(projectLogger, moduleName) {
        return projectLogger.extend(moduleName);
      }
      exports.createModuleLogger = createModuleLogger;
    }, {
      "debug": 82
    }],
    46: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.calculateNumberSize = exports.calculateStringSize = exports.isASCII = exports.isPlainObject = exports.ESCAPE_CHARACTERS_REGEXP = exports.JsonSize = exports.hasProperty = exports.isObject = exports.isNullOrUndefined = exports.isNonEmptyArray = void 0;
      function isNonEmptyArray(value) {
        return Array.isArray(value) && value.length > 0;
      }
      exports.isNonEmptyArray = isNonEmptyArray;
      function isNullOrUndefined(value) {
        return value === null || value === undefined;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isObject(value) {
        return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      }
      exports.isObject = isObject;
      const hasProperty = (objectToCheck, name) => Object.hasOwnProperty.call(objectToCheck, name);
      exports.hasProperty = hasProperty;
      var JsonSize;
      (function (JsonSize) {
        JsonSize[JsonSize["Null"] = 4] = "Null";
        JsonSize[JsonSize["Comma"] = 1] = "Comma";
        JsonSize[JsonSize["Wrapper"] = 1] = "Wrapper";
        JsonSize[JsonSize["True"] = 4] = "True";
        JsonSize[JsonSize["False"] = 5] = "False";
        JsonSize[JsonSize["Quote"] = 1] = "Quote";
        JsonSize[JsonSize["Colon"] = 1] = "Colon";
        JsonSize[JsonSize["Date"] = 24] = "Date";
      })(JsonSize = exports.JsonSize || (exports.JsonSize = {}));
      exports.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu;
      function isPlainObject(value) {
        if (typeof value !== 'object' || value === null) {
          return false;
        }
        try {
          let proto = value;
          while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
          }
          return Object.getPrototypeOf(value) === proto;
        } catch (_) {
          return false;
        }
      }
      exports.isPlainObject = isPlainObject;
      function isASCII(character) {
        return character.charCodeAt(0) <= 127;
      }
      exports.isASCII = isASCII;
      function calculateStringSize(value) {
        var _a;
        const size = value.split('').reduce((total, character) => {
          if (isASCII(character)) {
            return total + 1;
          }
          return total + 2;
        }, 0);
        return size + ((_a = value.match(exports.ESCAPE_CHARACTERS_REGEXP)) !== null && _a !== void 0 ? _a : []).length;
      }
      exports.calculateStringSize = calculateStringSize;
      function calculateNumberSize(value) {
        return value.toString().length;
      }
      exports.calculateNumberSize = calculateNumberSize;
    }, {}],
    47: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.hexToBigInt = exports.hexToNumber = exports.bigIntToHex = exports.numberToHex = void 0;
      const assert_1 = require("./assert");
      const hex_1 = require("./hex");
      const numberToHex = value => {
        (0, assert_1.assert)(typeof value === 'number', 'Value must be a number.');
        (0, assert_1.assert)(value >= 0, 'Value must be a non-negative number.');
        (0, assert_1.assert)(Number.isSafeInteger(value), 'Value is not a safe integer. Use `bigIntToHex` instead.');
        return (0, hex_1.add0x)(value.toString(16));
      };
      exports.numberToHex = numberToHex;
      const bigIntToHex = value => {
        (0, assert_1.assert)(typeof value === 'bigint', 'Value must be a bigint.');
        (0, assert_1.assert)(value >= 0, 'Value must be a non-negative bigint.');
        return (0, hex_1.add0x)(value.toString(16));
      };
      exports.bigIntToHex = bigIntToHex;
      const hexToNumber = value => {
        (0, hex_1.assertIsHexString)(value);
        const numberValue = parseInt(value, 16);
        (0, assert_1.assert)(Number.isSafeInteger(numberValue), 'Value is not a safe integer. Use `hexToBigInt` instead.');
        return numberValue;
      };
      exports.hexToNumber = hexToNumber;
      const hexToBigInt = value => {
        (0, hex_1.assertIsHexString)(value);
        return BigInt((0, hex_1.add0x)(value));
      };
      exports.hexToBigInt = hexToBigInt;
    }, {
      "./assert": 34,
      "./hex": 41
    }],
    48: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }, {}],
    49: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.timeSince = exports.inMilliseconds = exports.Duration = void 0;
      var Duration;
      (function (Duration) {
        Duration[Duration["Millisecond"] = 1] = "Millisecond";
        Duration[Duration["Second"] = 1000] = "Second";
        Duration[Duration["Minute"] = 60000] = "Minute";
        Duration[Duration["Hour"] = 3600000] = "Hour";
        Duration[Duration["Day"] = 86400000] = "Day";
        Duration[Duration["Week"] = 604800000] = "Week";
        Duration[Duration["Year"] = 31536000000] = "Year";
      })(Duration = exports.Duration || (exports.Duration = {}));
      const isNonNegativeInteger = number => Number.isInteger(number) && number >= 0;
      const assertIsNonNegativeInteger = (number, name) => {
        if (!isNonNegativeInteger(number)) {
          throw new Error(`"${name}" must be a non-negative integer. Received: "${number}".`);
        }
      };
      function inMilliseconds(count, duration) {
        assertIsNonNegativeInteger(count, 'count');
        return count * duration;
      }
      exports.inMilliseconds = inMilliseconds;
      function timeSince(timestamp) {
        assertIsNonNegativeInteger(timestamp, 'timestamp');
        return Date.now() - timestamp;
      }
      exports.timeSince = timeSince;
    }, {}],
    50: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
    }, {}],
    51: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.satisfiesVersionRange = exports.gtRange = exports.gtVersion = exports.assertIsSemVerRange = exports.assertIsSemVerVersion = exports.isValidSemVerRange = exports.isValidSemVerVersion = exports.VersionRangeStruct = exports.VersionStruct = void 0;
      const semver_1 = require("semver");
      const superstruct_1 = require("superstruct");
      const assert_1 = require("./assert");
      exports.VersionStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), 'Version', value => {
        if ((0, semver_1.valid)(value) === null) {
          return `Expected SemVer version, got "${value}"`;
        }
        return true;
      });
      exports.VersionRangeStruct = (0, superstruct_1.refine)((0, superstruct_1.string)(), 'Version range', value => {
        if ((0, semver_1.validRange)(value) === null) {
          return `Expected SemVer range, got "${value}"`;
        }
        return true;
      });
      function isValidSemVerVersion(version) {
        return (0, superstruct_1.is)(version, exports.VersionStruct);
      }
      exports.isValidSemVerVersion = isValidSemVerVersion;
      function isValidSemVerRange(versionRange) {
        return (0, superstruct_1.is)(versionRange, exports.VersionRangeStruct);
      }
      exports.isValidSemVerRange = isValidSemVerRange;
      function assertIsSemVerVersion(version) {
        (0, assert_1.assertStruct)(version, exports.VersionStruct);
      }
      exports.assertIsSemVerVersion = assertIsSemVerVersion;
      function assertIsSemVerRange(range) {
        (0, assert_1.assertStruct)(range, exports.VersionRangeStruct);
      }
      exports.assertIsSemVerRange = assertIsSemVerRange;
      function gtVersion(version1, version2) {
        return (0, semver_1.gt)(version1, version2);
      }
      exports.gtVersion = gtVersion;
      function gtRange(version, range) {
        return (0, semver_1.gtr)(version, range);
      }
      exports.gtRange = gtRange;
      function satisfiesVersionRange(version, versionRange) {
        return (0, semver_1.satisfies)(version, versionRange, {
          includePrerelease: true
        });
      }
      exports.satisfiesVersionRange = satisfiesVersionRange;
    }, {
      "./assert": 34,
      "semver": 113,
      "superstruct": 130
    }],
    52: [function (require, module, exports) {
      arguments[4][34][0].apply(exports, arguments);
    }, {
      "dup": 34,
      "superstruct": 130
    }],
    53: [function (require, module, exports) {
      arguments[4][35][0].apply(exports, arguments);
    }, {
      "./assert": 52,
      "dup": 35,
      "superstruct": 130
    }],
    54: [function (require, module, exports) {
      arguments[4][36][0].apply(exports, arguments);
    }, {
      "./assert": 52,
      "./hex": 58,
      "buffer": 139,
      "dup": 36
    }],
    55: [function (require, module, exports) {
      arguments[4][37][0].apply(exports, arguments);
    }, {
      "./base64": 53,
      "dup": 37,
      "superstruct": 130
    }],
    56: [function (require, module, exports) {
      arguments[4][38][0].apply(exports, arguments);
    }, {
      "./assert": 52,
      "./bytes": 54,
      "./hex": 58,
      "dup": 38,
      "superstruct": 130
    }],
    57: [function (require, module, exports) {
      arguments[4][39][0].apply(exports, arguments);
    }, {
      "dup": 39
    }],
    58: [function (require, module, exports) {
      arguments[4][41][0].apply(exports, arguments);
    }, {
      "./assert": 52,
      "dup": 41,
      "superstruct": 130
    }],
    59: [function (require, module, exports) {
      "use strict";

      var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            }
          };
        }
        Object.defineProperty(o, k2, desc);
      } : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
      var __exportStar = this && this.__exportStar || function (m, exports) {
        for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      __exportStar(require("./assert"), exports);
      __exportStar(require("./base64"), exports);
      __exportStar(require("./bytes"), exports);
      __exportStar(require("./checksum"), exports);
      __exportStar(require("./coercers"), exports);
      __exportStar(require("./collections"), exports);
      __exportStar(require("./hex"), exports);
      __exportStar(require("./json"), exports);
      __exportStar(require("./logging"), exports);
      __exportStar(require("./misc"), exports);
      __exportStar(require("./number"), exports);
      __exportStar(require("./opaque"), exports);
      __exportStar(require("./time"), exports);
      __exportStar(require("./versions"), exports);
    }, {
      "./assert": 52,
      "./base64": 53,
      "./bytes": 54,
      "./checksum": 55,
      "./coercers": 56,
      "./collections": 57,
      "./hex": 58,
      "./json": 60,
      "./logging": 61,
      "./misc": 62,
      "./number": 63,
      "./opaque": 64,
      "./time": 65,
      "./versions": 66
    }],
    60: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.validateJsonAndGetSize = exports.getJsonRpcIdValidator = exports.assertIsJsonRpcError = exports.isJsonRpcError = exports.assertIsJsonRpcFailure = exports.isJsonRpcFailure = exports.assertIsJsonRpcSuccess = exports.isJsonRpcSuccess = exports.assertIsJsonRpcResponse = exports.isJsonRpcResponse = exports.assertIsPendingJsonRpcResponse = exports.isPendingJsonRpcResponse = exports.JsonRpcResponseStruct = exports.JsonRpcFailureStruct = exports.JsonRpcSuccessStruct = exports.PendingJsonRpcResponseStruct = exports.assertIsJsonRpcRequest = exports.isJsonRpcRequest = exports.assertIsJsonRpcNotification = exports.isJsonRpcNotification = exports.JsonRpcNotificationStruct = exports.JsonRpcRequestStruct = exports.JsonRpcParamsStruct = exports.JsonRpcErrorStruct = exports.JsonRpcIdStruct = exports.JsonRpcVersionStruct = exports.jsonrpc2 = exports.isValidJson = exports.JsonStruct = void 0;
      const superstruct_1 = require("superstruct");
      const assert_1 = require("./assert");
      const misc_1 = require("./misc");
      exports.JsonStruct = (0, superstruct_1.define)('Json', value => {
        const [isValid] = validateJsonAndGetSize(value, true);
        if (!isValid) {
          return 'Expected a valid JSON-serializable value';
        }
        return true;
      });
      function isValidJson(value) {
        return (0, superstruct_1.is)(value, exports.JsonStruct);
      }
      exports.isValidJson = isValidJson;
      exports.jsonrpc2 = '2.0';
      exports.JsonRpcVersionStruct = (0, superstruct_1.literal)(exports.jsonrpc2);
      exports.JsonRpcIdStruct = (0, superstruct_1.nullable)((0, superstruct_1.union)([(0, superstruct_1.number)(), (0, superstruct_1.string)()]));
      exports.JsonRpcErrorStruct = (0, superstruct_1.object)({
        code: (0, superstruct_1.integer)(),
        message: (0, superstruct_1.string)(),
        data: (0, superstruct_1.optional)(exports.JsonStruct),
        stack: (0, superstruct_1.optional)((0, superstruct_1.string)())
      });
      exports.JsonRpcParamsStruct = (0, superstruct_1.optional)((0, superstruct_1.union)([(0, superstruct_1.record)((0, superstruct_1.string)(), exports.JsonStruct), (0, superstruct_1.array)(exports.JsonStruct)]));
      exports.JsonRpcRequestStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        method: (0, superstruct_1.string)(),
        params: exports.JsonRpcParamsStruct
      });
      exports.JsonRpcNotificationStruct = (0, superstruct_1.omit)(exports.JsonRpcRequestStruct, ['id']);
      function isJsonRpcNotification(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcNotificationStruct);
      }
      exports.isJsonRpcNotification = isJsonRpcNotification;
      function assertIsJsonRpcNotification(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcNotificationStruct, 'Invalid JSON-RPC notification', ErrorWrapper);
      }
      exports.assertIsJsonRpcNotification = assertIsJsonRpcNotification;
      function isJsonRpcRequest(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcRequestStruct);
      }
      exports.isJsonRpcRequest = isJsonRpcRequest;
      function assertIsJsonRpcRequest(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcRequestStruct, 'Invalid JSON-RPC request', ErrorWrapper);
      }
      exports.assertIsJsonRpcRequest = assertIsJsonRpcRequest;
      exports.PendingJsonRpcResponseStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        result: (0, superstruct_1.optional)((0, superstruct_1.unknown)()),
        error: (0, superstruct_1.optional)(exports.JsonRpcErrorStruct)
      });
      exports.JsonRpcSuccessStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        result: exports.JsonStruct
      });
      exports.JsonRpcFailureStruct = (0, superstruct_1.object)({
        id: exports.JsonRpcIdStruct,
        jsonrpc: exports.JsonRpcVersionStruct,
        error: exports.JsonRpcErrorStruct
      });
      exports.JsonRpcResponseStruct = (0, superstruct_1.union)([exports.JsonRpcSuccessStruct, exports.JsonRpcFailureStruct]);
      function isPendingJsonRpcResponse(response) {
        return (0, superstruct_1.is)(response, exports.PendingJsonRpcResponseStruct);
      }
      exports.isPendingJsonRpcResponse = isPendingJsonRpcResponse;
      function assertIsPendingJsonRpcResponse(response, ErrorWrapper) {
        (0, assert_1.assertStruct)(response, exports.PendingJsonRpcResponseStruct, 'Invalid pending JSON-RPC response', ErrorWrapper);
      }
      exports.assertIsPendingJsonRpcResponse = assertIsPendingJsonRpcResponse;
      function isJsonRpcResponse(response) {
        return (0, superstruct_1.is)(response, exports.JsonRpcResponseStruct);
      }
      exports.isJsonRpcResponse = isJsonRpcResponse;
      function assertIsJsonRpcResponse(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcResponseStruct, 'Invalid JSON-RPC response', ErrorWrapper);
      }
      exports.assertIsJsonRpcResponse = assertIsJsonRpcResponse;
      function isJsonRpcSuccess(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcSuccessStruct);
      }
      exports.isJsonRpcSuccess = isJsonRpcSuccess;
      function assertIsJsonRpcSuccess(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcSuccessStruct, 'Invalid JSON-RPC success response', ErrorWrapper);
      }
      exports.assertIsJsonRpcSuccess = assertIsJsonRpcSuccess;
      function isJsonRpcFailure(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcFailureStruct);
      }
      exports.isJsonRpcFailure = isJsonRpcFailure;
      function assertIsJsonRpcFailure(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcFailureStruct, 'Invalid JSON-RPC failure response', ErrorWrapper);
      }
      exports.assertIsJsonRpcFailure = assertIsJsonRpcFailure;
      function isJsonRpcError(value) {
        return (0, superstruct_1.is)(value, exports.JsonRpcErrorStruct);
      }
      exports.isJsonRpcError = isJsonRpcError;
      function assertIsJsonRpcError(value, ErrorWrapper) {
        (0, assert_1.assertStruct)(value, exports.JsonRpcErrorStruct, 'Invalid JSON-RPC error', ErrorWrapper);
      }
      exports.assertIsJsonRpcError = assertIsJsonRpcError;
      function getJsonRpcIdValidator(options) {
        const {
          permitEmptyString,
          permitFractions,
          permitNull
        } = Object.assign({
          permitEmptyString: true,
          permitFractions: false,
          permitNull: true
        }, options);
        const isValidJsonRpcId = id => {
          return Boolean(typeof id === 'number' && (permitFractions || Number.isInteger(id)) || typeof id === 'string' && (permitEmptyString || id.length > 0) || permitNull && id === null);
        };
        return isValidJsonRpcId;
      }
      exports.getJsonRpcIdValidator = getJsonRpcIdValidator;
      function validateJsonAndGetSize(jsObject, skipSizingProcess = false) {
        const seenObjects = new Set();
        function getJsonSerializableInfo(value, skipSizing) {
          if (value === undefined) {
            return [false, 0];
          } else if (value === null) {
            return [true, skipSizing ? 0 : misc_1.JsonSize.Null];
          }
          const typeOfValue = typeof value;
          try {
            if (typeOfValue === 'function') {
              return [false, 0];
            } else if (typeOfValue === 'string' || value instanceof String) {
              return [true, skipSizing ? 0 : (0, misc_1.calculateStringSize)(value) + misc_1.JsonSize.Quote * 2];
            } else if (typeOfValue === 'boolean' || value instanceof Boolean) {
              if (skipSizing) {
                return [true, 0];
              }
              return [true, value == true ? misc_1.JsonSize.True : misc_1.JsonSize.False];
            } else if (typeOfValue === 'number' || value instanceof Number) {
              if (skipSizing) {
                return [true, 0];
              }
              return [true, (0, misc_1.calculateNumberSize)(value)];
            } else if (value instanceof Date) {
              if (skipSizing) {
                return [true, 0];
              }
              return [true, isNaN(value.getDate()) ? misc_1.JsonSize.Null : misc_1.JsonSize.Date + misc_1.JsonSize.Quote * 2];
            }
          } catch (_) {
            return [false, 0];
          }
          if (!(0, misc_1.isPlainObject)(value) && !Array.isArray(value)) {
            return [false, 0];
          }
          if (seenObjects.has(value)) {
            return [false, 0];
          }
          seenObjects.add(value);
          try {
            return [true, Object.entries(value).reduce((sum, [key, nestedValue], idx, arr) => {
              let [valid, size] = getJsonSerializableInfo(nestedValue, skipSizing);
              if (!valid) {
                throw new Error('JSON validation did not pass. Validation process stopped.');
              }
              seenObjects.delete(value);
              if (skipSizing) {
                return 0;
              }
              const keySize = Array.isArray(value) ? 0 : key.length + misc_1.JsonSize.Comma + misc_1.JsonSize.Colon * 2;
              const separator = idx < arr.length - 1 ? misc_1.JsonSize.Comma : 0;
              return sum + keySize + size + separator;
            }, skipSizing ? 0 : misc_1.JsonSize.Wrapper * 2)];
          } catch (_) {
            return [false, 0];
          }
        }
        return getJsonSerializableInfo(jsObject, skipSizingProcess);
      }
      exports.validateJsonAndGetSize = validateJsonAndGetSize;
    }, {
      "./assert": 52,
      "./misc": 62,
      "superstruct": 130
    }],
    61: [function (require, module, exports) {
      arguments[4][45][0].apply(exports, arguments);
    }, {
      "debug": 82,
      "dup": 45
    }],
    62: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.calculateNumberSize = exports.calculateStringSize = exports.isASCII = exports.isPlainObject = exports.ESCAPE_CHARACTERS_REGEXP = exports.JsonSize = exports.hasProperty = exports.isObject = exports.isNullOrUndefined = exports.isNonEmptyArray = void 0;
      function isNonEmptyArray(value) {
        return Array.isArray(value) && value.length > 0;
      }
      exports.isNonEmptyArray = isNonEmptyArray;
      function isNullOrUndefined(value) {
        return value === null || value === undefined;
      }
      exports.isNullOrUndefined = isNullOrUndefined;
      function isObject(value) {
        return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
      }
      exports.isObject = isObject;
      const hasProperty = (object, name) => Object.hasOwnProperty.call(object, name);
      exports.hasProperty = hasProperty;
      var JsonSize;
      (function (JsonSize) {
        JsonSize[JsonSize["Null"] = 4] = "Null";
        JsonSize[JsonSize["Comma"] = 1] = "Comma";
        JsonSize[JsonSize["Wrapper"] = 1] = "Wrapper";
        JsonSize[JsonSize["True"] = 4] = "True";
        JsonSize[JsonSize["False"] = 5] = "False";
        JsonSize[JsonSize["Quote"] = 1] = "Quote";
        JsonSize[JsonSize["Colon"] = 1] = "Colon";
        JsonSize[JsonSize["Date"] = 24] = "Date";
      })(JsonSize = exports.JsonSize || (exports.JsonSize = {}));
      exports.ESCAPE_CHARACTERS_REGEXP = /"|\\|\n|\r|\t/gu;
      function isPlainObject(value) {
        if (typeof value !== 'object' || value === null) {
          return false;
        }
        try {
          let proto = value;
          while (Object.getPrototypeOf(proto) !== null) {
            proto = Object.getPrototypeOf(proto);
          }
          return Object.getPrototypeOf(value) === proto;
        } catch (_) {
          return false;
        }
      }
      exports.isPlainObject = isPlainObject;
      function isASCII(character) {
        return character.charCodeAt(0) <= 127;
      }
      exports.isASCII = isASCII;
      function calculateStringSize(value) {
        var _a;
        const size = value.split('').reduce((total, character) => {
          if (isASCII(character)) {
            return total + 1;
          }
          return total + 2;
        }, 0);
        return size + ((_a = value.match(exports.ESCAPE_CHARACTERS_REGEXP)) !== null && _a !== void 0 ? _a : []).length;
      }
      exports.calculateStringSize = calculateStringSize;
      function calculateNumberSize(value) {
        return value.toString().length;
      }
      exports.calculateNumberSize = calculateNumberSize;
    }, {}],
    63: [function (require, module, exports) {
      arguments[4][47][0].apply(exports, arguments);
    }, {
      "./assert": 52,
      "./hex": 58,
      "dup": 47
    }],
    64: [function (require, module, exports) {
      arguments[4][48][0].apply(exports, arguments);
    }, {
      "dup": 48
    }],
    65: [function (require, module, exports) {
      arguments[4][49][0].apply(exports, arguments);
    }, {
      "dup": 49
    }],
    66: [function (require, module, exports) {
      arguments[4][51][0].apply(exports, arguments);
    }, {
      "./assert": 52,
      "dup": 51,
      "semver": 113,
      "superstruct": 130
    }],
    67: [function (require, module, exports) {
      "use strict";

      var __importDefault = this && this.__importDefault || function (mod) {
        return mod && mod.__esModule ? mod : {
          "default": mod
        };
      };
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.utils = exports.curve25519 = exports.getSharedSecret = exports.verify = exports.sign = exports.getPublicKey = exports.Signature = exports.Point = exports.RistrettoPoint = exports.ExtendedPoint = exports.CURVE = void 0;
      const crypto_1 = __importDefault(require("crypto"));
      const _0n = BigInt(0);
      const _1n = BigInt(1);
      const _2n = BigInt(2);
      const _255n = BigInt(255);
      const CURVE_ORDER = _2n ** BigInt(252) + BigInt('27742317777372353535851937790883648493');
      const CURVE = {
        a: BigInt(-1),
        d: BigInt('37095705934669439343138083508754565189542113879843219016388785533085940283555'),
        P: _2n ** _255n - BigInt(19),
        l: CURVE_ORDER,
        n: CURVE_ORDER,
        h: BigInt(8),
        Gx: BigInt('15112221349535400772501151409588531511454012693041857206046113283949847762202'),
        Gy: BigInt('46316835694926478169428394003475163141307993866256225615783033603165251855960')
      };
      exports.CURVE = CURVE;
      const MAX_256B = _2n ** BigInt(256);
      const SQRT_M1 = BigInt('19681161376707505956807079304988542015446066515923890162744021073123829784752');
      const SQRT_D = BigInt('6853475219497561581579357271197624642482790079785650197046958215289687604742');
      const SQRT_AD_MINUS_ONE = BigInt('25063068953384623474111414158702152701244531502492656460079210482610430750235');
      const INVSQRT_A_MINUS_D = BigInt('54469307008909316920995813868745141605393597292927456921205312896311721017578');
      const ONE_MINUS_D_SQ = BigInt('1159843021668779879193775521855586647937357759715417654439879720876111806838');
      const D_MINUS_ONE_SQ = BigInt('40440834346308536858101042469323190826248399146238708352240133220865137265952');
      class ExtendedPoint {
        constructor(x, y, z, t) {
          this.x = x;
          this.y = y;
          this.z = z;
          this.t = t;
        }
        static fromAffine(p) {
          if (!(p instanceof Point)) {
            throw new TypeError('ExtendedPoint#fromAffine: expected Point');
          }
          if (p.equals(Point.ZERO)) return ExtendedPoint.ZERO;
          return new ExtendedPoint(p.x, p.y, _1n, mod(p.x * p.y));
        }
        static toAffineBatch(points) {
          const toInv = invertBatch(points.map(p => p.z));
          return points.map((p, i) => p.toAffine(toInv[i]));
        }
        static normalizeZ(points) {
          return this.toAffineBatch(points).map(this.fromAffine);
        }
        equals(other) {
          assertExtPoint(other);
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2
          } = other;
          const X1Z2 = mod(X1 * Z2);
          const X2Z1 = mod(X2 * Z1);
          const Y1Z2 = mod(Y1 * Z2);
          const Y2Z1 = mod(Y2 * Z1);
          return X1Z2 === X2Z1 && Y1Z2 === Y2Z1;
        }
        negate() {
          return new ExtendedPoint(mod(-this.x), this.y, this.z, mod(-this.t));
        }
        double() {
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            a
          } = CURVE;
          const A = mod(X1 ** _2n);
          const B = mod(Y1 ** _2n);
          const C = mod(_2n * mod(Z1 ** _2n));
          const D = mod(a * A);
          const E = mod(mod((X1 + Y1) ** _2n) - A - B);
          const G = D + B;
          const F = G - C;
          const H = D - B;
          const X3 = mod(E * F);
          const Y3 = mod(G * H);
          const T3 = mod(E * H);
          const Z3 = mod(F * G);
          return new ExtendedPoint(X3, Y3, Z3, T3);
        }
        add(other) {
          assertExtPoint(other);
          const {
            x: X1,
            y: Y1,
            z: Z1,
            t: T1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2,
            t: T2
          } = other;
          const A = mod((Y1 - X1) * (Y2 + X2));
          const B = mod((Y1 + X1) * (Y2 - X2));
          const F = mod(B - A);
          if (F === _0n) return this.double();
          const C = mod(Z1 * _2n * T2);
          const D = mod(T1 * _2n * Z2);
          const E = D + C;
          const G = B + A;
          const H = D - C;
          const X3 = mod(E * F);
          const Y3 = mod(G * H);
          const T3 = mod(E * H);
          const Z3 = mod(F * G);
          return new ExtendedPoint(X3, Y3, Z3, T3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        precomputeWindow(W) {
          const windows = 1 + 256 / W;
          const points = [];
          let p = this;
          let base = p;
          for (let window = 0; window < windows; window++) {
            base = p;
            points.push(base);
            for (let i = 1; i < 2 ** (W - 1); i++) {
              base = base.add(p);
              points.push(base);
            }
            p = base.double();
          }
          return points;
        }
        wNAF(n, affinePoint) {
          if (!affinePoint && this.equals(ExtendedPoint.BASE)) affinePoint = Point.BASE;
          const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
          if (256 % W) {
            throw new Error('Point#wNAF: Invalid precomputation window, must be power of 2');
          }
          let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
          if (!precomputes) {
            precomputes = this.precomputeWindow(W);
            if (affinePoint && W !== 1) {
              precomputes = ExtendedPoint.normalizeZ(precomputes);
              pointPrecomputes.set(affinePoint, precomputes);
            }
          }
          let p = ExtendedPoint.ZERO;
          let f = ExtendedPoint.ZERO;
          const windows = 1 + 256 / W;
          const windowSize = 2 ** (W - 1);
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);
          for (let window = 0; window < windows; window++) {
            const offset = window * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;
            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n;
            }
            if (wbits === 0) {
              let pr = precomputes[offset];
              if (window % 2) pr = pr.negate();
              f = f.add(pr);
            } else {
              let cached = precomputes[offset + Math.abs(wbits) - 1];
              if (wbits < 0) cached = cached.negate();
              p = p.add(cached);
            }
          }
          return ExtendedPoint.normalizeZ([p, f])[0];
        }
        multiply(scalar, affinePoint) {
          return this.wNAF(normalizeScalar(scalar, CURVE.l), affinePoint);
        }
        multiplyUnsafe(scalar) {
          let n = normalizeScalar(scalar, CURVE.l, false);
          const G = ExtendedPoint.BASE;
          const P0 = ExtendedPoint.ZERO;
          if (n === _0n) return P0;
          if (this.equals(P0) || n === _1n) return this;
          if (this.equals(G)) return this.wNAF(n);
          let p = P0;
          let d = this;
          while (n > _0n) {
            if (n & _1n) p = p.add(d);
            d = d.double();
            n >>= _1n;
          }
          return p;
        }
        isSmallOrder() {
          return this.multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
        }
        isTorsionFree() {
          return this.multiplyUnsafe(CURVE.l).equals(ExtendedPoint.ZERO);
        }
        toAffine(invZ = invert(this.z)) {
          const {
            x,
            y,
            z
          } = this;
          const ax = mod(x * invZ);
          const ay = mod(y * invZ);
          const zz = mod(z * invZ);
          if (zz !== _1n) throw new Error('invZ was invalid');
          return new Point(ax, ay);
        }
        fromRistrettoBytes() {
          legacyRist();
        }
        toRistrettoBytes() {
          legacyRist();
        }
        fromRistrettoHash() {
          legacyRist();
        }
      }
      exports.ExtendedPoint = ExtendedPoint;
      ExtendedPoint.BASE = new ExtendedPoint(CURVE.Gx, CURVE.Gy, _1n, mod(CURVE.Gx * CURVE.Gy));
      ExtendedPoint.ZERO = new ExtendedPoint(_0n, _1n, _1n, _0n);
      function assertExtPoint(other) {
        if (!(other instanceof ExtendedPoint)) throw new TypeError('ExtendedPoint expected');
      }
      function assertRstPoint(other) {
        if (!(other instanceof RistrettoPoint)) throw new TypeError('RistrettoPoint expected');
      }
      function legacyRist() {
        throw new Error('Legacy method: switch to RistrettoPoint');
      }
      class RistrettoPoint {
        constructor(ep) {
          this.ep = ep;
        }
        static calcElligatorRistrettoMap(r0) {
          const {
            d
          } = CURVE;
          const r = mod(SQRT_M1 * r0 * r0);
          const Ns = mod((r + _1n) * ONE_MINUS_D_SQ);
          let c = BigInt(-1);
          const D = mod((c - d * r) * mod(r + d));
          let {
            isValid: Ns_D_is_sq,
            value: s
          } = uvRatio(Ns, D);
          let s_ = mod(s * r0);
          if (!edIsNegative(s_)) s_ = mod(-s_);
          if (!Ns_D_is_sq) s = s_;
          if (!Ns_D_is_sq) c = r;
          const Nt = mod(c * (r - _1n) * D_MINUS_ONE_SQ - D);
          const s2 = s * s;
          const W0 = mod((s + s) * D);
          const W1 = mod(Nt * SQRT_AD_MINUS_ONE);
          const W2 = mod(_1n - s2);
          const W3 = mod(_1n + s2);
          return new ExtendedPoint(mod(W0 * W3), mod(W2 * W1), mod(W1 * W3), mod(W0 * W2));
        }
        static hashToCurve(hex) {
          hex = ensureBytes(hex, 64);
          const r1 = bytes255ToNumberLE(hex.slice(0, 32));
          const R1 = this.calcElligatorRistrettoMap(r1);
          const r2 = bytes255ToNumberLE(hex.slice(32, 64));
          const R2 = this.calcElligatorRistrettoMap(r2);
          return new RistrettoPoint(R1.add(R2));
        }
        static fromHex(hex) {
          hex = ensureBytes(hex, 32);
          const {
            a,
            d
          } = CURVE;
          const emsg = 'RistrettoPoint.fromHex: the hex is not valid encoding of RistrettoPoint';
          const s = bytes255ToNumberLE(hex);
          if (!equalBytes(numberTo32BytesLE(s), hex) || edIsNegative(s)) throw new Error(emsg);
          const s2 = mod(s * s);
          const u1 = mod(_1n + a * s2);
          const u2 = mod(_1n - a * s2);
          const u1_2 = mod(u1 * u1);
          const u2_2 = mod(u2 * u2);
          const v = mod(a * d * u1_2 - u2_2);
          const {
            isValid,
            value: I
          } = invertSqrt(mod(v * u2_2));
          const Dx = mod(I * u2);
          const Dy = mod(I * Dx * v);
          let x = mod((s + s) * Dx);
          if (edIsNegative(x)) x = mod(-x);
          const y = mod(u1 * Dy);
          const t = mod(x * y);
          if (!isValid || edIsNegative(t) || y === _0n) throw new Error(emsg);
          return new RistrettoPoint(new ExtendedPoint(x, y, _1n, t));
        }
        toRawBytes() {
          let {
            x,
            y,
            z,
            t
          } = this.ep;
          const u1 = mod(mod(z + y) * mod(z - y));
          const u2 = mod(x * y);
          const {
            value: invsqrt
          } = invertSqrt(mod(u1 * u2 ** _2n));
          const D1 = mod(invsqrt * u1);
          const D2 = mod(invsqrt * u2);
          const zInv = mod(D1 * D2 * t);
          let D;
          if (edIsNegative(t * zInv)) {
            let _x = mod(y * SQRT_M1);
            let _y = mod(x * SQRT_M1);
            x = _x;
            y = _y;
            D = mod(D1 * INVSQRT_A_MINUS_D);
          } else {
            D = D2;
          }
          if (edIsNegative(x * zInv)) y = mod(-y);
          let s = mod((z - y) * D);
          if (edIsNegative(s)) s = mod(-s);
          return numberTo32BytesLE(s);
        }
        toHex() {
          return bytesToHex(this.toRawBytes());
        }
        toString() {
          return this.toHex();
        }
        equals(other) {
          assertRstPoint(other);
          const a = this.ep;
          const b = other.ep;
          const one = mod(a.x * b.y) === mod(a.y * b.x);
          const two = mod(a.y * b.y) === mod(a.x * b.x);
          return one || two;
        }
        add(other) {
          assertRstPoint(other);
          return new RistrettoPoint(this.ep.add(other.ep));
        }
        subtract(other) {
          assertRstPoint(other);
          return new RistrettoPoint(this.ep.subtract(other.ep));
        }
        multiply(scalar) {
          return new RistrettoPoint(this.ep.multiply(scalar));
        }
        multiplyUnsafe(scalar) {
          return new RistrettoPoint(this.ep.multiplyUnsafe(scalar));
        }
      }
      exports.RistrettoPoint = RistrettoPoint;
      RistrettoPoint.BASE = new RistrettoPoint(ExtendedPoint.BASE);
      RistrettoPoint.ZERO = new RistrettoPoint(ExtendedPoint.ZERO);
      const pointPrecomputes = new WeakMap();
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
        _setWindowSize(windowSize) {
          this._WINDOW_SIZE = windowSize;
          pointPrecomputes.delete(this);
        }
        static fromHex(hex, strict = true) {
          const {
            d,
            P
          } = CURVE;
          hex = ensureBytes(hex, 32);
          const normed = hex.slice();
          normed[31] = hex[31] & ~0x80;
          const y = bytesToNumberLE(normed);
          if (strict && y >= P) throw new Error('Expected 0 < hex < P');
          if (!strict && y >= MAX_256B) throw new Error('Expected 0 < hex < 2**256');
          const y2 = mod(y * y);
          const u = mod(y2 - _1n);
          const v = mod(d * y2 + _1n);
          let {
            isValid,
            value: x
          } = uvRatio(u, v);
          if (!isValid) throw new Error('Point.fromHex: invalid y coordinate');
          const isXOdd = (x & _1n) === _1n;
          const isLastByteOdd = (hex[31] & 0x80) !== 0;
          if (isLastByteOdd !== isXOdd) {
            x = mod(-x);
          }
          return new Point(x, y);
        }
        static async fromPrivateKey(privateKey) {
          return (await getExtendedPublicKey(privateKey)).point;
        }
        toRawBytes() {
          const bytes = numberTo32BytesLE(this.y);
          bytes[31] |= this.x & _1n ? 0x80 : 0;
          return bytes;
        }
        toHex() {
          return bytesToHex(this.toRawBytes());
        }
        toX25519() {
          const {
            y
          } = this;
          const u = mod((_1n + y) * invert(_1n - y));
          return numberTo32BytesLE(u);
        }
        isTorsionFree() {
          return ExtendedPoint.fromAffine(this).isTorsionFree();
        }
        equals(other) {
          return this.x === other.x && this.y === other.y;
        }
        negate() {
          return new Point(mod(-this.x), this.y);
        }
        add(other) {
          return ExtendedPoint.fromAffine(this).add(ExtendedPoint.fromAffine(other)).toAffine();
        }
        subtract(other) {
          return this.add(other.negate());
        }
        multiply(scalar) {
          return ExtendedPoint.fromAffine(this).multiply(scalar, this).toAffine();
        }
      }
      exports.Point = Point;
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
      Point.ZERO = new Point(_0n, _1n);
      class Signature {
        constructor(r, s) {
          this.r = r;
          this.s = s;
          this.assertValidity();
        }
        static fromHex(hex) {
          const bytes = ensureBytes(hex, 64);
          const r = Point.fromHex(bytes.slice(0, 32), false);
          const s = bytesToNumberLE(bytes.slice(32, 64));
          return new Signature(r, s);
        }
        assertValidity() {
          const {
            r,
            s
          } = this;
          if (!(r instanceof Point)) throw new Error('Expected Point instance');
          normalizeScalar(s, CURVE.l, false);
          return this;
        }
        toRawBytes() {
          const u8 = new Uint8Array(64);
          u8.set(this.r.toRawBytes());
          u8.set(numberTo32BytesLE(this.s), 32);
          return u8;
        }
        toHex() {
          return bytesToHex(this.toRawBytes());
        }
      }
      exports.Signature = Signature;
      function concatBytes(...arrays) {
        if (!arrays.every(a => a instanceof Uint8Array)) throw new Error('Expected Uint8Array list');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }
        return result;
      }
      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));
      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
        let hex = '';
        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }
        return hex;
      }
      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }
        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
        const array = new Uint8Array(hex.length / 2);
        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }
        return array;
      }
      function numberTo32BytesBE(num) {
        const length = 32;
        const hex = num.toString(16).padStart(length * 2, '0');
        return hexToBytes(hex);
      }
      function numberTo32BytesLE(num) {
        return numberTo32BytesBE(num).reverse();
      }
      function edIsNegative(num) {
        return (mod(num) & _1n) === _1n;
      }
      function bytesToNumberLE(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Expected Uint8Array');
        return BigInt('0x' + bytesToHex(Uint8Array.from(uint8a).reverse()));
      }
      function bytes255ToNumberLE(bytes) {
        return mod(bytesToNumberLE(bytes) & _2n ** _255n - _1n);
      }
      function mod(a, b = CURVE.P) {
        const res = a % b;
        return res >= _0n ? res : b + res;
      }
      function invert(number, modulo = CURVE.P) {
        if (number === _0n || modulo <= _0n) {
          throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
        }
        let a = mod(number, modulo);
        let b = modulo;
        let x = _0n,
          y = _1n,
          u = _1n,
          v = _0n;
        while (a !== _0n) {
          const q = b / a;
          const r = b % a;
          const m = x - u * q;
          const n = y - v * q;
          b = a, a = r, x = u, y = v, u = m, v = n;
        }
        const gcd = b;
        if (gcd !== _1n) throw new Error('invert: does not exist');
        return mod(x, modulo);
      }
      function invertBatch(nums, p = CURVE.P) {
        const tmp = new Array(nums.length);
        const lastMultiplied = nums.reduce((acc, num, i) => {
          if (num === _0n) return acc;
          tmp[i] = acc;
          return mod(acc * num, p);
        }, _1n);
        const inverted = invert(lastMultiplied, p);
        nums.reduceRight((acc, num, i) => {
          if (num === _0n) return acc;
          tmp[i] = mod(acc * tmp[i], p);
          return mod(acc * num, p);
        }, inverted);
        return tmp;
      }
      function pow2(x, power) {
        const {
          P
        } = CURVE;
        let res = x;
        while (power-- > _0n) {
          res *= res;
          res %= P;
        }
        return res;
      }
      function pow_2_252_3(x) {
        const {
          P
        } = CURVE;
        const _5n = BigInt(5);
        const _10n = BigInt(10);
        const _20n = BigInt(20);
        const _40n = BigInt(40);
        const _80n = BigInt(80);
        const x2 = x * x % P;
        const b2 = x2 * x % P;
        const b4 = pow2(b2, _2n) * b2 % P;
        const b5 = pow2(b4, _1n) * x % P;
        const b10 = pow2(b5, _5n) * b5 % P;
        const b20 = pow2(b10, _10n) * b10 % P;
        const b40 = pow2(b20, _20n) * b20 % P;
        const b80 = pow2(b40, _40n) * b40 % P;
        const b160 = pow2(b80, _80n) * b80 % P;
        const b240 = pow2(b160, _80n) * b80 % P;
        const b250 = pow2(b240, _10n) * b10 % P;
        const pow_p_5_8 = pow2(b250, _2n) * x % P;
        return {
          pow_p_5_8,
          b2
        };
      }
      function uvRatio(u, v) {
        const v3 = mod(v * v * v);
        const v7 = mod(v3 * v3 * v);
        const pow = pow_2_252_3(u * v7).pow_p_5_8;
        let x = mod(u * v3 * pow);
        const vx2 = mod(v * x * x);
        const root1 = x;
        const root2 = mod(x * SQRT_M1);
        const useRoot1 = vx2 === u;
        const useRoot2 = vx2 === mod(-u);
        const noRoot = vx2 === mod(-u * SQRT_M1);
        if (useRoot1) x = root1;
        if (useRoot2 || noRoot) x = root2;
        if (edIsNegative(x)) x = mod(-x);
        return {
          isValid: useRoot1 || useRoot2,
          value: x
        };
      }
      function invertSqrt(number) {
        return uvRatio(_1n, number);
      }
      async function sha512ModqLE(...args) {
        const hash = await exports.utils.sha512(concatBytes(...args));
        const value = bytesToNumberLE(hash);
        return mod(value, CURVE.l);
      }
      function equalBytes(b1, b2) {
        if (b1.length !== b2.length) {
          return false;
        }
        for (let i = 0; i < b1.length; i++) {
          if (b1[i] !== b2[i]) {
            return false;
          }
        }
        return true;
      }
      function ensureBytes(hex, expectedLength) {
        const bytes = hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
        if (typeof expectedLength === 'number' && bytes.length !== expectedLength) throw new Error(`Expected ${expectedLength} bytes`);
        return bytes;
      }
      function normalizeScalar(num, max, strict = true) {
        if (!max) throw new TypeError('Specify max value');
        if (typeof num === 'number' && Number.isSafeInteger(num)) num = BigInt(num);
        if (typeof num === 'bigint' && num < max) {
          if (strict) {
            if (_0n < num) return num;
          } else {
            if (_0n <= num) return num;
          }
        }
        throw new TypeError('Expected valid scalar: 0 < scalar < max');
      }
      function adjustBytes25519(bytes) {
        bytes[0] &= 248;
        bytes[31] &= 127;
        bytes[31] |= 64;
        return bytes;
      }
      function decodeScalar25519(n) {
        return bytesToNumberLE(adjustBytes25519(ensureBytes(n, 32)));
      }
      async function getExtendedPublicKey(key) {
        key = typeof key === 'bigint' || typeof key === 'number' ? numberTo32BytesBE(normalizeScalar(key, MAX_256B)) : ensureBytes(key);
        if (key.length !== 32) throw new Error(`Expected 32 bytes`);
        const hashed = await exports.utils.sha512(key);
        const head = adjustBytes25519(hashed.slice(0, 32));
        const prefix = hashed.slice(32, 64);
        const scalar = mod(bytesToNumberLE(head), CURVE.l);
        const point = Point.BASE.multiply(scalar);
        const pointBytes = point.toRawBytes();
        return {
          head,
          prefix,
          scalar,
          point,
          pointBytes
        };
      }
      async function getPublicKey(privateKey) {
        return (await getExtendedPublicKey(privateKey)).pointBytes;
      }
      exports.getPublicKey = getPublicKey;
      async function sign(message, privateKey) {
        message = ensureBytes(message);
        const {
          prefix,
          scalar,
          pointBytes
        } = await getExtendedPublicKey(privateKey);
        const r = await sha512ModqLE(prefix, message);
        const R = Point.BASE.multiply(r);
        const k = await sha512ModqLE(R.toRawBytes(), pointBytes, message);
        const s = mod(r + k * scalar, CURVE.l);
        return new Signature(R, s).toRawBytes();
      }
      exports.sign = sign;
      async function verify(sig, message, publicKey) {
        message = ensureBytes(message);
        if (!(publicKey instanceof Point)) publicKey = Point.fromHex(publicKey, false);
        const {
          r,
          s
        } = sig instanceof Signature ? sig.assertValidity() : Signature.fromHex(sig);
        const SB = ExtendedPoint.BASE.multiplyUnsafe(s);
        const k = await sha512ModqLE(r.toRawBytes(), publicKey.toRawBytes(), message);
        const kA = ExtendedPoint.fromAffine(publicKey).multiplyUnsafe(k);
        const RkA = ExtendedPoint.fromAffine(r).add(kA);
        return RkA.subtract(SB).multiplyUnsafe(CURVE.h).equals(ExtendedPoint.ZERO);
      }
      exports.verify = verify;
      async function getSharedSecret(privateKey, publicKey) {
        const {
          head
        } = await getExtendedPublicKey(privateKey);
        const u = Point.fromHex(publicKey).toX25519();
        return exports.curve25519.scalarMult(head, u);
      }
      exports.getSharedSecret = getSharedSecret;
      Point.BASE._setWindowSize(8);
      function cswap(swap, x_2, x_3) {
        const dummy = mod(swap * (x_2 - x_3));
        x_2 = mod(x_2 - dummy);
        x_3 = mod(x_3 + dummy);
        return [x_2, x_3];
      }
      function montgomeryLadder(pointU, scalar) {
        const {
          P
        } = CURVE;
        const u = normalizeScalar(pointU, P);
        const k = normalizeScalar(scalar, P);
        const a24 = BigInt(121665);
        const x_1 = u;
        let x_2 = _1n;
        let z_2 = _0n;
        let x_3 = u;
        let z_3 = _1n;
        let swap = _0n;
        let sw;
        for (let t = BigInt(255 - 1); t >= _0n; t--) {
          const k_t = k >> t & _1n;
          swap ^= k_t;
          sw = cswap(swap, x_2, x_3);
          x_2 = sw[0];
          x_3 = sw[1];
          sw = cswap(swap, z_2, z_3);
          z_2 = sw[0];
          z_3 = sw[1];
          swap = k_t;
          const A = x_2 + z_2;
          const AA = mod(A * A);
          const B = x_2 - z_2;
          const BB = mod(B * B);
          const E = AA - BB;
          const C = x_3 + z_3;
          const D = x_3 - z_3;
          const DA = mod(D * A);
          const CB = mod(C * B);
          x_3 = mod((DA + CB) ** _2n);
          z_3 = mod(x_1 * (DA - CB) ** _2n);
          x_2 = mod(AA * BB);
          z_2 = mod(E * (AA + mod(a24 * E)));
        }
        sw = cswap(swap, x_2, x_3);
        x_2 = sw[0];
        x_3 = sw[1];
        sw = cswap(swap, z_2, z_3);
        z_2 = sw[0];
        z_3 = sw[1];
        const {
          pow_p_5_8,
          b2
        } = pow_2_252_3(z_2);
        const xp2 = mod(pow2(pow_p_5_8, BigInt(3)) * b2);
        return mod(x_2 * xp2);
      }
      function encodeUCoordinate(u) {
        return numberTo32BytesLE(mod(u, CURVE.P));
      }
      function decodeUCoordinate(uEnc) {
        const u = ensureBytes(uEnc, 32);
        u[31] &= 127;
        return bytesToNumberLE(u);
      }
      exports.curve25519 = {
        BASE_POINT_U: '0900000000000000000000000000000000000000000000000000000000000000',
        scalarMult(privateKey, publicKey) {
          const u = decodeUCoordinate(publicKey);
          const p = decodeScalar25519(privateKey);
          const pu = montgomeryLadder(u, p);
          if (pu === _0n) throw new Error('Invalid private or public key received');
          return encodeUCoordinate(pu);
        },
        scalarMultBase(privateKey) {
          return exports.curve25519.scalarMult(privateKey, exports.curve25519.BASE_POINT_U);
        }
      };
      const crypto = {
        node: crypto_1.default,
        web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
      };
      exports.utils = {
        TORSION_SUBGROUP: ['0100000000000000000000000000000000000000000000000000000000000000', 'c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac037a', '0000000000000000000000000000000000000000000000000000000000000080', '26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc05', 'ecffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff7f', '26e8958fc2b227b045c3f489f2ef98f0d5dfac05d3c63339b13802886d53fc85', '0000000000000000000000000000000000000000000000000000000000000000', 'c7176a703d4dd84fba3c0b760d10670f2a2053fa2c39ccc64ec7fd7792ac03fa'],
        bytesToHex,
        getExtendedPublicKey,
        mod,
        invert,
        hashToPrivateScalar: hash => {
          hash = ensureBytes(hash);
          if (hash.length < 40 || hash.length > 1024) throw new Error('Expected 40-1024 bytes of private key as per FIPS 186');
          const num = mod(bytesToNumberLE(hash), CURVE.l);
          if (num === _0n || num === _1n) throw new Error('Invalid private key');
          return num;
        },
        randomBytes: (bytesLength = 32) => {
          if (crypto.web) {
            return crypto.web.getRandomValues(new Uint8Array(bytesLength));
          } else if (crypto.node) {
            const {
              randomBytes
            } = crypto.node;
            return new Uint8Array(randomBytes(bytesLength).buffer);
          } else {
            throw new Error("The environment doesn't have randomBytes function");
          }
        },
        randomPrivateKey: () => {
          return exports.utils.randomBytes(32);
        },
        sha512: async message => {
          if (crypto.web) {
            const buffer = await crypto.web.subtle.digest('SHA-512', message.buffer);
            return new Uint8Array(buffer);
          } else if (crypto.node) {
            return Uint8Array.from(crypto.node.createHash('sha512').update(message).digest());
          } else {
            throw new Error("The environment doesn't have sha512 function");
          }
        },
        precompute(windowSize = 8, point = Point.BASE) {
          const cached = point.equals(Point.BASE) ? point : new Point(point.x, point.y);
          cached._setWindowSize(windowSize);
          cached.multiply(_2n);
          return cached;
        }
      };
    }, {
      "crypto": 138
    }],
    68: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.output = exports.exists = exports.hash = exports.bytes = exports.bool = exports.number = void 0;
      function number(n) {
        if (!Number.isSafeInteger(n) || n < 0) throw new Error(`Wrong positive integer: ${n}`);
      }
      exports.number = number;
      function bool(b) {
        if (typeof b !== 'boolean') throw new Error(`Expected boolean, not ${b}`);
      }
      exports.bool = bool;
      function bytes(b, ...lengths) {
        if (!(b instanceof Uint8Array)) throw new TypeError('Expected Uint8Array');
        if (lengths.length > 0 && !lengths.includes(b.length)) throw new TypeError(`Expected Uint8Array of length ${lengths}, not of length=${b.length}`);
      }
      exports.bytes = bytes;
      function hash(hash) {
        if (typeof hash !== 'function' || typeof hash.create !== 'function') throw new Error('Hash should be wrapped by utils.wrapConstructor');
        number(hash.outputLen);
        number(hash.blockLen);
      }
      exports.hash = hash;
      function exists(instance, checkFinished = true) {
        if (instance.destroyed) throw new Error('Hash instance has been destroyed');
        if (checkFinished && instance.finished) throw new Error('Hash#digest() has already been called');
      }
      exports.exists = exists;
      function output(out, instance) {
        bytes(out);
        const min = instance.outputLen;
        if (out.length < min) {
          throw new Error(`digestInto() expects output buffer of length at least ${min}`);
        }
      }
      exports.output = output;
      const assert = {
        number,
        bool,
        bytes,
        hash,
        exists,
        output
      };
      exports.default = assert;
    }, {}],
    69: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.SHA2 = void 0;
      const _assert_js_1 = require("./_assert.js");
      const utils_js_1 = require("./utils.js");
      function setBigUint64(view, byteOffset, value, isLE) {
        if (typeof view.setBigUint64 === 'function') return view.setBigUint64(byteOffset, value, isLE);
        const _32n = BigInt(32);
        const _u32_max = BigInt(0xffffffff);
        const wh = Number(value >> _32n & _u32_max);
        const wl = Number(value & _u32_max);
        const h = isLE ? 4 : 0;
        const l = isLE ? 0 : 4;
        view.setUint32(byteOffset + h, wh, isLE);
        view.setUint32(byteOffset + l, wl, isLE);
      }
      class SHA2 extends utils_js_1.Hash {
        constructor(blockLen, outputLen, padOffset, isLE) {
          super();
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE;
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.buffer = new Uint8Array(blockLen);
          this.view = (0, utils_js_1.createView)(this.buffer);
        }
        update(data) {
          _assert_js_1.default.exists(this);
          const {
            view,
            buffer,
            blockLen
          } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;
          for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = (0, utils_js_1.createView)(data);
              for (; blockLen <= len - pos; pos += blockLen) this.process(dataView, pos);
              continue;
            }
            buffer.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          _assert_js_1.default.exists(this);
          _assert_js_1.default.output(out, this);
          this.finished = true;
          const {
            buffer,
            view,
            blockLen,
            isLE
          } = this;
          let {
            pos
          } = this;
          buffer[pos++] = 0b10000000;
          this.buffer.subarray(pos).fill(0);
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++) buffer[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE);
          this.process(view, 0);
          const oview = (0, utils_js_1.createView)(out);
          const len = this.outputLen;
          if (len % 4) throw new Error('_sha2: outputLen should be aligned to 32bit');
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length) throw new Error('_sha2: outputLen bigger than state');
          for (let i = 0; i < outLen; i++) oview.setUint32(4 * i, state[i], isLE);
        }
        digest() {
          const {
            buffer,
            outputLen
          } = this;
          this.digestInto(buffer);
          const res = buffer.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const {
            blockLen,
            buffer,
            length,
            finished,
            destroyed,
            pos
          } = this;
          to.length = length;
          to.pos = pos;
          to.finished = finished;
          to.destroyed = destroyed;
          if (length % blockLen) to.buffer.set(buffer);
          return to;
        }
      }
      exports.SHA2 = SHA2;
    }, {
      "./_assert.js": 68,
      "./utils.js": 77
    }],
    70: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.add = exports.toBig = exports.split = exports.fromBig = void 0;
      const U32_MASK64 = BigInt(2 ** 32 - 1);
      const _32n = BigInt(32);
      function fromBig(n, le = false) {
        if (le) return {
          h: Number(n & U32_MASK64),
          l: Number(n >> _32n & U32_MASK64)
        };
        return {
          h: Number(n >> _32n & U32_MASK64) | 0,
          l: Number(n & U32_MASK64) | 0
        };
      }
      exports.fromBig = fromBig;
      function split(lst, le = false) {
        let Ah = new Uint32Array(lst.length);
        let Al = new Uint32Array(lst.length);
        for (let i = 0; i < lst.length; i++) {
          const {
            h,
            l
          } = fromBig(lst[i], le);
          [Ah[i], Al[i]] = [h, l];
        }
        return [Ah, Al];
      }
      exports.split = split;
      const toBig = (h, l) => BigInt(h >>> 0) << _32n | BigInt(l >>> 0);
      exports.toBig = toBig;
      const shrSH = (h, l, s) => h >>> s;
      const shrSL = (h, l, s) => h << 32 - s | l >>> s;
      const rotrSH = (h, l, s) => h >>> s | l << 32 - s;
      const rotrSL = (h, l, s) => h << 32 - s | l >>> s;
      const rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
      const rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
      const rotr32H = (h, l) => l;
      const rotr32L = (h, l) => h;
      const rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      const rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      const rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      const rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
      function add(Ah, Al, Bh, Bl) {
        const l = (Al >>> 0) + (Bl >>> 0);
        return {
          h: Ah + Bh + (l / 2 ** 32 | 0) | 0,
          l: l | 0
        };
      }
      exports.add = add;
      const add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
      const add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
      const add4L = (Al, Bl, Cl, Dl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0);
      const add4H = (low, Ah, Bh, Ch, Dh) => Ah + Bh + Ch + Dh + (low / 2 ** 32 | 0) | 0;
      const add5L = (Al, Bl, Cl, Dl, El) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0) + (Dl >>> 0) + (El >>> 0);
      const add5H = (low, Ah, Bh, Ch, Dh, Eh) => Ah + Bh + Ch + Dh + Eh + (low / 2 ** 32 | 0) | 0;
      const u64 = {
        fromBig,
        split,
        toBig: exports.toBig,
        shrSH,
        shrSL,
        rotrSH,
        rotrSL,
        rotrBH,
        rotrBL,
        rotr32H,
        rotr32L,
        rotlSH,
        rotlSL,
        rotlBH,
        rotlBL,
        add,
        add3L,
        add3H,
        add4L,
        add4H,
        add5H,
        add5L
      };
      exports.default = u64;
    }, {}],
    71: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.crypto = void 0;
      exports.crypto = typeof globalThis === 'object' && 'crypto' in globalThis ? globalThis.crypto : undefined;
    }, {}],
    72: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.hmac = void 0;
      const _assert_js_1 = require("./_assert.js");
      const utils_js_1 = require("./utils.js");
      class HMAC extends utils_js_1.Hash {
        constructor(hash, _key) {
          super();
          this.finished = false;
          this.destroyed = false;
          _assert_js_1.default.hash(hash);
          const key = (0, utils_js_1.toBytes)(_key);
          this.iHash = hash.create();
          if (typeof this.iHash.update !== 'function') throw new TypeError('Expected instance of class which extends utils.Hash');
          this.blockLen = this.iHash.blockLen;
          this.outputLen = this.iHash.outputLen;
          const blockLen = this.blockLen;
          const pad = new Uint8Array(blockLen);
          pad.set(key.length > blockLen ? hash.create().update(key).digest() : key);
          for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36;
          this.iHash.update(pad);
          this.oHash = hash.create();
          for (let i = 0; i < pad.length; i++) pad[i] ^= 0x36 ^ 0x5c;
          this.oHash.update(pad);
          pad.fill(0);
        }
        update(buf) {
          _assert_js_1.default.exists(this);
          this.iHash.update(buf);
          return this;
        }
        digestInto(out) {
          _assert_js_1.default.exists(this);
          _assert_js_1.default.bytes(out, this.outputLen);
          this.finished = true;
          this.iHash.digestInto(out);
          this.oHash.update(out);
          this.oHash.digestInto(out);
          this.destroy();
        }
        digest() {
          const out = new Uint8Array(this.oHash.outputLen);
          this.digestInto(out);
          return out;
        }
        _cloneInto(to) {
          to || (to = Object.create(Object.getPrototypeOf(this), {}));
          const {
            oHash,
            iHash,
            finished,
            destroyed,
            blockLen,
            outputLen
          } = this;
          to = to;
          to.finished = finished;
          to.destroyed = destroyed;
          to.blockLen = blockLen;
          to.outputLen = outputLen;
          to.oHash = oHash._cloneInto(to.oHash);
          to.iHash = iHash._cloneInto(to.iHash);
          return to;
        }
        destroy() {
          this.destroyed = true;
          this.oHash.destroy();
          this.iHash.destroy();
        }
      }
      const hmac = (hash, key, message) => new HMAC(hash, key).update(message).digest();
      exports.hmac = hmac;
      exports.hmac.create = (hash, key) => new HMAC(hash, key);
    }, {
      "./_assert.js": 68,
      "./utils.js": 77
    }],
    73: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ripemd160 = exports.RIPEMD160 = void 0;
      const _sha2_js_1 = require("./_sha2.js");
      const utils_js_1 = require("./utils.js");
      const Rho = new Uint8Array([7, 4, 13, 1, 10, 6, 15, 3, 12, 0, 9, 5, 2, 14, 11, 8]);
      const Id = Uint8Array.from({
        length: 16
      }, (_, i) => i);
      const Pi = Id.map(i => (9 * i + 5) % 16);
      let idxL = [Id];
      let idxR = [Pi];
      for (let i = 0; i < 4; i++) for (let j of [idxL, idxR]) j.push(j[i].map(k => Rho[k]));
      const shifts = [[11, 14, 15, 12, 5, 8, 7, 9, 11, 13, 14, 15, 6, 7, 9, 8], [12, 13, 11, 15, 6, 9, 9, 7, 12, 15, 11, 13, 7, 8, 7, 7], [13, 15, 14, 11, 7, 7, 6, 8, 13, 14, 13, 12, 5, 5, 6, 9], [14, 11, 12, 14, 8, 6, 5, 5, 15, 12, 15, 14, 9, 9, 8, 6], [15, 12, 13, 13, 9, 5, 8, 6, 14, 11, 12, 11, 8, 6, 5, 5]].map(i => new Uint8Array(i));
      const shiftsL = idxL.map((idx, i) => idx.map(j => shifts[i][j]));
      const shiftsR = idxR.map((idx, i) => idx.map(j => shifts[i][j]));
      const Kl = new Uint32Array([0x00000000, 0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xa953fd4e]);
      const Kr = new Uint32Array([0x50a28be6, 0x5c4dd124, 0x6d703ef3, 0x7a6d76e9, 0x00000000]);
      const rotl = (word, shift) => word << shift | word >>> 32 - shift;
      function f(group, x, y, z) {
        if (group === 0) return x ^ y ^ z;else if (group === 1) return x & y | ~x & z;else if (group === 2) return (x | ~y) ^ z;else if (group === 3) return x & z | y & ~z;else return x ^ (y | ~z);
      }
      const BUF = new Uint32Array(16);
      class RIPEMD160 extends _sha2_js_1.SHA2 {
        constructor() {
          super(64, 20, 8, true);
          this.h0 = 0x67452301 | 0;
          this.h1 = 0xefcdab89 | 0;
          this.h2 = 0x98badcfe | 0;
          this.h3 = 0x10325476 | 0;
          this.h4 = 0xc3d2e1f0 | 0;
        }
        get() {
          const {
            h0,
            h1,
            h2,
            h3,
            h4
          } = this;
          return [h0, h1, h2, h3, h4];
        }
        set(h0, h1, h2, h3, h4) {
          this.h0 = h0 | 0;
          this.h1 = h1 | 0;
          this.h2 = h2 | 0;
          this.h3 = h3 | 0;
          this.h4 = h4 | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) BUF[i] = view.getUint32(offset, true);
          let al = this.h0 | 0,
            ar = al,
            bl = this.h1 | 0,
            br = bl,
            cl = this.h2 | 0,
            cr = cl,
            dl = this.h3 | 0,
            dr = dl,
            el = this.h4 | 0,
            er = el;
          for (let group = 0; group < 5; group++) {
            const rGroup = 4 - group;
            const hbl = Kl[group],
              hbr = Kr[group];
            const rl = idxL[group],
              rr = idxR[group];
            const sl = shiftsL[group],
              sr = shiftsR[group];
            for (let i = 0; i < 16; i++) {
              const tl = rotl(al + f(group, bl, cl, dl) + BUF[rl[i]] + hbl, sl[i]) + el | 0;
              al = el, el = dl, dl = rotl(cl, 10) | 0, cl = bl, bl = tl;
            }
            for (let i = 0; i < 16; i++) {
              const tr = rotl(ar + f(rGroup, br, cr, dr) + BUF[rr[i]] + hbr, sr[i]) + er | 0;
              ar = er, er = dr, dr = rotl(cr, 10) | 0, cr = br, br = tr;
            }
          }
          this.set(this.h1 + cl + dr | 0, this.h2 + dl + er | 0, this.h3 + el + ar | 0, this.h4 + al + br | 0, this.h0 + bl + cr | 0);
        }
        roundClean() {
          BUF.fill(0);
        }
        destroy() {
          this.destroyed = true;
          this.buffer.fill(0);
          this.set(0, 0, 0, 0, 0);
        }
      }
      exports.RIPEMD160 = RIPEMD160;
      exports.ripemd160 = (0, utils_js_1.wrapConstructor)(() => new RIPEMD160());
    }, {
      "./_sha2.js": 69,
      "./utils.js": 77
    }],
    74: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sha224 = exports.sha256 = void 0;
      const _sha2_js_1 = require("./_sha2.js");
      const utils_js_1 = require("./utils.js");
      const Chi = (a, b, c) => a & b ^ ~a & c;
      const Maj = (a, b, c) => a & b ^ a & c ^ b & c;
      const SHA256_K = new Uint32Array([0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5, 0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174, 0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da, 0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967, 0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85, 0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070, 0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3, 0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2]);
      const IV = new Uint32Array([0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19]);
      const SHA256_W = new Uint32Array(64);
      class SHA256 extends _sha2_js_1.SHA2 {
        constructor() {
          super(64, 32, 8, false);
          this.A = IV[0] | 0;
          this.B = IV[1] | 0;
          this.C = IV[2] | 0;
          this.D = IV[3] | 0;
          this.E = IV[4] | 0;
          this.F = IV[5] | 0;
          this.G = IV[6] | 0;
          this.H = IV[7] | 0;
        }
        get() {
          const {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
          } = this;
          return [A, B, C, D, E, F, G, H];
        }
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = (0, utils_js_1.rotr)(W15, 7) ^ (0, utils_js_1.rotr)(W15, 18) ^ W15 >>> 3;
            const s1 = (0, utils_js_1.rotr)(W2, 17) ^ (0, utils_js_1.rotr)(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let {
            A,
            B,
            C,
            D,
            E,
            F,
            G,
            H
          } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = (0, utils_js_1.rotr)(E, 6) ^ (0, utils_js_1.rotr)(E, 11) ^ (0, utils_js_1.rotr)(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = (0, utils_js_1.rotr)(A, 2) ^ (0, utils_js_1.rotr)(A, 13) ^ (0, utils_js_1.rotr)(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          SHA256_W.fill(0);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          this.buffer.fill(0);
        }
      }
      class SHA224 extends SHA256 {
        constructor() {
          super();
          this.A = 0xc1059ed8 | 0;
          this.B = 0x367cd507 | 0;
          this.C = 0x3070dd17 | 0;
          this.D = 0xf70e5939 | 0;
          this.E = 0xffc00b31 | 0;
          this.F = 0x68581511 | 0;
          this.G = 0x64f98fa7 | 0;
          this.H = 0xbefa4fa4 | 0;
          this.outputLen = 28;
        }
      }
      exports.sha256 = (0, utils_js_1.wrapConstructor)(() => new SHA256());
      exports.sha224 = (0, utils_js_1.wrapConstructor)(() => new SHA224());
    }, {
      "./_sha2.js": 69,
      "./utils.js": 77
    }],
    75: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.shake256 = exports.shake128 = exports.keccak_512 = exports.keccak_384 = exports.keccak_256 = exports.keccak_224 = exports.sha3_512 = exports.sha3_384 = exports.sha3_256 = exports.sha3_224 = exports.Keccak = exports.keccakP = void 0;
      const _assert_js_1 = require("./_assert.js");
      const _u64_js_1 = require("./_u64.js");
      const utils_js_1 = require("./utils.js");
      const [SHA3_PI, SHA3_ROTL, _SHA3_IOTA] = [[], [], []];
      const _0n = BigInt(0);
      const _1n = BigInt(1);
      const _2n = BigInt(2);
      const _7n = BigInt(7);
      const _256n = BigInt(256);
      const _0x71n = BigInt(0x71);
      for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
        [x, y] = [y, (2 * x + 3 * y) % 5];
        SHA3_PI.push(2 * (5 * y + x));
        SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
        let t = _0n;
        for (let j = 0; j < 7; j++) {
          R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
          if (R & _2n) t ^= _1n << (_1n << BigInt(j)) - _1n;
        }
        _SHA3_IOTA.push(t);
      }
      const [SHA3_IOTA_H, SHA3_IOTA_L] = _u64_js_1.default.split(_SHA3_IOTA, true);
      const rotlH = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBH(h, l, s) : _u64_js_1.default.rotlSH(h, l, s);
      const rotlL = (h, l, s) => s > 32 ? _u64_js_1.default.rotlBL(h, l, s) : _u64_js_1.default.rotlSL(h, l, s);
      function keccakP(s, rounds = 24) {
        const B = new Uint32Array(5 * 2);
        for (let round = 24 - rounds; round < 24; round++) {
          for (let x = 0; x < 10; x++) B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
          for (let x = 0; x < 10; x += 2) {
            const idx1 = (x + 8) % 10;
            const idx0 = (x + 2) % 10;
            const B0 = B[idx0];
            const B1 = B[idx0 + 1];
            const Th = rotlH(B0, B1, 1) ^ B[idx1];
            const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
            for (let y = 0; y < 50; y += 10) {
              s[x + y] ^= Th;
              s[x + y + 1] ^= Tl;
            }
          }
          let curH = s[2];
          let curL = s[3];
          for (let t = 0; t < 24; t++) {
            const shift = SHA3_ROTL[t];
            const Th = rotlH(curH, curL, shift);
            const Tl = rotlL(curH, curL, shift);
            const PI = SHA3_PI[t];
            curH = s[PI];
            curL = s[PI + 1];
            s[PI] = Th;
            s[PI + 1] = Tl;
          }
          for (let y = 0; y < 50; y += 10) {
            for (let x = 0; x < 10; x++) B[x] = s[y + x];
            for (let x = 0; x < 10; x++) s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
          }
          s[0] ^= SHA3_IOTA_H[round];
          s[1] ^= SHA3_IOTA_L[round];
        }
        B.fill(0);
      }
      exports.keccakP = keccakP;
      class Keccak extends utils_js_1.Hash {
        constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
          super();
          this.blockLen = blockLen;
          this.suffix = suffix;
          this.outputLen = outputLen;
          this.enableXOF = enableXOF;
          this.rounds = rounds;
          this.pos = 0;
          this.posOut = 0;
          this.finished = false;
          this.destroyed = false;
          _assert_js_1.default.number(outputLen);
          if (0 >= this.blockLen || this.blockLen >= 200) throw new Error('Sha3 supports only keccak-f1600 function');
          this.state = new Uint8Array(200);
          this.state32 = (0, utils_js_1.u32)(this.state);
        }
        keccak() {
          keccakP(this.state32, this.rounds);
          this.posOut = 0;
          this.pos = 0;
        }
        update(data) {
          _assert_js_1.default.exists(this);
          const {
            blockLen,
            state
          } = this;
          data = (0, utils_js_1.toBytes)(data);
          const len = data.length;
          for (let pos = 0; pos < len;) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++) state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen) this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished) return;
          this.finished = true;
          const {
            state,
            suffix,
            pos,
            blockLen
          } = this;
          state[pos] ^= suffix;
          if ((suffix & 0x80) !== 0 && pos === blockLen - 1) this.keccak();
          state[blockLen - 1] ^= 0x80;
          this.keccak();
        }
        writeInto(out) {
          _assert_js_1.default.exists(this, false);
          _assert_js_1.default.bytes(out);
          this.finish();
          const bufferOut = this.state;
          const {
            blockLen
          } = this;
          for (let pos = 0, len = out.length; pos < len;) {
            if (this.posOut >= blockLen) this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
          }
          return out;
        }
        xofInto(out) {
          if (!this.enableXOF) throw new Error('XOF is not possible for this instance');
          return this.writeInto(out);
        }
        xof(bytes) {
          _assert_js_1.default.number(bytes);
          return this.xofInto(new Uint8Array(bytes));
        }
        digestInto(out) {
          _assert_js_1.default.output(out, this);
          if (this.finished) throw new Error('digest() was already called');
          this.writeInto(out);
          this.destroy();
          return out;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          this.destroyed = true;
          this.state.fill(0);
        }
        _cloneInto(to) {
          const {
            blockLen,
            suffix,
            outputLen,
            rounds,
            enableXOF
          } = this;
          to || (to = new Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
          to.state32.set(this.state32);
          to.pos = this.pos;
          to.posOut = this.posOut;
          to.finished = this.finished;
          to.rounds = rounds;
          to.suffix = suffix;
          to.outputLen = outputLen;
          to.enableXOF = enableXOF;
          to.destroyed = this.destroyed;
          return to;
        }
      }
      exports.Keccak = Keccak;
      const gen = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructor)(() => new Keccak(blockLen, suffix, outputLen));
      exports.sha3_224 = gen(0x06, 144, 224 / 8);
      exports.sha3_256 = gen(0x06, 136, 256 / 8);
      exports.sha3_384 = gen(0x06, 104, 384 / 8);
      exports.sha3_512 = gen(0x06, 72, 512 / 8);
      exports.keccak_224 = gen(0x01, 144, 224 / 8);
      exports.keccak_256 = gen(0x01, 136, 256 / 8);
      exports.keccak_384 = gen(0x01, 104, 384 / 8);
      exports.keccak_512 = gen(0x01, 72, 512 / 8);
      const genShake = (suffix, blockLen, outputLen) => (0, utils_js_1.wrapConstructorWithOpts)((opts = {}) => new Keccak(blockLen, suffix, opts.dkLen === undefined ? outputLen : opts.dkLen, true));
      exports.shake128 = genShake(0x1f, 168, 128 / 8);
      exports.shake256 = genShake(0x1f, 136, 256 / 8);
    }, {
      "./_assert.js": 68,
      "./_u64.js": 70,
      "./utils.js": 77
    }],
    76: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.sha384 = exports.sha512_256 = exports.sha512_224 = exports.sha512 = exports.SHA512 = void 0;
      const _sha2_js_1 = require("./_sha2.js");
      const _u64_js_1 = require("./_u64.js");
      const utils_js_1 = require("./utils.js");
      const [SHA512_Kh, SHA512_Kl] = _u64_js_1.default.split(['0x428a2f98d728ae22', '0x7137449123ef65cd', '0xb5c0fbcfec4d3b2f', '0xe9b5dba58189dbbc', '0x3956c25bf348b538', '0x59f111f1b605d019', '0x923f82a4af194f9b', '0xab1c5ed5da6d8118', '0xd807aa98a3030242', '0x12835b0145706fbe', '0x243185be4ee4b28c', '0x550c7dc3d5ffb4e2', '0x72be5d74f27b896f', '0x80deb1fe3b1696b1', '0x9bdc06a725c71235', '0xc19bf174cf692694', '0xe49b69c19ef14ad2', '0xefbe4786384f25e3', '0x0fc19dc68b8cd5b5', '0x240ca1cc77ac9c65', '0x2de92c6f592b0275', '0x4a7484aa6ea6e483', '0x5cb0a9dcbd41fbd4', '0x76f988da831153b5', '0x983e5152ee66dfab', '0xa831c66d2db43210', '0xb00327c898fb213f', '0xbf597fc7beef0ee4', '0xc6e00bf33da88fc2', '0xd5a79147930aa725', '0x06ca6351e003826f', '0x142929670a0e6e70', '0x27b70a8546d22ffc', '0x2e1b21385c26c926', '0x4d2c6dfc5ac42aed', '0x53380d139d95b3df', '0x650a73548baf63de', '0x766a0abb3c77b2a8', '0x81c2c92e47edaee6', '0x92722c851482353b', '0xa2bfe8a14cf10364', '0xa81a664bbc423001', '0xc24b8b70d0f89791', '0xc76c51a30654be30', '0xd192e819d6ef5218', '0xd69906245565a910', '0xf40e35855771202a', '0x106aa07032bbd1b8', '0x19a4c116b8d2d0c8', '0x1e376c085141ab53', '0x2748774cdf8eeb99', '0x34b0bcb5e19b48a8', '0x391c0cb3c5c95a63', '0x4ed8aa4ae3418acb', '0x5b9cca4f7763e373', '0x682e6ff3d6b2b8a3', '0x748f82ee5defb2fc', '0x78a5636f43172f60', '0x84c87814a1f0ab72', '0x8cc702081a6439ec', '0x90befffa23631e28', '0xa4506cebde82bde9', '0xbef9a3f7b2c67915', '0xc67178f2e372532b', '0xca273eceea26619c', '0xd186b8c721c0c207', '0xeada7dd6cde0eb1e', '0xf57d4f7fee6ed178', '0x06f067aa72176fba', '0x0a637dc5a2c898a6', '0x113f9804bef90dae', '0x1b710b35131c471b', '0x28db77f523047d84', '0x32caab7b40c72493', '0x3c9ebe0a15c9bebc', '0x431d67c49c100d4c', '0x4cc5d4becb3e42b6', '0x597f299cfc657e2a', '0x5fcb6fab3ad6faec', '0x6c44198c4a475817'].map(n => BigInt(n)));
      const SHA512_W_H = new Uint32Array(80);
      const SHA512_W_L = new Uint32Array(80);
      class SHA512 extends _sha2_js_1.SHA2 {
        constructor() {
          super(128, 64, 16, false);
          this.Ah = 0x6a09e667 | 0;
          this.Al = 0xf3bcc908 | 0;
          this.Bh = 0xbb67ae85 | 0;
          this.Bl = 0x84caa73b | 0;
          this.Ch = 0x3c6ef372 | 0;
          this.Cl = 0xfe94f82b | 0;
          this.Dh = 0xa54ff53a | 0;
          this.Dl = 0x5f1d36f1 | 0;
          this.Eh = 0x510e527f | 0;
          this.El = 0xade682d1 | 0;
          this.Fh = 0x9b05688c | 0;
          this.Fl = 0x2b3e6c1f | 0;
          this.Gh = 0x1f83d9ab | 0;
          this.Gl = 0xfb41bd6b | 0;
          this.Hh = 0x5be0cd19 | 0;
          this.Hl = 0x137e2179 | 0;
        }
        get() {
          const {
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
          } = this;
          return [Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl];
        }
        set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl) {
          this.Ah = Ah | 0;
          this.Al = Al | 0;
          this.Bh = Bh | 0;
          this.Bl = Bl | 0;
          this.Ch = Ch | 0;
          this.Cl = Cl | 0;
          this.Dh = Dh | 0;
          this.Dl = Dl | 0;
          this.Eh = Eh | 0;
          this.El = El | 0;
          this.Fh = Fh | 0;
          this.Fl = Fl | 0;
          this.Gh = Gh | 0;
          this.Gl = Gl | 0;
          this.Hh = Hh | 0;
          this.Hl = Hl | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4) {
            SHA512_W_H[i] = view.getUint32(offset);
            SHA512_W_L[i] = view.getUint32(offset += 4);
          }
          for (let i = 16; i < 80; i++) {
            const W15h = SHA512_W_H[i - 15] | 0;
            const W15l = SHA512_W_L[i - 15] | 0;
            const s0h = _u64_js_1.default.rotrSH(W15h, W15l, 1) ^ _u64_js_1.default.rotrSH(W15h, W15l, 8) ^ _u64_js_1.default.shrSH(W15h, W15l, 7);
            const s0l = _u64_js_1.default.rotrSL(W15h, W15l, 1) ^ _u64_js_1.default.rotrSL(W15h, W15l, 8) ^ _u64_js_1.default.shrSL(W15h, W15l, 7);
            const W2h = SHA512_W_H[i - 2] | 0;
            const W2l = SHA512_W_L[i - 2] | 0;
            const s1h = _u64_js_1.default.rotrSH(W2h, W2l, 19) ^ _u64_js_1.default.rotrBH(W2h, W2l, 61) ^ _u64_js_1.default.shrSH(W2h, W2l, 6);
            const s1l = _u64_js_1.default.rotrSL(W2h, W2l, 19) ^ _u64_js_1.default.rotrBL(W2h, W2l, 61) ^ _u64_js_1.default.shrSL(W2h, W2l, 6);
            const SUMl = _u64_js_1.default.add4L(s0l, s1l, SHA512_W_L[i - 7], SHA512_W_L[i - 16]);
            const SUMh = _u64_js_1.default.add4H(SUMl, s0h, s1h, SHA512_W_H[i - 7], SHA512_W_H[i - 16]);
            SHA512_W_H[i] = SUMh | 0;
            SHA512_W_L[i] = SUMl | 0;
          }
          let {
            Ah,
            Al,
            Bh,
            Bl,
            Ch,
            Cl,
            Dh,
            Dl,
            Eh,
            El,
            Fh,
            Fl,
            Gh,
            Gl,
            Hh,
            Hl
          } = this;
          for (let i = 0; i < 80; i++) {
            const sigma1h = _u64_js_1.default.rotrSH(Eh, El, 14) ^ _u64_js_1.default.rotrSH(Eh, El, 18) ^ _u64_js_1.default.rotrBH(Eh, El, 41);
            const sigma1l = _u64_js_1.default.rotrSL(Eh, El, 14) ^ _u64_js_1.default.rotrSL(Eh, El, 18) ^ _u64_js_1.default.rotrBL(Eh, El, 41);
            const CHIh = Eh & Fh ^ ~Eh & Gh;
            const CHIl = El & Fl ^ ~El & Gl;
            const T1ll = _u64_js_1.default.add5L(Hl, sigma1l, CHIl, SHA512_Kl[i], SHA512_W_L[i]);
            const T1h = _u64_js_1.default.add5H(T1ll, Hh, sigma1h, CHIh, SHA512_Kh[i], SHA512_W_H[i]);
            const T1l = T1ll | 0;
            const sigma0h = _u64_js_1.default.rotrSH(Ah, Al, 28) ^ _u64_js_1.default.rotrBH(Ah, Al, 34) ^ _u64_js_1.default.rotrBH(Ah, Al, 39);
            const sigma0l = _u64_js_1.default.rotrSL(Ah, Al, 28) ^ _u64_js_1.default.rotrBL(Ah, Al, 34) ^ _u64_js_1.default.rotrBL(Ah, Al, 39);
            const MAJh = Ah & Bh ^ Ah & Ch ^ Bh & Ch;
            const MAJl = Al & Bl ^ Al & Cl ^ Bl & Cl;
            Hh = Gh | 0;
            Hl = Gl | 0;
            Gh = Fh | 0;
            Gl = Fl | 0;
            Fh = Eh | 0;
            Fl = El | 0;
            ({
              h: Eh,
              l: El
            } = _u64_js_1.default.add(Dh | 0, Dl | 0, T1h | 0, T1l | 0));
            Dh = Ch | 0;
            Dl = Cl | 0;
            Ch = Bh | 0;
            Cl = Bl | 0;
            Bh = Ah | 0;
            Bl = Al | 0;
            const All = _u64_js_1.default.add3L(T1l, sigma0l, MAJl);
            Ah = _u64_js_1.default.add3H(All, T1h, sigma0h, MAJh);
            Al = All | 0;
          }
          ({
            h: Ah,
            l: Al
          } = _u64_js_1.default.add(this.Ah | 0, this.Al | 0, Ah | 0, Al | 0));
          ({
            h: Bh,
            l: Bl
          } = _u64_js_1.default.add(this.Bh | 0, this.Bl | 0, Bh | 0, Bl | 0));
          ({
            h: Ch,
            l: Cl
          } = _u64_js_1.default.add(this.Ch | 0, this.Cl | 0, Ch | 0, Cl | 0));
          ({
            h: Dh,
            l: Dl
          } = _u64_js_1.default.add(this.Dh | 0, this.Dl | 0, Dh | 0, Dl | 0));
          ({
            h: Eh,
            l: El
          } = _u64_js_1.default.add(this.Eh | 0, this.El | 0, Eh | 0, El | 0));
          ({
            h: Fh,
            l: Fl
          } = _u64_js_1.default.add(this.Fh | 0, this.Fl | 0, Fh | 0, Fl | 0));
          ({
            h: Gh,
            l: Gl
          } = _u64_js_1.default.add(this.Gh | 0, this.Gl | 0, Gh | 0, Gl | 0));
          ({
            h: Hh,
            l: Hl
          } = _u64_js_1.default.add(this.Hh | 0, this.Hl | 0, Hh | 0, Hl | 0));
          this.set(Ah, Al, Bh, Bl, Ch, Cl, Dh, Dl, Eh, El, Fh, Fl, Gh, Gl, Hh, Hl);
        }
        roundClean() {
          SHA512_W_H.fill(0);
          SHA512_W_L.fill(0);
        }
        destroy() {
          this.buffer.fill(0);
          this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
        }
      }
      exports.SHA512 = SHA512;
      class SHA512_224 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0x8c3d37c8 | 0;
          this.Al = 0x19544da2 | 0;
          this.Bh = 0x73e19966 | 0;
          this.Bl = 0x89dcd4d6 | 0;
          this.Ch = 0x1dfab7ae | 0;
          this.Cl = 0x32ff9c82 | 0;
          this.Dh = 0x679dd514 | 0;
          this.Dl = 0x582f9fcf | 0;
          this.Eh = 0x0f6d2b69 | 0;
          this.El = 0x7bd44da8 | 0;
          this.Fh = 0x77e36f73 | 0;
          this.Fl = 0x04c48942 | 0;
          this.Gh = 0x3f9d85a8 | 0;
          this.Gl = 0x6a1d36c8 | 0;
          this.Hh = 0x1112e6ad | 0;
          this.Hl = 0x91d692a1 | 0;
          this.outputLen = 28;
        }
      }
      class SHA512_256 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0x22312194 | 0;
          this.Al = 0xfc2bf72c | 0;
          this.Bh = 0x9f555fa3 | 0;
          this.Bl = 0xc84c64c2 | 0;
          this.Ch = 0x2393b86b | 0;
          this.Cl = 0x6f53b151 | 0;
          this.Dh = 0x96387719 | 0;
          this.Dl = 0x5940eabd | 0;
          this.Eh = 0x96283ee2 | 0;
          this.El = 0xa88effe3 | 0;
          this.Fh = 0xbe5e1e25 | 0;
          this.Fl = 0x53863992 | 0;
          this.Gh = 0x2b0199fc | 0;
          this.Gl = 0x2c85b8aa | 0;
          this.Hh = 0x0eb72ddc | 0;
          this.Hl = 0x81c52ca2 | 0;
          this.outputLen = 32;
        }
      }
      class SHA384 extends SHA512 {
        constructor() {
          super();
          this.Ah = 0xcbbb9d5d | 0;
          this.Al = 0xc1059ed8 | 0;
          this.Bh = 0x629a292a | 0;
          this.Bl = 0x367cd507 | 0;
          this.Ch = 0x9159015a | 0;
          this.Cl = 0x3070dd17 | 0;
          this.Dh = 0x152fecd8 | 0;
          this.Dl = 0xf70e5939 | 0;
          this.Eh = 0x67332667 | 0;
          this.El = 0xffc00b31 | 0;
          this.Fh = 0x8eb44a87 | 0;
          this.Fl = 0x68581511 | 0;
          this.Gh = 0xdb0c2e0d | 0;
          this.Gl = 0x64f98fa7 | 0;
          this.Hh = 0x47b5481d | 0;
          this.Hl = 0xbefa4fa4 | 0;
          this.outputLen = 48;
        }
      }
      exports.sha512 = (0, utils_js_1.wrapConstructor)(() => new SHA512());
      exports.sha512_224 = (0, utils_js_1.wrapConstructor)(() => new SHA512_224());
      exports.sha512_256 = (0, utils_js_1.wrapConstructor)(() => new SHA512_256());
      exports.sha384 = (0, utils_js_1.wrapConstructor)(() => new SHA384());
    }, {
      "./_sha2.js": 69,
      "./_u64.js": 70,
      "./utils.js": 77
    }],
    77: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.randomBytes = exports.wrapConstructorWithOpts = exports.wrapConstructor = exports.checkOpts = exports.Hash = exports.concatBytes = exports.toBytes = exports.utf8ToBytes = exports.asyncLoop = exports.nextTick = exports.hexToBytes = exports.bytesToHex = exports.isLE = exports.rotr = exports.createView = exports.u32 = exports.u8 = void 0;
      const crypto_1 = require("@noble/hashes/crypto");
      const u8 = arr => new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.u8 = u8;
      const u32 = arr => new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
      exports.u32 = u32;
      const createView = arr => new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
      exports.createView = createView;
      const rotr = (word, shift) => word << 32 - shift | word >>> shift;
      exports.rotr = rotr;
      exports.isLE = new Uint8Array(new Uint32Array([0x11223344]).buffer)[0] === 0x44;
      if (!exports.isLE) throw new Error('Non little-endian hardware is not supported');
      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));
      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Uint8Array expected');
        let hex = '';
        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }
        return hex;
      }
      exports.bytesToHex = bytesToHex;
      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }
        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex');
        const array = new Uint8Array(hex.length / 2);
        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }
        return array;
      }
      exports.hexToBytes = hexToBytes;
      const nextTick = async () => {};
      exports.nextTick = nextTick;
      async function asyncLoop(iters, tick, cb) {
        let ts = Date.now();
        for (let i = 0; i < iters; i++) {
          cb(i);
          const diff = Date.now() - ts;
          if (diff >= 0 && diff < tick) continue;
          await (0, exports.nextTick)();
          ts += diff;
        }
      }
      exports.asyncLoop = asyncLoop;
      function utf8ToBytes(str) {
        if (typeof str !== 'string') {
          throw new TypeError(`utf8ToBytes expected string, got ${typeof str}`);
        }
        return new TextEncoder().encode(str);
      }
      exports.utf8ToBytes = utf8ToBytes;
      function toBytes(data) {
        if (typeof data === 'string') data = utf8ToBytes(data);
        if (!(data instanceof Uint8Array)) throw new TypeError(`Expected input type is Uint8Array (got ${typeof data})`);
        return data;
      }
      exports.toBytes = toBytes;
      function concatBytes(...arrays) {
        if (!arrays.every(a => a instanceof Uint8Array)) throw new Error('Uint8Array list expected');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }
        return result;
      }
      exports.concatBytes = concatBytes;
      class Hash {
        clone() {
          return this._cloneInto();
        }
      }
      exports.Hash = Hash;
      const isPlainObject = obj => Object.prototype.toString.call(obj) === '[object Object]' && obj.constructor === Object;
      function checkOpts(defaults, opts) {
        if (opts !== undefined && (typeof opts !== 'object' || !isPlainObject(opts))) throw new TypeError('Options should be object or undefined');
        const merged = Object.assign(defaults, opts);
        return merged;
      }
      exports.checkOpts = checkOpts;
      function wrapConstructor(hashConstructor) {
        const hashC = message => hashConstructor().update(toBytes(message)).digest();
        const tmp = hashConstructor();
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = () => hashConstructor();
        return hashC;
      }
      exports.wrapConstructor = wrapConstructor;
      function wrapConstructorWithOpts(hashCons) {
        const hashC = (msg, opts) => hashCons(opts).update(toBytes(msg)).digest();
        const tmp = hashCons({});
        hashC.outputLen = tmp.outputLen;
        hashC.blockLen = tmp.blockLen;
        hashC.create = opts => hashCons(opts);
        return hashC;
      }
      exports.wrapConstructorWithOpts = wrapConstructorWithOpts;
      function randomBytes(bytesLength = 32) {
        if (crypto_1.crypto && typeof crypto_1.crypto.getRandomValues === 'function') {
          return crypto_1.crypto.getRandomValues(new Uint8Array(bytesLength));
        }
        throw new Error('crypto.getRandomValues must be defined');
      }
      exports.randomBytes = randomBytes;
    }, {
      "@noble/hashes/crypto": 71
    }],
    78: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.utils = exports.schnorr = exports.verify = exports.signSync = exports.sign = exports.getSharedSecret = exports.recoverPublicKey = exports.getPublicKey = exports.Signature = exports.Point = exports.CURVE = void 0;
      const nodeCrypto = require("crypto");
      const _0n = BigInt(0);
      const _1n = BigInt(1);
      const _2n = BigInt(2);
      const _3n = BigInt(3);
      const _8n = BigInt(8);
      const POW_2_256 = _2n ** BigInt(256);
      const CURVE = {
        a: _0n,
        b: BigInt(7),
        P: POW_2_256 - _2n ** BigInt(32) - BigInt(977),
        n: POW_2_256 - BigInt('432420386565659656852420866394968145599'),
        h: _1n,
        Gx: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
        Gy: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
        beta: BigInt('0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee')
      };
      exports.CURVE = CURVE;
      function weistrass(x) {
        const {
          a,
          b
        } = CURVE;
        const x2 = mod(x * x);
        const x3 = mod(x2 * x);
        return mod(x3 + a * x + b);
      }
      const USE_ENDOMORPHISM = CURVE.a === _0n;
      class JacobianPoint {
        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
        static fromAffine(p) {
          if (!(p instanceof Point)) {
            throw new TypeError('JacobianPoint#fromAffine: expected Point');
          }
          return new JacobianPoint(p.x, p.y, _1n);
        }
        static toAffineBatch(points) {
          const toInv = invertBatch(points.map(p => p.z));
          return points.map((p, i) => p.toAffine(toInv[i]));
        }
        static normalizeZ(points) {
          return JacobianPoint.toAffineBatch(points).map(JacobianPoint.fromAffine);
        }
        equals(other) {
          if (!(other instanceof JacobianPoint)) throw new TypeError('JacobianPoint expected');
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2
          } = other;
          const Z1Z1 = mod(Z1 ** _2n);
          const Z2Z2 = mod(Z2 ** _2n);
          const U1 = mod(X1 * Z2Z2);
          const U2 = mod(X2 * Z1Z1);
          const S1 = mod(mod(Y1 * Z2) * Z2Z2);
          const S2 = mod(mod(Y2 * Z1) * Z1Z1);
          return U1 === U2 && S1 === S2;
        }
        negate() {
          return new JacobianPoint(this.x, mod(-this.y), this.z);
        }
        double() {
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const A = mod(X1 ** _2n);
          const B = mod(Y1 ** _2n);
          const C = mod(B ** _2n);
          const D = mod(_2n * (mod((X1 + B) ** _2n) - A - C));
          const E = mod(_3n * A);
          const F = mod(E ** _2n);
          const X3 = mod(F - _2n * D);
          const Y3 = mod(E * (D - X3) - _8n * C);
          const Z3 = mod(_2n * Y1 * Z1);
          return new JacobianPoint(X3, Y3, Z3);
        }
        add(other) {
          if (!(other instanceof JacobianPoint)) throw new TypeError('JacobianPoint expected');
          const {
            x: X1,
            y: Y1,
            z: Z1
          } = this;
          const {
            x: X2,
            y: Y2,
            z: Z2
          } = other;
          if (X2 === _0n || Y2 === _0n) return this;
          if (X1 === _0n || Y1 === _0n) return other;
          const Z1Z1 = mod(Z1 ** _2n);
          const Z2Z2 = mod(Z2 ** _2n);
          const U1 = mod(X1 * Z2Z2);
          const U2 = mod(X2 * Z1Z1);
          const S1 = mod(mod(Y1 * Z2) * Z2Z2);
          const S2 = mod(mod(Y2 * Z1) * Z1Z1);
          const H = mod(U2 - U1);
          const r = mod(S2 - S1);
          if (H === _0n) {
            if (r === _0n) {
              return this.double();
            } else {
              return JacobianPoint.ZERO;
            }
          }
          const HH = mod(H ** _2n);
          const HHH = mod(H * HH);
          const V = mod(U1 * HH);
          const X3 = mod(r ** _2n - HHH - _2n * V);
          const Y3 = mod(r * (V - X3) - S1 * HHH);
          const Z3 = mod(Z1 * Z2 * H);
          return new JacobianPoint(X3, Y3, Z3);
        }
        subtract(other) {
          return this.add(other.negate());
        }
        multiplyUnsafe(scalar) {
          const P0 = JacobianPoint.ZERO;
          if (typeof scalar === 'bigint' && scalar === _0n) return P0;
          let n = normalizeScalar(scalar);
          if (n === _1n) return this;
          if (!USE_ENDOMORPHISM) {
            let p = P0;
            let d = this;
            while (n > _0n) {
              if (n & _1n) p = p.add(d);
              d = d.double();
              n >>= _1n;
            }
            return p;
          }
          let {
            k1neg,
            k1,
            k2neg,
            k2
          } = splitScalarEndo(n);
          let k1p = P0;
          let k2p = P0;
          let d = this;
          while (k1 > _0n || k2 > _0n) {
            if (k1 & _1n) k1p = k1p.add(d);
            if (k2 & _1n) k2p = k2p.add(d);
            d = d.double();
            k1 >>= _1n;
            k2 >>= _1n;
          }
          if (k1neg) k1p = k1p.negate();
          if (k2neg) k2p = k2p.negate();
          k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
          return k1p.add(k2p);
        }
        precomputeWindow(W) {
          const windows = USE_ENDOMORPHISM ? 128 / W + 1 : 256 / W + 1;
          const points = [];
          let p = this;
          let base = p;
          for (let window = 0; window < windows; window++) {
            base = p;
            points.push(base);
            for (let i = 1; i < 2 ** (W - 1); i++) {
              base = base.add(p);
              points.push(base);
            }
            p = base.double();
          }
          return points;
        }
        wNAF(n, affinePoint) {
          if (!affinePoint && this.equals(JacobianPoint.BASE)) affinePoint = Point.BASE;
          const W = affinePoint && affinePoint._WINDOW_SIZE || 1;
          if (256 % W) {
            throw new Error('Point#wNAF: Invalid precomputation window, must be power of 2');
          }
          let precomputes = affinePoint && pointPrecomputes.get(affinePoint);
          if (!precomputes) {
            precomputes = this.precomputeWindow(W);
            if (affinePoint && W !== 1) {
              precomputes = JacobianPoint.normalizeZ(precomputes);
              pointPrecomputes.set(affinePoint, precomputes);
            }
          }
          let p = JacobianPoint.ZERO;
          let f = JacobianPoint.ZERO;
          const windows = 1 + (USE_ENDOMORPHISM ? 128 / W : 256 / W);
          const windowSize = 2 ** (W - 1);
          const mask = BigInt(2 ** W - 1);
          const maxNumber = 2 ** W;
          const shiftBy = BigInt(W);
          for (let window = 0; window < windows; window++) {
            const offset = window * windowSize;
            let wbits = Number(n & mask);
            n >>= shiftBy;
            if (wbits > windowSize) {
              wbits -= maxNumber;
              n += _1n;
            }
            if (wbits === 0) {
              let pr = precomputes[offset];
              if (window % 2) pr = pr.negate();
              f = f.add(pr);
            } else {
              let cached = precomputes[offset + Math.abs(wbits) - 1];
              if (wbits < 0) cached = cached.negate();
              p = p.add(cached);
            }
          }
          return {
            p,
            f
          };
        }
        multiply(scalar, affinePoint) {
          let n = normalizeScalar(scalar);
          let point;
          let fake;
          if (USE_ENDOMORPHISM) {
            const {
              k1neg,
              k1,
              k2neg,
              k2
            } = splitScalarEndo(n);
            let {
              p: k1p,
              f: f1p
            } = this.wNAF(k1, affinePoint);
            let {
              p: k2p,
              f: f2p
            } = this.wNAF(k2, affinePoint);
            if (k1neg) k1p = k1p.negate();
            if (k2neg) k2p = k2p.negate();
            k2p = new JacobianPoint(mod(k2p.x * CURVE.beta), k2p.y, k2p.z);
            point = k1p.add(k2p);
            fake = f1p.add(f2p);
          } else {
            const {
              p,
              f
            } = this.wNAF(n, affinePoint);
            point = p;
            fake = f;
          }
          return JacobianPoint.normalizeZ([point, fake])[0];
        }
        toAffine(invZ = invert(this.z)) {
          const {
            x,
            y,
            z
          } = this;
          const iz1 = invZ;
          const iz2 = mod(iz1 * iz1);
          const iz3 = mod(iz2 * iz1);
          const ax = mod(x * iz2);
          const ay = mod(y * iz3);
          const zz = mod(z * iz1);
          if (zz !== _1n) throw new Error('invZ was invalid');
          return new Point(ax, ay);
        }
      }
      JacobianPoint.BASE = new JacobianPoint(CURVE.Gx, CURVE.Gy, _1n);
      JacobianPoint.ZERO = new JacobianPoint(_0n, _1n, _0n);
      const pointPrecomputes = new WeakMap();
      class Point {
        constructor(x, y) {
          this.x = x;
          this.y = y;
        }
        _setWindowSize(windowSize) {
          this._WINDOW_SIZE = windowSize;
          pointPrecomputes.delete(this);
        }
        static fromCompressedHex(bytes) {
          const isShort = bytes.length === 32;
          const x = bytesToNumber(isShort ? bytes : bytes.subarray(1));
          if (!isValidFieldElement(x)) throw new Error('Point is not on curve');
          const y2 = weistrass(x);
          let y = sqrtMod(y2);
          const isYOdd = (y & _1n) === _1n;
          if (isShort) {
            if (isYOdd) y = mod(-y);
          } else {
            const isFirstByteOdd = (bytes[0] & 1) === 1;
            if (isFirstByteOdd !== isYOdd) y = mod(-y);
          }
          const point = new Point(x, y);
          point.assertValidity();
          return point;
        }
        static fromUncompressedHex(bytes) {
          const x = bytesToNumber(bytes.subarray(1, 33));
          const y = bytesToNumber(bytes.subarray(33, 65));
          const point = new Point(x, y);
          point.assertValidity();
          return point;
        }
        static fromHex(hex) {
          const bytes = ensureBytes(hex);
          const len = bytes.length;
          const header = bytes[0];
          if (len === 32 || len === 33 && (header === 0x02 || header === 0x03)) {
            return this.fromCompressedHex(bytes);
          }
          if (len === 65 && header === 0x04) return this.fromUncompressedHex(bytes);
          throw new Error(`Point.fromHex: received invalid point. Expected 32-33 compressed bytes or 65 uncompressed bytes, not ${len}`);
        }
        static fromPrivateKey(privateKey) {
          return Point.BASE.multiply(normalizePrivateKey(privateKey));
        }
        static fromSignature(msgHash, signature, recovery) {
          msgHash = ensureBytes(msgHash);
          const h = truncateHash(msgHash);
          const {
            r,
            s
          } = normalizeSignature(signature);
          if (recovery !== 0 && recovery !== 1) {
            throw new Error('Cannot recover signature: invalid recovery bit');
          }
          const prefix = recovery & 1 ? '03' : '02';
          const R = Point.fromHex(prefix + numTo32bStr(r));
          const {
            n
          } = CURVE;
          const rinv = invert(r, n);
          const u1 = mod(-h * rinv, n);
          const u2 = mod(s * rinv, n);
          const Q = Point.BASE.multiplyAndAddUnsafe(R, u1, u2);
          if (!Q) throw new Error('Cannot recover signature: point at infinify');
          Q.assertValidity();
          return Q;
        }
        toRawBytes(isCompressed = false) {
          return hexToBytes(this.toHex(isCompressed));
        }
        toHex(isCompressed = false) {
          const x = numTo32bStr(this.x);
          if (isCompressed) {
            const prefix = this.y & _1n ? '03' : '02';
            return `${prefix}${x}`;
          } else {
            return `04${x}${numTo32bStr(this.y)}`;
          }
        }
        toHexX() {
          return this.toHex(true).slice(2);
        }
        toRawX() {
          return this.toRawBytes(true).slice(1);
        }
        assertValidity() {
          const msg = 'Point is not on elliptic curve';
          const {
            x,
            y
          } = this;
          if (!isValidFieldElement(x) || !isValidFieldElement(y)) throw new Error(msg);
          const left = mod(y * y);
          const right = weistrass(x);
          if (mod(left - right) !== _0n) throw new Error(msg);
        }
        equals(other) {
          return this.x === other.x && this.y === other.y;
        }
        negate() {
          return new Point(this.x, mod(-this.y));
        }
        double() {
          return JacobianPoint.fromAffine(this).double().toAffine();
        }
        add(other) {
          return JacobianPoint.fromAffine(this).add(JacobianPoint.fromAffine(other)).toAffine();
        }
        subtract(other) {
          return this.add(other.negate());
        }
        multiply(scalar) {
          return JacobianPoint.fromAffine(this).multiply(scalar, this).toAffine();
        }
        multiplyAndAddUnsafe(Q, a, b) {
          const P = JacobianPoint.fromAffine(this);
          const aP = a === _0n || a === _1n || this !== Point.BASE ? P.multiplyUnsafe(a) : P.multiply(a);
          const bQ = JacobianPoint.fromAffine(Q).multiplyUnsafe(b);
          const sum = aP.add(bQ);
          return sum.equals(JacobianPoint.ZERO) ? undefined : sum.toAffine();
        }
      }
      exports.Point = Point;
      Point.BASE = new Point(CURVE.Gx, CURVE.Gy);
      Point.ZERO = new Point(_0n, _0n);
      function sliceDER(s) {
        return Number.parseInt(s[0], 16) >= 8 ? '00' + s : s;
      }
      function parseDERInt(data) {
        if (data.length < 2 || data[0] !== 0x02) {
          throw new Error(`Invalid signature integer tag: ${bytesToHex(data)}`);
        }
        const len = data[1];
        const res = data.subarray(2, len + 2);
        if (!len || res.length !== len) {
          throw new Error(`Invalid signature integer: wrong length`);
        }
        if (res[0] === 0x00 && res[1] <= 0x7f) {
          throw new Error('Invalid signature integer: trailing length');
        }
        return {
          data: bytesToNumber(res),
          left: data.subarray(len + 2)
        };
      }
      function parseDERSignature(data) {
        if (data.length < 2 || data[0] != 0x30) {
          throw new Error(`Invalid signature tag: ${bytesToHex(data)}`);
        }
        if (data[1] !== data.length - 2) {
          throw new Error('Invalid signature: incorrect length');
        }
        const {
          data: r,
          left: sBytes
        } = parseDERInt(data.subarray(2));
        const {
          data: s,
          left: rBytesLeft
        } = parseDERInt(sBytes);
        if (rBytesLeft.length) {
          throw new Error(`Invalid signature: left bytes after parsing: ${bytesToHex(rBytesLeft)}`);
        }
        return {
          r,
          s
        };
      }
      class Signature {
        constructor(r, s) {
          this.r = r;
          this.s = s;
          this.assertValidity();
        }
        static fromCompact(hex) {
          const arr = isUint8a(hex);
          const name = 'Signature.fromCompact';
          if (typeof hex !== 'string' && !arr) throw new TypeError(`${name}: Expected string or Uint8Array`);
          const str = arr ? bytesToHex(hex) : hex;
          if (str.length !== 128) throw new Error(`${name}: Expected 64-byte hex`);
          return new Signature(hexToNumber(str.slice(0, 64)), hexToNumber(str.slice(64, 128)));
        }
        static fromDER(hex) {
          const arr = isUint8a(hex);
          if (typeof hex !== 'string' && !arr) throw new TypeError(`Signature.fromDER: Expected string or Uint8Array`);
          const {
            r,
            s
          } = parseDERSignature(arr ? hex : hexToBytes(hex));
          return new Signature(r, s);
        }
        static fromHex(hex) {
          return this.fromDER(hex);
        }
        assertValidity() {
          const {
            r,
            s
          } = this;
          if (!isWithinCurveOrder(r)) throw new Error('Invalid Signature: r must be 0 < r < n');
          if (!isWithinCurveOrder(s)) throw new Error('Invalid Signature: s must be 0 < s < n');
        }
        hasHighS() {
          const HALF = CURVE.n >> _1n;
          return this.s > HALF;
        }
        normalizeS() {
          return this.hasHighS() ? new Signature(this.r, CURVE.n - this.s) : this;
        }
        toDERRawBytes(isCompressed = false) {
          return hexToBytes(this.toDERHex(isCompressed));
        }
        toDERHex(isCompressed = false) {
          const sHex = sliceDER(numberToHexUnpadded(this.s));
          if (isCompressed) return sHex;
          const rHex = sliceDER(numberToHexUnpadded(this.r));
          const rLen = numberToHexUnpadded(rHex.length / 2);
          const sLen = numberToHexUnpadded(sHex.length / 2);
          const length = numberToHexUnpadded(rHex.length / 2 + sHex.length / 2 + 4);
          return `30${length}02${rLen}${rHex}02${sLen}${sHex}`;
        }
        toRawBytes() {
          return this.toDERRawBytes();
        }
        toHex() {
          return this.toDERHex();
        }
        toCompactRawBytes() {
          return hexToBytes(this.toCompactHex());
        }
        toCompactHex() {
          return numTo32bStr(this.r) + numTo32bStr(this.s);
        }
      }
      exports.Signature = Signature;
      function concatBytes(...arrays) {
        if (!arrays.every(isUint8a)) throw new Error('Uint8Array list expected');
        if (arrays.length === 1) return arrays[0];
        const length = arrays.reduce((a, arr) => a + arr.length, 0);
        const result = new Uint8Array(length);
        for (let i = 0, pad = 0; i < arrays.length; i++) {
          const arr = arrays[i];
          result.set(arr, pad);
          pad += arr.length;
        }
        return result;
      }
      function isUint8a(bytes) {
        return bytes instanceof Uint8Array;
      }
      const hexes = Array.from({
        length: 256
      }, (v, i) => i.toString(16).padStart(2, '0'));
      function bytesToHex(uint8a) {
        if (!(uint8a instanceof Uint8Array)) throw new Error('Expected Uint8Array');
        let hex = '';
        for (let i = 0; i < uint8a.length; i++) {
          hex += hexes[uint8a[i]];
        }
        return hex;
      }
      function numTo32bStr(num) {
        if (num > POW_2_256) throw new Error('Expected number < 2^256');
        return num.toString(16).padStart(64, '0');
      }
      function numTo32b(num) {
        return hexToBytes(numTo32bStr(num));
      }
      function numberToHexUnpadded(num) {
        const hex = num.toString(16);
        return hex.length & 1 ? `0${hex}` : hex;
      }
      function hexToNumber(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToNumber: expected string, got ' + typeof hex);
        }
        return BigInt(`0x${hex}`);
      }
      function hexToBytes(hex) {
        if (typeof hex !== 'string') {
          throw new TypeError('hexToBytes: expected string, got ' + typeof hex);
        }
        if (hex.length % 2) throw new Error('hexToBytes: received invalid unpadded hex' + hex.length);
        const array = new Uint8Array(hex.length / 2);
        for (let i = 0; i < array.length; i++) {
          const j = i * 2;
          const hexByte = hex.slice(j, j + 2);
          const byte = Number.parseInt(hexByte, 16);
          if (Number.isNaN(byte) || byte < 0) throw new Error('Invalid byte sequence');
          array[i] = byte;
        }
        return array;
      }
      function bytesToNumber(bytes) {
        return hexToNumber(bytesToHex(bytes));
      }
      function ensureBytes(hex) {
        return hex instanceof Uint8Array ? Uint8Array.from(hex) : hexToBytes(hex);
      }
      function normalizeScalar(num) {
        if (typeof num === 'number' && Number.isSafeInteger(num) && num > 0) return BigInt(num);
        if (typeof num === 'bigint' && isWithinCurveOrder(num)) return num;
        throw new TypeError('Expected valid private scalar: 0 < scalar < curve.n');
      }
      function mod(a, b = CURVE.P) {
        const result = a % b;
        return result >= _0n ? result : b + result;
      }
      function pow2(x, power) {
        const {
          P
        } = CURVE;
        let res = x;
        while (power-- > _0n) {
          res *= res;
          res %= P;
        }
        return res;
      }
      function sqrtMod(x) {
        const {
          P
        } = CURVE;
        const _6n = BigInt(6);
        const _11n = BigInt(11);
        const _22n = BigInt(22);
        const _23n = BigInt(23);
        const _44n = BigInt(44);
        const _88n = BigInt(88);
        const b2 = x * x * x % P;
        const b3 = b2 * b2 * x % P;
        const b6 = pow2(b3, _3n) * b3 % P;
        const b9 = pow2(b6, _3n) * b3 % P;
        const b11 = pow2(b9, _2n) * b2 % P;
        const b22 = pow2(b11, _11n) * b11 % P;
        const b44 = pow2(b22, _22n) * b22 % P;
        const b88 = pow2(b44, _44n) * b44 % P;
        const b176 = pow2(b88, _88n) * b88 % P;
        const b220 = pow2(b176, _44n) * b44 % P;
        const b223 = pow2(b220, _3n) * b3 % P;
        const t1 = pow2(b223, _23n) * b22 % P;
        const t2 = pow2(t1, _6n) * b2 % P;
        return pow2(t2, _2n);
      }
      function invert(number, modulo = CURVE.P) {
        if (number === _0n || modulo <= _0n) {
          throw new Error(`invert: expected positive integers, got n=${number} mod=${modulo}`);
        }
        let a = mod(number, modulo);
        let b = modulo;
        let x = _0n,
          y = _1n,
          u = _1n,
          v = _0n;
        while (a !== _0n) {
          const q = b / a;
          const r = b % a;
          const m = x - u * q;
          const n = y - v * q;
          b = a, a = r, x = u, y = v, u = m, v = n;
        }
        const gcd = b;
        if (gcd !== _1n) throw new Error('invert: does not exist');
        return mod(x, modulo);
      }
      function invertBatch(nums, p = CURVE.P) {
        const scratch = new Array(nums.length);
        const lastMultiplied = nums.reduce((acc, num, i) => {
          if (num === _0n) return acc;
          scratch[i] = acc;
          return mod(acc * num, p);
        }, _1n);
        const inverted = invert(lastMultiplied, p);
        nums.reduceRight((acc, num, i) => {
          if (num === _0n) return acc;
          scratch[i] = mod(acc * scratch[i], p);
          return mod(acc * num, p);
        }, inverted);
        return scratch;
      }
      const divNearest = (a, b) => (a + b / _2n) / b;
      const POW_2_128 = _2n ** BigInt(128);
      function splitScalarEndo(k) {
        const {
          n
        } = CURVE;
        const a1 = BigInt('0x3086d221a7d46bcde86c90e49284eb15');
        const b1 = -_1n * BigInt('0xe4437ed6010e88286f547fa90abfe4c3');
        const a2 = BigInt('0x114ca50f7a8e2f3f657c1108d9d44cfd8');
        const b2 = a1;
        const c1 = divNearest(b2 * k, n);
        const c2 = divNearest(-b1 * k, n);
        let k1 = mod(k - c1 * a1 - c2 * a2, n);
        let k2 = mod(-c1 * b1 - c2 * b2, n);
        const k1neg = k1 > POW_2_128;
        const k2neg = k2 > POW_2_128;
        if (k1neg) k1 = n - k1;
        if (k2neg) k2 = n - k2;
        if (k1 > POW_2_128 || k2 > POW_2_128) {
          throw new Error('splitScalarEndo: Endomorphism failed, k=' + k);
        }
        return {
          k1neg,
          k1,
          k2neg,
          k2
        };
      }
      function truncateHash(hash) {
        const {
          n
        } = CURVE;
        const byteLength = hash.length;
        const delta = byteLength * 8 - 256;
        let h = bytesToNumber(hash);
        if (delta > 0) h = h >> BigInt(delta);
        if (h >= n) h -= n;
        return h;
      }
      class HmacDrbg {
        constructor() {
          this.v = new Uint8Array(32).fill(1);
          this.k = new Uint8Array(32).fill(0);
          this.counter = 0;
        }
        hmac(...values) {
          return exports.utils.hmacSha256(this.k, ...values);
        }
        hmacSync(...values) {
          if (typeof exports.utils.hmacSha256Sync !== 'function') throw new Error('utils.hmacSha256Sync is undefined, you need to set it');
          const res = exports.utils.hmacSha256Sync(this.k, ...values);
          if (res instanceof Promise) throw new Error('To use sync sign(), ensure utils.hmacSha256 is sync');
          return res;
        }
        incr() {
          if (this.counter >= 1000) {
            throw new Error('Tried 1,000 k values for sign(), all were invalid');
          }
          this.counter += 1;
        }
        async reseed(seed = new Uint8Array()) {
          this.k = await this.hmac(this.v, Uint8Array.from([0x00]), seed);
          this.v = await this.hmac(this.v);
          if (seed.length === 0) return;
          this.k = await this.hmac(this.v, Uint8Array.from([0x01]), seed);
          this.v = await this.hmac(this.v);
        }
        reseedSync(seed = new Uint8Array()) {
          this.k = this.hmacSync(this.v, Uint8Array.from([0x00]), seed);
          this.v = this.hmacSync(this.v);
          if (seed.length === 0) return;
          this.k = this.hmacSync(this.v, Uint8Array.from([0x01]), seed);
          this.v = this.hmacSync(this.v);
        }
        async generate() {
          this.incr();
          this.v = await this.hmac(this.v);
          return this.v;
        }
        generateSync() {
          this.incr();
          this.v = this.hmacSync(this.v);
          return this.v;
        }
      }
      function isWithinCurveOrder(num) {
        return _0n < num && num < CURVE.n;
      }
      function isValidFieldElement(num) {
        return _0n < num && num < CURVE.P;
      }
      function kmdToSig(kBytes, m, d) {
        const k = bytesToNumber(kBytes);
        if (!isWithinCurveOrder(k)) return;
        const {
          n
        } = CURVE;
        const q = Point.BASE.multiply(k);
        const r = mod(q.x, n);
        if (r === _0n) return;
        const s = mod(invert(k, n) * mod(m + d * r, n), n);
        if (s === _0n) return;
        const sig = new Signature(r, s);
        const recovery = (q.x === sig.r ? 0 : 2) | Number(q.y & _1n);
        return {
          sig,
          recovery
        };
      }
      function normalizePrivateKey(key) {
        let num;
        if (typeof key === 'bigint') {
          num = key;
        } else if (typeof key === 'number' && Number.isSafeInteger(key) && key > 0) {
          num = BigInt(key);
        } else if (typeof key === 'string') {
          if (key.length !== 64) throw new Error('Expected 32 bytes of private key');
          num = hexToNumber(key);
        } else if (isUint8a(key)) {
          if (key.length !== 32) throw new Error('Expected 32 bytes of private key');
          num = bytesToNumber(key);
        } else {
          throw new TypeError('Expected valid private key');
        }
        if (!isWithinCurveOrder(num)) throw new Error('Expected private key: 0 < key < n');
        return num;
      }
      function normalizePublicKey(publicKey) {
        if (publicKey instanceof Point) {
          publicKey.assertValidity();
          return publicKey;
        } else {
          return Point.fromHex(publicKey);
        }
      }
      function normalizeSignature(signature) {
        if (signature instanceof Signature) {
          signature.assertValidity();
          return signature;
        }
        try {
          return Signature.fromDER(signature);
        } catch (error) {
          return Signature.fromCompact(signature);
        }
      }
      function getPublicKey(privateKey, isCompressed = false) {
        return Point.fromPrivateKey(privateKey).toRawBytes(isCompressed);
      }
      exports.getPublicKey = getPublicKey;
      function recoverPublicKey(msgHash, signature, recovery, isCompressed = false) {
        return Point.fromSignature(msgHash, signature, recovery).toRawBytes(isCompressed);
      }
      exports.recoverPublicKey = recoverPublicKey;
      function isPub(item) {
        const arr = isUint8a(item);
        const str = typeof item === 'string';
        const len = (arr || str) && item.length;
        if (arr) return len === 33 || len === 65;
        if (str) return len === 66 || len === 130;
        if (item instanceof Point) return true;
        return false;
      }
      function getSharedSecret(privateA, publicB, isCompressed = false) {
        if (isPub(privateA)) throw new TypeError('getSharedSecret: first arg must be private key');
        if (!isPub(publicB)) throw new TypeError('getSharedSecret: second arg must be public key');
        const b = normalizePublicKey(publicB);
        b.assertValidity();
        return b.multiply(normalizePrivateKey(privateA)).toRawBytes(isCompressed);
      }
      exports.getSharedSecret = getSharedSecret;
      function bits2int(bytes) {
        const slice = bytes.length > 32 ? bytes.slice(0, 32) : bytes;
        return bytesToNumber(slice);
      }
      function bits2octets(bytes) {
        const z1 = bits2int(bytes);
        const z2 = mod(z1, CURVE.n);
        return int2octets(z2 < _0n ? z1 : z2);
      }
      function int2octets(num) {
        if (typeof num !== 'bigint') throw new Error('Expected bigint');
        const hex = numTo32bStr(num);
        return hexToBytes(hex);
      }
      function initSigArgs(msgHash, privateKey, extraEntropy) {
        if (msgHash == null) throw new Error(`sign: expected valid message hash, not "${msgHash}"`);
        const h1 = ensureBytes(msgHash);
        const d = normalizePrivateKey(privateKey);
        const seedArgs = [int2octets(d), bits2octets(h1)];
        if (extraEntropy != null) {
          if (extraEntropy === true) extraEntropy = exports.utils.randomBytes(32);
          const e = ensureBytes(extraEntropy);
          if (e.length !== 32) throw new Error('sign: Expected 32 bytes of extra data');
          seedArgs.push(e);
        }
        const seed = concatBytes(...seedArgs);
        const m = bits2int(h1);
        return {
          seed,
          m,
          d
        };
      }
      function finalizeSig(recSig, opts) {
        let {
          sig,
          recovery
        } = recSig;
        const {
          canonical,
          der,
          recovered
        } = Object.assign({
          canonical: true,
          der: true
        }, opts);
        if (canonical && sig.hasHighS()) {
          sig = sig.normalizeS();
          recovery ^= 1;
        }
        const hashed = der ? sig.toDERRawBytes() : sig.toCompactRawBytes();
        return recovered ? [hashed, recovery] : hashed;
      }
      async function sign(msgHash, privKey, opts = {}) {
        const {
          seed,
          m,
          d
        } = initSigArgs(msgHash, privKey, opts.extraEntropy);
        let sig;
        const drbg = new HmacDrbg();
        await drbg.reseed(seed);
        while (!(sig = kmdToSig(await drbg.generate(), m, d))) await drbg.reseed();
        return finalizeSig(sig, opts);
      }
      exports.sign = sign;
      function signSync(msgHash, privKey, opts = {}) {
        const {
          seed,
          m,
          d
        } = initSigArgs(msgHash, privKey, opts.extraEntropy);
        let sig;
        const drbg = new HmacDrbg();
        drbg.reseedSync(seed);
        while (!(sig = kmdToSig(drbg.generateSync(), m, d))) drbg.reseedSync();
        return finalizeSig(sig, opts);
      }
      exports.signSync = signSync;
      const vopts = {
        strict: true
      };
      function verify(signature, msgHash, publicKey, opts = vopts) {
        let sig;
        try {
          sig = normalizeSignature(signature);
          msgHash = ensureBytes(msgHash);
        } catch (error) {
          return false;
        }
        const {
          r,
          s
        } = sig;
        if (opts.strict && sig.hasHighS()) return false;
        const h = truncateHash(msgHash);
        let P;
        try {
          P = normalizePublicKey(publicKey);
        } catch (error) {
          return false;
        }
        const {
          n
        } = CURVE;
        const sinv = invert(s, n);
        const u1 = mod(h * sinv, n);
        const u2 = mod(r * sinv, n);
        const R = Point.BASE.multiplyAndAddUnsafe(P, u1, u2);
        if (!R) return false;
        const v = mod(R.x, n);
        return v === r;
      }
      exports.verify = verify;
      function finalizeSchnorrChallenge(ch) {
        return mod(bytesToNumber(ch), CURVE.n);
      }
      function hasEvenY(point) {
        return (point.y & _1n) === _0n;
      }
      class SchnorrSignature {
        constructor(r, s) {
          this.r = r;
          this.s = s;
          this.assertValidity();
        }
        static fromHex(hex) {
          const bytes = ensureBytes(hex);
          if (bytes.length !== 64) throw new TypeError(`SchnorrSignature.fromHex: expected 64 bytes, not ${bytes.length}`);
          const r = bytesToNumber(bytes.subarray(0, 32));
          const s = bytesToNumber(bytes.subarray(32, 64));
          return new SchnorrSignature(r, s);
        }
        assertValidity() {
          const {
            r,
            s
          } = this;
          if (!isValidFieldElement(r) || !isWithinCurveOrder(s)) throw new Error('Invalid signature');
        }
        toHex() {
          return numTo32bStr(this.r) + numTo32bStr(this.s);
        }
        toRawBytes() {
          return hexToBytes(this.toHex());
        }
      }
      function schnorrGetPublicKey(privateKey) {
        return Point.fromPrivateKey(privateKey).toRawX();
      }
      function initSchnorrSigArgs(message, privateKey, auxRand) {
        if (message == null) throw new TypeError(`sign: Expected valid message, not "${message}"`);
        const m = ensureBytes(message);
        const d0 = normalizePrivateKey(privateKey);
        const rand = ensureBytes(auxRand);
        if (rand.length !== 32) throw new TypeError('sign: Expected 32 bytes of aux randomness');
        const P = Point.fromPrivateKey(d0);
        const px = P.toRawX();
        const d = hasEvenY(P) ? d0 : CURVE.n - d0;
        return {
          m,
          P,
          px,
          d,
          rand
        };
      }
      function initSchnorrNonce(d, t0h) {
        return numTo32b(d ^ bytesToNumber(t0h));
      }
      function finalizeSchnorrNonce(k0h) {
        const k0 = mod(bytesToNumber(k0h), CURVE.n);
        if (k0 === _0n) throw new Error('sign: Creation of signature failed. k is zero');
        const R = Point.fromPrivateKey(k0);
        const rx = R.toRawX();
        const k = hasEvenY(R) ? k0 : CURVE.n - k0;
        return {
          R,
          rx,
          k
        };
      }
      function finalizeSchnorrSig(R, k, e, d) {
        return new SchnorrSignature(R.x, mod(k + e * d, CURVE.n)).toRawBytes();
      }
      async function schnorrSign(message, privateKey, auxRand = exports.utils.randomBytes()) {
        const {
          m,
          px,
          d,
          rand
        } = initSchnorrSigArgs(message, privateKey, auxRand);
        const t = initSchnorrNonce(d, await exports.utils.taggedHash(TAGS.aux, rand));
        const {
          R,
          rx,
          k
        } = finalizeSchnorrNonce(await exports.utils.taggedHash(TAGS.nonce, t, px, m));
        const e = finalizeSchnorrChallenge(await exports.utils.taggedHash(TAGS.challenge, rx, px, m));
        const sig = finalizeSchnorrSig(R, k, e, d);
        const isValid = await schnorrVerify(sig, m, px);
        if (!isValid) throw new Error('sign: Invalid signature produced');
        return sig;
      }
      function schnorrSignSync(message, privateKey, auxRand = exports.utils.randomBytes()) {
        const {
          m,
          px,
          d,
          rand
        } = initSchnorrSigArgs(message, privateKey, auxRand);
        const t = initSchnorrNonce(d, exports.utils.taggedHashSync(TAGS.aux, rand));
        const {
          R,
          rx,
          k
        } = finalizeSchnorrNonce(exports.utils.taggedHashSync(TAGS.nonce, t, px, m));
        const e = finalizeSchnorrChallenge(exports.utils.taggedHashSync(TAGS.challenge, rx, px, m));
        const sig = finalizeSchnorrSig(R, k, e, d);
        const isValid = schnorrVerifySync(sig, m, px);
        if (!isValid) throw new Error('sign: Invalid signature produced');
        return sig;
      }
      function initSchnorrVerify(signature, message, publicKey) {
        const raw = signature instanceof SchnorrSignature;
        const sig = raw ? signature : SchnorrSignature.fromHex(signature);
        if (raw) sig.assertValidity();
        return {
          ...sig,
          m: ensureBytes(message),
          P: normalizePublicKey(publicKey)
        };
      }
      function finalizeSchnorrVerify(r, P, s, e) {
        const R = Point.BASE.multiplyAndAddUnsafe(P, normalizePrivateKey(s), mod(-e, CURVE.n));
        if (!R || !hasEvenY(R) || R.x !== r) return false;
        return true;
      }
      async function schnorrVerify(signature, message, publicKey) {
        try {
          const {
            r,
            s,
            m,
            P
          } = initSchnorrVerify(signature, message, publicKey);
          const e = finalizeSchnorrChallenge(await exports.utils.taggedHash(TAGS.challenge, numTo32b(r), P.toRawX(), m));
          return finalizeSchnorrVerify(r, P, s, e);
        } catch (error) {
          return false;
        }
      }
      function schnorrVerifySync(signature, message, publicKey) {
        try {
          const {
            r,
            s,
            m,
            P
          } = initSchnorrVerify(signature, message, publicKey);
          const e = finalizeSchnorrChallenge(exports.utils.taggedHashSync(TAGS.challenge, numTo32b(r), P.toRawX(), m));
          return finalizeSchnorrVerify(r, P, s, e);
        } catch (error) {
          return false;
        }
      }
      exports.schnorr = {
        Signature: SchnorrSignature,
        getPublicKey: schnorrGetPublicKey,
        sign: schnorrSign,
        verify: schnorrVerify,
        signSync: schnorrSignSync,
        verifySync: schnorrVerifySync
      };
      Point.BASE._setWindowSize(8);
      const crypto = {
        node: nodeCrypto,
        web: typeof self === 'object' && 'crypto' in self ? self.crypto : undefined
      };
      const TAGS = {
        challenge: 'BIP0340/challenge',
        aux: 'BIP0340/aux',
        nonce: 'BIP0340/nonce'
      };
      const TAGGED_HASH_PREFIXES = {};
      exports.utils = {
        isValidPrivateKey(privateKey) {
          try {
            normalizePrivateKey(privateKey);
            return true;
          } catch (error) {
            return false;
          }
        },
        privateAdd: (privateKey, tweak) => {
          const p = normalizePrivateKey(privateKey);
          const t = normalizePrivateKey(tweak);
          return numTo32b(mod(p + t, CURVE.n));
        },
        privateNegate: privateKey => {
          const p = normalizePrivateKey(privateKey);
          return numTo32b(CURVE.n - p);
        },
        pointAddScalar: (p, tweak, isCompressed) => {
          const P = Point.fromHex(p);
          const t = normalizePrivateKey(tweak);
          const Q = Point.BASE.multiplyAndAddUnsafe(P, t, _1n);
          if (!Q) throw new Error('Tweaked point at infinity');
          return Q.toRawBytes(isCompressed);
        },
        pointMultiply: (p, tweak, isCompressed) => {
          const P = Point.fromHex(p);
          const t = bytesToNumber(ensureBytes(tweak));
          return P.multiply(t).toRawBytes(isCompressed);
        },
        hashToPrivateKey: hash => {
          hash = ensureBytes(hash);
          if (hash.length < 40 || hash.length > 1024) throw new Error('Expected 40-1024 bytes of private key as per FIPS 186');
          const num = mod(bytesToNumber(hash), CURVE.n - _1n) + _1n;
          return numTo32b(num);
        },
        randomBytes: (bytesLength = 32) => {
          if (crypto.web) {
            return crypto.web.getRandomValues(new Uint8Array(bytesLength));
          } else if (crypto.node) {
            const {
              randomBytes
            } = crypto.node;
            return Uint8Array.from(randomBytes(bytesLength));
          } else {
            throw new Error("The environment doesn't have randomBytes function");
          }
        },
        randomPrivateKey: () => {
          return exports.utils.hashToPrivateKey(exports.utils.randomBytes(40));
        },
        bytesToHex,
        hexToBytes,
        concatBytes,
        mod,
        invert,
        sha256: async (...messages) => {
          if (crypto.web) {
            const buffer = await crypto.web.subtle.digest('SHA-256', concatBytes(...messages));
            return new Uint8Array(buffer);
          } else if (crypto.node) {
            const {
              createHash
            } = crypto.node;
            const hash = createHash('sha256');
            messages.forEach(m => hash.update(m));
            return Uint8Array.from(hash.digest());
          } else {
            throw new Error("The environment doesn't have sha256 function");
          }
        },
        hmacSha256: async (key, ...messages) => {
          if (crypto.web) {
            const ckey = await crypto.web.subtle.importKey('raw', key, {
              name: 'HMAC',
              hash: {
                name: 'SHA-256'
              }
            }, false, ['sign']);
            const message = concatBytes(...messages);
            const buffer = await crypto.web.subtle.sign('HMAC', ckey, message);
            return new Uint8Array(buffer);
          } else if (crypto.node) {
            const {
              createHmac
            } = crypto.node;
            const hash = createHmac('sha256', key);
            messages.forEach(m => hash.update(m));
            return Uint8Array.from(hash.digest());
          } else {
            throw new Error("The environment doesn't have hmac-sha256 function");
          }
        },
        sha256Sync: undefined,
        hmacSha256Sync: undefined,
        taggedHash: async (tag, ...messages) => {
          let tagP = TAGGED_HASH_PREFIXES[tag];
          if (tagP === undefined) {
            const tagH = await exports.utils.sha256(Uint8Array.from(tag, c => c.charCodeAt(0)));
            tagP = concatBytes(tagH, tagH);
            TAGGED_HASH_PREFIXES[tag] = tagP;
          }
          return exports.utils.sha256(tagP, ...messages);
        },
        taggedHashSync: (tag, ...messages) => {
          if (typeof exports.utils.sha256Sync !== 'function') throw new Error('utils.sha256Sync is undefined, you need to set it');
          let tagP = TAGGED_HASH_PREFIXES[tag];
          if (tagP === undefined) {
            const tagH = exports.utils.sha256Sync(Uint8Array.from(tag, c => c.charCodeAt(0)));
            tagP = concatBytes(tagH, tagH);
            TAGGED_HASH_PREFIXES[tag] = tagP;
          }
          return exports.utils.sha256Sync(tagP, ...messages);
        },
        precompute(windowSize = 8, point = Point.BASE) {
          const cached = point === Point.BASE ? point : new Point(point.x, point.y);
          cached._setWindowSize(windowSize);
          cached.multiply(_3n);
          return cached;
        }
      };
    }, {
      "crypto": 138
    }],
    79: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.bytes = exports.stringToBytes = exports.str = exports.bytesToString = exports.hex = exports.utf8 = exports.bech32m = exports.bech32 = exports.base58check = exports.base58xmr = exports.base58xrp = exports.base58flickr = exports.base58 = exports.base64url = exports.base64 = exports.base32crockford = exports.base32hex = exports.base32 = exports.base16 = exports.utils = exports.assertNumber = void 0;
      function assertNumber(n) {
        if (!Number.isSafeInteger(n)) throw new Error(`Wrong integer: ${n}`);
      }
      exports.assertNumber = assertNumber;
      function chain(...args) {
        const wrap = (a, b) => c => a(b(c));
        const encode = Array.from(args).reverse().reduce((acc, i) => acc ? wrap(acc, i.encode) : i.encode, undefined);
        const decode = args.reduce((acc, i) => acc ? wrap(acc, i.decode) : i.decode, undefined);
        return {
          encode,
          decode
        };
      }
      function alphabet(alphabet) {
        return {
          encode: digits => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('alphabet.encode input should be an array of numbers');
            return digits.map(i => {
              assertNumber(i);
              if (i < 0 || i >= alphabet.length) throw new Error(`Digit index outside alphabet: ${i} (alphabet: ${alphabet.length})`);
              return alphabet[i];
            });
          },
          decode: input => {
            if (!Array.isArray(input) || input.length && typeof input[0] !== 'string') throw new Error('alphabet.decode input should be array of strings');
            return input.map(letter => {
              if (typeof letter !== 'string') throw new Error(`alphabet.decode: not string element=${letter}`);
              const index = alphabet.indexOf(letter);
              if (index === -1) throw new Error(`Unknown letter: "${letter}". Allowed: ${alphabet}`);
              return index;
            });
          }
        };
      }
      function join(separator = '') {
        if (typeof separator !== 'string') throw new Error('join separator should be string');
        return {
          encode: from => {
            if (!Array.isArray(from) || from.length && typeof from[0] !== 'string') throw new Error('join.encode input should be array of strings');
            for (let i of from) if (typeof i !== 'string') throw new Error(`join.encode: non-string input=${i}`);
            return from.join(separator);
          },
          decode: to => {
            if (typeof to !== 'string') throw new Error('join.decode input should be string');
            return to.split(separator);
          }
        };
      }
      function padding(bits, chr = '=') {
        assertNumber(bits);
        if (typeof chr !== 'string') throw new Error('padding chr should be string');
        return {
          encode(data) {
            if (!Array.isArray(data) || data.length && typeof data[0] !== 'string') throw new Error('padding.encode input should be array of strings');
            for (let i of data) if (typeof i !== 'string') throw new Error(`padding.encode: non-string input=${i}`);
            while (data.length * bits % 8) data.push(chr);
            return data;
          },
          decode(input) {
            if (!Array.isArray(input) || input.length && typeof input[0] !== 'string') throw new Error('padding.encode input should be array of strings');
            for (let i of input) if (typeof i !== 'string') throw new Error(`padding.decode: non-string input=${i}`);
            let end = input.length;
            if (end * bits % 8) throw new Error('Invalid padding: string should have whole number of bytes');
            for (; end > 0 && input[end - 1] === chr; end--) {
              if (!((end - 1) * bits % 8)) throw new Error('Invalid padding: string has too much padding');
            }
            return input.slice(0, end);
          }
        };
      }
      function normalize(fn) {
        if (typeof fn !== 'function') throw new Error('normalize fn should be function');
        return {
          encode: from => from,
          decode: to => fn(to)
        };
      }
      function convertRadix(data, from, to) {
        if (from < 2) throw new Error(`convertRadix: wrong from=${from}, base cannot be less than 2`);
        if (to < 2) throw new Error(`convertRadix: wrong to=${to}, base cannot be less than 2`);
        if (!Array.isArray(data)) throw new Error('convertRadix: data should be array');
        if (!data.length) return [];
        let pos = 0;
        const res = [];
        const digits = Array.from(data);
        digits.forEach(d => {
          assertNumber(d);
          if (d < 0 || d >= from) throw new Error(`Wrong integer: ${d}`);
        });
        while (true) {
          let carry = 0;
          let done = true;
          for (let i = pos; i < digits.length; i++) {
            const digit = digits[i];
            const digitBase = from * carry + digit;
            if (!Number.isSafeInteger(digitBase) || from * carry / from !== carry || digitBase - digit !== from * carry) {
              throw new Error('convertRadix: carry overflow');
            }
            carry = digitBase % to;
            digits[i] = Math.floor(digitBase / to);
            if (!Number.isSafeInteger(digits[i]) || digits[i] * to + carry !== digitBase) throw new Error('convertRadix: carry overflow');
            if (!done) continue;else if (!digits[i]) pos = i;else done = false;
          }
          res.push(carry);
          if (done) break;
        }
        for (let i = 0; i < data.length - 1 && data[i] === 0; i++) res.push(0);
        return res.reverse();
      }
      const gcd = (a, b) => !b ? a : gcd(b, a % b);
      const radix2carry = (from, to) => from + (to - gcd(from, to));
      function convertRadix2(data, from, to, padding) {
        if (!Array.isArray(data)) throw new Error('convertRadix2: data should be array');
        if (from <= 0 || from > 32) throw new Error(`convertRadix2: wrong from=${from}`);
        if (to <= 0 || to > 32) throw new Error(`convertRadix2: wrong to=${to}`);
        if (radix2carry(from, to) > 32) {
          throw new Error(`convertRadix2: carry overflow from=${from} to=${to} carryBits=${radix2carry(from, to)}`);
        }
        let carry = 0;
        let pos = 0;
        const mask = 2 ** to - 1;
        const res = [];
        for (const n of data) {
          assertNumber(n);
          if (n >= 2 ** from) throw new Error(`convertRadix2: invalid data word=${n} from=${from}`);
          carry = carry << from | n;
          if (pos + from > 32) throw new Error(`convertRadix2: carry overflow pos=${pos} from=${from}`);
          pos += from;
          for (; pos >= to; pos -= to) res.push((carry >> pos - to & mask) >>> 0);
          carry &= 2 ** pos - 1;
        }
        carry = carry << to - pos & mask;
        if (!padding && pos >= from) throw new Error('Excess padding');
        if (!padding && carry) throw new Error(`Non-zero padding: ${carry}`);
        if (padding && pos > 0) res.push(carry >>> 0);
        return res;
      }
      function radix(num) {
        assertNumber(num);
        return {
          encode: bytes => {
            if (!(bytes instanceof Uint8Array)) throw new Error('radix.encode input should be Uint8Array');
            return convertRadix(Array.from(bytes), 2 ** 8, num);
          },
          decode: digits => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('radix.decode input should be array of strings');
            return Uint8Array.from(convertRadix(digits, num, 2 ** 8));
          }
        };
      }
      function radix2(bits, revPadding = false) {
        assertNumber(bits);
        if (bits <= 0 || bits > 32) throw new Error('radix2: bits should be in (0..32]');
        if (radix2carry(8, bits) > 32 || radix2carry(bits, 8) > 32) throw new Error('radix2: carry overflow');
        return {
          encode: bytes => {
            if (!(bytes instanceof Uint8Array)) throw new Error('radix2.encode input should be Uint8Array');
            return convertRadix2(Array.from(bytes), 8, bits, !revPadding);
          },
          decode: digits => {
            if (!Array.isArray(digits) || digits.length && typeof digits[0] !== 'number') throw new Error('radix2.decode input should be array of strings');
            return Uint8Array.from(convertRadix2(digits, bits, 8, revPadding));
          }
        };
      }
      function unsafeWrapper(fn) {
        if (typeof fn !== 'function') throw new Error('unsafeWrapper fn should be function');
        return function (...args) {
          try {
            return fn.apply(null, args);
          } catch (e) {}
        };
      }
      function checksum(len, fn) {
        assertNumber(len);
        if (typeof fn !== 'function') throw new Error('checksum fn should be function');
        return {
          encode(data) {
            if (!(data instanceof Uint8Array)) throw new Error('checksum.encode: input should be Uint8Array');
            const checksum = fn(data).slice(0, len);
            const res = new Uint8Array(data.length + len);
            res.set(data);
            res.set(checksum, data.length);
            return res;
          },
          decode(data) {
            if (!(data instanceof Uint8Array)) throw new Error('checksum.decode: input should be Uint8Array');
            const payload = data.slice(0, -len);
            const newChecksum = fn(payload).slice(0, len);
            const oldChecksum = data.slice(-len);
            for (let i = 0; i < len; i++) if (newChecksum[i] !== oldChecksum[i]) throw new Error('Invalid checksum');
            return payload;
          }
        };
      }
      exports.utils = {
        alphabet,
        chain,
        checksum,
        radix,
        radix2,
        join,
        padding
      };
      exports.base16 = chain(radix2(4), alphabet('0123456789ABCDEF'), join(''));
      exports.base32 = chain(radix2(5), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'), padding(5), join(''));
      exports.base32hex = chain(radix2(5), alphabet('0123456789ABCDEFGHIJKLMNOPQRSTUV'), padding(5), join(''));
      exports.base32crockford = chain(radix2(5), alphabet('0123456789ABCDEFGHJKMNPQRSTVWXYZ'), join(''), normalize(s => s.toUpperCase().replace(/O/g, '0').replace(/[IL]/g, '1')));
      exports.base64 = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'), padding(6), join(''));
      exports.base64url = chain(radix2(6), alphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'), padding(6), join(''));
      const genBase58 = abc => chain(radix(58), alphabet(abc), join(''));
      exports.base58 = genBase58('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');
      exports.base58flickr = genBase58('123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ');
      exports.base58xrp = genBase58('rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz');
      const XMR_BLOCK_LEN = [0, 2, 3, 5, 6, 7, 9, 10, 11];
      exports.base58xmr = {
        encode(data) {
          let res = '';
          for (let i = 0; i < data.length; i += 8) {
            const block = data.subarray(i, i + 8);
            res += exports.base58.encode(block).padStart(XMR_BLOCK_LEN[block.length], '1');
          }
          return res;
        },
        decode(str) {
          let res = [];
          for (let i = 0; i < str.length; i += 11) {
            const slice = str.slice(i, i + 11);
            const blockLen = XMR_BLOCK_LEN.indexOf(slice.length);
            const block = exports.base58.decode(slice);
            for (let j = 0; j < block.length - blockLen; j++) {
              if (block[j] !== 0) throw new Error('base58xmr: wrong padding');
            }
            res = res.concat(Array.from(block.slice(block.length - blockLen)));
          }
          return Uint8Array.from(res);
        }
      };
      const base58check = sha256 => chain(checksum(4, data => sha256(sha256(data))), exports.base58);
      exports.base58check = base58check;
      const BECH_ALPHABET = chain(alphabet('qpzry9x8gf2tvdw0s3jn54khce6mua7l'), join(''));
      const POLYMOD_GENERATORS = [0x3b6a57b2, 0x26508e6d, 0x1ea119fa, 0x3d4233dd, 0x2a1462b3];
      function bech32Polymod(pre) {
        const b = pre >> 25;
        let chk = (pre & 0x1ffffff) << 5;
        for (let i = 0; i < POLYMOD_GENERATORS.length; i++) {
          if ((b >> i & 1) === 1) chk ^= POLYMOD_GENERATORS[i];
        }
        return chk;
      }
      function bechChecksum(prefix, words, encodingConst = 1) {
        const len = prefix.length;
        let chk = 1;
        for (let i = 0; i < len; i++) {
          const c = prefix.charCodeAt(i);
          if (c < 33 || c > 126) throw new Error(`Invalid prefix (${prefix})`);
          chk = bech32Polymod(chk) ^ c >> 5;
        }
        chk = bech32Polymod(chk);
        for (let i = 0; i < len; i++) chk = bech32Polymod(chk) ^ prefix.charCodeAt(i) & 0x1f;
        for (let v of words) chk = bech32Polymod(chk) ^ v;
        for (let i = 0; i < 6; i++) chk = bech32Polymod(chk);
        chk ^= encodingConst;
        return BECH_ALPHABET.encode(convertRadix2([chk % 2 ** 30], 30, 5, false));
      }
      function genBech32(encoding) {
        const ENCODING_CONST = encoding === 'bech32' ? 1 : 0x2bc830a3;
        const _words = radix2(5);
        const fromWords = _words.decode;
        const toWords = _words.encode;
        const fromWordsUnsafe = unsafeWrapper(fromWords);
        function encode(prefix, words, limit = 90) {
          if (typeof prefix !== 'string') throw new Error(`bech32.encode prefix should be string, not ${typeof prefix}`);
          if (!Array.isArray(words) || words.length && typeof words[0] !== 'number') throw new Error(`bech32.encode words should be array of numbers, not ${typeof words}`);
          const actualLength = prefix.length + 7 + words.length;
          if (limit !== false && actualLength > limit) throw new TypeError(`Length ${actualLength} exceeds limit ${limit}`);
          prefix = prefix.toLowerCase();
          return `${prefix}1${BECH_ALPHABET.encode(words)}${bechChecksum(prefix, words, ENCODING_CONST)}`;
        }
        function decode(str, limit = 90) {
          if (typeof str !== 'string') throw new Error(`bech32.decode input should be string, not ${typeof str}`);
          if (str.length < 8 || limit !== false && str.length > limit) throw new TypeError(`Wrong string length: ${str.length} (${str}). Expected (8..${limit})`);
          const lowered = str.toLowerCase();
          if (str !== lowered && str !== str.toUpperCase()) throw new Error(`String must be lowercase or uppercase`);
          str = lowered;
          const sepIndex = str.lastIndexOf('1');
          if (sepIndex === 0 || sepIndex === -1) throw new Error(`Letter "1" must be present between prefix and data only`);
          const prefix = str.slice(0, sepIndex);
          const _words = str.slice(sepIndex + 1);
          if (_words.length < 6) throw new Error('Data must be at least 6 characters long');
          const words = BECH_ALPHABET.decode(_words).slice(0, -6);
          const sum = bechChecksum(prefix, words, ENCODING_CONST);
          if (!_words.endsWith(sum)) throw new Error(`Invalid checksum in ${str}: expected "${sum}"`);
          return {
            prefix,
            words
          };
        }
        const decodeUnsafe = unsafeWrapper(decode);
        function decodeToBytes(str) {
          const {
            prefix,
            words
          } = decode(str, false);
          return {
            prefix,
            words,
            bytes: fromWords(words)
          };
        }
        return {
          encode,
          decode,
          decodeToBytes,
          decodeUnsafe,
          fromWords,
          fromWordsUnsafe,
          toWords
        };
      }
      exports.bech32 = genBech32('bech32');
      exports.bech32m = genBech32('bech32m');
      exports.utf8 = {
        encode: data => new TextDecoder().decode(data),
        decode: str => new TextEncoder().encode(str)
      };
      exports.hex = chain(radix2(4), alphabet('0123456789abcdef'), join(''), normalize(s => {
        if (typeof s !== 'string' || s.length % 2) throw new TypeError(`hex.decode: expected string, got ${typeof s} with length ${s.length}`);
        return s.toLowerCase();
      }));
      const CODERS = {
        utf8: exports.utf8,
        hex: exports.hex,
        base16: exports.base16,
        base32: exports.base32,
        base64: exports.base64,
        base64url: exports.base64url,
        base58: exports.base58,
        base58xmr: exports.base58xmr
      };
      const coderTypeError = `Invalid encoding type. Available types: ${Object.keys(CODERS).join(', ')}`;
      const bytesToString = (type, bytes) => {
        if (typeof type !== 'string' || !CODERS.hasOwnProperty(type)) throw new TypeError(coderTypeError);
        if (!(bytes instanceof Uint8Array)) throw new TypeError('bytesToString() expects Uint8Array');
        return CODERS[type].encode(bytes);
      };
      exports.bytesToString = bytesToString;
      exports.str = exports.bytesToString;
      const stringToBytes = (type, str) => {
        if (!CODERS.hasOwnProperty(type)) throw new TypeError(coderTypeError);
        if (typeof str !== 'string') throw new TypeError('stringToBytes() expects string');
        return CODERS[type].decode(str);
      };
      exports.stringToBytes = stringToBytes;
      exports.bytes = exports.stringToBytes;
    }, {}],
    80: [function (require, module, exports) {
      'use strict';

      function base(ALPHABET) {
        if (ALPHABET.length >= 255) {
          throw new TypeError('Alphabet too long');
        }
        var BASE_MAP = new Uint8Array(256);
        for (var j = 0; j < BASE_MAP.length; j++) {
          BASE_MAP[j] = 255;
        }
        for (var i = 0; i < ALPHABET.length; i++) {
          var x = ALPHABET.charAt(i);
          var xc = x.charCodeAt(0);
          if (BASE_MAP[xc] !== 255) {
            throw new TypeError(x + ' is ambiguous');
          }
          BASE_MAP[xc] = i;
        }
        var BASE = ALPHABET.length;
        var LEADER = ALPHABET.charAt(0);
        var FACTOR = Math.log(BASE) / Math.log(256);
        var iFACTOR = Math.log(256) / Math.log(BASE);
        function encode(source) {
          if (source instanceof Uint8Array) {} else if (ArrayBuffer.isView(source)) {
            source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
          } else if (Array.isArray(source)) {
            source = Uint8Array.from(source);
          }
          if (!(source instanceof Uint8Array)) {
            throw new TypeError('Expected Uint8Array');
          }
          if (source.length === 0) {
            return '';
          }
          var zeroes = 0;
          var length = 0;
          var pbegin = 0;
          var pend = source.length;
          while (pbegin !== pend && source[pbegin] === 0) {
            pbegin++;
            zeroes++;
          }
          var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
          var b58 = new Uint8Array(size);
          while (pbegin !== pend) {
            var carry = source[pbegin];
            var i = 0;
            for (var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
              carry += 256 * b58[it1] >>> 0;
              b58[it1] = carry % BASE >>> 0;
              carry = carry / BASE >>> 0;
            }
            if (carry !== 0) {
              throw new Error('Non-zero carry');
            }
            length = i;
            pbegin++;
          }
          var it2 = size - length;
          while (it2 !== size && b58[it2] === 0) {
            it2++;
          }
          var str = LEADER.repeat(zeroes);
          for (; it2 < size; ++it2) {
            str += ALPHABET.charAt(b58[it2]);
          }
          return str;
        }
        function decodeUnsafe(source) {
          if (typeof source !== 'string') {
            throw new TypeError('Expected String');
          }
          if (source.length === 0) {
            return new Uint8Array();
          }
          var psz = 0;
          var zeroes = 0;
          var length = 0;
          while (source[psz] === LEADER) {
            zeroes++;
            psz++;
          }
          var size = (source.length - psz) * FACTOR + 1 >>> 0;
          var b256 = new Uint8Array(size);
          while (source[psz]) {
            var carry = BASE_MAP[source.charCodeAt(psz)];
            if (carry === 255) {
              return;
            }
            var i = 0;
            for (var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
              carry += BASE * b256[it3] >>> 0;
              b256[it3] = carry % 256 >>> 0;
              carry = carry / 256 >>> 0;
            }
            if (carry !== 0) {
              throw new Error('Non-zero carry');
            }
            length = i;
            psz++;
          }
          var it4 = size - length;
          while (it4 !== size && b256[it4] === 0) {
            it4++;
          }
          var vch = new Uint8Array(zeroes + (size - it4));
          var j = zeroes;
          while (it4 !== size) {
            vch[j++] = b256[it4++];
          }
          return vch;
        }
        function decode(string) {
          var buffer = decodeUnsafe(string);
          if (buffer) {
            return buffer;
          }
          throw new Error('Non-base' + BASE + ' character');
        }
        return {
          encode: encode,
          decodeUnsafe: decodeUnsafe,
          decode: decode
        };
      }
      module.exports = base;
    }, {}],
    81: [function (require, module, exports) {
      const basex = require('base-x');
      const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
      module.exports = basex(ALPHABET);
    }, {
      "base-x": 80
    }],
    82: [function (require, module, exports) {
      (function (process) {
        (function () {
          exports.formatArgs = formatArgs;
          exports.save = save;
          exports.load = load;
          exports.useColors = useColors;
          exports.storage = localstorage();
          exports.destroy = (() => {
            let warned = false;
            return () => {
              if (!warned) {
                warned = true;
                console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
              }
            };
          })();
          exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];
          function useColors() {
            if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
              return true;
            }
            if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
              return false;
            }
            return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
          }
          function formatArgs(args) {
            args[0] = (this.useColors ? '%c' : '') + this.namespace + (this.useColors ? ' %c' : ' ') + args[0] + (this.useColors ? '%c ' : ' ') + '+' + module.exports.humanize(this.diff);
            if (!this.useColors) {
              return;
            }
            const c = 'color: ' + this.color;
            args.splice(1, 0, c, 'color: inherit');
            let index = 0;
            let lastC = 0;
            args[0].replace(/%[a-zA-Z%]/g, match => {
              if (match === '%%') {
                return;
              }
              index++;
              if (match === '%c') {
                lastC = index;
              }
            });
            args.splice(lastC, 0, c);
          }
          exports.log = console.debug || console.log || (() => {});
          function save(namespaces) {
            try {
              if (namespaces) {
                exports.storage.setItem('debug', namespaces);
              } else {
                exports.storage.removeItem('debug');
              }
            } catch (error) {}
          }
          function load() {
            let r;
            try {
              r = exports.storage.getItem('debug');
            } catch (error) {}
            if (!r && typeof process !== 'undefined' && 'env' in process) {
              r = process.env.DEBUG;
            }
            return r;
          }
          function localstorage() {
            try {
              return localStorage;
            } catch (error) {}
          }
          module.exports = require('./common')(exports);
          const {
            formatters
          } = module.exports;
          formatters.j = function (v) {
            try {
              return JSON.stringify(v);
            } catch (error) {
              return '[UnexpectedJSONParseError]: ' + error.message;
            }
          };
        }).call(this);
      }).call(this, require('_process'));
    }, {
      "./common": 83,
      "_process": 141
    }],
    83: [function (require, module, exports) {
      function setup(env) {
        createDebug.debug = createDebug;
        createDebug.default = createDebug;
        createDebug.coerce = coerce;
        createDebug.disable = disable;
        createDebug.enable = enable;
        createDebug.enabled = enabled;
        createDebug.humanize = require('ms');
        createDebug.destroy = destroy;
        Object.keys(env).forEach(key => {
          createDebug[key] = env[key];
        });
        createDebug.names = [];
        createDebug.skips = [];
        createDebug.formatters = {};
        function selectColor(namespace) {
          let hash = 0;
          for (let i = 0; i < namespace.length; i++) {
            hash = (hash << 5) - hash + namespace.charCodeAt(i);
            hash |= 0;
          }
          return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
        }
        createDebug.selectColor = selectColor;
        function createDebug(namespace) {
          let prevTime;
          let enableOverride = null;
          let namespacesCache;
          let enabledCache;
          function debug(...args) {
            if (!debug.enabled) {
              return;
            }
            const self = debug;
            const curr = Number(new Date());
            const ms = curr - (prevTime || curr);
            self.diff = ms;
            self.prev = prevTime;
            self.curr = curr;
            prevTime = curr;
            args[0] = createDebug.coerce(args[0]);
            if (typeof args[0] !== 'string') {
              args.unshift('%O');
            }
            let index = 0;
            args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
              if (match === '%%') {
                return '%';
              }
              index++;
              const formatter = createDebug.formatters[format];
              if (typeof formatter === 'function') {
                const val = args[index];
                match = formatter.call(self, val);
                args.splice(index, 1);
                index--;
              }
              return match;
            });
            createDebug.formatArgs.call(self, args);
            const logFn = self.log || createDebug.log;
            logFn.apply(self, args);
          }
          debug.namespace = namespace;
          debug.useColors = createDebug.useColors();
          debug.color = createDebug.selectColor(namespace);
          debug.extend = extend;
          debug.destroy = createDebug.destroy;
          Object.defineProperty(debug, 'enabled', {
            enumerable: true,
            configurable: false,
            get: () => {
              if (enableOverride !== null) {
                return enableOverride;
              }
              if (namespacesCache !== createDebug.namespaces) {
                namespacesCache = createDebug.namespaces;
                enabledCache = createDebug.enabled(namespace);
              }
              return enabledCache;
            },
            set: v => {
              enableOverride = v;
            }
          });
          if (typeof createDebug.init === 'function') {
            createDebug.init(debug);
          }
          return debug;
        }
        function extend(namespace, delimiter) {
          const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
          newDebug.log = this.log;
          return newDebug;
        }
        function enable(namespaces) {
          createDebug.save(namespaces);
          createDebug.namespaces = namespaces;
          createDebug.names = [];
          createDebug.skips = [];
          let i;
          const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
          const len = split.length;
          for (i = 0; i < len; i++) {
            if (!split[i]) {
              continue;
            }
            namespaces = split[i].replace(/\*/g, '.*?');
            if (namespaces[0] === '-') {
              createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
            } else {
              createDebug.names.push(new RegExp('^' + namespaces + '$'));
            }
          }
        }
        function disable() {
          const namespaces = [...createDebug.names.map(toNamespace), ...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)].join(',');
          createDebug.enable('');
          return namespaces;
        }
        function enabled(name) {
          if (name[name.length - 1] === '*') {
            return true;
          }
          let i;
          let len;
          for (i = 0, len = createDebug.skips.length; i < len; i++) {
            if (createDebug.skips[i].test(name)) {
              return false;
            }
          }
          for (i = 0, len = createDebug.names.length; i < len; i++) {
            if (createDebug.names[i].test(name)) {
              return true;
            }
          }
          return false;
        }
        function toNamespace(regexp) {
          return regexp.toString().substring(2, regexp.toString().length - 2).replace(/\.\*\?$/, '*');
        }
        function coerce(val) {
          if (val instanceof Error) {
            return val.stack || val.message;
          }
          return val;
        }
        function destroy() {
          console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
        }
        createDebug.enable(createDebug.load());
        return createDebug;
      }
      module.exports = setup;
    }, {
      "ms": 85
    }],
    84: [function (require, module, exports) {
      'use strict';

      const Yallist = require('yallist');
      const MAX = Symbol('max');
      const LENGTH = Symbol('length');
      const LENGTH_CALCULATOR = Symbol('lengthCalculator');
      const ALLOW_STALE = Symbol('allowStale');
      const MAX_AGE = Symbol('maxAge');
      const DISPOSE = Symbol('dispose');
      const NO_DISPOSE_ON_SET = Symbol('noDisposeOnSet');
      const LRU_LIST = Symbol('lruList');
      const CACHE = Symbol('cache');
      const UPDATE_AGE_ON_GET = Symbol('updateAgeOnGet');
      const naiveLength = () => 1;
      class LRUCache {
        constructor(options) {
          if (typeof options === 'number') options = {
            max: options
          };
          if (!options) options = {};
          if (options.max && (typeof options.max !== 'number' || options.max < 0)) throw new TypeError('max must be a non-negative number');
          const max = this[MAX] = options.max || Infinity;
          const lc = options.length || naiveLength;
          this[LENGTH_CALCULATOR] = typeof lc !== 'function' ? naiveLength : lc;
          this[ALLOW_STALE] = options.stale || false;
          if (options.maxAge && typeof options.maxAge !== 'number') throw new TypeError('maxAge must be a number');
          this[MAX_AGE] = options.maxAge || 0;
          this[DISPOSE] = options.dispose;
          this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
          this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
          this.reset();
        }
        set max(mL) {
          if (typeof mL !== 'number' || mL < 0) throw new TypeError('max must be a non-negative number');
          this[MAX] = mL || Infinity;
          trim(this);
        }
        get max() {
          return this[MAX];
        }
        set allowStale(allowStale) {
          this[ALLOW_STALE] = !!allowStale;
        }
        get allowStale() {
          return this[ALLOW_STALE];
        }
        set maxAge(mA) {
          if (typeof mA !== 'number') throw new TypeError('maxAge must be a non-negative number');
          this[MAX_AGE] = mA;
          trim(this);
        }
        get maxAge() {
          return this[MAX_AGE];
        }
        set lengthCalculator(lC) {
          if (typeof lC !== 'function') lC = naiveLength;
          if (lC !== this[LENGTH_CALCULATOR]) {
            this[LENGTH_CALCULATOR] = lC;
            this[LENGTH] = 0;
            this[LRU_LIST].forEach(hit => {
              hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
              this[LENGTH] += hit.length;
            });
          }
          trim(this);
        }
        get lengthCalculator() {
          return this[LENGTH_CALCULATOR];
        }
        get length() {
          return this[LENGTH];
        }
        get itemCount() {
          return this[LRU_LIST].length;
        }
        rforEach(fn, thisp) {
          thisp = thisp || this;
          for (let walker = this[LRU_LIST].tail; walker !== null;) {
            const prev = walker.prev;
            forEachStep(this, fn, walker, thisp);
            walker = prev;
          }
        }
        forEach(fn, thisp) {
          thisp = thisp || this;
          for (let walker = this[LRU_LIST].head; walker !== null;) {
            const next = walker.next;
            forEachStep(this, fn, walker, thisp);
            walker = next;
          }
        }
        keys() {
          return this[LRU_LIST].toArray().map(k => k.key);
        }
        values() {
          return this[LRU_LIST].toArray().map(k => k.value);
        }
        reset() {
          if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
            this[LRU_LIST].forEach(hit => this[DISPOSE](hit.key, hit.value));
          }
          this[CACHE] = new Map();
          this[LRU_LIST] = new Yallist();
          this[LENGTH] = 0;
        }
        dump() {
          return this[LRU_LIST].map(hit => isStale(this, hit) ? false : {
            k: hit.key,
            v: hit.value,
            e: hit.now + (hit.maxAge || 0)
          }).toArray().filter(h => h);
        }
        dumpLru() {
          return this[LRU_LIST];
        }
        set(key, value, maxAge) {
          maxAge = maxAge || this[MAX_AGE];
          if (maxAge && typeof maxAge !== 'number') throw new TypeError('maxAge must be a number');
          const now = maxAge ? Date.now() : 0;
          const len = this[LENGTH_CALCULATOR](value, key);
          if (this[CACHE].has(key)) {
            if (len > this[MAX]) {
              del(this, this[CACHE].get(key));
              return false;
            }
            const node = this[CACHE].get(key);
            const item = node.value;
            if (this[DISPOSE]) {
              if (!this[NO_DISPOSE_ON_SET]) this[DISPOSE](key, item.value);
            }
            item.now = now;
            item.maxAge = maxAge;
            item.value = value;
            this[LENGTH] += len - item.length;
            item.length = len;
            this.get(key);
            trim(this);
            return true;
          }
          const hit = new Entry(key, value, len, now, maxAge);
          if (hit.length > this[MAX]) {
            if (this[DISPOSE]) this[DISPOSE](key, value);
            return false;
          }
          this[LENGTH] += hit.length;
          this[LRU_LIST].unshift(hit);
          this[CACHE].set(key, this[LRU_LIST].head);
          trim(this);
          return true;
        }
        has(key) {
          if (!this[CACHE].has(key)) return false;
          const hit = this[CACHE].get(key).value;
          return !isStale(this, hit);
        }
        get(key) {
          return get(this, key, true);
        }
        peek(key) {
          return get(this, key, false);
        }
        pop() {
          const node = this[LRU_LIST].tail;
          if (!node) return null;
          del(this, node);
          return node.value;
        }
        del(key) {
          del(this, this[CACHE].get(key));
        }
        load(arr) {
          this.reset();
          const now = Date.now();
          for (let l = arr.length - 1; l >= 0; l--) {
            const hit = arr[l];
            const expiresAt = hit.e || 0;
            if (expiresAt === 0) this.set(hit.k, hit.v);else {
              const maxAge = expiresAt - now;
              if (maxAge > 0) {
                this.set(hit.k, hit.v, maxAge);
              }
            }
          }
        }
        prune() {
          this[CACHE].forEach((value, key) => get(this, key, false));
        }
      }
      const get = (self, key, doUse) => {
        const node = self[CACHE].get(key);
        if (node) {
          const hit = node.value;
          if (isStale(self, hit)) {
            del(self, node);
            if (!self[ALLOW_STALE]) return undefined;
          } else {
            if (doUse) {
              if (self[UPDATE_AGE_ON_GET]) node.value.now = Date.now();
              self[LRU_LIST].unshiftNode(node);
            }
          }
          return hit.value;
        }
      };
      const isStale = (self, hit) => {
        if (!hit || !hit.maxAge && !self[MAX_AGE]) return false;
        const diff = Date.now() - hit.now;
        return hit.maxAge ? diff > hit.maxAge : self[MAX_AGE] && diff > self[MAX_AGE];
      };
      const trim = self => {
        if (self[LENGTH] > self[MAX]) {
          for (let walker = self[LRU_LIST].tail; self[LENGTH] > self[MAX] && walker !== null;) {
            const prev = walker.prev;
            del(self, walker);
            walker = prev;
          }
        }
      };
      const del = (self, node) => {
        if (node) {
          const hit = node.value;
          if (self[DISPOSE]) self[DISPOSE](hit.key, hit.value);
          self[LENGTH] -= hit.length;
          self[CACHE].delete(hit.key);
          self[LRU_LIST].removeNode(node);
        }
      };
      class Entry {
        constructor(key, value, length, now, maxAge) {
          this.key = key;
          this.value = value;
          this.length = length;
          this.now = now;
          this.maxAge = maxAge || 0;
        }
      }
      const forEachStep = (self, fn, node, thisp) => {
        let hit = node.value;
        if (isStale(self, hit)) {
          del(self, node);
          if (!self[ALLOW_STALE]) hit = undefined;
        }
        if (hit) fn.call(thisp, hit.value, hit.key, self);
      };
      module.exports = LRUCache;
    }, {
      "yallist": 133
    }],
    85: [function (require, module, exports) {
      var s = 1000;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var w = d * 7;
      var y = d * 365.25;
      module.exports = function (val, options) {
        options = options || {};
        var type = typeof val;
        if (type === 'string' && val.length > 0) {
          return parse(val);
        } else if (type === 'number' && isFinite(val)) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || 'ms').toLowerCase();
        switch (type) {
          case 'years':
          case 'year':
          case 'yrs':
          case 'yr':
          case 'y':
            return n * y;
          case 'weeks':
          case 'week':
          case 'w':
            return n * w;
          case 'days':
          case 'day':
          case 'd':
            return n * d;
          case 'hours':
          case 'hour':
          case 'hrs':
          case 'hr':
          case 'h':
            return n * h;
          case 'minutes':
          case 'minute':
          case 'mins':
          case 'min':
          case 'm':
            return n * m;
          case 'seconds':
          case 'second':
          case 'secs':
          case 'sec':
          case 's':
            return n * s;
          case 'milliseconds':
          case 'millisecond':
          case 'msecs':
          case 'msec':
          case 'ms':
            return n;
          default:
            return undefined;
        }
      }
      function fmtShort(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return Math.round(ms / d) + 'd';
        }
        if (msAbs >= h) {
          return Math.round(ms / h) + 'h';
        }
        if (msAbs >= m) {
          return Math.round(ms / m) + 'm';
        }
        if (msAbs >= s) {
          return Math.round(ms / s) + 's';
        }
        return ms + 'ms';
      }
      function fmtLong(ms) {
        var msAbs = Math.abs(ms);
        if (msAbs >= d) {
          return plural(ms, msAbs, d, 'day');
        }
        if (msAbs >= h) {
          return plural(ms, msAbs, h, 'hour');
        }
        if (msAbs >= m) {
          return plural(ms, msAbs, m, 'minute');
        }
        if (msAbs >= s) {
          return plural(ms, msAbs, s, 'second');
        }
        return ms + ' ms';
      }
      function plural(ms, msAbs, n, name) {
        var isPlural = msAbs >= n * 1.5;
        return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
      }
    }, {}],
    86: [function (require, module, exports) {
      const ANY = Symbol('SemVer ANY');
      class Comparator {
        static get ANY() {
          return ANY;
        }
        constructor(comp, options) {
          options = parseOptions(options);
          if (comp instanceof Comparator) {
            if (comp.loose === !!options.loose) {
              return comp;
            } else {
              comp = comp.value;
            }
          }
          debug('comparator', comp, options);
          this.options = options;
          this.loose = !!options.loose;
          this.parse(comp);
          if (this.semver === ANY) {
            this.value = '';
          } else {
            this.value = this.operator + this.semver.version;
          }
          debug('comp', this);
        }
        parse(comp) {
          const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
          const m = comp.match(r);
          if (!m) {
            throw new TypeError(`Invalid comparator: ${comp}`);
          }
          this.operator = m[1] !== undefined ? m[1] : '';
          if (this.operator === '=') {
            this.operator = '';
          }
          if (!m[2]) {
            this.semver = ANY;
          } else {
            this.semver = new SemVer(m[2], this.options.loose);
          }
        }
        toString() {
          return this.value;
        }
        test(version) {
          debug('Comparator.test', version, this.options.loose);
          if (this.semver === ANY || version === ANY) {
            return true;
          }
          if (typeof version === 'string') {
            try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return false;
            }
          }
          return cmp(version, this.operator, this.semver, this.options);
        }
        intersects(comp, options) {
          if (!(comp instanceof Comparator)) {
            throw new TypeError('a Comparator is required');
          }
          if (!options || typeof options !== 'object') {
            options = {
              loose: !!options,
              includePrerelease: false
            };
          }
          if (this.operator === '') {
            if (this.value === '') {
              return true;
            }
            return new Range(comp.value, options).test(this.value);
          } else if (comp.operator === '') {
            if (comp.value === '') {
              return true;
            }
            return new Range(this.value, options).test(comp.semver);
          }
          const sameDirectionIncreasing = (this.operator === '>=' || this.operator === '>') && (comp.operator === '>=' || comp.operator === '>');
          const sameDirectionDecreasing = (this.operator === '<=' || this.operator === '<') && (comp.operator === '<=' || comp.operator === '<');
          const sameSemVer = this.semver.version === comp.semver.version;
          const differentDirectionsInclusive = (this.operator === '>=' || this.operator === '<=') && (comp.operator === '>=' || comp.operator === '<=');
          const oppositeDirectionsLessThan = cmp(this.semver, '<', comp.semver, options) && (this.operator === '>=' || this.operator === '>') && (comp.operator === '<=' || comp.operator === '<');
          const oppositeDirectionsGreaterThan = cmp(this.semver, '>', comp.semver, options) && (this.operator === '<=' || this.operator === '<') && (comp.operator === '>=' || comp.operator === '>');
          return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
        }
      }
      module.exports = Comparator;
      const parseOptions = require('../internal/parse-options');
      const {
        re,
        t
      } = require('../internal/re');
      const cmp = require('../functions/cmp');
      const debug = require('../internal/debug');
      const SemVer = require('./semver');
      const Range = require('./range');
    }, {
      "../functions/cmp": 90,
      "../internal/debug": 115,
      "../internal/parse-options": 117,
      "../internal/re": 118,
      "./range": 87,
      "./semver": 88
    }],
    87: [function (require, module, exports) {
      class Range {
        constructor(range, options) {
          options = parseOptions(options);
          if (range instanceof Range) {
            if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
              return range;
            } else {
              return new Range(range.raw, options);
            }
          }
          if (range instanceof Comparator) {
            this.raw = range.value;
            this.set = [[range]];
            this.format();
            return this;
          }
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          this.raw = range;
          this.set = range.split('||').map(r => this.parseRange(r.trim())).filter(c => c.length);
          if (!this.set.length) {
            throw new TypeError(`Invalid SemVer Range: ${range}`);
          }
          if (this.set.length > 1) {
            const first = this.set[0];
            this.set = this.set.filter(c => !isNullSet(c[0]));
            if (this.set.length === 0) {
              this.set = [first];
            } else if (this.set.length > 1) {
              for (const c of this.set) {
                if (c.length === 1 && isAny(c[0])) {
                  this.set = [c];
                  break;
                }
              }
            }
          }
          this.format();
        }
        format() {
          this.range = this.set.map(comps => {
            return comps.join(' ').trim();
          }).join('||').trim();
          return this.range;
        }
        toString() {
          return this.range;
        }
        parseRange(range) {
          range = range.trim();
          const memoOpts = Object.keys(this.options).join(',');
          const memoKey = `parseRange:${memoOpts}:${range}`;
          const cached = cache.get(memoKey);
          if (cached) {
            return cached;
          }
          const loose = this.options.loose;
          const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
          range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
          debug('hyphen replace', range);
          range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
          debug('comparator trim', range);
          range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
          range = range.replace(re[t.CARETTRIM], caretTrimReplace);
          range = range.split(/\s+/).join(' ');
          let rangeList = range.split(' ').map(comp => parseComparator(comp, this.options)).join(' ').split(/\s+/).map(comp => replaceGTE0(comp, this.options));
          if (loose) {
            rangeList = rangeList.filter(comp => {
              debug('loose invalid filter', comp, this.options);
              return !!comp.match(re[t.COMPARATORLOOSE]);
            });
          }
          debug('range list', rangeList);
          const rangeMap = new Map();
          const comparators = rangeList.map(comp => new Comparator(comp, this.options));
          for (const comp of comparators) {
            if (isNullSet(comp)) {
              return [comp];
            }
            rangeMap.set(comp.value, comp);
          }
          if (rangeMap.size > 1 && rangeMap.has('')) {
            rangeMap.delete('');
          }
          const result = [...rangeMap.values()];
          cache.set(memoKey, result);
          return result;
        }
        intersects(range, options) {
          if (!(range instanceof Range)) {
            throw new TypeError('a Range is required');
          }
          return this.set.some(thisComparators => {
            return isSatisfiable(thisComparators, options) && range.set.some(rangeComparators => {
              return isSatisfiable(rangeComparators, options) && thisComparators.every(thisComparator => {
                return rangeComparators.every(rangeComparator => {
                  return thisComparator.intersects(rangeComparator, options);
                });
              });
            });
          });
        }
        test(version) {
          if (!version) {
            return false;
          }
          if (typeof version === 'string') {
            try {
              version = new SemVer(version, this.options);
            } catch (er) {
              return false;
            }
          }
          for (let i = 0; i < this.set.length; i++) {
            if (testSet(this.set[i], version, this.options)) {
              return true;
            }
          }
          return false;
        }
      }
      module.exports = Range;
      const LRU = require('lru-cache');
      const cache = new LRU({
        max: 1000
      });
      const parseOptions = require('../internal/parse-options');
      const Comparator = require('./comparator');
      const debug = require('../internal/debug');
      const SemVer = require('./semver');
      const {
        re,
        t,
        comparatorTrimReplace,
        tildeTrimReplace,
        caretTrimReplace
      } = require('../internal/re');
      const isNullSet = c => c.value === '<0.0.0-0';
      const isAny = c => c.value === '';
      const isSatisfiable = (comparators, options) => {
        let result = true;
        const remainingComparators = comparators.slice();
        let testComparator = remainingComparators.pop();
        while (result && remainingComparators.length) {
          result = remainingComparators.every(otherComparator => {
            return testComparator.intersects(otherComparator, options);
          });
          testComparator = remainingComparators.pop();
        }
        return result;
      };
      const parseComparator = (comp, options) => {
        debug('comp', comp, options);
        comp = replaceCarets(comp, options);
        debug('caret', comp);
        comp = replaceTildes(comp, options);
        debug('tildes', comp);
        comp = replaceXRanges(comp, options);
        debug('xrange', comp);
        comp = replaceStars(comp, options);
        debug('stars', comp);
        return comp;
      };
      const isX = id => !id || id.toLowerCase() === 'x' || id === '*';
      const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map(c => {
        return replaceTilde(c, options);
      }).join(' ');
      const replaceTilde = (comp, options) => {
        const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
        return comp.replace(r, (_, M, m, p, pr) => {
          debug('tilde', comp, _, M, m, p, pr);
          let ret;
          if (isX(M)) {
            ret = '';
          } else if (isX(m)) {
            ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
          } else if (isX(p)) {
            ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
          } else if (pr) {
            debug('replaceTilde pr', pr);
            ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
          }
          debug('tilde return', ret);
          return ret;
        });
      };
      const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map(c => {
        return replaceCaret(c, options);
      }).join(' ');
      const replaceCaret = (comp, options) => {
        debug('caret', comp, options);
        const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
        const z = options.includePrerelease ? '-0' : '';
        return comp.replace(r, (_, M, m, p, pr) => {
          debug('caret', comp, _, M, m, p, pr);
          let ret;
          if (isX(M)) {
            ret = '';
          } else if (isX(m)) {
            ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
          } else if (isX(p)) {
            if (M === '0') {
              ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
            } else {
              ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
            }
          } else if (pr) {
            debug('replaceCaret pr', pr);
            if (M === '0') {
              if (m === '0') {
                ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
              } else {
                ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
              }
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
            }
          } else {
            debug('no pr');
            if (M === '0') {
              if (m === '0') {
                ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
              } else {
                ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
              }
            } else {
              ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
            }
          }
          debug('caret return', ret);
          return ret;
        });
      };
      const replaceXRanges = (comp, options) => {
        debug('replaceXRanges', comp, options);
        return comp.split(/\s+/).map(c => {
          return replaceXRange(c, options);
        }).join(' ');
      };
      const replaceXRange = (comp, options) => {
        comp = comp.trim();
        const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
        return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
          debug('xRange', comp, ret, gtlt, M, m, p, pr);
          const xM = isX(M);
          const xm = xM || isX(m);
          const xp = xm || isX(p);
          const anyX = xp;
          if (gtlt === '=' && anyX) {
            gtlt = '';
          }
          pr = options.includePrerelease ? '-0' : '';
          if (xM) {
            if (gtlt === '>' || gtlt === '<') {
              ret = '<0.0.0-0';
            } else {
              ret = '*';
            }
          } else if (gtlt && anyX) {
            if (xm) {
              m = 0;
            }
            p = 0;
            if (gtlt === '>') {
              gtlt = '>=';
              if (xm) {
                M = +M + 1;
                m = 0;
                p = 0;
              } else {
                m = +m + 1;
                p = 0;
              }
            } else if (gtlt === '<=') {
              gtlt = '<';
              if (xm) {
                M = +M + 1;
              } else {
                m = +m + 1;
              }
            }
            if (gtlt === '<') {
              pr = '-0';
            }
            ret = `${gtlt + M}.${m}.${p}${pr}`;
          } else if (xm) {
            ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
          } else if (xp) {
            ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
          }
          debug('xRange return', ret);
          return ret;
        });
      };
      const replaceStars = (comp, options) => {
        debug('replaceStars', comp, options);
        return comp.trim().replace(re[t.STAR], '');
      };
      const replaceGTE0 = (comp, options) => {
        debug('replaceGTE0', comp, options);
        return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], '');
      };
      const hyphenReplace = incPr => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
        if (isX(fM)) {
          from = '';
        } else if (isX(fm)) {
          from = `>=${fM}.0.0${incPr ? '-0' : ''}`;
        } else if (isX(fp)) {
          from = `>=${fM}.${fm}.0${incPr ? '-0' : ''}`;
        } else if (fpr) {
          from = `>=${from}`;
        } else {
          from = `>=${from}${incPr ? '-0' : ''}`;
        }
        if (isX(tM)) {
          to = '';
        } else if (isX(tm)) {
          to = `<${+tM + 1}.0.0-0`;
        } else if (isX(tp)) {
          to = `<${tM}.${+tm + 1}.0-0`;
        } else if (tpr) {
          to = `<=${tM}.${tm}.${tp}-${tpr}`;
        } else if (incPr) {
          to = `<${tM}.${tm}.${+tp + 1}-0`;
        } else {
          to = `<=${to}`;
        }
        return `${from} ${to}`.trim();
      };
      const testSet = (set, version, options) => {
        for (let i = 0; i < set.length; i++) {
          if (!set[i].test(version)) {
            return false;
          }
        }
        if (version.prerelease.length && !options.includePrerelease) {
          for (let i = 0; i < set.length; i++) {
            debug(set[i].semver);
            if (set[i].semver === Comparator.ANY) {
              continue;
            }
            if (set[i].semver.prerelease.length > 0) {
              const allowed = set[i].semver;
              if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
                return true;
              }
            }
          }
          return false;
        }
        return true;
      };
    }, {
      "../internal/debug": 115,
      "../internal/parse-options": 117,
      "../internal/re": 118,
      "./comparator": 86,
      "./semver": 88,
      "lru-cache": 84
    }],
    88: [function (require, module, exports) {
      const debug = require('../internal/debug');
      const {
        MAX_LENGTH,
        MAX_SAFE_INTEGER
      } = require('../internal/constants');
      const {
        re,
        t
      } = require('../internal/re');
      const parseOptions = require('../internal/parse-options');
      const {
        compareIdentifiers
      } = require('../internal/identifiers');
      class SemVer {
        constructor(version, options) {
          options = parseOptions(options);
          if (version instanceof SemVer) {
            if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
              return version;
            } else {
              version = version.version;
            }
          } else if (typeof version !== 'string') {
            throw new TypeError(`Invalid Version: ${version}`);
          }
          if (version.length > MAX_LENGTH) {
            throw new TypeError(`version is longer than ${MAX_LENGTH} characters`);
          }
          debug('SemVer', version, options);
          this.options = options;
          this.loose = !!options.loose;
          this.includePrerelease = !!options.includePrerelease;
          const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
          if (!m) {
            throw new TypeError(`Invalid Version: ${version}`);
          }
          this.raw = version;
          this.major = +m[1];
          this.minor = +m[2];
          this.patch = +m[3];
          if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
            throw new TypeError('Invalid major version');
          }
          if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
            throw new TypeError('Invalid minor version');
          }
          if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
            throw new TypeError('Invalid patch version');
          }
          if (!m[4]) {
            this.prerelease = [];
          } else {
            this.prerelease = m[4].split('.').map(id => {
              if (/^[0-9]+$/.test(id)) {
                const num = +id;
                if (num >= 0 && num < MAX_SAFE_INTEGER) {
                  return num;
                }
              }
              return id;
            });
          }
          this.build = m[5] ? m[5].split('.') : [];
          this.format();
        }
        format() {
          this.version = `${this.major}.${this.minor}.${this.patch}`;
          if (this.prerelease.length) {
            this.version += `-${this.prerelease.join('.')}`;
          }
          return this.version;
        }
        toString() {
          return this.version;
        }
        compare(other) {
          debug('SemVer.compare', this.version, this.options, other);
          if (!(other instanceof SemVer)) {
            if (typeof other === 'string' && other === this.version) {
              return 0;
            }
            other = new SemVer(other, this.options);
          }
          if (other.version === this.version) {
            return 0;
          }
          return this.compareMain(other) || this.comparePre(other);
        }
        compareMain(other) {
          if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
          }
          return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
        }
        comparePre(other) {
          if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
          }
          if (this.prerelease.length && !other.prerelease.length) {
            return -1;
          } else if (!this.prerelease.length && other.prerelease.length) {
            return 1;
          } else if (!this.prerelease.length && !other.prerelease.length) {
            return 0;
          }
          let i = 0;
          do {
            const a = this.prerelease[i];
            const b = other.prerelease[i];
            debug('prerelease compare', i, a, b);
            if (a === undefined && b === undefined) {
              return 0;
            } else if (b === undefined) {
              return 1;
            } else if (a === undefined) {
              return -1;
            } else if (a === b) {
              continue;
            } else {
              return compareIdentifiers(a, b);
            }
          } while (++i);
        }
        compareBuild(other) {
          if (!(other instanceof SemVer)) {
            other = new SemVer(other, this.options);
          }
          let i = 0;
          do {
            const a = this.build[i];
            const b = other.build[i];
            debug('prerelease compare', i, a, b);
            if (a === undefined && b === undefined) {
              return 0;
            } else if (b === undefined) {
              return 1;
            } else if (a === undefined) {
              return -1;
            } else if (a === b) {
              continue;
            } else {
              return compareIdentifiers(a, b);
            }
          } while (++i);
        }
        inc(release, identifier) {
          switch (release) {
            case 'premajor':
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor = 0;
              this.major++;
              this.inc('pre', identifier);
              break;
            case 'preminor':
              this.prerelease.length = 0;
              this.patch = 0;
              this.minor++;
              this.inc('pre', identifier);
              break;
            case 'prepatch':
              this.prerelease.length = 0;
              this.inc('patch', identifier);
              this.inc('pre', identifier);
              break;
            case 'prerelease':
              if (this.prerelease.length === 0) {
                this.inc('patch', identifier);
              }
              this.inc('pre', identifier);
              break;
            case 'major':
              if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
                this.major++;
              }
              this.minor = 0;
              this.patch = 0;
              this.prerelease = [];
              break;
            case 'minor':
              if (this.patch !== 0 || this.prerelease.length === 0) {
                this.minor++;
              }
              this.patch = 0;
              this.prerelease = [];
              break;
            case 'patch':
              if (this.prerelease.length === 0) {
                this.patch++;
              }
              this.prerelease = [];
              break;
            case 'pre':
              if (this.prerelease.length === 0) {
                this.prerelease = [0];
              } else {
                let i = this.prerelease.length;
                while (--i >= 0) {
                  if (typeof this.prerelease[i] === 'number') {
                    this.prerelease[i]++;
                    i = -2;
                  }
                }
                if (i === -1) {
                  this.prerelease.push(0);
                }
              }
              if (identifier) {
                if (compareIdentifiers(this.prerelease[0], identifier) === 0) {
                  if (isNaN(this.prerelease[1])) {
                    this.prerelease = [identifier, 0];
                  }
                } else {
                  this.prerelease = [identifier, 0];
                }
              }
              break;
            default:
              throw new Error(`invalid increment argument: ${release}`);
          }
          this.format();
          this.raw = this.version;
          return this;
        }
      }
      module.exports = SemVer;
    }, {
      "../internal/constants": 114,
      "../internal/debug": 115,
      "../internal/identifiers": 116,
      "../internal/parse-options": 117,
      "../internal/re": 118
    }],
    89: [function (require, module, exports) {
      const parse = require('./parse');
      const clean = (version, options) => {
        const s = parse(version.trim().replace(/^[=v]+/, ''), options);
        return s ? s.version : null;
      };
      module.exports = clean;
    }, {
      "./parse": 105
    }],
    90: [function (require, module, exports) {
      const eq = require('./eq');
      const neq = require('./neq');
      const gt = require('./gt');
      const gte = require('./gte');
      const lt = require('./lt');
      const lte = require('./lte');
      const cmp = (a, op, b, loose) => {
        switch (op) {
          case '===':
            if (typeof a === 'object') {
              a = a.version;
            }
            if (typeof b === 'object') {
              b = b.version;
            }
            return a === b;
          case '!==':
            if (typeof a === 'object') {
              a = a.version;
            }
            if (typeof b === 'object') {
              b = b.version;
            }
            return a !== b;
          case '':
          case '=':
          case '==':
            return eq(a, b, loose);
          case '!=':
            return neq(a, b, loose);
          case '>':
            return gt(a, b, loose);
          case '>=':
            return gte(a, b, loose);
          case '<':
            return lt(a, b, loose);
          case '<=':
            return lte(a, b, loose);
          default:
            throw new TypeError(`Invalid operator: ${op}`);
        }
      };
      module.exports = cmp;
    }, {
      "./eq": 96,
      "./gt": 97,
      "./gte": 98,
      "./lt": 100,
      "./lte": 101,
      "./neq": 104
    }],
    91: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const parse = require('./parse');
      const {
        re,
        t
      } = require('../internal/re');
      const coerce = (version, options) => {
        if (version instanceof SemVer) {
          return version;
        }
        if (typeof version === 'number') {
          version = String(version);
        }
        if (typeof version !== 'string') {
          return null;
        }
        options = options || {};
        let match = null;
        if (!options.rtl) {
          match = version.match(re[t.COERCE]);
        } else {
          let next;
          while ((next = re[t.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
            if (!match || next.index + next[0].length !== match.index + match[0].length) {
              match = next;
            }
            re[t.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
          }
          re[t.COERCERTL].lastIndex = -1;
        }
        if (match === null) {
          return null;
        }
        return parse(`${match[2]}.${match[3] || '0'}.${match[4] || '0'}`, options);
      };
      module.exports = coerce;
    }, {
      "../classes/semver": 88,
      "../internal/re": 118,
      "./parse": 105
    }],
    92: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const compareBuild = (a, b, loose) => {
        const versionA = new SemVer(a, loose);
        const versionB = new SemVer(b, loose);
        return versionA.compare(versionB) || versionA.compareBuild(versionB);
      };
      module.exports = compareBuild;
    }, {
      "../classes/semver": 88
    }],
    93: [function (require, module, exports) {
      const compare = require('./compare');
      const compareLoose = (a, b) => compare(a, b, true);
      module.exports = compareLoose;
    }, {
      "./compare": 94
    }],
    94: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
      module.exports = compare;
    }, {
      "../classes/semver": 88
    }],
    95: [function (require, module, exports) {
      const parse = require('./parse');
      const eq = require('./eq');
      const diff = (version1, version2) => {
        if (eq(version1, version2)) {
          return null;
        } else {
          const v1 = parse(version1);
          const v2 = parse(version2);
          const hasPre = v1.prerelease.length || v2.prerelease.length;
          const prefix = hasPre ? 'pre' : '';
          const defaultResult = hasPre ? 'prerelease' : '';
          for (const key in v1) {
            if (key === 'major' || key === 'minor' || key === 'patch') {
              if (v1[key] !== v2[key]) {
                return prefix + key;
              }
            }
          }
          return defaultResult;
        }
      };
      module.exports = diff;
    }, {
      "./eq": 96,
      "./parse": 105
    }],
    96: [function (require, module, exports) {
      const compare = require('./compare');
      const eq = (a, b, loose) => compare(a, b, loose) === 0;
      module.exports = eq;
    }, {
      "./compare": 94
    }],
    97: [function (require, module, exports) {
      const compare = require('./compare');
      const gt = (a, b, loose) => compare(a, b, loose) > 0;
      module.exports = gt;
    }, {
      "./compare": 94
    }],
    98: [function (require, module, exports) {
      const compare = require('./compare');
      const gte = (a, b, loose) => compare(a, b, loose) >= 0;
      module.exports = gte;
    }, {
      "./compare": 94
    }],
    99: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const inc = (version, release, options, identifier) => {
        if (typeof options === 'string') {
          identifier = options;
          options = undefined;
        }
        try {
          return new SemVer(version instanceof SemVer ? version.version : version, options).inc(release, identifier).version;
        } catch (er) {
          return null;
        }
      };
      module.exports = inc;
    }, {
      "../classes/semver": 88
    }],
    100: [function (require, module, exports) {
      const compare = require('./compare');
      const lt = (a, b, loose) => compare(a, b, loose) < 0;
      module.exports = lt;
    }, {
      "./compare": 94
    }],
    101: [function (require, module, exports) {
      const compare = require('./compare');
      const lte = (a, b, loose) => compare(a, b, loose) <= 0;
      module.exports = lte;
    }, {
      "./compare": 94
    }],
    102: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const major = (a, loose) => new SemVer(a, loose).major;
      module.exports = major;
    }, {
      "../classes/semver": 88
    }],
    103: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const minor = (a, loose) => new SemVer(a, loose).minor;
      module.exports = minor;
    }, {
      "../classes/semver": 88
    }],
    104: [function (require, module, exports) {
      const compare = require('./compare');
      const neq = (a, b, loose) => compare(a, b, loose) !== 0;
      module.exports = neq;
    }, {
      "./compare": 94
    }],
    105: [function (require, module, exports) {
      const {
        MAX_LENGTH
      } = require('../internal/constants');
      const {
        re,
        t
      } = require('../internal/re');
      const SemVer = require('../classes/semver');
      const parseOptions = require('../internal/parse-options');
      const parse = (version, options) => {
        options = parseOptions(options);
        if (version instanceof SemVer) {
          return version;
        }
        if (typeof version !== 'string') {
          return null;
        }
        if (version.length > MAX_LENGTH) {
          return null;
        }
        const r = options.loose ? re[t.LOOSE] : re[t.FULL];
        if (!r.test(version)) {
          return null;
        }
        try {
          return new SemVer(version, options);
        } catch (er) {
          return null;
        }
      };
      module.exports = parse;
    }, {
      "../classes/semver": 88,
      "../internal/constants": 114,
      "../internal/parse-options": 117,
      "../internal/re": 118
    }],
    106: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const patch = (a, loose) => new SemVer(a, loose).patch;
      module.exports = patch;
    }, {
      "../classes/semver": 88
    }],
    107: [function (require, module, exports) {
      const parse = require('./parse');
      const prerelease = (version, options) => {
        const parsed = parse(version, options);
        return parsed && parsed.prerelease.length ? parsed.prerelease : null;
      };
      module.exports = prerelease;
    }, {
      "./parse": 105
    }],
    108: [function (require, module, exports) {
      const compare = require('./compare');
      const rcompare = (a, b, loose) => compare(b, a, loose);
      module.exports = rcompare;
    }, {
      "./compare": 94
    }],
    109: [function (require, module, exports) {
      const compareBuild = require('./compare-build');
      const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
      module.exports = rsort;
    }, {
      "./compare-build": 92
    }],
    110: [function (require, module, exports) {
      const Range = require('../classes/range');
      const satisfies = (version, range, options) => {
        try {
          range = new Range(range, options);
        } catch (er) {
          return false;
        }
        return range.test(version);
      };
      module.exports = satisfies;
    }, {
      "../classes/range": 87
    }],
    111: [function (require, module, exports) {
      const compareBuild = require('./compare-build');
      const sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
      module.exports = sort;
    }, {
      "./compare-build": 92
    }],
    112: [function (require, module, exports) {
      const parse = require('./parse');
      const valid = (version, options) => {
        const v = parse(version, options);
        return v ? v.version : null;
      };
      module.exports = valid;
    }, {
      "./parse": 105
    }],
    113: [function (require, module, exports) {
      const internalRe = require('./internal/re');
      const constants = require('./internal/constants');
      const SemVer = require('./classes/semver');
      const identifiers = require('./internal/identifiers');
      const parse = require('./functions/parse');
      const valid = require('./functions/valid');
      const clean = require('./functions/clean');
      const inc = require('./functions/inc');
      const diff = require('./functions/diff');
      const major = require('./functions/major');
      const minor = require('./functions/minor');
      const patch = require('./functions/patch');
      const prerelease = require('./functions/prerelease');
      const compare = require('./functions/compare');
      const rcompare = require('./functions/rcompare');
      const compareLoose = require('./functions/compare-loose');
      const compareBuild = require('./functions/compare-build');
      const sort = require('./functions/sort');
      const rsort = require('./functions/rsort');
      const gt = require('./functions/gt');
      const lt = require('./functions/lt');
      const eq = require('./functions/eq');
      const neq = require('./functions/neq');
      const gte = require('./functions/gte');
      const lte = require('./functions/lte');
      const cmp = require('./functions/cmp');
      const coerce = require('./functions/coerce');
      const Comparator = require('./classes/comparator');
      const Range = require('./classes/range');
      const satisfies = require('./functions/satisfies');
      const toComparators = require('./ranges/to-comparators');
      const maxSatisfying = require('./ranges/max-satisfying');
      const minSatisfying = require('./ranges/min-satisfying');
      const minVersion = require('./ranges/min-version');
      const validRange = require('./ranges/valid');
      const outside = require('./ranges/outside');
      const gtr = require('./ranges/gtr');
      const ltr = require('./ranges/ltr');
      const intersects = require('./ranges/intersects');
      const simplifyRange = require('./ranges/simplify');
      const subset = require('./ranges/subset');
      module.exports = {
        parse,
        valid,
        clean,
        inc,
        diff,
        major,
        minor,
        patch,
        prerelease,
        compare,
        rcompare,
        compareLoose,
        compareBuild,
        sort,
        rsort,
        gt,
        lt,
        eq,
        neq,
        gte,
        lte,
        cmp,
        coerce,
        Comparator,
        Range,
        satisfies,
        toComparators,
        maxSatisfying,
        minSatisfying,
        minVersion,
        validRange,
        outside,
        gtr,
        ltr,
        intersects,
        simplifyRange,
        subset,
        SemVer,
        re: internalRe.re,
        src: internalRe.src,
        tokens: internalRe.t,
        SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
        compareIdentifiers: identifiers.compareIdentifiers,
        rcompareIdentifiers: identifiers.rcompareIdentifiers
      };
    }, {
      "./classes/comparator": 86,
      "./classes/range": 87,
      "./classes/semver": 88,
      "./functions/clean": 89,
      "./functions/cmp": 90,
      "./functions/coerce": 91,
      "./functions/compare": 94,
      "./functions/compare-build": 92,
      "./functions/compare-loose": 93,
      "./functions/diff": 95,
      "./functions/eq": 96,
      "./functions/gt": 97,
      "./functions/gte": 98,
      "./functions/inc": 99,
      "./functions/lt": 100,
      "./functions/lte": 101,
      "./functions/major": 102,
      "./functions/minor": 103,
      "./functions/neq": 104,
      "./functions/parse": 105,
      "./functions/patch": 106,
      "./functions/prerelease": 107,
      "./functions/rcompare": 108,
      "./functions/rsort": 109,
      "./functions/satisfies": 110,
      "./functions/sort": 111,
      "./functions/valid": 112,
      "./internal/constants": 114,
      "./internal/identifiers": 116,
      "./internal/re": 118,
      "./ranges/gtr": 119,
      "./ranges/intersects": 120,
      "./ranges/ltr": 121,
      "./ranges/max-satisfying": 122,
      "./ranges/min-satisfying": 123,
      "./ranges/min-version": 124,
      "./ranges/outside": 125,
      "./ranges/simplify": 126,
      "./ranges/subset": 127,
      "./ranges/to-comparators": 128,
      "./ranges/valid": 129
    }],
    114: [function (require, module, exports) {
      const SEMVER_SPEC_VERSION = '2.0.0';
      const MAX_LENGTH = 256;
      const MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
      const MAX_SAFE_COMPONENT_LENGTH = 16;
      module.exports = {
        SEMVER_SPEC_VERSION,
        MAX_LENGTH,
        MAX_SAFE_INTEGER,
        MAX_SAFE_COMPONENT_LENGTH
      };
    }, {}],
    115: [function (require, module, exports) {
      (function (process) {
        (function () {
          const debug = typeof process === 'object' && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error('SEMVER', ...args) : () => {};
          module.exports = debug;
        }).call(this);
      }).call(this, require('_process'));
    }, {
      "_process": 141
    }],
    116: [function (require, module, exports) {
      const numeric = /^[0-9]+$/;
      const compareIdentifiers = (a, b) => {
        const anum = numeric.test(a);
        const bnum = numeric.test(b);
        if (anum && bnum) {
          a = +a;
          b = +b;
        }
        return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
      };
      const rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
      module.exports = {
        compareIdentifiers,
        rcompareIdentifiers
      };
    }, {}],
    117: [function (require, module, exports) {
      const opts = ['includePrerelease', 'loose', 'rtl'];
      const parseOptions = options => !options ? {} : typeof options !== 'object' ? {
        loose: true
      } : opts.filter(k => options[k]).reduce((o, k) => {
        o[k] = true;
        return o;
      }, {});
      module.exports = parseOptions;
    }, {}],
    118: [function (require, module, exports) {
      const {
        MAX_SAFE_COMPONENT_LENGTH
      } = require('./constants');
      const debug = require('./debug');
      exports = module.exports = {};
      const re = exports.re = [];
      const src = exports.src = [];
      const t = exports.t = {};
      let R = 0;
      const createToken = (name, value, isGlobal) => {
        const index = R++;
        debug(name, index, value);
        t[name] = index;
        src[index] = value;
        re[index] = new RegExp(value, isGlobal ? 'g' : undefined);
      };
      createToken('NUMERICIDENTIFIER', '0|[1-9]\\d*');
      createToken('NUMERICIDENTIFIERLOOSE', '[0-9]+');
      createToken('NONNUMERICIDENTIFIER', '\\d*[a-zA-Z-][a-zA-Z0-9-]*');
      createToken('MAINVERSION', `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})\\.` + `(${src[t.NUMERICIDENTIFIER]})`);
      createToken('MAINVERSIONLOOSE', `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.` + `(${src[t.NUMERICIDENTIFIERLOOSE]})`);
      createToken('PRERELEASEIDENTIFIER', `(?:${src[t.NUMERICIDENTIFIER]}|${src[t.NONNUMERICIDENTIFIER]})`);
      createToken('PRERELEASEIDENTIFIERLOOSE', `(?:${src[t.NUMERICIDENTIFIERLOOSE]}|${src[t.NONNUMERICIDENTIFIER]})`);
      createToken('PRERELEASE', `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
      createToken('PRERELEASELOOSE', `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
      createToken('BUILDIDENTIFIER', '[0-9A-Za-z-]+');
      createToken('BUILD', `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
      createToken('FULLPLAIN', `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
      createToken('FULL', `^${src[t.FULLPLAIN]}$`);
      createToken('LOOSEPLAIN', `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
      createToken('LOOSE', `^${src[t.LOOSEPLAIN]}$`);
      createToken('GTLT', '((?:<|>)?=?)');
      createToken('XRANGEIDENTIFIERLOOSE', `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
      createToken('XRANGEIDENTIFIER', `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
      createToken('XRANGEPLAIN', `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:\\.(${src[t.XRANGEIDENTIFIER]})` + `(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?` + `)?)?`);
      createToken('XRANGEPLAINLOOSE', `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})` + `(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?` + `)?)?`);
      createToken('XRANGE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
      createToken('XRANGELOOSE', `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
      createToken('COERCE', `${'(^|[^\\d])' + '(\\d{1,'}${MAX_SAFE_COMPONENT_LENGTH}})` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?` + `(?:$|[^\\d])`);
      createToken('COERCERTL', src[t.COERCE], true);
      createToken('LONETILDE', '(?:~>?)');
      createToken('TILDETRIM', `(\\s*)${src[t.LONETILDE]}\\s+`, true);
      exports.tildeTrimReplace = '$1~';
      createToken('TILDE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
      createToken('TILDELOOSE', `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
      createToken('LONECARET', '(?:\\^)');
      createToken('CARETTRIM', `(\\s*)${src[t.LONECARET]}\\s+`, true);
      exports.caretTrimReplace = '$1^';
      createToken('CARET', `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
      createToken('CARETLOOSE', `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
      createToken('COMPARATORLOOSE', `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
      createToken('COMPARATOR', `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
      createToken('COMPARATORTRIM', `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
      exports.comparatorTrimReplace = '$1$2$3';
      createToken('HYPHENRANGE', `^\\s*(${src[t.XRANGEPLAIN]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAIN]})` + `\\s*$`);
      createToken('HYPHENRANGELOOSE', `^\\s*(${src[t.XRANGEPLAINLOOSE]})` + `\\s+-\\s+` + `(${src[t.XRANGEPLAINLOOSE]})` + `\\s*$`);
      createToken('STAR', '(<|>)?=?\\s*\\*');
      createToken('GTE0', '^\\s*>=\\s*0\\.0\\.0\\s*$');
      createToken('GTE0PRE', '^\\s*>=\\s*0\\.0\\.0-0\\s*$');
    }, {
      "./constants": 114,
      "./debug": 115
    }],
    119: [function (require, module, exports) {
      const outside = require('./outside');
      const gtr = (version, range, options) => outside(version, range, '>', options);
      module.exports = gtr;
    }, {
      "./outside": 125
    }],
    120: [function (require, module, exports) {
      const Range = require('../classes/range');
      const intersects = (r1, r2, options) => {
        r1 = new Range(r1, options);
        r2 = new Range(r2, options);
        return r1.intersects(r2);
      };
      module.exports = intersects;
    }, {
      "../classes/range": 87
    }],
    121: [function (require, module, exports) {
      const outside = require('./outside');
      const ltr = (version, range, options) => outside(version, range, '<', options);
      module.exports = ltr;
    }, {
      "./outside": 125
    }],
    122: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const Range = require('../classes/range');
      const maxSatisfying = (versions, range, options) => {
        let max = null;
        let maxSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach(v => {
          if (rangeObj.test(v)) {
            if (!max || maxSV.compare(v) === -1) {
              max = v;
              maxSV = new SemVer(max, options);
            }
          }
        });
        return max;
      };
      module.exports = maxSatisfying;
    }, {
      "../classes/range": 87,
      "../classes/semver": 88
    }],
    123: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const Range = require('../classes/range');
      const minSatisfying = (versions, range, options) => {
        let min = null;
        let minSV = null;
        let rangeObj = null;
        try {
          rangeObj = new Range(range, options);
        } catch (er) {
          return null;
        }
        versions.forEach(v => {
          if (rangeObj.test(v)) {
            if (!min || minSV.compare(v) === 1) {
              min = v;
              minSV = new SemVer(min, options);
            }
          }
        });
        return min;
      };
      module.exports = minSatisfying;
    }, {
      "../classes/range": 87,
      "../classes/semver": 88
    }],
    124: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const Range = require('../classes/range');
      const gt = require('../functions/gt');
      const minVersion = (range, loose) => {
        range = new Range(range, loose);
        let minver = new SemVer('0.0.0');
        if (range.test(minver)) {
          return minver;
        }
        minver = new SemVer('0.0.0-0');
        if (range.test(minver)) {
          return minver;
        }
        minver = null;
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let setMin = null;
          comparators.forEach(comparator => {
            const compver = new SemVer(comparator.semver.version);
            switch (comparator.operator) {
              case '>':
                if (compver.prerelease.length === 0) {
                  compver.patch++;
                } else {
                  compver.prerelease.push(0);
                }
                compver.raw = compver.format();
              case '':
              case '>=':
                if (!setMin || gt(compver, setMin)) {
                  setMin = compver;
                }
                break;
              case '<':
              case '<=':
                break;
              default:
                throw new Error(`Unexpected operation: ${comparator.operator}`);
            }
          });
          if (setMin && (!minver || gt(minver, setMin))) {
            minver = setMin;
          }
        }
        if (minver && range.test(minver)) {
          return minver;
        }
        return null;
      };
      module.exports = minVersion;
    }, {
      "../classes/range": 87,
      "../classes/semver": 88,
      "../functions/gt": 97
    }],
    125: [function (require, module, exports) {
      const SemVer = require('../classes/semver');
      const Comparator = require('../classes/comparator');
      const {
        ANY
      } = Comparator;
      const Range = require('../classes/range');
      const satisfies = require('../functions/satisfies');
      const gt = require('../functions/gt');
      const lt = require('../functions/lt');
      const lte = require('../functions/lte');
      const gte = require('../functions/gte');
      const outside = (version, range, hilo, options) => {
        version = new SemVer(version, options);
        range = new Range(range, options);
        let gtfn, ltefn, ltfn, comp, ecomp;
        switch (hilo) {
          case '>':
            gtfn = gt;
            ltefn = lte;
            ltfn = lt;
            comp = '>';
            ecomp = '>=';
            break;
          case '<':
            gtfn = lt;
            ltefn = gte;
            ltfn = gt;
            comp = '<';
            ecomp = '<=';
            break;
          default:
            throw new TypeError('Must provide a hilo val of "<" or ">"');
        }
        if (satisfies(version, range, options)) {
          return false;
        }
        for (let i = 0; i < range.set.length; ++i) {
          const comparators = range.set[i];
          let high = null;
          let low = null;
          comparators.forEach(comparator => {
            if (comparator.semver === ANY) {
              comparator = new Comparator('>=0.0.0');
            }
            high = high || comparator;
            low = low || comparator;
            if (gtfn(comparator.semver, high.semver, options)) {
              high = comparator;
            } else if (ltfn(comparator.semver, low.semver, options)) {
              low = comparator;
            }
          });
          if (high.operator === comp || high.operator === ecomp) {
            return false;
          }
          if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
            return false;
          } else if (low.operator === ecomp && ltfn(version, low.semver)) {
            return false;
          }
        }
        return true;
      };
      module.exports = outside;
    }, {
      "../classes/comparator": 86,
      "../classes/range": 87,
      "../classes/semver": 88,
      "../functions/gt": 97,
      "../functions/gte": 98,
      "../functions/lt": 100,
      "../functions/lte": 101,
      "../functions/satisfies": 110
    }],
    126: [function (require, module, exports) {
      const satisfies = require('../functions/satisfies.js');
      const compare = require('../functions/compare.js');
      module.exports = (versions, range, options) => {
        const set = [];
        let first = null;
        let prev = null;
        const v = versions.sort((a, b) => compare(a, b, options));
        for (const version of v) {
          const included = satisfies(version, range, options);
          if (included) {
            prev = version;
            if (!first) {
              first = version;
            }
          } else {
            if (prev) {
              set.push([first, prev]);
            }
            prev = null;
            first = null;
          }
        }
        if (first) {
          set.push([first, null]);
        }
        const ranges = [];
        for (const [min, max] of set) {
          if (min === max) {
            ranges.push(min);
          } else if (!max && min === v[0]) {
            ranges.push('*');
          } else if (!max) {
            ranges.push(`>=${min}`);
          } else if (min === v[0]) {
            ranges.push(`<=${max}`);
          } else {
            ranges.push(`${min} - ${max}`);
          }
        }
        const simplified = ranges.join(' || ');
        const original = typeof range.raw === 'string' ? range.raw : String(range);
        return simplified.length < original.length ? simplified : range;
      };
    }, {
      "../functions/compare.js": 94,
      "../functions/satisfies.js": 110
    }],
    127: [function (require, module, exports) {
      const Range = require('../classes/range.js');
      const Comparator = require('../classes/comparator.js');
      const {
        ANY
      } = Comparator;
      const satisfies = require('../functions/satisfies.js');
      const compare = require('../functions/compare.js');
      const subset = (sub, dom, options = {}) => {
        if (sub === dom) {
          return true;
        }
        sub = new Range(sub, options);
        dom = new Range(dom, options);
        let sawNonNull = false;
        OUTER: for (const simpleSub of sub.set) {
          for (const simpleDom of dom.set) {
            const isSub = simpleSubset(simpleSub, simpleDom, options);
            sawNonNull = sawNonNull || isSub !== null;
            if (isSub) {
              continue OUTER;
            }
          }
          if (sawNonNull) {
            return false;
          }
        }
        return true;
      };
      const simpleSubset = (sub, dom, options) => {
        if (sub === dom) {
          return true;
        }
        if (sub.length === 1 && sub[0].semver === ANY) {
          if (dom.length === 1 && dom[0].semver === ANY) {
            return true;
          } else if (options.includePrerelease) {
            sub = [new Comparator('>=0.0.0-0')];
          } else {
            sub = [new Comparator('>=0.0.0')];
          }
        }
        if (dom.length === 1 && dom[0].semver === ANY) {
          if (options.includePrerelease) {
            return true;
          } else {
            dom = [new Comparator('>=0.0.0')];
          }
        }
        const eqSet = new Set();
        let gt, lt;
        for (const c of sub) {
          if (c.operator === '>' || c.operator === '>=') {
            gt = higherGT(gt, c, options);
          } else if (c.operator === '<' || c.operator === '<=') {
            lt = lowerLT(lt, c, options);
          } else {
            eqSet.add(c.semver);
          }
        }
        if (eqSet.size > 1) {
          return null;
        }
        let gtltComp;
        if (gt && lt) {
          gtltComp = compare(gt.semver, lt.semver, options);
          if (gtltComp > 0) {
            return null;
          } else if (gtltComp === 0 && (gt.operator !== '>=' || lt.operator !== '<=')) {
            return null;
          }
        }
        for (const eq of eqSet) {
          if (gt && !satisfies(eq, String(gt), options)) {
            return null;
          }
          if (lt && !satisfies(eq, String(lt), options)) {
            return null;
          }
          for (const c of dom) {
            if (!satisfies(eq, String(c), options)) {
              return false;
            }
          }
          return true;
        }
        let higher, lower;
        let hasDomLT, hasDomGT;
        let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
        let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
        if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === '<' && needDomLTPre.prerelease[0] === 0) {
          needDomLTPre = false;
        }
        for (const c of dom) {
          hasDomGT = hasDomGT || c.operator === '>' || c.operator === '>=';
          hasDomLT = hasDomLT || c.operator === '<' || c.operator === '<=';
          if (gt) {
            if (needDomGTPre) {
              if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
                needDomGTPre = false;
              }
            }
            if (c.operator === '>' || c.operator === '>=') {
              higher = higherGT(gt, c, options);
              if (higher === c && higher !== gt) {
                return false;
              }
            } else if (gt.operator === '>=' && !satisfies(gt.semver, String(c), options)) {
              return false;
            }
          }
          if (lt) {
            if (needDomLTPre) {
              if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
                needDomLTPre = false;
              }
            }
            if (c.operator === '<' || c.operator === '<=') {
              lower = lowerLT(lt, c, options);
              if (lower === c && lower !== lt) {
                return false;
              }
            } else if (lt.operator === '<=' && !satisfies(lt.semver, String(c), options)) {
              return false;
            }
          }
          if (!c.operator && (lt || gt) && gtltComp !== 0) {
            return false;
          }
        }
        if (gt && hasDomLT && !lt && gtltComp !== 0) {
          return false;
        }
        if (lt && hasDomGT && !gt && gtltComp !== 0) {
          return false;
        }
        if (needDomGTPre || needDomLTPre) {
          return false;
        }
        return true;
      };
      const higherGT = (a, b, options) => {
        if (!a) {
          return b;
        }
        const comp = compare(a.semver, b.semver, options);
        return comp > 0 ? a : comp < 0 ? b : b.operator === '>' && a.operator === '>=' ? b : a;
      };
      const lowerLT = (a, b, options) => {
        if (!a) {
          return b;
        }
        const comp = compare(a.semver, b.semver, options);
        return comp < 0 ? a : comp > 0 ? b : b.operator === '<' && a.operator === '<=' ? b : a;
      };
      module.exports = subset;
    }, {
      "../classes/comparator.js": 86,
      "../classes/range.js": 87,
      "../functions/compare.js": 94,
      "../functions/satisfies.js": 110
    }],
    128: [function (require, module, exports) {
      const Range = require('../classes/range');
      const toComparators = (range, options) => new Range(range, options).set.map(comp => comp.map(c => c.value).join(' ').trim().split(' '));
      module.exports = toComparators;
    }, {
      "../classes/range": 87
    }],
    129: [function (require, module, exports) {
      const Range = require('../classes/range');
      const validRange = (range, options) => {
        try {
          return new Range(range, options).range || '*';
        } catch (er) {
          return null;
        }
      };
      module.exports = validRange;
    }, {
      "../classes/range": 87
    }],
    130: [function (require, module, exports) {
      (function (global, factory) {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Superstruct = {}));
      })(this, function (exports) {
        'use strict';

        class StructError extends TypeError {
          constructor(failure, failures) {
            let cached;
            const {
              message,
              explanation,
              ...rest
            } = failure;
            const {
              path
            } = failure;
            const msg = path.length === 0 ? message : `At path: ${path.join('.')} -- ${message}`;
            super(explanation ?? msg);
            if (explanation != null) this.cause = msg;
            Object.assign(this, rest);
            this.name = this.constructor.name;
            this.failures = () => {
              return cached ?? (cached = [failure, ...failures()]);
            };
          }
        }
        function isIterable(x) {
          return isObject(x) && typeof x[Symbol.iterator] === 'function';
        }
        function isObject(x) {
          return typeof x === 'object' && x != null;
        }
        function isPlainObject(x) {
          if (Object.prototype.toString.call(x) !== '[object Object]') {
            return false;
          }
          const prototype = Object.getPrototypeOf(x);
          return prototype === null || prototype === Object.prototype;
        }
        function print(value) {
          if (typeof value === 'symbol') {
            return value.toString();
          }
          return typeof value === 'string' ? JSON.stringify(value) : `${value}`;
        }
        function shiftIterator(input) {
          const {
            done,
            value
          } = input.next();
          return done ? undefined : value;
        }
        function toFailure(result, context, struct, value) {
          if (result === true) {
            return;
          } else if (result === false) {
            result = {};
          } else if (typeof result === 'string') {
            result = {
              message: result
            };
          }
          const {
            path,
            branch
          } = context;
          const {
            type
          } = struct;
          const {
            refinement,
            message = `Expected a value of type \`${type}\`${refinement ? ` with refinement \`${refinement}\`` : ''}, but received: \`${print(value)}\``
          } = result;
          return {
            value,
            type,
            refinement,
            key: path[path.length - 1],
            path,
            branch,
            ...result,
            message
          };
        }
        function* toFailures(result, context, struct, value) {
          if (!isIterable(result)) {
            result = [result];
          }
          for (const r of result) {
            const failure = toFailure(r, context, struct, value);
            if (failure) {
              yield failure;
            }
          }
        }
        function* run(value, struct, options = {}) {
          const {
            path = [],
            branch = [value],
            coerce = false,
            mask = false
          } = options;
          const ctx = {
            path,
            branch
          };
          if (coerce) {
            value = struct.coercer(value, ctx);
            if (mask && struct.type !== 'type' && isObject(struct.schema) && isObject(value) && !Array.isArray(value)) {
              for (const key in value) {
                if (struct.schema[key] === undefined) {
                  delete value[key];
                }
              }
            }
          }
          let status = 'valid';
          for (const failure of struct.validator(value, ctx)) {
            failure.explanation = options.message;
            status = 'not_valid';
            yield [failure, undefined];
          }
          for (let [k, v, s] of struct.entries(value, ctx)) {
            const ts = run(v, s, {
              path: k === undefined ? path : [...path, k],
              branch: k === undefined ? branch : [...branch, v],
              coerce,
              mask,
              message: options.message
            });
            for (const t of ts) {
              if (t[0]) {
                status = t[0].refinement != null ? 'not_refined' : 'not_valid';
                yield [t[0], undefined];
              } else if (coerce) {
                v = t[1];
                if (k === undefined) {
                  value = v;
                } else if (value instanceof Map) {
                  value.set(k, v);
                } else if (value instanceof Set) {
                  value.add(v);
                } else if (isObject(value)) {
                  if (v !== undefined || k in value) value[k] = v;
                }
              }
            }
          }
          if (status !== 'not_valid') {
            for (const failure of struct.refiner(value, ctx)) {
              failure.explanation = options.message;
              status = 'not_refined';
              yield [failure, undefined];
            }
          }
          if (status === 'valid') {
            yield [undefined, value];
          }
        }
        class Struct {
          constructor(props) {
            const {
              type,
              schema,
              validator,
              refiner,
              coercer = value => value,
              entries = function* () {}
            } = props;
            this.type = type;
            this.schema = schema;
            this.entries = entries;
            this.coercer = coercer;
            if (validator) {
              this.validator = (value, context) => {
                const result = validator(value, context);
                return toFailures(result, context, this, value);
              };
            } else {
              this.validator = () => [];
            }
            if (refiner) {
              this.refiner = (value, context) => {
                const result = refiner(value, context);
                return toFailures(result, context, this, value);
              };
            } else {
              this.refiner = () => [];
            }
          }
          assert(value, message) {
            return assert(value, this, message);
          }
          create(value, message) {
            return create(value, this, message);
          }
          is(value) {
            return is(value, this);
          }
          mask(value, message) {
            return mask(value, this, message);
          }
          validate(value, options = {}) {
            return validate(value, this, options);
          }
        }
        function assert(value, struct, message) {
          const result = validate(value, struct, {
            message
          });
          if (result[0]) {
            throw result[0];
          }
        }
        function create(value, struct, message) {
          const result = validate(value, struct, {
            coerce: true,
            message
          });
          if (result[0]) {
            throw result[0];
          } else {
            return result[1];
          }
        }
        function mask(value, struct, message) {
          const result = validate(value, struct, {
            coerce: true,
            mask: true,
            message
          });
          if (result[0]) {
            throw result[0];
          } else {
            return result[1];
          }
        }
        function is(value, struct) {
          const result = validate(value, struct);
          return !result[0];
        }
        function validate(value, struct, options = {}) {
          const tuples = run(value, struct, options);
          const tuple = shiftIterator(tuples);
          if (tuple[0]) {
            const error = new StructError(tuple[0], function* () {
              for (const t of tuples) {
                if (t[0]) {
                  yield t[0];
                }
              }
            });
            return [error, undefined];
          } else {
            const v = tuple[1];
            return [undefined, v];
          }
        }
        function assign(...Structs) {
          const isType = Structs[0].type === 'type';
          const schemas = Structs.map(s => s.schema);
          const schema = Object.assign({}, ...schemas);
          return isType ? type(schema) : object(schema);
        }
        function define(name, validator) {
          return new Struct({
            type: name,
            schema: null,
            validator
          });
        }
        function deprecated(struct, log) {
          return new Struct({
            ...struct,
            refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx),
            validator(value, ctx) {
              if (value === undefined) {
                return true;
              } else {
                log(value, ctx);
                return struct.validator(value, ctx);
              }
            }
          });
        }
        function dynamic(fn) {
          return new Struct({
            type: 'dynamic',
            schema: null,
            *entries(value, ctx) {
              const struct = fn(value, ctx);
              yield* struct.entries(value, ctx);
            },
            validator(value, ctx) {
              const struct = fn(value, ctx);
              return struct.validator(value, ctx);
            },
            coercer(value, ctx) {
              const struct = fn(value, ctx);
              return struct.coercer(value, ctx);
            },
            refiner(value, ctx) {
              const struct = fn(value, ctx);
              return struct.refiner(value, ctx);
            }
          });
        }
        function lazy(fn) {
          let struct;
          return new Struct({
            type: 'lazy',
            schema: null,
            *entries(value, ctx) {
              struct ?? (struct = fn());
              yield* struct.entries(value, ctx);
            },
            validator(value, ctx) {
              struct ?? (struct = fn());
              return struct.validator(value, ctx);
            },
            coercer(value, ctx) {
              struct ?? (struct = fn());
              return struct.coercer(value, ctx);
            },
            refiner(value, ctx) {
              struct ?? (struct = fn());
              return struct.refiner(value, ctx);
            }
          });
        }
        function omit(struct, keys) {
          const {
            schema
          } = struct;
          const subschema = {
            ...schema
          };
          for (const key of keys) {
            delete subschema[key];
          }
          switch (struct.type) {
            case 'type':
              return type(subschema);
            default:
              return object(subschema);
          }
        }
        function partial(struct) {
          const schema = struct instanceof Struct ? {
            ...struct.schema
          } : {
            ...struct
          };
          for (const key in schema) {
            schema[key] = optional(schema[key]);
          }
          return object(schema);
        }
        function pick(struct, keys) {
          const {
            schema
          } = struct;
          const subschema = {};
          for (const key of keys) {
            subschema[key] = schema[key];
          }
          return object(subschema);
        }
        function struct(name, validator) {
          console.warn('superstruct@0.11 - The `struct` helper has been renamed to `define`.');
          return define(name, validator);
        }
        function any() {
          return define('any', () => true);
        }
        function array(Element) {
          return new Struct({
            type: 'array',
            schema: Element,
            *entries(value) {
              if (Element && Array.isArray(value)) {
                for (const [i, v] of value.entries()) {
                  yield [i, v, Element];
                }
              }
            },
            coercer(value) {
              return Array.isArray(value) ? value.slice() : value;
            },
            validator(value) {
              return Array.isArray(value) || `Expected an array value, but received: ${print(value)}`;
            }
          });
        }
        function bigint() {
          return define('bigint', value => {
            return typeof value === 'bigint';
          });
        }
        function boolean() {
          return define('boolean', value => {
            return typeof value === 'boolean';
          });
        }
        function date() {
          return define('date', value => {
            return value instanceof Date && !isNaN(value.getTime()) || `Expected a valid \`Date\` object, but received: ${print(value)}`;
          });
        }
        function enums(values) {
          const schema = {};
          const description = values.map(v => print(v)).join();
          for (const key of values) {
            schema[key] = key;
          }
          return new Struct({
            type: 'enums',
            schema,
            validator(value) {
              return values.includes(value) || `Expected one of \`${description}\`, but received: ${print(value)}`;
            }
          });
        }
        function func() {
          return define('func', value => {
            return typeof value === 'function' || `Expected a function, but received: ${print(value)}`;
          });
        }
        function instance(Class) {
          return define('instance', value => {
            return value instanceof Class || `Expected a \`${Class.name}\` instance, but received: ${print(value)}`;
          });
        }
        function integer() {
          return define('integer', value => {
            return typeof value === 'number' && !isNaN(value) && Number.isInteger(value) || `Expected an integer, but received: ${print(value)}`;
          });
        }
        function intersection(Structs) {
          return new Struct({
            type: 'intersection',
            schema: null,
            *entries(value, ctx) {
              for (const S of Structs) {
                yield* S.entries(value, ctx);
              }
            },
            *validator(value, ctx) {
              for (const S of Structs) {
                yield* S.validator(value, ctx);
              }
            },
            *refiner(value, ctx) {
              for (const S of Structs) {
                yield* S.refiner(value, ctx);
              }
            }
          });
        }
        function literal(constant) {
          const description = print(constant);
          const t = typeof constant;
          return new Struct({
            type: 'literal',
            schema: t === 'string' || t === 'number' || t === 'boolean' ? constant : null,
            validator(value) {
              return value === constant || `Expected the literal \`${description}\`, but received: ${print(value)}`;
            }
          });
        }
        function map(Key, Value) {
          return new Struct({
            type: 'map',
            schema: null,
            *entries(value) {
              if (Key && Value && value instanceof Map) {
                for (const [k, v] of value.entries()) {
                  yield [k, k, Key];
                  yield [k, v, Value];
                }
              }
            },
            coercer(value) {
              return value instanceof Map ? new Map(value) : value;
            },
            validator(value) {
              return value instanceof Map || `Expected a \`Map\` object, but received: ${print(value)}`;
            }
          });
        }
        function never() {
          return define('never', () => false);
        }
        function nullable(struct) {
          return new Struct({
            ...struct,
            validator: (value, ctx) => value === null || struct.validator(value, ctx),
            refiner: (value, ctx) => value === null || struct.refiner(value, ctx)
          });
        }
        function number() {
          return define('number', value => {
            return typeof value === 'number' && !isNaN(value) || `Expected a number, but received: ${print(value)}`;
          });
        }
        function object(schema) {
          const knowns = schema ? Object.keys(schema) : [];
          const Never = never();
          return new Struct({
            type: 'object',
            schema: schema ? schema : null,
            *entries(value) {
              if (schema && isObject(value)) {
                const unknowns = new Set(Object.keys(value));
                for (const key of knowns) {
                  unknowns.delete(key);
                  yield [key, value[key], schema[key]];
                }
                for (const key of unknowns) {
                  yield [key, value[key], Never];
                }
              }
            },
            validator(value) {
              return isObject(value) || `Expected an object, but received: ${print(value)}`;
            },
            coercer(value) {
              return isObject(value) ? {
                ...value
              } : value;
            }
          });
        }
        function optional(struct) {
          return new Struct({
            ...struct,
            validator: (value, ctx) => value === undefined || struct.validator(value, ctx),
            refiner: (value, ctx) => value === undefined || struct.refiner(value, ctx)
          });
        }
        function record(Key, Value) {
          return new Struct({
            type: 'record',
            schema: null,
            *entries(value) {
              if (isObject(value)) {
                for (const k in value) {
                  const v = value[k];
                  yield [k, k, Key];
                  yield [k, v, Value];
                }
              }
            },
            validator(value) {
              return isObject(value) || `Expected an object, but received: ${print(value)}`;
            }
          });
        }
        function regexp() {
          return define('regexp', value => {
            return value instanceof RegExp;
          });
        }
        function set(Element) {
          return new Struct({
            type: 'set',
            schema: null,
            *entries(value) {
              if (Element && value instanceof Set) {
                for (const v of value) {
                  yield [v, v, Element];
                }
              }
            },
            coercer(value) {
              return value instanceof Set ? new Set(value) : value;
            },
            validator(value) {
              return value instanceof Set || `Expected a \`Set\` object, but received: ${print(value)}`;
            }
          });
        }
        function string() {
          return define('string', value => {
            return typeof value === 'string' || `Expected a string, but received: ${print(value)}`;
          });
        }
        function tuple(Structs) {
          const Never = never();
          return new Struct({
            type: 'tuple',
            schema: null,
            *entries(value) {
              if (Array.isArray(value)) {
                const length = Math.max(Structs.length, value.length);
                for (let i = 0; i < length; i++) {
                  yield [i, value[i], Structs[i] || Never];
                }
              }
            },
            validator(value) {
              return Array.isArray(value) || `Expected an array, but received: ${print(value)}`;
            }
          });
        }
        function type(schema) {
          const keys = Object.keys(schema);
          return new Struct({
            type: 'type',
            schema,
            *entries(value) {
              if (isObject(value)) {
                for (const k of keys) {
                  yield [k, value[k], schema[k]];
                }
              }
            },
            validator(value) {
              return isObject(value) || `Expected an object, but received: ${print(value)}`;
            },
            coercer(value) {
              return isObject(value) ? {
                ...value
              } : value;
            }
          });
        }
        function union(Structs) {
          const description = Structs.map(s => s.type).join(' | ');
          return new Struct({
            type: 'union',
            schema: null,
            coercer(value) {
              for (const S of Structs) {
                const [error, coerced] = S.validate(value, {
                  coerce: true
                });
                if (!error) {
                  return coerced;
                }
              }
              return value;
            },
            validator(value, ctx) {
              const failures = [];
              for (const S of Structs) {
                const [...tuples] = run(value, S, ctx);
                const [first] = tuples;
                if (!first[0]) {
                  return [];
                } else {
                  for (const [failure] of tuples) {
                    if (failure) {
                      failures.push(failure);
                    }
                  }
                }
              }
              return [`Expected the value to satisfy a union of \`${description}\`, but received: ${print(value)}`, ...failures];
            }
          });
        }
        function unknown() {
          return define('unknown', () => true);
        }
        function coerce(struct, condition, coercer) {
          return new Struct({
            ...struct,
            coercer: (value, ctx) => {
              return is(value, condition) ? struct.coercer(coercer(value, ctx), ctx) : struct.coercer(value, ctx);
            }
          });
        }
        function defaulted(struct, fallback, options = {}) {
          return coerce(struct, unknown(), x => {
            const f = typeof fallback === 'function' ? fallback() : fallback;
            if (x === undefined) {
              return f;
            }
            if (!options.strict && isPlainObject(x) && isPlainObject(f)) {
              const ret = {
                ...x
              };
              let changed = false;
              for (const key in f) {
                if (ret[key] === undefined) {
                  ret[key] = f[key];
                  changed = true;
                }
              }
              if (changed) {
                return ret;
              }
            }
            return x;
          });
        }
        function trimmed(struct) {
          return coerce(struct, string(), x => x.trim());
        }
        function empty(struct) {
          return refine(struct, 'empty', value => {
            const size = getSize(value);
            return size === 0 || `Expected an empty ${struct.type} but received one with a size of \`${size}\``;
          });
        }
        function getSize(value) {
          if (value instanceof Map || value instanceof Set) {
            return value.size;
          } else {
            return value.length;
          }
        }
        function max(struct, threshold, options = {}) {
          const {
            exclusive
          } = options;
          return refine(struct, 'max', value => {
            return exclusive ? value < threshold : value <= threshold || `Expected a ${struct.type} less than ${exclusive ? '' : 'or equal to '}${threshold} but received \`${value}\``;
          });
        }
        function min(struct, threshold, options = {}) {
          const {
            exclusive
          } = options;
          return refine(struct, 'min', value => {
            return exclusive ? value > threshold : value >= threshold || `Expected a ${struct.type} greater than ${exclusive ? '' : 'or equal to '}${threshold} but received \`${value}\``;
          });
        }
        function nonempty(struct) {
          return refine(struct, 'nonempty', value => {
            const size = getSize(value);
            return size > 0 || `Expected a nonempty ${struct.type} but received an empty one`;
          });
        }
        function pattern(struct, regexp) {
          return refine(struct, 'pattern', value => {
            return regexp.test(value) || `Expected a ${struct.type} matching \`/${regexp.source}/\` but received "${value}"`;
          });
        }
        function size(struct, min, max = min) {
          const expected = `Expected a ${struct.type}`;
          const of = min === max ? `of \`${min}\`` : `between \`${min}\` and \`${max}\``;
          return refine(struct, 'size', value => {
            if (typeof value === 'number' || value instanceof Date) {
              return min <= value && value <= max || `${expected} ${of} but received \`${value}\``;
            } else if (value instanceof Map || value instanceof Set) {
              const {
                size
              } = value;
              return min <= size && size <= max || `${expected} with a size ${of} but received one with a size of \`${size}\``;
            } else {
              const {
                length
              } = value;
              return min <= length && length <= max || `${expected} with a length ${of} but received one with a length of \`${length}\``;
            }
          });
        }
        function refine(struct, name, refiner) {
          return new Struct({
            ...struct,
            *refiner(value, ctx) {
              yield* struct.refiner(value, ctx);
              const result = refiner(value, ctx);
              const failures = toFailures(result, ctx, struct, value);
              for (const failure of failures) {
                yield {
                  ...failure,
                  refinement: name
                };
              }
            }
          });
        }
        exports.Struct = Struct;
        exports.StructError = StructError;
        exports.any = any;
        exports.array = array;
        exports.assert = assert;
        exports.assign = assign;
        exports.bigint = bigint;
        exports.boolean = boolean;
        exports.coerce = coerce;
        exports.create = create;
        exports.date = date;
        exports.defaulted = defaulted;
        exports.define = define;
        exports.deprecated = deprecated;
        exports.dynamic = dynamic;
        exports.empty = empty;
        exports.enums = enums;
        exports.func = func;
        exports.instance = instance;
        exports.integer = integer;
        exports.intersection = intersection;
        exports.is = is;
        exports.lazy = lazy;
        exports.literal = literal;
        exports.map = map;
        exports.mask = mask;
        exports.max = max;
        exports.min = min;
        exports.never = never;
        exports.nonempty = nonempty;
        exports.nullable = nullable;
        exports.number = number;
        exports.object = object;
        exports.omit = omit;
        exports.optional = optional;
        exports.partial = partial;
        exports.pattern = pattern;
        exports.pick = pick;
        exports.record = record;
        exports.refine = refine;
        exports.regexp = regexp;
        exports.set = set;
        exports.size = size;
        exports.string = string;
        exports.struct = struct;
        exports.trimmed = trimmed;
        exports.tuple = tuple;
        exports.type = type;
        exports.union = union;
        exports.unknown = unknown;
        exports.validate = validate;
      });
    }, {}],
    131: [function (require, module, exports) {
      (function (nacl) {
        'use strict';

        var gf = function (init) {
          var i,
            r = new Float64Array(16);
          if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
          return r;
        };
        var randombytes = function () {
          throw new Error('no PRNG');
        };
        var _0 = new Uint8Array(16);
        var _9 = new Uint8Array(32);
        _9[0] = 9;
        var gf0 = gf(),
          gf1 = gf([1]),
          _121665 = gf([0xdb41, 1]),
          D = gf([0x78a3, 0x1359, 0x4dca, 0x75eb, 0xd8ab, 0x4141, 0x0a4d, 0x0070, 0xe898, 0x7779, 0x4079, 0x8cc7, 0xfe73, 0x2b6f, 0x6cee, 0x5203]),
          D2 = gf([0xf159, 0x26b2, 0x9b94, 0xebd6, 0xb156, 0x8283, 0x149a, 0x00e0, 0xd130, 0xeef3, 0x80f2, 0x198e, 0xfce7, 0x56df, 0xd9dc, 0x2406]),
          X = gf([0xd51a, 0x8f25, 0x2d60, 0xc956, 0xa7b2, 0x9525, 0xc760, 0x692c, 0xdc5c, 0xfdd6, 0xe231, 0xc0a4, 0x53fe, 0xcd6e, 0x36d3, 0x2169]),
          Y = gf([0x6658, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666, 0x6666]),
          I = gf([0xa0b0, 0x4a0e, 0x1b27, 0xc4ee, 0xe478, 0xad2f, 0x1806, 0x2f43, 0xd7a7, 0x3dfb, 0x0099, 0x2b4d, 0xdf0b, 0x4fc1, 0x2480, 0x2b83]);
        function ts64(x, i, h, l) {
          x[i] = h >> 24 & 0xff;
          x[i + 1] = h >> 16 & 0xff;
          x[i + 2] = h >> 8 & 0xff;
          x[i + 3] = h & 0xff;
          x[i + 4] = l >> 24 & 0xff;
          x[i + 5] = l >> 16 & 0xff;
          x[i + 6] = l >> 8 & 0xff;
          x[i + 7] = l & 0xff;
        }
        function vn(x, xi, y, yi, n) {
          var i,
            d = 0;
          for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
          return (1 & d - 1 >>> 8) - 1;
        }
        function crypto_verify_16(x, xi, y, yi) {
          return vn(x, xi, y, yi, 16);
        }
        function crypto_verify_32(x, xi, y, yi) {
          return vn(x, xi, y, yi, 32);
        }
        function core_salsa20(o, p, k, c) {
          var j0 = c[0] & 0xff | (c[1] & 0xff) << 8 | (c[2] & 0xff) << 16 | (c[3] & 0xff) << 24,
            j1 = k[0] & 0xff | (k[1] & 0xff) << 8 | (k[2] & 0xff) << 16 | (k[3] & 0xff) << 24,
            j2 = k[4] & 0xff | (k[5] & 0xff) << 8 | (k[6] & 0xff) << 16 | (k[7] & 0xff) << 24,
            j3 = k[8] & 0xff | (k[9] & 0xff) << 8 | (k[10] & 0xff) << 16 | (k[11] & 0xff) << 24,
            j4 = k[12] & 0xff | (k[13] & 0xff) << 8 | (k[14] & 0xff) << 16 | (k[15] & 0xff) << 24,
            j5 = c[4] & 0xff | (c[5] & 0xff) << 8 | (c[6] & 0xff) << 16 | (c[7] & 0xff) << 24,
            j6 = p[0] & 0xff | (p[1] & 0xff) << 8 | (p[2] & 0xff) << 16 | (p[3] & 0xff) << 24,
            j7 = p[4] & 0xff | (p[5] & 0xff) << 8 | (p[6] & 0xff) << 16 | (p[7] & 0xff) << 24,
            j8 = p[8] & 0xff | (p[9] & 0xff) << 8 | (p[10] & 0xff) << 16 | (p[11] & 0xff) << 24,
            j9 = p[12] & 0xff | (p[13] & 0xff) << 8 | (p[14] & 0xff) << 16 | (p[15] & 0xff) << 24,
            j10 = c[8] & 0xff | (c[9] & 0xff) << 8 | (c[10] & 0xff) << 16 | (c[11] & 0xff) << 24,
            j11 = k[16] & 0xff | (k[17] & 0xff) << 8 | (k[18] & 0xff) << 16 | (k[19] & 0xff) << 24,
            j12 = k[20] & 0xff | (k[21] & 0xff) << 8 | (k[22] & 0xff) << 16 | (k[23] & 0xff) << 24,
            j13 = k[24] & 0xff | (k[25] & 0xff) << 8 | (k[26] & 0xff) << 16 | (k[27] & 0xff) << 24,
            j14 = k[28] & 0xff | (k[29] & 0xff) << 8 | (k[30] & 0xff) << 16 | (k[31] & 0xff) << 24,
            j15 = c[12] & 0xff | (c[13] & 0xff) << 8 | (c[14] & 0xff) << 16 | (c[15] & 0xff) << 24;
          var x0 = j0,
            x1 = j1,
            x2 = j2,
            x3 = j3,
            x4 = j4,
            x5 = j5,
            x6 = j6,
            x7 = j7,
            x8 = j8,
            x9 = j9,
            x10 = j10,
            x11 = j11,
            x12 = j12,
            x13 = j13,
            x14 = j14,
            x15 = j15,
            u;
          for (var i = 0; i < 20; i += 2) {
            u = x0 + x12 | 0;
            x4 ^= u << 7 | u >>> 32 - 7;
            u = x4 + x0 | 0;
            x8 ^= u << 9 | u >>> 32 - 9;
            u = x8 + x4 | 0;
            x12 ^= u << 13 | u >>> 32 - 13;
            u = x12 + x8 | 0;
            x0 ^= u << 18 | u >>> 32 - 18;
            u = x5 + x1 | 0;
            x9 ^= u << 7 | u >>> 32 - 7;
            u = x9 + x5 | 0;
            x13 ^= u << 9 | u >>> 32 - 9;
            u = x13 + x9 | 0;
            x1 ^= u << 13 | u >>> 32 - 13;
            u = x1 + x13 | 0;
            x5 ^= u << 18 | u >>> 32 - 18;
            u = x10 + x6 | 0;
            x14 ^= u << 7 | u >>> 32 - 7;
            u = x14 + x10 | 0;
            x2 ^= u << 9 | u >>> 32 - 9;
            u = x2 + x14 | 0;
            x6 ^= u << 13 | u >>> 32 - 13;
            u = x6 + x2 | 0;
            x10 ^= u << 18 | u >>> 32 - 18;
            u = x15 + x11 | 0;
            x3 ^= u << 7 | u >>> 32 - 7;
            u = x3 + x15 | 0;
            x7 ^= u << 9 | u >>> 32 - 9;
            u = x7 + x3 | 0;
            x11 ^= u << 13 | u >>> 32 - 13;
            u = x11 + x7 | 0;
            x15 ^= u << 18 | u >>> 32 - 18;
            u = x0 + x3 | 0;
            x1 ^= u << 7 | u >>> 32 - 7;
            u = x1 + x0 | 0;
            x2 ^= u << 9 | u >>> 32 - 9;
            u = x2 + x1 | 0;
            x3 ^= u << 13 | u >>> 32 - 13;
            u = x3 + x2 | 0;
            x0 ^= u << 18 | u >>> 32 - 18;
            u = x5 + x4 | 0;
            x6 ^= u << 7 | u >>> 32 - 7;
            u = x6 + x5 | 0;
            x7 ^= u << 9 | u >>> 32 - 9;
            u = x7 + x6 | 0;
            x4 ^= u << 13 | u >>> 32 - 13;
            u = x4 + x7 | 0;
            x5 ^= u << 18 | u >>> 32 - 18;
            u = x10 + x9 | 0;
            x11 ^= u << 7 | u >>> 32 - 7;
            u = x11 + x10 | 0;
            x8 ^= u << 9 | u >>> 32 - 9;
            u = x8 + x11 | 0;
            x9 ^= u << 13 | u >>> 32 - 13;
            u = x9 + x8 | 0;
            x10 ^= u << 18 | u >>> 32 - 18;
            u = x15 + x14 | 0;
            x12 ^= u << 7 | u >>> 32 - 7;
            u = x12 + x15 | 0;
            x13 ^= u << 9 | u >>> 32 - 9;
            u = x13 + x12 | 0;
            x14 ^= u << 13 | u >>> 32 - 13;
            u = x14 + x13 | 0;
            x15 ^= u << 18 | u >>> 32 - 18;
          }
          x0 = x0 + j0 | 0;
          x1 = x1 + j1 | 0;
          x2 = x2 + j2 | 0;
          x3 = x3 + j3 | 0;
          x4 = x4 + j4 | 0;
          x5 = x5 + j5 | 0;
          x6 = x6 + j6 | 0;
          x7 = x7 + j7 | 0;
          x8 = x8 + j8 | 0;
          x9 = x9 + j9 | 0;
          x10 = x10 + j10 | 0;
          x11 = x11 + j11 | 0;
          x12 = x12 + j12 | 0;
          x13 = x13 + j13 | 0;
          x14 = x14 + j14 | 0;
          x15 = x15 + j15 | 0;
          o[0] = x0 >>> 0 & 0xff;
          o[1] = x0 >>> 8 & 0xff;
          o[2] = x0 >>> 16 & 0xff;
          o[3] = x0 >>> 24 & 0xff;
          o[4] = x1 >>> 0 & 0xff;
          o[5] = x1 >>> 8 & 0xff;
          o[6] = x1 >>> 16 & 0xff;
          o[7] = x1 >>> 24 & 0xff;
          o[8] = x2 >>> 0 & 0xff;
          o[9] = x2 >>> 8 & 0xff;
          o[10] = x2 >>> 16 & 0xff;
          o[11] = x2 >>> 24 & 0xff;
          o[12] = x3 >>> 0 & 0xff;
          o[13] = x3 >>> 8 & 0xff;
          o[14] = x3 >>> 16 & 0xff;
          o[15] = x3 >>> 24 & 0xff;
          o[16] = x4 >>> 0 & 0xff;
          o[17] = x4 >>> 8 & 0xff;
          o[18] = x4 >>> 16 & 0xff;
          o[19] = x4 >>> 24 & 0xff;
          o[20] = x5 >>> 0 & 0xff;
          o[21] = x5 >>> 8 & 0xff;
          o[22] = x5 >>> 16 & 0xff;
          o[23] = x5 >>> 24 & 0xff;
          o[24] = x6 >>> 0 & 0xff;
          o[25] = x6 >>> 8 & 0xff;
          o[26] = x6 >>> 16 & 0xff;
          o[27] = x6 >>> 24 & 0xff;
          o[28] = x7 >>> 0 & 0xff;
          o[29] = x7 >>> 8 & 0xff;
          o[30] = x7 >>> 16 & 0xff;
          o[31] = x7 >>> 24 & 0xff;
          o[32] = x8 >>> 0 & 0xff;
          o[33] = x8 >>> 8 & 0xff;
          o[34] = x8 >>> 16 & 0xff;
          o[35] = x8 >>> 24 & 0xff;
          o[36] = x9 >>> 0 & 0xff;
          o[37] = x9 >>> 8 & 0xff;
          o[38] = x9 >>> 16 & 0xff;
          o[39] = x9 >>> 24 & 0xff;
          o[40] = x10 >>> 0 & 0xff;
          o[41] = x10 >>> 8 & 0xff;
          o[42] = x10 >>> 16 & 0xff;
          o[43] = x10 >>> 24 & 0xff;
          o[44] = x11 >>> 0 & 0xff;
          o[45] = x11 >>> 8 & 0xff;
          o[46] = x11 >>> 16 & 0xff;
          o[47] = x11 >>> 24 & 0xff;
          o[48] = x12 >>> 0 & 0xff;
          o[49] = x12 >>> 8 & 0xff;
          o[50] = x12 >>> 16 & 0xff;
          o[51] = x12 >>> 24 & 0xff;
          o[52] = x13 >>> 0 & 0xff;
          o[53] = x13 >>> 8 & 0xff;
          o[54] = x13 >>> 16 & 0xff;
          o[55] = x13 >>> 24 & 0xff;
          o[56] = x14 >>> 0 & 0xff;
          o[57] = x14 >>> 8 & 0xff;
          o[58] = x14 >>> 16 & 0xff;
          o[59] = x14 >>> 24 & 0xff;
          o[60] = x15 >>> 0 & 0xff;
          o[61] = x15 >>> 8 & 0xff;
          o[62] = x15 >>> 16 & 0xff;
          o[63] = x15 >>> 24 & 0xff;
        }
        function core_hsalsa20(o, p, k, c) {
          var j0 = c[0] & 0xff | (c[1] & 0xff) << 8 | (c[2] & 0xff) << 16 | (c[3] & 0xff) << 24,
            j1 = k[0] & 0xff | (k[1] & 0xff) << 8 | (k[2] & 0xff) << 16 | (k[3] & 0xff) << 24,
            j2 = k[4] & 0xff | (k[5] & 0xff) << 8 | (k[6] & 0xff) << 16 | (k[7] & 0xff) << 24,
            j3 = k[8] & 0xff | (k[9] & 0xff) << 8 | (k[10] & 0xff) << 16 | (k[11] & 0xff) << 24,
            j4 = k[12] & 0xff | (k[13] & 0xff) << 8 | (k[14] & 0xff) << 16 | (k[15] & 0xff) << 24,
            j5 = c[4] & 0xff | (c[5] & 0xff) << 8 | (c[6] & 0xff) << 16 | (c[7] & 0xff) << 24,
            j6 = p[0] & 0xff | (p[1] & 0xff) << 8 | (p[2] & 0xff) << 16 | (p[3] & 0xff) << 24,
            j7 = p[4] & 0xff | (p[5] & 0xff) << 8 | (p[6] & 0xff) << 16 | (p[7] & 0xff) << 24,
            j8 = p[8] & 0xff | (p[9] & 0xff) << 8 | (p[10] & 0xff) << 16 | (p[11] & 0xff) << 24,
            j9 = p[12] & 0xff | (p[13] & 0xff) << 8 | (p[14] & 0xff) << 16 | (p[15] & 0xff) << 24,
            j10 = c[8] & 0xff | (c[9] & 0xff) << 8 | (c[10] & 0xff) << 16 | (c[11] & 0xff) << 24,
            j11 = k[16] & 0xff | (k[17] & 0xff) << 8 | (k[18] & 0xff) << 16 | (k[19] & 0xff) << 24,
            j12 = k[20] & 0xff | (k[21] & 0xff) << 8 | (k[22] & 0xff) << 16 | (k[23] & 0xff) << 24,
            j13 = k[24] & 0xff | (k[25] & 0xff) << 8 | (k[26] & 0xff) << 16 | (k[27] & 0xff) << 24,
            j14 = k[28] & 0xff | (k[29] & 0xff) << 8 | (k[30] & 0xff) << 16 | (k[31] & 0xff) << 24,
            j15 = c[12] & 0xff | (c[13] & 0xff) << 8 | (c[14] & 0xff) << 16 | (c[15] & 0xff) << 24;
          var x0 = j0,
            x1 = j1,
            x2 = j2,
            x3 = j3,
            x4 = j4,
            x5 = j5,
            x6 = j6,
            x7 = j7,
            x8 = j8,
            x9 = j9,
            x10 = j10,
            x11 = j11,
            x12 = j12,
            x13 = j13,
            x14 = j14,
            x15 = j15,
            u;
          for (var i = 0; i < 20; i += 2) {
            u = x0 + x12 | 0;
            x4 ^= u << 7 | u >>> 32 - 7;
            u = x4 + x0 | 0;
            x8 ^= u << 9 | u >>> 32 - 9;
            u = x8 + x4 | 0;
            x12 ^= u << 13 | u >>> 32 - 13;
            u = x12 + x8 | 0;
            x0 ^= u << 18 | u >>> 32 - 18;
            u = x5 + x1 | 0;
            x9 ^= u << 7 | u >>> 32 - 7;
            u = x9 + x5 | 0;
            x13 ^= u << 9 | u >>> 32 - 9;
            u = x13 + x9 | 0;
            x1 ^= u << 13 | u >>> 32 - 13;
            u = x1 + x13 | 0;
            x5 ^= u << 18 | u >>> 32 - 18;
            u = x10 + x6 | 0;
            x14 ^= u << 7 | u >>> 32 - 7;
            u = x14 + x10 | 0;
            x2 ^= u << 9 | u >>> 32 - 9;
            u = x2 + x14 | 0;
            x6 ^= u << 13 | u >>> 32 - 13;
            u = x6 + x2 | 0;
            x10 ^= u << 18 | u >>> 32 - 18;
            u = x15 + x11 | 0;
            x3 ^= u << 7 | u >>> 32 - 7;
            u = x3 + x15 | 0;
            x7 ^= u << 9 | u >>> 32 - 9;
            u = x7 + x3 | 0;
            x11 ^= u << 13 | u >>> 32 - 13;
            u = x11 + x7 | 0;
            x15 ^= u << 18 | u >>> 32 - 18;
            u = x0 + x3 | 0;
            x1 ^= u << 7 | u >>> 32 - 7;
            u = x1 + x0 | 0;
            x2 ^= u << 9 | u >>> 32 - 9;
            u = x2 + x1 | 0;
            x3 ^= u << 13 | u >>> 32 - 13;
            u = x3 + x2 | 0;
            x0 ^= u << 18 | u >>> 32 - 18;
            u = x5 + x4 | 0;
            x6 ^= u << 7 | u >>> 32 - 7;
            u = x6 + x5 | 0;
            x7 ^= u << 9 | u >>> 32 - 9;
            u = x7 + x6 | 0;
            x4 ^= u << 13 | u >>> 32 - 13;
            u = x4 + x7 | 0;
            x5 ^= u << 18 | u >>> 32 - 18;
            u = x10 + x9 | 0;
            x11 ^= u << 7 | u >>> 32 - 7;
            u = x11 + x10 | 0;
            x8 ^= u << 9 | u >>> 32 - 9;
            u = x8 + x11 | 0;
            x9 ^= u << 13 | u >>> 32 - 13;
            u = x9 + x8 | 0;
            x10 ^= u << 18 | u >>> 32 - 18;
            u = x15 + x14 | 0;
            x12 ^= u << 7 | u >>> 32 - 7;
            u = x12 + x15 | 0;
            x13 ^= u << 9 | u >>> 32 - 9;
            u = x13 + x12 | 0;
            x14 ^= u << 13 | u >>> 32 - 13;
            u = x14 + x13 | 0;
            x15 ^= u << 18 | u >>> 32 - 18;
          }
          o[0] = x0 >>> 0 & 0xff;
          o[1] = x0 >>> 8 & 0xff;
          o[2] = x0 >>> 16 & 0xff;
          o[3] = x0 >>> 24 & 0xff;
          o[4] = x5 >>> 0 & 0xff;
          o[5] = x5 >>> 8 & 0xff;
          o[6] = x5 >>> 16 & 0xff;
          o[7] = x5 >>> 24 & 0xff;
          o[8] = x10 >>> 0 & 0xff;
          o[9] = x10 >>> 8 & 0xff;
          o[10] = x10 >>> 16 & 0xff;
          o[11] = x10 >>> 24 & 0xff;
          o[12] = x15 >>> 0 & 0xff;
          o[13] = x15 >>> 8 & 0xff;
          o[14] = x15 >>> 16 & 0xff;
          o[15] = x15 >>> 24 & 0xff;
          o[16] = x6 >>> 0 & 0xff;
          o[17] = x6 >>> 8 & 0xff;
          o[18] = x6 >>> 16 & 0xff;
          o[19] = x6 >>> 24 & 0xff;
          o[20] = x7 >>> 0 & 0xff;
          o[21] = x7 >>> 8 & 0xff;
          o[22] = x7 >>> 16 & 0xff;
          o[23] = x7 >>> 24 & 0xff;
          o[24] = x8 >>> 0 & 0xff;
          o[25] = x8 >>> 8 & 0xff;
          o[26] = x8 >>> 16 & 0xff;
          o[27] = x8 >>> 24 & 0xff;
          o[28] = x9 >>> 0 & 0xff;
          o[29] = x9 >>> 8 & 0xff;
          o[30] = x9 >>> 16 & 0xff;
          o[31] = x9 >>> 24 & 0xff;
        }
        function crypto_core_salsa20(out, inp, k, c) {
          core_salsa20(out, inp, k, c);
        }
        function crypto_core_hsalsa20(out, inp, k, c) {
          core_hsalsa20(out, inp, k, c);
        }
        var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
        function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
          var z = new Uint8Array(16),
            x = new Uint8Array(64);
          var u, i;
          for (i = 0; i < 16; i++) z[i] = 0;
          for (i = 0; i < 8; i++) z[i] = n[i];
          while (b >= 64) {
            crypto_core_salsa20(x, z, k, sigma);
            for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
            u = 1;
            for (i = 8; i < 16; i++) {
              u = u + (z[i] & 0xff) | 0;
              z[i] = u & 0xff;
              u >>>= 8;
            }
            b -= 64;
            cpos += 64;
            mpos += 64;
          }
          if (b > 0) {
            crypto_core_salsa20(x, z, k, sigma);
            for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
          }
          return 0;
        }
        function crypto_stream_salsa20(c, cpos, b, n, k) {
          var z = new Uint8Array(16),
            x = new Uint8Array(64);
          var u, i;
          for (i = 0; i < 16; i++) z[i] = 0;
          for (i = 0; i < 8; i++) z[i] = n[i];
          while (b >= 64) {
            crypto_core_salsa20(x, z, k, sigma);
            for (i = 0; i < 64; i++) c[cpos + i] = x[i];
            u = 1;
            for (i = 8; i < 16; i++) {
              u = u + (z[i] & 0xff) | 0;
              z[i] = u & 0xff;
              u >>>= 8;
            }
            b -= 64;
            cpos += 64;
          }
          if (b > 0) {
            crypto_core_salsa20(x, z, k, sigma);
            for (i = 0; i < b; i++) c[cpos + i] = x[i];
          }
          return 0;
        }
        function crypto_stream(c, cpos, d, n, k) {
          var s = new Uint8Array(32);
          crypto_core_hsalsa20(s, n, k, sigma);
          var sn = new Uint8Array(8);
          for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
          return crypto_stream_salsa20(c, cpos, d, sn, s);
        }
        function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
          var s = new Uint8Array(32);
          crypto_core_hsalsa20(s, n, k, sigma);
          var sn = new Uint8Array(8);
          for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
          return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
        }
        var poly1305 = function (key) {
          this.buffer = new Uint8Array(16);
          this.r = new Uint16Array(10);
          this.h = new Uint16Array(10);
          this.pad = new Uint16Array(8);
          this.leftover = 0;
          this.fin = 0;
          var t0, t1, t2, t3, t4, t5, t6, t7;
          t0 = key[0] & 0xff | (key[1] & 0xff) << 8;
          this.r[0] = t0 & 0x1fff;
          t1 = key[2] & 0xff | (key[3] & 0xff) << 8;
          this.r[1] = (t0 >>> 13 | t1 << 3) & 0x1fff;
          t2 = key[4] & 0xff | (key[5] & 0xff) << 8;
          this.r[2] = (t1 >>> 10 | t2 << 6) & 0x1f03;
          t3 = key[6] & 0xff | (key[7] & 0xff) << 8;
          this.r[3] = (t2 >>> 7 | t3 << 9) & 0x1fff;
          t4 = key[8] & 0xff | (key[9] & 0xff) << 8;
          this.r[4] = (t3 >>> 4 | t4 << 12) & 0x00ff;
          this.r[5] = t4 >>> 1 & 0x1ffe;
          t5 = key[10] & 0xff | (key[11] & 0xff) << 8;
          this.r[6] = (t4 >>> 14 | t5 << 2) & 0x1fff;
          t6 = key[12] & 0xff | (key[13] & 0xff) << 8;
          this.r[7] = (t5 >>> 11 | t6 << 5) & 0x1f81;
          t7 = key[14] & 0xff | (key[15] & 0xff) << 8;
          this.r[8] = (t6 >>> 8 | t7 << 8) & 0x1fff;
          this.r[9] = t7 >>> 5 & 0x007f;
          this.pad[0] = key[16] & 0xff | (key[17] & 0xff) << 8;
          this.pad[1] = key[18] & 0xff | (key[19] & 0xff) << 8;
          this.pad[2] = key[20] & 0xff | (key[21] & 0xff) << 8;
          this.pad[3] = key[22] & 0xff | (key[23] & 0xff) << 8;
          this.pad[4] = key[24] & 0xff | (key[25] & 0xff) << 8;
          this.pad[5] = key[26] & 0xff | (key[27] & 0xff) << 8;
          this.pad[6] = key[28] & 0xff | (key[29] & 0xff) << 8;
          this.pad[7] = key[30] & 0xff | (key[31] & 0xff) << 8;
        };
        poly1305.prototype.blocks = function (m, mpos, bytes) {
          var hibit = this.fin ? 0 : 1 << 11;
          var t0, t1, t2, t3, t4, t5, t6, t7, c;
          var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
          var h0 = this.h[0],
            h1 = this.h[1],
            h2 = this.h[2],
            h3 = this.h[3],
            h4 = this.h[4],
            h5 = this.h[5],
            h6 = this.h[6],
            h7 = this.h[7],
            h8 = this.h[8],
            h9 = this.h[9];
          var r0 = this.r[0],
            r1 = this.r[1],
            r2 = this.r[2],
            r3 = this.r[3],
            r4 = this.r[4],
            r5 = this.r[5],
            r6 = this.r[6],
            r7 = this.r[7],
            r8 = this.r[8],
            r9 = this.r[9];
          while (bytes >= 16) {
            t0 = m[mpos + 0] & 0xff | (m[mpos + 1] & 0xff) << 8;
            h0 += t0 & 0x1fff;
            t1 = m[mpos + 2] & 0xff | (m[mpos + 3] & 0xff) << 8;
            h1 += (t0 >>> 13 | t1 << 3) & 0x1fff;
            t2 = m[mpos + 4] & 0xff | (m[mpos + 5] & 0xff) << 8;
            h2 += (t1 >>> 10 | t2 << 6) & 0x1fff;
            t3 = m[mpos + 6] & 0xff | (m[mpos + 7] & 0xff) << 8;
            h3 += (t2 >>> 7 | t3 << 9) & 0x1fff;
            t4 = m[mpos + 8] & 0xff | (m[mpos + 9] & 0xff) << 8;
            h4 += (t3 >>> 4 | t4 << 12) & 0x1fff;
            h5 += t4 >>> 1 & 0x1fff;
            t5 = m[mpos + 10] & 0xff | (m[mpos + 11] & 0xff) << 8;
            h6 += (t4 >>> 14 | t5 << 2) & 0x1fff;
            t6 = m[mpos + 12] & 0xff | (m[mpos + 13] & 0xff) << 8;
            h7 += (t5 >>> 11 | t6 << 5) & 0x1fff;
            t7 = m[mpos + 14] & 0xff | (m[mpos + 15] & 0xff) << 8;
            h8 += (t6 >>> 8 | t7 << 8) & 0x1fff;
            h9 += t7 >>> 5 | hibit;
            c = 0;
            d0 = c;
            d0 += h0 * r0;
            d0 += h1 * (5 * r9);
            d0 += h2 * (5 * r8);
            d0 += h3 * (5 * r7);
            d0 += h4 * (5 * r6);
            c = d0 >>> 13;
            d0 &= 0x1fff;
            d0 += h5 * (5 * r5);
            d0 += h6 * (5 * r4);
            d0 += h7 * (5 * r3);
            d0 += h8 * (5 * r2);
            d0 += h9 * (5 * r1);
            c += d0 >>> 13;
            d0 &= 0x1fff;
            d1 = c;
            d1 += h0 * r1;
            d1 += h1 * r0;
            d1 += h2 * (5 * r9);
            d1 += h3 * (5 * r8);
            d1 += h4 * (5 * r7);
            c = d1 >>> 13;
            d1 &= 0x1fff;
            d1 += h5 * (5 * r6);
            d1 += h6 * (5 * r5);
            d1 += h7 * (5 * r4);
            d1 += h8 * (5 * r3);
            d1 += h9 * (5 * r2);
            c += d1 >>> 13;
            d1 &= 0x1fff;
            d2 = c;
            d2 += h0 * r2;
            d2 += h1 * r1;
            d2 += h2 * r0;
            d2 += h3 * (5 * r9);
            d2 += h4 * (5 * r8);
            c = d2 >>> 13;
            d2 &= 0x1fff;
            d2 += h5 * (5 * r7);
            d2 += h6 * (5 * r6);
            d2 += h7 * (5 * r5);
            d2 += h8 * (5 * r4);
            d2 += h9 * (5 * r3);
            c += d2 >>> 13;
            d2 &= 0x1fff;
            d3 = c;
            d3 += h0 * r3;
            d3 += h1 * r2;
            d3 += h2 * r1;
            d3 += h3 * r0;
            d3 += h4 * (5 * r9);
            c = d3 >>> 13;
            d3 &= 0x1fff;
            d3 += h5 * (5 * r8);
            d3 += h6 * (5 * r7);
            d3 += h7 * (5 * r6);
            d3 += h8 * (5 * r5);
            d3 += h9 * (5 * r4);
            c += d3 >>> 13;
            d3 &= 0x1fff;
            d4 = c;
            d4 += h0 * r4;
            d4 += h1 * r3;
            d4 += h2 * r2;
            d4 += h3 * r1;
            d4 += h4 * r0;
            c = d4 >>> 13;
            d4 &= 0x1fff;
            d4 += h5 * (5 * r9);
            d4 += h6 * (5 * r8);
            d4 += h7 * (5 * r7);
            d4 += h8 * (5 * r6);
            d4 += h9 * (5 * r5);
            c += d4 >>> 13;
            d4 &= 0x1fff;
            d5 = c;
            d5 += h0 * r5;
            d5 += h1 * r4;
            d5 += h2 * r3;
            d5 += h3 * r2;
            d5 += h4 * r1;
            c = d5 >>> 13;
            d5 &= 0x1fff;
            d5 += h5 * r0;
            d5 += h6 * (5 * r9);
            d5 += h7 * (5 * r8);
            d5 += h8 * (5 * r7);
            d5 += h9 * (5 * r6);
            c += d5 >>> 13;
            d5 &= 0x1fff;
            d6 = c;
            d6 += h0 * r6;
            d6 += h1 * r5;
            d6 += h2 * r4;
            d6 += h3 * r3;
            d6 += h4 * r2;
            c = d6 >>> 13;
            d6 &= 0x1fff;
            d6 += h5 * r1;
            d6 += h6 * r0;
            d6 += h7 * (5 * r9);
            d6 += h8 * (5 * r8);
            d6 += h9 * (5 * r7);
            c += d6 >>> 13;
            d6 &= 0x1fff;
            d7 = c;
            d7 += h0 * r7;
            d7 += h1 * r6;
            d7 += h2 * r5;
            d7 += h3 * r4;
            d7 += h4 * r3;
            c = d7 >>> 13;
            d7 &= 0x1fff;
            d7 += h5 * r2;
            d7 += h6 * r1;
            d7 += h7 * r0;
            d7 += h8 * (5 * r9);
            d7 += h9 * (5 * r8);
            c += d7 >>> 13;
            d7 &= 0x1fff;
            d8 = c;
            d8 += h0 * r8;
            d8 += h1 * r7;
            d8 += h2 * r6;
            d8 += h3 * r5;
            d8 += h4 * r4;
            c = d8 >>> 13;
            d8 &= 0x1fff;
            d8 += h5 * r3;
            d8 += h6 * r2;
            d8 += h7 * r1;
            d8 += h8 * r0;
            d8 += h9 * (5 * r9);
            c += d8 >>> 13;
            d8 &= 0x1fff;
            d9 = c;
            d9 += h0 * r9;
            d9 += h1 * r8;
            d9 += h2 * r7;
            d9 += h3 * r6;
            d9 += h4 * r5;
            c = d9 >>> 13;
            d9 &= 0x1fff;
            d9 += h5 * r4;
            d9 += h6 * r3;
            d9 += h7 * r2;
            d9 += h8 * r1;
            d9 += h9 * r0;
            c += d9 >>> 13;
            d9 &= 0x1fff;
            c = (c << 2) + c | 0;
            c = c + d0 | 0;
            d0 = c & 0x1fff;
            c = c >>> 13;
            d1 += c;
            h0 = d0;
            h1 = d1;
            h2 = d2;
            h3 = d3;
            h4 = d4;
            h5 = d5;
            h6 = d6;
            h7 = d7;
            h8 = d8;
            h9 = d9;
            mpos += 16;
            bytes -= 16;
          }
          this.h[0] = h0;
          this.h[1] = h1;
          this.h[2] = h2;
          this.h[3] = h3;
          this.h[4] = h4;
          this.h[5] = h5;
          this.h[6] = h6;
          this.h[7] = h7;
          this.h[8] = h8;
          this.h[9] = h9;
        };
        poly1305.prototype.finish = function (mac, macpos) {
          var g = new Uint16Array(10);
          var c, mask, f, i;
          if (this.leftover) {
            i = this.leftover;
            this.buffer[i++] = 1;
            for (; i < 16; i++) this.buffer[i] = 0;
            this.fin = 1;
            this.blocks(this.buffer, 0, 16);
          }
          c = this.h[1] >>> 13;
          this.h[1] &= 0x1fff;
          for (i = 2; i < 10; i++) {
            this.h[i] += c;
            c = this.h[i] >>> 13;
            this.h[i] &= 0x1fff;
          }
          this.h[0] += c * 5;
          c = this.h[0] >>> 13;
          this.h[0] &= 0x1fff;
          this.h[1] += c;
          c = this.h[1] >>> 13;
          this.h[1] &= 0x1fff;
          this.h[2] += c;
          g[0] = this.h[0] + 5;
          c = g[0] >>> 13;
          g[0] &= 0x1fff;
          for (i = 1; i < 10; i++) {
            g[i] = this.h[i] + c;
            c = g[i] >>> 13;
            g[i] &= 0x1fff;
          }
          g[9] -= 1 << 13;
          mask = (c ^ 1) - 1;
          for (i = 0; i < 10; i++) g[i] &= mask;
          mask = ~mask;
          for (i = 0; i < 10; i++) this.h[i] = this.h[i] & mask | g[i];
          this.h[0] = (this.h[0] | this.h[1] << 13) & 0xffff;
          this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 0xffff;
          this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 0xffff;
          this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 0xffff;
          this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 0xffff;
          this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 0xffff;
          this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 0xffff;
          this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 0xffff;
          f = this.h[0] + this.pad[0];
          this.h[0] = f & 0xffff;
          for (i = 1; i < 8; i++) {
            f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
            this.h[i] = f & 0xffff;
          }
          mac[macpos + 0] = this.h[0] >>> 0 & 0xff;
          mac[macpos + 1] = this.h[0] >>> 8 & 0xff;
          mac[macpos + 2] = this.h[1] >>> 0 & 0xff;
          mac[macpos + 3] = this.h[1] >>> 8 & 0xff;
          mac[macpos + 4] = this.h[2] >>> 0 & 0xff;
          mac[macpos + 5] = this.h[2] >>> 8 & 0xff;
          mac[macpos + 6] = this.h[3] >>> 0 & 0xff;
          mac[macpos + 7] = this.h[3] >>> 8 & 0xff;
          mac[macpos + 8] = this.h[4] >>> 0 & 0xff;
          mac[macpos + 9] = this.h[4] >>> 8 & 0xff;
          mac[macpos + 10] = this.h[5] >>> 0 & 0xff;
          mac[macpos + 11] = this.h[5] >>> 8 & 0xff;
          mac[macpos + 12] = this.h[6] >>> 0 & 0xff;
          mac[macpos + 13] = this.h[6] >>> 8 & 0xff;
          mac[macpos + 14] = this.h[7] >>> 0 & 0xff;
          mac[macpos + 15] = this.h[7] >>> 8 & 0xff;
        };
        poly1305.prototype.update = function (m, mpos, bytes) {
          var i, want;
          if (this.leftover) {
            want = 16 - this.leftover;
            if (want > bytes) want = bytes;
            for (i = 0; i < want; i++) this.buffer[this.leftover + i] = m[mpos + i];
            bytes -= want;
            mpos += want;
            this.leftover += want;
            if (this.leftover < 16) return;
            this.blocks(this.buffer, 0, 16);
            this.leftover = 0;
          }
          if (bytes >= 16) {
            want = bytes - bytes % 16;
            this.blocks(m, mpos, want);
            mpos += want;
            bytes -= want;
          }
          if (bytes) {
            for (i = 0; i < bytes; i++) this.buffer[this.leftover + i] = m[mpos + i];
            this.leftover += bytes;
          }
        };
        function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
          var s = new poly1305(k);
          s.update(m, mpos, n);
          s.finish(out, outpos);
          return 0;
        }
        function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
          var x = new Uint8Array(16);
          crypto_onetimeauth(x, 0, m, mpos, n, k);
          return crypto_verify_16(h, hpos, x, 0);
        }
        function crypto_secretbox(c, m, d, n, k) {
          var i;
          if (d < 32) return -1;
          crypto_stream_xor(c, 0, m, 0, d, n, k);
          crypto_onetimeauth(c, 16, c, 32, d - 32, c);
          for (i = 0; i < 16; i++) c[i] = 0;
          return 0;
        }
        function crypto_secretbox_open(m, c, d, n, k) {
          var i;
          var x = new Uint8Array(32);
          if (d < 32) return -1;
          crypto_stream(x, 0, 32, n, k);
          if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1;
          crypto_stream_xor(m, 0, c, 0, d, n, k);
          for (i = 0; i < 32; i++) m[i] = 0;
          return 0;
        }
        function set25519(r, a) {
          var i;
          for (i = 0; i < 16; i++) r[i] = a[i] | 0;
        }
        function car25519(o) {
          var i,
            v,
            c = 1;
          for (i = 0; i < 16; i++) {
            v = o[i] + c + 65535;
            c = Math.floor(v / 65536);
            o[i] = v - c * 65536;
          }
          o[0] += c - 1 + 37 * (c - 1);
        }
        function sel25519(p, q, b) {
          var t,
            c = ~(b - 1);
          for (var i = 0; i < 16; i++) {
            t = c & (p[i] ^ q[i]);
            p[i] ^= t;
            q[i] ^= t;
          }
        }
        function pack25519(o, n) {
          var i, j, b;
          var m = gf(),
            t = gf();
          for (i = 0; i < 16; i++) t[i] = n[i];
          car25519(t);
          car25519(t);
          car25519(t);
          for (j = 0; j < 2; j++) {
            m[0] = t[0] - 0xffed;
            for (i = 1; i < 15; i++) {
              m[i] = t[i] - 0xffff - (m[i - 1] >> 16 & 1);
              m[i - 1] &= 0xffff;
            }
            m[15] = t[15] - 0x7fff - (m[14] >> 16 & 1);
            b = m[15] >> 16 & 1;
            m[14] &= 0xffff;
            sel25519(t, m, 1 - b);
          }
          for (i = 0; i < 16; i++) {
            o[2 * i] = t[i] & 0xff;
            o[2 * i + 1] = t[i] >> 8;
          }
        }
        function neq25519(a, b) {
          var c = new Uint8Array(32),
            d = new Uint8Array(32);
          pack25519(c, a);
          pack25519(d, b);
          return crypto_verify_32(c, 0, d, 0);
        }
        function par25519(a) {
          var d = new Uint8Array(32);
          pack25519(d, a);
          return d[0] & 1;
        }
        function unpack25519(o, n) {
          var i;
          for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
          o[15] &= 0x7fff;
        }
        function A(o, a, b) {
          for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
        }
        function Z(o, a, b) {
          for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
        }
        function M(o, a, b) {
          var v,
            c,
            t0 = 0,
            t1 = 0,
            t2 = 0,
            t3 = 0,
            t4 = 0,
            t5 = 0,
            t6 = 0,
            t7 = 0,
            t8 = 0,
            t9 = 0,
            t10 = 0,
            t11 = 0,
            t12 = 0,
            t13 = 0,
            t14 = 0,
            t15 = 0,
            t16 = 0,
            t17 = 0,
            t18 = 0,
            t19 = 0,
            t20 = 0,
            t21 = 0,
            t22 = 0,
            t23 = 0,
            t24 = 0,
            t25 = 0,
            t26 = 0,
            t27 = 0,
            t28 = 0,
            t29 = 0,
            t30 = 0,
            b0 = b[0],
            b1 = b[1],
            b2 = b[2],
            b3 = b[3],
            b4 = b[4],
            b5 = b[5],
            b6 = b[6],
            b7 = b[7],
            b8 = b[8],
            b9 = b[9],
            b10 = b[10],
            b11 = b[11],
            b12 = b[12],
            b13 = b[13],
            b14 = b[14],
            b15 = b[15];
          v = a[0];
          t0 += v * b0;
          t1 += v * b1;
          t2 += v * b2;
          t3 += v * b3;
          t4 += v * b4;
          t5 += v * b5;
          t6 += v * b6;
          t7 += v * b7;
          t8 += v * b8;
          t9 += v * b9;
          t10 += v * b10;
          t11 += v * b11;
          t12 += v * b12;
          t13 += v * b13;
          t14 += v * b14;
          t15 += v * b15;
          v = a[1];
          t1 += v * b0;
          t2 += v * b1;
          t3 += v * b2;
          t4 += v * b3;
          t5 += v * b4;
          t6 += v * b5;
          t7 += v * b6;
          t8 += v * b7;
          t9 += v * b8;
          t10 += v * b9;
          t11 += v * b10;
          t12 += v * b11;
          t13 += v * b12;
          t14 += v * b13;
          t15 += v * b14;
          t16 += v * b15;
          v = a[2];
          t2 += v * b0;
          t3 += v * b1;
          t4 += v * b2;
          t5 += v * b3;
          t6 += v * b4;
          t7 += v * b5;
          t8 += v * b6;
          t9 += v * b7;
          t10 += v * b8;
          t11 += v * b9;
          t12 += v * b10;
          t13 += v * b11;
          t14 += v * b12;
          t15 += v * b13;
          t16 += v * b14;
          t17 += v * b15;
          v = a[3];
          t3 += v * b0;
          t4 += v * b1;
          t5 += v * b2;
          t6 += v * b3;
          t7 += v * b4;
          t8 += v * b5;
          t9 += v * b6;
          t10 += v * b7;
          t11 += v * b8;
          t12 += v * b9;
          t13 += v * b10;
          t14 += v * b11;
          t15 += v * b12;
          t16 += v * b13;
          t17 += v * b14;
          t18 += v * b15;
          v = a[4];
          t4 += v * b0;
          t5 += v * b1;
          t6 += v * b2;
          t7 += v * b3;
          t8 += v * b4;
          t9 += v * b5;
          t10 += v * b6;
          t11 += v * b7;
          t12 += v * b8;
          t13 += v * b9;
          t14 += v * b10;
          t15 += v * b11;
          t16 += v * b12;
          t17 += v * b13;
          t18 += v * b14;
          t19 += v * b15;
          v = a[5];
          t5 += v * b0;
          t6 += v * b1;
          t7 += v * b2;
          t8 += v * b3;
          t9 += v * b4;
          t10 += v * b5;
          t11 += v * b6;
          t12 += v * b7;
          t13 += v * b8;
          t14 += v * b9;
          t15 += v * b10;
          t16 += v * b11;
          t17 += v * b12;
          t18 += v * b13;
          t19 += v * b14;
          t20 += v * b15;
          v = a[6];
          t6 += v * b0;
          t7 += v * b1;
          t8 += v * b2;
          t9 += v * b3;
          t10 += v * b4;
          t11 += v * b5;
          t12 += v * b6;
          t13 += v * b7;
          t14 += v * b8;
          t15 += v * b9;
          t16 += v * b10;
          t17 += v * b11;
          t18 += v * b12;
          t19 += v * b13;
          t20 += v * b14;
          t21 += v * b15;
          v = a[7];
          t7 += v * b0;
          t8 += v * b1;
          t9 += v * b2;
          t10 += v * b3;
          t11 += v * b4;
          t12 += v * b5;
          t13 += v * b6;
          t14 += v * b7;
          t15 += v * b8;
          t16 += v * b9;
          t17 += v * b10;
          t18 += v * b11;
          t19 += v * b12;
          t20 += v * b13;
          t21 += v * b14;
          t22 += v * b15;
          v = a[8];
          t8 += v * b0;
          t9 += v * b1;
          t10 += v * b2;
          t11 += v * b3;
          t12 += v * b4;
          t13 += v * b5;
          t14 += v * b6;
          t15 += v * b7;
          t16 += v * b8;
          t17 += v * b9;
          t18 += v * b10;
          t19 += v * b11;
          t20 += v * b12;
          t21 += v * b13;
          t22 += v * b14;
          t23 += v * b15;
          v = a[9];
          t9 += v * b0;
          t10 += v * b1;
          t11 += v * b2;
          t12 += v * b3;
          t13 += v * b4;
          t14 += v * b5;
          t15 += v * b6;
          t16 += v * b7;
          t17 += v * b8;
          t18 += v * b9;
          t19 += v * b10;
          t20 += v * b11;
          t21 += v * b12;
          t22 += v * b13;
          t23 += v * b14;
          t24 += v * b15;
          v = a[10];
          t10 += v * b0;
          t11 += v * b1;
          t12 += v * b2;
          t13 += v * b3;
          t14 += v * b4;
          t15 += v * b5;
          t16 += v * b6;
          t17 += v * b7;
          t18 += v * b8;
          t19 += v * b9;
          t20 += v * b10;
          t21 += v * b11;
          t22 += v * b12;
          t23 += v * b13;
          t24 += v * b14;
          t25 += v * b15;
          v = a[11];
          t11 += v * b0;
          t12 += v * b1;
          t13 += v * b2;
          t14 += v * b3;
          t15 += v * b4;
          t16 += v * b5;
          t17 += v * b6;
          t18 += v * b7;
          t19 += v * b8;
          t20 += v * b9;
          t21 += v * b10;
          t22 += v * b11;
          t23 += v * b12;
          t24 += v * b13;
          t25 += v * b14;
          t26 += v * b15;
          v = a[12];
          t12 += v * b0;
          t13 += v * b1;
          t14 += v * b2;
          t15 += v * b3;
          t16 += v * b4;
          t17 += v * b5;
          t18 += v * b6;
          t19 += v * b7;
          t20 += v * b8;
          t21 += v * b9;
          t22 += v * b10;
          t23 += v * b11;
          t24 += v * b12;
          t25 += v * b13;
          t26 += v * b14;
          t27 += v * b15;
          v = a[13];
          t13 += v * b0;
          t14 += v * b1;
          t15 += v * b2;
          t16 += v * b3;
          t17 += v * b4;
          t18 += v * b5;
          t19 += v * b6;
          t20 += v * b7;
          t21 += v * b8;
          t22 += v * b9;
          t23 += v * b10;
          t24 += v * b11;
          t25 += v * b12;
          t26 += v * b13;
          t27 += v * b14;
          t28 += v * b15;
          v = a[14];
          t14 += v * b0;
          t15 += v * b1;
          t16 += v * b2;
          t17 += v * b3;
          t18 += v * b4;
          t19 += v * b5;
          t20 += v * b6;
          t21 += v * b7;
          t22 += v * b8;
          t23 += v * b9;
          t24 += v * b10;
          t25 += v * b11;
          t26 += v * b12;
          t27 += v * b13;
          t28 += v * b14;
          t29 += v * b15;
          v = a[15];
          t15 += v * b0;
          t16 += v * b1;
          t17 += v * b2;
          t18 += v * b3;
          t19 += v * b4;
          t20 += v * b5;
          t21 += v * b6;
          t22 += v * b7;
          t23 += v * b8;
          t24 += v * b9;
          t25 += v * b10;
          t26 += v * b11;
          t27 += v * b12;
          t28 += v * b13;
          t29 += v * b14;
          t30 += v * b15;
          t0 += 38 * t16;
          t1 += 38 * t17;
          t2 += 38 * t18;
          t3 += 38 * t19;
          t4 += 38 * t20;
          t5 += 38 * t21;
          t6 += 38 * t22;
          t7 += 38 * t23;
          t8 += 38 * t24;
          t9 += 38 * t25;
          t10 += 38 * t26;
          t11 += 38 * t27;
          t12 += 38 * t28;
          t13 += 38 * t29;
          t14 += 38 * t30;
          c = 1;
          v = t0 + c + 65535;
          c = Math.floor(v / 65536);
          t0 = v - c * 65536;
          v = t1 + c + 65535;
          c = Math.floor(v / 65536);
          t1 = v - c * 65536;
          v = t2 + c + 65535;
          c = Math.floor(v / 65536);
          t2 = v - c * 65536;
          v = t3 + c + 65535;
          c = Math.floor(v / 65536);
          t3 = v - c * 65536;
          v = t4 + c + 65535;
          c = Math.floor(v / 65536);
          t4 = v - c * 65536;
          v = t5 + c + 65535;
          c = Math.floor(v / 65536);
          t5 = v - c * 65536;
          v = t6 + c + 65535;
          c = Math.floor(v / 65536);
          t6 = v - c * 65536;
          v = t7 + c + 65535;
          c = Math.floor(v / 65536);
          t7 = v - c * 65536;
          v = t8 + c + 65535;
          c = Math.floor(v / 65536);
          t8 = v - c * 65536;
          v = t9 + c + 65535;
          c = Math.floor(v / 65536);
          t9 = v - c * 65536;
          v = t10 + c + 65535;
          c = Math.floor(v / 65536);
          t10 = v - c * 65536;
          v = t11 + c + 65535;
          c = Math.floor(v / 65536);
          t11 = v - c * 65536;
          v = t12 + c + 65535;
          c = Math.floor(v / 65536);
          t12 = v - c * 65536;
          v = t13 + c + 65535;
          c = Math.floor(v / 65536);
          t13 = v - c * 65536;
          v = t14 + c + 65535;
          c = Math.floor(v / 65536);
          t14 = v - c * 65536;
          v = t15 + c + 65535;
          c = Math.floor(v / 65536);
          t15 = v - c * 65536;
          t0 += c - 1 + 37 * (c - 1);
          c = 1;
          v = t0 + c + 65535;
          c = Math.floor(v / 65536);
          t0 = v - c * 65536;
          v = t1 + c + 65535;
          c = Math.floor(v / 65536);
          t1 = v - c * 65536;
          v = t2 + c + 65535;
          c = Math.floor(v / 65536);
          t2 = v - c * 65536;
          v = t3 + c + 65535;
          c = Math.floor(v / 65536);
          t3 = v - c * 65536;
          v = t4 + c + 65535;
          c = Math.floor(v / 65536);
          t4 = v - c * 65536;
          v = t5 + c + 65535;
          c = Math.floor(v / 65536);
          t5 = v - c * 65536;
          v = t6 + c + 65535;
          c = Math.floor(v / 65536);
          t6 = v - c * 65536;
          v = t7 + c + 65535;
          c = Math.floor(v / 65536);
          t7 = v - c * 65536;
          v = t8 + c + 65535;
          c = Math.floor(v / 65536);
          t8 = v - c * 65536;
          v = t9 + c + 65535;
          c = Math.floor(v / 65536);
          t9 = v - c * 65536;
          v = t10 + c + 65535;
          c = Math.floor(v / 65536);
          t10 = v - c * 65536;
          v = t11 + c + 65535;
          c = Math.floor(v / 65536);
          t11 = v - c * 65536;
          v = t12 + c + 65535;
          c = Math.floor(v / 65536);
          t12 = v - c * 65536;
          v = t13 + c + 65535;
          c = Math.floor(v / 65536);
          t13 = v - c * 65536;
          v = t14 + c + 65535;
          c = Math.floor(v / 65536);
          t14 = v - c * 65536;
          v = t15 + c + 65535;
          c = Math.floor(v / 65536);
          t15 = v - c * 65536;
          t0 += c - 1 + 37 * (c - 1);
          o[0] = t0;
          o[1] = t1;
          o[2] = t2;
          o[3] = t3;
          o[4] = t4;
          o[5] = t5;
          o[6] = t6;
          o[7] = t7;
          o[8] = t8;
          o[9] = t9;
          o[10] = t10;
          o[11] = t11;
          o[12] = t12;
          o[13] = t13;
          o[14] = t14;
          o[15] = t15;
        }
        function S(o, a) {
          M(o, a, a);
        }
        function inv25519(o, i) {
          var c = gf();
          var a;
          for (a = 0; a < 16; a++) c[a] = i[a];
          for (a = 253; a >= 0; a--) {
            S(c, c);
            if (a !== 2 && a !== 4) M(c, c, i);
          }
          for (a = 0; a < 16; a++) o[a] = c[a];
        }
        function pow2523(o, i) {
          var c = gf();
          var a;
          for (a = 0; a < 16; a++) c[a] = i[a];
          for (a = 250; a >= 0; a--) {
            S(c, c);
            if (a !== 1) M(c, c, i);
          }
          for (a = 0; a < 16; a++) o[a] = c[a];
        }
        function crypto_scalarmult(q, n, p) {
          var z = new Uint8Array(32);
          var x = new Float64Array(80),
            r,
            i;
          var a = gf(),
            b = gf(),
            c = gf(),
            d = gf(),
            e = gf(),
            f = gf();
          for (i = 0; i < 31; i++) z[i] = n[i];
          z[31] = n[31] & 127 | 64;
          z[0] &= 248;
          unpack25519(x, p);
          for (i = 0; i < 16; i++) {
            b[i] = x[i];
            d[i] = a[i] = c[i] = 0;
          }
          a[0] = d[0] = 1;
          for (i = 254; i >= 0; --i) {
            r = z[i >>> 3] >>> (i & 7) & 1;
            sel25519(a, b, r);
            sel25519(c, d, r);
            A(e, a, c);
            Z(a, a, c);
            A(c, b, d);
            Z(b, b, d);
            S(d, e);
            S(f, a);
            M(a, c, a);
            M(c, b, e);
            A(e, a, c);
            Z(a, a, c);
            S(b, a);
            Z(c, d, f);
            M(a, c, _121665);
            A(a, a, d);
            M(c, c, a);
            M(a, d, f);
            M(d, b, x);
            S(b, e);
            sel25519(a, b, r);
            sel25519(c, d, r);
          }
          for (i = 0; i < 16; i++) {
            x[i + 16] = a[i];
            x[i + 32] = c[i];
            x[i + 48] = b[i];
            x[i + 64] = d[i];
          }
          var x32 = x.subarray(32);
          var x16 = x.subarray(16);
          inv25519(x32, x32);
          M(x16, x16, x32);
          pack25519(q, x16);
          return 0;
        }
        function crypto_scalarmult_base(q, n) {
          return crypto_scalarmult(q, n, _9);
        }
        function crypto_box_keypair(y, x) {
          randombytes(x, 32);
          return crypto_scalarmult_base(y, x);
        }
        function crypto_box_beforenm(k, y, x) {
          var s = new Uint8Array(32);
          crypto_scalarmult(s, x, y);
          return crypto_core_hsalsa20(k, _0, s, sigma);
        }
        var crypto_box_afternm = crypto_secretbox;
        var crypto_box_open_afternm = crypto_secretbox_open;
        function crypto_box(c, m, d, n, y, x) {
          var k = new Uint8Array(32);
          crypto_box_beforenm(k, y, x);
          return crypto_box_afternm(c, m, d, n, k);
        }
        function crypto_box_open(m, c, d, n, y, x) {
          var k = new Uint8Array(32);
          crypto_box_beforenm(k, y, x);
          return crypto_box_open_afternm(m, c, d, n, k);
        }
        var K = [0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd, 0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc, 0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019, 0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118, 0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe, 0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2, 0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1, 0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694, 0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3, 0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65, 0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483, 0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5, 0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210, 0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4, 0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725, 0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70, 0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926, 0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df, 0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8, 0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b, 0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001, 0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30, 0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910, 0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8, 0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53, 0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8, 0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb, 0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3, 0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60, 0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec, 0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9, 0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b, 0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207, 0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178, 0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6, 0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b, 0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493, 0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c, 0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a, 0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817];
        function crypto_hashblocks_hl(hh, hl, m, n) {
          var wh = new Int32Array(16),
            wl = new Int32Array(16),
            bh0,
            bh1,
            bh2,
            bh3,
            bh4,
            bh5,
            bh6,
            bh7,
            bl0,
            bl1,
            bl2,
            bl3,
            bl4,
            bl5,
            bl6,
            bl7,
            th,
            tl,
            i,
            j,
            h,
            l,
            a,
            b,
            c,
            d;
          var ah0 = hh[0],
            ah1 = hh[1],
            ah2 = hh[2],
            ah3 = hh[3],
            ah4 = hh[4],
            ah5 = hh[5],
            ah6 = hh[6],
            ah7 = hh[7],
            al0 = hl[0],
            al1 = hl[1],
            al2 = hl[2],
            al3 = hl[3],
            al4 = hl[4],
            al5 = hl[5],
            al6 = hl[6],
            al7 = hl[7];
          var pos = 0;
          while (n >= 128) {
            for (i = 0; i < 16; i++) {
              j = 8 * i + pos;
              wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
              wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
            }
            for (i = 0; i < 80; i++) {
              bh0 = ah0;
              bh1 = ah1;
              bh2 = ah2;
              bh3 = ah3;
              bh4 = ah4;
              bh5 = ah5;
              bh6 = ah6;
              bh7 = ah7;
              bl0 = al0;
              bl1 = al1;
              bl2 = al2;
              bl3 = al3;
              bl4 = al4;
              bl5 = al5;
              bl6 = al6;
              bl7 = al7;
              h = ah7;
              l = al7;
              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;
              h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
              l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              h = ah4 & ah5 ^ ~ah4 & ah6;
              l = al4 & al5 ^ ~al4 & al6;
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              h = K[i * 2];
              l = K[i * 2 + 1];
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              h = wh[i % 16];
              l = wl[i % 16];
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;
              th = c & 0xffff | d << 16;
              tl = a & 0xffff | b << 16;
              h = th;
              l = tl;
              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;
              h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
              l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
              l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;
              bh7 = c & 0xffff | d << 16;
              bl7 = a & 0xffff | b << 16;
              h = bh3;
              l = bl3;
              a = l & 0xffff;
              b = l >>> 16;
              c = h & 0xffff;
              d = h >>> 16;
              h = th;
              l = tl;
              a += l & 0xffff;
              b += l >>> 16;
              c += h & 0xffff;
              d += h >>> 16;
              b += a >>> 16;
              c += b >>> 16;
              d += c >>> 16;
              bh3 = c & 0xffff | d << 16;
              bl3 = a & 0xffff | b << 16;
              ah1 = bh0;
              ah2 = bh1;
              ah3 = bh2;
              ah4 = bh3;
              ah5 = bh4;
              ah6 = bh5;
              ah7 = bh6;
              ah0 = bh7;
              al1 = bl0;
              al2 = bl1;
              al3 = bl2;
              al4 = bl3;
              al5 = bl4;
              al6 = bl5;
              al7 = bl6;
              al0 = bl7;
              if (i % 16 === 15) {
                for (j = 0; j < 16; j++) {
                  h = wh[j];
                  l = wl[j];
                  a = l & 0xffff;
                  b = l >>> 16;
                  c = h & 0xffff;
                  d = h >>> 16;
                  h = wh[(j + 9) % 16];
                  l = wl[(j + 9) % 16];
                  a += l & 0xffff;
                  b += l >>> 16;
                  c += h & 0xffff;
                  d += h >>> 16;
                  th = wh[(j + 1) % 16];
                  tl = wl[(j + 1) % 16];
                  h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                  l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                  a += l & 0xffff;
                  b += l >>> 16;
                  c += h & 0xffff;
                  d += h >>> 16;
                  th = wh[(j + 14) % 16];
                  tl = wl[(j + 14) % 16];
                  h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                  l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                  a += l & 0xffff;
                  b += l >>> 16;
                  c += h & 0xffff;
                  d += h >>> 16;
                  b += a >>> 16;
                  c += b >>> 16;
                  d += c >>> 16;
                  wh[j] = c & 0xffff | d << 16;
                  wl[j] = a & 0xffff | b << 16;
                }
              }
            }
            h = ah0;
            l = al0;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[0];
            l = hl[0];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[0] = ah0 = c & 0xffff | d << 16;
            hl[0] = al0 = a & 0xffff | b << 16;
            h = ah1;
            l = al1;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[1];
            l = hl[1];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[1] = ah1 = c & 0xffff | d << 16;
            hl[1] = al1 = a & 0xffff | b << 16;
            h = ah2;
            l = al2;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[2];
            l = hl[2];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[2] = ah2 = c & 0xffff | d << 16;
            hl[2] = al2 = a & 0xffff | b << 16;
            h = ah3;
            l = al3;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[3];
            l = hl[3];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[3] = ah3 = c & 0xffff | d << 16;
            hl[3] = al3 = a & 0xffff | b << 16;
            h = ah4;
            l = al4;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[4];
            l = hl[4];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[4] = ah4 = c & 0xffff | d << 16;
            hl[4] = al4 = a & 0xffff | b << 16;
            h = ah5;
            l = al5;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[5];
            l = hl[5];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[5] = ah5 = c & 0xffff | d << 16;
            hl[5] = al5 = a & 0xffff | b << 16;
            h = ah6;
            l = al6;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[6];
            l = hl[6];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[6] = ah6 = c & 0xffff | d << 16;
            hl[6] = al6 = a & 0xffff | b << 16;
            h = ah7;
            l = al7;
            a = l & 0xffff;
            b = l >>> 16;
            c = h & 0xffff;
            d = h >>> 16;
            h = hh[7];
            l = hl[7];
            a += l & 0xffff;
            b += l >>> 16;
            c += h & 0xffff;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            hh[7] = ah7 = c & 0xffff | d << 16;
            hl[7] = al7 = a & 0xffff | b << 16;
            pos += 128;
            n -= 128;
          }
          return n;
        }
        function crypto_hash(out, m, n) {
          var hh = new Int32Array(8),
            hl = new Int32Array(8),
            x = new Uint8Array(256),
            i,
            b = n;
          hh[0] = 0x6a09e667;
          hh[1] = 0xbb67ae85;
          hh[2] = 0x3c6ef372;
          hh[3] = 0xa54ff53a;
          hh[4] = 0x510e527f;
          hh[5] = 0x9b05688c;
          hh[6] = 0x1f83d9ab;
          hh[7] = 0x5be0cd19;
          hl[0] = 0xf3bcc908;
          hl[1] = 0x84caa73b;
          hl[2] = 0xfe94f82b;
          hl[3] = 0x5f1d36f1;
          hl[4] = 0xade682d1;
          hl[5] = 0x2b3e6c1f;
          hl[6] = 0xfb41bd6b;
          hl[7] = 0x137e2179;
          crypto_hashblocks_hl(hh, hl, m, n);
          n %= 128;
          for (i = 0; i < n; i++) x[i] = m[b - n + i];
          x[n] = 128;
          n = 256 - 128 * (n < 112 ? 1 : 0);
          x[n - 9] = 0;
          ts64(x, n - 8, b / 0x20000000 | 0, b << 3);
          crypto_hashblocks_hl(hh, hl, x, n);
          for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
          return 0;
        }
        function add(p, q) {
          var a = gf(),
            b = gf(),
            c = gf(),
            d = gf(),
            e = gf(),
            f = gf(),
            g = gf(),
            h = gf(),
            t = gf();
          Z(a, p[1], p[0]);
          Z(t, q[1], q[0]);
          M(a, a, t);
          A(b, p[0], p[1]);
          A(t, q[0], q[1]);
          M(b, b, t);
          M(c, p[3], q[3]);
          M(c, c, D2);
          M(d, p[2], q[2]);
          A(d, d, d);
          Z(e, b, a);
          Z(f, d, c);
          A(g, d, c);
          A(h, b, a);
          M(p[0], e, f);
          M(p[1], h, g);
          M(p[2], g, f);
          M(p[3], e, h);
        }
        function cswap(p, q, b) {
          var i;
          for (i = 0; i < 4; i++) {
            sel25519(p[i], q[i], b);
          }
        }
        function pack(r, p) {
          var tx = gf(),
            ty = gf(),
            zi = gf();
          inv25519(zi, p[2]);
          M(tx, p[0], zi);
          M(ty, p[1], zi);
          pack25519(r, ty);
          r[31] ^= par25519(tx) << 7;
        }
        function scalarmult(p, q, s) {
          var b, i;
          set25519(p[0], gf0);
          set25519(p[1], gf1);
          set25519(p[2], gf1);
          set25519(p[3], gf0);
          for (i = 255; i >= 0; --i) {
            b = s[i / 8 | 0] >> (i & 7) & 1;
            cswap(p, q, b);
            add(q, p);
            add(p, p);
            cswap(p, q, b);
          }
        }
        function scalarbase(p, s) {
          var q = [gf(), gf(), gf(), gf()];
          set25519(q[0], X);
          set25519(q[1], Y);
          set25519(q[2], gf1);
          M(q[3], X, Y);
          scalarmult(p, q, s);
        }
        function crypto_sign_keypair(pk, sk, seeded) {
          var d = new Uint8Array(64);
          var p = [gf(), gf(), gf(), gf()];
          var i;
          if (!seeded) randombytes(sk, 32);
          crypto_hash(d, sk, 32);
          d[0] &= 248;
          d[31] &= 127;
          d[31] |= 64;
          scalarbase(p, d);
          pack(pk, p);
          for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
          return 0;
        }
        var L = new Float64Array([0xed, 0xd3, 0xf5, 0x5c, 0x1a, 0x63, 0x12, 0x58, 0xd6, 0x9c, 0xf7, 0xa2, 0xde, 0xf9, 0xde, 0x14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x10]);
        function modL(r, x) {
          var carry, i, j, k;
          for (i = 63; i >= 32; --i) {
            carry = 0;
            for (j = i - 32, k = i - 12; j < k; ++j) {
              x[j] += carry - 16 * x[i] * L[j - (i - 32)];
              carry = Math.floor((x[j] + 128) / 256);
              x[j] -= carry * 256;
            }
            x[j] += carry;
            x[i] = 0;
          }
          carry = 0;
          for (j = 0; j < 32; j++) {
            x[j] += carry - (x[31] >> 4) * L[j];
            carry = x[j] >> 8;
            x[j] &= 255;
          }
          for (j = 0; j < 32; j++) x[j] -= carry * L[j];
          for (i = 0; i < 32; i++) {
            x[i + 1] += x[i] >> 8;
            r[i] = x[i] & 255;
          }
        }
        function reduce(r) {
          var x = new Float64Array(64),
            i;
          for (i = 0; i < 64; i++) x[i] = r[i];
          for (i = 0; i < 64; i++) r[i] = 0;
          modL(r, x);
        }
        function crypto_sign(sm, m, n, sk) {
          var d = new Uint8Array(64),
            h = new Uint8Array(64),
            r = new Uint8Array(64);
          var i,
            j,
            x = new Float64Array(64);
          var p = [gf(), gf(), gf(), gf()];
          crypto_hash(d, sk, 32);
          d[0] &= 248;
          d[31] &= 127;
          d[31] |= 64;
          var smlen = n + 64;
          for (i = 0; i < n; i++) sm[64 + i] = m[i];
          for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
          crypto_hash(r, sm.subarray(32), n + 32);
          reduce(r);
          scalarbase(p, r);
          pack(sm, p);
          for (i = 32; i < 64; i++) sm[i] = sk[i];
          crypto_hash(h, sm, n + 64);
          reduce(h);
          for (i = 0; i < 64; i++) x[i] = 0;
          for (i = 0; i < 32; i++) x[i] = r[i];
          for (i = 0; i < 32; i++) {
            for (j = 0; j < 32; j++) {
              x[i + j] += h[i] * d[j];
            }
          }
          modL(sm.subarray(32), x);
          return smlen;
        }
        function unpackneg(r, p) {
          var t = gf(),
            chk = gf(),
            num = gf(),
            den = gf(),
            den2 = gf(),
            den4 = gf(),
            den6 = gf();
          set25519(r[2], gf1);
          unpack25519(r[1], p);
          S(num, r[1]);
          M(den, num, D);
          Z(num, num, r[2]);
          A(den, r[2], den);
          S(den2, den);
          S(den4, den2);
          M(den6, den4, den2);
          M(t, den6, num);
          M(t, t, den);
          pow2523(t, t);
          M(t, t, num);
          M(t, t, den);
          M(t, t, den);
          M(r[0], t, den);
          S(chk, r[0]);
          M(chk, chk, den);
          if (neq25519(chk, num)) M(r[0], r[0], I);
          S(chk, r[0]);
          M(chk, chk, den);
          if (neq25519(chk, num)) return -1;
          if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);
          M(r[3], r[0], r[1]);
          return 0;
        }
        function crypto_sign_open(m, sm, n, pk) {
          var i;
          var t = new Uint8Array(32),
            h = new Uint8Array(64);
          var p = [gf(), gf(), gf(), gf()],
            q = [gf(), gf(), gf(), gf()];
          if (n < 64) return -1;
          if (unpackneg(q, pk)) return -1;
          for (i = 0; i < n; i++) m[i] = sm[i];
          for (i = 0; i < 32; i++) m[i + 32] = pk[i];
          crypto_hash(h, m, n);
          reduce(h);
          scalarmult(p, q, h);
          scalarbase(q, sm.subarray(32));
          add(p, q);
          pack(t, p);
          n -= 64;
          if (crypto_verify_32(sm, 0, t, 0)) {
            for (i = 0; i < n; i++) m[i] = 0;
            return -1;
          }
          for (i = 0; i < n; i++) m[i] = sm[i + 64];
          return n;
        }
        var crypto_secretbox_KEYBYTES = 32,
          crypto_secretbox_NONCEBYTES = 24,
          crypto_secretbox_ZEROBYTES = 32,
          crypto_secretbox_BOXZEROBYTES = 16,
          crypto_scalarmult_BYTES = 32,
          crypto_scalarmult_SCALARBYTES = 32,
          crypto_box_PUBLICKEYBYTES = 32,
          crypto_box_SECRETKEYBYTES = 32,
          crypto_box_BEFORENMBYTES = 32,
          crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES,
          crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES,
          crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES,
          crypto_sign_BYTES = 64,
          crypto_sign_PUBLICKEYBYTES = 32,
          crypto_sign_SECRETKEYBYTES = 64,
          crypto_sign_SEEDBYTES = 32,
          crypto_hash_BYTES = 64;
        nacl.lowlevel = {
          crypto_core_hsalsa20: crypto_core_hsalsa20,
          crypto_stream_xor: crypto_stream_xor,
          crypto_stream: crypto_stream,
          crypto_stream_salsa20_xor: crypto_stream_salsa20_xor,
          crypto_stream_salsa20: crypto_stream_salsa20,
          crypto_onetimeauth: crypto_onetimeauth,
          crypto_onetimeauth_verify: crypto_onetimeauth_verify,
          crypto_verify_16: crypto_verify_16,
          crypto_verify_32: crypto_verify_32,
          crypto_secretbox: crypto_secretbox,
          crypto_secretbox_open: crypto_secretbox_open,
          crypto_scalarmult: crypto_scalarmult,
          crypto_scalarmult_base: crypto_scalarmult_base,
          crypto_box_beforenm: crypto_box_beforenm,
          crypto_box_afternm: crypto_box_afternm,
          crypto_box: crypto_box,
          crypto_box_open: crypto_box_open,
          crypto_box_keypair: crypto_box_keypair,
          crypto_hash: crypto_hash,
          crypto_sign: crypto_sign,
          crypto_sign_keypair: crypto_sign_keypair,
          crypto_sign_open: crypto_sign_open,
          crypto_secretbox_KEYBYTES: crypto_secretbox_KEYBYTES,
          crypto_secretbox_NONCEBYTES: crypto_secretbox_NONCEBYTES,
          crypto_secretbox_ZEROBYTES: crypto_secretbox_ZEROBYTES,
          crypto_secretbox_BOXZEROBYTES: crypto_secretbox_BOXZEROBYTES,
          crypto_scalarmult_BYTES: crypto_scalarmult_BYTES,
          crypto_scalarmult_SCALARBYTES: crypto_scalarmult_SCALARBYTES,
          crypto_box_PUBLICKEYBYTES: crypto_box_PUBLICKEYBYTES,
          crypto_box_SECRETKEYBYTES: crypto_box_SECRETKEYBYTES,
          crypto_box_BEFORENMBYTES: crypto_box_BEFORENMBYTES,
          crypto_box_NONCEBYTES: crypto_box_NONCEBYTES,
          crypto_box_ZEROBYTES: crypto_box_ZEROBYTES,
          crypto_box_BOXZEROBYTES: crypto_box_BOXZEROBYTES,
          crypto_sign_BYTES: crypto_sign_BYTES,
          crypto_sign_PUBLICKEYBYTES: crypto_sign_PUBLICKEYBYTES,
          crypto_sign_SECRETKEYBYTES: crypto_sign_SECRETKEYBYTES,
          crypto_sign_SEEDBYTES: crypto_sign_SEEDBYTES,
          crypto_hash_BYTES: crypto_hash_BYTES,
          gf: gf,
          D: D,
          L: L,
          pack25519: pack25519,
          unpack25519: unpack25519,
          M: M,
          A: A,
          S: S,
          Z: Z,
          pow2523: pow2523,
          add: add,
          set25519: set25519,
          modL: modL,
          scalarmult: scalarmult,
          scalarbase: scalarbase
        };
        function checkLengths(k, n) {
          if (k.length !== crypto_secretbox_KEYBYTES) throw new Error('bad key size');
          if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error('bad nonce size');
        }
        function checkBoxLengths(pk, sk) {
          if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error('bad public key size');
          if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
        }
        function checkArrayTypes() {
          for (var i = 0; i < arguments.length; i++) {
            if (!(arguments[i] instanceof Uint8Array)) throw new TypeError('unexpected type, use Uint8Array');
          }
        }
        function cleanup(arr) {
          for (var i = 0; i < arr.length; i++) arr[i] = 0;
        }
        nacl.randomBytes = function (n) {
          var b = new Uint8Array(n);
          randombytes(b, n);
          return b;
        };
        nacl.secretbox = function (msg, nonce, key) {
          checkArrayTypes(msg, nonce, key);
          checkLengths(key, nonce);
          var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
          var c = new Uint8Array(m.length);
          for (var i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i];
          crypto_secretbox(c, m, m.length, nonce, key);
          return c.subarray(crypto_secretbox_BOXZEROBYTES);
        };
        nacl.secretbox.open = function (box, nonce, key) {
          checkArrayTypes(box, nonce, key);
          checkLengths(key, nonce);
          var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
          var m = new Uint8Array(c.length);
          for (var i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
          if (c.length < 32) return null;
          if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
          return m.subarray(crypto_secretbox_ZEROBYTES);
        };
        nacl.secretbox.keyLength = crypto_secretbox_KEYBYTES;
        nacl.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
        nacl.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
        nacl.scalarMult = function (n, p) {
          checkArrayTypes(n, p);
          if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
          if (p.length !== crypto_scalarmult_BYTES) throw new Error('bad p size');
          var q = new Uint8Array(crypto_scalarmult_BYTES);
          crypto_scalarmult(q, n, p);
          return q;
        };
        nacl.scalarMult.base = function (n) {
          checkArrayTypes(n);
          if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error('bad n size');
          var q = new Uint8Array(crypto_scalarmult_BYTES);
          crypto_scalarmult_base(q, n);
          return q;
        };
        nacl.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
        nacl.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
        nacl.box = function (msg, nonce, publicKey, secretKey) {
          var k = nacl.box.before(publicKey, secretKey);
          return nacl.secretbox(msg, nonce, k);
        };
        nacl.box.before = function (publicKey, secretKey) {
          checkArrayTypes(publicKey, secretKey);
          checkBoxLengths(publicKey, secretKey);
          var k = new Uint8Array(crypto_box_BEFORENMBYTES);
          crypto_box_beforenm(k, publicKey, secretKey);
          return k;
        };
        nacl.box.after = nacl.secretbox;
        nacl.box.open = function (msg, nonce, publicKey, secretKey) {
          var k = nacl.box.before(publicKey, secretKey);
          return nacl.secretbox.open(msg, nonce, k);
        };
        nacl.box.open.after = nacl.secretbox.open;
        nacl.box.keyPair = function () {
          var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
          var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
          crypto_box_keypair(pk, sk);
          return {
            publicKey: pk,
            secretKey: sk
          };
        };
        nacl.box.keyPair.fromSecretKey = function (secretKey) {
          checkArrayTypes(secretKey);
          if (secretKey.length !== crypto_box_SECRETKEYBYTES) throw new Error('bad secret key size');
          var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
          crypto_scalarmult_base(pk, secretKey);
          return {
            publicKey: pk,
            secretKey: new Uint8Array(secretKey)
          };
        };
        nacl.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
        nacl.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
        nacl.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
        nacl.box.nonceLength = crypto_box_NONCEBYTES;
        nacl.box.overheadLength = nacl.secretbox.overheadLength;
        nacl.sign = function (msg, secretKey) {
          checkArrayTypes(msg, secretKey);
          if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error('bad secret key size');
          var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
          crypto_sign(signedMsg, msg, msg.length, secretKey);
          return signedMsg;
        };
        nacl.sign.open = function (signedMsg, publicKey) {
          checkArrayTypes(signedMsg, publicKey);
          if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error('bad public key size');
          var tmp = new Uint8Array(signedMsg.length);
          var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
          if (mlen < 0) return null;
          var m = new Uint8Array(mlen);
          for (var i = 0; i < m.length; i++) m[i] = tmp[i];
          return m;
        };
        nacl.sign.detached = function (msg, secretKey) {
          var signedMsg = nacl.sign(msg, secretKey);
          var sig = new Uint8Array(crypto_sign_BYTES);
          for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
          return sig;
        };
        nacl.sign.detached.verify = function (msg, sig, publicKey) {
          checkArrayTypes(msg, sig, publicKey);
          if (sig.length !== crypto_sign_BYTES) throw new Error('bad signature size');
          if (publicKey.length !== crypto_sign_PUBLICKEYBYTES) throw new Error('bad public key size');
          var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
          var m = new Uint8Array(crypto_sign_BYTES + msg.length);
          var i;
          for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
          for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
          return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
        };
        nacl.sign.keyPair = function () {
          var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
          var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
          crypto_sign_keypair(pk, sk);
          return {
            publicKey: pk,
            secretKey: sk
          };
        };
        nacl.sign.keyPair.fromSecretKey = function (secretKey) {
          checkArrayTypes(secretKey);
          if (secretKey.length !== crypto_sign_SECRETKEYBYTES) throw new Error('bad secret key size');
          var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
          for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
          return {
            publicKey: pk,
            secretKey: new Uint8Array(secretKey)
          };
        };
        nacl.sign.keyPair.fromSeed = function (seed) {
          checkArrayTypes(seed);
          if (seed.length !== crypto_sign_SEEDBYTES) throw new Error('bad seed size');
          var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
          var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
          for (var i = 0; i < 32; i++) sk[i] = seed[i];
          crypto_sign_keypair(pk, sk, true);
          return {
            publicKey: pk,
            secretKey: sk
          };
        };
        nacl.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
        nacl.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
        nacl.sign.seedLength = crypto_sign_SEEDBYTES;
        nacl.sign.signatureLength = crypto_sign_BYTES;
        nacl.hash = function (msg) {
          checkArrayTypes(msg);
          var h = new Uint8Array(crypto_hash_BYTES);
          crypto_hash(h, msg, msg.length);
          return h;
        };
        nacl.hash.hashLength = crypto_hash_BYTES;
        nacl.verify = function (x, y) {
          checkArrayTypes(x, y);
          if (x.length === 0 || y.length === 0) return false;
          if (x.length !== y.length) return false;
          return vn(x, 0, y, 0, x.length) === 0 ? true : false;
        };
        nacl.setPRNG = function (fn) {
          randombytes = fn;
        };
        (function () {
          var crypto = typeof self !== 'undefined' ? self.crypto || self.msCrypto : null;
          if (crypto && crypto.getRandomValues) {
            var QUOTA = 65536;
            nacl.setPRNG(function (x, n) {
              var i,
                v = new Uint8Array(n);
              for (i = 0; i < n; i += QUOTA) {
                crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
              }
              for (i = 0; i < n; i++) x[i] = v[i];
              cleanup(v);
            });
          } else if (typeof require !== 'undefined') {
            crypto = require('crypto');
            if (crypto && crypto.randomBytes) {
              nacl.setPRNG(function (x, n) {
                var i,
                  v = crypto.randomBytes(n);
                for (i = 0; i < n; i++) x[i] = v[i];
                cleanup(v);
              });
            }
          }
        })();
      })(typeof module !== 'undefined' && module.exports ? module.exports : self.nacl = self.nacl || {});
    }, {
      "crypto": 138
    }],
    132: [function (require, module, exports) {
      'use strict';

      module.exports = function (Yallist) {
        Yallist.prototype[Symbol.iterator] = function* () {
          for (let walker = this.head; walker; walker = walker.next) {
            yield walker.value;
          }
        };
      };
    }, {}],
    133: [function (require, module, exports) {
      'use strict';

      module.exports = Yallist;
      Yallist.Node = Node;
      Yallist.create = Yallist;
      function Yallist(list) {
        var self = this;
        if (!(self instanceof Yallist)) {
          self = new Yallist();
        }
        self.tail = null;
        self.head = null;
        self.length = 0;
        if (list && typeof list.forEach === 'function') {
          list.forEach(function (item) {
            self.push(item);
          });
        } else if (arguments.length > 0) {
          for (var i = 0, l = arguments.length; i < l; i++) {
            self.push(arguments[i]);
          }
        }
        return self;
      }
      Yallist.prototype.removeNode = function (node) {
        if (node.list !== this) {
          throw new Error('removing node which does not belong to this list');
        }
        var next = node.next;
        var prev = node.prev;
        if (next) {
          next.prev = prev;
        }
        if (prev) {
          prev.next = next;
        }
        if (node === this.head) {
          this.head = next;
        }
        if (node === this.tail) {
          this.tail = prev;
        }
        node.list.length--;
        node.next = null;
        node.prev = null;
        node.list = null;
        return next;
      };
      Yallist.prototype.unshiftNode = function (node) {
        if (node === this.head) {
          return;
        }
        if (node.list) {
          node.list.removeNode(node);
        }
        var head = this.head;
        node.list = this;
        node.next = head;
        if (head) {
          head.prev = node;
        }
        this.head = node;
        if (!this.tail) {
          this.tail = node;
        }
        this.length++;
      };
      Yallist.prototype.pushNode = function (node) {
        if (node === this.tail) {
          return;
        }
        if (node.list) {
          node.list.removeNode(node);
        }
        var tail = this.tail;
        node.list = this;
        node.prev = tail;
        if (tail) {
          tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
          this.head = node;
        }
        this.length++;
      };
      Yallist.prototype.push = function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
          push(this, arguments[i]);
        }
        return this.length;
      };
      Yallist.prototype.unshift = function () {
        for (var i = 0, l = arguments.length; i < l; i++) {
          unshift(this, arguments[i]);
        }
        return this.length;
      };
      Yallist.prototype.pop = function () {
        if (!this.tail) {
          return undefined;
        }
        var res = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
          this.tail.next = null;
        } else {
          this.head = null;
        }
        this.length--;
        return res;
      };
      Yallist.prototype.shift = function () {
        if (!this.head) {
          return undefined;
        }
        var res = this.head.value;
        this.head = this.head.next;
        if (this.head) {
          this.head.prev = null;
        } else {
          this.tail = null;
        }
        this.length--;
        return res;
      };
      Yallist.prototype.forEach = function (fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.head, i = 0; walker !== null; i++) {
          fn.call(thisp, walker.value, i, this);
          walker = walker.next;
        }
      };
      Yallist.prototype.forEachReverse = function (fn, thisp) {
        thisp = thisp || this;
        for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
          fn.call(thisp, walker.value, i, this);
          walker = walker.prev;
        }
      };
      Yallist.prototype.get = function (n) {
        for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
          walker = walker.next;
        }
        if (i === n && walker !== null) {
          return walker.value;
        }
      };
      Yallist.prototype.getReverse = function (n) {
        for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
          walker = walker.prev;
        }
        if (i === n && walker !== null) {
          return walker.value;
        }
      };
      Yallist.prototype.map = function (fn, thisp) {
        thisp = thisp || this;
        var res = new Yallist();
        for (var walker = this.head; walker !== null;) {
          res.push(fn.call(thisp, walker.value, this));
          walker = walker.next;
        }
        return res;
      };
      Yallist.prototype.mapReverse = function (fn, thisp) {
        thisp = thisp || this;
        var res = new Yallist();
        for (var walker = this.tail; walker !== null;) {
          res.push(fn.call(thisp, walker.value, this));
          walker = walker.prev;
        }
        return res;
      };
      Yallist.prototype.reduce = function (fn, initial) {
        var acc;
        var walker = this.head;
        if (arguments.length > 1) {
          acc = initial;
        } else if (this.head) {
          walker = this.head.next;
          acc = this.head.value;
        } else {
          throw new TypeError('Reduce of empty list with no initial value');
        }
        for (var i = 0; walker !== null; i++) {
          acc = fn(acc, walker.value, i);
          walker = walker.next;
        }
        return acc;
      };
      Yallist.prototype.reduceReverse = function (fn, initial) {
        var acc;
        var walker = this.tail;
        if (arguments.length > 1) {
          acc = initial;
        } else if (this.tail) {
          walker = this.tail.prev;
          acc = this.tail.value;
        } else {
          throw new TypeError('Reduce of empty list with no initial value');
        }
        for (var i = this.length - 1; walker !== null; i--) {
          acc = fn(acc, walker.value, i);
          walker = walker.prev;
        }
        return acc;
      };
      Yallist.prototype.toArray = function () {
        var arr = new Array(this.length);
        for (var i = 0, walker = this.head; walker !== null; i++) {
          arr[i] = walker.value;
          walker = walker.next;
        }
        return arr;
      };
      Yallist.prototype.toArrayReverse = function () {
        var arr = new Array(this.length);
        for (var i = 0, walker = this.tail; walker !== null; i++) {
          arr[i] = walker.value;
          walker = walker.prev;
        }
        return arr;
      };
      Yallist.prototype.slice = function (from, to) {
        to = to || this.length;
        if (to < 0) {
          to += this.length;
        }
        from = from || 0;
        if (from < 0) {
          from += this.length;
        }
        var ret = new Yallist();
        if (to < from || to < 0) {
          return ret;
        }
        if (from < 0) {
          from = 0;
        }
        if (to > this.length) {
          to = this.length;
        }
        for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
          walker = walker.next;
        }
        for (; walker !== null && i < to; i++, walker = walker.next) {
          ret.push(walker.value);
        }
        return ret;
      };
      Yallist.prototype.sliceReverse = function (from, to) {
        to = to || this.length;
        if (to < 0) {
          to += this.length;
        }
        from = from || 0;
        if (from < 0) {
          from += this.length;
        }
        var ret = new Yallist();
        if (to < from || to < 0) {
          return ret;
        }
        if (from < 0) {
          from = 0;
        }
        if (to > this.length) {
          to = this.length;
        }
        for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
          walker = walker.prev;
        }
        for (; walker !== null && i > from; i--, walker = walker.prev) {
          ret.push(walker.value);
        }
        return ret;
      };
      Yallist.prototype.splice = function (start, deleteCount, ...nodes) {
        if (start > this.length) {
          start = this.length - 1;
        }
        if (start < 0) {
          start = this.length + start;
        }
        for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
          walker = walker.next;
        }
        var ret = [];
        for (var i = 0; walker && i < deleteCount; i++) {
          ret.push(walker.value);
          walker = this.removeNode(walker);
        }
        if (walker === null) {
          walker = this.tail;
        }
        if (walker !== this.head && walker !== this.tail) {
          walker = walker.prev;
        }
        for (var i = 0; i < nodes.length; i++) {
          walker = insert(this, walker, nodes[i]);
        }
        return ret;
      };
      Yallist.prototype.reverse = function () {
        var head = this.head;
        var tail = this.tail;
        for (var walker = head; walker !== null; walker = walker.prev) {
          var p = walker.prev;
          walker.prev = walker.next;
          walker.next = p;
        }
        this.head = tail;
        this.tail = head;
        return this;
      };
      function insert(self, node, value) {
        var inserted = node === self.head ? new Node(value, null, node, self) : new Node(value, node, node.next, self);
        if (inserted.next === null) {
          self.tail = inserted;
        }
        if (inserted.prev === null) {
          self.head = inserted;
        }
        self.length++;
        return inserted;
      }
      function push(self, item) {
        self.tail = new Node(item, self.tail, null, self);
        if (!self.head) {
          self.head = self.tail;
        }
        self.length++;
      }
      function unshift(self, item) {
        self.head = new Node(item, null, self.head, self);
        if (!self.tail) {
          self.tail = self.head;
        }
        self.length++;
      }
      function Node(value, prev, next, list) {
        if (!(this instanceof Node)) {
          return new Node(value, prev, next, list);
        }
        this.list = list;
        this.value = value;
        if (prev) {
          prev.next = this;
          this.prev = prev;
        } else {
          this.prev = null;
        }
        if (next) {
          next.prev = this;
          this.next = next;
        } else {
          this.next = null;
        }
      }
      try {
        require('./iterator.js')(Yallist);
      } catch (er) {}
    }, {
      "./iterator.js": 132
    }],
    134: [function (require, module, exports) {
      "use strict";

      var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
      var _tweetnacl = _interopRequireDefault(require("tweetnacl"));
      var _bs = _interopRequireDefault(require("bs58"));
      var _snapsUi = require("@metamask/snaps-ui");
      var _privateKey = require("./privateKey");
      var _utils = require("./utils");
      module.exports.onRpcRequest = async ({
        origin,
        request
      }) => {
        switch (request.method) {
          case 'getPublicKey':
            {
              const [path, confirm = false] = request.params || [];
              (0, _utils.assertInput)(path);
              if (confirm) {
                const accepted = await snap.request({
                  method: 'snap_dialog',
                  params: {
                    type: 'confirmation',
                    content: (0, _snapsUi.panel)([(0, _snapsUi.heading)('Confirm access'), (0, _snapsUi.text)(`${origin} wants to know your Solana address`)])
                  }
                });
                (0, _utils.assertConfirmation)(accepted);
              }
              const keyPair = await (0, _privateKey.deriveKeyPair)(path);
              return _bs.default.encode(keyPair.publicKey);
            }
          case 'signTransaction':
            {
              const [path, message] = request.params || [];
              (0, _utils.assertInput)(path);
              (0, _utils.assertInput)(message);
              const accepted = await snap.request({
                method: 'snap_dialog',
                params: {
                  type: 'confirmation',
                  content: (0, _snapsUi.panel)([(0, _snapsUi.heading)('Sign transaction'), (0, _snapsUi.text)(`${origin} is requesting to sign the following transaction`), (0, _snapsUi.copyable)(message)])
                }
              });
              (0, _utils.assertConfirmation)(accepted);
              const keyPair = await (0, _privateKey.deriveKeyPair)(path);
              const signature = _tweetnacl.default.sign.detached(_bs.default.decode(message), keyPair.secretKey);
              return {
                publicKey: _bs.default.encode(keyPair.publicKey),
                signature: _bs.default.encode(signature)
              };
            }
          case 'signAllTransactions':
            {
              const [path, messages] = request.params || [];
              (0, _utils.assertInput)(path);
              (0, _utils.assertInput)(messages);
              (0, _utils.assertInput)(messages.length);
              const keyPair = await (0, _privateKey.deriveKeyPair)(path);
              const uiElements = [];
              for (let i = 0; i < (messages === null || messages === void 0 ? void 0 : messages.length); i++) {
                uiElements.push((0, _snapsUi.divider)());
                uiElements.push((0, _snapsUi.text)(`Transaction ${i + 1}`));
                uiElements.push((0, _snapsUi.copyable)(messages === null || messages === void 0 ? void 0 : messages[i]));
              }
              const accepted = await snap.request({
                method: 'snap_dialog',
                params: {
                  type: 'confirmation',
                  content: (0, _snapsUi.panel)([(0, _snapsUi.heading)('Sign transactions'), (0, _snapsUi.text)(`${origin} is requesting to sign the following transactions`), ...uiElements])
                }
              });
              (0, _utils.assertConfirmation)(accepted);
              const signatures = messages.map(message => _bs.default.decode(message)).map(message => _tweetnacl.default.sign.detached(message, keyPair.secretKey)).map(signature => _bs.default.encode(signature));
              return {
                publicKey: _bs.default.encode(keyPair.publicKey),
                signatures
              };
            }
          case 'signMessage':
            {
              const [path, message, display = 'utf8'] = request.params || [];
              (0, _utils.assertInput)(path);
              (0, _utils.assertInput)(message);
              const keyPair = await (0, _privateKey.deriveKeyPair)(path);
              const messageBytes = _bs.default.decode(message);
              let decodedMessage = '';
              if (display.toLowerCase() === 'utf8') {
                decodedMessage = new TextDecoder().decode(messageBytes);
              } else if (display.toLowerCase() === 'hex') {
                decodedMessage = `0x${Array.prototype.map.call(messageBytes, x => `00${x.toString(16)}`.slice(-2)).join('')}`;
              } else {
                decodedMessage = 'Unable to decode message';
              }
              const accepted = await snap.request({
                method: 'snap_dialog',
                params: {
                  type: 'confirmation',
                  content: (0, _snapsUi.panel)([(0, _snapsUi.heading)('Sign message'), (0, _snapsUi.text)(`${origin} is requesting to sign the following message`), (0, _snapsUi.copyable)(decodedMessage)])
                }
              });
              (0, _utils.assertConfirmation)(accepted);
              const signature = _tweetnacl.default.sign.detached(messageBytes, keyPair.secretKey);
              return {
                publicKey: _bs.default.encode(keyPair.publicKey),
                signature: _bs.default.encode(signature)
              };
            }
          default:
            throw {
              code: 4200,
              message: 'The requested method is not supported.'
            };
        }
      };
    }, {
      "./privateKey": 135,
      "./utils": 136,
      "@babel/runtime/helpers/interopRequireDefault": 1,
      "@metamask/snaps-ui": 31,
      "bs58": 81,
      "tweetnacl": 131
    }],
    135: [function (require, module, exports) {
      "use strict";

      var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.deriveKeyPair = deriveKeyPair;
      var _tweetnacl = _interopRequireDefault(require("tweetnacl"));
      var _keyTree = require("@metamask/key-tree");
      async function deriveKeyPair(path = '') {
        if (!path.startsWith(`m/44'/501'`)) {
          throw {
            code: 4001,
            message: 'Invalid derivation path'
          };
        }
        const rootNode = await snap.request({
          method: 'snap_getBip32Entropy',
          params: {
            path: [`m`, `44'`, `501'`],
            curve: 'secp256k1'
          }
        });
        const segments = path.split('/').slice(3).filter(Boolean);
        const node = await _keyTree.SLIP10Node.fromJSON(rootNode);
        const keypair = await node.derive(segments.map(segment => `slip10:${segment}`));
        return _tweetnacl.default.sign.keyPair.fromSeed(Uint8Array.from(keypair.privateKeyBytes));
      }
    }, {
      "@babel/runtime/helpers/interopRequireDefault": 1,
      "@metamask/key-tree": 17,
      "tweetnacl": 131
    }],
    136: [function (require, module, exports) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.assertConfirmation = assertConfirmation;
      exports.assertInput = assertInput;
      function assertInput(path) {
        if (!path) {
          throw {
            code: -32000,
            message: 'Invalid input.'
          };
        }
      }
      function assertConfirmation(confirmed) {
        if (!confirmed) {
          throw {
            code: 4001,
            message: 'User rejected the request.'
          };
        }
      }
    }, {}],
    137: [function (require, module, exports) {
      'use strict';

      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
      var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      for (var i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      revLookup['-'.charCodeAt(0)] = 62;
      revLookup['_'.charCodeAt(0)] = 63;
      function getLens(b64) {
        var len = b64.length;
        if (len % 4 > 0) {
          throw new Error('Invalid string. Length must be a multiple of 4');
        }
        var validLen = b64.indexOf('=');
        if (validLen === -1) validLen = len;
        var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i;
        for (i = 0; i < len; i += 4) {
          tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
          arr[curByte++] = tmp >> 16 & 0xFF;
          arr[curByte++] = tmp >> 8 & 0xFF;
          arr[curByte++] = tmp & 0xFF;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
          arr[curByte++] = tmp & 0xFF;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 0xFF;
          arr[curByte++] = tmp & 0xFF;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i = start; i < end; i += 3) {
          tmp = (uint8[i] << 16 & 0xFF0000) + (uint8[i + 1] << 8 & 0xFF00) + (uint8[i + 2] & 0xFF);
          output.push(tripletToBase64(tmp));
        }
        return output.join('');
      }
      function fromByteArray(uint8) {
        var tmp;
        var len = uint8.length;
        var extraBytes = len % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
          parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len - 1];
          parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 0x3F] + '==');
        } else if (extraBytes === 2) {
          tmp = (uint8[len - 2] << 8) + uint8[len - 1];
          parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 0x3F] + lookup[tmp << 2 & 0x3F] + '=');
        }
        return parts.join('');
      }
    }, {}],
    138: [function (require, module, exports) {}, {}],
    139: [function (require, module, exports) {
      (function () {
        (function () {
          'use strict';

          var base64 = require('base64-js');
          var ieee754 = require('ieee754');
          exports.Buffer = Buffer;
          exports.SlowBuffer = SlowBuffer;
          exports.INSPECT_MAX_BYTES = 50;
          var K_MAX_LENGTH = 0x7fffffff;
          exports.kMaxLength = K_MAX_LENGTH;
          Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
          if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' && typeof console.error === 'function') {
            console.error('This browser lacks typed array (Uint8Array) support which is required by ' + '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.');
          }
          function typedArraySupport() {
            try {
              var arr = new Uint8Array(1);
              arr.__proto__ = {
                __proto__: Uint8Array.prototype,
                foo: function () {
                  return 42;
                }
              };
              return arr.foo() === 42;
            } catch (e) {
              return false;
            }
          }
          Object.defineProperty(Buffer.prototype, 'parent', {
            enumerable: true,
            get: function () {
              if (!Buffer.isBuffer(this)) return undefined;
              return this.buffer;
            }
          });
          Object.defineProperty(Buffer.prototype, 'offset', {
            enumerable: true,
            get: function () {
              if (!Buffer.isBuffer(this)) return undefined;
              return this.byteOffset;
            }
          });
          function createBuffer(length) {
            if (length > K_MAX_LENGTH) {
              throw new RangeError('The value "' + length + '" is invalid for option "size"');
            }
            var buf = new Uint8Array(length);
            buf.__proto__ = Buffer.prototype;
            return buf;
          }
          function Buffer(arg, encodingOrOffset, length) {
            if (typeof arg === 'number') {
              if (typeof encodingOrOffset === 'string') {
                throw new TypeError('The "string" argument must be of type string. Received type number');
              }
              return allocUnsafe(arg);
            }
            return from(arg, encodingOrOffset, length);
          }
          if (typeof Symbol !== 'undefined' && Symbol.species != null && Buffer[Symbol.species] === Buffer) {
            Object.defineProperty(Buffer, Symbol.species, {
              value: null,
              configurable: true,
              enumerable: false,
              writable: false
            });
          }
          Buffer.poolSize = 8192;
          function from(value, encodingOrOffset, length) {
            if (typeof value === 'string') {
              return fromString(value, encodingOrOffset);
            }
            if (ArrayBuffer.isView(value)) {
              return fromArrayLike(value);
            }
            if (value == null) {
              throw TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
            }
            if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
              return fromArrayBuffer(value, encodingOrOffset, length);
            }
            if (typeof value === 'number') {
              throw new TypeError('The "value" argument must not be of type number. Received type number');
            }
            var valueOf = value.valueOf && value.valueOf();
            if (valueOf != null && valueOf !== value) {
              return Buffer.from(valueOf, encodingOrOffset, length);
            }
            var b = fromObject(value);
            if (b) return b;
            if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === 'function') {
              return Buffer.from(value[Symbol.toPrimitive]('string'), encodingOrOffset, length);
            }
            throw new TypeError('The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' + 'or Array-like Object. Received type ' + typeof value);
          }
          Buffer.from = function (value, encodingOrOffset, length) {
            return from(value, encodingOrOffset, length);
          };
          Buffer.prototype.__proto__ = Uint8Array.prototype;
          Buffer.__proto__ = Uint8Array;
          function assertSize(size) {
            if (typeof size !== 'number') {
              throw new TypeError('"size" argument must be of type number');
            } else if (size < 0) {
              throw new RangeError('The value "' + size + '" is invalid for option "size"');
            }
          }
          function alloc(size, fill, encoding) {
            assertSize(size);
            if (size <= 0) {
              return createBuffer(size);
            }
            if (fill !== undefined) {
              return typeof encoding === 'string' ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
            }
            return createBuffer(size);
          }
          Buffer.alloc = function (size, fill, encoding) {
            return alloc(size, fill, encoding);
          };
          function allocUnsafe(size) {
            assertSize(size);
            return createBuffer(size < 0 ? 0 : checked(size) | 0);
          }
          Buffer.allocUnsafe = function (size) {
            return allocUnsafe(size);
          };
          Buffer.allocUnsafeSlow = function (size) {
            return allocUnsafe(size);
          };
          function fromString(string, encoding) {
            if (typeof encoding !== 'string' || encoding === '') {
              encoding = 'utf8';
            }
            if (!Buffer.isEncoding(encoding)) {
              throw new TypeError('Unknown encoding: ' + encoding);
            }
            var length = byteLength(string, encoding) | 0;
            var buf = createBuffer(length);
            var actual = buf.write(string, encoding);
            if (actual !== length) {
              buf = buf.slice(0, actual);
            }
            return buf;
          }
          function fromArrayLike(array) {
            var length = array.length < 0 ? 0 : checked(array.length) | 0;
            var buf = createBuffer(length);
            for (var i = 0; i < length; i += 1) {
              buf[i] = array[i] & 255;
            }
            return buf;
          }
          function fromArrayBuffer(array, byteOffset, length) {
            if (byteOffset < 0 || array.byteLength < byteOffset) {
              throw new RangeError('"offset" is outside of buffer bounds');
            }
            if (array.byteLength < byteOffset + (length || 0)) {
              throw new RangeError('"length" is outside of buffer bounds');
            }
            var buf;
            if (byteOffset === undefined && length === undefined) {
              buf = new Uint8Array(array);
            } else if (length === undefined) {
              buf = new Uint8Array(array, byteOffset);
            } else {
              buf = new Uint8Array(array, byteOffset, length);
            }
            buf.__proto__ = Buffer.prototype;
            return buf;
          }
          function fromObject(obj) {
            if (Buffer.isBuffer(obj)) {
              var len = checked(obj.length) | 0;
              var buf = createBuffer(len);
              if (buf.length === 0) {
                return buf;
              }
              obj.copy(buf, 0, 0, len);
              return buf;
            }
            if (obj.length !== undefined) {
              if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
                return createBuffer(0);
              }
              return fromArrayLike(obj);
            }
            if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
              return fromArrayLike(obj.data);
            }
          }
          function checked(length) {
            if (length >= K_MAX_LENGTH) {
              throw new RangeError('Attempt to allocate Buffer larger than maximum ' + 'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes');
            }
            return length | 0;
          }
          function SlowBuffer(length) {
            if (+length != length) {
              length = 0;
            }
            return Buffer.alloc(+length);
          }
          Buffer.isBuffer = function isBuffer(b) {
            return b != null && b._isBuffer === true && b !== Buffer.prototype;
          };
          Buffer.compare = function compare(a, b) {
            if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
            if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
            if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
              throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
            }
            if (a === b) return 0;
            var x = a.length;
            var y = b.length;
            for (var i = 0, len = Math.min(x, y); i < len; ++i) {
              if (a[i] !== b[i]) {
                x = a[i];
                y = b[i];
                break;
              }
            }
            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };
          Buffer.isEncoding = function isEncoding(encoding) {
            switch (String(encoding).toLowerCase()) {
              case 'hex':
              case 'utf8':
              case 'utf-8':
              case 'ascii':
              case 'latin1':
              case 'binary':
              case 'base64':
              case 'ucs2':
              case 'ucs-2':
              case 'utf16le':
              case 'utf-16le':
                return true;
              default:
                return false;
            }
          };
          Buffer.concat = function concat(list, length) {
            if (!Array.isArray(list)) {
              throw new TypeError('"list" argument must be an Array of Buffers');
            }
            if (list.length === 0) {
              return Buffer.alloc(0);
            }
            var i;
            if (length === undefined) {
              length = 0;
              for (i = 0; i < list.length; ++i) {
                length += list[i].length;
              }
            }
            var buffer = Buffer.allocUnsafe(length);
            var pos = 0;
            for (i = 0; i < list.length; ++i) {
              var buf = list[i];
              if (isInstance(buf, Uint8Array)) {
                buf = Buffer.from(buf);
              }
              if (!Buffer.isBuffer(buf)) {
                throw new TypeError('"list" argument must be an Array of Buffers');
              }
              buf.copy(buffer, pos);
              pos += buf.length;
            }
            return buffer;
          };
          function byteLength(string, encoding) {
            if (Buffer.isBuffer(string)) {
              return string.length;
            }
            if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
              return string.byteLength;
            }
            if (typeof string !== 'string') {
              throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' + 'Received type ' + typeof string);
            }
            var len = string.length;
            var mustMatch = arguments.length > 2 && arguments[2] === true;
            if (!mustMatch && len === 0) return 0;
            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case 'ascii':
                case 'latin1':
                case 'binary':
                  return len;
                case 'utf8':
                case 'utf-8':
                  return utf8ToBytes(string).length;
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return len * 2;
                case 'hex':
                  return len >>> 1;
                case 'base64':
                  return base64ToBytes(string).length;
                default:
                  if (loweredCase) {
                    return mustMatch ? -1 : utf8ToBytes(string).length;
                  }
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.byteLength = byteLength;
          function slowToString(encoding, start, end) {
            var loweredCase = false;
            if (start === undefined || start < 0) {
              start = 0;
            }
            if (start > this.length) {
              return '';
            }
            if (end === undefined || end > this.length) {
              end = this.length;
            }
            if (end <= 0) {
              return '';
            }
            end >>>= 0;
            start >>>= 0;
            if (end <= start) {
              return '';
            }
            if (!encoding) encoding = 'utf8';
            while (true) {
              switch (encoding) {
                case 'hex':
                  return hexSlice(this, start, end);
                case 'utf8':
                case 'utf-8':
                  return utf8Slice(this, start, end);
                case 'ascii':
                  return asciiSlice(this, start, end);
                case 'latin1':
                case 'binary':
                  return latin1Slice(this, start, end);
                case 'base64':
                  return base64Slice(this, start, end);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return utf16leSlice(this, start, end);
                default:
                  if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = (encoding + '').toLowerCase();
                  loweredCase = true;
              }
            }
          }
          Buffer.prototype._isBuffer = true;
          function swap(b, n, m) {
            var i = b[n];
            b[n] = b[m];
            b[m] = i;
          }
          Buffer.prototype.swap16 = function swap16() {
            var len = this.length;
            if (len % 2 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 16-bits');
            }
            for (var i = 0; i < len; i += 2) {
              swap(this, i, i + 1);
            }
            return this;
          };
          Buffer.prototype.swap32 = function swap32() {
            var len = this.length;
            if (len % 4 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 32-bits');
            }
            for (var i = 0; i < len; i += 4) {
              swap(this, i, i + 3);
              swap(this, i + 1, i + 2);
            }
            return this;
          };
          Buffer.prototype.swap64 = function swap64() {
            var len = this.length;
            if (len % 8 !== 0) {
              throw new RangeError('Buffer size must be a multiple of 64-bits');
            }
            for (var i = 0; i < len; i += 8) {
              swap(this, i, i + 7);
              swap(this, i + 1, i + 6);
              swap(this, i + 2, i + 5);
              swap(this, i + 3, i + 4);
            }
            return this;
          };
          Buffer.prototype.toString = function toString() {
            var length = this.length;
            if (length === 0) return '';
            if (arguments.length === 0) return utf8Slice(this, 0, length);
            return slowToString.apply(this, arguments);
          };
          Buffer.prototype.toLocaleString = Buffer.prototype.toString;
          Buffer.prototype.equals = function equals(b) {
            if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer');
            if (this === b) return true;
            return Buffer.compare(this, b) === 0;
          };
          Buffer.prototype.inspect = function inspect() {
            var str = '';
            var max = exports.INSPECT_MAX_BYTES;
            str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
            if (this.length > max) str += ' ... ';
            return '<Buffer ' + str + '>';
          };
          Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
            if (isInstance(target, Uint8Array)) {
              target = Buffer.from(target, target.offset, target.byteLength);
            }
            if (!Buffer.isBuffer(target)) {
              throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. ' + 'Received type ' + typeof target);
            }
            if (start === undefined) {
              start = 0;
            }
            if (end === undefined) {
              end = target ? target.length : 0;
            }
            if (thisStart === undefined) {
              thisStart = 0;
            }
            if (thisEnd === undefined) {
              thisEnd = this.length;
            }
            if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
              throw new RangeError('out of range index');
            }
            if (thisStart >= thisEnd && start >= end) {
              return 0;
            }
            if (thisStart >= thisEnd) {
              return -1;
            }
            if (start >= end) {
              return 1;
            }
            start >>>= 0;
            end >>>= 0;
            thisStart >>>= 0;
            thisEnd >>>= 0;
            if (this === target) return 0;
            var x = thisEnd - thisStart;
            var y = end - start;
            var len = Math.min(x, y);
            var thisCopy = this.slice(thisStart, thisEnd);
            var targetCopy = target.slice(start, end);
            for (var i = 0; i < len; ++i) {
              if (thisCopy[i] !== targetCopy[i]) {
                x = thisCopy[i];
                y = targetCopy[i];
                break;
              }
            }
            if (x < y) return -1;
            if (y < x) return 1;
            return 0;
          };
          function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
            if (buffer.length === 0) return -1;
            if (typeof byteOffset === 'string') {
              encoding = byteOffset;
              byteOffset = 0;
            } else if (byteOffset > 0x7fffffff) {
              byteOffset = 0x7fffffff;
            } else if (byteOffset < -0x80000000) {
              byteOffset = -0x80000000;
            }
            byteOffset = +byteOffset;
            if (numberIsNaN(byteOffset)) {
              byteOffset = dir ? 0 : buffer.length - 1;
            }
            if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
            if (byteOffset >= buffer.length) {
              if (dir) return -1;else byteOffset = buffer.length - 1;
            } else if (byteOffset < 0) {
              if (dir) byteOffset = 0;else return -1;
            }
            if (typeof val === 'string') {
              val = Buffer.from(val, encoding);
            }
            if (Buffer.isBuffer(val)) {
              if (val.length === 0) {
                return -1;
              }
              return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
            } else if (typeof val === 'number') {
              val = val & 0xFF;
              if (typeof Uint8Array.prototype.indexOf === 'function') {
                if (dir) {
                  return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
                } else {
                  return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
                }
              }
              return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
            }
            throw new TypeError('val must be string, number or Buffer');
          }
          function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
            var indexSize = 1;
            var arrLength = arr.length;
            var valLength = val.length;
            if (encoding !== undefined) {
              encoding = String(encoding).toLowerCase();
              if (encoding === 'ucs2' || encoding === 'ucs-2' || encoding === 'utf16le' || encoding === 'utf-16le') {
                if (arr.length < 2 || val.length < 2) {
                  return -1;
                }
                indexSize = 2;
                arrLength /= 2;
                valLength /= 2;
                byteOffset /= 2;
              }
            }
            function read(buf, i) {
              if (indexSize === 1) {
                return buf[i];
              } else {
                return buf.readUInt16BE(i * indexSize);
              }
            }
            var i;
            if (dir) {
              var foundIndex = -1;
              for (i = byteOffset; i < arrLength; i++) {
                if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                  if (foundIndex === -1) foundIndex = i;
                  if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
                } else {
                  if (foundIndex !== -1) i -= i - foundIndex;
                  foundIndex = -1;
                }
              }
            } else {
              if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
              for (i = byteOffset; i >= 0; i--) {
                var found = true;
                for (var j = 0; j < valLength; j++) {
                  if (read(arr, i + j) !== read(val, j)) {
                    found = false;
                    break;
                  }
                }
                if (found) return i;
              }
            }
            return -1;
          }
          Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
            return this.indexOf(val, byteOffset, encoding) !== -1;
          };
          Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
          };
          Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
            return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
          };
          function hexWrite(buf, string, offset, length) {
            offset = Number(offset) || 0;
            var remaining = buf.length - offset;
            if (!length) {
              length = remaining;
            } else {
              length = Number(length);
              if (length > remaining) {
                length = remaining;
              }
            }
            var strLen = string.length;
            if (length > strLen / 2) {
              length = strLen / 2;
            }
            for (var i = 0; i < length; ++i) {
              var parsed = parseInt(string.substr(i * 2, 2), 16);
              if (numberIsNaN(parsed)) return i;
              buf[offset + i] = parsed;
            }
            return i;
          }
          function utf8Write(buf, string, offset, length) {
            return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
          }
          function asciiWrite(buf, string, offset, length) {
            return blitBuffer(asciiToBytes(string), buf, offset, length);
          }
          function latin1Write(buf, string, offset, length) {
            return asciiWrite(buf, string, offset, length);
          }
          function base64Write(buf, string, offset, length) {
            return blitBuffer(base64ToBytes(string), buf, offset, length);
          }
          function ucs2Write(buf, string, offset, length) {
            return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
          }
          Buffer.prototype.write = function write(string, offset, length, encoding) {
            if (offset === undefined) {
              encoding = 'utf8';
              length = this.length;
              offset = 0;
            } else if (length === undefined && typeof offset === 'string') {
              encoding = offset;
              length = this.length;
              offset = 0;
            } else if (isFinite(offset)) {
              offset = offset >>> 0;
              if (isFinite(length)) {
                length = length >>> 0;
                if (encoding === undefined) encoding = 'utf8';
              } else {
                encoding = length;
                length = undefined;
              }
            } else {
              throw new Error('Buffer.write(string, encoding, offset[, length]) is no longer supported');
            }
            var remaining = this.length - offset;
            if (length === undefined || length > remaining) length = remaining;
            if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
              throw new RangeError('Attempt to write outside buffer bounds');
            }
            if (!encoding) encoding = 'utf8';
            var loweredCase = false;
            for (;;) {
              switch (encoding) {
                case 'hex':
                  return hexWrite(this, string, offset, length);
                case 'utf8':
                case 'utf-8':
                  return utf8Write(this, string, offset, length);
                case 'ascii':
                  return asciiWrite(this, string, offset, length);
                case 'latin1':
                case 'binary':
                  return latin1Write(this, string, offset, length);
                case 'base64':
                  return base64Write(this, string, offset, length);
                case 'ucs2':
                case 'ucs-2':
                case 'utf16le':
                case 'utf-16le':
                  return ucs2Write(this, string, offset, length);
                default:
                  if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding);
                  encoding = ('' + encoding).toLowerCase();
                  loweredCase = true;
              }
            }
          };
          Buffer.prototype.toJSON = function toJSON() {
            return {
              type: 'Buffer',
              data: Array.prototype.slice.call(this._arr || this, 0)
            };
          };
          function base64Slice(buf, start, end) {
            if (start === 0 && end === buf.length) {
              return base64.fromByteArray(buf);
            } else {
              return base64.fromByteArray(buf.slice(start, end));
            }
          }
          function utf8Slice(buf, start, end) {
            end = Math.min(buf.length, end);
            var res = [];
            var i = start;
            while (i < end) {
              var firstByte = buf[i];
              var codePoint = null;
              var bytesPerSequence = firstByte > 0xEF ? 4 : firstByte > 0xDF ? 3 : firstByte > 0xBF ? 2 : 1;
              if (i + bytesPerSequence <= end) {
                var secondByte, thirdByte, fourthByte, tempCodePoint;
                switch (bytesPerSequence) {
                  case 1:
                    if (firstByte < 0x80) {
                      codePoint = firstByte;
                    }
                    break;
                  case 2:
                    secondByte = buf[i + 1];
                    if ((secondByte & 0xC0) === 0x80) {
                      tempCodePoint = (firstByte & 0x1F) << 0x6 | secondByte & 0x3F;
                      if (tempCodePoint > 0x7F) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 3:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
                      tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | thirdByte & 0x3F;
                      if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
                        codePoint = tempCodePoint;
                      }
                    }
                    break;
                  case 4:
                    secondByte = buf[i + 1];
                    thirdByte = buf[i + 2];
                    fourthByte = buf[i + 3];
                    if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
                      tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | fourthByte & 0x3F;
                      if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
                        codePoint = tempCodePoint;
                      }
                    }
                }
              }
              if (codePoint === null) {
                codePoint = 0xFFFD;
                bytesPerSequence = 1;
              } else if (codePoint > 0xFFFF) {
                codePoint -= 0x10000;
                res.push(codePoint >>> 10 & 0x3FF | 0xD800);
                codePoint = 0xDC00 | codePoint & 0x3FF;
              }
              res.push(codePoint);
              i += bytesPerSequence;
            }
            return decodeCodePointsArray(res);
          }
          var MAX_ARGUMENTS_LENGTH = 0x1000;
          function decodeCodePointsArray(codePoints) {
            var len = codePoints.length;
            if (len <= MAX_ARGUMENTS_LENGTH) {
              return String.fromCharCode.apply(String, codePoints);
            }
            var res = '';
            var i = 0;
            while (i < len) {
              res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
            }
            return res;
          }
          function asciiSlice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);
            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i] & 0x7F);
            }
            return ret;
          }
          function latin1Slice(buf, start, end) {
            var ret = '';
            end = Math.min(buf.length, end);
            for (var i = start; i < end; ++i) {
              ret += String.fromCharCode(buf[i]);
            }
            return ret;
          }
          function hexSlice(buf, start, end) {
            var len = buf.length;
            if (!start || start < 0) start = 0;
            if (!end || end < 0 || end > len) end = len;
            var out = '';
            for (var i = start; i < end; ++i) {
              out += toHex(buf[i]);
            }
            return out;
          }
          function utf16leSlice(buf, start, end) {
            var bytes = buf.slice(start, end);
            var res = '';
            for (var i = 0; i < bytes.length; i += 2) {
              res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
            }
            return res;
          }
          Buffer.prototype.slice = function slice(start, end) {
            var len = this.length;
            start = ~~start;
            end = end === undefined ? len : ~~end;
            if (start < 0) {
              start += len;
              if (start < 0) start = 0;
            } else if (start > len) {
              start = len;
            }
            if (end < 0) {
              end += len;
              if (end < 0) end = 0;
            } else if (end > len) {
              end = len;
            }
            if (end < start) end = start;
            var newBuf = this.subarray(start, end);
            newBuf.__proto__ = Buffer.prototype;
            return newBuf;
          };
          function checkOffset(offset, ext, length) {
            if (offset % 1 !== 0 || offset < 0) throw new RangeError('offset is not uint');
            if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length');
          }
          Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }
            return val;
          };
          Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              checkOffset(offset, byteLength, this.length);
            }
            var val = this[offset + --byteLength];
            var mul = 1;
            while (byteLength > 0 && (mul *= 0x100)) {
              val += this[offset + --byteLength] * mul;
            }
            return val;
          };
          Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            return this[offset];
          };
          Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] | this[offset + 1] << 8;
          };
          Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            return this[offset] << 8 | this[offset + 1];
          };
          Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 0x1000000;
          };
          Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] * 0x1000000 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
          };
          Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var val = this[offset];
            var mul = 1;
            var i = 0;
            while (++i < byteLength && (mul *= 0x100)) {
              val += this[offset + i] * mul;
            }
            mul *= 0x80;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength);
            return val;
          };
          Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) checkOffset(offset, byteLength, this.length);
            var i = byteLength;
            var mul = 1;
            var val = this[offset + --i];
            while (i > 0 && (mul *= 0x100)) {
              val += this[offset + --i] * mul;
            }
            mul *= 0x80;
            if (val >= mul) val -= Math.pow(2, 8 * byteLength);
            return val;
          };
          Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 1, this.length);
            if (!(this[offset] & 0x80)) return this[offset];
            return (0xff - this[offset] + 1) * -1;
          };
          Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset] | this[offset + 1] << 8;
            return val & 0x8000 ? val | 0xFFFF0000 : val;
          };
          Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 2, this.length);
            var val = this[offset + 1] | this[offset] << 8;
            return val & 0x8000 ? val | 0xFFFF0000 : val;
          };
          Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
          };
          Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
          };
          Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, true, 23, 4);
          };
          Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 4, this.length);
            return ieee754.read(this, offset, false, 23, 4);
          };
          Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, true, 52, 8);
          };
          Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
            offset = offset >>> 0;
            if (!noAssert) checkOffset(offset, 8, this.length);
            return ieee754.read(this, offset, false, 52, 8);
          };
          function checkInt(buf, value, offset, ext, max, min) {
            if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
          }
          Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }
            var mul = 1;
            var i = 0;
            this[offset] = value & 0xFF;
            while (++i < byteLength && (mul *= 0x100)) {
              this[offset + i] = value / mul & 0xFF;
            }
            return offset + byteLength;
          };
          Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            byteLength = byteLength >>> 0;
            if (!noAssert) {
              var maxBytes = Math.pow(2, 8 * byteLength) - 1;
              checkInt(this, value, offset, byteLength, maxBytes, 0);
            }
            var i = byteLength - 1;
            var mul = 1;
            this[offset + i] = value & 0xFF;
            while (--i >= 0 && (mul *= 0x100)) {
              this[offset + i] = value / mul & 0xFF;
            }
            return offset + byteLength;
          };
          Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
            this[offset] = value & 0xff;
            return offset + 1;
          };
          Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };
          Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };
          Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset + 3] = value >>> 24;
            this[offset + 2] = value >>> 16;
            this[offset + 1] = value >>> 8;
            this[offset] = value & 0xff;
            return offset + 4;
          };
          Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };
          Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);
              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }
            var i = 0;
            var mul = 1;
            var sub = 0;
            this[offset] = value & 0xFF;
            while (++i < byteLength && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (value / mul >> 0) - sub & 0xFF;
            }
            return offset + byteLength;
          };
          Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              var limit = Math.pow(2, 8 * byteLength - 1);
              checkInt(this, value, offset, byteLength, limit - 1, -limit);
            }
            var i = byteLength - 1;
            var mul = 1;
            var sub = 0;
            this[offset + i] = value & 0xFF;
            while (--i >= 0 && (mul *= 0x100)) {
              if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                sub = 1;
              }
              this[offset + i] = (value / mul >> 0) - sub & 0xFF;
            }
            return offset + byteLength;
          };
          Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
            if (value < 0) value = 0xff + value + 1;
            this[offset] = value & 0xff;
            return offset + 1;
          };
          Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            return offset + 2;
          };
          Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
            this[offset] = value >>> 8;
            this[offset + 1] = value & 0xff;
            return offset + 2;
          };
          Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            this[offset] = value & 0xff;
            this[offset + 1] = value >>> 8;
            this[offset + 2] = value >>> 16;
            this[offset + 3] = value >>> 24;
            return offset + 4;
          };
          Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
            if (value < 0) value = 0xffffffff + value + 1;
            this[offset] = value >>> 24;
            this[offset + 1] = value >>> 16;
            this[offset + 2] = value >>> 8;
            this[offset + 3] = value & 0xff;
            return offset + 4;
          };
          function checkIEEE754(buf, value, offset, ext, max, min) {
            if (offset + ext > buf.length) throw new RangeError('Index out of range');
            if (offset < 0) throw new RangeError('Index out of range');
          }
          function writeFloat(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
            }
            ieee754.write(buf, value, offset, littleEndian, 23, 4);
            return offset + 4;
          }
          Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
            return writeFloat(this, value, offset, true, noAssert);
          };
          Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
            return writeFloat(this, value, offset, false, noAssert);
          };
          function writeDouble(buf, value, offset, littleEndian, noAssert) {
            value = +value;
            offset = offset >>> 0;
            if (!noAssert) {
              checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308);
            }
            ieee754.write(buf, value, offset, littleEndian, 52, 8);
            return offset + 8;
          }
          Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
            return writeDouble(this, value, offset, true, noAssert);
          };
          Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
            return writeDouble(this, value, offset, false, noAssert);
          };
          Buffer.prototype.copy = function copy(target, targetStart, start, end) {
            if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer');
            if (!start) start = 0;
            if (!end && end !== 0) end = this.length;
            if (targetStart >= target.length) targetStart = target.length;
            if (!targetStart) targetStart = 0;
            if (end > 0 && end < start) end = start;
            if (end === start) return 0;
            if (target.length === 0 || this.length === 0) return 0;
            if (targetStart < 0) {
              throw new RangeError('targetStart out of bounds');
            }
            if (start < 0 || start >= this.length) throw new RangeError('Index out of range');
            if (end < 0) throw new RangeError('sourceEnd out of bounds');
            if (end > this.length) end = this.length;
            if (target.length - targetStart < end - start) {
              end = target.length - targetStart + start;
            }
            var len = end - start;
            if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
              this.copyWithin(targetStart, start, end);
            } else if (this === target && start < targetStart && targetStart < end) {
              for (var i = len - 1; i >= 0; --i) {
                target[i + targetStart] = this[i + start];
              }
            } else {
              Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
            }
            return len;
          };
          Buffer.prototype.fill = function fill(val, start, end, encoding) {
            if (typeof val === 'string') {
              if (typeof start === 'string') {
                encoding = start;
                start = 0;
                end = this.length;
              } else if (typeof end === 'string') {
                encoding = end;
                end = this.length;
              }
              if (encoding !== undefined && typeof encoding !== 'string') {
                throw new TypeError('encoding must be a string');
              }
              if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
                throw new TypeError('Unknown encoding: ' + encoding);
              }
              if (val.length === 1) {
                var code = val.charCodeAt(0);
                if (encoding === 'utf8' && code < 128 || encoding === 'latin1') {
                  val = code;
                }
              }
            } else if (typeof val === 'number') {
              val = val & 255;
            }
            if (start < 0 || this.length < start || this.length < end) {
              throw new RangeError('Out of range index');
            }
            if (end <= start) {
              return this;
            }
            start = start >>> 0;
            end = end === undefined ? this.length : end >>> 0;
            if (!val) val = 0;
            var i;
            if (typeof val === 'number') {
              for (i = start; i < end; ++i) {
                this[i] = val;
              }
            } else {
              var bytes = Buffer.isBuffer(val) ? val : Buffer.from(val, encoding);
              var len = bytes.length;
              if (len === 0) {
                throw new TypeError('The value "' + val + '" is invalid for argument "value"');
              }
              for (i = 0; i < end - start; ++i) {
                this[i + start] = bytes[i % len];
              }
            }
            return this;
          };
          var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
          function base64clean(str) {
            str = str.split('=')[0];
            str = str.trim().replace(INVALID_BASE64_RE, '');
            if (str.length < 2) return '';
            while (str.length % 4 !== 0) {
              str = str + '=';
            }
            return str;
          }
          function toHex(n) {
            if (n < 16) return '0' + n.toString(16);
            return n.toString(16);
          }
          function utf8ToBytes(string, units) {
            units = units || Infinity;
            var codePoint;
            var length = string.length;
            var leadSurrogate = null;
            var bytes = [];
            for (var i = 0; i < length; ++i) {
              codePoint = string.charCodeAt(i);
              if (codePoint > 0xD7FF && codePoint < 0xE000) {
                if (!leadSurrogate) {
                  if (codePoint > 0xDBFF) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                  } else if (i + 1 === length) {
                    if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                    continue;
                  }
                  leadSurrogate = codePoint;
                  continue;
                }
                if (codePoint < 0xDC00) {
                  if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
                  leadSurrogate = codePoint;
                  continue;
                }
                codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
              } else if (leadSurrogate) {
                if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
              }
              leadSurrogate = null;
              if (codePoint < 0x80) {
                if ((units -= 1) < 0) break;
                bytes.push(codePoint);
              } else if (codePoint < 0x800) {
                if ((units -= 2) < 0) break;
                bytes.push(codePoint >> 0x6 | 0xC0, codePoint & 0x3F | 0x80);
              } else if (codePoint < 0x10000) {
                if ((units -= 3) < 0) break;
                bytes.push(codePoint >> 0xC | 0xE0, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
              } else if (codePoint < 0x110000) {
                if ((units -= 4) < 0) break;
                bytes.push(codePoint >> 0x12 | 0xF0, codePoint >> 0xC & 0x3F | 0x80, codePoint >> 0x6 & 0x3F | 0x80, codePoint & 0x3F | 0x80);
              } else {
                throw new Error('Invalid code point');
              }
            }
            return bytes;
          }
          function asciiToBytes(str) {
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              byteArray.push(str.charCodeAt(i) & 0xFF);
            }
            return byteArray;
          }
          function utf16leToBytes(str, units) {
            var c, hi, lo;
            var byteArray = [];
            for (var i = 0; i < str.length; ++i) {
              if ((units -= 2) < 0) break;
              c = str.charCodeAt(i);
              hi = c >> 8;
              lo = c % 256;
              byteArray.push(lo);
              byteArray.push(hi);
            }
            return byteArray;
          }
          function base64ToBytes(str) {
            return base64.toByteArray(base64clean(str));
          }
          function blitBuffer(src, dst, offset, length) {
            for (var i = 0; i < length; ++i) {
              if (i + offset >= dst.length || i >= src.length) break;
              dst[i + offset] = src[i];
            }
            return i;
          }
          function isInstance(obj, type) {
            return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
          }
          function numberIsNaN(obj) {
            return obj !== obj;
          }
        }).call(this);
      }).call(this, require("buffer").Buffer);
    }, {
      "base64-js": 137,
      "buffer": 139,
      "ieee754": 140
    }],
    140: [function (require, module, exports) {
      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}
        buffer[offset + i - d] |= s * 128;
      };
    }, {}],
    141: [function (require, module, exports) {
      var process = module.exports = {};
      var cachedSetTimeout;
      var cachedClearTimeout;
      function defaultSetTimout() {
        throw new Error('setTimeout has not been defined');
      }
      function defaultClearTimeout() {
        throw new Error('clearTimeout has not been defined');
      }
      (function () {
        try {
          if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
          } else {
            cachedSetTimeout = defaultSetTimout;
          }
        } catch (e) {
          cachedSetTimeout = defaultSetTimout;
        }
        try {
          if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
          } else {
            cachedClearTimeout = defaultClearTimeout;
          }
        } catch (e) {
          cachedClearTimeout = defaultClearTimeout;
        }
      })();
      function runTimeout(fun) {
        if (cachedSetTimeout === setTimeout) {
          return setTimeout(fun, 0);
        }
        if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
          cachedSetTimeout = setTimeout;
          return setTimeout(fun, 0);
        }
        try {
          return cachedSetTimeout(fun, 0);
        } catch (e) {
          try {
            return cachedSetTimeout.call(null, fun, 0);
          } catch (e) {
            return cachedSetTimeout.call(this, fun, 0);
          }
        }
      }
      function runClearTimeout(marker) {
        if (cachedClearTimeout === clearTimeout) {
          return clearTimeout(marker);
        }
        if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
          cachedClearTimeout = clearTimeout;
          return clearTimeout(marker);
        }
        try {
          return cachedClearTimeout(marker);
        } catch (e) {
          try {
            return cachedClearTimeout.call(null, marker);
          } catch (e) {
            return cachedClearTimeout.call(this, marker);
          }
        }
      }
      var queue = [];
      var draining = false;
      var currentQueue;
      var queueIndex = -1;
      function cleanUpNextTick() {
        if (!draining || !currentQueue) {
          return;
        }
        draining = false;
        if (currentQueue.length) {
          queue = currentQueue.concat(queue);
        } else {
          queueIndex = -1;
        }
        if (queue.length) {
          drainQueue();
        }
      }
      function drainQueue() {
        if (draining) {
          return;
        }
        var timeout = runTimeout(cleanUpNextTick);
        draining = true;
        var len = queue.length;
        while (len) {
          currentQueue = queue;
          queue = [];
          while (++queueIndex < len) {
            if (currentQueue) {
              currentQueue[queueIndex].run();
            }
          }
          queueIndex = -1;
          len = queue.length;
        }
        currentQueue = null;
        draining = false;
        runClearTimeout(timeout);
      }
      process.nextTick = function (fun) {
        var args = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
          }
        }
        queue.push(new Item(fun, args));
        if (queue.length === 1 && !draining) {
          runTimeout(drainQueue);
        }
      };
      function Item(fun, array) {
        this.fun = fun;
        this.array = array;
      }
      Item.prototype.run = function () {
        this.fun.apply(null, this.array);
      };
      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];
      process.version = '';
      process.versions = {};
      function noop() {}
      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;
      process.prependListener = noop;
      process.prependOnceListener = noop;
      process.listeners = function (name) {
        return [];
      };
      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
      process.umask = function () {
        return 0;
      };
    }, {}]
  }, {}, [134])(134);
});