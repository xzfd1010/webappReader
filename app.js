var koa = require('koa');
//koa中间件de
var controller = require('koa-route');
var app = new koa();//需要new
//渲染模板
var views = require('co-views');
var render = views('./view', {//view是存放路径
	map: {html: 'ejs'}//模板引擎
});
//集成静态资源,中间件需要配置
var koa_static = require('koa-static-server');
app.use(koa_static({
	rootDir: './static/',//整个静态资源的目录
	rootPath: '/s',//URL上面的路径,即我们访问的目录，上面那个是查找静态资源的位置
	maxage: 0//指定缓存，因为静态文件有缓存周期，要指定过期时间，设置时间为0即不缓存

}));
var service = require('./service/webAppService.js');//引用的不是中间件，而是

app.use(controller.get('/route_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = 'hello koa from Sally!';
}));

app.use(controller.get('/ejs_test', function*(){//用来写页面的demo
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test', {title: 'title_test'});//generator语言特性，异步回调，在es6里面,而promise是一种设计模式
}));

 
app.use(controller.get('/api_test', function*(){//'/api_test'叫做路由，其实就是代表你去访问的时候的路径组成
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data();
}));

app.use(controller.get('/', function*(){//不用任何路由，默认访问到首页
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index', {title: '书城首页'});//generator语言特性，异步回调，在es6里面,而promise是一种设计模式
}));

app.use(controller.get('/search', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('search', {title: '搜索'});
}));

app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category', {title: '分类'});
}));

app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank', {title: '排行'});
}));

app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male', {title: '男榜'});
}));

app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female', {title: '女榜'});
}));

var querystring = require('querystring');
app.use(controller.get('/book', function*(){
	this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
	this.body = yield render('book', {bookId: bookId});
}));



//任务代码
app.use(controller.get('/ajax/search', function*(){
	this.set('Cache-Control', 'no-cache');
	var querystring = require('querystring');
	var _this = this;
	var params = querystring.parse(this.req._parsedUrl.query);//将HTTPquerystring转化为obj形式
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
	this.body = yield service.get_search_data(start, end, keyword);//因为异步返回，所以前面想要yield
}));

app.use(controller.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));

app.use(controller.get('/ajax/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));

app.use(controller.get('/ajax/bookbacket', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_bookbacket_data();
}));

app.use(controller.get('/ajax/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_female_data();
}));

app.use(controller.get('/ajax/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_male_data();
}));
//书籍比较不一样，有id参数
app.use(controller.get('/ajax/book', function*(){
	this.set('Cache-Control', 'no-cache');
	var querystring = require('querystring');
	var params = querystring.parse(this.req._parsedUrl.query);//将HTTPquerystring转化为obj形式
    var id = params.id;
    if(!id) {
    	id = "";//先给空的，到了下一层，就有给18218
    }
	this.body = service.get_book_data(id);
}));

app.listen(3005);
console.log("Koa server is started!");