<template>
  <li
    class="shadow-md border-2 bg-white rounded grid grid-cols-1 gap-1 px-4 py-3 items-center justify-center hover:text-white subpixel-antialiased text-gray-700 relative"
    :class="stateStyle"
  >
    <span class="absolute top-0 right-2 cursor-pointer" v-if="forgiven" @click="forget">x</span>
    <span class="what" :class="{ 'line-through': forgiven, 'font-semibold': !forgiven }">
      {{ grudge.title }}
    </span>
    <div class="who grid grid-cols-3 gap-1 w-full">
      <label :for="checkboxId" class="cursor-pointer flex flex-auto items-center justify-center text-left">
        <input type="checkbox" :name="checkboxId" :id="checkboxId" class="rounded cursor-pointer mr-2" v-model="forgiven" />
        forgive
      </label>
      <span class="italic col-span-2 text-right">
        {{ grudge.who }}
      </span>
      <span class="when text-xs text-left col-span-3" v-if="forgiven">{{ whenFormatted }}</span>
    </div>
  </li>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, reactive, toRefs, watch } from "vue";
import { StoreKey } from "@/store";
import { ForgivePayload, GrudgeType } from "@/types";
import { GRUDGE_FORGIVE, GRUDGE_DELETE } from "@/store/mutation-types";
import { format } from "date-fns";

export default defineComponent({
  props: {
    grudgeId: {
      type: String,
      required: true,
    },
  },

  setup(props) {
    const store = inject(StoreKey);
    if (!store) return;

    const grudge: ComputedRef<GrudgeType> = computed(() => store.getters.grudgeById(props.grudgeId));
    const state = reactive({
      forgiven: grudge.value.forgiven || false,
    });
    const whenFormatted = computed(() => format(new Date(grudge.value.when), "dd.MM.yyyy kk:mm:ss"));

    const checkboxId = computed(() => `forgive-${props.grudgeId}`);
    const stateStyle = computed(() =>
      state.forgiven ? "bg-green-50 border-green-400 hover:bg-green-400" : "bg-red-50 border-red-400 hover:bg-red-400",
    );

    const forget = () => {
      store.dispatch(GRUDGE_DELETE, props.grudgeId);
    };

    watch(
      () => state.forgiven,
      val => {
        const payload: ForgivePayload = { id: props.grudgeId, forgiven: val };
        store.dispatch(GRUDGE_FORGIVE, payload);
      },
    );

    return {
      grudge,
      checkboxId,
      ...toRefs(state),
      whenFormatted,
      stateStyle,
      forget,
    };
  },
});
</script>
<style scoped>
/* .grudge {
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
} */
</style>
