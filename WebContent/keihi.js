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

function executeAjax () {
	'use strict';

	$.ajax({
		type : 'GET',
		url : '/myFirstApp/KeihiServlet',
		dataType : 'json',
		async: false,
		success : function (json) {
			console.log(json);
			if(userRole==="manager"){
			for(var i=0;i<json.length;i++){
				var keihi = json[i];
				var tableElement='';
				 tableElement+='<tr>'
								+'<td>'+keihi.keihiNo+'</td>'
								+'<td>'+keihi.keihiYmd+'</td>'
								+'<td>'+keihi.name+'</td>'+'<td>'+keihi.title+'</td>'+'<td>'+keihi.pay+'</td>'
								+'<td>'+keihi.money+'</td>'+'<td>'+keihi.updateYmd+'</td>'+'<td>'+keihi.updateName+'</td>'
								+'<td>'+keihi.states+'</td>'+'<td>'+keihi.reason+'</td>'
								+'<td>'+'<button class="js-shosai" id='+keihi.keihiId+' onclick="location.href=\'keihiShosai.html'+'\'">詳細</button>'+'</td>'
								+'</tr>'

				$('#keihiData').append(tableElement);
			}
			}
			else if(userRole==="member"){
				for(var i=0;i<json.length;i++){
					if(userName===json[i].name){
					var keihi = json[i];
					var tableElement='';
					 tableElement+='<tr>'
									+'<td>'+keihi.keihiNo+'</td>'
									+'<td>'+keihi.keihiYmd+'</td>'
									+'<td>'+keihi.name+'</td>'+'<td>'+keihi.title+'</td>'+'<td>'+keihi.pay+'</td>'
									+'<td>'+keihi.money+'</td>'+'<td>'+keihi.updateYmd+'</td>'+'<td>'+keihi.updateName+'</td>'
									+'<td>'+keihi.states+'</td>'+'<td>'+keihi.reason+'</td>'
									+'<td>'+'<button class="js-shosai" id='+keihi.keihiId+' onclick="location.href=\'keihiShosai.html'+'\'">詳細</button>'+'</td>'
									+'</tr>'

					$('#keihiData').append(tableElement);
					}
				}
				}



		}
	});
	// ---------------ここまで---------------

}

$(document).ready(function () {
	'use strict';

	// 初期表示用
	// executeAjax();
	getLoginInf ();

	// $('#searchBtn').bind('click',getLoginInf ());

});