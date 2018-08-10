//扩展Response过滤器
Ext.Ajax.ResponseWrapper = {
	deserializeResponse : function(options, response, config) {
		if(response.status){
			if(response.getResponseHeader){
				if(response.getResponseHeader('LoginPage')!=undefined){
					window.location.reload();
					return;
				}
			}else{
				if(response.status==0 ||response.status==401){
					window.location.reload();
					return;
				}
			}
		}else{
				if(response.responseXML!=undefined && response.responseXML.URL !=undefined && response.responseXML.URL.indexOf("/sam/")>0){
					window.location.reload();
					return;
				}
			}
	}
}
//js获取项目根路径，如： http://localhost:8083/uimcardprj
function getRootPath(){
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName);
}
