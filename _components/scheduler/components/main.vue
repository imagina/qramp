<template>
    <div>
        <crud 
          :crudData="import(`${path}`)" 
        />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        const path: string = '../../../_crud/scheduler.vue';

        return {path}
    }
})
</script>

<style scoped>

</style>