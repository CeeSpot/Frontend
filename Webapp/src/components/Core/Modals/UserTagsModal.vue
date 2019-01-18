<template>

  <!-- Modal Component -->
  <b-modal id="UserTagsModal" ref="UserTagsModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3 class="text-white">Edit your abilities</h3>
        </b-col>
        <b-col class="text-right" xs="6">
          <button v-on:click="closeModal"
                  style="border-radius: 20px; width: 40px; height: 40px; border: none; background-color: white; cursor: pointer;">
            <font-awesome-icon icon="times"/>
          </button>
        </b-col>
      </b-row>
    </div>

    <b-row>
      <b-col>
        <b-alert show variant="danger" v-if="failedMessage.length > 0">{{failedMessage}}</b-alert>
      </b-col>
    </b-row>
    <b-form @submit="onSubmit">
      <b-row>
        <b-col style="margin-bottom: 30px;">
          <ul>
            <li v-for="(tag, index) in tags" :key="tag.id" >
              <div :id="'tag' + tag.id"
                   v-bind:class="{'btn-ceecee-oval-red': true,  active: tag.active}"
                   v-on:click="switchTag(tag.id, index)">
                {{tag.description}}
              </div>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-form>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="primary" v-on:click="onSubmit">Save</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import CommunityApi from '@/services/api/community.js'

export default {
  name: 'UserTagsModal',
  data () {
    return {
      failedMessage: '',
      options: [],
      deleted: []
    }
  },
  methods: {
    closeModal () {
      for (let i = 0; i < this.user_tags.length; i++) {
        if (this.user_tags[i].id === -1) {
          document.getElementById('tag' + this.user_tags[i].tag_id).classList.remove('active')
          this.user_tags.splice(i,1)
        }
      }
      for (let i = 0; i < this.deleted.length; i++) {
        if (this.deleted[i].id !== -1) {
          document.getElementById('tag' + this.deleted[i].tag_id).classList.add('active')
          this.user_tags.push(this.deleted[i])
        }
      }
      this.deleted = []
      this.$refs.UserTagsModal.hide()
    },
    switchTag (tagElId, id) {
      let el = document.getElementById('tag' + tagElId)
      if (el.classList.contains('active')) {
        el.classList.remove('active')
      } else {
        el.classList.add('active')
      }

      let objToSwitch = this.tags[id]
      let userTagObj = this.user_tags.filter((obj) => {
        return obj.tag_id === objToSwitch.id
      })
      if (userTagObj.length > 0) {
        this.tags[id].active = false
        for (let i = 0; i < this.user_tags.length; i++) {
          if (userTagObj[0].tag_id === this.user_tags[i].tag_id) {
            this.user_tags.splice(i, 1)
          }
        }
        this.deleted.push({
          id: userTagObj[0].id,
          tag_id: objToSwitch.id,
          description: objToSwitch.description
        })
      } else {
        objToSwitch.active = true
        this.user_tags.push({
          id: -1,
          tag_id: objToSwitch.id,
          description: objToSwitch.description,
        })

        for (let i = 0; i < this.deleted.length; i++) {
          if (objToSwitch.id === this.deleted[i].id) {
            this.deleted.splice(i, 1)
          }
        }
      }
    },
    onSubmit (evt) {
      evt.preventDefault()
      CommunityApi.addTags(this.user_tags, this.deleted).then((data) => {
        this.$refs.UserTagsModal.hide()
        Emitter.$emit('userTagsChanged')
      }).catch((err) => {
        this.failedMessage = 'Something went wrong, please try again'
      })
    }
  },
  created () {
    for (let i = 0; i < this.tags.length; i++) {
      for (let j = 0; j < this.user_tags.length; j++) {
        if (this.tags[i].id === this.user_tags[j].tag_id) {
          this.tags[i].active = true
          this.user_tags[j].active = true
        }
      }
    }
  },
  props: ['tags', 'user_tags']
}
</script>

<style scoped>
  .text-danger:hover{
    color:#ff3a4e !important;
    cursor:pointer;
  }
  .btn-ceecee-oval-red.active {
    background-color: #E60000;
    color:#fff;
  }
  .btn-ceecee-oval-red.active:hover{
    background-color: #c60000;
    border-color:#c60000;
  }
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  li {
    float: left;
  }
</style>
