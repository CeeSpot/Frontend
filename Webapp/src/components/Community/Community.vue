<template>
<div class="padding-div">
    <div class="search-bar">
        <b-input-group>
            <b-form-input placeholder="Search..."></b-form-input>
            <b-input-group-append>
                <b-btn class="search-button-color"><font-awesome-icon icon="search"/></b-btn>
            </b-input-group-append>
        </b-input-group>
    </div>

    <div class="toggle">

    </div>

    <div class="tags">

    </div>

    <div class="cards">
        <b-card title="Card Title"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2">
        <p class="card-text">
        Some quick example text to build on the card title and make up the bulk of the card's content.
        </p>
        </b-card>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Community',
  getCompanies () {
    axios.get('http://localhost:3000/api/companies', 'data').then(res => {
      console.log(JSON.stringify(res.data))
    })
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.padding-div{
    padding-top: 60px;
}

.search-button-color{
    background-color: #E60000;
}
</style>
