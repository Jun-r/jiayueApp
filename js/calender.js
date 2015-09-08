/**
 * 日历组件
 * @param selector selector
 * @param options 配置参数
 */
var calendar = function(selector,options){
    var defaults = {
            months : ["1月", "2月", "3月", "4月", "5月", "6月",
                "7月", "8月", "9月", "10月", "11月", "12月"],
            days : ["日", "一", "二", "三", "四", "五", "六"],
            swipeable : true,//是否可通过手指滑动
            date : new Date(),//日历当前日期
            onRenderDay : undefined,//渲染单元格时的事件
            onSelect : undefined //选中日期时的事件
        },
        _this = this,
        $el = document.getElementById(selector),
        $yearText,
        $monthText,
        $Body,
        currentDate,currentYear,currentMonth;

    var _init = function(){
        _this.settings = mui.extend({},defaults,options);
        currentYear = _this.settings.date.getFullYear();
        currentMonth = _this.settings.date.getMonth();
        currentDate = new Date(currentYear,currentMonth,_this.settings.date.getDate());
        _render();
        _subscribeEvents();
    }

    /**
     * 获取月份第一天是星期几[0-6]
     */
    var _fisrtDayOfMonth = function(date){
        return ( new Date(date.getFullYear(), date.getMonth(), 1) ).getDay();
    }
    /**
     * 获取月份总天数[1-31]
     */
    var _daysInMonth = function(date){
        return ( new Date(date.getFullYear(),date.getMonth()+1,0) ).getDate();
    }

    /**
     * 渲染日历
     * @private
     */
    var _render = function(){
        var html = '';
        html += '<div class="eims-calendar">';
        html += _renderNav(currentYear,currentMonth);
        html += '<div class="eims-calendar-body">';
        html += '<table>';
        html += _renderHead();
        html += '<tbody class="calendar-body">';
        html += _renderBody(currentDate);
        html += '</tbody>';
        html += '</table>';
        html += '</div></div>';
        $el.innerHTML=html;
        $monthText = $el.querySelector('span.month');
        $calendarBody = $el.querySelector('.calendar-body');
    }

    var _renderNav = function(year,month){
        var html = '<div class="eims-calendar-nav">';
        html += '<span class="month">'+_this.settings.months[month]+'</span><i class="icon icon-arrow-right next" data-month='+month+'></i>';
        html += '</div>';
        return html;
    }

    var _renderHead = function(){
        var html = '<thead>';
        for(var i = 0; i < 7; i++){
            html += '<th class=\'thead\'>'+_this.settings.days[i]+'</th>';
        }
         html += '</thead>';
        return html;
    }

    var _renderBody = function(date){
        var firstDay = _fisrtDayOfMonth(date),
            days = _daysInMonth(date),
            rows = Math.ceil((firstDay+days) / 7),
            beginDate,
            html = '';
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();
        beginDate = new Date(currentYear,currentMonth,1-firstDay);//日历开始的日期
        for(var i = 0; i < rows; i++){
            html += '<tr>';
            for(var j = 0; j < 7; j++){
                html += _renderDay(beginDate,currentMonth);
                beginDate.setDate(beginDate.getDate() + 1);
            }
            html += '</tr>';
        }
        return html;
    }
    var _renderDay = function(date,month){
        var otherMonth = (date.getMonth() !== month);
        var preMonth=(date.getMonth()-1 !== month);
        var dateStr = _this.format(date);
        var isday=_this.format(_this.settings.date) == dateStr;
        var dataMonth=_this.settings.date.getMonth();
        var classname = isday ? 'active':'';
        var dayStr = date.getDate();
        var preMonthdayStr;
        if(_this.settings.onRenderDay){
//      	 if(dataMonth==date.getMonth()){
//          	dayStr='<span>'+dayStr+'</span>';
//           }
             dateStr=otherMonth?'':dateStr;
             dayStr = _this.settings.onRenderDay.call(null,isday,dayStr,dateStr);
         }
    
        return otherMonth?'<td><em>&nbsp;</em></td>':'<td class="'+classname+ '" data-time="'+dateStr+'">'+dayStr+'</td>';
    }

    var _subscribeEvents = function(){
        var $target,$ctarget;
        var $monthspan = $el.querySelector('.eims-calendar-nav');
        var $month=$el.querySelector('.month')
        $el.addEventListener('tap',function(e){
            $target = e.target;
            if($target.tagName=='SPAN'){
                var dateStr = $target.parentNode.getAttribute('data-time');
                if(dateStr && _this.settings.onSelect){
                    _this.settings.onSelect.call(_this,$target,dateStr)
                }
            }

        });
        var menuSlide=document.getElementById("menuSlide");
        var sildeMenu= new J.toggleSlideMenu(menuSlide);
        var menuContent=document.getElementById("menuContent");
        var months=_this.settings.months;
        for(var i=0;i < months.length;i++){
        	var html='<a href="javascript:;" class="tap-active" data-months="'+(i+1)+'">'+months[i]+'</a>';
        	var li = document.createElement('li');
				li.className = 'mui-table-view-cell';
				li.innerHTML =html;
				menuContent.appendChild(li);
        }
		$monthspan.addEventListener("tap",function(){
		    sildeMenu.init();
		})
		mui("#menuContent").on("tap",".tap-active",function(){
			var m=this.getAttribute("data-months");
			var monthInt=parseInt(m);
            currentDate.setMonth(monthInt-1);
            _this.refresh(currentDate);
            var calendarbox=document.getElementById("calendar");
	        var scrollwp=document.getElementById("scroll-wp");
		    scrollwp.style.height=window.screen.availHeight-calendarbox.clientHeight-167+"px";
        	sildeMenu.close();
        })
    }

    /**
     * 刷新日历为指定日期
     * @param date 指定日期
     */
    this.refresh = function(date){
        var oldDate = new Date(currentYear,currentMonth,1),
            newDate = new Date(date.getFullYear(),date.getMonth(),1),
            transition = undefined,$table;
        if(oldDate.getTime() == newDate.getTime())return;
        $monthText.innerText=this.settings.months[date.getMonth()];
        var newbody = _renderBody(date);
        $calendarBody.innerHTML=newbody;
        var calendarbox=document.getElementById("calendar-box");
        
    }
    _init();
    return {
    	calendarBody:$calendarBody
    }
}
/**
 * 字符串转化为日期对象，只支持yyyy-MM-dd 和 yyyy/MM/dd
 * @param date
 * @return {*}
 */
calendar.prototype.parse = function(date){
    var dateRE = /^(\d{4})(?:\-|\/)(\d{1,2})(?:\-|\/)(\d{1,2})$/;
    return dateRE.test(date) ? new Date(parseInt(RegExp.$1, 10), parseInt(RegExp.$2, 10) - 1, parseInt(RegExp.$3, 10)) : null;
}
/**
 * 格式化日期  yyyy-MM-dd
 * @return {String}
 */
calendar.prototype.format = function(date){
    var y  = date.getFullYear(),m = date.getMonth()+1,d = date.getDate();
    m = (m<10)?('0'+m):m;
    d = (d<10)?('0'+d):d;
    return y + '-' + m + '-' + d;
}
