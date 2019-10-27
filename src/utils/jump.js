/**
 * 时间格式化
 * 将 2018-09-23T11:54:16.000+0000 格式化成 2018/09/23 11:54:16
 * @param datetime 国际化日期格式
 */
export function format (datetime) {
    return formatWithSeperator(datetime, "/", ":");
}

//url跳转
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
export function gotoBrowserFun(url){
  console.log(url);
  //debugger
    /*if (browser.versions.android)
     {
          window.android.gotoBrowser(url); 
     }
     else 
     {
         gotoBrowser(url); 
     }*/
 }
