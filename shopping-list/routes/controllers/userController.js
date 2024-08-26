import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";
import { isEmail, minLength, required, validate, invalid } from "https://deno.land/x/validasaur@v0.15.0/mod.ts";

const validationRules = { email: [required, isEmail], password: [required, minLength(4)] };

let loginError = ""; // empty message by default, if problem with logging in this gets populated

const processLogin = async ({ request, response, cookies }) => {
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
	const passwordMatches = bcrypt.compareSync(params.get("password"), user.password);

	if (!passwordMatches) {
		loginError = "Wrong email or password";
		response.redirect("/auth/login");
		return;
	}

	const cookieData = JSON.stringify(user); // Convert user data to JSON format
	cookies.set("user", cookieData, {
    httpOnly: true,          // Secure the cookie so it's not accessible via client-side JavaScript
    sameSite: "Strict",       // Strictly limits when the cookie can be sent with cross-site requests
    secure: false,            // Set this to true if you're using HTTPS (false for HTTP)
    maxAge: 60 * 60 * 24 * 7, // Cookie expiration time (e.g., 1 week)
  	});
	response.redirect("/");
}

const showLoginForm = async ({ render, user }) => {
	render("login.eta", {loginError: loginError, is_logged: (user)});
}

const logout = async ({ render, user, response, state }) => {
	
	await state.session.deleteSession(user);
	response.redirect("/");
}


const registerUser = async ({ request, response, render, user }) => {
	const body = request.body({ type: "form" });
	const params = await body.value;

	let data = { email: "", password: "" , user_exists: false, errors: null };
	data.email = params.get("email");
	data.password = params.get("password");
	const [passes, errors] = await validate(data, validationRules);
	// validate using validasaur

	const existing_user = await userService.getUser(data.email);

	if (existing_user[0]) { 
		data.user_exists = true;
		render("register.eta", data);
		return;
	} // check if user already exists

	if (!passes) { 
		data.errors = errors;
		render("register.eta", data, {is_logged: (user)});
	} else {
		userService.addUser(data.email, bcrypt.hashSync(data.password));
		data.user_exists = false;
		response.redirect("/auth/login");
	}
  
  
}
  
const showRegistrationForm = ({ render, user }) => {
	loginError = "";
	const data = { email: "", password: "" , errors: null, is_logged: (user) };
	render("register.eta", data);
}

export { processLogin, showLoginForm, logout, registerUser, showRegistrationForm};