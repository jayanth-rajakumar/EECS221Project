// JavaScript Document
var Player = new PlayerObj();

function GetPlayerLayerWidthHeight() {
    var MinHeight = 430;
    var MinWidth = 900;

    if(window.screen.width < 1400)
	    width = window.screen.width - parseInt($("#LeftToolLayer").css("width")) - 30;
    else
		width = window.screen.width - parseInt($("#LeftToolLayer").css("width")) - 20;
		
    height = document.documentElement.clientHeight - parseInt($(".header ul").css("height")) - 30;

    if (height < MinHeight) height = MinHeight;
    if (width < MinWidth) width = MinWidth;
	
	try{
		//log(GetBrowserVer().ver);
		//if( (GetBrowserVer().brower=="IE") && (GetBrowserVer().ver == "11.0")){
			if(GetBrowserVer().brower=="IE"){
			//log("!!!!!!!!!!!!!!!!!!!!");
			width-=15;
		}
	}catch(e){
		
	}
	
    return {
        w: width,
        h: height
    };
}

function LoadPlayer() {
    return Player.Load();
}

function StartPlay() {
	Player.SetPlayMode(GetPlayMode());
    return Player.Play(GetPlayerLayerWidthHeight().w, GetPlayerLayerWidthHeight().h);
}

function StopPlay() {
    return Player.StopPlay();
}

function PlayerResize(w, h) {
    return Player.PlayerResize(w, h);
}

function GetVideoWidthHeight() {
    return Player.GetVideoWidthHeight();
}

function RePlay(w, h) {
    StopPlay();
    return StartPlay();
}

function Record() {
    return Player.Record();
}

function Snap() {
    return Player.Snap();
}

function PlayBack() {
    return Player.PlayBack();
}

function StartTalk(stat) {
    return Player.StartTalk(stat);
}

function SetMute(stat) {
    return Player.SetMute(stat);
}

