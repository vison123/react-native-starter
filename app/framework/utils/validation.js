import _ from 'lodash';
/* eslint-disable no-unused-vars */
export default {
  isMobile(data) {
    if (!_.isEmpty(data)) {
      // let re = /^[1]\d{10}$/;
      const re = /^[1][34578]\d{9}/;
      if (!re.test(data)) {
        return false;
      }
      return true;
    }
    return false;
  },
  isComp(data, desc) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
    if (!reg.test(data)) {
      return false;
    }
    return true;
  },
  realName(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[\u4e00-\u9fa5a-zA-Z]{1,10}$/;
      if (!reg.test(data)) {
        return false;
      }
      return true;
    }
    return true;
  },
  isTelephone(data) {
    if (!_.isEmpty(data)) {
      const re = /^0\d{2,3}-?\d{7,8}$/;
      if (!re.test(data)) {
        return false;
      }
      return true;
    }
    return true;
  },
  // 4位以上数字
  isQQ(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[1-9][0-9]{1,20}$/;
      if (!reg.test(data)) {
        // console.log('您输入的QQ号有误，请重新输入');
        return false;
      }
      return true;
    }
    return true;
  },
  // 中文和英文:职务
  isChineseAndEnglish(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[\u4e00-\u9fa5a-zA-Z]+$/;
      if (!reg.test(data)) {
        return false;
      }
      return true;
    }
    return true;
  },
  // 中文和英文:微信
  isWechat(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[a-zA-Z0-9_]{1,40}$/;
      if (!reg.test(data)) {
        return false;
      }
      return true;
    }
    return true;
  },
  // 是否包含中文
  hasChinese(data) {
    if (!_.isEmpty(data)) {
      const reg = /[\u4e00-\u9fa5]+/;
      if (!reg.test(data)) {
        return false;
      }
      return true;
    }
    return true;
  },

  // 是否包含emoji
  isEnableEmoji(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[\w\u4e00-\u9fa5\u0000-\u00FF\uFF00-\uFFFF。、“”……——【】《》]+$/g;
      if (!reg.test(data)) {
        return false;
      }
      return true;
    }
    return true;
  },

  isRealName(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[\u4e00-\u9fa5_a-zA-Z]{1,10}$/;
      if (!reg.test(data)) {
        // console.log('您输入的真实姓名号有误，请重新输入');
        return false;
      }
      return true;
    }
    return true;
  },
  isEmail(data) {
    if (!_.isEmpty(data)) {
      const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!reg.test(data)) {
        // console.log('您输入的邮箱有误，请重新输入');
        return false;
      }
      return true;
    }
    return true;
  },
  isAmount(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[0-9]+(\.[0-9]+)?$/;
      if (!reg.test(data)) {
        // console.log('格式不合法：请输入整数');
        return false;
      }
      return true;
    }
    return true;
  },
  isTerm(data) {
    if (!_.isEmpty(data)) {
      const reg = /^[0-9][0-9]{0,2}$/;
      if (!reg.test(data)) {
        // console.log('格式不合法：请输入整数');
        return false;
      }
      return true;
    }
    return true;
  },
  isRate(data) {
    if (!_.isEmpty(data)) {
      const reg = /^(?=.*[0-9])\d{0,2}(?:\.\d{0,2})?$/;
      if (!reg.test(data)) {
        // console.log('格式不合法：请输入0-99.99之间的小数');
        return false;
      }
      return true;
    }
    return true;
  },
  notNull(data, desc) {
    if (!data) {
      // console.log(desc + '为必填项，不能为空');
      return false;
    }
    return true;
  },
  isNull(data) {
    if (!data) {
      return true;
    }
    return false;
  },
  returnIsNull(valid, data) {
    if (!valid) {
      return '';
    }
    return data;
  }
};
