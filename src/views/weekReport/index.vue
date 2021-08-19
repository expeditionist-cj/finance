<template>
  <div class="weekReport" ref="weekReport">
    <BasicLayout>
      <div slot="header" style="display:flex;justify-content:space-between;">
        <el-date-picker
          v-model="week"
          type="week"
          :picker-options="pickerOptions"
          placeholder="选择日期"
          format="yyyy 第 WW 周"
          value-format="yyyy-MM-dd"
          :editable="false"
          :clearable="false"
        ></el-date-picker>
        <div>
          <el-button type="primary" @click="onPreview" v-if="viewOrg" size="small">预览</el-button>
          <el-button type="primary" @click="handleExports" v-if="viewOrg" size="small">导出</el-button>
        </div>
      </div>
      <div slot="main">
        <div class="table-title">{{dialogTitle}}</div>
        <el-table :data="tableData" :height="height" border style="width: 100%">
          <el-table-column prop="org_name" min-width="130" align="center" label="单位"></el-table-column>
          <el-table-column prop="org_code" align="center" label="序号"></el-table-column>
          <el-table-column align="center" label="日货币资金余额">
            <el-table-column prop="ze" label="总额" align="center"></el-table-column>
            <el-table-column prop="cw" label="其中：财务公司" align="center"></el-table-column>
            <el-table-column prop="dcb_bill" label="其中:票据保证金账户余额" align="center"></el-table-column>
            <el-table-column prop="dcb_spc_acount" label="其中:专项存款账户余额" align="center"></el-table-column>
            <el-table-column prop="ze" label="可用资金余额" align="center"></el-table-column>
          </el-table-column>
          <el-table-column prop="bank_acpt_balance" label="应收银行承兑汇票余额" align="center"></el-table-column>
          <el-table-column prop="busi_acpt_balance" label="应收商业承兑汇票余额" align="center"></el-table-column>
          <el-table-column align="center" label="应付票据金额">
            <el-table-column prop="pba_total" label="总额" align="center"></el-table-column>
            <el-table-column prop="pba_add_up" label="其中:当月应付票据到期金额(统计日期至月末)" align="center"></el-table-column>
          </el-table-column>
          <el-table-column align="center" label="带息负债金额">
            <el-table-column prop="lwia_total" label="总额" align="center"></el-table-column>
            <el-table-column prop="lwia_inter_ettd_loan" label="其中：内部委托贷款" align="center"></el-table-column>
            <el-table-column prop="lwia_add_up" label="其中:填报日至本月末贷款到期应还款金额" align="center"></el-table-column>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button @click.native.prevent="onWrite(scope.row)" type="text" size="small">填写</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </BasicLayout>
    <!-- :before-close="handleClose" -->
    <el-drawer title="填写" :visible.sync="drawer" size="60%">
      <div class="drawer-content">
        <el-row>
          <!-- :rules="rules" -->
          <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
            <el-col :span="24" style="margin-bottom: 20px;">
              <div style="text-align: center;color: rgba(255,255,255,0.6);">
                单位：
                <span>{{formData.org_name}}</span>
              </div>
            </el-col>
            <el-col :span="24">
              <div style="text-align: right;color: rgba(255,255,255,0.6);">（万元）</div>
            </el-col>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="240px" label="日货币资金余额（总额）" prop="ze">
                  <el-input
                    v-model="formData.ze"
                    @input="e => formData.ze = inputMe(e)"
                    :disabled="true"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="其中：财务公司" prop="cw">
                  <el-input
                    v-model="formData.cw"
                    @input="e => formData.cw = inputMe(e)"
                    :disabled="true"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="其中：票据保证金账户余额" prop="dcb_bill">
                  <el-input
                    v-model="formData.dcb_bill"
                    @input="e => formData.dcb_bill = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="其中：专项存款账户余额" prop="dcb_spc_acount">
                  <el-input
                    v-model="formData.dcb_spc_acount"
                    @input="e => formData.dcb_spc_acount = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="可用资金余额" prop="ze">
                  <el-input
                    v-model="formData.ze"
                    @input="e => formData.ze = inputMe(e)"
                    :disabled="true"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="240px" label="应收商业承兑汇票余额" prop="busi_acpt_balance">
                  <el-input
                    v-model="formData.busi_acpt_balance"
                    @input="e => formData.busi_acpt_balance = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="应收银行承兑汇票余额" prop="bank_acpt_balance">
                  <el-input
                    v-model="formData.bank_acpt_balance"
                    @input="e => formData.bank_acpt_balance = inputMe(e)"
                    :disabled="true"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-col :span="24">
              <el-divider></el-divider>
            </el-col>
            <el-row>
              <el-col :span="12">
                <el-form-item label-width="240px" label="应付票据金额（总额）" prop="pba_total">
                  <el-input
                    v-model="formData.pba_total"
                    @input="e => formData.pba_total = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="其中：当月应付票据到期金额" prop="pba_add_up">
                  <el-input
                    v-model="formData.pba_add_up"
                    @input="e => formData.pba_add_up = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="带息负债金额（总额）" prop="lwia_total">
                  <el-input
                    v-model="formData.lwia_total"
                    @input="e => formData.lwia_total = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="其中：内部委托贷款" prop="lwia_inter_ettd_loan">
                  <el-input
                    v-model="formData.lwia_inter_ettd_loan"
                    @input="e => formData.lwia_inter_ettd_loan = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label-width="240px" label="其中：填报日至本月末贷款到期应还款金额" prop="lwia_add_up">
                  <el-input
                    v-model="formData.lwia_add_up"
                    @input="e => formData.lwia_add_up = inputMe(e)"
                    clearable
                    :style="{width: '100%'}"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
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
      <el-table
        :data="previewTableData"
        :row-style="getRowStyle"
        border
        :height="previewTableDataHeight"
        style="width: 100%"
      >
        <el-table-column prop="org_name" min-width="200" align="center" label="单位"></el-table-column>
        <el-table-column prop="org_code" align="center" label="序号"></el-table-column>
        <el-table-column align="center" label="日货币资金余额">
          <el-table-column prop="ze" label="*总额" align="center"></el-table-column>
          <el-table-column prop="cw" label="*其中：财务公司" align="center"></el-table-column>
          <el-table-column prop="dcb_bill" label="其中:票据保证金账户余额" align="center"></el-table-column>
          <el-table-column prop="dcb_spc_acount" label="其中:专项存款账户余额" align="center"></el-table-column>
          <el-table-column prop="ze" label="可用资金余额" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="bank_acpt_balance" label="应收银行承兑汇票余额" align="center"></el-table-column>
        <el-table-column prop="busi_acpt_balance" label="应收商业承兑汇票余额" align="center"></el-table-column>
        <el-table-column align="center" label="应付票据金额">
          <el-table-column prop="pba_total" label="总额" align="center"></el-table-column>
          <el-table-column prop="pba_add_up" label="其中:当月应付票据到期金额(统计日期至月末)" align="center"></el-table-column>
        </el-table-column>
        <el-table-column align="center" label="带息负债金额">
          <el-table-column prop="lwia_total" label="总额" align="center"></el-table-column>
          <el-table-column prop="lwia_inter_ettd_loan" label="其中：内部委托贷款" align="center"></el-table-column>
          <el-table-column prop="lwia_add_up" label="其中:填报日至本月末贷款到期应还款金额" align="center"></el-table-column>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import { toHump } from "@/utils/index.js";
