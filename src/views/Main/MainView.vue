<template>
  <div class="main-view">
      <router-view class="main-view__content"></router-view>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {commonNameRoutesEnum, loggedNameRoutesEnum, notLoggedNameRoutesEnum} from '@/router/enums';


@Component
export default class MainView extends Vue {

  visibleMenu: boolean = false;

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
        separator: true
      },
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        command: () => {
          if (this.$route.name !== commonNameRoutesEnum.home) {
           this.$router.push({name: commonNameRoutesEnum.home});
          }


        }
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info',
        command: () => {
          if (this.$route.name !== commonNameRoutesEnum.about) {
           this.$router.push({name: commonNameRoutesEnum.about});
          }
        }
      },
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.$auth.logout();
          this.$router.push({name: notLoggedNameRoutesEnum.login});
        }
      }
    ]
  }
}
</script>

<style lang="less">
.main-view {
  display: flex;
  width: 100%;
  position: relative;
  height: calc(100vh - 40px);
  .sidebar-button {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
  }

  .p-tieredmenu {
    flex: 0;
    min-width: 200px;
    width: auto;
    height: 100%;
    text-align: center;
  }

  &__content {
    flex: 1;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: auto;
  }
}
</style>
