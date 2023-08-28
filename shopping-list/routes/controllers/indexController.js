const showIndex = async ({ render, user }) => {
	
	render("index.eta", {is_logged: (user)});
}

export { showIndex };
