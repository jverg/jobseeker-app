import dayjs from 'dayjs';

require('dayjs/locale/el');

const dayMonthFormat = (date: number, lang: string) => {
  return dayjs(date).locale(lang).format('DD MMM YYYY');
};

export default dayMonthFormat;
