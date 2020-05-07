var userRole;
var userName;
var userId;

function getLoginInf () {
	'use strict';

	$.ajax({
		type : 'GET',
		url : '/myFirstApp/LoginServlet',
		dataType : 'json',
		async: false,
		success : function (json) {
			console.log(json);


			if(!json.SyainNo){
				location.href='login.html'
			}else{
				userRole=json.ROLE;
				userName=json.SyainName
				userId=json.SyainNo
				executeAjax ();
			}
		}
	});
}


/**
 *
 */// AjaxでJSONを取得する
function executeAjax () {
	'use strict';

	// ?以降のパラメータを取得
	// 今回で言うとhttp://localhost:8080/wt1/hobby.html?q=0001でいう0001が取得される


	// --------------- TODO 編集ここから---------------


	$.ajax({
		type : 'GET',
		url : '/myFirstApp/SyainServlet',
		dataType : 'json',
		async: false,
		success : function (json) {
			console.log(json);


			if(userRole==="manager"){
			for(var i=0;i<json.length;i++){
				var tableElement='';
				var syain = json[i];
				 tableElement+='<tr>'
								+'<td>'+syain.syainNo+'</td>'
								+'<td>'+syain.syainName+'</td>'
								+'<td>'+'<button class="js-henshu" id='+syain.syainNo+' onclick="location.href=\'./syainAdd.html?itemNo='+syain.syainNo+'\'">編集</button>'+'</td>'
								+'<td>'+'<button class="js-delete-button" id='+syain.syainNo+'>削除</button>'+'</td>'
								+'</tr>'
				var button='';
				 button='<button onclick="location.href=\'syainAdd.html'+'\'">新規追加</button>'
						+'<button onclick="location.href=\'syainSearch.html'+'\'">検索</button>'
				$('#syainData').append(tableElement);
				 $('#button').html(button);
			}
			}
			else if(userRole==="member"){
				for(var i=0;i<json.length;i++){
					var tableElement='';
					var syain = json[i];
					 tableElement+='<tr>'
							+'<td>'+syain.syainNo+'</td>'
							+'<td>'+syain.syainName+'</td>'

					if(syain.syainNo===userId){
						 tableElement+='<td><button class="js-henshu" id='+syain.syainNo+' onclick="location.href=\'./syainAdd.html?itemNo='+syain.syainNo+'\'">編集</button></td>'
					}
					 $('#syainData').append(tableElement);
				}
				}
			}
});

}


$(document).ready(function () {
	'use strict';


	//executeAjax();
	getLoginInf ();

	$('.js-delete-button').click((e)=>DeleteItem($(e.currentTarget).attr('id')));
	$('.js-henshu').click((e)=>ChangeItem($(e.currentTarget).attr('id')));
	//$('#searchBtn').bind('click',getLoginInf ());

});

function DeleteItem (itemId){
	var requestQuery={itemId:itemId};


	// サーバーにデータを送信する。
	$.ajax({
		type : 'GET',
		dataType:'json',
		url : '/myFirstApp/DeleteSyainServlet',
		data : requestQuery,
		success : function(result) {
			// サーバーとの通信に成功した時の処理
			// 確認のために返却値を出力
			console.log('返却値', result);
			// 登録完了のアラート
			if(result==true){
			alert('削除が完了しました');
			location.reload();
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


/**
 * 読み込み時の動作
 */
