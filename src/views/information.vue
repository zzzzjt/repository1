<template>
  <div id="all">
    <el-row :gutter="10">
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次名称
          <input type="txet" placeholder="请输入" />
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次简称
          <input type="txet" placeholder="请输入" />
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          班次类型
          <el-select v-model="value1">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
          <el-select v-model="value3">
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :sm="10" :md="9" :lg="8">
        <div class="grid-content bg-purple">
          <el-button type="primary">查询</el-button>
          <el-button>创建</el-button>
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
          <div class="shift-color" v-if="scope.row.color==1" style="background:#FF649D;"></div>
          <div class="shift-color" v-else-if="scope.row.color==2" style="background:#FF649D66;"></div>
          <div class="shift-color" v-else-if="scope.row.color==3" style="background:#FF494966;"></div>
          <div class="shift-color" v-else-if="scope.row.color==4" style="background:##FF4949;"></div>
          <div class="shift-color" v-else-if="scope.row.color==5" style="background:##FF9B3366;"></div>
          <div class="shift-color" v-else-if="scope.row.color==6" style="background:#FF9B33;"></div>
          <div class="shift-color" v-else-if="scope.row.color==7" style="background:#FFDB1066;"></div>
          <div class="shift-color" v-else-if="scope.row.color==8" style="background:##FFDB10;"></div>
          <div class="shift-color" v-else-if="scope.row.color==9" style="background:#94E31966;"></div>
          <div class="shift-color" v-else-if="scope.row.color==10" style="background:#94E319;"></div>
          <div class="shift-color" v-else-if="scope.row.color==11" style="background:#19D687;"></div>
          <div class="shift-color" v-else-if="scope.row.color==12" style="background:#19D68766;"></div>
          <div class="shift-color" v-else-if="scope.row.color==13" style="background:#54DDDA;"></div>
          <div class="shift-color" v-else-if="scope.row.color==14" style="background:#54DDDA66;"></div>
          <div class="shift-color" v-else-if="scope.row.color==15" style="background:#3092FD;"></div>
          <div class="shift-color" v-else-if="scope.row.color==16" style="background:#3092FD66;"></div>
          <div class="shift-color" v-else-if="scope.row.color==17" style="background:#9059F4;"></div>
          <div class="shift-color" v-else-if="scope.row.color==18" style="background:#9059F466;"></div>
          <div class="shift-color" v-else-if="scope.row.color==19" style="background:#CA1DCE;"></div>
          <div class="shift-color" v-else-if="scope.row.color==20" style="background:#CA1DCE66;"></div>
          <div class="shift-color" v-else style="background:#ccc"></div>
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
      type: 0 || 1,
      status: 0 || 1,
      options1: [
        {
          value: '选项1',
          label: '不限',
        },
        {
          value: '选项2',
          label: '固定',
        },
        {
          value: '选项3',
          label: '灵活',
        },
      ],
      value1: '',
      options2: [
        {
          value: '选项1',
          label: '不限',
        },
        {
          value: '选项2',
          label: '指定岗位',
        },
      ],
      value2: '',
      options3: [
        {
          value: '选项1',
          label: '不限',
        },
        {
          value: '选项2',
          label: '启用',
        },
        {
          value: '选项3',
          label: '关闭',
        },
      ],
      value3: '',
      tableData: [],
    };
  },
  methods: {
    async getHandle() {
      const result = await get(`/admin/hr/work_shifts/page`, {
        name: '',
        abbr: '',
        type: '',
        description: '',
        total_rest: '',
        un_limit_job: '',
        color: '',
        reference_count: '',
        status: '',
        page: 1,
        size: 15,
      });
      this.tableData = result.data.data;
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