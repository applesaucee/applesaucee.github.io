//Coded by Tamanh Nguyen

"use strict";

var seatsRemaining = 30;
var totalPresale;
var goldstar;
var vbo;
var comps;

$('#sell').click(sellTicket);
$('#refund').click(refundTicket);
$('#presales').click(calcPresales);

function sellTicket() {
    seatsRemaining = seatsRemaining - 1;
    $('#seats').text(seatsRemaining);
    $('#refund').removeAttr("disabled");
    
    if (seatsRemaining === 0) {
        $('#sell').attr("disabled", "disabled");
    }
}

function refundTicket() {
    if (seatsRemaining < 30) {
        seatsRemaining = seatsRemaining + 1;
        $('#seats').text(seatsRemaining);
        $('#sell').removeAttr("disabled");
        if (seatsRemaining === 30) {
            $('#refund').attr("disabled", "disabled");
        }
    }
}

//Enables calculate button again. Changes alert styling.
function resetValues() {
    seatsRemaining = 30;
    $('#preMessage').text("The number of presales exceeds our seating capacity. Try again!");
    $('#preMessage').removeClass("alert-info");
    $('#preMessage').removeClass("alert-danger");
    $('#preMessage').addClass("alert-warning");
    $('#presales').removeAttr("disabled");
}

//Check to see if all presale values are empty;
function checkPresales() {
    return (($('#goldstar').val()) === "") && (($('#vbo').val()) === "") && (($('#comps').val()) === "");
}

//Sums total of presale tickets and subtracts it from the total seats (tickets) remaining. Prevents presale values that exceed 69 (our max occupancy). Prevents calculate button from disabling if there are no presale values inputted. Changes alert styling.
function calcPresales() {
    if (checkPresales()) { //Presales are empty
        $('#preMessage').text("Looks like you didn't input any presale values. Try again!");
        $('#preMessage').removeClass("alert-warning");
        $('#preMessage').removeClass("alert-info");
        $('#preMessage').addClass("alert-danger");
    } else { //Presales are not empty
        totalPresale = Number($('#goldstar').val()) + Number($('#vbo').val()) + Number($('#comps').val());
        if (totalPresale > 30) {
            resetValues();
        } else { 
            $('#preMessage').text("Presales calculated! Good luck out there!");
            $('#preMessage').removeClass("alert-info");
            $('#preMessage').removeClass("alert-danger");
            $('#preMessage').removeClass("alert-warning");
            $('#preMessage').addClass("alert-success");
            seatsRemaining = seatsRemaining - totalPresale;
            $('#seats').text(seatsRemaining);
            $('#refund').removeAttr("disabled");
            $('#presales').attr("disabled", "disabled");
            if (seatsRemaining === 0) {
                $('#sell').attr("disabled", "disabled");
            }
        }
    }
}