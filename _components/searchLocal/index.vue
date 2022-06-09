<template lang="">
  <q-input borderless standout dense rounded style="max-width: 100%"
    color="primary" :placeholder="`${$tr('ifly.cms.label.search',{capitalize : true})}...`"
    class="q-my-md q-ml-md q-mr-xs search" @input="$emit('value', value)" v-model="value">
    <template v-slot:prepend>
      <q-icon color="primary" class="q-pl-sm" name="search" />
    </template>
  </q-input>
</template>
<script>
export default {
  data(){
    return{
      value: null
    }
  }
}
</script>
<style lang="stylus" scoped>
  .search
      background #e9edf6
      border-radius 99px
</style>