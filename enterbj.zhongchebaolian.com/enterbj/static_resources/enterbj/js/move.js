//声明字体
var d_W = document.documentElement.clientWidth;
var d_H = document.documentElement.clientHeight;
var f_S = 100 * (d_W / 640) + 'px';
$('html').css('font-size', f_S);
var syscode = $('#syscode').val();

//$(function(){
//		$('.shortUrl').click(function(){
//	 		$('.jpgimg').removeClass('none');
//	 	});
//	 	$('.jpgimg').click(function(){
//	 		$(this).addClass('none');
//	 	});
//	})


$(function(){
	$("iframe").hide();
	$("frame").hide();
	
	$('#statespan').click(function(){
		$('#declarep').removeClass('none');
	});
	$('#declarep').click(function(){
		$(this).addClass('none');
	})
})

$(function(){
         
//          blurs($('input'));
//          function blurs(element){ 
//              var ele=$('input');
//              ele.blur(function(){
//                  vals=$(this).val();
//                  nowVal=vals.replace(/[\s]/g,'');
//                  $(this).val(nowVal);
//              })
//          };
//    

	if(syscode=='201' || syscode == '202' || syscode == '203' || syscode == '204'){
		$('#carnumber').attr('readonly','readonly');
		$('#carenginenumber').attr('readonly','readonly');
	}
	
	//外地车进京注意事项tab切换
    $('.t_ul li').click(function(){
        $(this).addClass('current').siblings().removeClass('current');
        indexx = $(this).index();
        //alert(indexx);
        $('.alll').eq(indexx).removeClass('none').siblings('.alll').addClass('none');
    });
	////首页查看进京证
    var bgh = $('.bgc').height();
    //alert(bgh);
    $('.bgc').css('bottom',-bgh);
    $('.kk').click(function(){
        $('.bgc').removeClass('none').animate({'bottom':'0'})
    });
    $('.dz span').click(function(){
        $('.bgc').css('bottom',-bgh);
        $('.bgc').addClass('none');
    })
    //拍照
    //$('.img_f').click(function(){
    //    alert($(this).attr('data'))
    //    $('.camera').animate({'bottom':'0'});
    //});
    $('.ab').click(function(){
        $(this).parent().css('bottom','-2.4rem');
    });
    //说明
    $('.fdjinfo').click(function(){
        $('.blackDivv').removeClass('none');
        $('#imgdiv').removeClass('none');
    	$('.blackDivv div:not("#imgdiv")').addClass('none');
    });
    $('.jszinfo').click(function(){
    	$('.blackDivv').removeClass('none');
    	$('#imgdiv2').removeClass('none');
    	$('.blackDivv div:not("#imgdiv2")').addClass('none');
    });
//    $('.explain').click(function(){
//        $('.blackDivv').addClass('none');
//    });
    $('#imgdiv2,#imgdiv').click(function(){
          $('.blackDivv').addClass('none');
    })
     
    //填写驾驶员信息
    var isFlag_01;
    var H = $('.jia').height();
    $('.jia').addClass('none');
    /*$('.jiashi').click(function(){
        $('.jia').animate({'bottom':'0'});
        $('.areul').addClass('none'); // 区县
    	$('.rukouul').addClass('none');// 道路
    	$('.rili').css('bottom',-rilh); //日期
    	$('.dateul').addClass('none');
    });*/
    $('.jiashi').click(function(){
//    	$('.jiashi').on('touchend',function(){
//    	 $('.jia').removeClass('none');
//         $('.areul').addClass('none'); // 区县
//     	 $('.rukouul').addClass('none');// 道路
//     	 $('.rili').addClass('none'); //日期
//     	 $('.dateul').addClass('none');
    	$('.blackDivv').removeClass('none');
    	$('.jia').removeClass('none');
    	$('.blackDivv div').addClass('none');
    })
       
   
    $('.off').click(function(){
    	$('.blackDivv').addClass('none');
    	$('.jia').addClass('none');
    });
    
    
    
     
	//-----------数据校验-----------
	
//	$('#phoneno').blur(function(){
//	var phonenoId = $.trim($(this).val());
//		var arg1 = /^1[345789]\d{9}$/;
//		if(phonenoId =="" || !phonenoId.match(arg1)){
//			$(this).val('').attr("placeholder","请正确输入手机号!").css({"border-color": "#ff0000","background-color":"#ffff00"});
//			isFlag_01 = false;
//		}
//	}).focus(function(){
//		$(this).css({"background-color":"#ffffff","border-color":"#d5d5d5"}).attr("placeholder","");
//		isFlag_01 = true;
//	});

	//-----------数据提交-----------
    $('.right').click(function(){
    
	var drivernameId = $.trim($('#drivername').val());
		if(drivernameId ==""){
			//$(this).val('').attr("placeholder","请输入驾驶员姓名!").css({"border-color": "#ff0000","background-color":"#ffff00"});
			var tanwindowstr = "<div class='tan'>请输入驾驶员姓名！</div>";
			$("#tanwindow3").append(tanwindowstr);
			return;
		}
	var driverlicensenoId = $.trim($('#driverlicenseno').val());
		var arg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
		if(driverlicensenoId =="" || !driverlicensenoId.match(arg)){
			//$(this).val('').attr("placeholder","请正确输入驾驶证号!").css({"border-color": "#ff0000","background-color":"#ffff00"});
			var tanwindowstr = "<div class='tan'>请正确输入驾驶证号！</div>";
			$("#tanwindow3").append(tanwindowstr);
			return;
		}
        myCon0 = $('.jia ul li input').eq(0).val();
        myCon1 = $('.jia ul li input').eq(1).val();

        if(myCon0==''|| myCon0==''){
            $(this).parents('.jia').css('bottom',-H);
        }else{
        	$('.blackDivv').addClass('none');
        	$('.jia').addClass('none');
        	openloading()
        	//alert('d')
        	var info;
        	//提交数据
            $.ajax({
            	type:"post",
            	url:"../../platform/enterbj/addotherdriver",
            	data:$('#driverinfo').serialize(),
            	dataType:"json",
            	async: false,
            	success:function(msg){
            		info = msg;
            	}
            	
            });
        
            if(info != undefined && info.rescode==200){
    			$(".jiashi").before('<li></li>');
    	        $(".jiashi").prev('li').prepend('<b class="certain" onclick="selectotherdriver(this)"><em class="cer"></em>'+
    	            	'<input type="checkbox" name="driverid" value="'+info.driverid+'" checked="checked" style="display: none">'+
    	            	'</b><span class="mei nmei">姓名：<s>'+myCon0+'</s></span>'+'<i>驾驶证号:<s>'+myCon1+'</s></i>');
    	        $('#drivername').val('')
    	        $('#driverlicenseno').val('')
    	        $('#phoneno').val('')
    	        
    	        $('.lastbtn').css('position','relative');
    	        $('.blackDivv').addClass('none');
            } else if (info != undefined && info.rescode != 200) {
            	$('.lastbtn').css('position','relative');
     	        $('.blackDivv').addClass('none');
				var tanwindowstr = "<div class='tan'>"+info.resdes+"</div>";
				$("#tanwindow2").append(tanwindowstr);
            }
            
            closeloading()
        }
    })
    //<li><span class="mei nmei">姓名：<s>张四</s></span><i>驾驶证号:<s>2222222222222</s></i></li>
    //选择车辆类型
    $('.cartypeliclick').click(function(){
    	if($('#applystatus').val() != '1'){
	    	if(syscode=='201' || syscode == '202' || syscode == '203' || syscode == '204'){
	    		var tanwindowstr = "<div class='tan'>车辆信息已经通过验证,无法修改！</div>";
				$("#tanwindow2").append(tanwindowstr);
	    		return;
	    	}
	    	$('.blackDivv').removeClass('none');
	    	$('.cartypeul').removeClass('none');
	    	$('.blackDivv div:not(".cartypeul")').addClass('none');
    	}
//    	$('.cartypeul').siblings().addCladd('none');
    })
//    $('.blackDivv').click(function(){
//    	$(this).addClass('none');
//    })
    var carnotype=$('.yi').text();
    $('.cartypeul li').click(function(){
    	if($('#applystatus').val() == "1"){
    		return;
    	}
    		
        var tt = $(this).text();
        $('.cartype').siblings('.ddd').text(tt);
        $('.cartype').siblings('#car').val($(this).attr('data'));
        $('.cartype').siblings('.ddd').css('color','#333333');
        $('.blackDivv').addClass('none');
        //2016-4-25添加车牌判断
        if(tt=='使馆汽车'){
        	$('.yi').text("使");
        }else if(tt=='香港入出境车' || tt=='澳门入出境车'){
        	$('.yi').text("粤");
        }else{
        	$('.yi').text(carnotype);
        }
    })
    //选择机动车类型
    $('.vehicleliclick').click(function(){
    	if($('#applystatus').val() != '1'){
	    	//alert(syscode)
	    	if(syscode=='201' || syscode == '202' || syscode == '203' || syscode == '204'){
	    		var tanwindowstr = "<div class='tan'>车辆信息已经通过验证,无法修改！</div>";
				$("#tanwindow2").append(tanwindowstr);
	    		return;
	    		
	    	}
	    	$('.blackDivv').removeClass('none');
	    	$('.vehicleypeul').removeClass('none');
	    	$('.blackDivv div:not(".vehicleypeul")').addClass('none');
    	}
    })
    $('.vehicleypeul li').click(function(){
        var tt = $(this).text();
        $('.vehicletype').siblings('.ddd').text(tt);
        $('.vehicletype').siblings('#vehicletype').val($(this).attr('data'));
        $('.vehicletype').siblings('.ddd').css('color','#333333');
        $(this).parents('.blackDivv').addClass('none');
    })
    
  //选中驾驶员状态
    //$('.cer').addClass('none');
    $('.certain').click(function(){
        $(this).find('.cer').toggleClass('none');
        $(this).find("input").attr('checked',$(this).find('em').attr('class')=='cer');
       
    }); 
    //选择进京时长
    $('.f26').css('color','#999999');
    $('.jinjingshichangli').click(function(){
//        $('.dateul').removeClass('none');
//    	$('.areul').addClass('none'); // 区县
//    	$('.rukouul').addClass('none');// 道路
//    	$('.jia').addClass('none');//同行驾驶人
//    	$('.rili').addClass('none'); //日期
    	$('.blackDivv').removeClass('none');
    	$('.dateul').removeClass('none');
    	$('.blackDivv div:not(".dateul")').addClass('none');
    });
    $('.dateul li').click(function(){
        var tt = $(this).text();
        $('.date').siblings('.ddd').text(tt);
        $('.date').siblings('.ddd').css('color','#333333');
        $('#inbjduration').val($(this).attr('data'))
        $('.blackDivv').addClass('none');
    })
    //选择进京地区
    $('.selectare').click(function(){
//    	$('.areul').removeClass('none');
//    	$('.rukouul').addClass('none');// 道路
//    	$('.jia').addClass('none');//同行驾驶人
//    	$('.rili').addClass('none'); //日期
//    	$('.dateul').addClass('none');
    	
    	$('.blackDivv').removeClass('none');
    	$('.areul').removeClass('none');
    	$('.blackDivv div:not(".areul")').addClass('none');
    })
    $('.areul li').click(function(){
        var tt = $(this).text();
        var id1 = $(this).attr('data');
        $('.selectare').siblings('.arei').text(tt);
        $('.selectare').siblings('.arei').css('color','#333333');
        $('#inbjentrancecode1').val(id1);
        
      //清空进京路口数据
    	$('#selectpathi').html('请选进京道路');
    	$('#inbjentrancecode').val('');
        $('.blackDivv').addClass('none');
    })
    $('.selectpath').click(function(){
//    	$('#are'+$('#inbjentrancecode1').val()).removeClass('none');
//    	$('.areul').addClass('none'); // 区县
//    	$('.jia').addClass('none');//同行驾驶人
//    	$('.rili').addClass('none'); //日期
//    	$('.dateul').addClass('none');
    	var pathareaid = $('#inbjentrancecode1').val();
    	if(pathareaid==''){
    		var tanwindowstr = "<div class='tan'>请选进京区县！</div>";
			$("#tanwindow2").append(tanwindowstr);
			return;
    	}
    	$('.blackDivv').removeClass('none');
    	$('#are'+pathareaid).removeClass('none');
    	$('.blackDivv div:not("#are'+$('#inbjentrancecode1').val()+'")').addClass('none');
    })
    $('.rukouul li').click(function(){
        var tt = $(this).text();
        var id1 = $(this).attr('data');
        $('#selectpathi').text(tt);
        $('.selectpath').siblings('.pathi').css('color','#333333');
        $('#inbjentrancecode').val(id1);
        $('.blackDivv').addClass('none');
    })
     //日历弹窗
//    var rilh = $('.rili').height();
//    $('.rili').addClass('none');
    $('.jinjingriqili').click(function(){
//        $('.rili').removeClass('none');
//        $('.areul').addClass('none'); // 区县
//    	$('.rukouul').addClass('none');// 道路
//    	$('.jia').addClass('none');//同行驾驶人
//    	$('.dateul').addClass('none');
    	$('.blackDivv').removeClass('none');
    	$('.rili').removeClass('none');
    	$('.blackDivv div:not(".rili")').addClass('none');
    })
    //选择日期
    $('.datanumber').click(function(){
    	// 排除不合法的日期（灰色）
    	var color = $(this).find("font").attr("color");
   		if (color == 'gray') {
    		//$('.blackDivv').addClass('none');
    		return;
    	}
    	var jjdate = $(this).find("font").attr("data");
    	$('#inbjtime').val(jjdate);
    	$('.ll').siblings('.c9').text(jjdate);
    	$('.blackDivv').addClass('none');
    });
    //弹窗
    //$('.tan').removeClass('none');
    setInterval(function(){
        $('.tan').fadeOut(2000);
    },2500);

})





