/// <reference types="Cypress" / >
import organization from "../models/organizationModule";
import authModule from "../models/authModule";

describe("Organization", () => {
	before("Login", () => {
		cy.visit("/", { timeout: 30000 });
		authModule.login({});
		cy.url().should("not.contain", "/login");
	});

	it("Add New Organization - Successfully", () => {
		organization.create();
	});

	it("Edit Organization - Abort Changing Org Name ", () => {
		organization.editAbort();
	});

	it("Edit Organization - Change Org Name Successfully ", () => {
		organization.editSuccessfully();
	});

	it("Archive Organization unsuccessfully", () => {
		organization.archiveUnsuccessfully();
	});

	it("Archive Organization Successfully", () => {
		organization.archiveSuccessfully();
	});

	it("Delete Organization", () => {
		organization.delete();
	});

	after("Logout", () => {
		authModule.logout();
		cy.url().should("contain", "/login");
	});
});
