$(function(){
	function openModal(){
		window.scroll(0, 0);

		// Turn on the page fader
		$(".pageFade").show();

		var topPlacement = $(window).width() > 500 ? "10%" : 0;

		$(".modal").addClass("open");
	}

	function closeModal(){
		// Clear All Fields
		clearFields();

		// Hide Modal
		$(".modal").removeClass("open");

		// Hide Page Fade
		$(".pageFade").hide();

		// Change body visibility
		$("body").removeClass("locked");
	}

	function clearFields(){
		$("#name, #address, #phone, #alternatePhone, #email, #problem, #preferredTime").val("");
	}

	$(function(){
		// Modal open
		$("#schedule").click(function(){
			// Change body visibility
			$("body").addClass("locked");

			// Open Modal
			openModal();
		});

		// Modal close via click
		$(".closeModal, .pageFade").click(function(){
			// Close the modal
			closeModal();
		});

		// Modal close via pressing escape
		$(window).keyup(function(e){
			// Check if the modal is open and the escape key was pressed
			if(e.which === 27 && parseInt($(".modal").css("top"), 10) > 0){
				// Close the modal
				closeModal();
			}
		});

		// Appointment submit behavior
		$(".submitAppointment a").click(function(){
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
					$(".statusModal").css({
						"display": "flex"
					});

					closeModal();

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

		$("#okayButton").click(function(){
			if($(this).attr("rel") === "failure"){
				$(".statusModal").css({
					"display": "none"
				});

				// Fade in the loader
				$(".modal").show();
			}
			else{
				// Fade out the status modal and page fade
				$(".statusModal, .pageFade").css({
					"display": "none"
				});
			}
		});
	});
});