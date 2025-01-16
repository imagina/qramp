<template>
    <master-modal
        v-model="showModal"
        :title="titleModal"
        :persistent="true"
        custom-position
        :actions="actions"
        :loading="loading"
        @hide="clear"
    >
        <q-form>
            <section 
                v-for="(field, keyField) in fields.blockOne"
                :key="keyField"
            >
                <dynamic-field 
                    :field="field" v-model="form[keyField]" 
                    class="tw-mr-4"
                />
            </section>
            <section v-for="(groud, key) in fields.blockTwo" :key="key">
                <div  class="tw-mr-4">
                    <span 
                        v-if="groud.label"
                        class="tw-text-gray-600 tw-text-sm"
                    >
                        {{ groud.label }}
                    </span>
                    <div class="tw-grid md:tw-grid-cols-2 tw-gap-4 tw-mt-2">
                        <dynamic-field 
                            v-for="(field, keyField) in groud.fields"
                            :key="keyField"
                            :field="field" 
                            v-model="form[keyField]"  
                        />
                    </div>
                </div>
                <dynamic-field 
                    v-model="form[key]" 
                    :field="groud" 
                    class="tw-mr-4"
                />
            </section>
            <q-expansion-item 
                label="Intoplane"
                class="tw-text-gray-600"
                header-class="
                    tw-bg-gray-100 
                    tw-rounded-md 
                    tw-mb-4 
                    tw-text-base
                    tw-mr-4
                "
            >   
                <section class="tw-grid md:tw-grid-cols-2">
                    <div 
                        v-for="(field, keyField) in fields.blockThree"
                        :key="keyField" 
                        class="tw-mr-4"
                    >
                        <dynamic-field 
                            
                            v-model="form[keyField]" 
                            :field="field"
                        />
                    </div>
                </section>
            </q-expansion-item>
        </q-form>
    </master-modal>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import { fuelingController } from '../controllers/fueling.controller'

export default defineComponent({
  setup() {
   return { ...fuelingController() } 
  }
})

</script>

<style scoped></style>
