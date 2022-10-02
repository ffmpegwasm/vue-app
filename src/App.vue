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

<script>
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // app state
    const ffmpeg = createFFmpeg({
      log: true,
    });
    const message = ref("Click Start to Transcode");
    let video = ref(null);
    const file =
      process.env.NODE_ENV === "production"
        ? "/vue-app/flame.avi"
        : "/flame.avi";
    // methods
    async function transcode() {
      message.value = "Loading ffmpeg-core.js";
      await ffmpeg.load();
      message.value = "Start transcoding";
      ffmpeg.FS("writeFile", "test.avi", await fetchFile(file));
      await ffmpeg.run("-i", "test.avi", "test.mp4");
      message.value = "Complete transcoding";
      const data = ffmpeg.FS("readFile", "test.mp4");
      video.value = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
    }
    return {
      video,
      message,
      transcode,
    };
  },
});
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