import { getViewOrg } from "@/utils/auth.js";
import {
  getWeekReport,
  addWeekReport,
  previewWeekReport,
} from "@/api/weekReport.js";
import { excel } from "@/api/common";
import { parse } from "path-to-regexp";
export default {
  components: {},
  props: [],
  data() {
    return {
      dialogTitle: "周银行存款余额统计（万元）",
      week: moment()
        .subtract(moment().format("E") - 1, "days")
        .format("YYYY-MM-DD"),
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      tableData: [],
      drawer: false,
      formData: {
        org_name: "",
        ze: "",
        cw: "",
        dcb_bill: "",
        dcb_spc_acount: "",
        ze: "",
        busi_acpt_balance: "",
        bank_acpt_balance: "",
        pba_total: "",
        pba_add_up: "",
        lwia_total: "",
        lwia_inter_ettd_loan: "",
        lwia_add_up: "",
      },
      rules: {
        ze: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
        cw: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
        dcb_bill: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        dcb_spc_acount: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        busi_acpt_balance: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
        bank_acpt_balance: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        pba_total: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        pba_add_up: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        lwia_total: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
        lwia_inter_ettd_loan: [
          {
            message: "",
            trigger: "blur",
          },
        ],
        lwia_add_up: [
          {
            message: "",
            trigger: "blur",
          },
        ],
      },
      dialogTableVisible: false,
      previewTableData: [],
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
    week(value) {
      this.init(value);
    },
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.height = "calc(100vh - 198px)";
    });
    this.init(this.week);
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
    init(value) {
      getWeekReport({
        beginTime: value,
        endTime:
          moment(value).add(6, "d") > moment()
            ? moment().format("YYYY-MM-DD")
            : moment(value).add(6, "d").format("YYYY-MM-DD"),
      }).then((res) => {
        let data = res.data;
        let arr = [];
        data.forEach((ele) => {
          let obj = {};
          for (var k in ele) {
            obj[k] = ele[k] === 0 ? "0" : ele[k] ? ele[k].toLocaleString() : "";
          }
          arr.push(obj);
        });
        this.tableData = arr;
      });
    },
    // 预览
    onPreview() {
      this.dialogTableVisible = true;
      previewWeekReport({
        beginTime: this.week,
        endTime:
          moment(this.week).add(6, "d") > moment()
            ? moment().format("YYYY-MM-DD")
            : moment(this.week).add(6, "d").format("YYYY-MM-DD"),
      }).then((res) => {
        let data = res.data;
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
      if (row.org_code.length == 1) {
        stylejson.backgroundColor = "rgba(239, 174, 67,1)";
        return stylejson;
      } else if (row.org_code.length == 3 && row.org_code.slice(0, 1) == "3") {
        stylejson.backgroundColor = "rgba(151, 99 ,14,1)";
        return stylejson;
      } else {
        return "";
      }
    },
    // 导出
    handleExports() {
      excel("/fund_balance_week/export", {
        beginTime: this.week,
        endTime:
          moment(this.week).add(6, "d") > moment()
            ? moment().format("YYYY-MM-DD")
            : moment(this.week).add(6, "d").format("YYYY-MM-DD"),
      }).then((res) => {
        let excelName =
          this.week +
          " 至 " +
          (moment(this.week).add(6, "d") > moment()
            ? moment().format("YYYY-MM-DD")
            : moment(this.week).add(6, "d").format("YYYY-MM-DD")) +
          " 周银行存款余额统计（万元）.xlsx";
        this.excel(res, excelName);
      });
    },
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
    // 提交
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        let formData = JSON.parse(JSON.stringify(this.formData));
        let obj = {};
        if (valid) {
          for (var key in formData) {
            let k = toHump(key);
            obj[k] = formData[key].replace(/,/gi, "");
          }
          obj.busiTm = this.week;
          addWeekReport(obj).then((res) => {
            if (res.code == 0) {
              this.$message.success("填写成功");
              this.drawer = false;
              this.init(this.week);
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
  },
};
</script>
<style scoped>
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