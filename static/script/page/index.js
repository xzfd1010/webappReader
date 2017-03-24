//连通界面和后端数据接口
$.get('/ajax/index', function(d){
	var windowWidth = $(window).width();
	if (windowWidth < 320) {
		windowWidth = 320;
	}
	var offset = $($('.Swipe-tab').find('a')[0]).offset();
	var index_header_tab_width = offset.width;
	new Vue({
		el: '#app',
		data: {
			screen_width: windowWidth,
			double_screen_width: windowWidth*2,
			index_header_tab_width: index_header_tab_width,
			top: d.items[0].data.data,
			hot: d.items[1].data.data,
			recommend: d.items[2].data.data,
			female: d.items[3].data.data,
			male: d.items[4].data.data,
			free: d.items[5].data.data,
			topic: d.items[6].data.data,
			duration:0,
			position: 0,
			header_position: 0,
			header_duration: 0,
			tab_1_class: 'Swiper-tab__on',
			tab_2_class: '',
			first_female_index: 0,
			last_female_index: 5,
			first_male_index: 0,
			last_male_index: 5,
		},
		methods: {
			tabSwitch: function(pos) {
				this.duration = 0.5;
				this.header_duration = 0.5;
				if (pos == 0) {
					this.position = 0;
					this.header_position = 0;
					this.tab_1_class = "Swiper-tab__on";
					this.tab_2_class = "";
				} else {
					this.position = (-windowWidth);
					this.header_position = index_header_tab_width;
					this.tab_2_class = "Swiper-tab__on";
					this.tab_1_class = "";
				}
			},
			femaleSwitch: function() {
				this.first_female_index += 5;
				this.last_female_index += 5;
				if(this.first_female_index > 10) {
					this.first_female_index = 0;
					this.last_female_index = 5;
				}
			},
			maleSwitch: function() {
				this.first_male_index += 5;
				this.last_male_index += 5;
				if(this.first_male_index > 10) {
					this.first_male_index = 0;
					this.last_male_index = 5;
				}
			}
		}
	});
}, 'json');
//Swiper
 var mySwiper = new Swiper ('.swiper-container', {
    autoplay: 3000,
    loop: true
  });

  $(".shelf__switch").click(function(){
  	alert("11");
  });       