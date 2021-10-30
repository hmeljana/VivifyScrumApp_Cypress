/// <reference types="Cypress" / >
import organization from "../fixtures/organization.json";
import common from "../fixtures/common.json";
import sidebar from "../fixtures/sidebar.json";
import data from "../fixtures/data.json";
import strings from "../fixtures/strings.json";

describe("Organization", () => {
	let orgId;
	let token;

	before("Login", () => {
		cy.intercept("api/v2/login").as("loggedInUser");
		cy.visit("/", { timeout: 3000 });
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user3.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user3.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.wait(3000);
		cy.url().should("contain", "/my-organizations");
		cy.wait("@loggedInUser").then((intercept) => {
			expect(intercept.request.body.email).to.eq(data.users.user3.email);
			expect(intercept.response.statusCode).to.eq(200);
			token = intercept.response.body.token;
		});
	});

	it("Add New Organization - Successfully", () => {
		cy.intercept("POST", "api/v2/organizations").as("createdOrganization");
		cy.get(sidebar.addNew.addIconHover).click();
		cy.get(sidebar.addNew.addOrganization).click();
		cy.get(common.createOrgBoardModals.nameInput).type(data.organization.name1);
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.url().should("contain", "/organizations");
		cy.get(common.createOrgBoardModals.closeModalButton).click();
		cy.get(common.header.goToHomePageLogo).click();
		cy.wait("@createdOrganization").then((intercept) => {
			expect(intercept.response.body.name).to.eq(data.organization.name1);
			expect(intercept.response.statusCode).to.eq(200);
			orgId = intercept.response.body.id;
		});
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
		cy.get(common.header.goToHomePageLogo).click({ timeout: 30000 });
		cy.get(organization.editOrganization.archiveOrganization).click({ force: true });
		cy.get(organization.editOrganization.confirmArchiveButton).click();
		cy.get(organization.editOrganization.deleteOrganization).click({ force: true });
		cy.get(organization.editOrganization.passwordInput).clear().type(data.users.user3.password);
		cy.get(organization.editOrganization.confirmArchiveButton).click();
		cy.get(sidebar.myOrganization.myOrganizationLink).should("not.exist");
	});

	after("Logout", () => {
		cy.intercept("POST", "api/v2/logout").as("loggedOutUser");
		cy.get(common.header.goToHomePageLogo).click({ timeout: 3000 });
		cy.get(common.loginRegisterModals.profileIcon).click({ timeout: 30000 });
		cy.get(common.loginRegisterModals.goToProfileSettings).click({ timeout: 30000 });
		cy.get(common.loginRegisterModals.logoutButton).click({ timeout: 30000 });
		cy.url().should("contain", "/login");
		cy.get(common.loginRegisterModals.modalTitle).should("have.text", strings.modalTitle);
		cy.wait("@loggedOutUser").then((intercept) => {
			expect(intercept.response.statusCode).to.eq(201);
		});
	});
});
