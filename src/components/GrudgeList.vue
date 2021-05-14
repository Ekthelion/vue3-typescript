<template>
  <GrudgeAdd>
    Remember
  </GrudgeAdd>
  <div class="grudge-list">
    <ul class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      <Grudge v-for="grudge in grudges" :grudgeId="grudge.id" :key="grudge.id" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ComputedRef } from "vue";
import { StoreKey } from "@/store";
import GrudgeAdd from "@/components/GrudgeAdd.vue";
import Grudge from "@/components/Grudge.vue";
import { GRUDGES_GET } from "@/store/mutation-types";
import { GrudgeType } from "../types";

export default defineComponent({
  setup() {
    const store = inject(StoreKey);
    if (!store) return;

    store.dispatch(GRUDGES_GET);

    const grudges: ComputedRef<GrudgeType[]> = computed(() => store.getters.grudges);

    return {
      grudges,
    };
  },
  components: {
    Grudge,
    GrudgeAdd,
  },
});
</script>

<style scoped></style>
