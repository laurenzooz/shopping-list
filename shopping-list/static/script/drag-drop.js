const draggables = document.querySelectorAll(".draggable"); // All the draggable elements
const dropArea = document.querySelector(".dropArea"); // only possible to drop within the drop area
let url = document.URL; // url of currently open page.
const orderArr = []; // int array of shopping list's or shopping list items' ids, 
// in the same order as they are visible on the page.

function updateOrderArr() {
	draggables.forEach((draggable) => {
		const id = draggable.querySelector("#draggableId").textContent;
		orderArr.push(id);
	});
}

updateOrderArr();

console.log(orderArr);

draggables.forEach((draggable) => {
	

	draggable.addEventListener("dragstart", () => {
		// dragging starts, change the style
		draggable.classList.add("dragging");
	});
	
	draggable.addEventListener("dragend", () => {
		draggable.classList.remove("dragging"); 
		
		//orderArr.splice(index, 0, draggable.querySelector("#draggableId").textContent);
		
	});
});

dropArea.addEventListener('dragover', e => {
	const elementBelow = getElementBelow(e.clientY); // get the element below, pass the mouse y pos
	const draggable = document.querySelector('.dragging'); // the element currently being dragged

	const draggingId = draggable.querySelector("#draggableId").textContent;
	let elementBelowId;
	if (elementBelow) {
		elementBelowId = elementBelow.querySelector("#draggableId").textContent;
	}
	// ids of the elements that are going to be reordered

	const draggingIndex = orderArr.indexOf(draggingId);
	

	if (typeof (elementBelow) === "undefined") {// no elements below = this is the lowest element
		dropArea.appendChild(draggable); // dragged element goes to bottom of the list
	} else { // there is an element found below, set this item above it on the list 
		dropArea.insertBefore(draggable, elementBelow);
	}

	if (typeof (elementBelow) === "undefined") { // not defined -> going to be the lowest element
		orderArr[draggingIndex] = draggables[draggables.length - 1].querySelector("#draggableId").textContent;;
	} else {
		orderArr[draggingIndex] = elementBelowId;
	}

	console.log(orderArr);
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


// returns an int array, with id for every shopping list or shopping list item, 
// in the same order as they are on the page 
function getItemOrder() {
	let idArr = [];
	const reorderedIds = draggables.map(draggable => draggable.draggableId);
	/*
	draggables.forEach(element => {
		const id = element.querySelector("#draggableId").innerHTML;
		// draggableId only contains the id of the item or shopping list.

		idArr.push(id);
		console.log(id);

	});
*/
	console.log(reorderedIds);
}
