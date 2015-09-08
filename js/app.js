/*!
 * =====================================================
 * 嘉悦中心公共函数
 * =====================================================
 */
(function($, doc,jy) {
	//调试函数
	jy.sDug=function(infoArr){
		return JSON.stringify(infoArr);
	}
	//Ajax二次封装
 	jy.dataAjax=function(url,dataArr,callback){
 		var iSwait=dataArr.wait || false;
 		var retry=3;
 		if(!iSwait){
 			var Waiting=plus.nativeUI.showWaiting();
 		}
 		delete dataArr.wait;
// 		console.log(J.sDug(url))
// 		console.log(J.sDug(dataArr))
 		$.ajax(url,{
			data:dataArr,
			dataType:'json',
			type:dataArr.type || "get",//HTTP请求类型
			success:function(data){
				if(!iSwait)Waiting.close();
				callback && callback(data);
			},
			error:function(xhr,type,errorThrown){
				 retry--;
                 if(retry > 0){
                 	if(!iSwait)Waiting.close();
                 	plus.nativeUI.toast('服务器没有反应');
                 	//jy.dataAjax(url,dataArr,callback)
                 }
				//异常处理；
				 console.log('服务器没有反应');
				 //plus.nativeUI.toast('服务器没有反应');
			}
	    })
 	}
 	//Class选择
 	jy.ClassTab=function(el,callback){
 		var _el=doc.getElementsByClassName(el);
			for(var i=0;i<_el.length;i++){
				_el[i].addEventListener("tap",function(e){
					callback && callback(this,e);
				})
			}
 	}
 	//缓存本地图片
 	jy.setImg=function(){}
 	jy.setImg.prototype={
 		isImgBoj:function(imgId,path){
 			 //检查图片是否已存在
 			  var _this=this;
 			  var filename = path.substring(path.lastIndexOf("/") + 1, path.length);
 			  var relativePath="_downloads/" + filename;
                plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
                    _this.imgZip(relativePath,imgId);
                }, function(e) {
                    _this.setImgFromNet(imgId,path)
                });
 		},
 		setImgFromNet:function(imgId,path){
 			var _this=this;
 			var dtask = plus.downloader.createDownload(path, {}, function(d,status) {
				// 下载完成
				if (status == 200) {
					_this.imgZip(d.filename,imgId)
				} else {
                    if (path!=null)_this.delFile(path);
				}  
			});
			dtask.start();
 		},
 		setImgFromLocal:function(imgId,relativePath){
 			 var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
               imgId.setAttribute("src", sd_path);
 		},
 		delFile:function(relativePath){
 			plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
                entry.remove(function(entry) {
                    console.log("文件删除成功==" + relativePath);
                }, function(e) {
                    console.log("文件删除失败=" + relativePath);
                });
            });
 		},
 		imgZip:function(path,imgId){
 			 var _this=this;
 			 plus.zip.compressImage({
					src:path,
					dst:path,
					quality:20,
			        overwrite:true
				},
				function(imgObj) {
					_this.setImgFromLocal(imgId,imgObj.target);//获取压缩后的图片
				},function(error) {
					console.log("Compress error!");
			});
 		}
 	}
 	//判断是Class是否存在
 	jy.hasClass=function(ele,str){
 		return ele.className.match(new RegExp('(\\s|^)'+str+'(\\s|$)')); 
 	}
 	//省市区的取值
 	jy.cityGetText=function(cityData,arr){
 		  var Province = eval(cityData),
 		      cityV=null,
 		      arrCity=arr.split(",");
		  for(var i=0; i<Province.length; i++){
		  	 if(arrCity[0]==Province[i].value){
		  	 	var City= Province[i].children;
		  	 	cityV=Province[i].text+" ";
		  	 	for(var b=0;b<City.length;b++){
		  	 		if(arrCity[1]==City[b].value){
		  	 			var Area=City[b].children;
		  	 	        cityV+=City[b].text+" ";
		  	 	        for(var c=0;c<Area.length;c++){
		  	 	        	if(arrCity[2]==Area[c].value){
		  	 	        		cityV+=Area[c].text;
		  	 	        	}
		  	 	        }
		  	 		}
		  	 	}
		  	 }
		  } 
		  return cityV;
 	}
	//下拉菜单;
	var menuList=[
	 {'url':'reserve.html','title':'卡位预订'},
	 {'url':'makerspace.html','title':'创客空间'},
	 {'url':'main.html','title':'VIP专区'},
	 {'url':'business.html','title':'商管中心'},
	 {'url':'businesssupport.html','title':'创业扶持'},
	 {'url':'park.html','title':'活力园区'}
	]; 
	jy.dwonMenu=function(){
		    var _this=this; 
		    _this.htmlV();  //创建骨架
		    _this.categoryspop=doc.getElementById("categorys-pop"),
	        _this.childenBox=doc.getElementById("childenBox");
	        var boxbg=doc.getElementById("box-bg");
	        _this.time=null;
            boxbg.addEventListener("tap",function(){
	        	_this.close();
	        })
	};
	jy.dwonMenu.prototype={
		init:function(){
		 var _this=this,
		     iSpopDisplay=_this.categoryspop.style.display;
	 	  clearTimeout(_this.time);
	 	  if(iSpopDisplay=='none'){
	 	  	_this.open();
	 	  }else{
 	  		_this.close();
		  }
	 	},
	 	htmlV:function(){
	 		 var div=document.createElement("div");
	 		 div.className='categorys-pop';
	 		 div.id ="categorys-pop";
	 		 div.style.display='none';
	 		 var html='<div class="box-bg" id="box-bg"></div>';
			 	 html+='<div class="box" id="childenBox">';
				 html+='<ul>';
				 for(var i=0;i<menuList.length;i++){
				 	html+='<li class="mui-table-view-cell"><a href="'+menuList[i].url+'" '+(i==2?"isVip='true'":'')+' class="ui-link">'+menuList[i].title+'</a></li>';
				 }
				 html+='</ul>';
				 html+='</div>';
				 html+='</div>';
				 div.innerHTML=html;
				 var uiPage=doc.getElementById("ui-page");
				 uiPage.appendChild(div);
	 	},
	 	close:function(){
	 		 var _this=this;
	 		_this.childenBox.className='box hide';
 	  		_this.childenBox.style.top='-414px';
 	  		_this.time= setTimeout(function(){
	 	  		_this.childenBox.className='box';
	  			_this.categoryspop.style.display="none";;
	 	  	},500)
	 	},
	 	open:function(){
	 		 var _this=this;
	 		_this.categoryspop.style.display="block";
	 	  	_this.time= setTimeout(function(){
	 	  		_this.childenBox.style.top='44px';
	 	  	},30);
	 		
	 	}
	};
    var categorys=doc.getElementById("categorys");
    if(categorys!=null){
	    var menu=new jy.dwonMenu();
	    categorys.addEventListener("tap",function(){
	    	menu.init();
	    })
    }
    //侧滑菜单
    jy.toggleSlideMenu=function(fn2){
    	  var _this=this;
    	  _this.f2=fn2;
    	  var maskchilden=fn2.children[0];
    	  _this.f2childen=fn2.children[1];
    	  _this.f2Calss=_this.f2childen.getAttribute("class");
    	  _this.time;
    	  maskchilden.addEventListener("tap",function(){
    	  	clearTimeout(_this.time);
    	  	_this.close();
    	  	event.stopPropagation();
    	  },false)
    }
    jy.toggleSlideMenu.prototype={
    	init:function(){
		 var _this=this,
		     iSpopDisplay=_this.f2.style.display;
		  clearTimeout(_this.time);
	 	  if(iSpopDisplay=='none'){
	 	  	_this.open();
	 	  }else{
 	  		_this.close();
		  }
	 	},
    	close:function(callback){
	 		 var _this=this;
	 		 _this.f2childen.className=_this.f2Calss+' transitionRe';
    		 _this.time= setTimeout(function(){
		 	     _this.f2childen.className=_this.f2Calss;
		 	     _this.f2.style.display="none";
		 	     callback && callback.call(this);
	 	     },300)
    		 
	 	},
	 	open:function(callback){
	 		 var _this=this;
	 		 _this.f2.style.display="block";
    		 _this.time= setTimeout(function(){
		 	     _this.f2childen.className=_this.f2Calss+' transitionAdd';
		 	     callback && callback.call(this);
	 	     },100)
	 	}
    }
   
