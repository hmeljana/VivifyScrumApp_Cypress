import data from "../fixtures/data.json";
import common from "../fixtures/common.json";
import sidebar from "../models/sidebarModule";

let boardId;

module.exports = {
	get selectOrg() {
		return cy.get(".el-input input");
	},
	get dropdownOrgOption() {
		return cy.get("li.vs-c-select-dropdown__item");
	},
	get boardTypeScrum() {
		return cy.get(".vs-c-radio span[name='type_scrum']");
	},
	get boardTypeKanban() {
		return cy.get(".vs-c-radio span[name='type_kanban']");
	},
	get importConfigFrom() {
		return cy.get("div:nth-of-type(1) > .vs-input-border > .el-select.vs-c-new-board-select > .el-input > .el-input__inner");
	},
	get configFromDetailsHover() {
		return cy.get(".vs-c-new-board-tooltip");
	},
	get importTeamMembersFrom() {
		return cy.get("div:nth-of-type(2) > .vs-input-border > .el-select.vs-c-new-board-select > .el-input > .el-input__inner");
	},
	get starBoard() {
		return cy.get("ul.vs-c-list--starred");
	},
	get unstarBoard() {
		return cy.get(".vs-c-list--starred .vs-c-list__btn > div:nth-of-type(1)");
	},
	get configureButton() {
		return cy.get("[data-cy='board-configuration']");
	},
	get deleteButton() {
		return cy.get(".vs-c-btn--warning");
	},
	get saveButton() {
		return cy.get("button[name='save-btn']");
	},
	get okButton() {
		return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--lg vs-u-font-sm vs-c-modal--features-confirm-button']");
	},

	create() {
		cy.intercept("POST", "api/v2/boards").as("createdBoard");
		sidebar.addIconHover.click();
		sidebar.addBoard.click();
		this.selectOrg.click();
		this.dropdownOrgOption.click();
		cy.get(common.createOrgBoardModals.nameInput).clear().type(data.board.name1);
		cy.get(common.createOrgBoardModals.nextButton).click();
		this.boardTypeScrum.click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		cy.get(common.createOrgBoardModals.nextButton).click();
		sidebar.myBoard.should("be.visible");
		cy.wait("@createdBoard").then((intercept) => {
			expect(intercept.response.body.name).to.eq(data.board.name1);
			expect(intercept.response.statusCode).to.eq(201);
			boardId = intercept.response.body.id;
		});
	},

	star() {
		sidebar.starBoard.click({ force: true });
		this.starBoard.should("be.visible");
	},

	unstar() {
		this.unstarBoard.click({ force: true });
		this.starBoard.should("not.exist");
	},

	delete() {
		cy.intercept("DELETE", `**/boards/${boardId}`).as("deleteBoard");
		sidebar.createdBoard.click({ force: true });
		this.configureButton.click();
		cy.wait(2000);
		this.deleteButton.click();
		this.saveButton.contains("Yes").click();
		this.okButton.click();
	},
};
