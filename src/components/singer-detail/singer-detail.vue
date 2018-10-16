<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="Songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getSongVKey } from 'api/song'
import MusicList from 'components/music-list/music-list'
export default {
  components: {
    MusicList
  },
  data() {
    return {
      Songs: []
    }
  },
  computed: {
    title(){
      return this.singer.name
    },
    bgImage(){
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
  },
  methods: {
    _getDetail() {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code == ERR_OK) {
          this.Songs = this._normalizeSongs(res.data.list)
          console.log(this.Songs)
        }
      })
    },

    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        // getSongVKey(item.musicData.songmid).then(res => {
        //   if (res.code == ERR_OK) {
        //     console.log(res)
        //     item.musicData.vKey = res.data.items[0].vkey
        //   }
        // })
        let { musicData } = item
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      });
      return ret
    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>