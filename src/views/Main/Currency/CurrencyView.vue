<template>
  <div class="currency-view">
    <Carousel :value="currencies" :circular="true" :numVisible="10" v-if="!loading">
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
    <progress-spinner v-if="loading"></progress-spinner>
  </div>
</template>

<script lang="ts">

import {Component, Vue} from 'vue-property-decorator';
import {HttpClass} from '@/plugins/http.plugin';


@Component
export default class CurrencyView extends Vue {

  loading: boolean = true;
  currencies: any[] = [];

  mounted() {
    this.$http.get('https://api.exchangerate.host/symbols')
        .then((data) => this.currencies = Object.values(data.symbols))
        .catch(error => HttpClass.displayErrorHandler(error, this.$store))
        .finally(() => this.loading = false)
  }
}
</script>

<style lang="less">
</style>
