<template>
  <div class="vue-scroller-wrap" v-if="viewOrg">
    <div class="tip">今天日报未填写项目：</div>
    <div class="scroller-wrap" @click="onDetail">
      <vue-seamless-scroll
        :data="newsList"
        :class-option="optionLeft"
        class="seamless-warp"
        ref="seamless"
      >
        <ul class="item">
          <li v-for="(item,index) in scrollerDada" :key="index">
            <span>{{ item }}</span>
          </li>
        </ul>
      </vue-seamless-scroll>
      <!-- <el-button size="mini" type="info" @click="onCopy">复制</el-button> -->
    </div>
    <el-dialog
      title="今天日报未填项目"
      :visible.sync="dialogVisible"
      :modal="true"
      :append-to-body="true"
      width="60%"
    >
      <div class="tool">
        <el-button @click="onCopy" size="small" type="primary">复制</el-button>
      </div>
      <el-table :data="newsList" border size="small">
        <el-table-column property="orgName" label="项目名称" align="center"></el-table-column>
        <el-table-column property="orgShortName" label="项目简称" align="center"></el-table-column>
        <el-table-column property="bank" label="开户银行" align="center"></el-table-column>
        <el-table-column property="account" label="账号" align="center"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { getPlantDs } from "@/api/vueScroller.js";
import moment from "moment";
import { getViewOrg } from "@/utils/auth.js";
export default {
  props: {},
  data() {
    return {
      newsList: [],
      tm: moment(Date.now()).format("YYYY-MM-DD") + " " + "00:00:00",
      dialogVisible: false,
      show: false,
      scrollerDada: "",
    };
  },
  components: { vueSeamlessScroll },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
      };
    },
    viewOrg() {
      return getViewOrg() == "" ? true : false;
    },
  },
  created() {},
  mounted() {
    this.init();
    this.interval = setInterval(() => {
      this.init();
    }, 30000);
  },
  watch: {},

  methods: {
    async init() {
      try {
        await this.getPlantDs(moment().format("YYYY-MM-DD"));
        return true;
      } catch (error) {
        return false;
      }
    },
    // 根据电厂获取数据状态
    getPlantDs(day) {
      getPlantDs({ day: day }).then((res) => {
        let data = res.data;
        let arry = [];
        data.forEach((item) => {
          if (arry.indexOf(item.orgName + "-" + item.orgShortName) < 0) {
            arry.push(item.orgName + "-" + item.orgShortName);
          }
        });
        this.newsList = data;
        this.scrollerDada = arry.length > 0 ? arry : ["暂无"];
      });
    },
    onCopy() {
      let data = this.scrollerDada;
      data = `${data.join(` 
        `)}`;
      let oInput = document.createElement("input");
      oInput.value = data;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = "oInput";
      oInput.style.display = "none";
      this.$message.success("复制成功");
    },
    onDetail(e) {
      this.dialogVisible = true;
      this.init();
    },
    destroyed() {
      clearInterval(this.interval);
    },
  },
};
</script>

<style scoped lang="scss">
.vue-scroller-wrap {
  width: 1000px;
  height: 32px;
  position: fixed;
  top: 10px;
  left: 50%;
  margin-left: -250px;
  z-index: 30;
  display: flex;
  .tip {
    margin-top: 15px;
    color: #97a8be;
  }
  .seamless-warp {
    width: 500px;
    height: 35px;
    position:relative;
    overflow: hidden;
    ul.item {
      min-width: 300px;
      cursor: pointer;
      li {
        list-style: none;
        float: left;
        margin-right: 10px;
        color: #97a8be;
        cursor: pointer;
      }
    }
  }
}
.tool {
  margin-bottom: 10px;
  text-align: right;
}
</style>
