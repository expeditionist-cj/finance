<template>
  <div class="my-back-to-top-wrap" >
    <el-backtop   :visibility-height="50" :target="target" :bottom="100">
      <div
        :style="custormStyle"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 17 17"
          xmlns="http://www.w3.org/2000/svg"
          class="Icon Icon--backToTopArrow"
          aria-hidden="true"
          style="height:16px;width:16px"
        >
          <path
            d="M12.036 15.59a1 1 0 0 1-.997.995H5.032a.996.996 0 0 1-.997-.996V8.584H1.03c-1.1 0-1.36-.633-.578-1.416L7.33.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.004z"
          />
        </svg>
      </div>
    </el-backtop>
  </div>
</template>

<script>
export default {
  props: {
    target: "",
    custormStyle: {
      type: Object,
      default: () => {
        return {
          height: "100%",
          width: "100%",
          "background-color": "#f2f5f6",
          "box-shadow": "0 0 6px rgba(0,0,0, .12)",
          "text-align": "center",
          "line-height": "40px",
          color: "#1989fa"
        };
      }
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    
  }
};
</script>

<style lang="scss">
.my-back-to-top-wrap {
  .Icon {
    fill: #9aaabf;
    background: none;
  }
}
</style>
