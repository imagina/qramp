<template>
    <div>
        <div v-for="(field, keyField) in fields.form" :key="keyField">
            <dynamic-field
                v-if="keyField !== 'sta' && keyField !== 'outboundScheduledDeparture'"
                :field="field"
                v-model="form[keyField]"
                @input="zanetizeData(keyField)"
                :class="{ 'tw-hidden': keyField === 'stationId' }"
            />
            <div v-if="isbound.inbound && keyField === 'sta'">
                <dynamic-field
                :field="field"
                v-model="form[keyField]"
                @input="zanetizeData(keyField)"
                :class="{ 'tw-hidden': keyField === 'stationId' }"
                />
            </div>
            <div v-if="isbound.outbound && keyField === 'outboundScheduledDeparture'">
                <dynamic-field
                    :field="field"
                    v-model="form[keyField]"
                    @input="zanetizeData(keyField)"
                    :class="{ 'tw-hidden': keyField === 'stationId' }"
                />
            </div>
        </div>         
        <div>
            <comments 
                v-if="form.id && permisionComments"
                apiRoute="apiRoutes.qramp.comments"
                :commentableId="Number(form.id)"
                commentableType="Modules\Ramp\Entities\WorkOrder"
                permisionComments="ramp.work-orders-comments"
                class="tw-py-4"
            />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModalSchedule from '../uses/useModalSchedule'
import comments from '@imagina/qsite/_components/master/comments/index.vue'

export default defineComponent({
  components: {
    comments,
  },
  setup (props, {emit}) {
    return {...useModalSchedule(props, emit)}
  }
})
</script>

<style scoped>

</style>