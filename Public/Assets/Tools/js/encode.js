$(document).ready(function() {

    // 哈希方法定义
    var hash_func = "";

    // 加载FancyBox
    $("#img_preview").fancybox();

    // URL编码
    $('#btn_url_encode').click(function() {
        var oriStr = $('#txt_url').val().trim();
        //if (oriStr.match(/^\w+%3A%2F%2F/)) return;
        $('#txt_url').val(encodeURIComponent(oriStr));
    });

    // URL解码
    $('#btn_url_decode').click(function() {
        var oriStr = $('#txt_url').val().trim();
        if (Token.check.url(oriStr)) return;
        $('#txt_url').val(decodeURIComponent(oriStr));
    });

    // Base64编码
    $('#btn_base64_encode').click(function() {
        var oriStr = $('#txt_base64_encode').val().trim();
        $('#txt_base64_decode').val(Base64.encode(oriStr));
    });

    // Base64解码
    $('#btn_base64_decode').click(function() {
        var oriStr = $('#txt_base64_decode').val().trim();
        $("#txt_base64_encode").val(Base64.decode(oriStr));
    });

    // 方法选择监视
    $(".btn-group label").click(function() {
        hash_func = $(this).text().trim();
    });

    // 计算哈希
    $("#btn_hash_calc").click(function() {
        var text = $("#txt_hash").val().trim();
        if(text == "") Token.message.alert("请输入需要计算的文本值");
        else if(hash_func == "") Token.message.alert("请选择哈希函数");
        else {
            Token.ajax("{:U('Tools/Encode/hash', '', '.do')}", { text: text, hash: hash_func }, function(data) {
                    $("#txt_hash_result").val(data);
            });
        }
    });

    // 哈希选择框
    $(".dropdown-scroll > li").click(function() {
        var hash_more_name = $(this).text().trim();
        $("#hash_more_name").html(hash_more_name);
        $(".btn-group label").removeClass("active");
        $(".dropdown-toggle").addClass("active");
        hash_func = hash_more_name;
    });

    // 加载图片
    $("#txt_pic_url").change(function() {
        var url = $(this).val();
        var image = $("#img_preview");
        if(url == "") {
            $("#btn_pic_encode").attr("disabled", "disabled");
            $("#btn_pic_show").attr("disabled", "disabled");
        }
        else {
            $("#btn_pic_encode").removeAttr("disabled");
            $("#btn_pic_show").removeAttr("disabled");
            image.attr("title", Token.tools.getFileName($(this).val()));
            if($(this).attr("type") == "file") {
                if(Token.support.fileReader()) {
                    var file = this.files[0];
                    if(/image\/\w+/.test(file.type)) {
                        var reader = new FileReader();
                        reader.readAsDataURL(file);
                        reader.onload = function() {
                            image.attr("src", this.result);
                        };
                    }
                }
                else Token.message.alert("当前浏览器无法读取本地图片"); 
            }
            else image.attr("src", url);
        }
    });

    // 图片预览
    $("#btn_pic_show").click(function() {
        $("#img_preview").click();
    });

    // 图片加载失败
    $("#img_preview").load(function() {
        $(this).parent().removeClass("has-error has-feedback");
    }).error(function() {
        $(this).val("");
        $("#txt_pic_url").focus().select();
        $(this).parent().addClass("has-error has-feedback");
    });

    // 更换图片方式
    $("#btn_pic_list li").click(function() {
        $("#btn_pic_choose > span:first").text($(this).text());
        $("#txt_pic_url").val("");
        $("#txt_pic_url").attr("type", $(this).data("type"));
    });

    // 图片编码
    $("#btn_pic_encode").click(function() {
        if($("#txt_pic_url").attr("type") == "file") {
            $("#txt_pic_decode").val($("#img_preview").attr("src"));
        }
        else {
            if(Token.support.canvas()) {
                var canvas = document.createElement("canvas");
                var image = new Image();
                ctx = canvas.getContext("2d");
                image.onload = function() {
                    canvas.height = image.height;
                    canvas.width = image.height;
                    ctx.drawImage(image, 0, 0);
                    $("#txt_pic_decode").val(canvas.toDataURL("image/" + Token.tools.getFileType($("#img_preview").attr("src"))));
                    canvas = null;
                }
                image.src = Token.variable.app + "/tools/encode/image.action?url=" + encodeURIComponent($("#img_preview").attr("src"));
            }
            else Token.message.alert("当前浏览器不支持图片编码功能");
        }
        
    });
});
