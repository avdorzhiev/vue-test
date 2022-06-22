<template>
  <div id="app">
    <nav v-if="!isLogin()">
      <Button
          class="p-button-text mr-2"
          v-for="(btn, index) in getActiveButtons()"
          @click="goToPage(btn.routerName)"
          :key="index"
          :label="btn.label"
          :disabled="btn.disabled"
      />
    </nav>
    <div v-if="isLogin()">
      <Button @click="visibleMenu=true" v-if="!visibleMenu" class="pi p-button-text pi-arrow-right sidebar-button"></Button>
      <Sidebar :visible.sync="visibleMenu" :baseZIndex="1000" position="left">
        <TieredMenu :model="menus" />
      </Sidebar>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>

    <my-dialogs></my-dialogs>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {commonNameRoutesEnum, loggedNameRoutesEnum, notLoggedNameRoutesEnum} from '@/router/enums';
import MyDialogs from '@/components/MyDialogs/MyDialogs.vue';
import MyImage from '@/components/Image/Image.vue';
import ViewForm from '@/components/Form/ViewForm.vue';


interface IButton {
  routerName: string,
  label: string,
  active: boolean,
  disabled?: boolean;
}

@Component({
  beforeCreate() {
    this.$store.commit('initialiseStore');
  },
  components: {
    MyDialogs,
  }
})
export default class AppView extends Vue {

  visibleMenu = false;

  get menus() {
    return [
      {
        label: 'Profile',
        icon: 'pi pi-refresh',
        command: () => {
          if (this.$route.name !== loggedNameRoutesEnum.profile) {
            this.$router.push({name: loggedNameRoutesEnum.profile});
          }
        }
      },
      {
        label: 'Currency',
        icon: 'pi pi-money-bill',
        command: () => {
          if (this.$route.name !== loggedNameRoutesEnum.currency) {
            this.$router.push({name: loggedNameRoutesEnum.currency});
          }
        }
      },
      {
        label: 'Rick And Morty',
        icon: 'pi pi-table',
        command: () => {
          if (this.$route.name !== loggedNameRoutesEnum.rickAndMorty) {
            this.$router.push({name: loggedNameRoutesEnum.rickAndMorty});
          }
        }
      },
      {
        separator: true
      },
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          if (this.$route.name !== commonNameRoutesEnum.home) {
            this.$router.push({name: commonNameRoutesEnum.home});
          }
        }
      },
      {
        label: 'About',
        icon: 'pi pi-info',
        command: () => {
          if (this.$route.name !== commonNameRoutesEnum.about) {
            this.$router.push({name: commonNameRoutesEnum.about});
          }
        }
      },
      {
        separator: true
      },
      {
        label: 'Logout',
        icon: 'pi pi-power-off',
        command: () => {
          this.$auth.logout();
          this.$router.push({name: notLoggedNameRoutesEnum.login});
        }
      }
    ];
  }

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
    ];
  }

  isLogin(): boolean {
    return this.$auth.isLogin();
  }

}
</script>

<style lang="less">

body {
  max-height: 100%;
  max-width: 100%;
  height: auto;
  width: auto;
  background-color: #1f1e1e;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  height: 100%;
  position: relative;

  .sidebar-button {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    z-index: 100;
  }
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    //color: #2c3e50;

    &.router-link-exact-active {
      //color: #42b983;
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
