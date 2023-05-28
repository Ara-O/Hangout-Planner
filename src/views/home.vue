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
          v-model="currentUserLocation.longitude"
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
          v-model="currentUserLocation.latitude"
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
      class="w-full h-full shadow-md border bg-white px-9 py-6 border-gray-100 rounded-md"
    >
      <MapUI :centerLocation="centerLocation" />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref, reactive } from "vue";
import { UserLocationInformationType } from "../types/types";
import MapUI from "../components/MapUI.vue";
import getUserCoords from "../utils/getUserCoords";
import UserLocationInfo from "../components/UserLocationInfo.vue";

let centerLocation = ref<Number[]>([]);

let allLocations = ref<UserLocationInformationType[]>([
  { username: "Bob", longitude: 55.2322323, latitude: 32.324224 },
  { username: "Bob", longitude: 23.2322323, latitude: 32.3242424 },
  { username: "Bob", longitude: 50.2322323, latitude: 32.3242424 },
]);

let currentUserLocation = reactive<UserLocationInformationType>({
  username: "",
  longitude: null,
  latitude: null,
});

function addLocation() {
  allLocations.value.push(currentUserLocation);
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
