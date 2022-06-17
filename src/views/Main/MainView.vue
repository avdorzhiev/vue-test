<template>
  <div class="main-view">
    <Menu :model="menus"/>
    <transition name="fade" mode="out-in">
      <router-view class="main-view__content"></router-view>
    </transition>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {loggedNameRoutesEnum, notLoggedNameRoutesEnum} from '@/router/enums';


@Component
export default class MainView extends Vue {

  get menus() {
    return [
      {
        items: [
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
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this.$auth.logout();
              this.$router.push({name: notLoggedNameRoutesEnum.login});
            }
          }
        ]
      },
    ]
  }

}
</script>

<style lang="less">
  .main-view {
    display: flex;
    width: 100%;
    .p-menu {
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
      padding: 20px;
    }
  }
</style>