$(function() {
    var prevObjId = "#ImageSpan";
    var w_1, h_1, w_2, h_2;
    $(document).ready(function(e) {
		
        $("#LoginLayer").css("margin-left", parseInt((document.documentElement.clientWidth - $("#LoginLayer").width()) / 2) + "px");
        $("#MainMenuLayer").css("margin-left", parseInt((document.documentElement.clientWidth - $("#MainMenuLayer ul").width()) / 2) + "px");
        $("#LoginLayer").css("margin-top", parseInt((document.documentElement.clientHeight - $("#LoginLayer").height()) / 2) + "px");	
		$(".side a span:first-child").addClass("SideAFirstchildSpan");
		$("#ReplayFrame").height(GetPlayerLayerWidthHeight().h)
		$("#ReplayFrame").width(document.documentElement.clientWidth);
		if(GetPlayerLayerWidthHeight().h > 580)
			$("#ReplayFrame").attr("scrolling", "no");
		else	
			$("#ReplayFrame").attr("scrolling", "yes");
		/************没有的功能干掉************/
		if(typeof(p2p_enable) == 'undefined')
			p2p_enable = "-1";

		if(typeof(wifienable) == 'undefined')
			wifienable = "-1";

		if(typeof(aitype) == 'undefined')
			aitype = "0";
		if(typeof(cmsenable) == 'undefined')
			cmsenable = "-1";
			
		if (p2p_enable == "-1") {
	       $("#P2PSpan").parent().remove();
    	}
		if (wifienable == "-1") {
	       $("#WifiSpan").parent().remove();
    	}
		if (cmsenable == "-1") {
	       $("#ReverseConnectSpan").parent().remove();
    	}
		
		try{
			var cgiurl = "http://" + window.document.location.host + "/web/cgi-bin/hi3510/param.cgi?cmd=getzdwh";
        	cgiurl += '&-randoma8b9ctime="' + new Date().getTime() + '"';
			$.get(cgiurl, function(data){
				try{
					eval(data);
					if (enable == "-1") {
	       				$("#ZDWHSpan").parent().remove();
    				}
				}catch(e){
				
				}	
				
			}, "text");
		}catch(e){
			
		}
		
		if (cmsenable == "-1") {
	       $("#ReverseConnectSpan").parent().remove();
    	}
		
		if(sensortype == "tw2964")
		{
			$("#FlipLayer").css("display", "none");
		}
		if((boardtype != "1800")&&(boardtype != "5900")&&(boardtype != "1900"))
		{
			$("#Mobile3GSpan").parent().remove();
		}
		try
		{
			if(soundenable == "-1"){	
			}
		}
		catch(e)
		{
			$("#AlmSoundSpan").parent().remove();
		}
		
		/************ 判断logo图片是否存在**************/
		var logoPath = "/web/images/logo.png" ;
		var jqxhr = $.get(logoPath, function() {$("div#LogoLayer").css("display", "block");})//存在就把logo显示出来
		jqxhr.fail(function() {$("div#LogoLayer").css("display", "none");})//不存在就把logo显示出来
		

        /***********************获取图像高宽*******************/
        var cgiurl = "cgi-bin/hi3510/getvencattr.cgi?-chn=11";
        $.get(cgiurl,
        function(data) {
            eval(data);
            w_1 = width_1;
            h_1 = height_1;
        });
        cgiurl = "cgi-bin/hi3510/getvencattr.cgi?-chn=12";
        $.get(cgiurl,
        function(data) {
            eval(data);
            w_2 = width_2;
            h_2 = height_2;
        });
        /***********************动态加载多国语言*******************/
        LoadLanguage();
		if (aitype == "2") {
	       $("#AlarmInSpan").html(AlarmInPIRSpan);
    	}
        $("#HueImg").attr("title", HueImgTitile);
        $("#BrightnessImg").attr("title", BrightnessImgTitile);
        $("#ContrastImg").attr("title", ContrastImgTitle);
        $("#SaturationImg").attr("title", SaturationImgTitile);
        $("#GotoPoint").attr("title", GotoPointTitile);
        $("#SetPoint").attr("title", SetPointTitile);
        $("#ClearPoint").attr("title", ClearPointTitile);

	


        /***********************登录处理*******************/
        $("#LonginUsername").val("");
        $("#LonginPassword").val("");

        var username = getCookie("username");
        if (username) {
            $("#LonginUsername").val(Base64.decode(username));
            $("#LonginPassword").focus();
        }

        type = Number(GetPlayStream());
        if (type == 11) {
            $("#StreamSelect").get(0).selectedIndex = 0;
        } else if (type == 12) {
            $("#StreamSelect").get(0).selectedIndex = 1;
        } else {
            $("#StreamSelect").get(0).selectedIndex = 0;
        }

        var username = getCookie("username");
        var passwd = getCookie("password");
        if ((Number(GetAutoLogin()) == 1) && (passwd) && (username)) {
            $("#LonginUsername").val(Base64.decode(username));
            $("#LonginPassword").val(Base64.decode(passwd));

            $('#Login').click();

        } else {
            /********************延时1S目的让多语言加载完成*******************/
            setTimeout(function() {
                $('#LoginBgLayer').css('display', 'block');
            },
            500);
        }
		
		/************************8M版本去掉内存卡、遮盖告警***********************/
		
		var boardtype8M = new Array(); //板端类型
		var boardtype8M = hardVersion.split("-"); //字符分割 
		if(boardtype8M[0] == "3800")
		{
			$("#StorageSpan").parent().remove();
			$("#RecordSpan").parent().remove();
			$("#ODSpan").parent().remove();
			$("#WifiSpan").parent().remove();
			$("#Replay").css("display","none");
		}
        return true;

    });

    /*************注销登录************/
    $("#Logout").click(function() {
        delCookie("password");
        $('#AutoLogin').removeAttr('checked');
        StopPlay();
        window.location.reload();
    })
    /*************切换到预览界面************/
    $('#home').click(function() {
		$("#OCXCtlLayer").css("display", "block");
        $('#mainpageLayer').css('display', 'block');
        $('#AdvanceLayer').css('display', 'none');
		$('#ReplayLayer').css('display', 'none');
       	//window.onresize();
	
		if(GetBrowserVer().brower !=  "IE")//vlc 重连
			RePlay(GetPlayerLayerWidthHeight().w, GetPlayerLayerWidthHeight().h);
    })

    /*************切换到参数设置界面************/
    $('#ParametersSet').click(function() {

        if (!CheckAuth()) {
            alert(NoAuthErrorMsg);
            return true;
        }
		$("#OCXCtlLayer").css("display", "none");
        $('.side a, .side h1').css('display', 'none');
        $('#mainpageLayer').css('display', 'none');
		$('#ReplayLayer').css('display', 'none');
        $('#AdvanceLayer').css('display', 'block');
        $('#NetworkLayer, #NetworkLayer a, #NetWorkSpan').css('display', 'block');
        $('#EventLayer, #EventLayer a, #EventSpan').css('display', 'block');

        $('#NetworkLayer a:first').click();
    })
    /*************切换到系统设置界面************/
    $('#SystemSet').click(function() {
		$("#OCXCtlLayer").css("display", "none");
        $('.side a, .side h1').css('display', 'none');
        $('#mainpageLayer').css('display', 'none');
		$('#ReplayLayer').css('display', 'none');
        $('#AdvanceLayer').css('display', 'block');
        $('#SystemLayer, #SystemLayer a, #SystemSpan').css('display', 'block');

        if (!CheckAuth()) {
            $('#DeviceinfoSpan').click();
            return true;
        }

        $('#SystemLayer a:first').click();
    })
    /*************切换到媒体设置界面************/
    $('#Media').click(function() {

        if (!CheckAuth()) {
            alert(NoAuthErrorMsg);
            return true;
        }
		$("#OCXCtlLayer").css("display", "none");
        $('.side a, .side h1').css('display', 'none');
        $('#mainpageLayer').css('display', 'none');
		 $('#ReplayLayer').css('display', 'none');
        $('#AdvanceLayer').css('display', 'block');
        $('#MediaLayer, #MediaLayer a, #MediaSpan').css('display', 'block');

        $('#MediaLayer a:first').click();
    })
	
	    /*************切换到媒体设置界面************/
    $('#Replay').click(function() {

        if (!CheckAuth()) {
            alert(NoAuthErrorMsg);
            return true;
        }
		$("#OCXCtlLayer").css("display", "none");
        $('.side a, .side h1').css('display', 'none');
        $('#mainpageLayer').css('display', 'none');
        $('#AdvanceLayer').css('display', 'none');
		  $('#ReplayLayer').css('display', 'block');
     	$("#ReplayFrame")[0].contentWindow.location = 'replay.html';

  
    })

    /*************系统设置右侧菜单折叠************/
    $("#MediaSpan,#EventSpan,#NetWorkSpan,#SystemSpan").click(function() {
        return true;
        $("#MediaLayer").css("display", "none");
        $("#NetworkLayer").css("display", "none");

        $("#EventLayer").css("display", "none");
        $("#SystemLayer").css("display", "none");

        switch ($(this).attr("id")) {
        case "MediaSpan":
            $("#MediaLayer").css("display", "block");
            break;
        case "EventSpan":
            $("#EventLayer").css("display", "block");
            break;
        case "NetWorkSpan":
            $("#NetworkLayer").css("display", "block");
            break;
        case "SystemSpan":
            $("#SystemLayer").css("display", "block");
            break;
        }
    })

    /*************系统设置右侧网页跳转************/
    $(".side a").click(function() {
        /*****************签权*************/
        if (!CheckAuth() && ($(this).children("span:first").attr("id") != "DeviceinfoSpan")) {
            alert(NoAuthErrorMsg);
            return true;
        }

        /*加粗当前字体*/
        $(this).css("color", "#FFF");
        $(this).css("font-weight", "bold");
        $(this).css("background", "url(images/now_bar.png)");

        /*恢复上次字体*/
        if (prevObjId != ("#" + $(this).children("span:first").attr("id"))) {
            display = $(prevObjId).parent("a:first").css("display");
            $(prevObjId).parent("a:first").removeAttr("style");
            $(prevObjId).parent("a:first").css("display", display);
            prevObjId = "#" + $(this).children("span:first").attr("id");
        }

        /******跳转相应的页面******/
        switch ($(this).children("span:first").attr("id")) {
        case "ImageSpan":
            $("#pageframe")[0].contentWindow.location = 'image.html';
            break;
        case "VideoSpan":
            $("#pageframe")[0].contentWindow.location = 'video.html';
            break;
        case "BasicSettingsSpan":
            $("#pageframe")[0].contentWindow.location = 'network.html';
            break;
        case "DDNSSpan":
            $("#pageframe")[0].contentWindow.location = 'ddns.html';
            break;
        case "MobileSpan":
            $("#pageframe")[0].contentWindow.location = 'osd.html';
            break;
        case "UserSpan":
            $("#pageframe")[0].contentWindow.location = 'user.html';
            break;
        case "EmailSpan":
            $("#pageframe")[0].contentWindow.location = 'email.html';
            break;
        case "MDSpan":
            $("#pageframe")[0].contentWindow.location = 'md.html';
            break;
        case "AlarmInSpan":
            $("#pageframe")[0].contentWindow.location = 'alarmin.html';
            break;
        case "AlarmOutSpan":
            $("#pageframe")[0].contentWindow.location = 'alarmout.html';
            break;
        case "AutoSnapSpan":
            $("#pageframe")[0].contentWindow.location = 'autosnap.html';
            break;
        case "LanguageSpan":
            $("#pageframe")[0].contentWindow.location = 'base.html';
            break;
        case "TimeSpan":
            $("#pageframe")[0].contentWindow.location = 'time.html';
            break;
        case "InitSpan":
            $("#pageframe")[0].contentWindow.location = 'initializemain.html';
            break;
        case "DeviceinfoSpan":
            $("#pageframe")[0].contentWindow.location = 'deviceinfo.html';
            break;
        case "LogSpan":
            $("#pageframe")[0].contentWindow.location = 'syslog.html';
            break;
        case "PTZSpan":
            $("#pageframe")[0].contentWindow.location = 'ptz.html';
            break;
        case "ODSpan":
            $("#pageframe")[0].contentWindow.location = 'od.html';
            break;
        case "RecordSpan":
            $("#pageframe")[0].contentWindow.location = 'record.html';
            break;
        case "StorageSpan":
            $("#pageframe")[0].contentWindow.location = 'storage.html';
            break;
		   case "WifiSpan":
            $("#pageframe")[0].contentWindow.location = 'wifi.html';
            break;	
			case "P2PSpan":
            $("#pageframe")[0].contentWindow.location = 'p2p.html';
            break;	
		case "FTPSpan":
            $("#pageframe")[0].contentWindow.location = 'ftp.html';
            break;	
		case "CoverAreaSpan":
            $("#pageframe")[0].contentWindow.location = 'cd.html';
            break;	
		case "AudioSpan":
            $("#pageframe")[0].contentWindow.location = 'audio.html';
            break;
		case "Mobile3GSpan":	
	    $("#pageframe")[0].contentWindow.location = 'mobile3g.html';
            break;
		case "ReverseConnectSpan":
            $("#pageframe")[0].contentWindow.location = 'reverse.html';
            break;
		case "ZDWHSpan":
            $("#pageframe")[0].contentWindow.location = 'zdwh.html';
            break;
		case "AlmSoundSpan":
            $("#pageframe")[0].contentWindow.location = 'almsound.html';
            break;
        }
    })

	$("#WINLayoutSelect").change(function(){		
		var cgiurl = "http://" + window.document.location.host + "/web/cgi-bin/hi3510/param.cgi?cmd=setavscfg&-operate=setlayout";

		cgiurl += "&-layout=" + $("#WINLayoutSelect option:selected").val();
		cgiurl += '&-randoma8b9ctime="' + new Date().getTime() + '"';
		
		var curlayout = $("#WINLayoutSelect option:selected").val();  //更新当前布局的状
		
		$.ajax({
			url: cgiurl,
			type: "GET",
			dataType: "text",
			timeout: 3000,
			error: function(data) {
				alert("Change layout Failure!");
			},
			success: function(data) {
				eval(data);				
				if(errcode != "0")  //如果设置失败了还原先前的设置
				{
					alert("Change layout Failure!");
				}
				var curlayout = $("#WINLayoutSelect option:selected").val();  //更新当前布局的状
								
				$("#WINNumSelect option").each(function(index, element) {
					
					if (($(this).val() == "1") || ($(this).val() == "2") || ($(this).val() == "3")|| ($(this).val() == "0") ) 
					{ 
						$(this).remove();
					}
				});	
				
				if((curlayout == "6") ||(curlayout == "0"))
				{											
					$("#WINNumSelect").append("<option value="+0+">"+1+"</option>");	
					
					//设置这个布局的时候默认选择第一个窗口
					var cgiurl = "http://" + window.document.location.host + "/web/cgi-bin/hi3510/param.cgi?cmd=setavscfg&-operate=setwinid";
		
					cgiurl += "&-winid=0";
					cgiurl += '&-randoma8b9ctime="' + new Date().getTime() + '"';
							
					$.ajax({
						url: cgiurl,
						type: "GET",
						dataType: "text",
						timeout: 3000,
						error: function(data) {				
							alert("Windows select Failure!");
						},
						success: function(data) {
							eval(data);
							if(errcode != "0") 
							{
								alert("Windows select Failure!");	
							}	
						},
						async: false
					})										
				}
				else if(curlayout == "7")
				{
					$("#WINNumSelect").append("<option value="+1+">"+2+"</option>");	
					$("#WINNumSelect").append("<option value="+2+">"+3+"</option>");	
					
					//设置这个布局的时候默认选择第2个窗口
					var cgiurl = "http://" + window.document.location.host + "/web/cgi-bin/hi3510/param.cgi?cmd=setavscfg&-operate=setwinid";
		
					cgiurl += "&-winid=1";
					cgiurl += '&-randoma8b9ctime="' + new Date().getTime() + '"';
							
					$.ajax({
						url: cgiurl,
						type: "GET",
						dataType: "text",
						timeout: 3000,
						error: function(data) {				
							alert("Windows select Failure!");
						},
						success: function(data) {
							eval(data);
							if(errcode != "0") 
							{
								alert("Windows select Failure!");	
							}	
						},
						async: false
					})
				}					
														
			},
			async: false
		})					
	})
	
	$("#WINNumSelect").change(function(){		
		var cgiurl = "http://" + window.document.location.host + "/web/cgi-bin/hi3510/param.cgi?cmd=setavscfg&-operate=setwinid";
		
		cgiurl += "&-winid=" + $("#WINNumSelect option:selected").val();
		cgiurl += '&-randoma8b9ctime="' + new Date().getTime() + '"';
				
		$.ajax({
			url: cgiurl,
			type: "GET",
			dataType: "text",
			timeout: 3000,
			error: function(data) {				
				alert("Windows select Failure!");
			},
			success: function(data) {
				eval(data);
				if(errcode != "0")  //如果设置失败了还原先前的设置
				{
					alert("Windows select Failure!");
				}	
			},
			async: false
		})					
	})


    /*******************码流类型选择*******************/
    $("#StreamSelect").change(function() {
        Type = $("#StreamSelect").children('option:selected').val();
        SetPlayStream(Type);
    })
    /*****************为解决resize窗口时，IE多次响应的问题*********************/
    var debounce = function(func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this,
            args = arguments;
            function delayed() {
                if (!execAsap) func.apply(obj, args);
                timeout = null;
            };
            if (timeout) clearTimeout(timeout);
            else if (execAsap) func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }
    /*窗口缩放时的控件处理*/
    window.onresize = debounce(function() {
        return true;
        /*还在登录不处理*/
        if ($("#mainpageLayer").css("display") == "none") return true;

        var BrowserType = GetBrowserVer();
        var ImageSize = parseInt($("#ImageSize").children('option:selected').val());
        if ((ImageSize == 0)) //IE OCX
        {
            PlayerResize(GetPlayerLayerWidthHeight().w, GetPlayerLayerWidthHeight().h);
        }
        /***************调整mainpageLayer大小，让它能同时显示视频和左侧工具栏******************/
        var VideoWH = GetVideoWidthHeight();
        width = parseInt(VideoWH.w) + parseInt($('#LeftToolLayer').css('width'));
        if (width > document.documentElement.clientWidth) {
            width += 10;
            width += 'px';
            $('#mainpageLayer').css('width', width);
            $('#headerLayer').css('width', width);
        } else {
            width = document.documentElement.clientWidth;
            width += 'px';
            $('#mainpageLayer').css('width', width);
            $('#headerLayer').css('width', width);
        }

    },
    100, true);

    /********************登录确认***********************/
    $('#Login').click(function() {

	
        var url = "/cgi-bin/hi3510/checkuser.cgi?";
        url += ("&-name=" + $("#LonginUsername").val());
        url += ("&-passwd=" + $("#LonginPassword").val());
        url += "&-time=" + new Date().getTime();
        $.get(url,
        function(data) {
            eval(data);
            if (check == 1) {
		
                delCookie("username");
                setCookie("username", Base64.encode($("#LonginUsername").val()), 365);
                delCookie("password");
                setCookie("password", Base64.encode($("#LonginPassword").val()), 365);
                delCookie("authLevel");
                setCookie("authLevel", authLevel, 365);

                $("#ContainerLayer").css("display", "block");
                $("#headerLayer").css("display", "block");
                $("#mainpageLayer").css("display", "block");
                $("#LogoutLayer").css("display", "block");
                $("#LoginBgLayer").css("display", "none");

		$("div#OCXCtlLayer").css("top", $("div#headerLayer").offset().top +10);
				

              	var OSType = GetOSType();
				if(OSType=="Windows"){
					$("#OCXCtlLayer").css('display', 'block');
				}
				else{
					$("#OCXCtlLayer").css('display', 'none');
				}

                if (parseInt($("#StreamSelect").children('option:selected').val()) == 11) $("#StreamSelect1").get(0).selectedIndex = 0;
                else $("#StreamSelect1").get(0).selectedIndex = 1;

                if (parseInt(GetPlayMode()) == 0) $("#PlayModeSelect").get(0).selectedIndex = 0;
                else $("#PlayModeSelect").get(0).selectedIndex = 1;

                if(false == StartPlay())
		{
			alert(DownLoadPlayerMsg);
			return 0;
		}
				StartTalk(0);
				SetMute(1);			
            } else {
                $('#LoginBgLayer').css('display', 'block');
                alert(LoginCheckErrorMsg);
            }

        });

    })

    $('#ImageSize').change(function() {
        size = Number($(this).children('option:selected').val());
        switch (size) {
        case 0:
            var PlayerWH = GetPlayerLayerWidthHeight();
            w = PlayerWH.w;
            h = PlayerWH.h;
            break;
        case 1:
            switch (GetPlayStream()) {
            case '11':
                w = w_1;
                h = h_1;
                break;
            case '12':
                w = w_2;
                h = h_2;
                break;
            }
            break;
        }
        PlayerResize(w, h);

        /***************调整mainpageLayer大小，让它能同时显示视频和左侧工具栏******************/
        width = parseInt(w) + parseInt($('#LeftToolLayer').css('width'));
        if (width > document.documentElement.clientWidth) {
            width += 20;
            width += 'px';
            $('#mainpageLayer').css('width', width);
        } else {
            width = document.documentElement.clientWidth;
            width += 'px';
            $('#mainpageLayer').css('width', width);
            /********************如果视频屏幕小于屏幕大学，调整视频区域让它居中显示*******************/
            if ((size == 1) && ((document.documentElement.clientWidth - parseInt($('#LeftToolLayer').css('width')) - 20) > parseInt(w))) {
                left = parseInt((document.documentElement.clientWidth - parseInt($('#LeftToolLayer').css('width')) - 20 - parseInt(w)) / 2);
                $('#DisplayareaLayer').css("margin-left", left + "px");
            } else $('#DisplayareaLayer').css("margin-left", "5px");
        }
    });

    /*************************主页码流或控件重新选择*****************************/
    $('#StreamSelect1,#PlayModeSelect').change(function() {
		if($(this).attr("id") == "StreamSelect1"){
	        SetPlayStream($("#StreamSelect1").children('option:selected').val());			
		}else{
			SetPlayMode($("#PlayModeSelect").children('option:selected').val());	
		}
		
        
        StreamType = parseInt($("#StreamSelect1").children('option:selected').val());
        RePlay(GetPlayerLayerWidthHeight().w, GetPlayerLayerWidthHeight().h);

        /***************调整mainpageLayer大小，让它能同时显示视频和左侧工具栏******************/
        var VideoWH = GetVideoWidthHeight();
        width = parseInt(VideoWH.w) + parseInt($('#LeftToolLayer').css('width'));

        $("#DisplayareaLayer").css("margin-left", "5px");
        if (width > document.documentElement.clientWidth) {
            width += 'px';
            $('#mainpageLayer').css('width', width);
        }
		
		$("#RecordSwitch").css("display", "inline-block");
		$("#RecordIngSwitch").css("display", "none");
		$("#VolOnSwitch").css("display", "none");
		$("#VolOffSwitch").css("display", "inline-block");
		$("#MicroOnSwitch").css("display", "none");
		$("#MicroOffSwitch").css("display", "inline-block");
		
        $("#ImageSize").get(0).selectedIndex = 0;
		 $("#ImageSize").change();
    })



    $('#AutoLogin').click(function() {
        if ($(this).prop("checked") == true) {
            SetAutoLogin(1)
        } else {
            SetAutoLogin(0)
        }

    })

 

    $('#RecordSwitch, #RecordIngSwitch').click(function() {
		ret = Record();
       	
        if (($(this).attr("id") == "RecordSwitch") && (ret == 1)) {
		$("#RecordSwitch").css("display", "none");
		$("#RecordIngSwitch").css("display", "inline-block");
        } else {
		 	$("#RecordSwitch").css("display", "inline-block");
		$("#RecordIngSwitch").css("display", "none");
        }
    })

    $('#CaptureSwitch').click(function() {
        Snap();
    });

    $('#PlaybackSwitch').click(function() {
        PlayBack();
    });

    $('#MicroOnSwitch, #MicroOffSwitch').click(function() {		
        if ($(this).attr("id") == "MicroOnSwitch") {
			ret = StartTalk(1);
			if(ret == true){
				$(this).css("display", "none");
				$("#MicroOffSwitch").css("display", "inline-block");
			}
            
        } else {
			 ret = StartTalk(0);
			 if(ret == true){
			$(this).css("display", "none");
			$("#MicroOnSwitch").css("display", "inline-block");
			 }
        }
    });
    $('#VolOnSwitch, #VolOffSwitch').click(function() {
		
        if ($(this).attr("id") == "VolOffSwitch") {
			 ret = SetMute(0);
			 if(ret == true){
				 $(this).css("display", "none");
				$("#VolOnSwitch").css("display", "inline-block");
			 }
        } else {
			ret = SetMute(1);
			 if(ret == true){
				$(this).css("display", "none");
				$("#VolOffSwitch").css("display", "inline-block");
			 }
        }
    })

  

    /******************登录确认输入*************************/
    $("#LoginLayer").keydown(function(event) {
        if (event.which == 13) //Enter
        $('#Login').click();

    })

    CheckAuth = function() {
        var authLevel = getCookie("authLevel");
        if (authLevel != "255") {
            return false;
        }
        return true;
    }
 
})