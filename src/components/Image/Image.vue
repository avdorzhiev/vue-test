<template>
  <div class="view-form">
    <Skeleton :width="width + 'px'" :height="height + 'px'" v-if="loading"></Skeleton>
    <ImagePreview v-bind="$attrs" :width="width" :height="height" :loadend="loaded()" v-show="!loading"></ImagePreview>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

const ImageProps = Vue.extend({
  props: {
    preview: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: null,
    },
    styles: {
      type: String,
      default: null,
    },
    imageStyle: {
      type: String,
      default: null,
    },
    imageClass: {
      type: String,
      default: null,
    },
  }
});

@Component
export default class MyImage extends Vue {

  loading = true;
  @Prop({type: Number, required: true,default: 128,}) width!: number;
  @Prop({type: Number, required: true,default: 128,}) height!: number;

  loaded() {
    setTimeout(() => this.loading = false, 3000);
  }
}

</script>


<style lang="less">
</style>
