<template>
  <div
    class="mt-6 relative w-[99%] h-auto box-border px-6 py-6 rounded-md border border-gray-50 gap-[5px] shadow-md flex flex-col justify-center"
  >
    <span class="flex items-center gap-2 mb-1">
      <h3 class="text-sm mb-[1px] leading-3">{{ props.username }}</h3>
    </span>
    <h4 class="text-[13px] font-normal">Longitude: {{ props.longitude }}</h4>
    <h4 class="text-[13px] font-normal">Latitude: {{ props.latitude }}</h4>

    <span class="flex gap-4">
      <button
        class="px-6 bg-red-800 py-2.5 w-[100px] mt-4 text-white text-[12px] rounded-[4px] font-normal"
        @click="
          $emit('onDelete', {
            username: props.username,
            longitude: props.longitude,
            latitude: props.latitude,
          })
        "
      >
        Delete
      </button>
      <button
        class="px-6 bg-[#2a427d] py-2.5 w-[100px] mt-4 text-white text-[12px] rounded-[4px] font-normal"
        @click="
          $emit('onLocate', {
            username: props.username,
            longitude: props.longitude,
            latitude: props.latitude,
          })
        "
      >
        Locate
      </button>
    </span>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps<{
  username: string;
  longitude: number | null;
  latitude: number | null;
}>();

defineEmits(["onDelete", "onLocate"]);
</script>
