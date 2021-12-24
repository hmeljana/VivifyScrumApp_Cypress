import userApi from "../api/user";

describe("Api testing - Login", () => {
	let userToken;

	it("wrong email without @", () => {
		userApi.login({
			email: "hajhajgmail.com",
			testMessage: "01 - Wrong email without @",
			statusCode: 401,
		});
	});
	it("wrong email without com", () => {
		userApi.login({
			email: "hajhaj@gmail",
			testMessage: "02 - Wrong email without com",
			statusCode: 401,
		});
	});
	it("Wrong email with space infornt", () => {
		userApi.login({
			email: "@gmail.com",
			testMessage: "03 - Wrong email with space infornt",
			statusCode: 401,
		});
	});
	it("Wrong password", () => {
		userApi.login({
			password: "haha2",
			testMessage: "04 - Wrong password",
			statusCode: 401,
		});
	});
	it("positive login", () => {
		userApi.login({ testMessage: "05 - Login" }).then((token) => {
			userToken = token;
		});
	});
});
