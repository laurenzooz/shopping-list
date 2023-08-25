import * as listService from  "../../services/listService.js";

const showLists = async ({ render }) => {
		render("lists.eta", {lists: await listService.listLists()});
}

const addList = async ({ request, response, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const listName = formData.get("list_name");
	listService.addList(listName);
	console.log(listName); // user id temporarily 0

	response.redirect(`/lists`);
}
	
export { showLists, addList };
	