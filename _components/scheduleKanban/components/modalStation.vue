<template>
    <master-modal
      v-model="showModalStation"
      title="Filter schedule"
      :persistent="true"
      :loading="loading"
      :actions="actions"
      hideCloseAction
      :maximized="$q.screen.lt.md"
    >
      <dynamic-field :field="fields.banner" />
      <q-form ref="modalStation">
        <dynamic-field :field="fields.stationId" v-model="stationId" />
      </q-form>
    </master-modal>
  </template>
<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import useModalStation from '../uses/useModalStation'

export default defineComponent({
  setup (props) {
    const proxy = (getCurrentInstance() as any).proxy as any;
    return {...useModalStation(props, proxy)}
  }
})
</script>
<style scoped>

</style>