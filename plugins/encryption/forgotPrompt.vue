<template>

  <v-dialog v-model="promptDialog" persistent max-width="350">
    <v-card>
      <v-card-title class="headline">Forgot Master password</v-card-title>
      <v-card-text>

        Are you sure?

      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click="onCancel">Cancel</v-btn>
        <v-btn flat @click="onOk">YES</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</template>

<script>
  import Vue from 'vue';
  import Component from 'nuxt-class-component';

  export default @Component({
    components: {
    }
  })
  class PromptComponent extends Vue {
    promptDialog = true;

    async onOk () {
      this.promptDialog = false;
      this.$emit('onOk');
    }

    onCancel () {
      this.promptDialog = false;
      this.$emit('onCancel');
    }
  }
</script>
