const draggables = document.querySelectorAll(".draggable"); // All the draggable elements
const dropArea = document.querySelector(".dropArea"); // only possible to drop within the drop area

draggables.forEach(draggable => {
	draggable.addEventListener("dragstart", () => {
		// dragging starts, change the style
		draggable.classList.add("dragging");
	});
	
	draggable.addEventListener("dragend", () => {
		draggable.classList.remove("dragging"); 
	});
});

dropArea.addEventListener('dragover', e => {
	const elementBelow = getElementBelow(e.clientY); // get the element below, pass the mouse y pos
	const draggable = document.querySelector('.dragging'); // the element currently being dragged

	if (elementBelow === null) {// no elements below = this is the lowest element
		dropArea.appendChild(draggable); // dragged element goes to bottom of the list
	
	} else { // there is an element found below, set this item above it on the list 
		dropArea.insertBefore(draggable, elementBelow);
	}
});



function getElementBelow(y) { 
	// Returns the element below the one being dragged
	// (to determine the new position of the dragged element once drag ends)

	const draggables_arr = [...document.querySelectorAll('.draggable:not(.dragging)')]; 
	// all the elements apart from the one being currently dragged


	// closest = element we are closest to(below)
	return draggables_arr.reduce((closest, element) => {
		const box = element.getBoundingClientRect(); // get the position of each element
		
		// offset is the distance between center of the box to mouse
		const offset = y - box.top - box.height / 2; 


		// top - height / 2 == middle of the box, y is the mouse pos
		
		// offset is negative when we are above an element, which is what we need. 
		// so we can disregard positive values 

		// we are looking for closest element below. So we are looking for a value
		// that's closest to 0 while being <0.
		
		if (offset < 0 && offset > closest.offset) {
			return {offset: offset, element: element};	// new closest element found
		} else {
			return closest; 
		}

	}, {offset: Number.NEGATIVE_INFINITY }).element; 
}

