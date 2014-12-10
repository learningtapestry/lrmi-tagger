var mathscsvdata="";
var englishcsvdata="";
var csvdata = "";
var onload = "";
var autodata = "";
Papa.parse("./csv/ccss-math.csv",{download:true,
	complete: function(results) {
		console.log("ccss-math.csv loaded.");
		mathscsvdata = results;
	}});
Papa.parse("./csv/ccss-ela.csv",{download:true,
	complete: function(results) {
		console.log("ccss-ela.csv loaded.");
		englishcsvdata = results;
	}});

$('#alignmentsModal').on('show', function () {
	onload = $("#educationalAlignment").find("option:selected").val();
	if(onload=="CCSS - English Language Arts")
	{
		csvdata = englishcsvdata.data;
	}
	else{
		csvdata = mathscsvdata.data;
	}
	autodata = $.map(csvdata, function(el) { return el; })
	$( "#dotNotation" ).autocomplete({
		source:autodata
	});

	$("#educationalAlignment").change(function(){
		$( "#dotNotation" ).val("")
		onload = $("#educationalAlignment").find("option:selected").val();
		if(onload=="CCSS - English Language Arts")
		{
			csvdata = englishcsvdata.data;
		}
		else{
			csvdata = mathscsvdata.data;
		}
		autodata = $.map(csvdata, function(el) { return el; })
		$( "#dotNotation" ).autocomplete({
			source:autodata
		});
	})
});

$(document).on("click",".closetdd",function(){
	var $thisc = $(this);
	$thisc.parent().parent().hide("slow").remove();
})

$(function() {
	$('#new_btn').click(function() {
		return window.confirm("Are you sure you would like to tag a new resource?");
	});
});