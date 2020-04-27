/* 商品情報を登録するファンクション */
var registItem2 = function () {
	var inputItemName=$("#add_Name").val();
	var inputItemNo=$('#add_ID').val();
	var inputItemAge=$('#add_Age').val();
	var elements = document.getElementsByName( "gender" ) ;
	for ( var a="", i=elements.length; i--; ) {
		if ( elements[i].checked ) {
			var a = elements[i].value ;
			break ;
		}
	}
	var inputItemGender=a;
	var inputItemPic=$('#pic').val();
	var inputItemPost=$('#post_code').val();
	var inputItemPref=$('#pref_name').val();
	var inputItemAddres=$('#addres').val();
	var inputItemBushoId=$('#busho_Id').val();
	var requestQuery = {
			itemNo:inputItemNo,
			itemName:inputItemName,
			itemAge:inputItemAge,
			itemGender:inputItemGender,
			itemPic:inputItemPic,
			itemPost:inputItemPost,
			itemPref:inputItemPref,
			itemAddres:inputItemAddres,
			itemBusho:inputItemBushoId
	};
	console.log('requestQuery',requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'POST',
		dataType:'json',
		url : '/myFirstApp/SyainAddServlet',
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
	$('#js-register-button').click(registItem2);

});