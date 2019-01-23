<template>
    <b-container class="container-margin">
        <b-row class="mt-3">
            <b-col md="12" style="padding-top: 80px; padding-bottom: 80px;">
                <b-card class="no-scale">
                    <h1>Message successfully sent!</h1>
                    <p>Your message has been sent and we will contact you as soon as possible.</p>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: "success"
  }
</script>

<style scoped>
    .container-margin {
        margin-top: 130px;
    }
</style>