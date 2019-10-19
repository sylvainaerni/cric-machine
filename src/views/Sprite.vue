<template>
  <div id="wrapper">
    <v-sprite :id="'sprite'"
      :spritesheet="require(`@/assets/sprites/texture.png`)"
      :json="require(`@/assets/sprites/texture.json`)"
      :yoyo="false"
      :fps="30"
      ref="sprite"
    ></v-sprite>
    <button @click="play">play</button>
    <button @click="stop">stop</button>
  </div>
</template>

<script>
  export default {
    methods: {
      play () {
        this.$refs.sprite.play()
      },
      stop () {
        this.$refs.sprite.stop()
      }
    }
  }
</script>