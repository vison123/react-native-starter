/**
 * Created by baoyinghai on 8/26/16.
 */
import * as types from '../../constants/dictActions';
import Cache from '../store/imCache';
import DictCache from '../../constants/dictCache';
function updateCache(state, action) {
  switch (action.type) {
    case types.IM_INSERT_MESSAGE: {
      if (action.payload.notSave) {
        return;
      }
      const key = DictCache.MESSAGE + action.payload.sessionId;
      const orgData = Cache.getCache(key);
      if (orgData && orgData.dataSource) {
        Cache.updateCache(key, [action.payload.message, ...orgData.dataSource].slice(0, 10));
      }
      break;
    }
    case types.IM_UPDATE_MESSAGE: {
      const key = DictCache.MESSAGE + action.payload.sessionId;
      const orgData = Cache.getCache(key);
      if (orgData && orgData.dataSource) {
        const newSession = [];
        orgData.dataSource.forEach((item) => {
          if (item.msgId === action.payload.msg.msgId) {
            // newSession.push(action.payload.msg);
            // TODO: 只处理status和content
            item.content = action.payload.msg.content;
            item.status = action.payload.msg.status;
          }
          newSession.push(item);
        });
        Cache.updateCache(key, newSession);
      }
      break;
    }
    case types.IM_FORCE_UPDATE_MESSAGE: {
      const key = DictCache.MESSAGE + action.payload.sessionId;
      const orgData = Cache.getCache(key);
      const newSession = [];
      if (orgData && orgData.dataSource) {
        orgData.dataSource.forEach((item) => {
          newSession.push(item);
        });
        Cache.updateCache(key, [action.payload.msg, ...newSession]);
      }
      break;
    }
    default:
  }
}

exports.__esModule = true;
function createCacheMiddleware() {
  return (_ref) => (next) => (action) => {
    const handle = next(action);
    updateCache(_ref.getState(), action);
    return handle;
  };
}

const cacheMiddleware = createCacheMiddleware();
cacheMiddleware.withExtraArgument = createCacheMiddleware;
exports.default = cacheMiddleware;
