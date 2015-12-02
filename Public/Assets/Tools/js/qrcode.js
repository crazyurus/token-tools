var render_method = "canvas";
var logo_url = "";

$(document).ready(function() {

    // ColorPicker初始化
    $(".fore-color").colorpicker();
    $(".bg-color").colorpicker();

    // DateTimePicker初始化
    if(!Token.detect.isMobile()) {
        $("#txt_card_birthday").datetimepicker({
            format: "yyyy-m-d",
            minView: "month",
            weekStart: 1,
            autoclose: true,
            todayHighlight: true,
            language: "zh-CN"
        });
    }
    
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
            apk_url: $("#txt_app_apk").val(),
            wp_url: $("#txt_app_wp").val(),
            default_url: $("#txt_app_default").val()
        };
        if (data.id == 0) Token.message.alert("请先选择App");
        else if (data.apk_url == "" || data.default_url == "") Token.message.alert("请输入App的下载地址信息！");
        else {
            Token.ajax(Token.variable.app + "/tools/url/modify.do", data, function(data) {
                Token.qrCode("http://token.team/app/" + data);
            });
        }
    });
    
    // 名片
    $("#btn_card").click(function() {
        var name = $("#txt_card_name").val();
        var company = "Token团队";
        var department = $("#txt_card_department").val();
        var position = $("#txt_card_position").val();
        var address = "湖北省武汉市洪山区珞狮路122号";
        var mobile = $("#txt_card_tel").val();
        var telephone = "027-87855617";
        var url = "http://www.wutnews.net/";
        var email = $("#txt_card_email").val() + "@wutnews.net";
        var birthday = $("#txt_card_birthday").val();
        var qq = $("#txt_card_qq").val();
        var wechat = $("#txt_card_wechat").val();
        var vCard = "BEGIN:VCARD\r\nVERSION:2.1\r\nFN:" + name + "\r\nORG:" + company + department + "\r\nTITLE:" + position + "\r\nADR;WORK:;;" + address + "\r\nTEL;CELL;VOICE:" + mobile + "\r\nTEL;WORK;VOICE:" + telephone + "\r\nURL;WORK:" + url + "\r\nEMAIL;INTERNET,WORK:" + email + "\r\nBDAY:" + birthday + "\r\nX-QQ:" + qq + "\r\nX-WECHAT:" + wechat + "\r\nEND:VCARD";
        if(name == "" || department == "请选择……" || mobile == "") Token.message.alert("请将你的名片信息填写完整");
        else Token.qrCode(utf16to8(vCard));
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
            Token.ajax(Token.variable.app + "/tools/url/getinfo.do?id=" + app, {}, function(data) {
                setAppUrl(data.android_url, data.apk_url, data.ios_url, data.wp_url, data.default_url);
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
        if ($(this).text() == "无") logo_url = "";
        else logo_url = $(this).find("img").attr("src").replace("preview", "center");
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
    $("#qrcode_size").change(function() {
        $("#qrcode_size_show").val($(this).val());
    });
    $("#qrcode_size_show").change(function() {
        var size = parseInt($(this).val());
        if(size < 64 || size > 2048) {
            Token.message.alert("二维码尺寸参数错误！");
            $(this).val($("#qrcode_size").val());
        }
        else $("#qrcode_size").val($(this).val());
    });

    // 下载按钮
    $("#btn_download").click(function() {
        if ($(this).attr("href") == "" || render_method == "table" || Token.detect.isIE()) return false;
    });

    if (Token.detect.isIE()) $("#btn_download").html("不支持使用IE下载");
    else if(Token.detect.isMQQBrowser()) $("#btn_download").html("不支持QQ浏览器下载");
    else if(Token.detect.isUCBrowser()) $("#btn_download").html("不支持UC浏览器下载");

    if(!Token.support.canvas()) {
        $(".render-group label:last").click();
        $(".render-group label:first").attr("disabled", "disabled");
    }

    function setAppUrl(android, apk, ios, wp, def) {
        $("#txt_app_ios").val(ios);
        $("#txt_app_android").val(android);
        $("#txt_app_apk").val(apk);
        $("#txt_app_wp").val(wp);
        $("#txt_app_default").val(def);
    };

    function utf16to8(str) {  
        var out, i, len, c;  
        out = "";  
        len = str.length;  
        for (i = 0; i < len; i++) {  
            c = str.charCodeAt(i);  
            if ((c >= 0x0001) && (c <= 0x007F)) {  
                out += str.charAt(i);  
            } else if (c > 0x07FF) {  
                out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));  
                out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            } else {  
                out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));  
                out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));  
            }  
        }  
        return out;  
    } 
});

Token.qrCode = function(text) {
    var size = parseInt($("#qrcode_size").val());
    if (size < 64 || size > 2048) Token.message.alert("二维码尺寸参数错误！");
    else {
        $("#qrcode").html("").qrcode({
            text: text,
            render: render_method,
            width: size,
            height: size,
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
