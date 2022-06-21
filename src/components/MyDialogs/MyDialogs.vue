<template>
  <div>
    <ErrorDialog></ErrorDialog>
    <SimpleDialog></SimpleDialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import ErrorDialog from '@/components/MyDialogs/ErrorDialog.vue';
import SimpleDialog from '@/components/MyDialogs/SimpleDialog.vue';

@Component({
  components: {
    ErrorDialog,
    SimpleDialog
  }
})
export default class MyDialogs extends Vue {

}

</script>
