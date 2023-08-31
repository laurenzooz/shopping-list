const draggables = document.querySelectorAll(".draggable"); // All the draggable elements
const dropAreas = document.querySelectorAll(".dropArea"); 

draggables.forEach(draggable => {
	draggable.addEventListener("dragstart", () => {
		// dragging starts, change the style
		draggable.classList.add("dragging");
	});
	
	draggable.addEventListener("dragend", () => {
		draggable.classList.remove("dragging"); 
	});


});

