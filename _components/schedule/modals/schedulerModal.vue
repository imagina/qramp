<template>
  <master-modal
      v-model="show"
      :title="title"
      :persistent="true"
      :loading="loading"
      @hide="hideModal"
      :maximized="$q.screen.lt.md"
  >


  </master-modal>
</template>

<script>
export default {
name: "schedulerModal",
  data() {
    return {
      show: false,
      loading: false,
      title: null,
      form: {},
      isEdit: false,
      dataLoad: false,
    };
  },
}
</script>

<style scoped>

</style>