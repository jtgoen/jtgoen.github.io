/**
 * Created by John Goen
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

$(".page-link")
    .mouseenter(function() {
        if ($(this).attr("src") === "IMAGES/essaysketch/return.png") {
            $(this).attr("src", "IMAGES/essaysketch/return_hl.png");
        }
        else if ($(this).attr("src") === "IMAGES/essaysketch/fold_upperright.png") {
            $(this).attr("src", "IMAGES/essaysketch/fold_upperright_hl.png");
        }
        else {
            $(this).attr("src", "IMAGES/essaysketch/fold_bottomright_hl.png");
            console.log($(this).attr("src"));
        }
    })
    .mouseleave(function() {
        if ($(this).attr("src") === "IMAGES/essaysketch/return_hl.png") {
            $(this).attr("src", "IMAGES/essaysketch/return_hl.png");
        }
        else if ($(this).attr("src") === "IMAGES/essaysketch/fold_upperright_hl.png") {
            $(this).attr("src", "IMAGES/essaysketch/fold_upperright.png");
        }
        else {
            $(this).attr("src", "IMAGES/essaysketch/fold_bottomright.png");
            console.log($(this).attr("src"));
        }
    });

function updateConcept() {
    var text = $('.concept').text();
    var newText = "";
    $('.concept').addClass('conceptShow');
}