$.plusReady(function() {
		jy.bcolor=plus.navigator.getStatusBarBackground();
	    jy.bstyle=plus.navigator.getStatusBarStyle();
		$('.ui-page').on('tap','.ui-link', function(e) {
			var id=this.getAttribute('href'),
			    isVip=this.getAttribute('isVip')=='true'?true:false;
			    effect = this.getAttribute("open-effect") || "pop-in";
			 if(isVip && app.has_login()){
					$.openWindow({
						id: 'main.html',
					    url:'main.html',
						show: {
							autoShow:true,
							aniShow:'pop-in',
							duration:350
						},
						waiting: {
							autoShow: true
						}
					});
			 }else{
			 	if(isVip){
			 		$.openWindow({
						id: 'login.html',
					    url:'login.html',
						show: {
							autoShow:true,
							aniShow:'pop-in',
							duration:350
						},
						waiting: {
							autoShow: true
						}
					});
					app.setisBrak(false);
			 	}else{
				    if(!id)return;//找不到值则不执行
					$.openWindow({
						id: id,
						url: this.href,
						styles:{
							popGesture: "close"
						},
						show:{
					      autoShow:true,//页面loaded事件发生后自动显示，默认为true
					      aniShow:effect,//页面显示动画，默认为”pop-in,slide-in-left,slide-in-right,slide-in-top,slide-in-bottom,zoom-out,zoom-fade-out,fade-in,flip-x,flip-rx,flip-y,flip-ry,page-forward“;
					      duration:300//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
					    },
						waiting: {
							autoShow: true
						}
					});
					
			 	}
			}
			var menu=new jy.dwonMenu();
                menu.close();	
		});
		//返回页面并设置状态栏
		$(".jy-bar").on('tap',".icon-back",function(e) {
			$.back();
			var ws=plus.webview.currentWebview();
			if(ws.id!='information.html'){
				setTimeout(function(){
				   plus.navigator.setStatusBarBackground(jy.bcolor);
				   plus.navigator.setStatusBarStyle(jy.bstyle);
				},0)
			}
		});
	});
    
}(mui, document,window.J={}));
 
 
