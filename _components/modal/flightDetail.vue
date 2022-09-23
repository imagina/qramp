<template>
  <master-modal v-model="visibleMapModal" v-bind="modalProps" :persistent="true" :loading="loading" @hide="close">
    <div v-if="!loading" class="flight-map tw-mx-auto tw-p-3">
      <div class="md:tw-flex tw-mb-6 md:tw-space-x-4">
        <div class="rw-grow">
          <div class="tw-flex">
            <div class="tw-grow">
              <p class="tw-text-2xl tw-mb-2">ABX Air 1234</p>
              <p class="tw-uppercase tw-text-gray-400">ax3123123 / gdasad56</p>
              <a class="
                  tw-text-xs
                  tw-mb-2
                  tw-block
                  tw-font-semibold
                  tw-underline
                  tw-decoration-dashed
                  tw-text-blue-400
                " href="">Make a category upgrade to see the registration number</a>
              <p class="tw-text-yellow-600 tw-uppercase tw-text-xl tw-font-bold">in flight to</p>
              <p class="tw-text-yellow-600 tw-text-base">Landing in 1 hour 37 minutes</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tw-flex tw-flex-col md:tw-flex-row tw-justify-between tw-space-x-4">
        <div class="tw-mb-3">
          <p class="tw-text-xl tw-uppercase">Den</p>
          <p class="tw-text-lg tw-uppercase tw-font-bold">DENVER, CO</p>
          <p class="tw-text-sm">detachment from</p>
          <a class="
              tw-text-base
              tw-mb-2
              tw-block
              tw-font-bold
              tw-underline
              tw-decoration-dotted
              tw-text-blue-400
            ">int'l de denver - <span class="tw-font-bold tw-uppercase">DEN</span></a>
          <p class="tw-text-lg tw-uppercase">TUESDAY 20 09 2022</p>
          <p class="tw-text-lg">
            <span class="tw-font-bold">02:16PM MDT</span>
            <span class="text-positive"> (on schedule)</span>
          </p>
        </div>
        <div class="tw-text-right">
          <p class="tw-text-xl tw-uppercase">iln</p>
          <p class="tw-text-lg tw-uppercase tw-font-bold">wilmington, Ch</p>
          <p class="tw-text-sm">landing on</p>
          <a class="
              tw-text-base
              tw-mb-2
              tw-block
              tw-font-bold
              tw-underline
              tw-decoration-dotted
              tw-text-blue-400
            ">int'l de denver - <span class="tw-font-bold tw-uppercase">ILN</span></a>
          <p class="tw-text-lg tw-uppercase">TUESDAY 20 09 2022</p>
          <p class="tw-text-lg">
            <span class="tw-text-yellow-600"> (delayed 16 minutes) </span>
            <span class="tw-font-bold">02:16PM MDT</span>
          </p>
        </div>
      </div>
      <div class="tw-mt-6 ">
        <q-range v-model="standard" color="positive" :min="0" :max="100" readonly left-thumb-color="tw-left-thumb"
          right-thumb-color="tw-right-thumb"/>
      </div>
      <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-place-items-stretch tw-mb-6 tw-text-gray-500">
        <div class="tw-text-sm">
          <span class="tw-font-bold">313 my</span> already traveled
        </div>
        <div class="tw-text-sm tw-text-center">
          <span class="tw-font-bold">2h 13 min</span> total travel time
        </div>
        <div class="tw-text-sm text-right">
          <span class="tw-font-bold">313 my</span> to go
        </div>
      </div>
    </div>
    <div class="tw-flex tw-justify-center">
      <!--<flightMap v-if="!loading" />-->
      <img v-if="!loading" class="img-map" :src="imgMap" alt="" srcset="" />
      <div v-if="loading" class="tw-w-64 tw-h-64" />
    </div>
  </master-modal>
</template>

<script>
import qRampStore from "../../_store/qRampStore.js";
import flightMap from '../flightMap/flightMap.vue';

export default {
  components: {
    flightMap,
  },  
  data() {
    return {
      standard: {
        min: 0,
        max: 80,
      },
    }
  },
  computed: {
    visibleMapModal: {
      get() {
        return qRampStore().getVisibleMapModal();
      },
      set(value) {
        qRampStore().setVisibleMapModal(value);
      },
    },
    imgMap() {
      return qRampStore().getFlightMap();
    },
    loading() {
      return qRampStore().getLoadingModalMap();
    },
    modalProps() {
      return {
        width: "90vw",
        title: "Flight Map",
      };
    },
  },
  methods: {
    close() {
      this.visibleMapModal = false;
      qRampStore().setFlightMap(null);
    },
  },
};
</script>

<style>
.flight-map .q-slider__thumb, 
.flight-map .q-slider__track-container, .q-slider__selection {
  @apply tw-relative;
}

.flight-map .q-slider__thumb:last-child:before {
  @apply tw-absolute tw-z-10 tw-text-2xl;
  font-family: "Font Awesome 6 Sharp";
  content: "\f072";
  color: var(--q-color-positive);
  top: -10px;
  text-shadow: -1px -1px 1px rgba(255, 255, 255, .1), 1px 1px 1px rgba(0, 0, 0, .5);
  text-shadow: 0px 9px 5px #607d8b, 0px -4px 10px rgb(255 255 255 / 30%);
}

.flight-map .img-map {
  width: 70vw;
  height: 500px;
  border-radius: 10px;
}

.flight-map .text-tw-left-thumb,
.flight-map .q-slider__thumb-shape {
  @apply tw-hidden;
}

.flight-map .tw-underline.tw-decoration-dotted {
  text-underline-offset: 3px;
  text-decoration-style: dotted;
}

.flight-map .tw-underline.tw-decoration-dashed {
  text-underline-offset: 3px;
  text-decoration-style: dashed;
}

.flight-map .q-slider__track-container:before,
.flight-map .q-slider__track-container:after { 
  content: '';
  width: 15px;
  height: 15px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  box-shadow: 0px 0px 10px 2px #a2b1b9;
}

.flight-map .q-slider__track-container:before {
  @apply tw-left-0;
  background-color: var(--q-color-positive);
}

.flight-map .q-slider__track-container:after {
  @apply tw-bg-gray-400 tw-right-0;
}
.flight-map .q-slider__inner {
  @apply tw-bg-gray-400;
}
</style>