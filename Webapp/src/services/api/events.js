import axios from 'axios'
import {store} from '../../main'

export default {
  getEvents() {
    return axios.get('/api/events', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },
  getEventCategories() {
    return axios.get('/api/events/categories', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },getUpcoming() {
    return axios.get('/api/events/upcoming', {
      headers: {
        'x-access-token': store.state.jwt
      }
    })
  },getEvent(id) {
    return axios.get('/api/event/' + id, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  addUserEvent(data) {
    return axios.post('/api/events/userevent', data, {
      headers: {
        'x-access-token': store.state.jwt
      }
    });
  },
  removeUserEvent(data) {
    data.headers = {'x-access-token': store.state.jwt};
    return axios.delete('/api/events/userevent', data)
  },
  getiCalEvent(event_id) {
    axios({
      url: '/api/ical/events/' + event_id,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'event-' + event_id +'.ics'); //or any other extension
      document.body.appendChild(link);
      link.click();
    }).catch(function (err) {
      // Do something with error
      console.log('Failed to get iCal file')
  });
  },
  getiCalAllEvents() {
    axios({
      url: '/api/ical/events',
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
       const url = window.URL.createObjectURL(new Blob([response.data]));
       const link = document.createElement('a');
       link.href = url;
       link.setAttribute('download', 'events.ics'); //or any other extension
       document.body.appendChild(link);
       link.click();
    }).catch(function (err) {
      // Do something with error
      console.log('Failed to get iCal file')
  });
  }
}
