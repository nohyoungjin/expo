function setDatepicker(inputID, buttonID, dateType) {
	var textBoxID = "#" + inputID;
	var _dateType = "yy-mm-dd";
	if(dateType) {_dateType = dateType;}
	jQuery(textBoxID).datepicker({
		showMonthAfterYear : true
		,yearSuffix : '년'
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
		,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
		,dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] // 요일의 한글 형식.
		,dateFormat: _dateType
		,prevText: '이전 달'
		,nextText: '다음 달'
	});
	jQuery(textBoxID).css("cursor","pointer");
	if(buttonID) {
		jQuery("#" + buttonID).css("cursor","pointer");
		jQuery("#" + buttonID).click(function() {
			jQuery(textBoxID).datepicker("show");
			return false;
		});
	}
}

function setDateTimepicker(inputID, buttonID) {
	var textBoxID = "#" + inputID;
	jQuery(textBoxID).datetimepicker({
		showMonthAfterYear : true
		,yearSuffix : '년'
		,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
		,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
		,dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'] // 요일의 한글 형식.
		,prevText: '이전 달'
		,nextText: '다음 달'
		,dateFormat: 'yy-mm-dd'
		,timeFormat: 'HH:mm'
	//	,stepMinute: 10
		,hourGrid: 4
		,minuteGrid: 10
	});
	jQuery(textBoxID).css("cursor","pointer");
	if(buttonID) {
		jQuery("#" + buttonID).css("cursor","pointer");
		jQuery("#" + buttonID).click(function() {
			jQuery(textBoxID).datetimepicker("show");
			return false;
		});
	}
}

function setDatepickerByMonth(inputID, buttonID) {
	var textBoxID = "#" + inputID;

	jQuery(textBoxID).datepicker(datepickerMonthOption);
	jQuery(textBoxID).css("cursor", "pointer");
	if(buttonID) {
		jQuery("#" + buttonID).css("cursor","pointer");
		jQuery("#" + buttonID).click(function() {
			jQuery(textBoxID).datepicker("show");
			return false;
		});
	}
}

var datepickerMonthOption = {
	dateFormat: 'yy-mm'
	,prevText: '이전 달'
	,nextText: '다음 달'
	,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
	,monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] // 월의 한글 형식.
	,dayNames: ['일','월','화','수','목','금','토']
	,dayNamesShort: ['일','월','화','수','목','금','토']
	,dayNamesMin: ['일','월','화','수','목','금','토']
	,showMonthAfterYear: true
	,currentText: "이번달"
	,changeMonth: true
	,changeYear: true
	,showButtonPanel: true
	,yearRange: '2000:c+99'
	,showOtherMonths: true
	,selectOtherMonths: true
	,closeText: "선택"
	,minDate : new Date(2000, 01-1)
	,maxDate : new Date(2099, 12-1)
};

datepickerMonthOption.onClose = function (dateText, inst) {
	var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
	var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
	$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
	$(this).datepicker('setDate', new Date(year, month, 1));
};

datepickerMonthOption.beforeShow = function () {
	if($.trim($(this).val()) != '') {
		var selectDate = $.trim($(this).val());
		var year = Number(selectDate.substring(0, 4));
		var month = Number(selectDate.substring(5, 7)) - 1;
		$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		$(this).val( selectDate );
	}
};

var console = window.console || {log:function() {}}

function dateStringParse(dateAsString) {
	return new Date(dateAsString.replace(/-/g, '/'));
}

// 글자수 제한
(function($) {
 $.fn.extend( {
     limiter: function(limit, elem) {
         $(this).on("keyup focus", function() {
             setCount(this, elem);
         });
         function setCount(src, elem) {
             var chars = src.value.length;
             if (chars > limit) {
                 src.value = src.value.substr(0, limit);
                 chars = limit;
                 alert(limit + "자 까지 입력 가능합니다.");
             }
             // elem.html( limit - chars );
         }
         setCount($(this)[0], elem);
     }
 });
})(jQuery);

// trim 처리
function setDataByTrim() {
	// #contents div 하부의 모든 input:text
	$("div[id='contents']").find("input[type=text]").each(function() {
		$(this).val( $.trim($(this).val()) );

		if($(this).val() == $(this).attr("title")) {
			$(this).val('');
		}
	});
}

// logout
function actionLogout() {
	if(confirm("로그아웃하시겠습니까?")) {
		location.href = "/login/actionLogout.do";
	}
}

//숫자만 입력
function onlyNumber(obj) {
	$(obj).keyup(function() {
		$(this).val($(this).val().replace(/[^0-9]/g,""));
	});
}

// 달력(Datepicker)의 날짜형식(yyyy-MM) 체크
function isDatetimeYYYYMM(txtDate) {
	var result = true;

	if( txtDate == '' || txtDate.length != 7 ) {
		return false;
	}

	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])$/;

	if( !date_pattern.test(txtDate) ) {
		result = false;
	}

	// 월 체크
	var year = Number(txtDate.substring(0, 4));
	var month = Number(txtDate.substring(5, 7));

	if( month<1 || month>12 ) {
		return false;
	}

	return result;
}

