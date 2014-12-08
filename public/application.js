var mathscsvdata="";
var englishcsvdata="";
var csvdata = "";
var onload = "";
var autodata = "";
Papa.parse("./csv/ccss-math.csv",{download:true,
	complete: function(results) {
		console.log("Remote file parsed!", results);
        mathscsvdata = results;
	}})
Papa.parse("./csv/ccss-ela.csv",{download:true,
	complete: function(results) {
		console.log("Remote file parsed!", results);
        englishcsvdata = results;
	}})
$(document).ready(function(){

	$("#url").blur(function() {
		url_input = $("#url").val();
		if (url_input.match("(\b(https?|ftp|file)://)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"))
			$('#iframe').attr('src', url_input);
	});
});
$('#alignmentsModal').on('show', function () {
//alert("show")
onload = $("#educationalAlignment").find("option:selected").val();
if(onload=="CCSS - English Language Arts")
	{ csvdata = englishcsvdata.data; }
else
	{ csvdata = mathscsvdata.data; }
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
})