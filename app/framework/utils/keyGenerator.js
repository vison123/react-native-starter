import DeviceInfoDetail from './deviceInfo';
const deviceId = DeviceInfoDetail.getDeviceId();
// import _ from 'lodash';
const _getSessionKey = (t, id, userId, targetId) => {
  // return (f > t ? f + ':' + t : t + ':' + f) + ':' + new Date().getTime() + ':' + _device_id;
  let s = t + ':' + id + ':' + userId;
  if (!!targetId) {
    s = s + ':' + targetId;
  }
  return s;
};

const _getMessageKey = (s, id) => s + ':' + Date.now() + ':' + deviceId + ':' + id;

const _getNewFriendKey = (t, id) => t + ':' + id;

const _getImgKey = (userId) =>
  userId + '-' + Date.now() + '-' + deviceId;

const KeyGenerator = {
  getSessionKey: (t, id, userId, targetId) => _getSessionKey(t, id, userId, targetId),
  getMessageKey: (s, id) => _getMessageKey(s, id),
  getNewFriendKey: (t, id) => _getNewFriendKey(t, id),
  getImgKey: (userId) => _getImgKey(userId)
};

export default KeyGenerator;
