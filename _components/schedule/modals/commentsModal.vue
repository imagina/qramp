<template>
  <master-modal
    v-model="visible"
    title="Comments"
    :persistent="true"
    :loading="loading"
    @hide="hideModal"
    width="60%"
    :maximized="$q.screen.lt.md"
  >
    <comments
      v-if="commentableId > 0"
      apiRoute="apiRoutes.qramp.comments"
      :commentableId="Number(commentableId)"
      commentableType="Modules\Ramp\Entities\WorkOrder"
      permisionComments="ramp.work-orders-comments"
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
    isCrud: {
      type: Boolean,
      default: () => false,
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
      if(this.isCrud) this.$root.$emit('crud.data.refresh');
    },
    showModal() {
      this.visible = true;
    },
  },
};
</script>