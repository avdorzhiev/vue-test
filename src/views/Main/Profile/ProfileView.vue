<template>
  <div class="profile-view">
    <div class="profile-view__avatar" v-if="!loading">
      <ImagePreview :src="userData.avatar" alt="Image" width="250"/>
    </div>
    <div class="profile-view__info" v-if="!loading">

      <Card>
        <template #header>Info:</template>
        <template #content>
          <table>
            <tr>
              <td class="label">Name</td>
              <td class="value">{{ fullName }}</td>
            </tr>
            <tr>
              <td class="label">Date of Birth</td>
              <td class="value">{{ dob }}</td>
            </tr>
          </table>
        </template>
      </Card>

      <Card>
        <template #header>Contacts:</template>
        <template #content>
          <table>
            <tr>
              <td class="label">Email</td>
              <td class="value">{{ userData.email }}</td>
            </tr>
            <tr>
              <td class="label">Phone</td>
              <td class="value">{{ userData.phone }}</td>
            </tr>
          </table>
        </template>
      </Card>
    </div>
    <ProgressSpinner v-if="loading"/>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import axios, {AxiosResponse} from 'axios';
import {HttpClass} from '@/plugins/http.plugin';
import {UserType} from '@/views/Main/Profile/types/userType';

type TDob = {
  day: string,
  month: string,
  year: string,
}

type TUserInfo = {
  firstName: string;
  lastName: string;
  dob: string; // YYYY-MM-DDTHH:MM-SS.Tz
  email: string;
  phone: string;
  avatar: string;
}

@Component
export default class ProfileView extends Vue {

  loading: boolean = true;
  userData: TUserInfo = {
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    avatar: '',
  };

  mounted() {
    // Init User

    this.$http.get<UserType>('https://randomuser.me/api/')
        .then((data: UserType) => {
          const info = data.results[0];
          this.userData = {
            firstName: info.name.first,
            lastName: info.name.last,
            dob: info.dob.date,
            email: info.email,
            phone: info.phone,
            avatar: info.picture.large,
          }
        })
        .catch(error => HttpClass.displayErrorHandler(error, this.$store))
        .finally(() => this.loading = false)
  }

  get fullName(): string {
    console.log(this.userData.firstName + ' ' + this.userData.lastName);
    return this.userData.firstName + ' ' + this.userData.lastName
  }

  get dob(): string {
    const [year, month, day]: number[] = (this.userData.dob.split('T'))[0].split('-').map(v => Number(v));
    const date = new Date(year, month, day)
    return date.toLocaleString('en', {day: '2-digit',month: 'long', year: 'numeric'})
  }
}
</script>

<style lang="less">
  .profile-view {
    display: flex;
    flex-direction: column;
    align-items: center;

    .p-card {
      margin-top: 20px;

      table {
        text-align: left;
        .label {
          font-weight: bold;
          padding-right: 20px;
        }
      }
    }
  }
</style>
