<template>
  <div>
    <Dialog :visible="displayFlag"
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
import {Component, Prop, PropSync, Vue} from 'vue-property-decorator';
import {IUser, RegisterFormEventEnum} from '@/views/Login/view.login.models';

const RegisterButtonProps = Vue.extend({
  props: {
    users: {
      default: [],
      required: true,
      validator(value: IUser[]): boolean {
        return value.every((user: IUser, userIndex: number, arr: IUser[]) =>
            arr.findIndex((item, i) => i !== userIndex && item.username === user.username) !== userIndex
        );
      }
    },
  },
});

@Component
export default class RegisterButton extends RegisterButtonProps {
  @PropSync('display') displayFlag!: boolean

  username = '';
  password = '';
  password2 = '';
  //display: boolean = false;
  isValidUsername = true;
  isValidPassword = true;
  isValidPassword2 = true;


  closeRegisterForm() {
    this.username = '';
    this.password = '';
    this.displayFlag = false;
  }

  registerUser() {
    this.$emit('register-new-user', {
      username: this.username,
      password: this.password,
    });
    this.closeRegisterForm();
  }

  checkUsername(): boolean {
    return this.users.every((user: IUser) => {
      return user.username !== this.username;
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
