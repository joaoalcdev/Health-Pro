import moment from 'moment';

export function formatDate(date) {
  date = new Date(date);
  return moment(date).format('L');
}


export function formatDateTime(date) {
  date = new Date(date);
  return moment(date).format('h:mm:ss a');
}