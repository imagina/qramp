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
                icon-url="./img/airport1.png"
              />
            </l-marker>
            <l-marker :lat-lng="[44.61, -77.82]">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                class-name="someExtraClass"
                icon-url="./img/airport.png"
              />
            </l-marker>
            <l-marker :lat-lng="[34.7, -112.48]">
              <l-icon
                :icon-size="dynamicSize"
                :icon-anchor="dynamicAnchor"
                class-name="someExtraClass"
                icon-url="./img/airport1.png"
              />
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
  },
  data() {
    return {
      zoom: 3,
      center: coordinateModel()[0],
      staticAnchor: [16, 37],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      iconSize: 20
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
    }
  },
  methods: {},
};
</script>
<style>
</style>