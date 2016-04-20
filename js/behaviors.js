document.addEventListener("readystatechange", function(){
	document.querySelector("html").classList.remove("page-loading");

	function openModal(){
		window.scroll(0, 0);
		document.querySelector(".pageFade").classList.remove("hide");
		document.querySelector(".modal").classList.add("open");
	}

	function closeModal(){
		document.querySelector(".modal").classList.remove("open");
		document.querySelector(".pageFade").classList.add("hide");
		document.querySelector(".statusModal").classList.remove("show");
		document.querySelector("body").classList.remove("locked");
	}

	// Scheduling modal open
	document.querySelector("#schedule").addEventListener("click", function(){
		document.querySelector("body").classList.add("locked");
		openModal();
	});

	// Modal close via click
	document.querySelector(".closeModal, .pageFade").addEventListener("click", function(){
		closeModal();
	});

	// Appointment submit behavior
	document.querySelector(".submitAppointment a").addEventListener("click", function(e){
		var formData = new FormData(document.getElementById("appointmentForm"));

		fetch("/js/response.json", {
			method: "POST",
			body: formData
		}).then(function(response){
			return response.json();
		}).then(function(data){
			document.querySelector("#status").innerHTML = data.message;
			document.querySelector(".statusModal").classList.add("show");
			document.querySelector(".modal").classList.remove("open");

			if(data.status === true){
				document.querySelector("#okayButton").setAttribute("data-status", "success");
				document.querySelector("#headerStatus").innerHTML = "Thank You!";
			}
			else{
				document.querySelector("#okayButton").setAttribute("data-status", "failure");
				document.querySelector("#headerStatus").innerHTML = "Error";
			}
		});
	});

	document.querySelector("#okayButton").addEventListener("click", function(e){
		if(e.target.getAttribute("data-status") === "failure"){
			document.querySelector(".statusModal").classList.remove("show");
			document.querySelector(".modal").classList.add("open");
		}
		else{
			document.querySelector(".pageFade").classList.add("hide");
			document.querySelector(".statusModal").classList.remove("show");
		}
	});
});