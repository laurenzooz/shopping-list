import * as itemService from  "../../services/itemService.js";

const showItems = async ({ render, params, user }) => {

	//console.log(params.id);

	render("items.eta", {uncollectedItems: await itemService.listUncollectedItems(params.id), 
		collectedItems: await itemService.listCollectedItems(params.id),
		id: params.id,
		is_logged: (user)});
}

const addItem = async ({ request, response, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const itemName = formData.get("item_name");
	await itemService.addItem(itemName, params.id);
	
	response.redirect(`/lists/${params.id}`);
}

const collectItem = async ({ request, response, params, render, user }) => {	
	
	
	await itemService.collectItem(params.item_id, user.id); 

	response.redirect(`/lists/${params.list_id}`);
};	
export { showItems, addItem, collectItem };
	