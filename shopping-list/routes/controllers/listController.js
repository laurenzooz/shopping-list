const showLists = async ({ render }) => {
		render("lists.eta");
}


const addList = async ({ request, response, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const listName = formData.get("list_name");
	response.redirect(`/lists`);
    

}
	
export { showLists, addList };
	