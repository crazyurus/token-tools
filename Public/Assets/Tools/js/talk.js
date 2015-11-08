(function() {
    var total_num = 0;
    var per_page = 20;
    var query = window.location.search.split("=");
    var page = query.length == 1 ? 1 : query[1];
    var start_pos = (page - 1) * per_page;
    var qq = "2577438164";
    var skey = Token.storage.has("talk_skey") ? Token.storage.get("talk_skey") : "";

    // 403
    $.ajaxSetup({
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            if(XMLHttpRequest.status == 403) {
                Token.message.prompt("请填写skey的值，可从m.qzone.com域下的cookie中获取", function(text) {
                    Token.storage.set("talk_skey", text);
                });
            }
        }    
    });

    // 获取说说数据
    $.getJSON("http://m.qzone.com/list?format=jsonp&list_type=shuoshuo&action=0&g_tk=" + getGTK(skey) + "&res_attach=att%3D" + start_pos + "&res_uin=" + qq + "&count=" + per_page + "&jsoncallback=?", {}, function(data) {
            console.log(data);
    });

    function _Callback(result) {

        // 判断是否登录
        if(result.message == "请先登录") {
            Token.message.alert("请先登录QQ空间手机版，然后再刷新本页。<br/><a href=\"http://m.qzone.com/\" target=\"_blank\">http://m.qzone.com/</a>");
            window.open("http://m.qzone.com/");
            return false;
        }

        // 判断是否获取成功
        if(typeof(result.data) == "undefined") {
            Token.message.alert("获取说说信息失败，请检查网络！");
            return false;
        }
        // 计算总的说说数
        total_num = start_pos + 20 + result.data.remain_count;
        $("#total_num").text(total_num);
        $("#page").text(page);

        // 设置分页按钮
        var page_num = Math.ceil(total_num / per_page);
        var pagination_content = $(".pagination");
        for (var i = 1; i <= page_num; ++i) {
            var active_str = "";
            if (page == i) active_str = " class=\"active\"";
            pagination_content.append("<li" + active_str + "><a href=\"?page=" + i + "\">" + i + "</a></li>");
        }

        // 获取说说
        var table_content = $("tbody");
        $.each(result.data.vFeeds, function (i, item) {
            table_content.append("<tr><td>" + (start_pos + i + 1) + "</td><td class=\"text-left\">" + getSubstr(item.summary) + "</td><td>" + getTime(item.comm.time) + "</td><td>" + getHref(item.comm.curlikekey) + "</td><td>0</td><td>" + getNum(item.like) + "</td><td>0</td><td>" + getNum(item.comment) + "</td><td>"+getPic(item.pic)+"</td></tr>");
        });
    }

    function getHref(url) {
        return "<a href=\"" + url + "\" target=\"_blank\">点击查看说说</a>";
    }

    function getSubstr(obj) {
        if (typeof(obj.summary) == "undefined") return "";
        return obj.summary.substr(0, 30);
    }

    function getTime(timestamp) {
        return new Date(parseInt(timestamp) * 1000).toLocaleString();
    }

    function getNum(obj) {
        if (typeof(obj) == "undefined") return 0;
        else return obj.num;
    }

    function getPic(obj) {
        if (typeof(obj) == "undefined") return "无";
        else return "有";
    }

    function getGTK(str) {
        var hash = 5381;
        for(var i = 0, len = str.length; i < len; ++i) {
            hash += (hash << 5) + str.charAt(i).charCodeAt();
        }
        return hash & 0x7fffffff;
    }
});