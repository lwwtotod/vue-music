<template>
  <transition name="slide">
    <div class="singer-detail">
    </div>
  </transition>

</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { getSongVKey } from 'api/song'
export default {
  data() {
    return {
      Song: {

      }
    }
  },
  computed: {
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
          this._normalizeSongs(res.data.list)
        }
      })
    },


    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        getSongVKey(item.musicData.songmid).then(res => {
          if (res.code == ERR_OK) {
            console.log(res)
            item.musicData.vKey = res.data.items[0].vkey
            let { musicData } = item
            if (musicData.songid && musicData.albummid) {
              ret.push(createSong(musicData))
              console.log(ret)
            }
          }
        })

      });

      // this.songs = ret

    }
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'

.singer-detail
  position fixed
  z-index 100
  top 0
  left 0
  right 0
  bottom 0
  background $color-background

.slide-enter-active, .slide-leave-active
  transition all 0.3s

.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>