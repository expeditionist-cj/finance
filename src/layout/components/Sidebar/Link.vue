<template>
  <!-- eslint-disable vue/require-component-is -->
  <component v-bind="linkProps(to)" @click="clickLink(to)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from "@/utils/validate";

export default {
  props: {
    to: {
      type: String,
      required: true
    }
  },
  methods: {
    linkProps(url) {
      if (isExternal(url)) {
        // 生成动态组件
        return {
          is: "a",
          href: url,
          target: "_blank",
          rel: "noopener"
        };
      }
      // return {
      //   is: 'router-link',
      //   to:  url 
      // }
      return {
        is: "div"
      };
    },
    // 点击菜单刷新
    clickLink(path) {
      // 对一些路由的特殊处理
      this.$router.push({
        path,
        query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    }
  }
};
</script>
