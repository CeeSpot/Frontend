<template>
    <div style="margin-top: 150px;">
        Test
        <input type="file" @change="onFileChanged">
        <button @click="onUpload">Upload!</button>

    </div>
</template>

<script>
  import uploadFile from '@/services/api/uploadFile.js';

  export default {
    name: "test",
    data() {
      return {
        selectedFile: null
      }
    },
    methods: {
      onFileChanged(event) {
        this.selectedFile = event.target.files[0];
      },
      onUpload() {
        // upload file
        uploadFile.uploadFile(1, "spaces", this.selectedFile);
      }
    }
  }
</script>

<style scoped>

</style>