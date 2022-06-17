<template>
  <div>
    <ErrorDialog></ErrorDialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ErrorDialog from '@/components/MyDialogs/ErrorDialog/ErrorDialog.vue';

@Component({
  components: {
    ErrorDialog
  }
})
export default class MyDialogs extends Vue {

}

</script>
