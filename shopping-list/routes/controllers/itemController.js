import * as itemService from  "../../services/itemService.js";

const showItems = async ({ render }) => {
		render("items.eta", {items: await itemService.listItems(2)});
}

const addItem = async ({ request, response, params, render }) => {

	// name of the new shopping list
	const body = request.body({ type: "form" });
	const formData = await body.value;
	const itemName = formData.get("item_name");
	await itemService.addItem(itemName, 2);

	return response.redirect(`/`);
}
	
export { showItems, addItem };
	