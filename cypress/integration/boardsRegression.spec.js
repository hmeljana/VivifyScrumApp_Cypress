import userApi from "../api/user";
import boardApi from "../api/boards";
import organizationApi from "../api/organization";

describe("Api testing - Boards", {}, () => {
	let userToken;
	before("01 - Login", () => {
		userApi.login({ testMessage: "01 - Login before tests" }).then((token) => {
			userToken = token;
			cy.writeFile("cypress/fixtures/token.json", { tokenAT: token });
		});
	});

	let orgId;
	before("02 - Create Org", () => {
		organizationApi
			.post({
				token: userToken,
				testMessage: "02 - create organization",
			})
			.then((response) => {
				orgId = response.id;
			});
	});

	let boardCode;
	let boardId;
	it("03 - Create Board", () => {
		boardApi
			.post({
				token: userToken,
				organizationId: orgId,
				testMessage: "03 - Create Board",
			})
			.then((response) => {
				boardCode = response.code;
				boardId = response.id;
			});
	});

	it("04 - Update Board", () => {
		boardApi.put({
			token: userToken,
			boardId: boardId,
			boardCode: boardCode,
			organizationId: orgId,
			testMessage: "04 - Update Board",
		});
	});

	it("05 - Get Board", () => {
		boardApi.get({
			token: userToken,
			boardId: boardId,
			testMessage: "05 - Get Board",
		});
		console.log("getting boardID " + boardId);
	});

	it("06 - Delete Board", () => {
		boardApi.delete({
			token: userToken,
			boardId: boardId,
			testMessage: "06 - Delete board",
		});
	});

	let allBoards;
	it("07 - Get all Boards", () => {
		boardApi
			.get({
				token: userToken,
				organizationId: orgId,
				testMessage: "07 - Get all Boards",
			})
			.then((response) => {
				console.log(response);

				allBoards = response;
			});
	});

	after("08 - Delete all boards", () => {
		allBoards.forEach((board) =>
			boardApi.delete({
				token: userToken,
				boardId: board.id,
				testMessage: "08 - Delete all boards",
			})
		);
	});
});