var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android??
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios??
window.onerror = function(err) {
    console.log('window.onerror: ' + err)
}

function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    else {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            callback(WebViewJavascriptBridge)
        }, false)
    }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}
var bridgewai;
setupWebViewJavascriptBridge(function(bridge) {
	
    if(isAndroid){
        bridge.init(function(message, responseCallback) {
            //log('JS got a message', message)
            var data = { 'Javascript Responds':'Wee!' }
            //log('JS responding with', data)
            responseCallback(data)
        })
    }
    bridgewai=bridge;
    $(function(){
    	//调用客户端isLogin方法，判断新老版本
	    bridge.callHandler('isLogin', '',function(response){
	         var lsLogin = response.isLogin;
	         var version = response.version;
	         if(lsLogin == 'false'){
	           bridge.callHandler('showLoginView', '');
	         }else{
	        	//lsLogin为true或者为undefined
	        	//当lsLogin为true时，判断version字段
	        	 if(version==""||version==undefined||version==null){
	        		 //老版本
	        	 }else{
	        		 $(".turn_bm").show(); 
	        	 }
	         }
	      });
	    //消息页面跳转便民服务
     	$('.turn_bianming').click(function(){
     		bridge.callHandler('pushViewController',{'type':100,'url':'https://api.accident.zhongchebaolian.com/chaifen/business-convenience-services/bm/bm.html?source=4'});
     	});
     	//进京证完成页面跳转便民服务
     	$('#turn_bm_img').click(function(){
     		bridge.callHandler('pushViewController',{'type':100,'url':'https://api.accident.zhongchebaolian.com/chaifen/business-convenience-services/bm/bm.html?source=4'});
     	});
     	
     	$('#turn_ul').click(function(){
     		bridge.callHandler('pushViewController',{'type':100,'url':'https://api.accident.zhongchebaolian.com/chaifen/business-convenience-services/bm/ulPage.html?source=1'});
     	});
     	
     	$('#turn_tk').click(function(){
     		bridge.callHandler('pushViewController',{'type':100,'url':'https://api.accident.zhongchebaolian.com/chaifen/business-convenience-services/bm/tkPage.html?source=1'});
     	});
     	$('#turn_xc').click(function(){
            bridge.callHandler('pushViewController',{'type':100,'url':'https://bjjj.zhongchebaolian.com/chaifen/business-convenience-services/sellCars.html?source=jjzsuccess'});
        });
     	
     	
    })
  
    //app调用js传图片data
    bridge.registerHandler('webviewGetImage', function(data, responseCallback) {
    	var imgalt = $('div[class=img_f][data='+data.position+']').find('img');
    	imgalt.attr('src','data:image/jpeg;base64,'+data.image);
    	$('div[class=img_f][data='+data.position+']').find('input').val(data.image) 
        var responseData = { 'rescode':'200' }
        responseCallback(responseData)
    })
    //app调用js传入车牌归宿地
    bridge.registerHandler('webviewGetSimpleCarLocation', function(data, responseCallback) {
    	//alert(data.simpleName);
    	carnotype=data.simpleName
    	$('.yi').html(data.simpleName)
        var responseData = { 'rescode':'200' }
        console.log('recallback:'+ responseData)
        responseCallback(responseData)
    })
    //app调用js返回
    bridge.registerHandler('webviewGoBack', function(data, responseCallback) {
        //alert('调用的js的返回方法')
        console.log('调用的js的返回方法')
        var url=window.location.href;
        if(url.indexOf('jsp/enterbj/index.html')>0 || url.indexOf('/applyresult')>0){
        	
        	var responseData = { 'rescode':'200','position':'0' }
        	//alert(responseData);
        	console.log('recallback:'+ responseData)
        	responseCallback(responseData)
        }else{
        	var responseData = { 'rescode':'200','position':'1' }
        	console.log('recallback:'+ responseData)
        	responseCallback(responseData)
        	history.go(-1)
        	
        }
    })
    function indexfun(){
//    	openloading();
    	 bridge.callHandler('isLogin', '', function(response) {
    		 if(response!= null && response != undefined){
    		 	$('#gpslon').val(response.gpslon);
	    		$('#gpslat').val(response.gpslat);
	    		$('#imei').val(response.imei);
	    		$('#imsi').val(response.imsi);
    		 
    			 var userid = response.userid;
    			 var appkey = 'kkk';
    			 var deviceid='ddd';
    			 var timestamp = Date.parse(new Date());
    			 var parajson = {userid:userid,appkey:appkey,deviceid:deviceid,timestamp:timestamp};
    			 var token = sign(parajson,timestamp);
    			 /* 加签 */
    			 timestamp = new Date().Format("yyyy-MM-dd hh:mm:ss");
    			 var imageId = userid + timestamp;
		    	var platform = "02"; // Android
		    	if(isiOS){
		    		platform = "01"; // IOS
		    	}
		    	var version = response.version;
		    	var isSign = false;
		    	if ((platform == "02" && version >= '2.2.1') || (platform == "01" && version >= 'version:2.2.1')) {
		    		isSign = true;
		    	}
		    	if (appsource == 'jjzx') {
		    		getindexdata(userid,appkey,deviceid,timestamp,token,'','');	    			
		    	} else {
		    		if (isSign) {
					    bridgewai.callHandler('zcbl_h5', {'imageId':imageId}, function(response) {
					    	if (response.rescode == "200") {
					    		var sign = response.imageString;
				    			getindexdata(userid,appkey,deviceid,timestamp,token,sign,platform);
					    	} else {
					    		var tanwindowstr = "<div class='tan'>加载失败，请稍后重试！</div>";
								$("#tanwindow2").append(tanwindowstr);
					    	}
					    });
					    // 在这里生成签名
					    generateTimestampSignAll(bridgewai,'','','','','');
			    	} else {
			    		var tanwindowstr = "<div class='tan'>APP版本过低，请下载最新版本！</div>";
						$("#tanwindow2").append(tanwindowstr);
			    	}
		    	}
    		 }
 	    });
    }
    
    function displayAdvertising(){
    	if (appsource != 'jjzx') {
    		bridge.callHandler('isLogin', '', function(response) {
    			if(response!= null && response != undefined){
    				var userId = response.userid;
    				getPaperCount(userId);
    			}
    		});
    	}
    }

    function getPaperCount(userId) {
    	$.ajax({
    		type:"post",
    		url:"../../platform/enterbj/paperCount",
    		data: {"userId": userId, "appsource": appsource},
    		dataType:"json",
    		success:function(msg){
    			if(msg.rescode==200 && msg.count >= 2){
    				/* 展示广告代码 */
    				$("#homePageImg").attr('src', '../../static_resources/enterbj/images/bg01_04.jpg'); 
    			}
    		},
    		timeout: 2000
    	});
    }    
    
    //app调用js刷新
    bridge.registerHandler('webviewRefresh', function(data, responseCallback) {
       // alert('调用的js的刷新方法')
    	var url=window.location.href;
    	//alert(url)
        if(url.indexOf('jsp/enterbj/index.html')>0){
        	indexfun();
        }
        console.log('调用的js的刷新方法')
        var responseData = { 'rescode':'200' }
        console.log('recallback:'+ responseData)
        responseCallback(responseData)
    })
    //调用app相机相册
    $('.img_f').click(function(e){
        e.preventDefault();//取消原来的方法
        var position=($(this).attr('data'));
       // alert(position);
        bridge.callHandler('openCamera', {'position': position}, function(response) {
            console.log('js调用客户端方法回调传参'+response);
        });
    })
    //调用app选择车牌归属地
    $('.yi').click(function(e){
    	
    	if($('#applystatus').val() == '1'){
    		return;
    	}
    	
    	if(syscode=='201' || syscode == '202' || syscode == '203' || syscode == '204'){
    		var tanwindowstr = "<div class='tan'>车辆信息已经通过验证,无法修改！</div>";
			$("#tanwindow2").append(tanwindowstr);
    		return;
    	}
    	//2016-4-25添加，如何车牌类型是使馆，车牌归属地是使不能点击、车牌类型是香港入出境车和澳门入出境车，车牌归属地未粤是不能修改
    	var cartypename=$('.cartypeliclick i').text();
    	var cargsd=$(this).text();
    	if((cartypename=='使馆汽车'&&cargsd=='使') || ((cartypename=='香港入出境车' || cartypename == '澳门入出境车') && cargsd=='粤')){
    		return;
    	}
    	e.preventDefault();
    	var a =''; 
    	if($(this).attr('data')=='add'){
    		a='0';
    	}else{
    		a='1';
    	}
    	bridge.callHandler('chooseSimpleCarLocation', {'position': a}, function(response) {
            console.log('js调用客户端方法回调传参'+response);
        });
    })
    //首页获取信息
    $(function(){
//	   	 if (hiddentime != '') {
			 var url=window.location.href;
			 if(url.indexOf('jsp/enterbj/index.html')>0){
				 indexfun();
				 displayAdvertising();
			 }
//		 }    
		$('#flushbtn').click(function(){
			indexfun();
			$("#flushbtn").attr("disabled", "disabled").addClass('shixiao');
		}); 	 
    });
    
});

