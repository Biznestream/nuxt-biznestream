import Vue from 'vue';
import masterPasswordRequest from './encryption/masterPasswordRequest.vue';
import forgotPrompt from './encryption/forgotPrompt.vue';
import * as authModule from './store/auth';
const BIZNESTREAM_NAMESPACE = 'bzstrm';
const MasterPasswordRequestDialog = Vue.extend(masterPasswordRequest);
const ForgotPromptDialog = Vue.extend(forgotPrompt);
let crypto = window.crypto || window.msCrypto;
let atob = window.atob;
let btoa = window.btoa;
const cryptozoa = {
  asymmetric: {
    encrypt: async (data, publicKey) => {
      const name = 'RSA-OAEP';
      let keys = {};
      !publicKey || (keys.publicKey = publicKey);

      if (publicKey) {
        if (typeof publicKey === 'string') {
          publicKey = await crypto.subtle.importKey('spki', decode(publicKey), {
            name,
            hash: {
              name: 'SHA-256'
            }
          }, false, ['encrypt']);
        }
      } else {
        keys = await crypto.subtle.generateKey({
          name,
          modulusLength: 1024,
          publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
          hash: {
            name: 'SHA-256'
          }
        }, true, ['encrypt', 'decrypt']);
        publicKey = keys.publicKey;
        keys.publicKey = encode((await crypto.subtle.exportKey('spki', keys.publicKey)));
        keys.privateKey = encode((await crypto.subtle.exportKey('pkcs8', keys.privateKey)));
      }

      return {
        keys,
        data: encode((await crypto.subtle.encrypt({
          name
        }, publicKey, convertStringToArrayBufferView(data))))
      };
    },
    decrypt: async (data, privateKey) => {
      const name = 'RSA-OAEP';

      if (typeof privateKey === 'string') {
        privateKey = await crypto.subtle.importKey('pkcs8', decode(privateKey), {
          name,
          hash: {
            name: 'SHA-256'
          }
        }, false, ['decrypt']);
      } // as rediculous as the nested decode(encode()) seem, they are absolutely necessary!


      return convertArrayBufferViewToString(decode(encode((await crypto.subtle.decrypt({
        name
      }, privateKey, decode(data))))));
    }
  },
  randomBytes: async count => {
    return crypto.getRandomValues(new Uint8Array(count));
  },
  randomPassword: async (size = 8) => {
    return encode((await cryptozoa.randomBytes(size))).substring(0, size);
  },
  sign: async (text2sign, privateKey) => {
    const name = 'RSASSA-PKCS1-v1_5'; // "RSASSA-PKCS1-v1_5",

    let keys = {};
    let keypromise;

    if (privateKey) {
      keypromise = crypto.subtle.importKey('spki', decode(privateKey), {
        name,
        hash: {
          name: 'SHA-1'
        }
      }, false, ['sign']).then(publicKey => {
        return {
          privateKey
        };
      });
    } else {
      keypromise = crypto.subtle.generateKey({
        name,
        modulusLength: 1024,
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: {
          name: 'SHA-1'
        }
      }, true, ['sign', 'verify']).then(k => {
        return crypto.subtle.exportKey('spki', k.publicKey).then(publicKey => {
          keys.publicKey = encode(publicKey);
          return crypto.subtle.exportKey('pkcs8', k.privateKey).then(privateKey => {
            keys.privateKey = encode(privateKey);
            return k;
          });
        });
      });
    }

    return keypromise.then(k => {
      return crypto.subtle.sign({
        name,
        saltLength: 0
      }, k.privateKey, convertStringToArrayBufferView(text2sign));
    }).then(signature => {
      return {
        keys,
        signature: encode(signature)
      };
    });
  },
  symmetric: {
    // use only for local encryption, brute force vulnerable for password without iv
    encrypt: async (data, password, iv) => {
      // key is optional, generates one if necessary, returns the {key:key, iv:vector}
      const name = 'AES-CBC';
      let returniv = iv;
      !iv || (iv = decode(iv));

      if (!password) {
        if (!iv) {
          iv = await cryptozoa.randomBytes(16);
          returniv = encode(iv);
        }

        password = await cryptozoa.randomPassword(32);
      } else {
        password = password.padEnd(32);
        iv || (iv = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]));
      }

      const key = await crypto.subtle.importKey('raw', convertStringToArrayBufferView(password), name, // {name},
      false, ['encrypt', 'decrypt']);
      data = encode((await crypto.subtle.encrypt({
        name,
        iv
      }, key, convertStringToArrayBufferView(data))));
      const result = {
        password,
        data
      };
      if (returniv) result.iv = returniv;
      return result;
    },
    decrypt: async (data, password, iv) => {
      const name = 'AES-CBC';
      password = password.padEnd(32); // const keybuffer = convertStringToArrayBufferView(password);

      if (iv) {
        iv = decode(iv);
      } else {
        iv = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
      }

      const key = await crypto.subtle.importKey('raw', convertStringToArrayBufferView(password), name, // {name},
      false, ['encrypt', 'decrypt']);
      return convertArrayBufferViewToString(new Uint8Array((await crypto.subtle.decrypt({
        name,
        iv
      }, key, decode(data)))));
    }
  },
  verify: async (text2verify, publicKey, signature) => {
    const name = 'RSASSA-PKCS1-v1_5';
    const key = await crypto.subtle.importKey('spki', decode(publicKey), {
      name,
      hash: {
        name: 'SHA-1'
      }
    }, false, ['verify']);
    return crypto.subtle.verify({
      name,
      saltLength: 0
    }, key, decode(signature), convertStringToArrayBufferView(text2verify));
  },
  isBrowserSupport: () => {
    return !!crypto;
  }
};
const MASTER_KEY_SYMBOL = Symbol('masterKey');
const EVENT_CHANGE_MASTER_KEY = 'changeKey';

