module("baidu.dom.addClass");
stop();

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

waiting(function(){ return baidu.selector; }, function(){

	test("给没有className的元素添加", function(){
		// expect(7);
		var div = document.createElement('div');
		document.body.appendChild(div);
		equal(div.className, "", "div no class");
		
		baidu.dom(div).addClass("div_class1");
		equal((div.className), "div_class1", "div class1");

		baidu.dom(div).addClass("div_class2 div_class3");// 添加多个class
		equal((div.className), "div_class1 div_class2 div_class3");

		baidu.dom(div).addClass("div_class1 div_class4");// 重名
		equal((div.className), "div_class1 div_class2 div_class3 div_class4");
		document.body.removeChild(div);
	});

	test("给多个对象添加", function(){
		// expect(7);
		var div = document.createElement('div');
		document.body.appendChild(div);
		
		div.innerHTML = "<div class='A'></div><div class='A'></div><div class='A'></div>";
		
		baidu.dom("div", div).addClass("div_class1");
		equal(formatHTML(div.innerHTML), "<div class=a div_class1></div><div class=a div_class1></div><div class=a div_class1></div>", "div class1");

		document.body.removeChild(div);
	});

	test("参数是一个 fn", function(){
		// expect(7);
		var div = document.createElement('div');
		document.body.appendChild(div);
		
		div.innerHTML = "<div class='A'></div><div class='B'></div><div class='C'></div>";
		
		baidu.dom("div", div).addClass(function(index, className){
		    switch(index){
		        case 0:
		        	ok( className == "A" );
		        	return "c0";
		        	break;
		        case 1:
		        	ok( className == "B" );
		        	return "c1";
		        	break;
		        case 2:
		        	ok( className == "C" );
		        	return "c2";
		        	break;
		    }
		});
		equal(formatHTML(div.innerHTML), "<div class=a c0></div><div class=b c1></div><div class=c c2></div>", "");

		document.body.removeChild(div);
	});

	// 老接口
	test("给没有className的元素添加", function() {
		expect(7);
		var div = document.createElement('div');
		document.body.appendChild(div);
		equal(div.className, "", "div no class");
		baidu.dom.addClass(div, "div_class1");
		equal((div.className), "div_class1", "div class1");
		var addDiv = baidu.dom.addClass(div, "div_class2 div_class3");// 添加多个class
		equal((div.className), "div_class1 div_class2 div_class3");
		equal((div), addDiv, "equal div");// 返回值
		var scDiv = baidu.addClass(div, "div_class4");// 快捷方式
		equal((div.className), "div_class1 div_class2 div_class3 div_class4");
		equal(scDiv, div, "equal div using shortcut");
		// console.log("hi");
		baidu.addClass(div, "div_class1 div_class4");// 重名
		// console.log("hi");
		equal((div.className), "div_class1 div_class2 div_class3 div_class4");
		document.body.removeChild(div);
	});

	test("给有className的元素添加", function() {
		expect(5);
		var div = document.createElement('div');
		document.body.appendChild(div);
		div.className = "orig_class";
		equal(div.className, "orig_class", "original class");
		baidu.dom.addClass(div, "class1");
		equal(div.className, "orig_class class1", "add new class");// 添加1个class
		var scDiv = baidu.dom.addClass(div, "class2 class3");
		equal((div.className), "orig_class class1 class2 class3",
				"add 2 new classes");// 添加2个class
		equal(scDiv, div, "equal div using short cut");
		baidu.addClass(div, "orig_class class2 class3");// 添加3个class orig_class
														// class2 class3
		equal((div.className), "orig_class class1 class2 class3");
		document.body.removeChild(div);
	});

	start();
})

ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback