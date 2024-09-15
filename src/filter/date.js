// dateMixin.js
import moment from 'moment';

export default {
  methods: {
    formatDate(date, format = 'MMMM Do YYYY, h:mm:ss A') {
      if(date === null || date === undefined) return 'Invalid Date';
      return date ? moment(date).format(format) : '';
    }
  }
};