<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    items: {
        label: string,
        action: () => void
    }[]
}>();

</script>
<template>
    <q-btn-dropdown
        class="btn-dropdown-plus"
        icon="fa-light fa-plus tw-text-blue-500"
        size="sm"
        outline
        unelevated
        flat
        dense
        no-icon-animation
    >
        <q-list>
            <template v-for="item in items">
                <q-item
                    clickable 
                    v-close-popup 
                    @click="item.action"
                >
                    <q-item-section>
                        <q-item-label>{{ item.label }}</q-item-label>
                    </q-item-section>
                </q-item>
            </template>
        </q-list>
    </q-btn-dropdown>
</template>