import Vue from 'vue'
import Vuex, {Store} from 'vuex'
import {IState} from '@/store/models';
import moduleErrorDialog from '@/store/store.errorDialog';

Vue.use(Vuex)

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
    errorDialog: moduleErrorDialog
  },
})

store.subscribe((mutation, state) => {
  // Store the state object as a JSON string
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
