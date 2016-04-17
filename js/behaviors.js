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
		$.ajax({
			url: "js/response.json",
			type: "GET",
			data: {
				name: $("#name").val(),
				address: $("#address").val(),
				phone: $("#phone").val(),
				alternatePhone: $("#alternatePhone").val(),
				email: $("#email").val(),
				problem: $("#problem").val(),
				preferredTime: $("#preferredTime").val()
			},
			dataType: "json",
			success: function(data, textStatus, xhr){
				// Populate the status
				$("#status").html(data.message);

				// Show the status
				$(".statusModal").addClass("show");
				$(".modal").removeClass("open");

				// Change the rel attribute of the status button
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

			// Fade in the loader
			$(".modal").css({
				"display": "block"
			});
		}
		else{
			// Fade out the status modal and page fade
			$(".pageFade").addClass("hide");
			$(".statusModal").removeClass("show");
		}
	});
});