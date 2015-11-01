/**
 * Created by John on 11/1/2015.
 */

viewedImages = 0;

//Highlighting the information images on hover
$(".information")
    .mouseenter(function() {
        $(this).addClass('hover');
    })
    .mouseleave(function() {
        $(this).removeClass('hover');
    })
    .click(function() {
        if ( !($(this).hasClass('viewed'))) {
            $(this).addClass('viewed');
            viewedImages += 1;
            console.log(viewedImages);
            if (viewedImages == 2){
                updateConcept();
                $('.page-link').removeClass('hidden');
            }
        }
    });

function updateConcept() {
    var text = $('.concept').text();
    var newText = "";
    $('.concept').addClass('conceptShow');
}

