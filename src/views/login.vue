<template>
  <div>
    <h1>用户登录</h1>用户名：
    <input type="text" />
    <br />密码：
    <input type="password" />
    <br />
    <el-checkbox v-model="checked">记住密码</el-checkbox>
    <el-button type="primary" @click="getHandle">发送get请求1</el-button>
    <el-button type="success" @click="postHandle">发送get请求2</el-button>
  </div>
</template>
<script>
import { get, post } from '../request';
export default {
  data() {
    return {
      checked: false,
    };
  },
  created() {},
  methods: {
    //1.  先掉users的接口  返回list
    //在拿list里面第一个id 去请求detail接口
    //分别用promise和 async
    async getHandle() {
      const result = await get(`/admin/hr/work_shifts/page`, {
        name: '',
        abbr: '',
        type: '',
        area_zip: '',
        store_id: '',
        status: '',
        page: 1,
        size: 15,
      });
      console.log(result);
    },
    postHandle() {
      get('/users', {
        params: {
          page: 3,
          per: 2,
        },
      }).then(res => {
        const id = res.data[0].id;
        get('/detail', {
          params: {
            id: id,
          },
        }).then(res => console.log(res));
      });
    },
  },
};
</script>

<style lang="less" scoped></style>
