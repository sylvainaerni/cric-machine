<template>
  <main class="home">
    <SvgIcon class=" my-5 mx-auto h-auto svg-icon svg-icon--duck text-red text-red-600 w-1/2" name="duck" />
    <span class="first:mt-2 specialspan">
      Styles by tailwind
    </span>
    <span class="first:mt-2 specialspan">
      Styles by tailwind
    </span>
    <HelloWorld msg="component props" />
  </main>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SvgIcon from "@/components/SvgIcon.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    SvgIcon
  }
};
</script>

<style lang="postcss" scoped>
.specialspan {
  @apply bg-black bg-blue-300 block p-8 text-6xl text-center text-white;

  &:hover {
    @apply bg-white text-red-300;
  }
}
</style>
