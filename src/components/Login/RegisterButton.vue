<template>
  <div>
    <Button label="Registration" class="p-button-text" @click="openRegisterForm()"/>
    <Dialog :visible.sync="display"
            :modal="true"
            :dismissableMask="true"
            :container-style="{width: '400px'}"
            header="Register Form">
      <form>
        <div class="item">
          <div class="field">
            <h5>Username</h5>
            <InputText
                id="username-help"
                v-model="username"
                type="username"
                aria-describedby="username-help"
                autofocus
                :class="isValidUsername ? 'p-valid' : 'p-invalid'"
            />
            <small id="username-help" class="p-invalid" v-show="!isValidUsername">Username is not available.</small>
          </div>
        </div>

        <div class="item">
          <h5>Password</h5>
          <Password
              id="registerPassword"
              v-model="password"
              style="width: 100%"
              toggleMask
              :class="isValidPassword ? 'p-valid' : 'p-invalid'"
          >
          </Password>
        </div>

        <div class="item">
          <h5>Enter Password Again</h5>
          <Password
              id="registerPassword2"
              v-model="password2"
              toggleMask
              style="width: 100%"
              :class="isValidPassword2 ? 'p-valid' : 'p-invalid'"
              :feedback="false"
          >
          </Password>
        </div>
      </form>

      <template #footer>
        <Button label="Close" icon="pi pi-times" @click="closeRegisterForm()" class="p-button-text"/>
        <Button label="Register" icon="pi pi-check" @click="registerUser()" :disabled="!canRegisterUser()"/>
      </template>
    </Dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {IUser, RegisterFormEventEnum} from '@/views/Login/view.login.models';

const RegisterButtonProps = Vue.extend({
  props: {
    users: {
      default: [],
      required: true,
      validator(value: IUser[]): boolean {
        return value.every((user: IUser, userIndex: number, arr: IUser[]) =>
            arr.findIndex((item, i) => i !== userIndex && item.username === user.username) !== userIndex
        )
      }
    },
  },
})

@Component
export default class RegisterButton extends RegisterButtonProps {

  username: string = '';
  password: string = '';
  password2: string = '';
  display: boolean = false;
  isValidUsername: boolean = true;
  isValidPassword: boolean = true;
  isValidPassword2: boolean = true;

  openRegisterForm() {
    this.display = true;
  }

  closeRegisterForm() {
    this.username = '';
    this.password = '';
    this.display = false;
  }

  onFocusOutUsername() {
    console.log('onFocusOutUsername')
    this.isValidUsername = this.checkUsername();
  }

  onFocusOutPassword() {
    console.log('onFocusOutPassword')
    this.isValidPassword = this.checkPassword();
  }

  onFocusOutPassword2() {
    console.log('onFocusOutPassword2')
    this.isValidPassword2 = this.checkPassword2();
  }

  registerUser() {
    console.log('hehe');
    this.$emit(RegisterFormEventEnum['register-new-user'], {
      username: this.username,
      password: this.password,
    })
    this.closeRegisterForm();
  }

  checkUsername(): boolean {
    return this.users.every((user: IUser) => {
      // console.log(user.username === this.username, user.username, this.username)
      return user.username !== this.username
    });
  }

  checkPassword(): boolean {
    return this.password.length > 0;
  }

  checkPassword2(): boolean {
    return this.password === this.password2;
  }

  canRegisterUser(): boolean {
    return this.checkUsername() && this.checkPassword() && this.checkPassword2();
  }

}

</script>
