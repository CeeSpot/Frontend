<template>
    <b-container fluid style="background-color: #373737; min-height: 80px; border-top: 5px solid #E60000; color: white; margin-top: 50px;" id="footer">
        <b-row>
            <b-col md="12">
                <b-container>
                    <b-row class="pt-4 text-center">
                        <b-col md="3"><a href="/contact">Contact</a></b-col>
                        <b-col md="3"><a href="/book-a-tour">Book a tour</a></b-col>
                        <b-col md="3"><a href="/privacy-statement">Privacy statement</a></b-col>
                        <b-col md="3"><a href="/account">My account</a></b-col>
                    </b-row>
                </b-container>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: "page-footer"
  }
</script>

<style scoped>
    a {
        color: white;
    }
</style>