<template>
  <div class="view-form">
    <div v-for="key in keys">
      <div class="view-form__label">{{key}}</div>
      <div class="view-form__value">{{data[key]}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ErrorDialog from '@/components/MyDialogs/ErrorDialog/ErrorDialog.vue';
import {IUser} from '@/views/Login/view.login.models';

const ViewFormProps = Vue.extend({
  props: {
    data: {
      default: {},
      type: Object,
      required: true,
    }
  },
})

@Component
export default class ViewForm extends ViewFormProps {

  get keys(): string[] {
    return Object.keys(this.data);
  }
}

</script>
