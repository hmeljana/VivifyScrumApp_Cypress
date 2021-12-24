import color from "../support/consoleColor";

module.exports = {
	login({ email = "nikolovskabokica11@gmail.com", password = "bokica", statusCode = 200, testMessage = "" }) {
		return cy
			.request({
				failOnStatusCode: false,
				method: "POST",
				url: `${Cypress.config("apiUrl")}/login`,
				body: {
					email: email,
					password: password,
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
				return response.body.token;
			});
	},
};
