<template>
    <b-container style="margin-top: 140px;">
        <b-row>
            <b-col md="8">
                <h1>Nice space</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam aliquid assumenda beatae
                    consequatur deleniti deserunt doloribus est eveniet in, ipsa iste laudantium magni, neque nulla,
                    perspiciatis provident quis voluptatibus.
                </p>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="8">
                <img src="https://picsum.photos/600/300/?image=1" alt="Title" class="rounded shadow" style="width: 100%;">
            </b-col>
            <b-col md="4">
                <b-row>
                    <b-col>
                        <div style="width: 100%; height: 100%; padding: 15px; font-size: 1.125em;" class="card shadow no-scale">
                            <ul class="list-unstyled">
                                <li><h3>Specifications</h3></li>
                                <li>1 pc</li>
                                <li>1 projector</li>
                                <li>12 seats</li>
                                <li></li>
                            </ul>
                        </div>
                    </b-col>
                </b-row>
                <b-row class="mt-4">
                    <b-col>
                        <div style="width: 100%; height: 100%; padding: 15px; font-size: 1.125em;" class="card shadow no-scale">
                            <h3>Reserve space</h3>
                            <datetime  type="datetime" input-class="form-control" placeholder="Date and time" format="dd-MM-yyyy HH:mm:ss"></datetime>
                            <b-button class="btn-block btn-ceecee-red mt-2">
                                Reserve space
                            </b-button>
                        </div>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="8">
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. In quaerat quidem saepe! Commodi doloribus
                    excepturi incidunt officiis repudiandae! Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Ducimus eius neque quae reprehenderit totam voluptas. Illum ipsam non odio.
                </p>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    name: "Space",
    created() {
      this.id = this.$route.params.id;
    },
    mounted() {
        // space inladen via api
        this.space = '';
    },
    data() {
      return {
        space: null
      }
    }
  }
</script>

<style scoped>

</style>