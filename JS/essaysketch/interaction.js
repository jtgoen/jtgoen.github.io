/**
 * Created by John Goen
 * Handles all interactivity with items in the EssaySketch
 */

viewedImages = 0;

//Highlighting the information images on hover, and update the page when both images have been viewed
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

//Highlighting the "next page" images on hover
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

