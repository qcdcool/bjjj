function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null)
		return unescape(r[2]);
	return null;
}

var appsource = getQueryString("appsource");
$("#appsource").val(appsource);

function openDivblack() {
	$.ajax({
		type : "post",
		url : "../../platform/enterbj/getCurPaperCount",
		data : {
			"userid" : $("#userid").val()
		},
		dataType : "json",
		success : function(msg) {
			if (msg.rescode == 200) {
				var count = msg.count;
				if (count > 0) {
					var tanwindowstr = "<div class='tan'>" + msg.resdes
							+ "</div>";
					$("#tanwindow2").append(tanwindowstr);
					return;
				} else {
					openPop();
				}
			}
			openPop();
		},
		timeout : 15000,
		error : function(msg) {
			openPop();
		}
	});
}

function openPop() {
	$("#Divblack").removeClass("none");
	var a = 21;
	var nn
	var timer01 = setInterval(function() {
		a--;
		if (a < 0) {
			clearTimeout(timer01);
			nn = "确定";
			$("#timebtn").css("background-color", "#0d70d8");
			$("#timebtn").removeAttr("disabled");
		} else if (a < 10) {
			$("#timebtn").attr("disabled", true);
			$("#timebtn").css("background-color", "#d7d7d7");
			nn = "0" + a + "s";
		} else if (a >= 10) {
			nn = a + "s";
			$("#timebtn").attr("disabled", true);
			$("#timebtn").css("background-color", "#d7d7d7");
		}
		$("#timebtn").text(nn);
	}, 1000);
}

function addUrlPara(name, value) {
	var currentUrl = location.href;
	if (/\?/g.test(currentUrl)) {
		if (/name=[-\w]{4,25}/g.test(currentUrl)) {
			currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "="
					+ value);
		} else {
			currentUrl += "&" + name + "=" + value;
		}
	} else {
		currentUrl += "?" + name + "=" + value;
	}
	location.href = location.href = currentUrl;
}

function divblackhide() {
	$.post("../../platform/enterbj/curtime", function(data) {
		var curTime;
		if (data.rescode == "200") {
			// addUrlPara("hiddentime", data.curTime);
			curTime = data.curTime;
		} else {
			// addUrlPara("hiddentime", mydata);
			curTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
		}
		;
		$('#hiddentime').val(curTime);
		$("#Divblack").addClass("none");
		$('#applybj').submit();
	});

};

function detectionMt() {

	$.ajax({
		type : "post",
		url : "../../platform/enterbj/curtime",
		dataType : 'json',
		contentType : "application/json",
		success : function(data) {

		},
		error : function(XMLHttpRequest, textStatus) {

			if (XMLHttpRequest.status == "200") {
				window.location.href = "addcartype.jsp";
			}
		}

	});

}