/*
 * URS设置密码 / wtt
 * URS设置密码私有代码
 * 
 * [Change Log]
 * 2013-11-12 wtt 创建
 * 
 */

(function (window, $, Core, undefined) {

    var document = window.document, easyNav = window.easyNav,
        setTimeout = window.setTimeout, clearTimeout = window.clearTimeout;

    var $pwdIpt = $("#password"),
        $cPwdIpt = $("#confirmPassword"),
        $usernameIpt = $("input[type!=hidden]#username");

    $.extend(Core, {

        myInit: function () {

            //执行公用业务代码
            Core.commonInit();

            //表单校验
            checkInputs();
            checkForm();

            //聚焦输入框
            var $form = $("form");
            if (!$form.find(".u-ipt-err").length) {
                $form.find(".u-ipt input").eq(0).focus();
            }
        }

    });

    function checkInputs() {
        if ($usernameIpt.length) {
            $usernameIpt.focus(function () {
                Core.changeCheckStyle("warn", $(this));
            }).blur(function () {
                var $this = $(this);
                if ($this.val() !== "") {
                    checkUsername($this);
                }
            });
        }
        $pwdIpt.focus(function () {
            Core.changeCheckStyle("warn", $(this), "6到16个字符，区分大小写。");
        }).blur(function () {
            var $this = $(this);
            if ($this.val() !== "") {
                checkPwd($this);
            } else {
                Core.changeCheckStyle("", $(this));
            }
        });
        $cPwdIpt.focus(function () {
            Core.changeCheckStyle("warn", $(this), "再次输入你设置的密码。");
        }).blur(function () {
            var $this = $(this);
            if ($this.val() !== "") {
                checkCpwd($this, $pwdIpt.val());
            } else {
                Core.changeCheckStyle("", $(this));
            }
        });
    }

    function checkForm() {
        $("form button[type='submit']").click(function (e) {
            var $this = $(this),
                $form = $this.parents("form"),
                isCheck = true;
            if ($usernameIpt.length) {
                isCheck = checkUsername($usernameIpt).isChecked
            }
            ;
            isCheck = isCheck && checkPwd($pwdIpt).isChecked && checkCpwd($cPwdIpt, $pwdIpt.val()).isChecked;

            if (isCheck) {
                $form.submit();
            }
            e.preventDefault();
        });
    }

    function checkPwd($ipt) {
        var checkResult = checkGroup.checkPwd($ipt.val());
        if (checkResult.isChecked) {
            Core.changeCheckStyle("ok", $ipt, checkResult.msg);
        } else {
            Core.changeCheckStyle("err", $ipt, checkResult.msg);
        }
        return checkResult;
    }

    function checkCpwd($ipt, filterVal) {
        var checkResult = checkGroup.checkCpwd($ipt.val(), filterVal);
        if (checkResult.isChecked) {
            Core.changeCheckStyle("ok", $ipt);
        } else {
            Core.changeCheckStyle("err", $ipt, checkResult.msg);
        }
        return checkResult;
    }

    function checkUsername($ipt) {
        var checkResult = checkGroup.checkUsername($ipt.val());
        if (checkResult.isChecked) {
            Core.changeCheckStyle("ok", $ipt, checkResult.msg);
        } else {
            Core.changeCheckStyle("err", $ipt, checkResult.msg);
        }
        return checkResult;
    }

})(window, jQuery, Core);