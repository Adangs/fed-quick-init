import Fetch from '@system.fetch';
import prompt from '@system.prompt';
import config from '../config';

export default (options = {}) => {
  options = Object.assign({ method: 'GET', data: {} }, options)
  if (config.LOG) {
    console.info(`${new Date().toLocaleString()}【 API=${config.API + options.url} 】DATA=${JSON.stringify(options.data)}`);
  }
  return Fetch.fetch({
    url: config.API + options.url,
    data: Object.assign({
      version: config.version,
      channel: 'quickapp',
      apk_id: 37,
      channel_id: '90028a',
      app_id: 'h9039j',
      game_id: 266,
      vcode: '13.00.4.0'
    }, options.data),
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: options.method.toUpperCase(),
  }).then((res) => {
    const data = JSON.parse(res.data.data);
    if (config.LOG) {
      console.info(`${new Date().toLocaleString()}【 API=${config.API + options.url} 】【接口响应：】`, data);
    }
    if (data.error_code !== 0) {
      prompt.showToast({
        message: `${data.error_msg}~` || data.error_code,
      });
    }
    // console.log('ok -> ', data);
    return data;
  }).catch(() => {
    prompt.showToast({
      message: '出错啦~',
    });
  })
}
