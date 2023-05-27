<template>
  <div
    class="mt-6 relative w-[99%] h-[120px] box-border px-6 py-4 rounded-md border border-gray-50 gap-[5px] shadow-md flex flex-col justify-center"
  >
    <span class="flex items-center gap-2 mb-1">
      <img
        src="../assets/icons/delete-icon.png"
        class="w-3.5 cursor-pointer"
        alt="Delete icon"
        @click="
          $emit('onDelete', {
            username: props.username,
            longitude: props.longitude,
            latitude: props.latitude,
          })
        "
      />
      <h3 class="text-sm mb-[1px] leading-3">{{ props.username }}</h3>
    </span>
    <h4 class="text-[13px] font-normal">Longitude: {{ props.longitude }}</h4>
    <h4 class="text-[13px] font-normal">Latitude: {{ props.latitude }}</h4>
  </div>
</template>

<script lang="ts" setup>
let props = defineProps<{
  username: string;
  longitude: number | null;
  latitude: number | null;
}>();

defineEmits(["onDelete"]);
</script>
