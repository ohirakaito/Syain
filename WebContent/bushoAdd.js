/* 商品情報を登録するファンクション */
var registItem = function () {
	var inputItemName=$('#add_Name').val();
	var inputItemId=$('#add_ID').val();
	var requestQuery = {
			itemId:inputItemId,
			itemName:inputItemName
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myFirstApp/BushoAddServlet',
		data : requestQuery,
		success : function(json) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', json);
			// 登録完了のアラート
			alert('登録が完了しました');
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
	// 登録ボタンを押したときのイベント
	$('#js-register').click(registItem);

});