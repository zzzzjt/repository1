<template>
  <div>
    <h1>用户登录</h1>
    用户名：<input type="text"><br/>
    密码：<input type="password"><br/>
    <el-button type="primary" @click="getHandle">发送get请求</el-button>
    <el-button type="success" @click="postHandle">发送post请求</el-button>
  </div>
</template>
<script>
import { get,post }  from '../request/request';
export default {
  created() {},
  methods: {
    getHandle(){
      get("/users",{
        params:{
          page:3,
          per:2
        }
      })
      .then(res=>console.log(res));
    },
    postHandle(){
      post('/posts',{name:'hali'})
      .then(
        res=>console.log(res)
      );
    }
  }
};
</script>

<style lang="less" scoped></style>
