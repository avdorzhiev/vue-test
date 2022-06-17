<template>
  <div class="currency-view">
    <Carousel :value="currencies" :circular="true" :numVisible="10">
      <template #header>
        <h5>Currency</h5>
      </template>
      <template #item="slotProps">
          <div>
            <h4>{{slotProps.data.code}}</h4>
            <h6>{{slotProps.data.description}}</h6>
          </div>
      </template>
    </Carousel>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import axios from 'axios';
import {HttpClass} from '@/plugins/http.plugin';


@Component
export default class CurrencyView extends Vue {

  loading: boolean = true;
  currencies: any[] = [];

  mounted() {
    axios.get('https://api.exchangerate.host/symbols')
        .then((response) => this.currencies = Object.values(response.data.symbols))
        .then(() => console.log(this.currencies))
        .catch(error => HttpClass.displayErrorHandler(error, this.$store))
        .finally(() => this.loading = false)
  }
}
</script>

<style lang="less">
</style>
