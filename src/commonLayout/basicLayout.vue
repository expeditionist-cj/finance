/** 基础布局：上、中、下 */
<template>
  <div class="basicLayout-wrap">
    <el-card class="box-card" >
      <div class="basicLayout-header">
        <slot name="header"></slot>
      </div>
      <div class="basicLayout-main">
        <slot name="main"></slot>
      </div>
      <div class="basicLayout-footer">
        <slot name="footer"></slot>
      </div>
      
    </el-card>
    <div class="basicLayoutPage-footer">重庆智慧思特大数据有限公司</div>
    <back-to-top :custom-style="customStyleBackToTop" :visibility-height="100" :back-position="0" transition-name="fade" />
  </div>
</template>

<script>
import BackToTop from '@/components/BackToTop';
import {customStyleBackToTop} from "@/globalVariables/index"
export default {
  props: {},
  data() {
    return {
      customStyleBackToTop:customStyleBackToTop
    };
  },
  components: {BackToTop},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style scoped lang="scss">
.basicLayout-wrap {
  // padding: 10px;
  .basicLayout-header {
    // height: 100px;
    margin-bottom: 10px;
  }
  .basicLayout-main {
  }
  .basicLayout-footer {
    margin-top: 10px;
    
  }
  .basicLayoutPage-footer{
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: rgba(255,255,255,0.8);
    // line-height: 20px;
    margin: 12px 0;
    text-align: center
  }
}
</style>
