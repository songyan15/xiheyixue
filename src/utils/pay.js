/*
*
*
* 支付
*
* */

/* 当前设备浏览器版本信息 */
var browser = {
    versions: function() {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {//移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //Opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果/谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.match(/AppleWebKit/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //iOS终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //Android终端或者UC浏览器
            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否Web应该程序，没有头部与底部
        };
    }(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
//支付
export function mPay(obj){
    //debugger
    //课程ID 或试题模块ID
    var dataID = obj.Id;//'c0dfcbcb-b9ba-4b7e-9b58-67181b5a20cb';
    //当为课程ID是为1，模块ID时为2
    var dataType = obj.DataType;
    //科目编码
    var code = obj.Code;//'111';
    //用户ID
    var userID =obj.userId;//'07e93738-d8d3-4a8a-b2d7-0328e80484ff';
    let price = obj.RealPrice;//0.01;//
    //debugger
    if (browser.versions.android)
    {
        if(obj.type==0)
        {
            //微信
            window.android.weichatPay(dataID,dataType,code,userID,price,"熙和教育","课程费");
        }
        else if(obj.type==1)
        {
            //支付宝
            window.android.aliPay(dataID,dataType,code,userID,price,"熙和教育","课程费");
        }else if(obj.type==2){
            dataID = obj.ProductID;
            window.android.applePay(dataID,dataType,code,userID,price,"熙和教育","课程费");
        }
    }
    else
    {
        if(obj.type==0)
        {
            //微信
            weichatPay(dataID,dataType,code,userID,price,"熙和教育","课程费");
        }
        else if(obj.type==1)
        {
            //支付宝
            aliPay(dataID,dataType,code,userID,price,"熙和教育","课程费");
        }
        else if(obj.type==2){
            dataID = obj.ProductID;
            applePay(dataID,dataType,code,userID,price,"熙和教育","课程费");
        }
    }
}
//支付回调结果
/*export function payResult(result){
    //document.getElementById("mPayResult").innerHTML = '支付结果：' + result;
    //alert('支付结果：' + result);
    return result
}*/
