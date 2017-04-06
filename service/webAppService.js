//这个文件里面的数据是打通mock到前端的过程，读取文件，这个用node去写
var fs = require('fs');
//把方法暴露出去
exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content;
};

//首页
exports.get_index_data = function(){
    //获取home.json中的数据
	var content = fs.readFileSync('./mock/home.json', 'utf-8');
	return content;
};
//章节数据
exports.get_chapter_data = function(){
    var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
    return content;
};
//排行
exports.get_rank_data = function(){
    var content = fs.readFileSync('./mock/rank.json', 'utf-8');
    return content;
};
//分类
exports.get_category_data = function(){
    var content = fs.readFileSync('./mock/category.json', 'utf-8');
    return content;
};

exports.get_bookbacket_data = function(){
    var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8');
    return content;
};
//频道页（女性页）
exports.get_female_data = function(){
    var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
    return content;
};
//频道页（男性页）
exports.get_male_data = function(){
    var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
    return content;
};

//book比较不一样，需要根据id去取
exports.get_book_data = function(id) {
    //因为此项目只有2本书，所以要容错
    if (!id) {
        id = "18218";
    }
    if(fs.existsSync('./mock/book/' + id + '.json')){
        return fs.readFileSync('./mock/book/' + id + '.json', 'utf-8');
    }else{
        return fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
};

//获取每一节数据
exports.get_chapter_content_data = function(id){
    if(!id) {
        id = "1";
    }
    var content = fs.readFileSync('./mock/reader/data/data' + id + '.json', 'utf-8');
    return content;
}

exports.get_search_data = function(start, end, keyword){//异步HTTP接口，如果直接返回会有问题，所以要返回一个异步函数
	return function(cb){
		var http = require('http');//node自带模块
		var qs = require('querystring');//对搜索关键字,把object变成查询参数
        var data = {
        	s: keyword,
        	start: start,
        	end: end
        };
        var content = qs.stringify(data);
        var http_request = {
        	hostname: 'dushu.xiaomi.com',
        	port: 80,
        	path: '/store/v0/lib/query/onebox?' + content,//接口路由位置,
            method:'GET'
        };
        req_obj = http.request(http_request,function(_res){
            var content = '';
            _res.setEncoding('utf-8');
            _res.on('data', function(chunk){//接收到数据时，chunk是后端返回的一部分数据，需要进行拼接
                content += chunk;
            });
            _res.on('end', function(){
            	cb(null, content);
            });
        });
        req_obj.on('error', function(){//on表示监听

        });
        req_obj.end();
	}
};