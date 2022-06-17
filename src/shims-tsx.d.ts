import Vue, { VNode } from 'vue'
import {ILoginPlugin} from '@/plugins/auth.plugin';
import {Store} from 'vuex';
import {IState} from '@/store/models';

declare module 'vue/types/vue' {
  interface Vue {

    $auth: ILoginPlugin
  }
}

interface IMyVue extends Vue {
  $store: Store<any>;
}

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends IMyVue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
