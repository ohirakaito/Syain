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
	var element = document.getElementById( "pref_name" ) ;
	var elements = element.options ;
	for ( var a="", i=0,l=elements.length; l>i; i++ ) {
		if ( elements[i].selected ) {
			a += elements[i].value + " " ;
		}
	}
	var inputItemPref=a;
	var inputItemAddres=$('#addres').val();
	var inputItemBushoName=$('#depart').val();
	var requestQuery = {
			itemNo:inputItemNo,
			itemName:inputItemName,
			itemAge:inputItemAge,
			itemGender:inputItemGender,
			itemPic:inputItemPic,
			itemPost:inputItemPost,
			itemPref:inputItemPref,
			itemAddres:inputItemAddres,
			itemBushoName:inputItemBushoName
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

function ChangeItem (){
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
	var element = document.getElementById( "pref_name" ) ;
	var elements = element.options ;
	for ( var a="", i=0,l=elements.length; l>i; i++ ) {
		if ( elements[i].selected ) {
			a += elements[i].value + " " ;
		}
	}
	var inputItemPref=a;
	var inputItemAddres=$('#addres').val();
	var inputItemBushoName=$('#depart').val();
	var requestQuery = {
			itemNo:inputItemNo,
			itemName:inputItemName,
			itemAge:inputItemAge,
			itemGender:inputItemGender,
			itemPic:inputItemPic,
			itemPost:inputItemPost,
			itemPref:inputItemPref,
			itemAddres:inputItemAddres,
			itemBushoName:inputItemBushoName
	};

	console.log(requestQuery);
	// サーバーにデータを送信する。
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myFirstApp/ChangeSyainServlet',
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
	$('#add-button').html('<button id="register-button" onclick="registItem2()">設定</button>')
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
	//$('#js-register-button').click(registItem2);
	GetParameter();

});