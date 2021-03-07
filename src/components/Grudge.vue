<template>
  <li :class="{ grudge: true, forgiven: grudge.forgiven }">
    {{ grudge.title }}
    <input type="checkbox" name="forgive" id="forgive" class="rounded" v-model="forgive" />
  </li>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import store from "@/store";
import { ForgivePayload } from "@/types";
import { GRUDGE_FORGIVE } from "@/store/mutation-types";

export default defineComponent({
  props: {
    grudgeId: {
      type: Number,
      required: true
    }
  },

  methods: {},

  watch: {
    forgive(newVal) {
      const payload: ForgivePayload = { id: this.$props.grudgeId, forgiven: newVal };
      store.dispatch(GRUDGE_FORGIVE, payload);
    }
  },

  setup(props) {
    const grudge = store.getters.grudgeById(props.grudgeId);

    const state = reactive({
      forgive: false
    });

    return {
      ...toRefs(state),
      grudge
    };
  }
});
</script>
<style scoped>
.grudge {
  padding: 0.5rem;
  display: inline-block;
  list-style-type: none;
  border: 1px solid #880e4f;
  border-radius: 0.3rem;
  background: #fce4ec;
}
.grudge.forgiven {
  background-color: #f1f8e9;
  border-color: #66bb6a;
}
input {
  cursor: pointer;
}
</style>
