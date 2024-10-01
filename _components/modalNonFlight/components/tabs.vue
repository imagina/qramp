<script>
import tabController from '../controllers/tabs.controller'
export default {
    setup() {
        return { ...tabController() }
    }
}
</script>
<template>
    <q-btn-toggle
        v-if="validateNoFligth"
        rounded unelevated
        :modelValue="selectedTab"
        @update:modelValue="handleChangesTab"
        toggle-color="secondary"
        color="grey-2" 
        size="14px"
        text-color="grey-8"
        class="tw-mb-4 btn-toggle-element-content"
        :options="tapOptions"
        no-caps
        spread
    >
        <template v-slot:one>
            <q-tooltip v-if="isAppOffline">
                Disabled in offline mode
            </q-tooltip>
            <help-text
                class="tw-ml-2"
                @click.native.stop
                :iconColor="iconColorToggle ? 'white' : 'light-blue-8'"
                description="
                    Search and select previous flight that was 
                    completed to add additional services missed 
                    previously.
                " 
            />
        </template>

        <template v-slot:two>
            <help-text
                class="tw-ml-2"
                @click.native.stop
                :iconColor="!iconColorToggle ? 'white' : 'light-blue-8'"
                description="
                    Click to create a new non-flight-work order. 
                    This type of work order is used for services 
                    that are not related to a specific flight.
                " 
            />
        </template>
    </q-btn-toggle>
</template>
<style>
    .btn-toggle-element-content > button {
        @apply tw-w-auto sm:tw-w-60 !important;
    }

    .btn-toggle-element-content > button > span:nth-child(2) > span {
        display: grid;
        grid-template-columns: 1fr auto;
    }
</style>