<script>
import useBillingClosedDate from '../use/useBillingClosedDate'

export default {
  name: 'billingClosedDate',
  props: {
    items: {
      type: Object,
      default: () => ({})
    },
    loading: Boolean,
    cardParams: {}
  },
  setup(props) {
    return { ...useBillingClosedDate(props) }
  },
}
</script>
<template>
  <div class="tw-flex tw-justify-center">
    <div>
      <div>
        <div class="text-center tw-mb-6">
          <span v-if="lastBillingClosingDate">
            Last billing closing date: <b>{{ lastBillingClosingDate }}</b>
          </span>
          <br />        
          <span v-if="by">
            Update by: <b>{{ by }}</b>
          </span>  
        </div>
      </div>  
      <div class="tw-w-96 col-12 text-center">
        <dynamic-field
          v-model="billingClosedDate"
          :field="{ type: 'date' }"
        />
        <q-btn
          @click="markAsSync"
          :loading="isLoading"
          class="tw-mt-2"
          no-caps
          rounded
          color="secondary"
          :label="cardParams.buttonLabel"
          size="md"
          unelevated
        />
      </div>
    </div> 
  </div>
</template>
  