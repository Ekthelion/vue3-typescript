<template>
  <div>
    <slot />
  </div>
</template>
<script lang="ts">
import { defineComponent, provide } from "vue";
import store, { StoreKey } from "@/store";

export default defineComponent({
  name: "StoreProvider",
  setup() {
    provide(StoreKey, store);
    return {};
  },
});
</script>
