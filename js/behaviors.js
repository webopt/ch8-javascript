$(function(){
	$("html").removeClass("page-loading");

	function openModal(){
		window.scroll(0, 0);
		$(".pageFade").removeClass("hide");
		$(".modal").addClass("open");
	}

	function closeModal(){
		$(".modal").removeClass("open");
		$(".pageFade").addClass("hide");
		$(".statusModal").removeClass("show");
		$("body").removeClass("locked");
	}

	// Scheduling modal open
	$("#schedule").bind("click", function(){
		$("body").addClass("locked");
		openModal();
	});

	// Modal close via click
	$(".closeModal, .pageFade").bind("click", function(){
		closeModal();
	});

	// Appointment submit behavior
	$(".submitAppointment a").bind("click", function(){
		var formData = {
			name: $("#name").val(),
			address: $("#address").val(),
			phone: $("#phone").val(),
			alternatePhone: $("#alternatePhone").val(),
			email: $("#email").val(),
			problem: $("#problem").val(),
			preferredTime: $("#preferredTime").val()
		};

		$.ajax({
			url: "js/response.json",
			type: "GET",
			data: formData,
			dataType: "json",
			success: function(data, textStatus, xhr){
				$("#status").html(data.message);
				$(".statusModal").addClass("show");
				$(".modal").removeClass("open");

				if(data.status === true){
					$("#okayButton").attr("data-status", "success");
					$("#headerStatus").html("Thank You!");
				}
				else{
					$("#okayButton").attr("data-status", "failure");
					$("#headerStatus").html("Error");
				}
			}
		});
	});

	$("#okayButton").bind("click", function(){
		if($(this).attr("data-status") === "failure"){
			$(".statusModal").removeClass("show");
			$(".modal").addClass("open");
		}
		else{
			$(".pageFade").addClass("hide");
			$(".statusModal").removeClass("show");
		}
	});
});