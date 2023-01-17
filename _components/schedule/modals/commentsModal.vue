<template>
  <master-modal
    v-model="visible"
    title="Comments"
    :persistent="true"
    :loading="loading"
    :actions="actions"
    @hide="hideModal"
    width="60%"
    :maximized="$q.screen.lt.md"
  >
    <comments
      v-if="commentableId"
      apiRoute="apiRoutes.qramp.comments"
      :commentableId="Number(commentableId)"
      commentableType="Modules\Ramp\Entities\WorkOrder"
      class="tw-py-4"
    />
  </master-modal>
</template>

<script>
import comments from "@imagina/qsite/_components/master/comments/index.vue";

export default {
  components: { comments },
  props: {
    commentableId: {
      type: Number,
      default: () => 0,
    },
  },
  data: () => ({
    visible: false,
    loading: false,
    stationId: null,
  }),
  computed: {},
  methods: {
    hideModal() {
      this.visible = false;
    },
    showModal() {
      this.visible = true;
    },
  },
};
</script>