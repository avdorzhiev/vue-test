<template>
  <div class="view-form">
    <table class="view-form__table">
      <tr v-for="(key, index) in keys" :key="index">
        <td>{{key}}</td>
        <td>{{data[key]}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class ViewForm extends Vue {
  @Prop({default: {}, type: Object, required: true}) data!: Object;

  get keys(): string[] {
    return Object.keys(this.data);
  }
}

</script>

<style lang="less">
  .view-form {
    &__table {
      width: 100%;
      text-align: left;

      tr {
        td:first-child {
        }
        td:last-child {
          font-weight: bold;
        }
      }
    }
  }
</style>
