<template>
  <li :class="{ grudge: true, forgiven: grudge.forgiven }">
    {{ grudge.title }}
    <label :for="checkboxId">
      Forgive
      <input type="checkbox" :name="checkboxId" :id="checkboxId" class="rounded" v-model="forgive" />
    </label>
  </li>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from "vue";
import store from "@/store";
import { ForgivePayload } from "@/types";
import { GRUDGE_FORGIVE } from "@/store/mutation-types";

export default defineComponent({
  props: {
    grudgeId: {
      type: String,
      required: true,
    },
  },

  methods: {},

  setup(props) {
    const grudge = store.getters.grudgeById(props.grudgeId);

    const state = reactive({
      forgive: false,
    });

    const checkboxId = computed(() => `forgive-${props.grudgeId}`);

    watch(
      () => state.forgive,
      val => {
        const payload: ForgivePayload = { id: props.grudgeId, forgiven: val };
        store.dispatch(GRUDGE_FORGIVE, payload);
      },
    );

    return {
      checkboxId,
      ...toRefs(state),
      grudge,
    };
  },
});
</script>
<style scoped>
.grudge {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
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
