<template>
  <div id="app">
    <router-link :to="{name:'information'}">查看数据</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
    };
  },
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  font-size: 14px;
  font-family: PingFangSC-Regular;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
