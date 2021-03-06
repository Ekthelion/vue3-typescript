<template>
  <input type="text" v-model="title" />
  <button :disabled="!title" @click="addGrudge"><slot /></button>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import store from "@/store";
import { GRUDGE_ADD } from "@/store/mutation-types";

export default defineComponent({
  setup() {
    const state = reactive({
      title: ""
    });

    const addGrudge = () => {
      store.dispatch(GRUDGE_ADD, {
        id: Math.floor(Math.random() * 100000),
        title: state.title
      });
      state.title = "";
    };
    return {
      ...toRefs(state),
      addGrudge
    };
  }
});
</script>
