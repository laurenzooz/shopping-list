import * as listService from  "../../services/listService.js";

const showLists = async ({ render, user }) => {
	render("lists.eta", {lists: await listService.listLists(user.id)});
}

const addList = async ({ request, response, user, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const listName = formData.get("list_name");
	
	await listService.addList(user.id, listName);

	response.redirect(`/lists`);
}
	
const deleteList = async ({ request, response, params, render, user }) => {
	

	await listService.deleteList(params.id, user.id);
 
	response.redirect(`/lists`);
}

export { showLists, addList, deleteList };
	