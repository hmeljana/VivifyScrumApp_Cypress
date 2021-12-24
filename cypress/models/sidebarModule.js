/// <reference types = "Cypress" />
import data from "../fixtures/data.json";

module.exports = {
	get profileIcon() {
		return cy.get(".vs-u-img--round");
	},

	get goToProfileSettings() {
		return cy.get("[data-cy='account-profile']");
	},
	get addIconHover() {
		return cy.get(".vb-content > .vs-c-list:nth-child(1) .vs-c-list__btn");
	},
	get addOrganization() {
		return cy.get("li:nth-of-type(1) > a > span");
	},
	get addBoard() {
		return cy.get("li:nth-of-type(2) > a > span");
	},
	get importBoard() {
		return cy.get("li:nth-of-type(3) > a > span");
	},
	get myOrganizationLink() {
		return cy.get(".vs-c-list__item .vs-c-list__organisation");
	},
	get expandMyOrganization() {
		return cy.get("button[slot='toggle-button']");
	},
	get myBoard() {
		return cy.get(".vs-c-list--boards li[data-type='board']");
	},
	get starBoard() {
		return cy.get(".vs-c-list__item-board .vs-c-list__btn .vs-c-icon");
	},
	get addBoardIconHover() {
		return cy.get(".vs-c-list-btn--add-new");
	},
	get addNewBoard() {
		return cy.get("div:nth-of-type(14) .vs-c-list a");
	},
	get createdBoard() {
		return cy.get(".vs-c-list__btn > :nth-child(3)");
	},
};
