<template>
  <div class="dayReport" ref="dayReport">
    <BasicLayout>
      <div slot="header" style="display: flex; justify-content: space-between">
        <el-date-picker
          v-model="day"
          type="date"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
          placeholder="选择日期"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
        <div>
          <el-button
            type="primary"
            @click="onPreview"
            v-if="viewOrg"
            size="small"
            >预览</el-button
          >
          <el-button
            type="primary"
            @click="handleExports"
            v-if="viewOrg"
            size="small"
            >导出</el-button
          >
        </div>
      </div>
      <div slot="main">
        <!-- :cell-style="columnStyle" -->
        <div class="table-title">日银行存款余额统计表（元）</div>
        <el-table
          :data="tableData"
          ref="table"
          :span-method="objectSpanMethod_write"
          border
          :height="height"
          style="width: 100%"
        >
          <el-table-column
            prop="pname"
            align="center"
            label="单位"
          ></el-table-column>
          <!-- <el-table-column type="index" align="center" label="序号"></el-table-column> -->
          <el-table-column
            prop="orgShortName"
            label="项目名称"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="bank"
            label="开户银行"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="account"
            label="账号"
            min-width="120"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dayBalanceAmount"
            label="当天银行结余金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="yesterdayBalanceAmount"
            label="前一天银行结余金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dayBookAmount"
            label="当天账面余额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="yesterdayBookAmount"
            label="对比前一天银行余额差额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dayDraftAmount"
            label="当天汇票金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="dayReceiptAmount"
            label="当天收款金额"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="sumReceiptAmount"
            label="收款金额累计"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="remark"
            label="说明"
            align="center"
          ></el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="onWrite(scope.row)"
                v-if="!(scope.row.bank == '合计' || scope.row.bank == '小计')"
                type="text"
                size="small"
                >填写</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </BasicLayout>
    <!-- :before-close="handleClose"  -->
    <el-drawer :title="draw_title" :visible.sync="drawer" size="60%">
      <div class="drawer-content">
        <el-row>
          <el-form
            ref="elForm"
            :model="formData"
            :rules="rules"
            size="medium"
            label-width="100px"
          >
            <el-row style="margin-bottom: 20px">
              <el-col :span="12">
                <div
                  style="text-align: center; color: rgba(255, 255, 255, 0.6)"
                >
                  开户银行：
                  <span>{{ formData.bank }}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div
                  style="text-align: center; color: rgba(255, 255, 255, 0.6)"
                >
                  账号：
                  <span>{{ formData.account }}</span>
                </div>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="当天银行结余金额（￥）"
                prop="dayBalanceAmount"
              >
                <el-input
                  v-model="formData.dayBalanceAmount"
                  @input="(e) => (formData.dayBalanceAmount = inputMe(e))"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="前一天银行结余金额（￥）"
                prop="yesterdayBalanceAmount"
              >
                <el-input
                  v-model="formData.yesterdayBalanceAmount"
                  @input="(e) => (formData.yesterdayBalanceAmount = inputMe(e))"
                  :disabled="true"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-divider></el-divider>
            </el-col>-->
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="当天账面余额（￥）"
                prop="dayBookAmount"
              >
                <el-input
                  v-model="formData.dayBookAmount"
                  @input="(e) => (formData.dayBookAmount = inputMe(e))"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="对比前一天银行余额差额（￥）"
                prop="yesterdayBookAmount"
              >
                <el-input
                  :value="
                    inputMe(
                      Math.round(
                        (delcommafy(formData.dayBalanceAmount) -
                          delcommafy(formData.yesterdayBalanceAmount)) *
                          100
                      ) / 100
                    )
                  "
                  :disabled="true"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-divider></el-divider>
            </el-col>-->
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="当天汇票金额（￥）"
                prop="dayDraftAmount"
              >
                <el-input
                  v-model="formData.dayDraftAmount"
                  @input="(e) => (formData.dayDraftAmount = inputMe(e))"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="当天收款金额（￥）"
                prop="dayReceiptAmount"
              >
                <el-input
                  v-model="formData.dayReceiptAmount"
                  @input="(e) => (formData.dayReceiptAmount = inputMe(e))"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                label-width="220px"
                label="收款金额累计（￥）"
                prop="sumReceiptAmount"
              >
                <el-input
                  v-model="formData.sumReceiptAmount"
                  @input="(e) => (formData.sumReceiptAmount = inputMe(e))"
                  :disabled="true"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="24">
              <el-form-item label-width="80px" label="说明" prop="remark">
                <el-input
                  v-model="formData.remark"
                  type="textarea"
                  placeholder="如果[对比前一天银行余额差额]有差额或[当天收款金额]超过100万元，则[说明]为必填项，限150字"
                  :maxlength="150"
                  :autosize="{ minRows: 4, maxRows: 10 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button size="small" type="primary" @click="submitForm"
                  >提交</el-button
                >
                <!-- <el-button size="small" @click="resetForm">重置</el-button> -->
                <el-button size="small" @click="onCancle">取消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-drawer>
    <!-- 预览 -->
    <el-dialog
      :title="dialogTitle"
      width="100%"
      :visible.sync="dialogTableVisible"
      center
    >
      <el-table
        :data="previewTableData"
        border
        style="width: 100%"
        ref="previewTable"
        :span-method="objectSpanMethod"
        :row-style="getRowStyle"
        :height="previewTableDataHeight"
      >
        <el-table-column
          prop="pname"
          align="center"
          label="单位"
        ></el-table-column>
        <!-- <el-table-column type="index" align="center" label="序号"></el-table-column> -->
        <el-table-column
          prop="orgShortName"
          label="项目名称"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="bank"
          label="开户银行"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="account"
          label="账号"
          min-width="120"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dayBalanceAmountStr"
          label="当天银行结余金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="yesterdayBalanceAmountStr"
          label="前一天银行结余金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dayBookAmountStr"
          label="当天账面余额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="yesterdayBookAmountStr"
          label="对比前一天银行余额差额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dayDraftAmountStr"
          label="当天汇票金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="dayReceiptAmountStr"
          label="当天收款金额"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="sumReceiptAmountStr"
          label="收款金额累计"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="remark"
          label="说明"
          align="center"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import {
  getDayReport,
  addDayReport,
  previewDayReport,
  getYesterdayData,
} from "@/api/dayReport.js";
import { getUid, getViewOrg } from "@/utils/auth.js";
import { excel } from "@/api/common";
import { array } from "jszip/lib/support";
export default {
  components: {},
  props: [],
  data() {
    return {
      draw_title: "填写",
      dialogTitle: "日银行存款余额统计表（元）",
      day: moment().format("YYYY-MM-DD"),
      drawer: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      formData: {
        dayBalanceAmount: "",
        yesterdayBalanceAmount: "",
        dayBookAmount: "",
        yesterdayBookAmount: "",
        dayDraftAmount: "",
        dayReceiptAmount: "",
        sumReceiptAmount: "",
        remark: "",
      },
      rules: {
        dayBalanceAmount: [
          {
            required: true,
            message: "当天银行结余金额不能为空",
            trigger: "blur",
          },
        ],
        // yesterdayBalanceAmount: [
        //   {
        //     message: "",
        //     trigger: "blur",
        //   },
        // ],
        dayBookAmount: [
          {
            required: true,
            message: "当天账面余额不能为空",
            trigger: "blur",
          },
        ],
        // yesterdayBookAmount: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur",
        //   },
        // ],
        // dayDraftAmount: [
        //   {
        //     message: "",
        //     trigger: "blur",
        //   },
        // ],
        // dayReceiptAmount: [
        //   {
        //     message: "",
        //     trigger: "blur",
        //   },
        // ],
        // sumReceiptAmount: [
        //   {
        //     required: true,
        //     message: "",
        //     trigger: "blur",
        //   },
        // ],
        // remark: [
        //   {
        //     message: "",
        //     trigger: "blur",
        //   },
        // ],
      },
      tableData: [],
      dialogTableVisible: false,
      previewTableData: [],
      previewTableDataSum: [],
      spanArr_pname: [],
      pos_pname: 0,
      spanArr_orgName: [],
      pos_orgName: 0,
      spanArr_pname_write: [],
      pos_pname_write: 0,
      spanArr_orgName_write: [],
      pos_orgName_write: 0,
      height: 400,
      previewTableDataHeight: "88vh",
    };
  },
  computed: {
    viewOrg() {
      return getViewOrg() == "" ? true : false;
    },
  },
  watch: {
    day(value) {
      this.init(value);
    },
    dialogTableVisible(value) {
      if (!value) {
        this.previewTableData = [];
      }
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.height = "calc(100vh - 198px)";
    });
    this.init(this.day);
  },
  methods: {
    //  转千分位
    inputMe(str) {
      str = str.toString().replace(/[^\d^\.]+/g, "");
      let e = str;
      let num = this.delcommafy(e);
      if (num.length == 0) {
        return "";
      }
      e = e.toString();
      let result = this.comdify(num);
      let res = "";
      if (result.indexOf(".") < 0) {
        res = result;
      } else {
        res =
          result.slice(result.length - 1) == "." &&
          result.indexOf(".") == result.length - 1
            ? result
            : result.split(".")[0] + "." + result.split(".")[1];
      }
      return res;
    },
    comdify(n) {
      let re = /\d{1,3}(?=(\d{3})+$)/g;
      let n1 = n.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
        return s1.replace(re, "$&,") + s2;
      });
      return n1;
    },
    //去除千分位中的‘，’
    delcommafy(num) {
      num = num.toString();
      num = num.replace(/,/gi, "");
      return num;
    },
    // 初始化
    init(value) {
      getDayReport({ day: value }).then((res) => {
        let data = res.data;
        data.forEach((ele, idx, data) => {
          if (ele.bank == "小计") {
            ele.pname = data[idx - 1].pname;
            ele.orgName = data[idx - 1].orgName;
          } else if (ele.bank == "合计") {
            ele.pname = data[idx - 2].pname;
          }
        });
        this.getspanArr_pname_write(data);
        this.getspanArr_orgName_write(data);
        let arr = [];
        data.forEach((ele) => {
          if (
            ele.yesterdayBalanceAmount == null &&
            ele.dayBalanceAmount == null
          ) {
            ele.yesterdayBookAmount = "";
          }
        });
        let arry = JSON.parse(JSON.stringify(data)); 
        arry.forEach((ele) => {
          let obj = {};
          for (var k in ele) { 
            if (k!= "account" && k!= "accountId" && !isNaN(Number(ele[k]))) {
              obj[k] =
                ele[k] === 0
                  ? "0"
                  : ele[k]
                  ? Number(ele[k]).toFixed(2).toLocaleString()
                  : "";
            }else{
              obj[k] = ele[k]
            }
          }
          arr.push(obj);
        }); 
        this.tableData = arr;
        this.$nextTick(() => {
          this.$refs.table.doLayout();
        });
      });
    },
    // 预览
    onPreview() {
      this.dialogTableVisible = true;
      previewDayReport({ day: this.day }).then((res) => {
        let li = res.data.list;
        let sum = res.data.sum;
        sum.forEach((ele) => {
          ele.orgShortName = ele.orgName;
          ele.pname = "合计";
        });
        let list = li.concat(sum);
        list.forEach((ele, idx, list) => {
          if (ele.bank == "小计") {
            ele.pname = list[idx - 1].pname;
            ele.orgName = list[idx - 1].orgName;
          } else if (ele.bank == "合计") {
            ele.pname = list[idx - 2].pname;
          }
        });
        this.getspanArr_pname(list);
        this.getspanArr_orgName(list);
        let data = JSON.parse(JSON.stringify(list));
        let arr = [];
        data.forEach((ele) => {
          if (
            ele.yesterdayBalanceAmount == null &&
            ele.dayBalanceAmount == null
          ) {
            ele.yesterdayBookAmount = "";
          }
        });
        let arry = JSON.parse(JSON.stringify(data));
        arry.forEach((ele) => {
          let obj = {};
          for (var k in ele) {
            obj[k] = ele[k] === 0 ? "0" : ele[k] ? ele[k].toLocaleString() : "";
          }
          arr.push(obj);
        });
        this.previewTableData = arr;
        this.$nextTick(() => {
          this.$refs.previewTable.doLayout(); //解决表格错位
        });
      });
    },
    //  行样式
    getRowStyle({ row, rowIndex }) {
      let stylejson = {};
      if (row.bank == "小计") {
        stylejson.backgroundColor = "rgba(230,151,21,1)";
        return stylejson;
      } else if (row.bank == "合计") {
        stylejson.backgroundColor = "rgba(78,168,255,1)";
        return stylejson;
      } else if (
        row.orgShortName == "财务公司资金占比：" ||
        row.orgShortName == "财务资金合计：" ||
        row.orgShortName == "货币资金合计："
      ) {
        stylejson.backgroundColor = "rgba(78,168,255,1)";
        return stylejson;
      } else {
        return "";
      }
    },
    // 合并第一列的行 --填写
    getspanArr_pname_write(data) {
      this.spanArr_pname_write = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr_pname_write.push(1);
          this.pos_pname_write = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].pname === data[i - 1].pname) {
            this.spanArr_pname_write[this.pos_pname_write] += 1;
            this.spanArr_pname_write.push(0);
          } else {
            this.spanArr_pname_write.push(1);
            this.pos_pname_write = i;
          }
        }
      }
    },
    // 合并第二列的行 --填写
    getspanArr_orgName_write(data) {
      this.spanArr_orgName_write = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr_orgName_write.push(1);
          this.pos_orgName_write = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].orgName === data[i - 1].orgName) {
            this.spanArr_orgName_write[this.pos_orgName_write] += 1;
            this.spanArr_orgName_write.push(0);
          } else {
            this.spanArr_orgName_write.push(1);
            this.pos_orgName_write = i;
          }
        }
      }
    },
    // 合并第一列的行 --预览
    getspanArr_pname(data) {
      this.spanArr_pname = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr_pname.push(1);
          this.pos_pname = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].pname === data[i - 1].pname) {
            this.spanArr_pname[this.pos_pname] += 1;
            this.spanArr_pname.push(0);
          } else {
            this.spanArr_pname.push(1);
            this.pos_pname = i;
          }
        }
      }
    },
    // 合并第二列的行 --预览
    getspanArr_orgName(data) {
      this.spanArr_orgName = [];
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr_orgName.push(1);
          this.pos_orgName = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].orgName === data[i - 1].orgName) {
            this.spanArr_orgName[this.pos_orgName] += 1;
            this.spanArr_orgName.push(0);
          } else {
            this.spanArr_orgName.push(1);
            this.pos_orgName = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let _row = this.spanArr_pname[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else if (columnIndex === 1) {
        if (
          row.orgShortName == "财务公司资金占比：" ||
          row.orgShortName == "财务资金合计：" ||
          row.orgShortName == "货币资金合计："
        ) {
          return {
            rowspan: 1,
            colspan: 3,
          };
        } else {
          let _row = this.spanArr_orgName[rowIndex];
          let _col = _row > 0 ? 1 : 0;
          return {
            rowspan: _row,
            colspan: _col,
          };
        }
      } else if (columnIndex === 2) {
        if (
          row.orgShortName == "财务公司资金占比：" ||
          row.orgShortName == "财务资金合计：" ||
          row.orgShortName == "货币资金合计："
        ) {
          return {
            rowspan: 1,
            colspan: 0,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      } else if (columnIndex === 3) {
        if (
          row.orgShortName == "财务公司资金占比：" ||
          row.orgShortName == "财务资金合计：" ||
          row.orgShortName == "货币资金合计："
        ) {
          return {
            rowspan: 1,
            colspan: 0,
          };
        } else {
          return {
            rowspan: 1,
            colspan: 1,
          };
        }
      } else {
        return {
          rowspan: 1,
          colspan: 1,
        };
      }
    },
    objectSpanMethod_write({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        let _row = this.spanArr_pname_write[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      } else if (columnIndex === 1) {
        let _row = this.spanArr_orgName_write[rowIndex];
        let _col = _row > 0 ? 1 : 0;
        return {
          rowspan: _row,
          colspan: _col,
        };
      }
    },
    // 导出
    handleExports() {
      excel("/fbdr/export", {
        day: this.day,
      }).then((res) => {
        let excelName = this.day + " 日银行存款余额统计表（元）.xlsx";
        this.excel(res, excelName);
      });
    },
    // 填写
    onWrite(row) {
      this.drawer = true;
      let data = JSON.parse(JSON.stringify(row));
      if (!data.accountId) {
        getYesterdayData({
          day: this.day,
          account: data.account,
        }).then((res) => {
          let result = res.data;
          Object.keys(result).forEach((key) => {
            if (result[key] == null) {
              result[key] = "";
            }
          });
          this.draw_title = "填写（以下数据为上一个工作日数据）";
          result.bank = row.bank;
          result.account = row.account;
          result.orgCode = row.orgCode;
          result.pcode = row.pcode;
          this.formData = result;
        });
      } else {
        this.draw_title = "修改";
        this.formData = data;
      }
    },
    // 提交
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (valid) {
          let formData = JSON.parse(JSON.stringify(this.formData));
          if (
            (this.inputMe(
              this.delcommafy(formData.dayBalanceAmount) -
                this.delcommafy(formData.yesterdayBalanceAmount)
            ) != 0 ||
              formData.dayReceiptAmount > 1000000) &&
            !formData.remark
          ) {
            return this.$confirm("请填写说明");
          }
          let obj = {};
          obj.id =  formData.accountId;
          obj.account = formData.account;
          obj.orgCode = formData.pcode;
          obj.busiTm = this.day;
          obj.subOrgCode = formData.orgCode;
          obj.dayBalanceAmount = formData.dayBalanceAmount
            .toString()
            .replace(/,/gi, "");
          obj.dayBookAmount = formData.dayBookAmount
            .toString()
            .replace(/,/gi, "");
          obj.dayDraftAmount = formData.dayDraftAmount
            .toString()
            .replace(/,/gi, "");
          obj.dayReceiptAmount = formData.dayReceiptAmount
            .toString()
            .replace(/,/gi, "");
          obj.remark = formData.remark;
          obj.operator = getUid();
          addDayReport(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success("填写成功");
              this.drawer = false;
              this.init(this.day);
            } else if (res.msg == "非特许用户，在17:30之后不能填写") {
              this.$message.error("请在当天17:30之前填写");
            } else {
              this.$message.error("请求失败");
            }
          });
        }
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    handleClose(done) {
      this.$confirm("未保存，确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    onCancle() {
      this.drawer = false;
      // this.$confirm("未保存，确认关闭？")
      //   .then((_) => {
      //     this.drawer = false;
      //   })
      //   .catch((_) => {});
    },
  },
};
</script> 
<style lang="scss" scoped>
.drawer-content {
  padding: 0 20px;
}
.table-title {
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.el-drawer {
  height: 100vh;
  overflow: auto;
}
</style>