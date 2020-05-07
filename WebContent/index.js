function getLoginInf () {
	'use strict';

	$.ajax({
		type : 'GET',
		url : '/myFirstApp/LoginServlet',
		dataType : 'json',
		async: false,
		success : function (json) {
			console.log(json);
			var tableElement='';
			 tableElement='<p>'+json.SyainName+'さん'+'あなたの役職は「'+json.ROLE+'」です。'+'</p>'
			$('#syain').html(tableElement);

		}
	});
}

$(document).ready(function () {
	'use strict';

	getLoginInf ();

});