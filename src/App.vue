<template>
  <video
    :src="video"
    controls
  />
  <br>
  <button @click="transcode">
    Start
  </button>
  <p>{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

export default defineComponent({
  name: 'App',
  setup() {
    // app state
    const ffmpeg = createFFmpeg({
      log: true,
    });
    const message = ref('Click Start to Transcode');
    let video = ref(null);
    // methods
    async function transcode() {
      message.value = 'Loading ffmeg-core.js';
      await ffmpeg.load();
      message.value = 'Start transcoding';
      ffmpeg.FS('writeFile', 'test.avi', await fetchFile('/flame.avi'));
      await ffmpeg.run('-i', 'test.avi', 'test.mp4');
      message.value = 'Complete transcoding';
      const data = ffmpeg.FS('readFile', 'test.mp4');
      video.value = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
    }
    return {
      video,
      message,
      transcode
    };
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
