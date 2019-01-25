<template>
  <b-container style="margin-top: 150px;">
    <b-row>
      <admin-menu v-bind:active="active"></admin-menu>
      <b-col md="8" v-if="authorised">
        <b-card no-body class="no-scale">
          <b-tabs card v-model="selectedTab">
            <b-tab title="Spaces" active>
              <b-row v-for="srequest in spaceRequests" id="user-list-item">
                  <AdminCard
                    :firstcol="formatDate(srequest.date)"
                    :secondcol="srequest.space_title"
                    target="#" v-b-modal.spacerequest v-on:click.native="setSRfields(srequest)"></AdminCard>
              </b-row>
            </b-tab>
            <b-tab title="Tours">
              <b-row v-for="trequest in tourRequests" id="user-list-item">
                  <AdminCard
                    :firstcol="formatDate(trequest.date)"
                    secondcol=""
                    target="#"></AdminCard>
              </b-row>
            </b-tab>
            <b-tab title="Events">
               <b-row v-for="erequest in eventRequests" id="user-list-item">
                  <AdminCard
                    :firstcol="formatDate(erequest.start)"
                    :secondcol="erequest.title"
                    target="#" v-b-modal.eventrequest v-on:click.native="setERfields(erequest)"></AdminCard>
              </b-row>
            </b-tab>
          </b-tabs>
        </b-card>
      </b-col>
    </b-row>
    <update-space-request-state-modal :activeSRequest="activeSRequest"></update-space-request-state-modal>
    <request-event-modal :activeERequest="activeERequest"></request-event-modal>
  </b-container>
</template>

<script>
import AdminMenu from '@/components/Admin/AdminMenu'
import moment from 'moment'
import ActionButton from '@/components/Core/Other/ActionButton'
import AdminCard from '@/components/Core/Other/AdminCard'
import RequestApi from '@/services/api/admin/requests.js'
import UpdateSpaceRequestStateModal from '@/components/Core/Modals/Admin/UpdateSpaceRequestStateModal'
import RequestEventModal from '@/components/Core/Modals/Admin/RequestEventModal'

export default {
  name: "requests",
  components: {
    AdminMenu,
    ActionButton,
    AdminCard,
    UpdateSpaceRequestStateModal,
    RequestEventModal
  },
  data() {
    return {
      active: "Requests",
      showRequests: true,
      spaceRequests: [],
      tourRequests: [],
      eventRequests: [],
      activeSRequest: {},
      activeERequest: {},
      authorised: false,
      selectedTab: 0
    }
  },
  methods: {
    formatDate(date) {
      return moment(date).format('DD-MM-YYYY')
    },
    setSRfields(srequest) {
      this.activeSRequest = srequest;
      this.activeSRequest.stringdate = moment(this.activeSRequest.date).format('DD-MM-YYYY');
    },
    setERfields(erequest) {
      this.activeERequest = erequest;
      this.activeERequest.startdate = moment(this.activeERequest.start).format('DD-MM-YYYY hh:mm');
      this.activeERequest.enddate = moment(this.activeERequest.end).format('DD-MM-YYYY hh:mm');
    },
    getSpaceRequests () {
      RequestApi.getSpaceRequests().then(response => {
        if (response.data.success) {
          this.spaceRequests = response.data.data;
        } else {
          this.$toasted.show('Failed to load space requests!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
      }).catch(() => this.getSpaceRequests())
    },
    getEventRequests() {
      RequestApi.getEventRequests().then(response => {
        if (response.data.success) {
          this.eventRequests = response.data.data;
        } else {
          this.$toasted.show('Failed to load event requests!',
              {
                position: 'top-center',
                duration: 3000
              }
          )
        }
      }).catch(() => this.getEventRequests())
    }
  },
  mounted() {
    Emitter.$on('authorised', () => {
      this.authorised = true
      this.getSpaceRequests();
      this.getEventRequests();
    })
    Emitter.$on('updateStateSpaceRequest', (activeSRequest) => {
      let index = this.spaceRequests.findIndex(x => x.id === activeSRequest.id)
      this.spaceRequests.splice(index, 1)
    })
    Emitter.$on('updateStateEventRequest', (activeERequest) => {
      let index = this.eventRequests.findIndex(x => x.id === activeERequest.id)
      this.eventRequests.splice(index, 1)
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
