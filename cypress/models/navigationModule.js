/// <reference types = "Cypress" />
import data from "../fixtures/data.json";

module.exports = {
	get logoutButton() {
		return cy.get(".vs-c-logout");
	},
};
