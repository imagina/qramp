<template>
    <div>
        <kanbanBoard />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import kanbanBoard from './components/kanbanBoard.vue'

export default defineComponent({
    components: {
        kanbanBoard,
    },
    setup () {
        return {}
    }
})
</script>

<style scoped>

</style>