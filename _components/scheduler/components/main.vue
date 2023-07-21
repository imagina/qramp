<template>
    <div>
        <crud 
          :crudData="import('../../../_crud/scheduler.vue')" 
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
    }
})
</script>

<style scoped>

</style>