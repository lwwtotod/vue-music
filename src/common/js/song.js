

export default class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  // 需要通过musicData.songmid获取歌曲vKey
  /* 歌曲vkey
url： https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg?g_tk=1278911659&hostUin=0&format=jsonp&callback=callback&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cid=205361747&uin=0&songmid=000OFXjz0Nljbh&filename=C400000OFXjz0Nljbh.m4a&guid=3655047200
参数：

songmid：歌曲mid。可从歌单、专辑、歌手、排行榜接口中获取
filename：C400 + songmid + .m4a
format：数据格式
jsonpCallback：jsonp回调函数

说明： filename参数值通过songmid拼接而成。如不需要jsonp调用，将format参数值修改为json并且去掉jsonpCallback参数


作者：code_mcx
链接：https://juejin.im/post/5a35228e51882506a463b172
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 */
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400${
      musicData.songmid
    }.m4a?guid=6119249666&vkey=${musicData.vKey}&uin=2502&fromtag=66`
    // url: `http://thirdparty.gtimg.com/C100${musicData.songid}.m4a?fromtag=38`
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach(s => {
    ret.push(s.name)
  })
  return ret.join('/')
}
