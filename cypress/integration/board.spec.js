/// <reference types="Cypress" / >
import createBoard from "../fixtures/createBoard.json";
import common from "../fixtures/common.json";
import sidebar from "../fixtures/sidebar.json";
import data from "../fixtures/data.json";
import strings from "../fixtures/strings.json";
import organization from "../fixtures/organization.json";

describe("Board", () => {
	let boardId;
	let token;
	let orgId;

	before("Login", () => {
		cy.intercept("api/v2/login").as("loggedInUser");
		cy.visit("/", { timeout: 3000 });
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user3.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user3.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/my-organizations");
		cy.wait("@loggedInUser").then((intercept) => {
			expect(intercept.request.body.email).to.eq(data.users.user3.email);
			expect(intercept.response.statusCode).to.eq(200);
			token = intercept.response.body.token;
		});
	});

	before("Add New Organization - Successfully", () => {
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

	it("Create Board", () => {
		cy.intercept("POST", "api/v2/boards").as("createdBoard");
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
		cy.wait("@createdBoard").then((intercept) => {
			expect(intercept.response.body.name).to.eq(data.board.name1);
			expect(intercept.response.statusCode).to.eq(201);
			boardId = intercept.response.body.id;
		});
	});

	it("Star Board", () => {
		cy.get(sidebar.myOrganization.starBoard).click({ force: true });
		cy.get("ul.vs-c-list--starred").should("be.visible");
	});

	it("Unstar Board", () => {
		cy.get(".vs-c-list--starred .vs-c-list__btn > div:nth-of-type(1)").click({ force: true });
		cy.get("ul.vs-c-list--starred").should("not.exist");
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

	it("Logout", () => {
		cy.intercept("POST", "api/v2/logout").as("loggedOutUser");
		cy.get(common.header.goToHomePageLogo).click({ timeout: 30000 });
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
