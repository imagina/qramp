<template>
  <q-form ref="cargoRef">
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
  </q-form>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import storeCargo from './store/cargo'
import qRampStore from "src/modules/qramp/_store/qRampStore";
import { i18n } from 'src/plugins/utils.ts'

export default defineComponent({
    setup () {
        const cargoRef = ref<any>(null);
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
                    ...validateRules.value,
                    label: 'Delay Comment',
                    type:"textarea",
                },
            }
        }))
        const validateRules = computed(() => {
          if(!qRampStore().getIsPassenger()) return {};
          const validateDelayComment = storeCargo().getDelayList().some((item) => item.code && item.code.startsWith("99"));
          const rules = qRampStore().getIsPassenger() && validateDelayComment ? {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ]
          } : {};
          if(validateDelayComment) {
            cargoRef.value?.validate().then()
          } else {
            cargoRef.value?.reset()
          }
          storeCargo().setError(validateDelayComment);
          return rules;
        })

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
                if(value) {
                  storeCargo().setError(false);
                }
            }
        })
        return {fields, ourDelay, delayComment, cargoRef}
    }
})
</script>

<style scoped>

</style>
