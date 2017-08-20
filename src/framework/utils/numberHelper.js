/**
 * Created by vison on 16/4/25.
 */

import numeral from 'numeral';
import validation from './validation';
import _ from 'lodash';
export default {
  number(data) {
    return numeral(data).format('0,0');
  },
  number2(data) {
    return numeral(data / 10000).format('0,0.00');
  },
  number4(data) {
    return numeral(data).format('0,0.0000');
  },
  phoneNumber(data) {
    return data.substring(0, 3) + '****' + data.substring(7, 11);
  },
  formatRate(data) {
    return numeral(data * 1000).format('0,0.00') + '‰';
  },
  formatNum(data, f, e) {
    return data.substring(0, f) + _.pad('', data.length - f - e, '*') + data.substring(data.length - e, data.length);
  },
  formatPhone(data) {
    // 先判断是不是手机号 不是的话 不处理.
    if (validation.isMobile(data)) {
      return data.substring(0, 3) + '-' + data.substring(3, 7) + '-' + data.substring(7, 11);
    }
    return data;
  }
};