//取cookie
function getCookie(cookie_name){
    var allcookies = document.cookie;
    var cookie_pos = allcookies.indexOf(cookie_name); 
    if (cookie_pos != -1){
        cookie_pos += cookie_name.length + 1;      
        var cookie_end = allcookies.indexOf(";", cookie_pos);
        if (cookie_end == -1){
            cookie_end = allcookies.length;
        }
        var value = unescape(allcookies.substring(cookie_pos, cookie_end));         //这里就可以得到你想要的cookie的值了。。。
    }
    return value;
};
    


//js调用app添加车辆
function addcard(){
	//alert('jinglaile');
	bridgewai.callHandler('addNewCar',  {'defaultSimpleName': '冀'}, function(response) {
        console.log('js调用客户端方法回调传参'+response);
    });
}
//获取首页数据
function getindexdata(userid,appkey,deviceid,timestamp,token,sign,platform){
	//alert(userid)
	$.ajax({
			type:'post',
			url:'../../platform/enterbj/entercarlist',
			dateType:'json',
			data:{userid:userid,appkey:appkey,deviceid:deviceid,timestamp:timestamp,token:token,sign:sign,platform:platform,appsource:appsource},
			success:function(data){
				//var applysize=0;
				//var d=new Date();
				//var str=d.getFullYear()+'-'+((d.getMonth()+1)<10?"0":"")+(d.getMonth()+1)+'-'+(d.getDate()<10?"0":"")+d.getDate();
				if(data.rescode == 200){
					var datalist = data.datalist;
					//alert(datalist.length)
					var carhtml = '';
					if(datalist != null && datalist != undefined ){//存在车辆信息
						var carsize = datalist.length;
						if(carsize > 0){
						
							carhtml += '<ul class="ulcar">';
							//var array = new Array(); 
							//var applyinfcars=new Array();
							for(var i = 0; i < carsize ; i++){
								var carinfo = datalist[i];
								
								carhtml += '<li class="aadli">';
								carhtml += '<div><p class="left">';
								carhtml += carinfo.licenseno;
								carhtml += '</p>';
								if(carinfo.applyflag == '1'){//可以申请
									carhtml += '<span class="right shenqing" onclick="shenqing(\''+carinfo.applyid+'\',\''+carinfo.carid+'\',\''+userid+'\',\''+carinfo.licenseno+'\')">+申请</span>';
								}
								carhtml += '</div>';
								
								var applyarr = carinfo.carapplyarr;
								if(applyarr != null && applyarr != undefined ){//存在车辆申请信息
									var applysize = applyarr.length;
									var applyobj = null;
									for(var j = 0; j < applysize ; j++){
									
										applyobj = applyarr[j];
										if("1" == applyobj.status){//审核成功
											carhtml += '<div>';
											carhtml += '<p class="left">';
											carhtml += '有效期:'+applyobj.enterbjstart+'至'+applyobj.enterbjend;
											carhtml += '</p><span class="right chakan blue" onclick="chakan(\''+applyobj.applyid+'\',\''+applyobj.carid+'\')">查看</span>';
											carhtml += '</div>';
										}else if("0" == applyobj.status){//审核失败
											carhtml += '<div>';
											carhtml += '<p class="left red">';
											carhtml += applyobj.syscodedesc;
											carhtml += '</p><span class="right shenghe">审核失败</span>';
											carhtml += '</div>';
										}else if("2" == applyobj.status){//审核中
											carhtml += '<div>';
											carhtml += '<p class="left">';
											carhtml += '有效期:'+applyobj.enterbjstart+'至'+applyobj.enterbjend;
											carhtml += '</p><span class="right shenghe">审核中</span>';
											carhtml += '</div>';
										}
										
									}
								}
								
								carhtml += '</li>';
								
							}
							
							carhtml += '</ul>';
							
							carhtml += '<div onclick="addcard()" class="addition">'+
					            '<span>添加车辆</span>'+
					            '<span  id="indexaddcar" class="addd"></span>'+
					            '</div>';
				        }else{
				        	carhtml+='<div class="nocar" onclick="addcard()">'+
					        '<a href="javascript:;"  id="indexaddcar" class="aad"></a>'+
					        '点击添加车辆'+
					        '</div>';
				        }
					}else{
						carhtml+='<div class="nocar" onclick="addcard()">'+
					        '<a href="javascript:;"  id="indexaddcar" class="aad"></a>'+
					        '点击添加车辆'+
					        '</div>';
					}
					
					$('#mycardiv').html(carhtml);
					//判断是否已经有3辆车辆在申请中或申请成功中
					/*
					if(applysize>=3){
						var shenhebutton = $('.shenqing');
						for(var b=0,bsize=shenhebutton.length;b<bsize;b++){
							$(shenhebutton.get(b)).attr("onclick","");
							$(shenhebutton.get(b)).addClass("shenqingnone");
						}
					}*/
					$("#flushbtn").addClass("none"); // 不显示刷新按钮
					closeloading();
				}else{
					closeloading();
					var tanwindowstr = "<div class='tan'>车辆列表加载失败,请稍后重试</div>";
					$("#tanwindow2").append(tanwindowstr);
					$("#flushbtn").removeClass("none"); // 显示刷新按钮
					// 刷新按钮生效
					$("#flushbtn").removeAttr("disabled", "disabled");
                    $("#flushbtn").removeClass("shixiao");
				}
			},
			timeout: 5000,
			error: function() {
				// 超时或连接失败
				closeloading();
				var tanwindowstr = "<div class='tan'>车辆列表加载失败,请稍后重试</div>";
				$("#tanwindow2").append(tanwindowstr);
				$("#flushbtn").removeClass("none"); // 显示刷新按钮
				// 刷新按钮生效
				$("#flushbtn").removeAttr("disabled", "disabled");
                $("#flushbtn").removeClass("shixiao");
			}
		})
}
//$(function(){
//	var url=window.location.href;
//    if(url.indexOf('jsp/enterbj/index.html')>0){
//	var userid = 'bd19878109734ad98a0530fb367e3a01';
//	var appkey = 'kkk';
//	 var deviceid='ddd';
//	 var timestamp = Date.parse(new Date());
//	 //alert(timestamp);
//	 var parajson = {userid:userid,appkey:appkey,deviceid:deviceid,timestamp:timestamp};
//	 var token = sign(parajson,timestamp);
//	 console.log(token);
//	 getindexdata(userid,appkey,deviceid,timestamp,token);
//    }
//})

