<template>

  <v-dialog v-model="promptDialog" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">Master password</v-card-title>
      <v-card-text>
        <div v-if="!isBrowserSupport">
          <v-alert :value="true" type="error">
            <strong>Sorry!</strong> But your browser doesn't support encryption.
          </v-alert>
        </div>
        <div v-else>
          <div v-if="error">
            <v-alert :value="true" type="error">
              Wront master password
            </v-alert>
          </div>

          <v-text-field v-model="masterPassword"
                        hint="Please enter you master password"
                        :autofocus="promptDialog"
                        persistent-hint
                        required
                        type="password"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat :disabled="loading" @click="onCancel">Cancel</v-btn>
        <v-btn flat :disabled="!masterPassword || loading" :loading="loading" @click="onOk">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  import Vue from 'vue';
  import { Prop } from 'vue-property-decorator';
  import Component from 'nuxt-class-component';

  export default @Component({
    components: {
    }
  })
  class PromptComponent extends Vue {
    @Prop() accountId;

    @Prop() axios;

    @Prop() cryptozoa;

    promptDialog = true;

    masterPassword = null;

    loading = false;

    error = null;

    get isBrowserSupport () {
      return this.cryptozoa.isBrowserSupport();
    }

    async onOk () {
      this.loading = true;
      this.error = null;
      try {
        const { key } = await this.axios.$get(`/api/v1/accounts/${this.accountId}/privateKey`);

        const password = await this.cryptozoa.symmetric.decrypt(key, this.masterPassword);

        this.promptDialog = false;
        this.$emit('onOk', password);
      } catch (err) {
        this.error = err;
      }
      this.loading = false;
    }

    onCancel () {
      this.promptDialog = false;
      this.$emit('onCancel');
    }
  }
</script>
