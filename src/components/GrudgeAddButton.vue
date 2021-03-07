<template>
  <input type="text" v-model="title" />
  <button
    class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent"
    :disabled="!title"
    @click="addGrudge"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { defineComponent, inject, reactive, toRefs } from "vue";
import { StoreKey } from "@/store";
import { generateId } from "@/utilities/helpers";
import { GRUDGE_ADD } from "@/store/mutation-types";

export default defineComponent({
  setup() {
    const store = inject(StoreKey);
    if (!store) return;

    const state = reactive({
      title: "",
    });

    const addGrudge = () => {
      store.dispatch(GRUDGE_ADD, {
        id: generateId(),
        title: state.title,
      });
      state.title = "";
    };
    return {
      ...toRefs(state),
      addGrudge,
    };
  },
});
</script>
