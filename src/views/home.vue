<template>
  <main class="py-7 h-screen px-8 flex gap-10">
    <section class="w-[450px] px-6 py-6 font-medium h-full bg-white rounded-md">
      <h2>Welcome!</h2>
      <br />
      <span class="flex flex-col">
        <label for="long-position" class="text-[13.5px] font-normal"
          >Add Username</label
        >
        <input
          type="text"
          id="username"
          v-model="currentUserLocation.username"
          class="border border-gray-50 shadow-md rounded-[5px] mt-4 h-10 text-xs pl-4 font-normal"
          placeholder="Enter a username here"
        />
      </span>
      <br />
      <span class="flex flex-col">
        <label for="long-position" class="text-[13.5px] font-normal"
          >Your Longitude</label
        >
        <input
          type="text"
          id="long-position"
          v-model.number="currentUserLocation.longitude"
          class="border border-gray-50 shadow-md rounded-[5px] mt-4 h-10 text-xs pl-4 font-normal"
          placeholder="Enter your longitude position here"
        />
      </span>
      <br />
      <span class="flex flex-col">
        <label for="lat-position" class="text-[13.5px] font-normal"
          >Your Latitude</label
        >
        <input
          type="text"
          id="lat-position"
          v-model.number="currentUserLocation.latitude"
          class="border border-gray-50 shadow-md rounded-[5px] mt-4 h-10 text-xs pl-4 font-normal"
          placeholder="Enter your latitude position here"
        />
      </span>
      <br />
      <button
        class="px-6 bg-[#2a427d] py-2.5 text-white text-[12px] rounded-[4px] font-normal"
        @click="addLocation"
      >
        Add Address
      </button>

      <hr class="mt-6" />
      <div
        class="max-h-[460px] pl-[4px] pb-3 flex flex-col items-start overflow-auto all-locations-list"
      >
        <UserLocationInfo
          v-for="{ username, longitude, latitude } in allLocations"
          :username="username"
          :longitude="longitude"
          :latitude="latitude"
          @onDelete="deleteLocation"
          @onLocate="locateUser"
        />
      </div>
    </section>
    <section
      class="w-full flex h-full shadow-md border bg-white px-9 py-6 border-gray-100 rounded-md"
    >
      <MapUI
        :centerLocation="centerLocation"
        @calculateDistance="calculateDistance"
      />
      <div class="px-10">
        <h5 class="text-sm">
          How it works: Select a point on the map and click the 'Calculate
          Distance' button. It will generate routes
        </h5>
        <div v-for="locationTime in locationTimes">
          <div
            class="mt-6 relative w-[99%] h-auto box-border px-6 py-6 rounded-md border border-gray-50 gap-[5px] shadow-md flex flex-col justify-center"
          >
            <span class="flex items-center gap-2 mb-1">
              <h3 class="text-sm mb-[1px] leading-3">
                {{ locationTime.username }}
              </h3>
            </span>
            <h4 class="text-[13px] font-normal">
              {{ formatDuration(locationTime.duration) }}
            </h4>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { UserLocationInformationType } from "../types/types";
import MapUI from "../components/MapUI.vue";
import axios from "axios";
import getUserCoords from "../utils/getUserCoords";
import UserLocationInfo from "../components/UserLocationInfo.vue";

let centerLocation = ref<Number[]>([]);
let allLocations = ref<UserLocationInformationType[]>([
  { username: "Bob", longitude: 55.2322323, latitude: 32.324224 },
]);
let locationTimes = ref<{ username: string; duration: number }[]>([]);
let currentUserLocation = reactive<UserLocationInformationType>({
  username: "",
  longitude: null,
  latitude: null,
});

function addLocation() {
  allLocations.value.push(Object.assign({}, currentUserLocation));
}

function formatDuration(duration: number): string {
  return `${(duration / 60).toFixed(1)} mins`;
}

function calculateDistance(desiredLocation: { long: number; lat: number }) {
  console.log("baka", desiredLocation);
  locationTimes.value = [];
  allLocations.value.forEach((userLocation) => {
    console.log(userLocation);
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${userLocation.longitude}%2C${userLocation.latitude}%3B${desiredLocation.long}%2C${desiredLocation.lat}.json?geometries=polyline&steps=true&overview=full&language=en&access_token=pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg`
      )
      .then((res) => {
        console.log(res);
        if (res.data.code != "NoSeegment") {
          locationTimes.value.push({
            username: userLocation.username,
            duration: res.data.routes[0].duration,
          });
        } else {
          locationTimes.value.push({
            username: userLocation.username,
            duration: 0,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 422) {
          alert("One of the locations is too far from the other");
        }
      });
  });
}

function deleteLocation(payload: UserLocationInformationType) {
  allLocations.value = allLocations.value.filter(
    ({ username, longitude, latitude }) =>
      username !== payload.username ||
      longitude !== payload.longitude ||
      latitude !== payload.latitude
  );
}

function locateUser(payload: UserLocationInformationType) {
  console.log(payload);
  if (payload.latitude !== null && payload.longitude !== null) {
    centerLocation.value = [payload.longitude, payload.latitude];
  }
}

onMounted(() => {
  getUserCoords().then((coords) => {
    currentUserLocation.longitude = coords.longitude;
    currentUserLocation.latitude = coords.latitude;
  });
});
</script>

<style scoped>
.all-locations-list::-webkit-scrollbar {
  display: none;
}
</style>
