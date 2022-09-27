<template>
    <div>
        <l-map
            :zoom="zoom"
            :center="center"
            style="height: 700px; width: 800px"
        >
            <l-tile-layer
            :url="url"
            :attribution="attribution"
            />
            <l-marker :lat-lng="coordinate.shift()">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                class-name="someExtraClass"
              >
                  <div>
                    <span class="tw-font-bold">HRC</span>
                    <i class="tw-animate-pulse fa-sharp fa-solid fa-circle tw-text-green-600"></i>
                  </div>
              </l-icon>
            </l-marker>
            <vRotatedMarker
                  :lat-lng="[33.96, -107.95]" 
                  :icon="icon" 
                  :rotationAngle="-25"
            >
            </vRotatedMarker>
            <l-marker :lat-lng="[33.94, -118.41]">
                <l-icon
                  :icon-size="dynamicSize"
                  :icon-anchor="dynamicAnchor"
                  class-name="someExtraClass"
                >
                  <div>
                    <span class="tw-font-bold">RCA</span>
                    <i class="tw-animate-pulse fa-sharp fa-solid fa-circle tw-text-green-600"></i>
                  </div>
                </l-icon>
              </l-marker>
        </l-map>
    </div>
  </template>
  
  <script>
import {
  LMap,
  LTileLayer,
  LCircle,
  LRectangle,
  LPolygon,
  LPolyline,
  LIcon,
  LMarker,
} from "vue2-leaflet";
import coordinateModel from './models/coordinateModel.js';
import vRotatedMarker from 'vue2-leaflet-rotatedmarker';
import { Icon, LatLng, divIcon } from 'leaflet'
const ico = 'https://i.ibb.co/d0bmMTz/black-plane.png';
export default {
  components: {
    LMap,
    LTileLayer,
    LCircle,
    LRectangle,
    LPolygon,
    LPolyline,
    LIcon,
    LMarker,
    vRotatedMarker,
  },
  data() {
    return {
      zoom: 3,
      center: coordinateModel()[0],
      staticAnchor: [16, 37],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      iconSize: 30,
    };
  },
  computed: {
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
    coordinate() {
      return coordinateModel();
    },
    icon() {
      return new divIcon({
        html: '<i class="fa-sharp fa-solid fa-plane tw-text-2xl tw-text-red-800"></i>',
        //iconUrl: ico,
        iconSize: this.dynamicSize, // size of the icon
        iconAnchor: this.dynamicAnchor,
        className:"iconMapPane"
      });
    },
  },
  methods: {},
};
</script>
<style>
</style>