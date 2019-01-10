<template>
    <div class="container d-flex align-items-center justify-content-center flex-column">
        <img src="~/assets/loading.svg" alt="Loading..." width="80px" />
        Logging in...
    </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';
  import AuthMixin from '../mixins/auth';

  export default
  @Component({
    middleware: ['auth'],
    mixins: [AuthMixin],
    layout: 'auth-empty'
  })
  class Callback extends Vue {
  }
</script>
