<template>
  <div class="monthReport" ref="monthReport">
    <BasicLayout>
      <div slot="header" style="display:flex;justify-content:space-between;">
        <el-date-picker
          v-model="month"
          :picker-options="pickerOptions"
          type="month"
          placeholder="选择月"
          value-format="yyyy-MM-01"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
        <div>
          <el-button type="primary" @click="onPreview" v-if="viewOrg" size="small">预览</el-button>
          <el-button type="primary" @click="handleExports" v-if="viewOrg" size="small">导出</el-button>
        </div>
      </div>
      <div slot="main">
        <div class="table-title">银行账户月报表（元）</div>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :height="height"
          :span-method="objectSpanMethod_write"
          :cell-style="cellStyle"
          :header-cell-style="headCellStyle"
        >
          <el-table-column type="index" label="序号"></el-table-column>
          <el-table-column prop="orgName" label="账户名称" min-width="120" align="center"></el-table-column>
          <el-table-column prop="bankGroup" label="开户行所属机构" align="center"></el-table-column>
          <el-table-column prop="bank" label="开户行名称" min-width="180" align="center"></el-table-column>
          <el-table-column prop="account" label="账号" min-width="200" align="center"></el-table-column>
          <el-table-column prop="statementBalance" label="银行账户对账单余额" align="center"></el-table-column>
          <el-table-column prop="bookBalance" label="账户账面余额" align="center"></el-table-column>
          <el-table-column prop="val" label="资金性质" align="center"></el-table-column>
          <el-table-column prop="overLimitReason" label="超限额原因" align="center"></el-table-column>
          <el-table-column prop="isOnlineCn" label="是否上线" align="center"></el-table-column>
          <el-table-column prop="offlineReason" label="未上线原因" align="center"></el-table-column>
          <el-table-column prop="isOpenedNbCn" label="是否开通网银" align="center"></el-table-column>
          <el-table-column prop="unbanlanceRemark" label="备注" align="center"></el-table-column>
          <el-table-column label="境外币情况" align="center">
            <el-table-column prop="ifcType" label="币种" align="center"></el-table-column>
            <el-table-column prop="ifcAmount" label="原币种金额" align="center"></el-table-column>
            <el-table-column prop="ifcRate" label="汇率" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="境外外币情况" align="center">
            <el-table-column prop="ofcLocation" label="外币所在地" align="center"></el-table-column>
            <el-table-column prop="ofcType" label="币种" align="center"></el-table-column>
            <el-table-column prop="ofcAmount" label="原币种所在金额" align="center"></el-table-column>
            <el-table-column prop="ofcRate" label="汇率" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="remark" label="备注" align="center"></el-table-column>
          <el-table-column prop="date" label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click.native.prevent="onWrite(scope.row)" type="text" size="small">填写</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </BasicLayout>
    <!-- :before-close="handleClose"  -->
    <el-drawer title="填写" :visible.sync="drawer" size="60%">
      <div class="drawer-content">
        <el-row>
          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="140px">
            <el-row style="margin-bottom: 20px;">
              <el-col :span="12">
                <div style="text-align: center;color: rgba(255,255,255,0.6);">
                  开户银行：
                  <span>{{formData.bank}}</span>
                </div>
              </el-col>
              <el-col :span="12">
                <div style="text-align: center;color: rgba(255,255,255,0.6);">
                  账号：
                  <span>{{formData.account}}</span>
                </div>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="200px" label="银行账户对账单余额（￥）" prop="statementBalance">
                <el-input
                  v-model="formData.statementBalance"
                  @input="e => formData.statementBalance = inputMe(e)"
                  placeholder="请输入银行账户对账单余额（￥）"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label-width="200px" label="账户账面余额（￥）" prop="bookBalance">
                <el-input
                  v-model="formData.bookBalance"
                  @input="e => formData.bookBalance = inputMe(e)"
                  placeholder="请输入账户账面余额（￥）"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-divider></el-divider>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label-width="200px" label="资金性质" prop="val">
                <el-input
                  v-model="formData.val"
                  placeholder="请输入资金性质"
                  readonly
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="超限额原因" prop="overLimitReason">
                <el-input
                  v-model="formData.overLimitReason"
                  type="textarea"
                  placeholder="（限150字）"
                  :maxlength="150"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-divider></el-divider>
            </el-col>-->
            <el-col :span="12">
              <el-form-item label-width="200px" label="是否上线" prop="isOnline">
                <el-radio-group v-model="formData.isOnline" size="medium">
                  <el-radio
                    v-for="(item, index) in isOnlineOptions"
                    :key="index"
                    :label="item.value"
                    :disabled="item.disabled"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label-width="200px" label="是否开通网银" prop="isOpenedNb">
                <el-radio-group v-model="formData.isOpenedNb" size="medium">
                  <el-radio
                    v-for="(item, index) in isOpenedNbOptions"
                    :key="index"
                    :label="item.value"
                    :disabled="item.disabled"
                  >{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="未上线原因" prop="offlineReason">
                <el-input
                  v-model="formData.offlineReason"
                  type="textarea"
                  placeholder="如未上线，则必须填写[未上线原因]，限150字"
                  :maxlength="150"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="24">
              <el-divider></el-divider>
            </el-col>-->
            <el-col :span="24">
              <el-form-item label="备注" prop="unbanlanceRemark">
                <el-input
                  v-model="formData.unbanlanceRemark"
                  type="textarea"
                  :maxlength="150"
                  placeholder="【银行账户对账单余额】和【账户账面余额】不等时，必须写备注。（限150字）"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-col :span="8">
              <el-form-item label="境内外币情况" prop="ifcType">
                <el-input
                  v-model="formData.ifcType"
                  placeholder="币种"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原币种金额  ¥" prop="ifcAmount">
                <el-input
                  v-model="formData.ifcAmount"
                  placeholder="原币种金额  ¥"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="汇率" prop="ifcRate">
                <el-input
                  v-model="formData.ifcRate"
                  placeholder="汇率"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="境外外币情况" prop="ofcType">
                <el-input
                  v-model="formData.ofcType"
                  placeholder="币种"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原币种金额  ¥" prop="ofcAmount">
                <el-input
                  v-model="formData.ofcAmount"
                  placeholder="原币种金额  ¥"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="汇率" prop="ofcRate">
                <el-input
                  v-model="formData.ofcRate"
                  placeholder="汇率"
                  clearable
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="备注" prop="remark">
                <el-input
                  v-model="formData.remark"
                  type="textarea"
                  placeholder="(限150字)"
                  :maxlength="150"
                  :autosize="{ minRows: 4, maxRows: 4 }"
                  :style="{ width: '100%' }"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button size="small" type="primary" @click="submitForm">提交</el-button>
                <!-- <el-button size="small" @click="resetForm">重置</el-button> -->
                <el-button size="small" @click="onCancle">取消</el-button>
              </el-form-item>
            </el-col>
          </el-form>
        </el-row>
      </div>
    </el-drawer>
    <el-dialog :title="dialogTitle" width="100%" :visible.sync="dialogTableVisible" center>
      <el-table :data="previewTableData" border style="width: 100%" :height="previewTableDataHeight" :row-style="getRowStyle">
        <el-table-column prop="num" label="序号"></el-table-column>
        <el-table-column prop="orgName" label="账户名称" min-width="160" align="center"></el-table-column>
        <el-table-column prop="bankGroup" label="开户行所属机构" align="center"></el-table-column>
        <el-table-column prop="bank" label="开户行名称" align="center"></el-table-column>
        <el-table-column prop="account" label="账号" align="center"></el-table-column>
        <el-table-column prop="statementBalance" label="银行账户对账单余额" align="center"></el-table-column>
        <el-table-column prop="bookBalance" label="账户账面余额" align="center"></el-table-column>
        <el-table-column prop="val" label="资金性质" align="center"></el-table-column>
        <el-table-column prop="overLimitReason" label="超限额原因" align="center"></el-table-column>
        <el-table-column prop="isOnlineCn" label="是否上线" align="center"></el-table-column>
        <el-table-column prop="offlineReason" label="未上线原因" align="center"></el-table-column>
        <el-table-column prop="isOpenedNbCn" label="是否开通网银" align="center"></el-table-column>
        <el-table-column prop="unbanlanceRemark" label="备注" align="center"></el-table-column>
        <el-table-column label="境外币情况" align="center">
          <el-table-column prop="ifcType" label="币种" align="center"></el-table-column>
          <el-table-column prop="ifcAmount" label="原币种金额" align="center"></el-table-column>
          <el-table-column prop="ifcRate" label="汇率" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="境外外币情况" align="center">
          <el-table-column prop="ofcLocation" label="外币所在地" align="center"></el-table-column>
          <el-table-column prop="ofcType" label="币种" align="center"></el-table-column>
          <el-table-column prop="ofcAmount" label="原币种所在金额" align="center"></el-table-column>
          <el-table-column prop="ofcRate" label="汇率" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
      </el-table>
    </el-dialog>
    <MyBackToTop target=".el-drawer" />
  </div>
</template>

<script>
import moment from "moment";
import MyBackToTop from "@/components/MyBackToTop";
import {
  getMonthReport,
  addMonthReport,
  previewMonthReport,
} from "@/api/monthReport.js";
import { excel } from "@/api/common";
import { getViewOrg } from "@/utils/auth.js";
export default {
  props: {},
  data() {
    return {
      previewTableDataHeight: "88vh",
      dialogTitle: "银行账户月报表（元）",
      month: moment().format("YYYY-MM-01"),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      drawer: false,
      dialogTableVisible: false,
      previewTableData: [],
      // 表单
      formData: {
        statementBalance: "",
        bookBalance: "",
        val: "",
        overLimitReason: "",
        isOnline: "",
        offlineReason: "",
        isOpenedNb: "",
        unbanlanceRemark: "",
        ifcType: "",
        ifcAmount: "",
        ifcRate: "",
        ofcType: "",
        ofcAmount: "",
        ofcRate: "",
        remark: "",
      },
      rules: {
        // field101: [
        //   {
        //     required: true,
        //     message: "请输入开户银行名称",
        //     trigger: "blur",
        //   },
        // ],
        // field102: [
        //   {
        //     required: true,
        //     message: "请输入账号",
        //     trigger: "blur",
        //   },
        // ],
        statementBalance: [
          {
            required: true,
            message: "银行账户对账单余额不能为空",
            trigger: "blur",
          },
        ],
        bookBalance: [
          {
            required: true,
            message: "账户账面余额不能为空",
            trigger: "blur",
          },
        ],
        // val: [
        //   {
        //     required: true,
        //     message: "请输入资金性质",
        //     trigger: "blur",
        //   },
        // ],
        // overLimitReason: [],
        // isOnline: [
        //   {
        //     required: true,
        //     message: "是否上线不能为空",
        //     trigger: "change",
        //   },
        // ],
        // offlineReason: [
        //   {
        //     validator(rule,value,calllback){
        //       console.log(rule,value);
        //       // return this.formData.isOnline == 0
        //     },
        //     message: "如未上线，则必须填写[未上线原因]，限150字",
        //     trigger: "change",
        //   },
        // ],
        // isOpenedNb: [
        //   {
        //     required: true,
        //     message: "是否开通网银不能为空",
        //     trigger: "change",
        //   },
        // ],
        // unbanlanceRemark: [],
        // ifcType: [],
        // ofcAmount: [],
        // ofcRate: [],
        // field119: [],
        // field120: [],
        // ofcRate: [],
        // remark: [],
      },
      isOnlineOptions: [
        {
          label: "是",
          value: "1",
        },
        {
          label: "否",
          value: "0",
        },
      ],
      isOpenedNbOptions: [
        {
          label: "是",
          value: "1",
        },
        {
          label: "否",
          value: "0",
        },
      ],
      spanArr_orgName_write: [],
      pos_orgName_write: 0,
      height: 400,
    };
  },
  filters: {
    checkyn(value) {
      return value === "1" ? "是" : value === "0" ? "否" : "";
    },
  },
  components: { MyBackToTop },
  computed: {
    viewOrg() {
      return getViewOrg() == "" ? true : false;
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.height = "calc(100vh - 198px)";
    });
    this.init(this.month);
  },
  watch: {
    month(value) {
      this.init(value);
    },
  },
  methods: {
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
    delcommafy(num) {
      //去除千分位中的‘，’
      num = num.toString();
      num = num.replace(/,/gi, "");
      return num;
    },
    // 初始化查询
    init(value) {
      getMonthReport({
        date: value,
      }).then((res) => {
        let data = res.data.data;
        this.getspanArr_orgName_write(data);
        let arr = [];
        data.forEach((ele) => {
          let obj = {};
          for (var k in ele) {
            if (k == "isOnline" || k == "isOpenedNb") {
              obj[k] = ele[k] == null ? ele[k] : ele[k].toString();
            } else {
              obj[k] =
                ele[k] === 0 ? "0" : ele[k] ? ele[k].toLocaleString() : "";
            }
          }
          arr.push(obj);
        });
        this.tableData = arr;
      });
    },
    // 预览
    onPreview() {
      this.dialogTableVisible = true;
      previewMonthReport({
        date: this.month,
      }).then((res) => {
        let data = res.data.data;
        let arr = [];
        data.forEach((ele) => {
          let obj = {};
          for (var k in ele) {
            obj[k] = ele[k] === 0 ? "0" : ele[k] ? ele[k].toLocaleString() : "";
          }
          arr.push(obj);
        });
        this.previewTableData = arr;
      });
    },
    getRowStyle({ row, rowIndex }) {
      let stylejson = {};
      if (row.num.toString().indexOf("计") > -1) {
        stylejson.backgroundColor = "rgba(230,151,21,1)";
        return stylejson;
      } else {
        return "";
      }
    },
    // 合并第一列的行 --填写
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
    objectSpanMethod_write({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 1) {
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
      excel("/bankAccountMonthReport/export", {
        date: this.month,
      }).then((res) => {
        let excelName = this.month.slice(0, -3) + " 银行账户月报表（元）.xlsx";
        this.excel(res, excelName);
      });
    },
    // 填写
    onWrite(row) {
      this.drawer = true;
      this.formData = JSON.parse(JSON.stringify(row));
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
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        let formData = JSON.parse(JSON.stringify(this.formData));
        if (formData.isOnline === "") {
          return this.$confirm("请选择是否上线");
        } else if (formData.isOpenedNb === "") {
          return this.$confirm("请选择是否开通网银");
        }
        if (formData.isOnline === "0" && !formData.offlineReason) {
          return this.$confirm("请填写未上线原因");
        }
        if (
          formData.bookBalance != formData.statementBalance &&
          !formData.unbanlanceRemark
        ) {
          return this.$confirm("请填写备注");
        }
        if (valid) {
          formData.busiTm = this.month;
          let data = {};
          for (var k in formData) {
            data[k] = formData[k].toString().replace(/,/gi, "");
          }
          addMonthReport([{ ...data }]).then((res) => {
            if (res.data.code == 0) {
              this.$message.success("填写成功");
              this.drawer = false;
              this.init(this.month);
            } else {
              this.$message.error("填写失败");
            }
          });
        }
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 21) {
        return `background-color: rgb(36, 53, 83);`;
      } else {
        return "";
      }
    },
    headCellStyle({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 16) {
        return `background-color: rgb(36, 53, 83);`;
      } else {
        return "";
      }
    },
  },
};
</script>

<style scoped lang="scss">
.monthReport {
  height: 100%;
  .drawer-content {
    padding: 0 20px;
  }
}
.table-title {
  font-size: 24px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 10px;
}
</style>
<style lang="scss">
.monthReport {
  .el-drawer {
    height: 100vh;
    overflow: auto;
  }
  .el-divider--horizontal {
    margin: 10px 0;
  }
}
// .el-table_1_column_24 {
//   background-color: rgb(36, 53, 83) !important;
// }
// .el-table__fixed {
//   background-color: rgb(36, 53, 83) !important;
// }
</style>
