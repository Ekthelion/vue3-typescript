<template>
  <input ref="whoInput" placeholder="Who again?" name="who" type="text" v-model="who" class="rounded-l" />
  <input red="titleInput" placeholder="What again?" name="title" type="text" v-model="title" />
  <button
    class="bg-transparent hover:enabled:bg-blue-500 text-blue-700 font-semibold hover:enabled:text-white py-2 px-4
      border border-blue-500 hover:enabled:border-transparent rounded-r disabled:opacity-50 disabled:cursor-not-allowed"
    @click="addGrudge"
    :disabled="isSaveDisabled"
  >
    <slot />
  </button>
</template>
<script lang="ts">
import { computed, defineComponent, inject, reactive, toRefs, ref } from "vue";
import { StoreKey } from "@/store";
import { GRUDGE_ADD } from "@/store/mutation-types";

export default defineComponent({
  setup() {
    const store = inject(StoreKey);
    if (!store) return;

    const titleInput = ref();
    const whoInput = ref();

    const state = reactive({
      title: "",
      who: "",
    });

    const isSaveDisabled = computed(() => !state.title || !state.who);

    const addGrudge = () => {
      store
        .dispatch(GRUDGE_ADD, {
          title: state.title,
          who: state.who,
        })
        .then(() => {
          state.title = "";
          state.who = "";
          whoInput.value.focus();
        });
    };
    return {
      ...toRefs(state),
      addGrudge,
      isSaveDisabled,
      whoInput,
      titleInput,
    };
  },
});
</script>
