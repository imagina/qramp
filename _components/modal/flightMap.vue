<template>
  <master-modal
    v-model="visibleMapModal"
    v-bind="modalProps"
    :persistent="true"
    :loading="loading"
    @hide="close"
  >
    <div class="tw-container tw-mx-auto tw-mt-5 tw-px-3">
      <div class="md:tw-flex tw-mb-6 md:tw-space-x-4">
        <div class="rw-grow">
          <div class="tw-flex">
            <div class="tw-grow">
              <p class="tw-text-2xl tw-mb-2">ABX Air 1234</p>
              <p class="tw-uppercase">ax3123123 / gdasad56</p>
              <a
                class="
                  tw-text-sm
                  tw-mb-2
                  tw-block
                  tw-font-bold
                  tw-underline
                  tw-decoration-dashed
                  tw-underline-offset-2
                "
                href=""
                >Haz un ascenso de categoria para ver el numero de matricula</a
              >
              <p class="tw-uppercase tw-text-xl tw-font-bold">en vuelo hacia</p>
              <p class="tw-text-lg">Aterrizando en 1 hora 37 minutos</p>
            </div>
          </div>
        </div>
      </div>

      <div class="tw-flex tw-justify-between tw-space-x-4">
        <div>
          <p class="tw-text-xl tw-uppercase">Den</p>
          <p class="tw-text-lg tw-uppercase tw-font-bold">DENVER, CO</p>
          <p class="tw-text-sm">despego de</p>
          <a
            class="
              tw-text-base
              tw-mb-2
              tw-block
              tw-font-bold
              tw-underline
              tw-decoration-dotted
              tw-underline-offset-2
            "
            >int'l de denver - <span class="tw-font-bold tw-uppercase">DEN</span></a
          >
          <p class="tw-text-lg tw-uppercase">MARTES 20 09 2022</p>
          <p class="tw-text-lg">
            <span class="tw-font-bold">02:16PM MDT</span> (en horario)
          </p>
        </div>
        <div class="tw-text-right">
          <p class="tw-text-xl tw-uppercase">iln</p>
          <p class="tw-text-lg tw-uppercase tw-font-bold">wilmington, Ch</p>
          <p class="tw-text-sm">aterrizando en</p>
          <a
            class="
              tw-text-base
              tw-mb-2
              tw-block
              tw-font-bold
              tw-underline
              tw-decoration-dotted
              tw-underline-offset-2
            "
            >int'l de denver - <span class="tw-font-bold tw-uppercase">ILN</span></a
          >
          <p class="tw-text-lg tw-uppercase">MARTES 20 09 2022</p>
          <p class="tw-text-lg">
            (atrasado 16 minutos) <span class="tw-font-bold">02:16PM MDT</span>
          </p>
        </div>
      </div>
      <div class="tw-my-6">
        <q-range
          v-model="standard"
          color="secondary"
          :min="0"
          :max="100"
          readonly
          left-thumb-color="tw-left-thumb"
          right-thumb-color="tw-right-thumb"
        />
      </div>
      <div class="tw-grid tw-grid-cols-3 tw-gap-4 tw-place-items-stretch">
        <div class="tw-text-sm">
          <span class="tw-font-bold">313 mi</span> ya recorrido
        </div>
        <div class="tw-text-sm tw-text-center">
          <span class="tw-font-bold">2h 13 min</span> tiempo de viaje total
        </div>
        <div class="tw-text-sm text-right">
          <span class="tw-font-bold">313 mi</span> por recorrer
        </div>
      </div>
    </div>
    <div class="tw-flex tw-justify-center">
      <img v-if="!loading" class="img-map" :src="imgMap" alt="" srcset="" />
      <div v-if="loading" class="tw-w-64 tw-h-64" />
    </div>
  </master-modal>
</template>

<script>
import qRampStore from "../../_store/qRampStore.js";
export default {
  data() {
    return {
      standard: {
        min: 0,
        max: 50,
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
.img-map {
  width: 70vw;
  height: 500px;
  border-radius: 10px;
}
.text-tw-left-thumb {
@apply tw-hidden;
}
.text-tw-right-thumb {
  font-family: "Font Awesome 6 Pro";
  font-weight: 900;
  content: "\f0d8";
  line-height: 0px;
  color: #4046ff;
}
</style>