class Cryptozoa {
  constructor(app) {
    this.eventBus = new Vue();
    this.app = app;

    if (localStorage.masterKey) {
      this[MASTER_KEY_SYMBOL] = localStorage.masterKey;
    }
  }

  onChangeMasterKey(handler) {
    this.eventBus.$on(EVENT_CHANGE_MASTER_KEY, handler);
  }

  isCanDecrypt() {
    return !!this[MASTER_KEY_SYMBOL];
  }

  async decrypt(value) {
    try {
      const key = this[MASTER_KEY_SYMBOL];
      const val = await Promise.all(value.map(str => cryptozoa.asymmetric.decrypt(str, key)));
      return val.join('');
    } catch (err) {
      return null;
    }
  }

  forgotMasterPassword() {
    return new Promise((resolve, reject) => {
      let dlg = new ForgotPromptDialog();
      dlg.$on('onOk', () => {
        dlg.$destroy();
        delete this[MASTER_KEY_SYMBOL];
        delete localStorage.masterKey;
        this.eventBus.$emit(EVENT_CHANGE_MASTER_KEY);
        resolve();
      });
      dlg.$on('onCancel', () => {
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

  promptMasterPassword(accountId) {
    return new Promise((resolve, reject) => {
      let dlg = new MasterPasswordRequestDialog({
        propsData: {
          accountId,
          cryptozoa,
          axios: this.app.$axios
        }
      });
      dlg.$on('onOk', password => {
        dlg.$destroy();
        this[MASTER_KEY_SYMBOL] = password;
        localStorage.masterKey = password;
        this.eventBus.$emit(EVENT_CHANGE_MASTER_KEY);
        resolve(password);
      });
      dlg.$on('onCancel', () => {
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

}

export default (({
  app,
  store
}, inject) => {
  authModule.namespaced = true;
  store.registerModule(BIZNESTREAM_NAMESPACE, authModule);
  inject('encryption', new Cryptozoa(app));
});

function convertStringToArrayBufferView(str) {
  const bytes = new Uint8Array(str.length);

  for (let iii = 0; iii < str.length; iii++) {
    bytes[iii] = str.charCodeAt(iii);
  }

  return bytes;
}

function convertArrayBufferViewToString(buffer) {
  let str = '';

  for (let iii = 0; iii < buffer.byteLength; iii++) {
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
