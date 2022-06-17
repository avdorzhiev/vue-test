<template>
  <div id="app">
    <nav>
      <Button
          class="p-button-text mr-2"
          v-for="btn in getActiveButtons()"
          @click="goToPage(btn.routerName)"
          :label="btn.label"
          :disabled="btn.disabled"
      />
    </nav>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <my-dialogs></my-dialogs>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from "vue-property-decorator";
import RegisterButton from "@/components/Login/RegisterButton.vue";
import {commonNameRoutesEnum, loggedNameRoutesEnum, notLoggedNameRoutesEnum} from "@/router/enums";
import MyDialogs from '@/components/MyDialogs/MyDialogs.vue';


interface IButton {
  routerName: string,
  label: string,
  active: boolean,
  disabled?: boolean;
}

@Component({
  beforeCreate() {
    this.$store.commit('initialiseStore')
  },
  components: {
    MyDialogs,
  }
})
export default class AppView extends Vue {

  goToPage(routerName: string) {
    if (this.$route.name !== routerName) {
      this.$router.push({name: routerName});
    }
  }

  getActiveButtons(): IButton[] {
    return this.getRouterButtons().filter(btn => btn.active);
  }

  private getRouterButtons(): IButton[] {
    return [
      {
        routerName: commonNameRoutesEnum.home,
        label: 'Home',
        active: true,
      },
      {
        routerName: commonNameRoutesEnum.about,
        label: 'About',
        active: true,
      },
      {
        routerName: notLoggedNameRoutesEnum.login,
        label: 'Login',
        active: !this.$auth.isLogin(),
      },
      {
        routerName: loggedNameRoutesEnum.main,
        label: 'Main',
        active: this.$auth.isLogin(),
      },
    ]

  }

}
</script>

<style lang="less">

body {
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
