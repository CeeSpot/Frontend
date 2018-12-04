<template>
  <b-container class="p-3 container-margin">
    <full-calendar :events="events" :config="config" @event-selected="eventSelected"></full-calendar>

        <div>
            <!-- Modal Component -->
            <b-modal id="EventModal" ref="EventModalRef" :title="SelectedEvent.title" hide-footer>
              <p class="my-4">Hello from modal!</p>
            </b-modal>
        </div>
  </b-container>
</template>

<script>
export default {
  name: 'Events',
  data() {
    return {
      events: [
        {
            title  : 'BlaBla',
            start  : '2018-12-04',
        },
        {
            title  : 'event2',
            start  : '2018-12-05',
            end    : '2018-12-06',
        },
        {
            title  : 'event3',
            start  : '2018-12-07T12:30:00',
            allDay : false,
        },
      ],
      config: {
        defaultView: 'month',
        editable: false
      },
      SelectedEvent: {
        title: '',
        description: ''
      } 
    }
  },
  mounted () {
  },
  methods: {
    eventSelected(event, jsEvent, view){
      this.SelectedEvent.title = event.title;
      this.$refs.EventModalRef.show()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .col{
    background: #000;
    border:1px solid green;
    color: #fff;
  }

  .container-margin {
    margin-top: 130px;
  }

  .modal-header {
    background-color: #E60000;
  }
</style>
