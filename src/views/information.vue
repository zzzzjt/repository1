<template>
  <div id="all">
    <el-row :gutter="10">
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次名称
          <input type="txet" placeholder="请输入" v-model="name" />
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次简称
          <input type="txet" placeholder="请输入" v-model="abbr" />
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次类型
          <el-select v-model="value1" @change="changeValue1($event)">
            <el-option
              v-for="(item,index) in options1"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          适用门店
          <el-select v-model="value2">
            <el-option
              v-for="item in options2"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次状态
          <el-select v-model="value3" @change="changeValue3($event)">
            <el-option
              v-for="(item,index) in options3"
              :key="index"
              :label="item.label"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          <el-button type="primary" @click="getHandle">查询</el-button>
          <el-button @click="postHandle">创建</el-button>
        </div>
      </el-col>
    </el-row>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="name" label="班次名称" width="105"></el-table-column>
      <el-table-column prop="abbr" label="班次简称" width="105"></el-table-column>
      <el-table-column prop="type" label="班次类型" width="105">
        <template slot-scope="scope">
          <span v-if="scope.row.type==0" style="color:orange">固定</span>
          <span v-if="scope.row.type==1" style="color:purple">灵活</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="contain_relax,work_begin,work_end,relax_begin,relax_end"
        label="班次时段"
        width="215"
      >
        <template slot-scope="scope">
          <span v-if="scope.row.contain_relax==true">
            {{minChange(scope.row.work_begin) }}-{{minChange(scope.row.relax_begin)}}、
            {{minChange(scope.row.relax_end)}}-{{minChange(scope.row.work_end)}}
          </span>
          <span
            v-if="scope.row.contain_relax==false"
          >{{minChange(scope.row.work_begin)}}-{{minChange(scope.row.work_end)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="total_rest" label="总休息时间" width="105">
        <template slot-scope="scope">
          <span v-if="scope.row.total_rest>0">{{scope.row.total_rest}}分钟</span>
          <span v-else>--</span>
        </template>
      </el-table-column>
      <el-table-column prop="un_limit_job" label="适用岗位" width="105">
        <template slot-scope="scope">
          <span v-if="scope.row.un_limit_job==0">指定岗位</span>
          <span v-if="scope.row.un_limit_job==1" style="color:orange">不限</span>
        </template>
      </el-table-column>
      <el-table-column prop="color" label="班次颜色" width="105">
        <template slot-scope="scope">
          <div
            class="shift-color"
            v-if="scope.row.color>0&&scope.row.color<=20"
            :style="{background:bgcolor[scope.row.color]}"
          ></div>
          <div class="shift-color" v-else :style="{background:bgcolor[0]}"></div>
        </template>
      </el-table-column>
      <el-table-column prop="reference_count" label="引用次数" width="105"></el-table-column>
      <el-table-column prop="status" label="班次状态" width="105">
        <template slot-scope="scope">
          <span v-if="scope.row.status==0">关闭</span>
          <span v-if="scope.row.status==1" style="color:red">启用</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="85">
        <el-link type="primary">详情</el-link>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { get, post } from '../request';
export default {
  data() {
    return {
      name: '',
      abbr: '',
      type: '',
      status: '',
      bgcolor: [
        '#ccc',
        '#FF649D',
        '#FF649D66',
        '#FF494966',
        '#FF4949',
        '#FF9B3366',
        '#FF9B33',
        '#FFDB1066',
        '#FFDB10',
        '#94E31966',
        '#94E319',
        '#19D687',
        '#19D68766',
        '#54DDDA',
        '#54DDDA66',
        '#3092FD',
        '#3092FD66',
        '#9059F4',
        '#9059F466',
        '#CA1DCE',
        '#CA1DCE66',
      ],
      options1: [
        {
          id: '0',
          label: '不限',
          value: '',
        },
        {
          id: '1',
          label: '固定',
          value: '0',
        },
        {
          id: '2',
          label: '灵活',
          value: '1',
        },
      ],
      value1: '0',
      options2: [
        {
          value: '1',
          label: '不限',
        },
        {
          value: '2',
          label: '指定岗位',
        },
      ],
      value2: '1',
      options3: [
        {
          id: 0,
          label: '不限',
          value: '',
        },
        {
          id: 1,
          label: '关闭',
          value: '0',
        },
        {
          id: 2,
          label: '启用',
          value: '1',
        },
      ],
      value3: 0,
      tableData: [],
    };
  },
  methods: {
    async getHandle() {
      const result = await get(`/admin/hr/work_shifts/page`, {
        name: this.name,
        abbr: this.abbr,
        type: this.type,
        description: '',
        total_rest: '',
        un_limit_job: '',
        color: '',
        reference_count: '',
        status: this.status,
        page: 1,
        size: 15,
      });
      this.tableData = result.data.data;
    },
    async postHandle() {
      const res = await post(`/admin/hr/work_shifts/page`, {
        name: this.name,
        abbr: this.abbr,
        type: this.type,
        description: '',
        total_rest: '',
        un_limit_job: '',
        color: '',
        reference_count: '',
        status: this.status,
      });
      if (res.data.errmsg) {
        alert(res.data.errmsg);
      }
    },
    minChange(min) {
      let time = '';
      let hour = Math.floor(min / 60);
      min = min % 60;
      min = (Array(2).join(0) + min).slice(-2);
      if (hour > 24) {
        hour = (Array(2).join(0) + hour).slice(-2);
        hour -= 24;
        time = '次日' + hour + ':' + min;
      } else {
        hour = (Array(2).join(0) + hour).slice(-2);
        // console.log(Array(2).join(0) + hour);
        time = hour + ':' + min;
      }
      return time;
    },
    changeValue1(event) {
      this.type = this.options1[event].value;
      console.log(this.type);
    },
    changeValue3(event) {
      this.status = this.options3[event].value;
      console.log(this.status);
    },
  },
  mounted() {
    this.getHandle();
  },
};
</script>
<style scoped>
input {
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  width: 217px;
  outline: 0;
  padding: 0 15px;
  transition: border-color 0.2s;
}
.el-col {
  border-radius: 4px;
  margin-bottom: 10px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.el-table {
  border-top: 1px solid #dcdfe6;
}
.shift-color {
  width: 80px;
  height: 25px;
  border-radius: 4px;
}
#all {
  padding: 20px;
  border: 30px solid #ebeef5;
}
</style>