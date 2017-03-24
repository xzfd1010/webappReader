$.get('/ajax/check', function(d){
	new Vue({
		el: "#checkapp",
		data: {
			check: d.check_item
		}
	});
}, 'json');