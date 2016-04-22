document.addEventListener("readystatechange", function(){
	var pageFade = document.querySelector(".pageFade"),
		modal = document.querySelector(".modal"),
		statusModal = document.querySelector(".statusModal"),
		okayButton = document.querySelector("#okayButton"),
		headerStatus = document.querySelector("#headerStatus"),
		status = document.querySelector("#status"),
		closeModalButton = document.querySelector(".closeModal"),
		schedule = document.querySelector("#schedule"),
		submitAppointment = document.querySelector(".submitAppointment a");

	document.documentElement.classList.remove("page-loading");

	function animate(selector, duration, property, from, to, units){
		var element = document.querySelector(selector),
			endTime = +new Date() + duration,
			interval = (1000 / 60),
			progress = function(){
				var progress = Math.abs(((endTime - +new Date()) / duration) - 1);
				return (progress * (to - from)) + from;
			},
			draw = function(){
				if(endTime > +new Date()){
					element.style[property] = progress() + units;
					setTimeout(draw, interval);
				}
				else{
					element.style[property] = to + units;
					return;
				}
			};

		draw();
	}

	function openModal(){
		window.scroll(0, 0);
		pageFade.classList.remove("hide");
		modal.classList.add("open");
		document.body.classList.add("locked");

		if(isMobile()){
			animate(".modal", 500, "top", -150, 0, "%");
		}
		else{
			animate(".modal", 500, "top", -150, 10, "%");
		}
	}

	function closeModal(){
		modal.classList.remove("open");
		pageFade.classList.add("hide");
		statusModal.classList.remove("show");
		document.body.classList.remove("locked");

		if(isMobile()){
			animate(".modal", 500, "top", 0, -150, "%");
		}
		else{
			animate(".modal", 500, "top", 10, -150, "%");
		}
	}

	function isMobile(){
		if(window.innerWidth <= 500){
			return true;
		}
		else{
			return false;
		}
	}

	function repositionModal(){
		if(modal.classList.contains("open")){
			if(isMobile()){
				modal.style.top = "0";
			}
			else{
				modal.style.top = "10%";
			}
		}
	}

	// Scheduling modal open
	schedule.addEventListener("click", openModal);

	// Modal close via click
	pageFade.addEventListener("click", closeModal);
	closeModalButton.addEventListener("click", closeModal);

	// Appointment submit behavior
	submitAppointment.addEventListener("click", function(e){
		var formData = new FormData(document.getElementById("appointmentForm"));

		fetch("/js/response.json", {
			method: "POST",
			body: formData
		}).then(function(response){
			return response.json();
		}).then(function(data){
			status.innerHTML = data.message;
			statusModal.classList.add("show");
			modal.classList.remove("open");

			if(data.status === true){
				okayButton.setAttribute("data-status", "success");
				headerStatus.innerHTML = "Thank You!";
			}
			else{
				okayButton.setAttribute("data-status", "failure");
				headerStatus.innerHTML = "Error";
			}
		});
	});

	okayButton.addEventListener("click", function(e){
		if(e.target.getAttribute("data-status") === "failure"){
			statusModal.classList.remove("show");
			modal.classList.add("open");
		}
		else{
			pageFade.classList.add("hide");
			statusModal.classList.remove("show");
		}
	});

	window.addEventListener("resize", repositionModal);
	window.onorientationchange = repositionModal;
});