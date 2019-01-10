"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _masterPasswordRequest = _interopRequireDefault(require("./encryption/masterPasswordRequest.vue"));

var _forgotPrompt = _interopRequireDefault(require("./encryption/forgotPrompt.vue"));

var authModule = _interopRequireWildcard(require("../store/auth"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var BIZNESTREAM_NAMESPACE = 'bzstrm';

var MasterPasswordRequestDialog = _vue.default.extend(_masterPasswordRequest.default);

var ForgotPromptDialog = _vue.default.extend(_forgotPrompt.default);

var crypto = window.crypto || window.msCrypto;
var atob = window.atob;
var btoa = window.btoa;
var cryptozoa = {
  asymmetric: {
    encrypt: function () {
      var _encrypt = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(data, publicKey) {
        var name, keys;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                name = 'RSA-OAEP';
                keys = {};
                !publicKey || (keys.publicKey = publicKey);

                if (!publicKey) {
                  _context.next = 10;
                  break;
                }

                if (!(typeof publicKey === 'string')) {
                  _context.next = 8;
                  break;
                }

                _context.next = 7;
                return crypto.subtle.importKey('spki', decode(publicKey), {
                  name: name,
                  hash: {
                    name: 'SHA-256'
                  }
                }, false, ['encrypt']);

              case 7:
                publicKey = _context.sent;

              case 8:
                _context.next = 24;
                break;

              case 10:
                _context.next = 12;
                return crypto.subtle.generateKey({
                  name: name,
                  modulusLength: 1024,
                  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                  hash: {
                    name: 'SHA-256'
                  }
                }, true, ['encrypt', 'decrypt']);

              case 12:
                keys = _context.sent;
                publicKey = keys.publicKey;
                _context.t0 = encode;
                _context.next = 17;
                return crypto.subtle.exportKey('spki', keys.publicKey);

              case 17:
                _context.t1 = _context.sent;
                keys.publicKey = (0, _context.t0)(_context.t1);
                _context.t2 = encode;
                _context.next = 22;
                return crypto.subtle.exportKey('pkcs8', keys.privateKey);

              case 22:
                _context.t3 = _context.sent;
                keys.privateKey = (0, _context.t2)(_context.t3);

              case 24:
                _context.t4 = keys;
                _context.t5 = encode;
                _context.next = 28;
                return crypto.subtle.encrypt({
                  name: name
                }, publicKey, convertStringToArrayBufferView(data));

              case 28:
                _context.t6 = _context.sent;
                _context.t7 = (0, _context.t5)(_context.t6);
                return _context.abrupt("return", {
                  keys: _context.t4,
                  data: _context.t7
                });

              case 31:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function encrypt(_x, _x2) {
        return _encrypt.apply(this, arguments);
      }

      return encrypt;
    }(),
    decrypt: function () {
      var _decrypt = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(data, privateKey) {
        var name;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                name = 'RSA-OAEP';

                if (!(typeof privateKey === 'string')) {
                  _context2.next = 5;
                  break;
                }

                _context2.next = 4;
                return crypto.subtle.importKey('pkcs8', decode(privateKey), {
                  name: name,
                  hash: {
                    name: 'SHA-256'
                  }
                }, false, ['decrypt']);

              case 4:
                privateKey = _context2.sent;

              case 5:
                _context2.t0 = convertArrayBufferViewToString;
                _context2.t1 = decode;
                _context2.t2 = encode;
                _context2.next = 10;
                return crypto.subtle.decrypt({
                  name: name
                }, privateKey, decode(data));

              case 10:
                _context2.t3 = _context2.sent;
                _context2.t4 = (0, _context2.t2)(_context2.t3);
                _context2.t5 = (0, _context2.t1)(_context2.t4);
                return _context2.abrupt("return", (0, _context2.t0)(_context2.t5));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function decrypt(_x3, _x4) {
        return _decrypt.apply(this, arguments);
      }

      return decrypt;
    }()
  },
  randomBytes: function () {
    var _randomBytes = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee3(count) {
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", crypto.getRandomValues(new Uint8Array(count)));

            case 1:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function randomBytes(_x5) {
      return _randomBytes.apply(this, arguments);
    }

    return randomBytes;
  }(),
  randomPassword: function () {
    var _randomPassword = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee4() {
      var size,
          _args4 = arguments;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              size = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : 8;
              _context4.t0 = encode;
              _context4.next = 4;
              return cryptozoa.randomBytes(size);

            case 4:
              _context4.t1 = _context4.sent;
              _context4.t2 = size;
              return _context4.abrupt("return", (0, _context4.t0)(_context4.t1).substring(0, _context4.t2));

            case 7:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function randomPassword() {
      return _randomPassword.apply(this, arguments);
    }

    return randomPassword;
  }(),
  sign: function () {
    var _sign = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee5(text2sign, privateKey) {
      var name, keys, keypromise;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              name = 'RSASSA-PKCS1-v1_5'; // "RSASSA-PKCS1-v1_5",

              keys = {};

              if (privateKey) {
                keypromise = crypto.subtle.importKey('spki', decode(privateKey), {
                  name: name,
                  hash: {
                    name: 'SHA-1'
                  }
                }, false, ['sign']).then(function (publicKey) {
                  return {
                    privateKey: privateKey
                  };
                });
              } else {
                keypromise = crypto.subtle.generateKey({
                  name: name,
                  modulusLength: 1024,
                  publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
                  hash: {
                    name: 'SHA-1'
                  }
                }, true, ['sign', 'verify']).then(function (k) {
                  return crypto.subtle.exportKey('spki', k.publicKey).then(function (publicKey) {
                    keys.publicKey = encode(publicKey);
                    return crypto.subtle.exportKey('pkcs8', k.privateKey).then(function (privateKey) {
                      keys.privateKey = encode(privateKey);
                      return k;
                    });
                  });
                });
              }

              return _context5.abrupt("return", keypromise.then(function (k) {
                return crypto.subtle.sign({
                  name: name,
                  saltLength: 0
                }, k.privateKey, convertStringToArrayBufferView(text2sign));
              }).then(function (signature) {
                return {
                  keys: keys,
                  signature: encode(signature)
                };
              }));

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function sign(_x6, _x7) {
      return _sign.apply(this, arguments);
    }

    return sign;
  }(),
  symmetric: {
    // use only for local encryption, brute force vulnerable for password without iv
    encrypt: function () {
      var _encrypt2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee6(data, password, iv) {
        var name, returniv, key, result;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // key is optional, generates one if necessary, returns the {key:key, iv:vector}
                name = 'AES-CBC';
                returniv = iv;
                !iv || (iv = decode(iv));

                if (password) {
                  _context6.next = 14;
                  break;
                }

                if (iv) {
                  _context6.next = 9;
                  break;
                }

                _context6.next = 7;
                return cryptozoa.randomBytes(16);

              case 7:
                iv = _context6.sent;
                returniv = encode(iv);

              case 9:
                _context6.next = 11;
                return cryptozoa.randomPassword(32);

              case 11:
                password = _context6.sent;
                _context6.next = 16;
                break;

              case 14:
                password = password.padEnd(32);
                iv || (iv = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));

              case 16:
                _context6.next = 18;
                return crypto.subtle.importKey('raw', convertStringToArrayBufferView(password), name, // {name},
                false, ['encrypt', 'decrypt']);

              case 18:
                key = _context6.sent;
                _context6.t0 = encode;
                _context6.next = 22;
                return crypto.subtle.encrypt({
                  name: name,
                  iv: iv
                }, key, convertStringToArrayBufferView(data));

              case 22:
                _context6.t1 = _context6.sent;
                data = (0, _context6.t0)(_context6.t1);
                result = {
                  password: password,
                  data: data
                };
                if (returniv) result.iv = returniv;
                return _context6.abrupt("return", result);

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function encrypt(_x8, _x9, _x10) {
        return _encrypt2.apply(this, arguments);
      }

      return encrypt;
    }(),
    decrypt: function () {
      var _decrypt2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee7(data, password, iv) {
        var name, key;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                name = 'AES-CBC';
                password = password.padEnd(32); // const keybuffer = convertStringToArrayBufferView(password);

                if (iv) {
                  iv = decode(iv);
                } else {
                  iv = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
                }

                _context7.next = 5;
                return crypto.subtle.importKey('raw', convertStringToArrayBufferView(password), name, // {name},
                false, ['encrypt', 'decrypt']);

              case 5:
                key = _context7.sent;
                _context7.t0 = convertArrayBufferViewToString;
                _context7.t1 = Uint8Array;
                _context7.next = 10;
                return crypto.subtle.decrypt({
                  name: name,
                  iv: iv
                }, key, decode(data));

              case 10:
                _context7.t2 = _context7.sent;
                _context7.t3 = new _context7.t1(_context7.t2);
                return _context7.abrupt("return", (0, _context7.t0)(_context7.t3));

              case 13:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function decrypt(_x11, _x12, _x13) {
        return _decrypt2.apply(this, arguments);
      }

      return decrypt;
    }()
  },
  verify: function () {
    var _verify = _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee8(text2verify, publicKey, signature) {
      var name, key;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              name = 'RSASSA-PKCS1-v1_5';
              _context8.next = 3;
              return crypto.subtle.importKey('spki', decode(publicKey), {
                name: name,
                hash: {
                  name: 'SHA-1'
                }
              }, false, ['verify']);

            case 3:
              key = _context8.sent;
              return _context8.abrupt("return", crypto.subtle.verify({
                name: name,
                saltLength: 0
              }, key, decode(signature), convertStringToArrayBufferView(text2verify)));

            case 5:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function verify(_x14, _x15, _x16) {
      return _verify.apply(this, arguments);
    }

    return verify;
  }(),
  isBrowserSupport: function isBrowserSupport() {
    return !!crypto;
  }
};
var MASTER_KEY_SYMBOL = Symbol('masterKey');
var EVENT_CHANGE_MASTER_KEY = 'changeKey';

var Cryptozoa =
/*#__PURE__*/
function () {
  function Cryptozoa(app) {
    _classCallCheck(this, Cryptozoa);

    this.eventBus = new _vue.default();
    this.app = app;

    if (localStorage.masterKey) {
      this[MASTER_KEY_SYMBOL] = localStorage.masterKey;
    }
  }

  _createClass(Cryptozoa, [{
    key: "onChangeMasterKey",
    value: function onChangeMasterKey(handler) {
      this.eventBus.$on(EVENT_CHANGE_MASTER_KEY, handler);
    }
  }, {
    key: "isCanDecrypt",
    value: function isCanDecrypt() {
      return !!this[MASTER_KEY_SYMBOL];
    }
  }, {
    key: "decrypt",
    value: function () {
      var _decrypt3 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee9(value) {
        var key, val;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                key = this[MASTER_KEY_SYMBOL];
                _context9.next = 4;
                return Promise.all(value.map(function (str) {
                  return cryptozoa.asymmetric.decrypt(str, key);
                }));

              case 4:
                val = _context9.sent;
                return _context9.abrupt("return", val.join(''));

              case 8:
                _context9.prev = 8;
                _context9.t0 = _context9["catch"](0);
                return _context9.abrupt("return", null);

              case 11:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this, [[0, 8]]);
      }));

      function decrypt(_x17) {
        return _decrypt3.apply(this, arguments);
      }

      return decrypt;
    }()
  }, {
    key: "forgotMasterPassword",
    value: function forgotMasterPassword() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var dlg = new ForgotPromptDialog();
        dlg.$on('onOk', function () {
          dlg.$destroy();
          delete _this[MASTER_KEY_SYMBOL];
          delete localStorage.masterKey;

          _this.eventBus.$emit(EVENT_CHANGE_MASTER_KEY);

          resolve();
        });
        dlg.$on('onCancel', function () {
          dlg.$destroy();
          reject(new Error('Canceled'));
        });

        try {
          dlg.$mount();
        } catch (err) {
          console.info(err);
        }
      });
    }
  }, {
    key: "promptMasterPassword",
    value: function promptMasterPassword(accountId) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var dlg = new MasterPasswordRequestDialog({
          propsData: {
            accountId: accountId,
            cryptozoa: cryptozoa,
            axios: _this2.app.$axios
          }
        });
        dlg.$on('onOk', function (password) {
          dlg.$destroy();
          _this2[MASTER_KEY_SYMBOL] = password;
          localStorage.masterKey = password;

          _this2.eventBus.$emit(EVENT_CHANGE_MASTER_KEY);

          resolve(password);
        });
        dlg.$on('onCancel', function () {
          dlg.$destroy();
          reject(new Error('Canceled'));
        });

        try {
          dlg.$mount();
        } catch (err) {
          console.info(err);
        }
      });
    }
  }]);

  return Cryptozoa;
}();

var _default = function _default(_ref, inject) {
  var app = _ref.app,
      store = _ref.store;
  authModule.namespaced = true;
  store.registerModule(BIZNESTREAM_NAMESPACE, authModule);
  inject('encryption', new Cryptozoa(app));
};

exports.default = _default;

function convertStringToArrayBufferView(str) {
  var bytes = new Uint8Array(str.length);

  for (var iii = 0; iii < str.length; iii++) {
    bytes[iii] = str.charCodeAt(iii);
  }

  return bytes;
}

function convertArrayBufferViewToString(buffer) {
  var str = '';

  for (var iii = 0; iii < buffer.byteLength; iii++) {
    str += String.fromCharCode(buffer[iii]);
  }

  return str;
}

function encode(byteArray) {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(byteArray)));
}

function decode(base64string) {
  return new Uint8Array(atob(base64string).split('').map(function (c) {
    return c.charCodeAt(0);
  }));
}
