/// <reference types="Cypress" / >
import createBoard from "../fixtures/createBoard.json";
import common from "../fixtures/common.json";
import sidebar from "../fixtures/sidebar.json";
import data from "../fixtures/data.json";

describe("Board", () => {
	it("Login", () => {
		cy.visit("/");
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user1.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user1.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/my-organizations");
	});

	it("Add New Organization - Successfully", () => {
		cy.get(sidebar.addNew.addIconHover).click();
		cy.get(sidebar.addNew.addOrganization).click();
		cy.get(common.createOrgBoardModals.nameInput).type(data.organization.name2);
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.closeModalButton).click();
		cy.get(common.header.goToHomePageLogo).click();
		cy.url().should("contain", "/my-organizations");
	});

	it("Create Board", () => {
		cy.get(sidebar.addNew.addIconHover).click();
		cy.get(sidebar.addNew.addBoard).click();
		cy.get(createBoard.selectOrg).click();
		cy.get(createBoard.dropdownOrgOption).click();
		cy.get(common.createOrgBoardModals.nameInput).clear().type(data.board.name1);
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(createBoard.boardTypeScrum).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(sidebar.myOrganization.myBoard).should("be.visible");
	});

	it("Star Board", () => {
		cy.get(sidebar.myOrganization.starBoard).click({ force: true });
		cy.get("ul.vs-c-list--starred").should("be.visible");
	});

	it("Unstar Board", () => {
		cy.get(".vs-c-list--starred .vs-c-list__btn > div:nth-of-type(1)").click({ force: true });
		cy.get("ul.vs-c-list--starred").should("not.exist");
	});
});
