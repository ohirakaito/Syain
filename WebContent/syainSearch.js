	var getItemSyain = function () {

	var inputItemBusho=$('#depart').val();
	var inputItemId = $('#add_ID').val();
	console.log('社員ID',inputItemId);
	var inputItemName=$('#likeName').val();
	console.log('名前',inputItemName);
	var requestQuery = {
	itemBusho:inputItemBusho,
	itemId : inputItemId,
	itemName:inputItemName
	};
	// サーバーからデータを取得する
	$.ajax({
	type : 'GET',
	dataType:'json',
	url : '/myFirstApp/SyainSearchServlet',
	data : requestQuery,
	success : function(json) {
	// サーバーとの通信に成功した時の処理
	// 確認のために返却値を出力
	console.log('返却値', json);
	// 取得したデータを画面に表示する
	//$('#searchId').html(json.syainNo);
	//$('#searchName').html(json.syainName);
	for(var i=0;i<json.length;i++){
		var item = json[i];
		var tableElement='';
		 tableElement+='<tr>'
						+'<td>'+item.syainNo+'</td>'
						+'<td>'+item.syainName+'</td>'
						+'</tr>'
		$('#bushoSearch').append(tableElement);
	}
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

	$('#js-search-button').click(getItemSyain);
	});