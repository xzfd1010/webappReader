var id = location.href.split('?id=').pop();
var windowWidth = $(window).width();
if (windowWidth < 320) {
    windowWidth = 320;
}
//zepto的方法，调用接口
$.get('/ajax/book?id=' + id, function (d) {
    new Vue({
        el: '#app',
        data: {
            screen_width: windowWidth,
            item: d.item,
            related: d.related,
            author_books: d.author_books
        },
        methods: {
            //跳转到阅读器的方法
            readBook: function () {
                location.href = "/reader"
            }
        }
    });
}, 'json');