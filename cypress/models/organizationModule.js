import data from "../fixtures/data.json";
import common from "../fixtures/common.json";
import sidebar from "../models/sidebarModule";

let orgId;

module.exports = {
	get addNewOrganization() {
		return cy.get(".vs-c-my-organization--add-new");
	},
	get boardCreatedOkButton() {
		return cy.get(".vs-c-modal--features-button > .vs-c-btn");
	},
	get deleteClick() {
		return cy.get(".vs-c-btn--warning");
	},
	get editOrganizationIcon() {
		return cy.get(".vs-c-my-organizations-item-wrapper > div:nth-of-type(1) span[title='Edit Organization']");
	},
	get changeOrganizationNameInput() {
		return cy.get("input[name='change-organization-name']");
	},
	get changeNameButton() {
		return cy.get("button[name='change-organization-name']");
	},
	get abortChangeButton() {
		return cy.get("button:nth-of-type(2) > .el-icon-close");
	},
	get myOrganizationTitle() {
		return cy.get(".vs-c-my-organizations-item-wrapper > div:nth-of-type(1) .vs-c-my-organization__title");
	},
	get archiveOrganization() {
		return cy.get(".vs-c-my-organizations-item-wrapper > div:nth-of-type(1) span[title='Archive Organization']");
	},
	get reopenOrganization() {
		return cy.get(".vs-c-my-organizations-item-wrapper.vs-c-my-organizations-item-wrapper--archived > div:nth-of-type(1) span[title='Reopen Organization']");
	},
	get deleteOrganization() {
		return cy.get(".vs-c-my-organizations-item-wrapper.vs-c-my-organizations-item-wrapper--archived > div:nth-of-type(1) span[title='Delete Organization']");
	},
	get confirmArchiveButton() {
		return cy.get(".el-button--success");
	},
	get declineArchiveButton() {
		return cy.get("button[name='cancel-btn']");
	},
	get passwordInput() {
		return cy.get("input[type='password']");
	},

	create() {
		cy.intercept("POST", "api/v2/organizations").as("createdOrganization");
		sidebar.addIconHover.click();
		this.addNewOrganization.click();
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
	},
	editAbort() {
		this.editOrganizationIcon.click({ force: true });
		this.abortChangeButton.click();
		this.myOrganizationTitle.should("be.visible");
	},
	editSuccessfully() {
		this.editOrganizationIcon.click();
		this.changeOrganizationNameInput.clear().type(data.organization.newName);
		this.changeNameButton.click();
		this.myOrganizationTitle.should("contain", data.organization.newName);
	},
	archiveUnsuccessfully() {
		this.archiveOrganization.click({ force: true });
		this.declineArchiveButton.click();
		sidebar.myOrganizationLink.should("be.visible");
	},

	archiveSuccessfully() {
		this.archiveOrganization.click({ force: true });
		this.confirmArchiveButton.click();
		sidebar.myOrganizationLink.should("be.visible");
	},

	delete() {
		cy.get(common.header.goToHomePageLogo).click({ timeout: 30000 });
		this.archiveOrganization.click({ force: true });
		this.confirmArchiveButton.click({ force: true });
		this.deleteOrganization.click({ force: true });
		this.passwordInput.clear().type(data.users.user1.password);
		this.confirmArchiveButton.click();
		cy.url().should("not.contain", "/organizations");
	},
};
