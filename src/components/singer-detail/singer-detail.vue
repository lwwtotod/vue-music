<template>
  <div>
11111111111
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'

export default {
  computed: {
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail()
  },
  methods:{
    _getDetail(){
      getSingerDetail(this.singer.id).then((res)=>{
        if(res.code == ERR_OK){
          console.log(res)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>