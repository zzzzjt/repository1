<template>
  <div id="all">
    <el-row :gutter="10">
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次名称
          <input type="txet" placeholder="请输入" v-model="params.name" />
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次简称
          <input type="txet" placeholder="请输入" v-model="params.abbr" />
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次类型
          <el-select v-model="defaultType" @change="changeType($event)">
            <el-option
              v-for="(item,index) in typeList"
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
          <el-select v-model="defaultStatus" @change="changeStatus($event)">
            <el-option
              v-for="(item,index) in statusList"
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
          <span :style="{color:TYPE_MAP[scope.row.type].color}">{{TYPE_MAP[scope.row.type].name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="work_time" label="班次时段" width="215">
        <template slot-scope="scope">{{getArrangesTime(scope.row)}}</template>
      </el-table-column>
      <el-table-column prop="total_work_clock" label="总班次时长" width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.total_work_clock > 0 ?`${(scope.row.total_work_clock/60).toFixed(1)}小时` : '--'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="total_rest" label="总休息时间" width="105">
        <template slot-scope="scope">
          <span>{{ scope.row.total_rest > 0 ?`${scope.row.total_rest}分钟` : '--'}}</span>
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
          <div class="shift-color" :style="{background:bgcolor[scope.row.color] || '#ccc'}"></div>
        </template>
      </el-table-column>
      <el-table-column prop="reference_count" label="引用次数" width="105"></el-table-column>
      <el-table-column prop="status" label="班次状态" width="105">
        <template slot-scope="scope">
          <span
            :style="{color:STATUS_MAP[scope.row.status].color}"
          >{{ STATUS_MAP[scope.row.status].name}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="85">
        <el-link type="primary">详情</el-link>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total_item"
      :page-size="15"
      @current-change="currentChange"
    ></el-pagination>
  </div>
</template>
<script>
import { get, post } from '../request';
import { COLOR_MAP, TYPE_MAP, STATUS_MAP } from './constants';
import moment from 'moment';

const option = [];
export default {
  data() {
    return {
      params: {
        name: '',
        abbr: '',
        type: '',
        status: '',
        page: 1,
      },
      TYPE_MAP: TYPE_MAP,
      STATUS_MAP: STATUS_MAP,
      bgcolor: COLOR_MAP,
      typeList: [
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
      defaultType: '0',
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
      statusList: [
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
      defaultStatus: 0,
      tableData: [],
      total_item: 0,
    };
  },
  methods: {
    getArrangesTime(scope) {
      const { contain_relax, work_begin, work_end, relax_begin, relax_end } = scope;
      let str = '';
      if (contain_relax) {
        str = `${moment().set({ h: 0, m: work_begin }).format('HH:mm')}~
          ${moment().set({ h: 0, m: relax_begin }).format('HH:mm')}、
          ${moment().set({ h: 0, m: relax_end }).format('HH:mm')}~
          ${moment().set({ h: 0, m: work_end }).format('HH:mm')}`;
      } else {
        str = `${moment().set({ h: 0, m: work_begin }).format('HH:mm')}~${moment().set({ h: 0, m: work_end }).format('HH:mm')}`;
      }
      return str;
    },
    async getHandle() {
      // a = {name:'111'}  b ={age:12}  {name:'111',age:12}  //es8
      const params = {
        ...this.params,
        ...{
          description: '',
          total_rest: '',
          un_limit_job: '',
          color: '',
          reference_count: '',
          size: 15,
        },
      };
      const result = await get(`/admin/hr/work_shifts/page`, params);
      this.tableData = result.data.data;
      this.total_item = result.data.pager.total_item_count;
      console.log(result.data.pager.total_item_count);
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
    // minChange(min) {
    //   let time = '';
    //   let hour = Math.floor(min / 60);
    //   min = min % 60;
    //   min = (Array(2).join(0) + min).slice(-2);
    //   if (hour > 24) {
    //     hour = (Array(2).join(0) + hour).slice(-2);
    //     hour -= 24;
    //     time = '次日' + hour + ':' + min;
    //   } else {
    //     hour = (Array(2).join(0) + hour).slice(-2);
    //     // console.log(Array(2).join(0) + hour);
    //     time = hour + ':' + min;
    //   }
    //   return time;
    // },
    changeType(event) {
      this.params.type = this.typeList[event].value;
      console.log(this.type);
    },
    changeStatus(event) {
      this.params.status = this.statusList[event].value;
      console.log(this.status);
    },
    currentChange(val) {
      this.params.page = val;
      this.getHandle();
    },
    getHour(val) {
      let hour = val / 60;
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
  display: flex; /*弹性布局*/
  justify-content: center; /*水平居中*/
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
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>