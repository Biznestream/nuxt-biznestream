<template>
    <v-layout align-center justify-center fill-height>
        <v-flex xs10 md4>

            <v-form @submit.prevent="login(user)" id="login-form" ref="form" v-model="valid">
                <h2>Login</h2>

                <v-alert :value="redirect" type="warning">
                    You have to login before accessing to <strong>{{ redirect }}</strong>
                </v-alert>

                <v-alert dismissible :value="loginError" type="error">{{loginError && loginError.message}}</v-alert>

                <v-text-field :disabled="loginLoading"
                        v-model="user.username"
                        label="Username"
                        ref="username"
                        required
                ></v-text-field>
                <v-text-field :disabled="loginLoading"
                        v-model="user.password"
                        label="Password"
                        required
                ></v-text-field>

                <v-btn type="submit" :loading="loginLoading">Login</v-btn>
            </v-form>

        </v-flex>
    </v-layout>
</template>
<style>
    .width-400 {
        width: 400px;
    }
</style>
<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import AuthMixin from '../mixins/auth';

  export default @Component({
    middleware: ['auth'],
    mixins: [AuthMixin],
    layout: 'auth-empty'
  })
  class Login extends Vue {
    user = { username: '', password: '' };

    valid = false;

    get redirect () {
      return this.$route.query.redirect && decodeURIComponent(this.$route.query.redirect);
    }

    mounted () {
      this.$refs.username.focus();
    }
  }
</script>
