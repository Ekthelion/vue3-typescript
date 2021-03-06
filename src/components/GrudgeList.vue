<template>
  <ul class="grudge-list">
    <Grudge class="grudge" v-for="grudge in grudgeList" :grudgeId="grudge.id" :key="grudge.id" />
  </ul>
  <grudge-add-button>
    Add
  </grudge-add-button>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import GrudgeAddButton from "@/components/GrudgeAddButton.vue";
import store from "@/store";
import Grudge from "@/components/Grudge.vue";

export default defineComponent({
  setup() {
    const state = reactive({
      grudgeList: store.getters.grudges
    });

    return {
      ...toRefs(state)
    };
  },
  components: {
    Grudge,
    GrudgeAddButton
  }
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
