/*!
 * =====================================================
 * 嘉悦中心全局配置项目 http://192.168.3.63:8080
 * =====================================================
 */

(function($, owner, cfg) {
	 cfg.httpUrl='http://d2.java.shovesoft.com';                //网站域名配置
	 cfg.server="http://www.dcloud.io/check/update";            //获取升级描述文件服务器地址
	 cfg.Interface={
	 	payApp:cfg.httpUrl+'/jy/onlinePayments.do',             //支付宝接口
	 	loginApp:cfg.httpUrl+'/jy/loginApp.do',                 //登录接口
	 	indexBanner:cfg.httpUrl+'/jy/indexBannerApp.do',         //首页Banner接口
	 	updateuserinfo:cfg.httpUrl+'/jy/updateuserinfoApp.do',  //个人资料修改接口
	 	appImgUpload:cfg.httpUrl+'/jy/appImgUpload.do',         //图像上传接口
	 	sendCode:cfg.httpUrl+'/jy/sendCodeApp.do',              //验证码获取接口
	 	register:cfg.httpUrl+'/jy/registerApp.do',              //注册接口
	 	scrList:cfg.httpUrl+'/jy/scrListApp.do',                //卡位列表接口
	 	exhList:cfg.httpUrl+'/jy/exhListApp.do',                //展厅列表接口
	 	meRoomList:cfg.httpUrl+'/jy/meRoomListApp.do',          //会议室列表接口
	 	scrWhe:cfg.httpUrl+'/jy/scrWheApp.do',                  //卡位楼栋查询
	 	scrSecondWhe:cfg.httpUrl+'/jy/scrWheSecondApp.do',      //卡位楼栋一级查询
	 	exhWhe:cfg.httpUrl+'/jy/exhWheApp.do',                  //展厅楼栋一级查询
	 	exhWheSecond:cfg.httpUrl+'/jy/exhWheSecondApp.do',      //展厅楼栋二级查询
	 	exhWheThird:cfg.httpUrl+'/jy/exhWheThirdApp.do',        //展厅楼栋三级查询
	 	meRoomWhe:cfg.httpUrl+'/jy/meRoomWheApp.do',            //会议室楼栋一级查询
	 	meRoomWheSecond:cfg.httpUrl+'/jy/meRoomWheSecondApp.do',//会议室楼栋二级查询
	 	meRoomWheThird:cfg.httpUrl+'/jy/meRoomWheThirdApp.do',  //会议室楼栋三级查询
	 	meRoomDetailsLoad:cfg.httpUrl+'/jy/meRoomDetailsLoadApp.do', //会议室初始化
	 	meRoomSub:cfg.httpUrl+'/jy/meRoomSubApp.do',            //会议室提交
	 	scrDetails:cfg.httpUrl+'/jy/scrDetailsApp.do',          //卡位详情查询
	 	exhDetails:cfg.httpUrl+'/jy/exhDetailsApp.do',          //展厅详情查询
	 	exhDetailsLoad:cfg.httpUrl+'/jy/exhDetailsLoadApp.do',  //展厅预订加载
	 	meRoomDetails:cfg.httpUrl+'/jy/meRoomDetailsApp.do',    //会议室详情查询
	 	zoneIntroduce:cfg.httpUrl+'/jy/zoneIntroduceApp.do',    //创课空间介绍
	 	resultList:cfg.httpUrl+'/jy/resultListApp.do',          //创课成果列表
	 	companyList:cfg.httpUrl+'/jy/companyListApp.do',        //创意前沿列表
	 	resultDetailst:cfg.httpUrl+'/jy/resultDetailst.do',     //创课成果详情
	 	companyHelpType:cfg.httpUrl+'/jy/companyHelpTypeApp.do',//创业扶持类型
	 	companyHelp:cfg.httpUrl+'/jy/companyHelpApp.do',        //创业扶持内容
	 	serveApply:cfg.httpUrl+'/jy/serveApplyApp.do',          //申请服务
	 	auth:cfg.httpUrl+'/jy/authApp.do',                      //企业认证、公司性质、行业
	 	updateauth:cfg.httpUrl+'/jy/updateauthApp.do',          //修改企业认证
	 	companyDetails:cfg.httpUrl+'/jy/companyDetailsApp.do',  //创意企业详情
	 	resultDetails:cfg.httpUrl+'/jy/resultDetailsApp.do',    //孵化结果详情
	 	userActivity:cfg.httpUrl+'/jy/userActivityApp.do',      //我的活动列表
	 	userApply:cfg.httpUrl+'/jy/userApplyApp.do',            //我的申请列表
	 	survey:cfg.httpUrl+'/jy/surveyApp.do',                  //满意度调查
	 	userMessage:cfg.httpUrl+'/jy/userMessageApp.do',        //系统通知列表
	 	userMessageD:cfg.httpUrl+'/jy/userMessageDetailsApp.do',//系统通知详情
	 	gardenList:cfg.httpUrl+'/jy/gardenListApp.do',          //园区活动列表
	 	gardenDetails:cfg.httpUrl+'/jy/gardenDetailsApp.do',    //园区活动详情
	 	activityList:cfg.httpUrl+'/jy/activityListApp.do',      //活动风采列表
	 	gardenDetails:cfg.httpUrl+'/jy/gardenDetailsApp.do',    //活动风采详情
	 	gardenIntroduce:cfg.httpUrl+'/jy/gardenIntroduceApp.do',//园区介绍
	 	noticeList:cfg.httpUrl+'/jy/noticeListApp.do',          //通知列表
	 	noticeDetails:cfg.httpUrl+'/jy/noticeDetailsApp.do',    //通知详情
	 	contact:cfg.httpUrl+'/jy/contactApp.do',                //联系我们
	 	gardenApply:cfg.httpUrl+'/jy/gardenApplyApp.do',        //活动申请
	 	reservation:cfg.httpUrl+'/jy/reservationApp.do',        //我的预定
	 	hatchApply:cfg.httpUrl+'/jy/hatchApplyApp.do',          //孵化申请
	 	myApplyDetail:cfg.httpUrl+'/jy/myApplyDetail.do',       //我的申请详情
	 	reservation:cfg.httpUrl+'/jy/reservationApp.do',        //我的预订
	 	bBAApplyApp:cfg.httpUrl+'/jy/bBAApplyApp.do',           //商业招租申请
	 	bBAWheApp:cfg.httpUrl+'/jy/bBAWheApp.do',               //商业招租查询列表
	 	bBplatformApp:cfg.httpUrl+'/jy/bBplatformApp.do',       //商管中心的平台
	 	storeDetails:cfg.httpUrl+'/jy/storeDetailsApp.do',      //商业招租详情  
	 	czsqInit:cfg.httpUrl+'/jy/czsqInit.do',                 //出租介绍
	 	yyptAppList:cfg.httpUrl+'/jy/yyptAppList.do',           //平台介绍
	 	hzptAppInit:cfg.httpUrl+'/jy/hzptAppInit.do',           //合作平台初始化
	 	addHzptApp:cfg.httpUrl+'/jy/addHzptApp.do',             //合作平台信息提交
	 	addCzsq:cfg.httpUrl+'/jy/addCzsq.do',                   //出租申请提交
	 	hzptAppSubInit:cfg.httpUrl+'/jy/hzptAppSubInit.do',     //伙伴认证初始化
	 	hzptAppSub:cfg.httpUrl+'/jy/hzptAppSub.do',             //伙伴认证提交
	 	scrDetailsLoadInit:cfg.httpUrl+'/jy/scrDetailsLoadInitApp.do', //卡位预订加载 
	 	scrDetailsLoadApp:cfg.httpUrl+'/jy/scrDetailsLoadApp.do'//卡位预订状态
	 }
	 $.plusReady(function() {
		 /**
		 * 获取当前状态
		 **/
		owner.getState = function() {
			var stateText = plus.storage.getItem('$state') || "{}";
			return JSON.parse(stateText);
		};
		
		/**
		 * 获取当前状态返回数据
		 **/
		owner.getStateDate = function() {
			var stateText = plus.storage.getItem('$datamsg') || "{}";
			return JSON.parse(stateText);
		};
		/**
		 * 获取当前登录跳转判断
		 **/
		owner.getisBrak = function() {
			var isBrak = plus.storage.getItem('isBrak') || "false";
			return JSON.parse(isBrak);;
		};
		/**
	     *检查是否已登录
	     **/
		owner.has_login = function(){
			var state = owner.getState();
		    var token = state.token;
		    if(!token){
		        return false;
		    }
		    return true;
		};
		/**
		 * 设置当前登录跳转判断
		 **/
		owner.setisBrak = function(state) {
			plus.storage.setItem('isBrak', JSON.stringify(state));
		};
		/**
		 * 设置当前状态
		 **/
		owner.setState = function(state) {
			state = state || {};
			plus.storage.setItem('$state', JSON.stringify(state));
		};
		/**
		 * 设置当前状态返回数据
		 **/
		owner.setStateDate = function(state) {
			state = state || {};
			plus.storage.setItem('$datamsg', JSON.stringify(state));
		};
	});
}(mui, window.app={},window.CONFING={}));
