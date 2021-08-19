<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
     <MyBackToTop target=".app-main"></MyBackToTop>
  </section>
</template>

<script>
import BackToTop from '@/components/BackToTop';
import {customStyleBackToTop} from "@/globalVariables/index";
import MyBackToTop from "@/components/MyBackToTop/index"
export default {
  name: 'AppMain',
  components:{MyBackToTop},
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  height: 100vh;
  width: 100%;
  position: relative;
  overflow: auto;
  // background: #f5f6fa;
  padding: 10px;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 84px);
  }

  .fixed-header+.app-main {
    padding-top: 40px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
