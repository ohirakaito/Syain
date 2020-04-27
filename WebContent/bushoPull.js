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
		success : function (json) {
			console.log(json);
			for(var i=0;i<json.length;i++){
				 // selectタグを取得する
				 var select = document.getElementById("depart");
				 // optionタグを作成する
				 var option = document.createElement("option");

				 option.text = json[i].bushoName;

				 option.value =json[i].bushoName;
				 // selectタグの子要素にoptionタグを追加する
				 select.appendChild(option);


			}

		}
	});

}
$(document).ready(function() {
	// 登録ボタンを押したときのイベント
	executeAjax();

});