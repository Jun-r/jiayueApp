(function($,owner) {
 $.plusReady(function() {
	/**
	 * 用户登录
	 **/
	owner.login = function(loginInfo, callback) {
	var loginAppURL=CONFING.Interface.loginApp;
		callback = callback || $.noop;
		loginInfo = loginInfo || {};
		loginInfo.account = loginInfo.account || '';
		loginInfo.password = loginInfo.password || '';
		if (loginInfo.password.length < 6) {
			return callback('密码最短为 6 个字符');
		}
		var dataArr={
				contacts:loginInfo.account,
				password:loginInfo.password
			}
		J.dataAjax(loginAppURL,dataArr,function(data){
			if (data.type=='1') {
				return owner.createState(loginInfo.account,callback,data.data);
			} else {
				return callback('用户名或密码错误');
			}
		})
	};

	owner.createState = function(name, callback,msg) {
		var state = app.getState();
		state.account = name;
		state.token = "token123456789";
		app.setState(state);
		owner.datamsg = msg;
		plus.storage.setItem('$datamsg', JSON.stringify(msg));
		return callback();
	};
    
	/**
	 * 新用户注册
	 **/
	owner.reg = function(regInfo, callback) {
		callback = callback || $.noop;
		regInfo = regInfo || {};
		regInfo.account = regInfo.account || '';
		regInfo.password = regInfo.password || '';
		var postAccountUrl=CONFING.Interface.register;
		if (regInfo.password.length < 6) {
			return callback('密码最短需要 6 个字符');
		}
		var dataArr={
				contacts:regInfo.account,
				password:regInfo.password,
				code:regInfo.code
			}
		J.dataAjax(postAccountUrl,dataArr,function(data){
			return callback(data.msg);
		})
	};
    /**
	 * 发送验证码
	 **/
	owner.getCode = function(codeInfo,callback) {
		callback = callback || $.noop;
		var getcondeUrl=CONFING.Interface.sendCode;
		var dataArr={
				contacts:codeInfo,
			}
		J.dataAjax(getcondeUrl,dataArr,function(data){
			if (data.type==1) {
				var code=data.data;
				plus.nativeUI.alert("你的验证码是:"+code);
				owner.code=code;
			} else {
				return callback(data.msg);
			}
		})
	};
//
//	var checkEmail = function(email) {
//		email = email || '';
//		return (email.length > 3 && email.indexOf('@') > -1);
//	};
//
//	/**
//	 * 找回密码
//	 **/
//	owner.forgetPassword = function(email, callback) {
//		callback = callback || $.noop;
//		if (!checkEmail(email)) {
//			return callback('邮箱地址不合法');
//		}
//		return callback(null, '新的随机密码已经发送到您的邮箱，请查收邮件。');
//	};
//
//	/**
//	 * 获取应用本地配置
//	 **/
//	owner.setSettings = function(settings) {
//		settings = settings || {};
//		plus.storage.setItem('$settings', JSON.stringify(settings));
//	}
//
//	/**
//	 * 设置应用本地配置
//	 **/
//	owner.getSettings = function() {
//		var settingsText = plus.storage.getItem('$settings') || "{}";
//		return JSON.parse(settingsText);
//	}
})
}(mui,window.loginaApp={}));