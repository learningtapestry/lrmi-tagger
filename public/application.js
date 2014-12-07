$(document).ready(function(){

	$("#url").blur(function() {
	  $('#iframe').attr('src', $("#url").val())
	});
$( "#mainContentTopRight" ).tabs();
});

