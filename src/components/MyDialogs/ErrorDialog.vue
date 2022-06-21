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
import {mapGetters, mapMutations, mapState} from 'vuex';
import {AxiosError} from 'axios';

@Component({
  computed: {
    ...mapGetters('errorDialog', {
      error: 'displayErrorDialog',
      errorCode: 'errorCode',
      errorMessage: 'errorMessage',
    }),
  },
  methods: {
    ...mapMutations('errorDialog',[
      'displayErrorDialog',
      'setError'
    ])
  }
})
export default class ErrorDialog extends Vue {

  error!: boolean;
  errorCode!: number;
  errorMessage!: string;
  displayErrorDialog!: (value: boolean) => void;
  setError!: (error: AxiosError | null) => void;

  get template(): string {
    return `<div class="error-dialog__content">
                <h3>Code: ${this.errorCode}</h3>
                <pre>${this.errorMessage}</pre>
            </div>`;
  }

  get display(): boolean {
    return this.error;
  }

  set display(value: boolean) {
    this.displayErrorDialog(value);
    if (!value) {
      this.setError(null)
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
