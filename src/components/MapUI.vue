<template>
  <div id="map" class="h-full w-[800px] rounded-md" ref="mapRef"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive, watch } from "vue";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import getUserCoords from "../utils/getUserCoords";
import { Map } from "mapbox-gl";
import { LngLatLike } from "mapbox-gl";
let mapRef = ref(null);
let map: Map;
let props = defineProps<{ centerLocation: Array<any> }>();
let currentUserLocation = reactive({
  longitude: 0,
  latitude: 0,
});

watch(
  () => props.centerLocation,
  (newVal) => {
    let location: LngLatLike = {
      lon: newVal[0],
      lat: newVal[1],
    };
    map.setCenter(location);
  }
);

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
  } catch (e) {
    console.log(e);
  }
});
</script>
