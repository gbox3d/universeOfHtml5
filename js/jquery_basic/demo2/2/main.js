/**
 * @author 이 석준
 */

var dataMap = [{
	'img' : 'http://ukga.web-bi.net/test/gimin/1.png',
	'name' : '곽지민',
	'id' : 0
}, {
	'img' : 'http://ukga.web-bi.net/test/gimin/2.png',
	'name' : '곽지민',
	'id' : 1
}, {
	'img' : 'http://ukga.web-bi.net/test/gimin/3.png',
	'name' : '곽지민',
	'id' : 2
}, {
	'img' : 'http://ukga.web-bi.net/test/gimin/4.png',
	'name' : '곽지민',
	'id' : 3
}, {
	'img' : 'http://ukga.web-bi.net/test/gimin/5.png',
	'name' : '곽지민',
	'id' : 4
}];

function listview_init() {
	$('#container').load('listview.html #container', function() {
		for(var i = 0; i < dataMap.length; i++) {
			var entry = $('#entryTemplate').clone();
			entry.removeAttr('id');
			entry.removeAttr('style');
			entry.appendTo('ul');
			entry.data('index', i);
			entry.find('img').attr('src', dataMap[i].img);
			entry.find('.lable').text(dataMap[i].name);

			entry.click(function() {
				//디테일뷰 세팅
				//var strimg = dataMap[$('li').index(this)-1].img;
				//console.log($(this).data('index'));
				var strimg = dataMap[$(this).data('index')].img

				$('#container').load('detailview.html #container', function() {
					$('#mainimg').attr('src', strimg);
					$('#header .backbutton').click(listview_init);
				});
			});
		}

	});
}

