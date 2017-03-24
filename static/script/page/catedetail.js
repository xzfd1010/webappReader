$.get('/ajax/catedetail', function(d){
	new Vue({
		el: "#cate",
		data: {
			cate: d.cateitem
		}
	});
}, 'json');