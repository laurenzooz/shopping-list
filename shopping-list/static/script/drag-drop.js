let draggables = document.querySelectorAll(".draggable"); // All the draggable elements
const dropArea = document.querySelector(".dropArea"); // only possible to drop within the drop area
let url = document.URL; // url of currently open page.
let orderArr = []; // int array of shopping list's or shopping list items' ids, 
// in the same order as they are visible on the page.

draggables.forEach((draggable) => {
	const id = draggable.querySelector("#draggableId").textContent;
	orderArr.push(id);
});
// initialize the orderarray

draggables.forEach((draggable) => {
	draggable.addEventListener("dragstart", () => {
		// dragging starts, change the style
		draggable.classList.add("dragging");
	});
	
	draggable.addEventListener("dragend", () => {
		draggable.classList.remove("dragging"); 
		updateOrder(); // update the order array when drag ends
	});
});

dropArea.addEventListener('dragover', e => {
	const elementBelow = getElementBelow(e.clientY); // get the element below, pass the mouse y pos
	const dragging = document.querySelector(".dragging"); // the element currently being dragged

	if (typeof (elementBelow) === "undefined") {// no elements below = this is the lowest element
		dropArea.appendChild(dragging); // dragged element goes to bottom of the list
		// add the item id to the end of the order array, and remove the old position
	} else { // there is an element found below, set the dragged element above it
		dropArea.insertBefore(dragging, elementBelow); 
	}

});

function updateOrder(){
	const elementArr = Array.from(dropArea.children); // order of elements
	orderArr = []; // empty the array and repopulate it
	for (let i = 0; i < elementArr.length; i++) {
		const id = elementArr[i].querySelector("#draggableId").textContent;
		orderArr.push(id);
	}
	sendOrderData(); // update the order data on database
}

// sends the order array data, to save the order on database.
const sendOrderData = async () => {
	const postUrl = url + `/order`; // the url to send the post request to to reorder the elements in database

	const response = await fetch(postUrl, {
		method: "POST",
		//body: JSON.stringify.orderArr,
		headers: {
			Accept: 'application.json',
			'Content-Type': 'application/json'
		  },
		body: JSON.stringify(orderArr),
		
	});

};




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

