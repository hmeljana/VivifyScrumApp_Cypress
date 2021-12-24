/// <reference types="Cypress" / >
import organization from "../models/organizationModule";
import authModule from "../models/authModule";
import board from "../models/boardModule";

describe("Board", () => {
	before("Login", () => {
		cy.visit("/", { timeout: 30000 });
		authModule.login({});
		cy.url().should("not.contain", "/login");
	});

	before("Add New Organization - Successfully", () => {
		organization.create();
	});

	it("Create Board", () => {
		board.create();
	});

	it("Star Board", () => {
		board.star();
	});

	it("Unstar Board", () => {
		board.unstar();
	});

	it("Delete Board", () => {
		board.delete();
	});

	after("Delete Organization", () => {
		organization.delete();
	});

	after("Logout", () => {
		authModule.logout();
		cy.url().should("contain", "/login");
	});
});
