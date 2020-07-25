<template>
  <div id="app">
    <img src="./assets/logo.png" />
    <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ''
    }
  }
}
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
