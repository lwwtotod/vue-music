<template>
  <Scroll class="listview"
          ref="listview"
          :probeType="probeType"
          :listenScroll="listenScroll"
          @scroll="scroll"
          :data="data">
    <ul>
      <li class="list-group"
          ref="listGroup"
          v-for="(group, index) in data"
          :key="index">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="(item, index) in group.items"
              :key="index"
              class="list-group-item">
            <img class="avatar"
                 v-lazy="item.avatar" />
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut"
         @touchmove.stop.prevent="onShortcutTouchMove"
         @touchstart="onShortcutTouchStar">
      <ul>
        <li class="item"
            v-for="(item, index) in shortcuList"
            :data-index="index"
            :class="{'current':currenIndex===index}"
            :key="index">
          {{item}}
        </li>
      </ul>
    </div>
  </Scroll>
</template>

<script> 
import { getData } from 'common/js/dom'
import Scroll from 'base/scroll/scroll'

const ABCHOR_HEIGHT = 18

export default {
  data() {
    return {
      scrollY: -1,
      currenIndex: 0
    }
  },
  components: {
    Scroll
  },
  props: {
    data: {
      type: Array,
      default: []
    },
  },
  computed: {
    shortcuList() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
  methods: {
    onShortcutTouchStar(e) {
      let anchorIndex = getData(e.target, 'index')
      let fristTouch = e.touches[0]
      this.touch.y1 = fristTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let fristTouch = e.touches[0]
      this.touch.y2 = fristTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ABCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scrollTo(anchorIndex)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _scrollTo(index) {
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
    },
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || (-newY > height1 && -newY < height2)) {
          this.currenIndex = i
          console.log(this.currenIndex)
          return
        }
      }
      this.currenIndex = 0
    }
  },
  created() {
    this.touch = {}
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  }
}
</script>

<style scoped lang="stylus">
@import '~common/stylus/variable'

.listview
  position relative
  width 100%
  height 100%
  overflow hidden
  background $color-background

  .list-group
    padding-bottom 30px

    .list-group-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background

    .list-group-item
      display flex
      align-items center
      padding 20px 0 0 30px

      .avatar
        width 50px
        height 50px
        border-radius 50%

      .name
        margin-left 20px
        color $color-text-l
        font-size $font-size-medium

  .list-shortcut
    position absolute
    z-index 30
    right 0
    top 50%
    transform translateY(-50%)
    width 20px
    padding 20px 0
    border-radius 10px
    text-align center
    background $color-background-d
    font-family Helvetica

    .item
      padding 3px
      line-height 1
      color $color-text-l
      font-size $font-size-small

      &.current
        color $color-theme

  .list-fixed
    position absolute
    top 0
    left 0
    width 100%

    .fixed-title
      height 30px
      line-height 30px
      padding-left 20px
      font-size $font-size-small
      color $color-text-l
      background $color-highlight-background

  .loading-container
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>