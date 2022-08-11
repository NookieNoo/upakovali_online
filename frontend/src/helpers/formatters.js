import dayjs from 'dayjs';
import { defaultDayjsDateTimeFormat } from '@app-helpers';

export const formatMoney = (number) =>
    new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(number);

export const formatDateTime = (val) => dayjs(val).format(defaultDayjsDateTimeFormat);
