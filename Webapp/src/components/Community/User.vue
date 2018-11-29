<template>
<div>
    <b-container style="margin-top: 150px;">
        <b-row>
            <b-col md="8" style="padding: 25px;">
                <div class="bg-white box-shadow">
                    <b-row>
                        <b-col style="padding-top: 20px;">
                            <div style="width: 100%; text-align: center; margin-top: -100px; padding-bottom: 20px;">
                                <b-img style="width: 150px;" rounded="circle" src="/static/person.png" class="box-shadow"></b-img>
                            </div>
                            <h1 class="text-center">Henkie Janssen</h1>
                            <b-row>
                                <b-col class="text-justify" style="padding-left: 25px; padding-right: 25px;">
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab assumenda eveniet impedit ipsum, iusto laborum molestias neque officia saepe sit! Ex illum labore maiores nostrum placeat. Aperiam ex provident voluptatum?
                                    </p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta dolorum ex nostrum quae vitae? Aliquam animi at commodi culpa cupiditate deserunt dignissimos dolorum enim ipsum laborum magni, possimus quis sapiente?</p>
                                </b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
            <b-col cols="4" style="padding: 25px;" class="company-images">
                <div class="bg-white box-shadow" style="padding: 20px;">
                    <b-row>
                        <b-col>
                            <b-img
                                fluid
                                src="https://www.sportbedrijfdeventer.nl/sportiefdeventer/wp-content/uploads/sites/5/2014/08/Logo-Saxion-e1418301229198.jpg">
                            </b-img>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
        </b-row>
    </b-container>
</div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'Halloooo'
    }
  }
}
</script>

<style>
    body {
        background-color: #ededed;
    }

    .box-shadow {
        box-shadow: 0 3px 5px #d2d2d2;
    }

</style>
