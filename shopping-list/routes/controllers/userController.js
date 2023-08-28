import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
import { isEmail, minLength, required, validate } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = { email: [required, isEmail], password: [required, minLength(4)] };

let loginError = ""; // empty message by default, if problem with logging in this gets populated

const processLogin = async ({ request, response, state }) => {
	const body = request.body({ type: "form" });
	const params = await body.value;

	const userFromDatabase = await userService.getUser(params.get("email"));
	 
	// get the user from database, check email is found
	if (userFromDatabase.length != 1) {
		loginError = "Wrong email or password";
		response.redirect("/auth/login");
		return;
	}

	const user = userFromDatabase[0];
	const passwordMatches = await bcrypt.compare(params.get("password"), user.password);

	if (!passwordMatches) {
		loginError = "Wrong email or password";
		response.redirect("/auth/login");
		return;
	}

	await state.session.set("user", user);
	loginError = ""; // reset errors to empty
	response.redirect("/lists");
}

const showLoginForm = ({ render }) => {
  render("login.eta", {loginError: loginError});
}

const registerUser = async ({ request, response, render }) => {
	const body = request.body({ type: "form" });
	const params = await body.value;

	const data = { email: "", password: "" , errors: null };
	data.email = params.get("email");
	data.password = params.get("password");
	const [passes, errors] = await validate(data, validationRules);
	// validate using validasaur

	if (!passes) { 
		data.errors = errors;
		render("register.eta", data);
	} else {
		await userService.addUser(data.email, await bcrypt.hash(data.password));
		response.redirect("/auth/login");
	}
  
  
}
  
const showRegistrationForm = ({ render }) => {
	loginError = "";
	const data = { email: "", password: "" , errors: null };
	render("register.eta", data);
}

export { processLogin, showLoginForm, registerUser, showRegistrationForm};