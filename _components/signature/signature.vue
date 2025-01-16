<template>
  <div id="signatureForm">
    <div id="signatureContainer" class="q-pa-md tw-mb-12">
      <div id="disableSignature" :class="readonly ? 'disableEdit': ''"></div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="row">
            <template
              v-for="(field, keyField) in fields.customer"
              :key="keyField"
            >
              <dynamic-field
                v-if="field.type === 'signature'"
                id="sig1"
                :field="field"
                class="col-12 q-px-sm"
                v-model="form[field.name || keyField]"
                @fullscreenAction="isFull ? cancelFullScreen('sig1') : launchFullScreen('sig1')"
              />
            </template>
          </div>
          <div class="row">
            <template
              v-for="(field, keyField) in fields.customer"
              :key="keyField"
            >
              <dynamic-field
                v-if="field.type !== 'signature'"
                :field="field"
                class="q-mt-sm q-pa-sm"
                :class="{
                  'col-12': !isDesktop,
                  'col-6': isDesktop
                }"
                v-model="form[field.name || keyField]"
              />
            </template>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="row">
            <template
              v-for="(field, keyField) in fields.representative"
              :key="keyField"
            >
              <dynamic-field
                id="sig2"
                v-if="field.type === 'signature'"
                class="col-12 q-px-sm"
                :field="field"
                v-model="form[field.name || keyField]"
                @fullscreenAction="isFull ? cancelFullScreen('sig2') : launchFullScreen('sig2')"
              />
            </template>
          </div>
          <div class="row">
            <template
              v-for="(field, keyField) in fields.representative"
              :key="keyField"
            >
              <dynamic-field
                v-if="field.type !== 'signature'"
                :field="field"
                class="q-mt-sm q-pa-sm"
                :class="{
                  'col-12': !isDesktop,
                  'col-6': isDesktop
                }"
                v-model="form[field.name || keyField]"
              />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { computed, inject, onMounted  } from 'vue'
import responsive from '../../_mixins/responsive.js'
import store from './store/index.store'
import { fields } from './model/fields'
import qRampStore from "../../_store/qRampStore";

export default {
  props: {
    readonly: true,
    toolbar: {}
  },
  mixins: [responsive],
  setup(props) {
    const form = computed({
      get: () => store.form,
      set: (value) => store.form = value
    })
    const isFull = computed({
      get: () => store.isFull,
      set: (value) => store.isFull = value
    })
    const isDesktop = computed(() => window.innerWidth >= '900')
    const readonly = computed(() => props.readonly)
    const disabledReadonly = qRampStore().disabledReadonly();

    onMounted(() => {
      store.disabledReadonly = disabledReadonly.value
      store.readonly = readonly.value
    })

    /**
     * Launches full screen mode for the provided element.
     * @param {string} name - The ID of the element
     * to launch full screen mode for.
     */
    const launchFullScreen = (name) => {
      const element = document.getElementById(name)
      if (element.requestFullScreen) {
        element.style.background = "#fff"
        isFull.value = true
        element.requestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.style.background = "#fff"
        isFull.value = true
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullScreen) {
        element.style.background = "#fff"
        isFull.value = true
        element.webkitRequestFullScreen();
      }
    }

    /**
     * Cancels full screen mode for the provided element.
     * @param {string} name - The ID of the element to cancel full screen mode for.
     */
    const cancelFullScreen = (name) => {
      const element = document.getElementById(name)
      if (document.cancelFullScreen) {
        element.style.background = "initial"
        isFull.value = false
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        element.style.background = "initial"
        isFull.value = false
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        element.style.background = "initial"
        isFull.value = false
        document.webkitCancelFullScreen();
      }
    }
    return {
      store,
      form,
      isFull,
      isDesktop,
      fields,
      launchFullScreen,
      cancelFullScreen,
    }
  }
}
</script>

<style>
#signatureContainer {
  @apply tw-relative;
}

#signatureContainer .disableEdit {
  @apply tw-absolute tw-bg-transparent tw-inset-0 tw-z-10;
}

#signatureContainer #vueSiganture .bg-grey-2 {
  @apply tw-h-64;
}

#signatureContainer #vueSiganture .bg-grey-2 img {
  @apply tw-object-contain tw-h-full !important;
}
</style>
