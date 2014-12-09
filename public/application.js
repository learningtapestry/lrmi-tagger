var mathscsvdata="";
var englishcsvdata="";
var csvdata = "";
var onload = "";
var autodata = "";
Papa.parse("./csv/ccss-math-descriptions.csv",{download:true,header:true,
	complete: function(results) {
		console.log("Remote file parsed!", results);
        mathscsvdata = results;
	}})
Papa.parse("./csv/ccss-ela-descriptions.csv",{download:true,header:true,
	complete: function(results) {
		console.log("Remote file parsed!", results);
        englishcsvdata = results;
	}})
$('#alignmentsModal').on('show', function () {
onload = $("#educationalAlignment").find("option:selected").val();
if(onload=="CCSS - English Language Arts")
	{ csvdata = englishcsvdata.data; }
else
	{ csvdata = mathscsvdata.data; }
autodata = $.map(csvdata, function(el) { return el; })
$( "#dotNotation" ).autocomplete({
     source:autodata,
			  focus: function( event, ui ) {

				$( "#dotNotation" ).val( ui.item.DotNotation );
				return false;
			  },
			  select: function( event, ui ) {
				$( "#description" ).val(ui.item.StandardDescription);
				$("#addButton").attr("disabled",false)
				return false;
			  }
    }).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.DotNotation +"</a>" )
        .appendTo( ul );
    };
	
	$("#educationalAlignment").change(function(){
	$( "#dotNotation" ).val("")
	$("#addButton").attr("disabled",true)
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
			  source:autodata,
			  focus: function( event, ui ) {
				$( "#dotNotation" ).val( ui.item.DotNotation );
				return false;
			  },
			  select: function( event, ui ) {
				$( "#description" ).val(ui.item.StandardDescription);
				$("#addButton").attr("disabled",false)
				return false;
			  }
			}).autocomplete( "instance" )._renderItem = function( ul, item ) {
      return $( "<li>" )
        .append( "<a>" + item.DotNotation +"</a>" )
        .appendTo( ul );
    };
	})
})

$(document).on("click",".closetdd",function(){
	var $thisc = $(this);
	$thisc.parent().parent().hide("slow").remove();
	})