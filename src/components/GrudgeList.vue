<template>
  <ul class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
    <Grudge v-for="grudge in grudgeList" :grudgeId="grudge.id" :key="grudge.id" />
  </ul>
  <GrudgeAdd>
    Remember
  </GrudgeAdd>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject } from "vue";
import { StoreKey } from "@/store";
import GrudgeAdd from "@/components/GrudgeAdd.vue";
import Grudge from "@/components/Grudge.vue";

export default defineComponent({
  setup() {
    const store = inject(StoreKey);
    if (!store) return;

    const state = reactive({
      grudgeList: store.getters.grudges,
    });

    return {
      ...toRefs(state),
    };
  },
  components: {
    Grudge,
    GrudgeAdd,
  },
});
</script>

<style scoped>
.grudge-list {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: auto;
  column-gap: 1.5rem;
  row-gap: 1rem;
}
</style>
