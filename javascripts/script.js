var save = JSON.stringify({}),
	totalDrags = totalDrops = 11,//incase number of dragabbles are equal to number of dropppables, otherwise declare it as you wish.
	currentDraggable,
	isOut = true;


var configDraggableObj={
	containment: '#container',
	revert:'invalid',
	scroll:false,
	drag:function(event,ui){
		$(ui.draggable).removeClass('dropped');

	},
	start:function(event,ui){
		currentDraggable=removeCustomClasses($(this));
		resetIcoFeed();
	},
	stop:function(event,ui){
		var tar=$(this);
		if(!tar.hasClass('dropped')){
			resetElem(tar);
		}
		currentDraggable=null;
	}
}

$(document).ready(function(){
	$(document).bind(
		'touchmove',
		function(e) {
			e.preventDefault();
		}
	);
	drawContent();
	startInterativity();
});

//+ Jonas Raoni Soares Silva
//@ http://jsfromhell.com/array/shuffle [v1.0]
function shuffle(o){ //v1.0
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	return o;
};

function drawContent(){
	var dropContent = '',
	dropContentTemp ='',
	placehInfoContent = '',
	placehFormulasContent = '',
	dragInfoArray = [],
	dragFormulasArray = [],
	r = [];
	for (var i = 0; i < totalDrops; i++) {
	        dropContent +='<div class="drop-holder" style="background:url(images/expresion'+(i+1)+'@2x.png);background-size:cover;">';
		dropContent +='<div id="drop-formula'+i+'" class="drop drop-formula"></div>';
		dropContent +='</div>';
		
		placehInfoContent += '<div class="placeholder placeh-info"></div>';
//		placehFormulasContent += '<div class="placeholder placeh-formula"></div>';

		//dragInfoArray.push('<div id="drag-info'+i+'" class="drag drag-info" style="background-image: url(images/plans'+(i+1)+'.png)"></div>');
		dragFormulasArray.push('<div id="drag-formula'+i+'" class="formula1 drag drag-formula" style="background-image: url(images/card'+(i+1)+'@2x.png)"></div>');

	};

	console.log(';lalala',dragFormulasArray.length)
	//dragInfoArray = shuffle(dragInfoArray);
	dragFormulasArray = shuffle(dragFormulasArray);
	$('.left-content').html(dropContent);
//	$('.placeholder-bg').html(placehInfoContent).append(placehFormulasContent);
	$('.drag-content').html(dragInfoArray.join('')).append(dragFormulasArray.join(''));
	console.log(dragFormulasArray.length)
       
}

function startInterativity(){
	console.log('startInteractivity')
	console.log($('.drag-formula').length)
	$('.drag-info').draggable(configDraggableObj)
	$('.drag-formula').draggable(configDraggableObj);

	makeItDroppable($('.drop-info'),'.drag-info');
	makeItDroppable($('.drop-formula'),'.drag-formula');
	console.log($('.drop-info'))

	$('#zoom').on('show', function () {
		$('body').addClass('hack');
	});

	$('#zoom').on('hidden', function () {
		$('body').removeClass('hack');
	});
	//zoom by adding the same image but biggest in modal html
	$('.zoomit').doubletap(function(event){doubleCLickFn(event);});
	//zoom by changin it's html to a clone from the original and return it! 
	$('.zoomit-custom').doubletap(function(event){doubleCLickFnCustom(event);});
}

function resetElem (tar){
	return removeCustomClasses($(tar))
	.draggable('destroy')
	.css({
		position: 'auto',
		top: 'auto',
		left: 'auto'
	})
	.draggable(configDraggableObj)
}

function removeCustomClasses(tar,addThis){
	addThis=!addThis?'':addThis;
	$('.drop').each(function(index,value){
		tar.removeClass($(value).attr('id'));
	});

	return tar
	.removeClass('out in dropped')
	.addClass(addThis);
}

function makeItDroppable(tar,acceptClass){
	return tar.droppable({
		accept:acceptClass,
		tolerance:'pointer',
		drop: function(event, ui) {
			var par=$(this);
			var className=par.attr('id');
			var prev=$('.'+className);
			if(prev.length>0){
				resetElem(prev[0]);
			}

			$(ui.draggable).offset(par.offset()).draggable('option','revert',false).addClass(className+' dropped');
			completeDrag();
			//add temporary out function
		},
	});
}
function doubleCLickFnCustom(event){
	event.preventDefault();
	$('#zoom').on('show.bs.modal', function (e) {
		$('.zoom-img').html($(event.target).clone());
		$('#zoom').off('show.bs.modal');
	})
	var tar=event.currentTarget;
	$('#zoom').on('hide.bs.modal', function (e) {
		$(tar).html('').html($('.zoom-img').clone());
		$('#zoom').off('hide.bs.modal');
	})
	$('#zoom').modal();
}

function doubleCLickFn(event){
	event.preventDefault();
	$('.zoom-img').css('backgroundImage', $(event.target).css('backgroundImage').replace('.png','big.png')).html('');
	$('#zoom').modal();
}

function resetState(){
	$('.drag').each(function(){
		resetElem($(this));
	})
}

function fetchCallBack(state){
	if(state){
		currentObjt=JSON.parse(state);
		startApp(currentObjt);
	}else{

	}
}

function saveCallBack(){
	//************ important part ******************/
	// this object must have this structure
	// @type:'state'
	// @data: json string reprsenting the current state
	currentObjt = cSave();

	var message = {
		type : 'state',
		data : JSON.stringify(currentObjt)
	};

	//return whatever you need.
	return message;
}

function finishCallBack(){
	return {};
}

function cSave(){
	i = -1;
	c =  $('#container').html()
	var obj ={
		container:c
	}
	return obj;
}

function startApp(currentObjt){
	$('#container').html(currentObjt.container);
	startInterativity();
	feedBackButtons();
}

$('.drag-elem').on('mousedown touchstart', function(event){
	event.preventDefault();
	$('.scoreContent').fadeOut();
});
