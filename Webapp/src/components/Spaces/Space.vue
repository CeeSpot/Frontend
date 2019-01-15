<template>
    <b-container fluid style="margin-top: 100px;">
        <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
            <b-container>
                <b-row>
                    <b-col md="2">
                        <b-img rounded="circle" width="200" height="200" class="image-border"
                               src="https://www.theceespot.nl/img/school-of-AI-simply-scaled-640.jpg"></b-img>
                    </b-col>
                    <b-col md="9" class="text-white ml-5">
                        <b-row>
                            <b-col md="12">
                                <h1 class="text-white font-weight-bold">
                                    Space title comes here
                                </h1>
                            </b-col>
                        </b-row>
                        <b-row>
                            <b-col md="12">
                                <h4 class="text-white">
                                    Location
                                </h4>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col class="opacity-text-8" md="12">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab aliquam amet consequatur
                                cumque dolorem expedita fugit minima minus, non obcaecati officia omnis quaerat quos
                                ratione repellat repellendus similique sit tenetur.
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
        <b-row style="margin-top: -80px;">
            <b-container>
                <b-row>
                    <b-col md="7">
                        <b-card class="no-scale">
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus eius illo quibusdam.
                                A, animi atque, commodi cupiditate doloremque earum hic minima quibusdam quidem repellat
                                similique unde veniam, voluptate! Nam, quo.
                            </p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos distinctio
                                inventore iure reprehenderit sequi ullam. Autem cum doloremque, dolores magnam obcaecati
                                odio quam recusandae reprehenderit sint sit! Aliquid, aut laudantium.
                            </p>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card class="no-scale">
                            <b-row>
                                <b-col>
                                    <ins class="font-weight-bold">@ the cee spot</ins>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <span>test</span>
                                </b-col>
                            </b-row>
                            <b-row>
                                <b-col>
                                    <span>test</span>
                                </b-col>
                            </b-row>
                            <b-row class="mt-2">
                                <b-col class="text-center">
                                    <button type="button" style="width:100%;"
                                            class="btn btn-ceecee-red text-center">
                                        Contact us
                                    </button>
                                </b-col>
                            </b-row>
                        </b-card>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col md="12">
                        <div style="height: 600px;">
                            <vue-masonry-gallery :imgsArr="imgsArr" :maxCols="4" :imgWidth="360"
                                                 @click="clickFn"></vue-masonry-gallery>
                            <b-modal ref="myModalRef" hide-footer size="lg" v-bind:title="modalTitle">
                                <b-img v-bind:src="modalContent" fluid></b-img>
                                <p class="mt-3 text-center">{{ modalTitle }}</p>
                            </b-modal>
                        </div>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>

<script>
  import VueMasonryGallery from '@/components/Core/Other/VueMasonryGallery';

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
        modalIsVisible: false,
        modalContent: "",
        modalTitle: "",
        space: null,
        imgsArr: [],
      }
    },
    methods: {
      getData() {
        // In the real environment,the backend will return a new image array based on the parameter group.
        // Here I simulate it with a stunned json file.
        this.imgsArr = [
          {
            title: "Test",
            src: "https://www.teachprivacy.com/wp-content/uploads/Hacker1.jpg",
            srcBig: "https://www.teachprivacy.com/wp-content/uploads/Hacker1.jpg",
            href: "https://picsum.photos/600/300/?image=5"
          },
          {
            title: "Test",
            src: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
            srcBig: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
            href: "https://picsum.photos/600/300/?image=4"
          },
          {
            title: "Test",
            src: "http://www2.pictures.zimbio.com/mp/yLDsty1F6N2x.jpg",
            srcBig: "http://www2.pictures.zimbio.com/mp/yLDsty1F6N2x.jpg",
            href: "https://picsum.photos/600/300/?image=4"
          },
          {
            title: "Test",
            src: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
            srcBig: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
            href: "https://picsum.photos/600/300/?image=4"
          },
          {
            title: "Test",
            src: "https://www.incimages.com/uploaded_files/image/1940x900/getty_818918912_2000133120009280241_360639.jpg",
            srcBig: "https://www.incimages.com/uploaded_files/image/1940x900/getty_818918912_2000133120009280241_360639.jpg",
            href: "https://picsum.photos/600/300/?image=4"
          },
          {
            title: "Test",
            src: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
            srcBig: "https://pbs.twimg.com/media/DoQGxT6W0AAPred.png",
            href: "https://picsum.photos/600/300/?image=4"
          }
        ];
      },
      clickFn(event, {index}) {
        event.preventDefault();
        console.log(this.imgsArr[index].title);
        this.modalTitle   = this.imgsArr[index].title;
        this.modalContent = this.imgsArr[index].srcBig;
        this.showModal();
      },
      showModal () {
        this.$refs.myModalRef.show()
      },
      hideModal () {
        this.$refs.myModalRef.hide()
      }
    },
    created() {
      this.getData();
    },
    components: {
      VueMasonryGallery,
    }
  }
</script>

<style scoped>
    .opacity-text-8 {
        color: rgba(255, 255, 255, .8);
    }

    .image-border {
        border: 2px solid #E60000;
    }

    .image-profile-chips {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    }

    ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
    }

    li {
        float: left;
        margin: 15px;
    }
</style>
