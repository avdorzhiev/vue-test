<template>
  <div class="error-dialog">
    <Dialog header="Error" :visible.sync="display" :modal="true" class="">
      <div v-html="template"></div>
      <template #footer>
        <Button label="Ok" @click="display=false" class="p-button-danger"/>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {mapState} from 'vuex';

@Component
export default class ErrorDialog extends Vue {

  get template(): string {
    return `<div class="error-dialog__content">
                <h3>Code: ${this.$store.getters.errorCode}</h3>
                <pre>${this.$store.getters.errorMessage}</pre>
            </div>`;
  }

  get display(): boolean {
    console.log(this);
    console.log(this.$store);
    return this.$store.getters.displayErrorDialog;
  }

  set display(value: boolean) {
    this.$store.commit('displayErrorDialog', value);
    if (!value) {
      this.$store.commit('setError', null)
    }
  }
}

</script>

<style lang="less">
  .error-dialog {
    .p-dialog-header {
      background-color: lightcoral;
      color: white;
    }
    &__content {
    }
  }
</style>
