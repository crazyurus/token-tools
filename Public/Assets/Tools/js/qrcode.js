var render_method = "canvas";
var logo_url = "";

$(document).ready(function() {

    // ColorPicker初始化
    $(".fore-color").colorpicker();
    $(".bg-color").colorpicker();

    // 网址
    $("#btn_url").click(function() {
        var url = $('#txt_url').val().trim();
        if (Token.check.url(url)) {
            Token.qrCode(url);
        } else Token.message.alert("Url的格式不正确，请重新输入！");
    });

    // QQ
    $("#btn_qq").click(function() {
        var qq = $('#txt_qq').val().trim();
        if (Token.check.qq(qq)) {
            Token.qrCode("http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes");
            $("#connect_qq").html("QQ状态：<a target=\"_blank\" href=\"http://wpa.qq.com/msgrd?v=3&uin=" + qq + "&site=qq&menu=yes\"><img border=\"0\" src=\"http://wpa.qq.com/pa?p=2:" + qq + ":42\" alt=\"QQ\" title=\"通过QQ联系\"></a>");
        } else Token.message.alert("QQ号的格式不正确，请重新输入！");
    });

    // 微博
    $("#btn_weibo").click(function() {
        var weibo = $('#txt_weibo').val().trim();
        if (Token.check.weibo(weibo)) {
            Token.qrCode("http://weibo.cn/qr/userinfo?uid=" + weibo);
        } else Token.message.alert("微博uid的格式不正确，请重新输入！");
    });

    // 微信
    $("#btn_wechat").click(function() {
        var wechat = $('#txt_wechat').val().trim();
        if (wechat != "") {
            Token.qrCode("http://weixin.qq.com/r/" + wechat);
        } else Token.message.alert("微信ID的格式不正确，请重新输入！");
    });

    // App
    $("#btn_app").click(function() {
        var data = {
            id: $("#list_app").val(),
            ios_url: $("#txt_app_ios").val(),
            android_url: $("#txt_app_android").val(),
            wp_url: $("#txt_app_wp").val(),
            default_url: $("#txt_app_default").val()
        };
        if (data.id == 0) Token.message.alert("请先选择App");
        else if (data.android_url == "" || data.default_url == "") Token.message.alert("请输入App的下载地址信息！");
        else {
            Token.ajax("{:U('Tools/Url/modify')}", data, function(data) {
                Token.qrCode("http://token.team/app/" + data);
            });
        }
    });

    // 微博选择监视
    $(".weibo-group label").click(function() {
        $("#txt_weibo").val($(this).data("uid"));
    });

    // 微信选择监视
    $(".wechat-group label").click(function() {
        $("#txt_wechat").val($(this).data("id"));
    });

    // App选择监视
    $("#list_app").change(function() {
        var app = $(this).val();
        if (app == 0) setAppUrl("", "", "", "");
        else {
            Token.ajax("{:U('Tools/Url/getinfo')}?id=" + app, {}, function(data) {
                setAppUrl(data.android_url, data.ios_url, data.wp_url, data.default_url);
            });
        }
    });

    // 渲染选择监视
    $(".render-group label").click(function() {
        render_method = $(this).text().trim().toLowerCase();
        switch (render_method) {
            case 'canvas':
                $(".logo-group label:not(':first')").removeAttr("disabled").removeClass("btn-disabled");
                break;
            case 'table':
                $(".logo-group label:not(':first')").removeClass("active").attr("disabled", "disabled").addClass("btn-disabled");
                $(".logo-group label:first").addClass("active");
                logo_url = "";
                break;
            default:
                Token.message.alert("无效的二维码渲染参数！");
        }
    });

    // Logo选择监视
    $(".logo-group label").click(function() {
        if ($(this).attr("disabled")) return false;
        if ($(this).find("img")) {
            logo_url = $(this).find("img").attr("src").replace("preview", "center");
        } else logo_url = "";
    });

    // 折叠监视
    $("a.collapsed").click(function() {
        if ($(this).attr("aria-expanded") == "true") {
            $("#col-icon").removeClass("glyphicon-chevron-up");
            $("#col-icon").addClass("glyphicon-chevron-down");
        } else {
            $("#col-icon").removeClass("glyphicon-chevron-down");
            $("#col-icon").addClass("glyphicon-chevron-up");
        }
    });

    // 二维码大小监视
    $("#qrcode_width").change(function() {
        $("#qrcode_height").val($(this).val());
    });

    // 下载按钮
    $("#btn_download").click(function() {
        if ($(this).attr("href") == "" || render_method == "table" || Token.detect.isIE()) return false;
    });

    if (Token.detect.isIE()) {
        $("#btn_download").html("不支持使用IE下载");
    }

    function setAppUrl(android, ios, wp, def) {
        $("#txt_app_ios").val(ios);
        $("#txt_app_android").val(android);
        $("#txt_app_wp").val(wp);
        $("#txt_app_default").val(def);
    };

});

Token.qrCode = function(text) {
    var width = parseInt($("#qrcode_width").val());
    var height = parseInt($("#qrcode_height").val());
    if (width < 64 || height < 64) Token.message.alert("二维码尺寸参数错误！");
    else {
        $("#qrcode").html("").qrcode({
            text: text,
            render: render_method,
            width: width,
            height: height,
            correctLevel: parseInt($("#qrcode_error").val()),
            background: $("#qrcode_bgcolor").val(),
            foreground: $("#qrcode_fcolor").val(),
            src: logo_url
        });
        if (render_method == "table") {
            $("#btn_download").attr("disabled", "disabled").html("Table渲染方式不支持下载");
        } else if (!Token.detect.isIE()) {
            $("#btn_download").button("loading");
            setTimeout(function() {
                $("#btn_download").attr("href", $("canvas")[0].toDataURL("image/png")).removeAttr("disabled").button("reset");
            }, 1500);
        }

    }
};
