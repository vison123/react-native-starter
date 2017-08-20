import Qs from 'qs';
import qiniu from './qiniu/index';
import MxFetch from './mxFetch';
import KeyGenerator from '../../comp/utils/keyGenerator';
import Config from '../../../config';
const { ImageHost, ImageBkt, ImageAk, ImageSk } = Config;
import { getNetWorkState, getToken, getUserId } from '../service/CacheService';
const _getHeader = () => {
  return {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Basic  ' + getToken()
  };
};

// eslint-disable-next-line arrow-body-style, no-unused-vars
const process = (_promise) => {
  return new Promise((resolve, reject) => {
    if (getNetWorkState()) {
      _promise.then((response) => response.text())
        .then((response) => {
          if (response === '') {
            resolve({});
          } else {
            const json = JSON.parse(response);
            if (json.msgContent || json.errMsg || json.code === 'version upgrade') {
              reject(json);
            } else {
              resolve(json);
            }
          }
        })
        .catch((errorData) => {
          reject(errorData);
        });
    } else {
      reject({
        message: '请检查网络链接'
      });
    }
  });
};


const rawFetch = (url, param) => {
  /* eslint-disable no-console */
  console.log('以下打印一次传出去的param:');
  console.log(param);
  console.log('请求地址:' + url);
  /* eslint-enable */
  // if (!option) { option = {}; }
  if (getNetWorkState()) {
    const _promise = Promise.race([MxFetch.fetch(url, param, 6180), new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('请求失败，请检查您的网络连接')), 15000);
    })]);
    // process(fetch(url, param) ,callback,failure,option);

    return process(_promise);
  }
  return new Promise((r, j) => {
    j(new Error('请求失败，请检查您的网络连接'));
  });
};

export const BFetch = (url, param) => {
  // const headers = _getHeader();
  // Object.assign({}, _getHeader(), { 'Authorization': 'Basic  ' + token });
  const headers = {
    ..._getHeader()
  };
  return rawFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(param)
  });
};

export const BFetch1 = (url, param) => {
  const headers = {
    ..._getHeader()
  };
  return rawFetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(param),
  });
};

export const PFetch = (url, param) => {
  const headers = {
    ..._getHeader()
  };
  return rawFetch(url + '?' + Qs.stringify(param), {
    method: 'POST',
    headers,
  });
};

// eslint-disable-next-line arrow-body-style
export const UFetch = (url, param) => {
  return new Promise((resolve, reject) => {
    qiniu.conf.ACCESS_KEY = ImageAk;
    qiniu.conf.SECRET_KEY = ImageSk;
    const fileName = KeyGenerator.getImgKey(getUserId());
    const putPolicy = new qiniu.auth.PutPolicy2(
      {
        scope: ImageBkt + ':' + fileName,
      }
    );
    const uptoken = putPolicy.token();
    qiniu.rpc.uploadImage(param.uri, fileName, uptoken, (resp) => {
      if (resp.status === 200) {
        resolve({
          fileUrl: ImageHost + fileName,
        });
      } else {
        reject(resp.status);
      }
    // console.log(JSON.stringify(resp));
    }).catch((err) => {
      reject(err);
    });
  });
};

// eslint-disable-next-line arrow-body-style
export const DPUFetch = (url, param) => {
  return new Promise((resolve, reject) => {
    qiniu.conf.ACCESS_KEY = ImageAk;
    qiniu.conf.SECRET_KEY = ImageSk;
    const fileName = param.name;
    const putPolicy = new qiniu.auth.PutPolicy2(
      {
        scope: ImageBkt + ':' + fileName,
      }
    );
    const uptoken = putPolicy.token();
    qiniu.rpc.uploadImage(param.uri, fileName, uptoken, (resp) => {
      if (resp.status === 200) {
        resolve({
          fileUrl: ImageHost + fileName,
        });
      } else {
        reject(resp.status);
      }
    }).catch((err) => {
      reject(err);
    });
  });
};

export const UFetchBak = (url, param) => {
  const headers = {
    ..._getHeader()
  };
  const formdata = new FormData();
  formdata.append('file', param);
  return rawFetch(url, {
    method: 'POST',
    headers,
    body: formdata,
  });
};

export default {
  BFetch,
  PFetch,
  UFetch,
  DPUFetch,
  BFetch1,
};
