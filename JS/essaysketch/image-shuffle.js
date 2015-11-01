/**
 * Created by John Goen
 * Used by the Empathy webpage to be dynamic with which path the user took prior, be it Nonlinearity or Clarity.
 */

//Need to set the proper image as the first displayed image to connect from the path in which the user took previously.
$( document ).ready(function() {
    if (document.referrer.substr(document.referrer.lastIndexOf('/') + 1) === "essaysketch_nonlinearity.html") {
        $("#syntax").addClass("hidden");
        $("#hb").removeClass("hidden");
    }
    else {
        $("#syntax").removeClass("hidden");
        $("#hb").addClass("hidden");
    }
});

//Need to swap images avter they are viewed
$(".image")
    .click(function() {
        if ($("#syntax").hasClass("hidden")) {
            $("#syntax").removeClass("hidden");
            $("#hb").addClass("hidden");
        }
        else {
            $("#syntax").addClass("hidden");
            $("#hb").removeClass("hidden");
        }
    });