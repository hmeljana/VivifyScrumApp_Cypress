import userApi from "../api/user";
import data from "../fixtures/data.json";

describe("Grab tokens", () => {
	let userToken = {};
	it("user login", () => {
		console.log(data.accounts);
		for (const [key, value] of Object.entries(data.accounts)) {
			console.log(value.email);

			userApi.login({ email: value.email, password: value.password, testMessage: "01 - Login before tests" }).then((token) => {
				userToken[key] = token;
			});
		}
	});

	it("log", () => {
		console.log(userToken);
		cy.writeFile("k6/token.json", [userToken]);
	});
});
