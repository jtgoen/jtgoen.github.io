/**
 * Created by John on 11/1/2015.
 */

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