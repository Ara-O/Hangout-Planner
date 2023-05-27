<template>
  <main class="py-7 h-screen px-8 flex gap-10">
    <section class="w-96 px-6 py-6 font-medium h-full bg-white rounded-md">
      <h2>Welcome!</h2>
      <br />
      <span class="flex flex-col">
        <label for="long-position" class="text-sm font-normal">Longitude</label>
        <input
          type="text"
          id="long-position"
          class="border border-gray-50 shadow-md rounded-[5px] mt-4 h-10 text-xs pl-4 font-normal"
          placeholder="Enter your longitude position here"
        />
      </span>
      <br />
      <span class="flex flex-col">
        <label for="lat-position" class="text-sm font-normal">Latitude</label>
        <input
          type="text"
          id="lat-position"
          class="border border-gray-50 shadow-md rounded-[5px] mt-4 h-10 text-xs pl-4 font-normal"
          placeholder="Enter your latitude position here"
        />
      </span>
      <button>Test</button>
    </section>
    <section
      class="w-full h-full shadow-md border bg-white border-gray-100 rounded-md"
    ></section>
  </main>
</template>
