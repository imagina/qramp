<template>
  <div class="q-pa-md tw-bg-white tw-my-2 tw-cursor-move">
    <span>{{ card.title }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const onDeleteCard = () => {
      // Implementar la lógica para eliminar la tarjeta
    };

    return {
      onDeleteCard,
    };
  },
});
</script>

<style scoped></style>
