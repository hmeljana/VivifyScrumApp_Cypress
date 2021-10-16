/// <reference types="Cypress" / >
import organization from "../fixtures/organization.json";
import common from "../fixtures/common.json";
import sidebar from "../fixtures/sidebar.json";
import data from "../fixtures/data.json";

describe("Organization", () => {
	it("Login", () => {
		cy.visit("/");
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user3.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user3.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/my-organizations");
	});

	it("Add New Organization - Successfully", () => {
		cy.get(sidebar.addNew.addIconHover).click();
		cy.get(sidebar.addNew.addOrganization).click();
		cy.get(common.createOrgBoardModals.nameInput).type(data.organization.name1);
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.closeModalButton).click();
		cy.get(common.header.goToHomePageLogo).click();
		cy.url().should("contain", "/my-organizations");
	});

	it("Edit Organization - Abort Changing Org Name ", () => {
		cy.get(organization.editOrganization.editOrganizationIcon).click({ force: true });
		cy.get(organization.editOrganization.abortChangeButton).click();
		cy.get(organization.editOrganization.myOrganizationTitle).should("be.visible");
	});

	it("Edit Organization - Change Org Name Successfully ", () => {
		cy.get(organization.editOrganization.editOrganizationIcon).click();
		cy.get(organization.editOrganization.changeOrganizationNameInput).clear().type(data.organization.newName);
		cy.get(organization.editOrganization.changeNameButton).click();
		cy.get(organization.editOrganization.myOrganizationTitle).should("contain", data.organization.newName);
	});

	it("Archive Organization unsuccessfully", () => {
		cy.get(organization.editOrganization.archiveOrganization).click({ force: true });
		cy.get(organization.editOrganization.declineArchiveButton).click();
		cy.get(sidebar.myOrganization.myOrganizationLink).should("be.visible");
	});

	it("Archive Organization Successfully", () => {
		cy.get(organization.editOrganization.archiveOrganization).click({ force: true });
		cy.get(organization.editOrganization.confirmArchiveButton).click();
		cy.get(sidebar.myOrganization.myOrganizationLink).should("not.exist");
	});

	it("Reopen Organization Unsuccessfully", () => {
		cy.get(organization.editOrganization.reopenOrganization).click({ force: true });
		cy.get(organization.editOrganization.declineArchiveButton).click();
		cy.get(sidebar.myOrganization.myOrganizationLink).should("not.exist");
	});

	it("Reopen Organization Successfully", () => {
		cy.get(organization.editOrganization.reopenOrganization).click({ force: true });
		cy.get(organization.editOrganization.confirmArchiveButton).click();
		cy.get(sidebar.myOrganization.myOrganizationLink).should("be.visible");
	});

	it("Delete Organization", () => {
		cy.get(organization.editOrganization.archiveOrganization).click({ force: true });
		cy.get(organization.editOrganization.confirmArchiveButton).click();
		cy.get(organization.editOrganization.deleteOrganization).click({ force: true });
		cy.get(organization.editOrganization.passwordInput).clear().type(data.users.user1.password);
		cy.get(organization.editOrganization.confirmArchiveButton).click();
		cy.get(sidebar.myOrganization.myOrganizationLink).should("not.exist");
	});
});
