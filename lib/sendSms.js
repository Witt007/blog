/* 
 *
 */
(function (window, $) {

    var sms = {};

    sms.sendMessageByUsername = function (username, type, callback, isNotSend) {
        /*
        alert(username);
        alert(type);
        alert(callback);
        alert(isNotSend);
        */
        var protocol = window.location.href.indexOf("https") ? "http" : "https",
            p = {username: username, type: type};
        isNotSend && (p.isNotSend = "1");
        $.ajax({
            type: "POST",
            async: false,
            url: window.location.href.indexOf("localhost") >= 0 ? "/ftl/testData2/reg/sendSms.txt" : protocol + "/rest/user/sendsmsbyname",
            data: p,
            success: function (data) {
                if (typeof callback !== "function") {
                    return;
                }
                var rt = {};
                if (data.indexOf("200") === 0) {
                    rt.status = 200;
                    rt.msg = "短信验证码发送成功，请注意查收";
                } else if (data.indexOf("202") === 0) {
                    rt.status = 202;
                    rt.msg = "下行短信超过限制，改为上行短信的方式进行验证";
                } else if (data.indexOf("501") === 0) {
                    rt.status = 501;
                    rt.msg = "您获取验证码次数过多，请改天再试";
                    if (data.split(",").length === 3) {
                        rt.upSmsInfor = data.split(",");
                        rt.msg = "";
                    }
                } else if (data.indexOf("402") === 0) {
                    rt.status = 402;
                    rt.msg = "非法请求，请重试";
                } else {
                    rt.status = 0;
                    rt.msg = "系统异常";
                }
                callback(rt);
            },
            error: function () {
                if (typeof callback !== "function") {
                    return;
                }
                callback({status: 0, msg: "系统异常"});
            }
        });
    };

    sms.sendMessage = function (mobile, type, callback, isNotSend) {
        var protocol = window.location.href.indexOf("https") ? "http" : "https",
            p = {username: mobile, channel: type};
        isNotSend && (p.isNotSend = "1");
        $.ajax({
            type: "POST",
            async: false,
            url: window.location.href.indexOf("localhost") >= 0 ? "sendSms.txt" : protocol + "/sh01/rest/user/sendsms",
            data: p,
            success: function (data) {
                if (typeof callback !== "function") {
                    return;
                }
                var rt = {};
                if (data.indexOf("200") === 0) {
                    rt.status = 200;
                    rt.msg = "短信验证码发送成功，请注意查收";
                } else if (data.indexOf("202") === 0) {
                    rt.status = 202;
                    rt.msg = "下行短信超过限制，改为上行短信的方式进行验证";
                } else if (data.indexOf("501") === 0) {
                    rt.status = 501;
                    rt.msg = "您获取验证码次数过多，请改天再试";
                    if (data.split(",").length === 3) {
                        rt.upSmsInfor = data.split(",");
                        rt.msg = "";
                    }
                } else if (data.indexOf("402") === 0) {
                    rt.status = 402;
                    rt.msg = "非法请求，请重试";
                } else {
                    rt.status = 0;
                    rt.msg = "系统异常";
                }
                callback(rt);
            },
            error: function () {
                if (typeof callback !== "function") {
                    return;
                }
                callback({status: 0, msg: "系统异常"});
            }
        });
    };

// 开放接口
    $.sms = sms;

})(window, jQuery);