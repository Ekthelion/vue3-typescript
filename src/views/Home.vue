<template>
  <div class="home">
    <GrudgeList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import GrudgeList from "@/components/GrudgeList.vue";

export default defineComponent({
  name: "Home",
  components: {
    GrudgeList
  }
});
</script>
