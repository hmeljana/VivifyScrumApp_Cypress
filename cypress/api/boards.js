import faker from "faker";
import color from "../support/consoleColor";
import data from "../fixtures/data.json";

module.exports = {
	post({ token = "", boardName = faker.company.companyName(), testMessage = "", statusCode = 201, organizationId = "" }) {
		return cy
			.request({
				method: "POST",
				url: `${Cypress.config("apiUrl")}/boards`,
				body: {
					name: boardName,
					organization_id: organizationId,
					type: data.board.boardTypeScrum,
					configuration_board_id: null,
					team_members_board_id: null,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				typeof response.status !== "undefined" && response.status === statusCode
					? color.log(`${testMessage} - Pass`, "success")
					: color.log(
							`${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
							"error"
					  );
				expect(response.status).to.eq(statusCode);
				return response.body;
			});
	},
	put({ token = "", boardName = faker.company.companyName(), testMessage = "", statusCode = 200, boardId = "", boardCode = "" }) {
		return cy
			.request({
				method: "PUT",
				url: `${Cypress.config("apiUrl")}/boards/${boardId}`,
				body: {
					name: boardName,
					code: boardCode,
					task_unit: "points",
					description: null,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				typeof response.status !== "undefined" && response.status === statusCode
					? color.log(`${testMessage} - Pass`, "success")
					: color.log(
							`${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
							"error"
					  );
				expect(response.status).to.eq(statusCode);
				return response.body;
			});
	},
	get({ token = "", statusCode = 200, testMessage = "", boardId = "" }) {
		return cy
			.request({
				method: "GET",
				url: `${Cypress.config("apiUrl")}/boards/${boardId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				typeof response.status !== "undefined" && response.status === statusCode
					? color.log(`${testMessage} - Pass`, "success")
					: color.log(
							`${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
							"error"
					  );
				expect(response.status).to.eq(statusCode);
				return response.body;
			});
	},
	getAll({ token = "", statusCode = 200, testMessage = "", boardId = "", organizationId = "" }) {
		return cy
			.request({
				method: "GET",
				url: `${Cypress.config("apiUrl")}/organizations/${organizationId}/boards-data`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				typeof response.status !== "undefined" && response.status === statusCode
					? color.log(`${testMessage} - Pass`, "success")
					: color.log(
							`${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
							"error"
					  );
				expect(response.status).to.eq(statusCode);
				return response.body;
			});
	},
	delete({ token = "", boardId = "", testMessage = "", statusCode = 200 }) {
		return cy
			.request({
				failOnStatusCode: false,
				method: "DELETE",
				url: `${Cypress.config("apiUrl")}/boards/${boardId}`,
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				typeof response.status !== "undefined" && response.status === statusCode
					? color.log(`${testMessage} - Pass`, "success")
					: color.log(
							`${testMessage} - Fail - 
                ${JSON.stringify(response)}`,
							"error"
					  );
				expect(response.status).to.eq(statusCode);
			});
	},
};
