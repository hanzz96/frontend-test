// dateMixin.js
import moment from 'moment';

export default {
  methods: {
    formatDate(date, format = 'MMMM Do YYYY, h:mm:ss A') {
        console.log(date,'date');
      return date ? moment(date).format(format) : '';
    }
  }
};