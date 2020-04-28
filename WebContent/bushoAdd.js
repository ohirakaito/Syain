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

function ChangeItem (){
	var inputItemName=$('#add_Name').val();
	var inputItemId=$('#add_ID').val();
	var requestQuery = {
			itemId:inputItemId,
			itemName:inputItemName
	};

	console.log(requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myFirstApp/ChangeBushoServlet',
		data : requestQuery,
		success : function(result) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', result);
			// 登録完了のアラート
			if(result==true){
			alert('編集が完了しました');
			}
			else if(result==false){
				alert('NG');
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			// サーバーとの通信に失敗した時の処理
			alert('データの通信に失敗しました');
			console.log(errorThrown)
		}
	});
}


function GetParameter(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];

	if(!parameter){
	$('#add-button').html('<button id="register-button" onclick="registItem()">設定</button>')
		console.log('ない')
	}else{
	$('#add-button').html('<button id="change-button" onclick="ChangeItem()">編集</button>')
		console.log('ある')
	}
}

/**
 * 読み込み時の動作
 */
$(document).ready(function() {
	// 登録ボタンを押したときのイベント
	//$('#js-register').click(registItem);
	GetParameter();

});