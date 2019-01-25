<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-row>
          <div class="toggle">
            <div class="switch">
              <input type="radio" class="switch-input" v-on:change="toggle('spaces')" name="view"
                     value="week" id="week" checked>
              <label for="week"
                     class="switch-label switch-label-off">&nbsp;Spaces</label>
              <input type="radio" class="switch-input" v-on:change="toggle('tours')" name="view"
                     value="month" id="month">
              <label for="month"
                     class="switch-label switch-label-on">&nbsp; Tours</label>
              <span class="switch-selection"></span>
            </div>
          </div>
        </b-row>
        <b-row v-if="showRequests" id="cards-container">
          <b-col cols="12" v-for="srequest in spaceRequests">
            <AdminCard
              :firstcol="formatDate(srequest.date)"
              :secondcol="srequest.space_title"
              target="#" v-b-modal.spacerequest v-on:click.native="setSRfields(srequest)"></AdminCard>
          </b-col>
        </b-row>
        <b-row v-if="!showRequests" id="cards-container">
          <h1>TOURSSSSSS</h1>
          <b-col cols="12" v-for="trequest in tourRequests">
            <AdminCard
              :firstcol="formatDate(trequest.date)"
              secondcol=""
              target="#"></AdminCard>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <action-button color="red" :fixed="true" icon="plus" v-b-modal.spacerequest></action-button>
    <update-space-request-state-modal :activeSRequest="activeSRequest"></update-space-request-state-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import moment from 'moment'
import ActionButton from '@/components/Core/Other/ActionButton'
import AdminCard from '@/components/Core/Other/AdminCard'
import RequestApi from '@/services/api/admin/requests.js'
import UpdateSpaceRequestStateModal from '@/components/Core/Modals/Admin/UpdateSpaceRequestStateModal'

export default {
  name: "requests",
  components: {
    AdminMenu,
    ActionButton,
    AdminCard,
    UpdateSpaceRequestStateModal
  },
  data() {
    return {
      active: "Requests",
      showRequests: true,
      spaceRequests: [],
      tourRequests: [],
      activeSRequest: {},
      authorised: false
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    toggle(type) {
      if (type === 'tours') this.showRequests = false;
      else this.showRequests = true;
    },
    setSRfields(srequest) {
      this.activeSRequest = srequest;
      // let stringdate = moment(this.activeSRequest.date).format('DD-MM-YYYY')
      this.activeSRequest.stringdate = moment(this.activeSRequest.date).format('DD-MM-YYYY');
    },
    getSpaceRequests () {
      RequestApi.getSpaceRequests().then(response => {
        if (response.data.success) {
          this.spaceRequests = response.data.data;
        } else {
          this.$toasted.show('Failed to space requests!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
      }).catch(() => this.getSpaceRequests())
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      this.getSpaceRequests()
    })
    Emitter.$on('updateStateSpaceRequest', (activeSRequest) => {
      let index = this.spaceRequests.findIndex(x => x.id === activeSRequest.id)
      this.spaceRequests.splice(index, 1)
    })
  }
}
</script>

<style scoped>
  #cards-container {
    margin-top: 50px;
  }

  .table-borderless tbody th, .table-borderless tbody td {
    padding: 2px;
  }

  .table-borderless tbody th {
    width: 120px;
  }

  /** Toggle classes */
  .switch {
    position: relative;
    display: inline-block;
    width: 30px;
    height: 17px;
  }

  .switch input {
    display: none;
  }

  .toggle {
    position: absolute;
    right: 0;
  }

  .toggle .switch {
    margin: 20px 20px 0px 20px;
    height: 30px;
    border-radius: 5px;
    width: 150px;
    top: -20px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15) !important;
  }

  .switch-label {
    position: relative;
    z-index: 2;
    float: left;
    width: 72px;
    line-height: 26px;
    color: rgba(0, 0, 0, 1);
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    padding-top: 2px;
  }

  .switch-label:active {
    /*font-weight: bold;*/
  }

  .switch-label-off {
    padding-left: 2px;
  }

  .switch-label-on {
    padding-right: 4px;
  }

  .switch-input {
    display: none;
  }

  .switch-input:checked + .switch-label {
    /*font-weight: bold;*/
    color: white;
    -webkit-transition: 0.15s ease-out;
    -moz-transition: 0.15s ease-out;
    -o-transition: 0.15s ease-out;
    transition: 0.15s ease-out;
  }

  .switch-input:checked + .switch-label-off ~ .switch-selection {
    width: 65px;
    left: 5px;
  }

  .switch-input:checked + .switch-label-on ~ .switch-selection {
    left: 70px;
    width: 75px;
    /* Note: left: 50% doesn't transition in WebKit */
  }

  .switch-input:checked + .switch-label-3 ~ .switch-selection {
    width: 100px;
    left: 114px;
  }

  .switch-selection {
    display: block;
    position: absolute;
    z-index: 1;
    top: 4px;
    left: 4px;
    padding-left: 10px;
    padding-right: 10px;
    width: 78px;
    height: 22px;
    background: #E60000;
    border-radius: 5px;
    -webkit-transition: left 0.15s ease-out;
    -moz-transition: left 0.15s ease-out;
    -o-transition: left 0.15s ease-out;
    transition: left 0.15s ease-out;
  }
</style>
