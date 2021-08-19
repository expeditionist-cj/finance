/*
*封装函数 downLoadFile.js
*params:  
*data:二进制文件
*/
// import {baseUrl } from "../config/env";
const baseUrl = "http://172.16.1.90:7000"
// 将对象序列化
const serraliz_obj = (obj) => {
    let str = "";
    _.forOwn(obj, (value, key) => {
        str += key + "=" + value + "&";
    });
    str.substr(0, str.length - 1);
    return str
}
export const install = function (Vue, options) {
    Vue.prototype.downloadFile = function (url, obj) {
        //   let url = window.URL.createObjectURL(new Blob([data]))
        let link = document.createElement('a')
        link.style.display = 'none'
        // link.href =baseUrl+url+"?"+serraliz_obj(obj)
        link.href = url + "?" + serraliz_obj(obj);
        link.target = "_self";
        document.body.appendChild(link);
        link.click();
        document.removeChild(link);
    };


    // ajax导出报表
    Vue.prototype.excel = function (data, name) {
        var blob = new Blob([data], { type: "application/vnd.ms-excel" });
        var objectUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display:none');
        a.setAttribute('href', objectUrl);
        var filename = `${name}`;
        a.setAttribute('download', filename);
        document.body.removeChild(a);
        a.click();
    }
}