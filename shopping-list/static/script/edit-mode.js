const checkbox = document.getElementById("editMode");
const showOnlyInEdit = document.querySelectorAll("#isEditMode"); // these elements are hidden if not in edit mode 

function checkboxChange(){
	draggables.forEach((draggable) => {
		draggable.draggable = checkbox.checked; // enable draggable functionality only when checkbox checked

		if (checkbox.checked) { // show the outline of the draggable areas only when checkbox is checked
			draggable.style.outline = "thin dashed white";
			draggable.style.cursor =  "move";
		} else {
			draggable.style.outline = "0px dashed white"; // hide the outline (thickness to 0) when not in edit mode
			draggable.style.cursor =  "auto";
		}
	}); 
	
	showOnlyInEdit.forEach((element) => {
		if (checkbox.checked) { // show delete button only when checkbox checked
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	});

	


}

checkbox.addEventListener('change', checkboxChange);