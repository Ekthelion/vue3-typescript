<template>
  <StoreProvider>
    <div class="home">
      <GrudgeList />
    </div>
  </StoreProvider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GrudgeList from "@/components/GrudgeList.vue";
import StoreProvider from "@/components/StoreProvider.vue";

export default defineComponent({
  name: "Home",
  components: {
    GrudgeList,
    StoreProvider,
  },
});
</script>
