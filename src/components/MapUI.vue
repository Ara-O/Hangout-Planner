<template>
  <div class="flex flex-col">
    <div id="map" class="h-full w-[800px] rounded-md" ref="mapRef"></div>
    <button
      class="px-6 bg-[#2a427d] w-auto py-2.5 h-12 mt-4 text-white text-[12px] rounded-[4px] font-normal"
      @click="
        $emit('calculateDistance', {
          long: mapSelectedLongitude,
          lat: mapSelectedLatitude,
        })
      "
    >
      Calculate Distances
    </button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from "vue";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Marker } from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import getUserCoords from "../utils/getUserCoords";
import { Map } from "mapbox-gl";
import { LngLatLike } from "mapbox-gl";
let mapRef = ref(null);
let map: Map;
let props = defineProps<{
  centerLocation: Array<any>;
}>();

defineEmits(["calculateDistance"]);
let currentUserLocation = reactive({
  longitude: 0,
  latitude: 0,
});

// RODO: Have a section where the user can click points on the map and it
//will generate route times
watch(
  () => props.centerLocation,
  (newVal) => {
    let location: LngLatLike = {
      lon: newVal[0],
      lat: newVal[1],
    };
    map.setCenter(location);
    map.setZoom(9);
  }
);

let marker: Marker = new Marker();

let mapSelectedLongitude = ref<number>(0);
let mapSelectedLatitude = ref<number>(0);

onMounted(async () => {
  try {
    let { longitude, latitude } = await getUserCoords();
    console.log(longitude + " " + latitude);
    currentUserLocation.longitude = longitude || 80;
    currentUserLocation.latitude = latitude || 40;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;
    map = new mapboxgl.Map({
      container: mapRef.value ? mapRef.value : "", // container ID
      style: "mapbox://styles/mapbox/streets-v12", // style URL
      center: [currentUserLocation.longitude, currentUserLocation.latitude], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
    console.log(map);

    map.on("click", (event) => {
      const { lngLat } = event;

      // Get the longitude and latitude
      mapSelectedLongitude.value = lngLat.lng;
      mapSelectedLatitude.value = lngLat.lat;

      // console.log(marker);
      if (marker) {
        marker.remove();
        marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
      } else {
        marker = new mapboxgl.Marker().setLngLat(lngLat).addTo(map);
      }
      console.log(
        "Clicked location:",
        mapSelectedLongitude.value,
        mapSelectedLatitude.value
      );
      console.log(marker);
    });
  } catch (e) {
    console.log(e);
  }
});
</script>
