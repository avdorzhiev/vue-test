<template>
  <div class="login-view">
    <form @submit.prevent="submit" autocomplete="off">
      <div class="item">
        <div class="p-float-label">
          <InputText id="username" type="text" v-model="username" v-on:keyup.enter="submit"/>
          <label for="username">Username</label>
        </div>
      </div>

      <div class="item">
        <div class="p-float-label">
          <Password id="password" v-model="password" :feedback="false" toggleMask style="width: 100%"  v-on:keyup.enter="submit"></Password>
          <label for="password">Password</label>
        </div>
      </div>

      <div class="help-items">
        <Button label="Forgot Password" class="p-button-text"/>
        <!--   Forgot Password Dialog     -->

        <registerButton :users="users" v-on="registerFormListeners"></registerButton>
      </div>


      <Button type="submit" label="Login" icon="pi-sign-in" icon-pos="right" :disabled="!canLogin()"/>
    </form>

    <Toast position="bottom-center"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import './styles.less';
import {RegisterFormEventEnum, IUser} from './view.login.models';
import RegisterButton from "../../components/Login/RegisterButton.vue";
import {loggedNameRoutesEnum} from "@/router/enums";



const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin';

const USER_USERNAME = 'user';
const USER_PASSWORD = 'qwerty'

const USERS: IUser[] = [
  {
    username: ADMIN_USERNAME,
    password: ADMIN_PASSWORD,
    id: 1
  },
  {
    username: USER_USERNAME,
    password: USER_PASSWORD,
    id: 2
  },
]

@Component({
  components: {
    RegisterButton,
  }
})
export default class LoginView extends Vue {

  username: string = '';
  password: string = '';
  users: IUser[] = USERS;
  registerFormListeners: { [key: string]: Function } = {
    [RegisterFormEventEnum['register-new-user']]: (event: { username: string, password: string }) => {
      this.users.push({
        username: event.username,
        password: event.password,
        id: this.users[this.users.length - 1].id + 1,
      })
    },
  };

  submit(): void {
    if (!this.canLogin()) {
      return;
    }
    const userId = this.userId;
    if (userId) {
      this.$auth.login(userId);
      this.$router.push({name: loggedNameRoutesEnum.main});
      this.username = '';
      this.password = '';
    } else {
      this.$toast.add({
        severity: 'Error',
        summary: 'Login Error',
        detail: 'Username or Password is incorrect',
        life: 5000
      });
      this.username = '';
      this.password = '';
    }
  }

  canLogin(): boolean {
    return this.username.length > 0 && this.password.length > 0;
  }

  private get userId(): number {
    const findUser = this.users.find(user => user.username === this.username);
    if (findUser && findUser.password === this.password) {
      return findUser.id;
    }
    return 0;
  }

}
</script>

<style>

</style>
