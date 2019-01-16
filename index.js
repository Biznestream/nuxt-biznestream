const { resolve } = require('path');
const authSignInRoute = {
  name: 'auth-signin',
  path: '/auth/signin',
  chunkName: 'auth',
  component: resolve(__dirname, './pages/signin.vue')
};
const authCallbackRoute = {
  name: 'auth-callback',
  path: '/auth/callback',
  chunkName: 'auth',
  component: resolve(__dirname, './pages/callback.vue')
};

export default function SimpleModule (moduleOptions) {
  this.addPlugin({
    src: resolve(__dirname, './plugins/encryption.js'),
    ssr: false
  });
  this.addTemplate({
    src: resolve(__dirname, './plugins/encryption/forgotPrompt.vue'),
    fileName: 'encryption/forgotPrompt.vue'
  });
  this.addTemplate({
    src: resolve(__dirname, './plugins/encryption/masterPasswordRequest.vue'),
    fileName: 'encryption/masterPasswordRequest.vue'
  });

  this.extendRoutes(routes => {
    routes.unshift(authCallbackRoute);
    routes.unshift(authSignInRoute);
  });

  this.addLayout(resolve(__dirname, './layouts/auth-empty.vue'), 'auth-empty');
  // Write your code here
}

// REQUIRED if publishing the module as npm package
// module.exports.meta = require('./package.json');
