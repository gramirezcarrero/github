iModalObj = {
    _content:"Instructional overlay placeholder imth-a-7-14-3-expressioncards",
    _image: ""
}

var _iModalTemplate ="<div class='_back _backClose'></div><div class='_iModalBack'><div class='Center_iModal'><div class=' AbsoluteCenter_iModal'><div class='_iModalHeader'><div class='icoInfo'></div><div class='icoClose'>×</div></div><div class='_iModalBody'></div></div></div></div>";

var _iModalBody

if(iModalObj._image.length > 0){
    _iModalBody ="<p>"+iModalObj._content+"</p><img src='"+iModalObj._image+"'/>";
}else{
    _iModalBody ="<p>"+iModalObj._content+"</p>";
}

var $iModal;

$(document).ready(function(){
    $("#instructions-audio").jPlayer( {
      ready: function () {
        //$(this).jPlayer("setMedia", {mp3: "audio/instructions.mp3"}).jPlayer("play");
      }
    });

    feedBackButtons();
    iModal();
    $("#instructions-audio").jPlayer("play");
});

function iModal(){
    $('body').addClass('hack');
    $('body').append(_iModalTemplate);
    $_back = $("._back");

    var n=setTimeout(function(){
        toggleClassButton($_back,'_backClose')
        $iModal = $('._iModalBack');
        $iModal.find('._iModalBody').append(_iModalBody)
        $iModal.css({"display":"block"});
        var m=setTimeout(function(){
            toggleClassButton($('.AbsoluteCenter_iModal'),'AbsoluteCenter_iModalAnimate')
        },200)
        $('.icoClose').on('click',function(){
            $("#instructions-audio").jPlayer("stop");
            $('body').removeClass('hack');

            $iModal.remove();

            $iModal.css({"display":"block"})
            toggleClassButton($_back,'_backClose').get(0).addEventListener("webkitTransitionEnd", function() {
                $_back.remove()
            }, true);

        });
        // close modal clicking anywhere
        // $iModal.on('click',function(){
        //     $("#instructions-audio").jPlayer("stop");
        //     $('body').removeClass('hack');
        //     $iModal.remove();            
        //     $iModal.css({"display":"block"})
        //     toggleClassButton($_back,'_backClose').get(0).addEventListener("webkitTransitionEnd", function() {
        //         $_back.remove()
        //     }, true);

        // });
        $('._iModalBody img').on('click',function(){
         //   $("#instructions-audio").jPlayer("stop").jPlayer("play");
        });
    },200);
}

function feedBackButtons(){

    $(".icoInfo").off('click').on('click',function (event) {
        event.preventDefault();
        event.stopPropagation();
        iModal();
    })

    $(".icoReset").off('click').on('click',function (event) {
        event.preventDefault();
        event.stopPropagation();
        var current=$(this);
        current.removeClass('icoResetMove');
        var to=setTimeout(function(){
            clearInterval(to);
            current.addClass('icoResetMove');
        },200)
        resetState();
        resetIcoFeed();
    });

}

function resetIcoFeed(){
    $('.icoFeed').removeClass('icoFeedMove').off('click');
    $('.score').hide();
}

function iconFeedFunction(){
    $(".icoFeed").off('click');
    $(".icoFeed").on('click',function(event){
        event.preventDefault();
        event.stopPropagation();
        checkAnswers();
        $('.score').toggle("showAnim");
    })
}

function completeDrag(){
    console.log('completeDrag');
    if ($('.drag.dropped').length == $('.drop').length) {
        iconFeedFunction();
        $(".icoFeed").addClass('icoFeedMove');
    };
}

function checkAnswers(){
    var correct = 0,
        incorrect = $('.drop').length;

    $('.drop').each(function(index,value){
        var dropid = $(value).attr('id'),
            dragid = $('.'+dropid).attr('id');

        if (dropid.replace(/[^\d.]/g,'') == dragid.replace(/[^\d.]/g,'')) {
            correct += 1;
        };

    });

    $('#contCorrect').text(correct).append('<img src="images/base/IconCorrect.png">');
    $('#contIncorrect').text(incorrect-correct).append('<img src="images/base/IconIncorrect.png">');
}

function toggleClassButton(element,className){
    var currentButton=element;
    if(!currentButton.hasClass(className)){
        currentButton.addClass(className);
    }else{
        currentButton.removeClass(className);
    }
    return element;
}
