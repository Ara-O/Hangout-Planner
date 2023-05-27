<template>
  <h3>Map</h3>
  <br />
  <div id="map" class="h-[500px] w-[800px] rounded-md" ref="mapRef"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import getUserCoords from "../utils/getUserCoords";
let mapRef = ref(null);

let currentUserLocation = reactive({
  longitude: 0,
  latitude: 0,
});

onMounted(async () => {
  try {
    let { longitude, latitude } = await getUserCoords();
    currentUserLocation.longitude = longitude || 80;
    currentUserLocation.latitude = latitude || 40;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API;
    const map = new mapboxgl.Map({
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