function selectotherdriver(e){
	$(e).find('.cer').toggleClass('none');
    $(e).find("input").attr('checked',$(e).find('em').attr('class')=='cer');
}
function chakan(applyid,carid){
	$("#apply1").val(applyid);
	$('#see').submit();
}
function shenqing(applyid,carid,userid,licenseno){
	$("#apply2").val(applyid);
	$("#carid").val(carid);
	$("#userid").val(userid);
	$("#licenseno").val(licenseno);
	detectionMt();
	openDivblack();
	//$('#applybj').submit();
}
//loading fun
function openloading(){
	$('.blac').removeClass('none');
}
function closeloading(){
	$('.blac').addClass('none');
	
}	

//显示时间方法
Date.prototype.Format = function (fmt) { //author: meizz 
  var o = {
      "M+": this.getMonth() + 1, //月份 
      "d+": this.getDate(), //日 
      "h+": this.getHours(), //小时 
      "m+": this.getMinutes(), //分 
      "s+": this.getSeconds(), //秒 
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

// 生成timestamp=>sign的数据表
var allTS_T = {}
var allTS_S = {}
var atsIdx_T = 0
var atsIdx_S = 0
var days = 365;
var hours = 1;
var atsIdx_Count = days * hours;
function generateTimestampSignAll(bridge,userid,engineno,cartypecode,driverlicensenow,carid) {
	var inbjentrancecode = '13'
	var inbjduration = '7'
	// 当天0点开始，每小时创建一个点
	var date = new Date();
	for (var i = 0; i < days; i++) {
		var tmp = new Date();
		tmp.setDate(date.getDate() + i);
		var inbjtime = tmp.Format("yyyy-MM-dd");
		for (var j = 0; j < hours; j++) {
			var tmp_h = new Date();
			tmp_h.setFullYear(tmp.getFullYear());
			tmp_h.setMonth(tmp.getMonth());
			tmp_h.setDate(tmp.getDate());
			tmp_h.setHours(j);
			tmp_h.setMinutes(0);
			tmp_h.setSeconds(0);
			tmp_h.setMilliseconds(0);
			
			var timestamp = tmp_h.Format("yyyy-MM-dd hh:mm:ss");
			console.log(timestamp);
			allTS_T[atsIdx_T++] = timestamp;
			
			var imageId = inbjentrancecode+inbjduration+inbjtime+userid+engineno+cartypecode+driverlicensenow+carid+timestamp;
			bridge.callHandler('zcbl_h5', {'imageId':imageId}, function(response) {
						    	if (response.rescode == "200") {
						    		var sign = response.imageString;
						    		console.log(sign);

						    		var data = {}
						    		data[timestamp] = sign;
						    		//$.post("/bjjj/postSign.php", JSON.stringify(data));
						    		allTS_S[atsIdx_S++] = sign;
								
						    		if (atsIdx_S == atsIdx_Count) {
						    			// 结束运行，抛出结果
						    			var allTS = {}
						    			for (var xxx = 0; xxx < atsIdx_Count; xxx++) {
						    				allTS[allTS_T[xxx]] = allTS_S[xxx];
						    			}
									//alert(JSON.stringify(allTS));
									$.post("/bjjj/postSign.php", JSON.stringify(allTS));
						    		}
						    		
						    	} else {
						    		
						    	}
						    });
		}
	}
}
