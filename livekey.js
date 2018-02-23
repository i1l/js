function getLiveKey(url) {
    if (url.indexOf("kds1://") > -1 || url.indexOf("kds2://") > -1) {
        if (url.indexOf("kds1://") > -1) {
            url = url.replace("kds1://", "http://mlive1.91kds.com/b4/")
        } else if (url.indexOf("kds2://") > -1) {
            url = url.replace("kds2://", "http://mlive1.91kds.com/c4/")
        }
        url = url.replace("@@", ".m3u8?");
        $.post('auth1.php?t=' + Math.random(),
        function(obj) {
            if (obj != null) {
                startPlay(url, obj.livekey, obj.token)
            }
        },
        "json")
    } else if (url.indexOf("letvhtml") > -1) {
        var chid = url.substring(11);
        $.getJSON("auth1.php?t=" + Math.random() + "&id=" + chid,
        function(obj) {
            if (obj != null) {
                startPlay(url, obj.livekey, obj.token)
            }
        },
        "json")
    } else {
        startPlay(url, "", "")
    }
}
function startPlay(url, k, token) {
    var media = document.getElementById("ikdsPlayer");
    if (url.indexOf(".91kds.com") > -1) {
        media.src = url + "&" + k
    } else if (url.indexOf("letvhtml") > -1) {
        var chid = url.substring(11);
        jsurl = "http://live.gslb.letv.com/gslb?stream_id=" + chid + "&tag=live&ext=m3u8&sign=live_photerne&p1=0&p2=00&p3=001&splatid=1004&ostype=andriod&hwtype=un&platid=10&playid=1&termid=2&pay=0&expect=3&format=1&" + token + "&jsonp=?";
        $.getJSON(jsurl, null,
        function(cc) {
            media.src = cc.location
        })
    } else {
        media.src = url
    }
    media.play()
}
function getLiveBack(id, st, et) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("myLiveBack").innerHTML = xmlhttp.responseText
        }
    }
    xmlhttp.open("GET", "get_liveback.php?id=" + id + "&st=" + st + "&et=" + et, true);
    xmlhttp.send()
}
function getEpg(id, day, ishk) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest()
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP")
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            document.getElementById("myEpg").innerHTML = xmlhttp.responseText
        }
    }
    xmlhttp.open("GET", "get_epg.php?id=" + id + "&day=" + day + "&ishk=" + ishk, true);
    xmlhttp.send()
}