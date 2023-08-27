import * as itemService from  "../../services/itemService.js";

const showItems = async ({ render, params }) => {

	return render("items.eta", {items: await itemService.listItems(params.id), id: params.id});
}

const addItem = async ({ request, response, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const itemName = formData.get("item_name");
	await itemService.addItem(itemName, params.id);
	
	return response.redirect(`/lists/${params.id}`);
}
	
export { showItems, addItem };
	