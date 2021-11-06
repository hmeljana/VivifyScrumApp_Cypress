/// <reference types = "Cypress" />
import data from "../fixtures/data.json";

module.exports = {
	get profileIcon() {
		return cy.get(".vs-u-img--round");
	},

	get goToProfileSettings() {
		return cy.get("[data-cy='account-profile']");
	},
};
