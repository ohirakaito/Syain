
var registItem = function () {
	var inputItemId=$('#ID').val();
	var inputItemYmd=$('#YMD').val();
	var inputItemName=$('#Name').val();
	var inputItemTitle=$('#Title').val();
	var inputItemPay=$('#Pay').val();
	var inputItemMoney=$('#Money').val();
	var inputItemUpYmd=$('#upYmd').val();
	var inputItemUpName=$('#upName').val();
	var inputItemStates=$('#States').val();
	var inputItemReason=$('#Reason').val();
	var requestQuery = {
			itemId:inputItemId,
			itemYmd:inputItemYmd,
			itemName: inputItemName,
			itemTitle:inputItemTitle,
			itemPay:inputItemPay,
			itemMoney:inputItemMoney,
			itemUpYmd:inputItemUpYmd,
			itemUpName:inputItemUpName,
			itemStates: inputItemStates,
			itemReason:inputItemReason
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myFirstApp/KeihiAddServlet',
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

	$('#js-register').click(registItem);


});