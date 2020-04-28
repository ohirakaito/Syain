function GetParameter(){
	var parameter  = location.search.substring( 1, location.search.length );
	parameter = decodeURIComponent( parameter );
	parameter = parameter.split('=')[1];
}


function ChangeItem (){

	var requestQuery = {
			parameter:itemNo
	};

	console.log(requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myFirstApp/EditSyainServlet',
		data : requestQuery,
		success : function(result) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', result);
			$('#add_ID').html(json.itemNo);
			$('#add_Name').html(json.itemName);
			$('#add_Age').html(json.itemAge);
			$('#pic').html(json.itemPic);
			$('#pref_name').html(json.itemPref);
			$('#addres').html(json.itemAddres);
			$('#depart').html(json.itemBushoName);
			// 登録完了のアラート
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
	$('#itemNo').click(ChangeItem());
	GetParameter();

});