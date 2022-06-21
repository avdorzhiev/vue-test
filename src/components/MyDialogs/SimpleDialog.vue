<template>
  <div class="simple-dialog">
    <Dialog :header="header" :visible.sync="display" :modal="true">
      <div v-html="getContent()"></div>
      <template #footer>
        <Button label="Ok" @click="display=false" v-if="!buttons.length"/>
        <div v-else>
          <Button v-for="(btn, index) in buttons" :key="index" :label="btn.label" @click="btn.action()"></Button>
        </div>
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
    ...mapGetters('simpleDialog', ['displayDialog',  'content',  'buttons',  'header']),
  },
  methods: {
    ...mapMutations('simpleDialog', ['setDisplayDialog', 'setContent', 'setButtons', 'setHeader'])
  }
})
export default class SimpleDialog extends Vue {

  displayDialog!: boolean;
  content!: string;
  buttons!: {label: string, action: () => any}[];
  header!: string;
  setDisplayDialog!: (value?: boolean) => void;
  setContent!: (value?: string | Object) => void;
  setButtons!: (value?: {label: string, action: () => void}[]) => void;
  setHeader!: (value?: string | {label: string}) => void;

  getContent(): string {
    return this.content;
  }

  get display(): boolean {
    return this.displayDialog;
  }

  set display(value: boolean) {
    this.setDisplayDialog(value);

    if (!value) {
      this.setContent(undefined);
      this.setButtons(undefined);
      this.setHeader(undefined);
    }
  }

}

</script>

<style lang="less">

</style>
