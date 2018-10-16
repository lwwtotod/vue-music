import jsonp from 'common/js/jsonp'
import { commonParams, options } from './config'


// 获取音乐接口vkey
export function getSongVKey(mid) {
  const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  
  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    g_tk: 1664029744,
    platform: 'yqq',
    needNewCode: '0',
    cid: '205361747',
    uin: '0',
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: '3655047200'
  })

  return jsonp(url, data)
}
