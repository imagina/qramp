<template>
    <div>
        <master-modal
          v-model="showModal"
          :title="titleModal"
          :persistent="true"
          :loading="loading"
          :width="widthModal"
          :actions="actions"
          @hide="clear"
        >
            <div>
                <createForm ref="refCreateForm" v-if="!isUpdate" @refresh-data="getDataTable()"/>
                <stepper  ref="refStepper" v-else />
            </div>
        </master-modal>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import modalFormController from "../controllers/modalForm";
import createForm from '../components/create.vue';
import stepper from '../components/stepper.vue';

export default defineComponent({
    components: {
        createForm,
        stepper,
    },
    emits: ['refresh-data'],
    setup(props, {emit}) {
        return { ...modalFormController(props, emit) };
    },
});
</script>

<style>
    .btn-action-fueling {
        @apply sm:tw-bg-transparent !important;
        color: #4C5D94;
        background-color: #F1F4FA;
    }

    .master-dialog__actions {
        padding: 0 12px 12px 12px;
    }

    .close-btn-bg-color {
        background-color: #49C0851A;
    }
</style>
