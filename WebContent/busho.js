// AjaxでJSONを取得する
function executeAjax () {
	'use strict';

	// ?以降のパラメータを取得
	// 今回で言うとhttp://localhost:8080/wt1/hobby.html?q=0001でいう0001が取得される


	// --------------- TODO 編集ここから---------------


	$.ajax({
		type : 'GET',
		url : '/myFirstApp/BushoServlet',
		dataType : 'json',
		async: false,
		success : function (json) {
			console.log(json);
			//$('#bushodata').html(json.bushoId );
			//$('#bushodata').html(json.bushoName );


			for(var i=0;i<json.length;i++){
				var busho = json[i];
				var tableElement='';
				 tableElement+='<tr>'
								+'<td>'+busho.bushoId+'</td>'
								+'<td>'+busho.bushoName+'</td>'
								+'<td>'+'<button class="js-henshu" id='+busho.bushoId+' onclick="location.href=\'./bushoAdd.html?itemId='+busho.bushoId+'\'">編集</button>'+'</td>'
								+'<td>'+'<button class="js-delete" id='+busho.bushoId+'>削除</button>'+'</td>'
								+'</tr>'
				$('#bushoData').append(tableElement);
				// $('#'+busho.bushoId).click(DeleteItem(busho.bushoId));
				// onclick="location.href='./bushoAdd.html'"
			}


		}
	});
	// ---------------ここまで---------------

}

$(document).ready(function () {
	'use strict';

	// 初期表示用
	executeAjax();

	// 更新ボタンにイベント設定
	$('.js-delete').click((e)=>DeleteItem($(e.currentTarget).attr('id')));
	$('.js-henshu').click((e)=>ChangeItem($(e.currentTarget).attr('id')));
	$('#searchBtn').bind('click',executeAjax);

});
//削除

function DeleteItem (itemId){
	var requestQuery={itemId:itemId};


	// サーバーにデータを送信する。
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myFirstApp/DeleteBushoServlet',
		data : requestQuery,
		success : function(result) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', result);
			// 登録完了のアラート
			if(result==true){
			alert('削除が完了しました');
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
//編集


/**
 * 読み込み時の動作
 */
/*$(document).ready(function() {
	// 登録ボタンを押したときのイベント
	$('.js-delete').click(deleteItem());

});*/