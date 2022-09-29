<template>
  <div>
    <l-map :zoom="zoom" :minZoom="2"  :center="center" style="height: 700px; width: 100%">
      <l-tile-layer :url="url" :attribution="attribution" />

      <vRotatedMarker
        v-for="(item, index) in aircraftList"
        :key="item.id"
        :lat-lng="item.coordinates"
        :icon="icon"
        :rotationAngle="item.lastPositionHeading - 70"
        @click="selectedflight(item.id)"
      >
        <l-tooltip>
          <p>
            <span class="tw-font-semibold">Work Order Id:</span>{{ item.id }}
          </p>
          <p>
            <span class="tw-font-semibold">Flight Number:</span>
            {{ item.preFlightNumber }}
          </p>
          <p>
            <span class="tw-font-semibold">Aircraft Type:</span>
            {{ item.aircraft_type }}
          </p>
          <p>
            <span class="tw-font-semibold">Estimated Time of Arrival:</span>
            {{ minutesToHours(item.timeTotalEstimated) }}
          </p>
        </l-tooltip>
      </vRotatedMarker>
      <div>
        <l-marker
          v-for="(item, index) in listOfAirportsOfOrigin"
          :key="item.id"
          :lat-lng="item.coordinates"
        >
          <l-icon
            :icon-size="dynamicSize"
            :icon-anchor="dynamicAnchor"
            class-name="someExtraClass"
          >
            <div>
              <span class="tw-font-bold">{{ item.airportIataCode }}</span>
              <i
                class="
                  tw-animate-pulse
                  fa-sharp fa-solid fa-circle
                  tw-text-green-600
                "
              ></i>
            </div>
          </l-icon>
          <l-tooltip>
            <p>Airport Name:{{  item.airportName}}</p> 
          </l-tooltip>
        </l-marker>
        <l-marker
          v-for="(item, index) in listOfDestinationOfOrigin"
          :key="item.id"
          :lat-lng="item.coordinates"
        >
          <l-icon
            :icon-size="dynamicSize"
            :icon-anchor="dynamicAnchor"
            class-name="someExtraClass"
          >
            <div>
              <span class="tw-font-bold">{{ item.airportIataCode }}</span>
              <i
                class="
                  tw-animate-pulse
                  fa-sharp fa-solid fa-circle
                  tw-text-green-600
                  tw-text-xs
                "
              ></i>
            </div>
          </l-icon>
          <l-tooltip>
            <p>Airport Name:{{  item.airportName}}</p> 
          </l-tooltip>
        </l-marker>
      </div>
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
  LTooltip,
} from "vue2-leaflet";
import coordinateModel from "./models/coordinateModel.js";
import vRotatedMarker from "vue2-leaflet-rotatedmarker";
import { Icon, LatLng, divIcon } from "leaflet";
const ico = "https://i.ibb.co/d0bmMTz/black-plane.png";
import qRampStore from '../../_store/qRampStore.js';
import workOrderModel from './models/workOrderModel.js';

export default {
  props: {
    flightDetail: {
      type: Boolean,
      default: () => false,
    },
  },
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
    LTooltip,
  },
  data() {
    return {
      zoom: 2,
      center: [0, 0],
      staticAnchor: [16, 37],
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      iconSize: 20,
    };
  },
  async mounted() {
    if(!this.flightDetail) {
      await this.getFlights();
      setInterval(async() => {
        await this.getFlights();
      }, 5*60*1000);
    }
  },
  computed: {
    flightList() {
      return qRampStore().getFlightList();
    },
    flightId() {
      return qRampStore().getFlightId();
    },  
    dynamicSize() {
      return [this.iconSize, this.iconSize * 1.15];
    },
    dynamicAnchor() {
      return [this.iconSize / 2, this.iconSize * 1.15];
    },
    aircraftList() {
      const flightList = this.flightList.map(item => {
        const flightPosition = item.flightPosition ? item.flightPosition : {};
        const coordinates = flightPosition 
          ? [flightPosition.lastPositionLatitude, flightPosition.lastPositionLongitude] 
          : [];
        return {
          ...item,
          ...flightPosition,
          coordinates,
        }
      })
      if(this.flightDetail) {
        return flightList.filter(item => this.flightId === item.id);
      }
      return flightList;
    },
    listOfAirportsOfOrigin() {
      const flightList = this.flightList.map(item => {
        const origin = item.inboundOriginAirport ? item.inboundOriginAirport : {};
        const coordinates = origin 
        ? [origin.lat, origin.lng]
        : [];
        return {
          workOrderId: item.id,
          ...origin,
          coordinates,
        }
      })
      if(this.flightDetail) {
        return flightList.filter(item => this.flightId === item.workOrderId);
      }
      return flightList;
    },
    listOfDestinationOfOrigin() {
      const flightList =  this.flightList.map(item => {
        const destination = item.outboundDestinationAirport ? item.outboundDestinationAirport : {};
        const coordinates = destination 
        ? [destination.lat, destination.lng]
        : [];
        return {
          workOrderId: item.id,
          ...destination,
          coordinates,
        }
      })
      if(this.flightDetail) {
        return flightList.filter(item => this.flightId === item.workOrderId);
      }
      return flightList;
    },
    icon() {
      return new divIcon({
        html: '<i class="fak fa-plane-right-thin-icon tw-text-4xl tw-text-blue-500"/>',
        iconSize: this.dynamicSize, // size of the icon
        iconAnchor: this.dynamicAnchor,
        className: "iconMapPane",
      });
    },
  },
  methods: {
    async selectedflight(id) {
      this.getFlightMap();
      qRampStore().setFlightId(id);
    },
    async getFlights() {
      try {
        const params = {refresh: true}
        const response = await this.$crud.index("apiRoutes.qramp.flightPosition", params);
        qRampStore().setFlightList(workOrderModel.data);
      } catch (error) {
        console.log(error)
      }
    },
    async getFlightMap() {
      try {
        if(qRampStore().getVisibleMapModal()) return;
        qRampStore().showVisibleMapModal();
        qRampStore().setLoadingModalMap(true);
        setTimeout(() => {
          qRampStore().setLoadingModalMap(false);
        }, 2000);
      } catch (error) {
        qRampStore().setFlightMap(null);
        qRampStore().setLoadingModalMap(false);
      }
    },
    minutesToHours(numberOfMinutes) {  
      const duration = this.$moment.duration(numberOfMinutes, 'minutes');
      const hh = (duration.years()*(365*24)) + (duration.months()*(30*24)) + (duration.days()*24) + (duration.hours());
      const mm = duration.minutes();
      return `${hh}h ${mm} min`;
    }
  },
};
</script>
<style>
</style>