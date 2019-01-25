<template>
    <b-container fluid id="footer">
        <b-row>
            <b-col md="12">
                <b-container>
                    <b-row class="pt-4 text-center">
                        <b-col md="12" class="text-center">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <a href="/contact">Contact</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="/book-a-tour">Book a tour</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="/privacy-statement">Privacy statement</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="/about">About us</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="/account">My account</a>
                                </li>
                            </ul>
                        </b-col>
                        <b-col md="3"></b-col>
                        <b-col md="3"></b-col>
                        <b-col md="3"></b-col>
                        <b-col md="3"></b-col>
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
    .list-inline-item {
        padding-right: 15px;
    }

    a {
        color: white;
    }

    #footer {
        border-top: 5px solid #E60000;
        position: absolute;
        bottom: 0;
        width: 100%;
        /* Set the fixed height of the footer here */
        min-height: 80px;
        /*line-height: 60px; !* Vertically center the text there *!*/
        background-color: #373737;
        color: white;
    }
</style>