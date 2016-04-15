$(function(){
	$("html").removeClass("page-loading");

	function openModal(){
		window.scroll(0, 0);
		$(".pageFade").removeClass("hide");
		$(".modal").addClass("open");
	}

	function closeModal(){
		clearFields();
		$(".modal").removeClass("open");
		$(".pageFade").addClass("hide");
		$("body").removeClass("locked");
	}

	function clearFields(){
		$("#name, #address, #phone, #alternatePhone, #email, #problem, #preferredTime").val("");
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

	// Modal close via pressing escape
	$(window).bind("keyup", function(e){
		console.log(e.which);
		// Check if the modal is open and the escape key was pressed
		if(e.which === 27 && $(".modal").hasClass("open")){
			// Close the modal
			closeModal();
		}
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
				$("#status").text(data.message);

				// Show the status
				$(".statusModal").addClass("show");
				$(".modal").removeClass("open");

				// Change the rel attribute of the status button
				if(data.status === true){
					$("#okayButton").attr("rel", "success");
					$("#headerStatus").text("Thank You!");
					clearFields();
				}
				else{
					$("#okayButton").attr("rel", "failure");
					$("#headerStatus").text("Error");
				}
			}
		});
	});

	$("#okayButton").bind("click", function(){
		if($(this).attr("rel") === "failure"){
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