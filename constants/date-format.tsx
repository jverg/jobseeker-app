import dayjs from 'dayjs';

const dayMonthFormat = (date: number) => {
  return dayjs(date).format('DD MMM');
};

export default dayMonthFormat;