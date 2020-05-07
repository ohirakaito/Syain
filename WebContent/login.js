//var loginRequest="";
var Login=function(){

	var inputUserId = $('#user_Id').val();
	console.log('社員ID',inputUserId);
	var inputPass = $('#Pass').val();
	console.log('パスワード',inputPass);
	var requestQuery = {
			SyainNo:inputUserId,
			Pass : inputPass
			};
	console.log('requestQuery',requestQuery);
$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myFirstApp/LoginServlet',
		data : requestQuery,
		success : function(json) {
			console.log('返却値',json);
			if(json.result==="ok"){
				alert('ログイン成功');
				//loginRequest==="login";
				var url=location.href='/myFirstApp/index.html';
				location.href=url;


			}else {
				alert('ユーザーIDかパスワードが間違っています。');
		}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});

}


var logout=function(){

	var requestQuery = {
			loginRequest:'logout'
	};
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myFirstApp/LoginServlet',
		data : requestQuery,
		success : function(json) {
			console.log("ログアウト済み")

		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}
function getPar(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];

	if(parameter==="logout"){
		logout();
	}
}




/**
 * 読み込み時の動作
 */
$(document).ready(function() {

	getPar();
	$('#login-button').click(Login);
	//$('#login-button').click(Load);
	//GetParameter();

});