const showIndex = async ({ render, user }) => {
	
	console.log(user); 
	render("index.eta", {is_logged: (user)});
}

export { showIndex };
