<template>
  <div id="app" v-title="title">
    <transition name="van-fade" mode="out-in">
      <router-view />
      <!-- <keep-alive>
        <router-view v-if="$route.meta.keepAlive" />
      </keep-alive> -->
    </transition>
    <!-- <transition name="van-slide-left" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive" />
    </transition> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  components: {

  },
  data () {
    return {

    }
  },
  methods: {},
  computed: {
    ...mapGetters(['title'])
  }
}
</script>


<style lang="less">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif, "PingFang-SC-Medium";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