// 달력(Datepicker)의 날짜형식(yyyy-MM-dd)/(yyyy/MM/dd) 체크
function isDatetimeYYYYMMDD(txtDate, dateType) {
	var result = true;
	var _dateType = "yy-mm-dd";
	if(dateType) {_dateType = dateType;}

	if( txtDate == '' || txtDate.length != 10 ) {
		return false;
	}

	var date_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/;
	if( dateType == 'yy/mm/dd' ) date_pattern = /^(19|20)\d{2}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[0-1])$/;

	if( !date_pattern.test(txtDate) ) {
		result = false;
	}

	// 월,일,윤달 체크
	var year = Number(txtDate.substring(0, 4));
	var month = Number(txtDate.substring(5, 7));
	var day = Number(txtDate.substring(8, 10));

	if( month<1 || month>12 ) {
		return false;
	}

	var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var maxDay = maxDaysInMonth[month-1];

	// 윤년 체크
	if( month == 2 && (year%4 ==0 && year%100 !=0 || year%400 == 0) ) {
		maxDay = 29;
	}

	if( day<=0 || day>maxDay ) {
		return false;
	}

	return result;
}

// 달력(DateTimepicker)의 날짜 및 시간형식 체크
function isDatetimeYYYYMMDDHH24MI(txtDateTime) {
	var result = true;

	if( txtDateTime == '' || txtDateTime.length != 16 ) {
		return false;
	}

	var datetime_pattern = /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1]) (2[0-3]|[01][0-9]):[0-5][0-9]$/;

	if( !datetime_pattern.test(txtDateTime) ) {
		result = false;
	}

	// 월,일,윤달 체크
	var year = Number(txtDateTime.substring(0, 4));
	var month = Number(txtDateTime.substring(5, 7));
	var day = Number(txtDateTime.substring(8, 10));
	var hour = Number(txtDateTime.substring(11, 13));
	var minute = Number(txtDateTime.substring(14, 16));

	if( month<1 || month>12 ) {
		return false;
	}

	if( hour>23 ) {
		return false;
	}

	if( minute>59 ) {
		return false;
	}

	var maxDaysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var maxDay = maxDaysInMonth[month-1];

	// 윤년 체크
	if( month == 2 && (year%4 ==0 && year%100 !=0 || year%400 == 0) ) {
		maxDay = 29;
	}

	if( day<=0 || day>maxDay ) {
		return false;
	}

	return result;
}

// ck에디터에 'src="data:image/png;base64,' 식으로 IE에서 이미지가 붙여넣기 되었는지
var DATA_IMAGE_BASE64 = /src=\"data:image\/([a-zA-Z]*);base64,([^\"]*)\"/i;
function isDataImageURL(str) {
	var isChecked = true;

	// textarea에 값이 없으면 false
	if( $.trim(str).length < 1 ) {
		isChecked = false;
	}

	if( isChecked ) {
		// ck에디터에 'src="data:image/png;base64,' 문자열이 있으면 true
		isChecked = (new RegExp(DATA_IMAGE_BASE64)).test(str);
	}

	return isChecked;
}

if (typeof String.prototype.startsWith != 'function') {
	String.prototype.startsWith = function (str) {
		return this.match(new RegExp("^" + str));
	};
}

// 유튜브 URL 형식 체크
function isYoutubeUrl(youtubeUrl) {
	var result = true;

	if( youtubeUrl == '' ) {
		return false;
	}

	var url_pattern = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;

	if( !url_pattern.test(youtubeUrl) ) {
		result = false;
	}

	return result;
}

// 도메인 url 형태를 검증한다. http/s 옵셔널 파라미터 가능 맞을경우 true, 아닐경우 false
function isUrlType(str) {
	var result = true;

	if( str == '' ) {
		return false;
	}

	var regex = /^(((http(s?))\:\/\/)?)([0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,6}(\:[0-9]+)?(\/\S*)?/;

	if( !regex.test(str) ) {
		result = false;
	}

	return result;
}

// IE에서 indexOf오류 방지용
if(!Array.indexOf) {
	Array.prototype.indexOf = function(obj) {
		for(var i=0; i<this.length; i++) {
			if(this[i]==obj) {
				return i;
			}
		}
		return -1;
	}
}

// 모바일접속 여부 확인 (true, false)
function isMobile() {
	if(navigator.userAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson|ipad|tablet/i) != null || navigator.userAgent.match(/LG|SAMSUNG|Samsung/) != null) {
		return true;
	} else {
		return false;
	}
}

/* progress 화면 띄우기 */
function showProgress(message) {
	$("#modalLayerText").empty();

	if(message) {
		$("#modalLayerText").text(message);
	} else {
		$("#modalLayerText").text('처리중입니다.');
	}
	$("#modalLayerCont").css("top", ($(window).height() - 80)/2);
    $("#modalLayerCont").css("left", ($(window).width() - 500)/2);
	$("#modalLayer").show();
}

/* progress 화면 숨기기 */
function hideProgress() {
	$("#modalLayer").hide();
}
