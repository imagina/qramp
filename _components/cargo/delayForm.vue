<template>
    <div class="tw-grid tw-grid-cols-2 tw-gap-4 tw-px-6">
        <dynamic-field
            :field="fields.ourDelay"
            v-model="ourDelay"
          />
          <dynamic-field
            :field="fields.delayComment"
            v-model="delayComment"
          />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import storeCargo from './store/cargo'

export default defineComponent({
    setup () {
        const fields = computed(() => ({
             ourDelay: {
                value: null,
                type: 'select',
                props: {
                    label: 'Our delay',
                    sortOptions: false,
                    options: [
                        {
                         label: 'Yes',
                         value: '1'
                        },
                        {
                         label: 'No',
                         value: '2'
                        },
                        {
                         label: 'Partial',
                         value: '3'
                        },
                    ]
                },
            },
            delayComment: {
                value: null,
                type: 'input',
                props: {
                    label: 'Delay Comment',
                    type: 'textarea'
                },
            }
        }))
        const ourDelay = computed({
            get: () => storeCargo().getOurDelay(),
            set: (value) => {
                storeCargo().setOurDelay(value);
            }
        })
         const delayComment = computed({
            get: () => storeCargo().getDelayComment(),
            set: (value) => {
                storeCargo().setDelayComment(value);
            }
        })
        return {fields, ourDelay, delayComment}
    }
})
</script>

<style scoped>

</style>