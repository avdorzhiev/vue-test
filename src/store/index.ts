import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {IState} from '@/store/models/store.state.models';
import moduleErrorDialog from '@/store/modules/store.errorDialog.module';
import {moduleUser} from '@/store/modules/store.user.module';
import {StoreRickAndMortyModule} from '@/store/modules/store.rick-and-morty.module';
import moduleSimpleDialog from '@/store/modules/store.simpleDialog.module';

Vue.use(Vuex);

const store: Store<IState> = new Vuex.Store<IState>({
  strict: true,
  state: {},
  getters: {},
  mutations: {
    initialiseStore(state) {
      // Check if the store exists
      if(localStorage.getItem('store')) {
        // Replace the state object with the stored item
        this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('store') || ''))
        );
      }
    }
  },
  actions: {

  },
  modules: {
    errorDialog: moduleErrorDialog,
    simpleDialog: moduleSimpleDialog,
    user: moduleUser,
    rickAndMorty: StoreRickAndMortyModule
  },
});

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
