/* 商品情報を登録するファンクション */
var Login = function () {
	var inputItemId=$('#user_Id').val();
	var inputItemPass=$('#Pass').val();
	var requestQuery = {
			itemId:inputItemId,
			itemPass:inputItemPass
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myFirstApp/LoginServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			alert('ログインが完了しました');
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}






/**
 * 読み込み時の動作
 */
$(document).ready(function() {

	$('#login-button').click(Login);
	//GetParameter();

});