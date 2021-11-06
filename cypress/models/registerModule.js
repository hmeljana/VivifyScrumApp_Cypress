/// <reference types = "Cypress" />
import data from "../fixtures/data.json";
import sidebar from "./sidebarModule";
import navigation from "./navigationModule";
import faker from "faker";

const fakerUser = {
	email: faker.internet.email(),
	password: faker.internet.password(),
};

module.exports = {
	get emailInput() {
		return cy.get("input[type='email']");
	},

	get passwordInput() {
		return cy.get("input[type='password']");
	},

	get submitButton() {
		return cy.get(".vs-u-text--left > .vs-c-btn");
	},

	get errorMessageEmptyField() {
		return cy.get(".vs-c-form-item__error-wrapper .el-form-item-error--top");
	},

	get errorMessageWrongPassword() {
		return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error");
	},

	get existingAccountError() {
		return cy.get(".el-message");
	},

	get nonExistingAccountError() {
		return cy.get(".vs-c-custom-errors > .el-form-item__error");
	},

	get numberOfUsers() {
		return cy.get(".el-input input[placeholder='Number of people in your team (51-100)']");
	},

	get checkbox() {
		return cy.get("span[class='vs-c-checkbox-check']");
	},

	get logoutButton() {
		return cy.get(".vs-c-logout");
	},

	register({ email = fakerUser.email, password = fakerUser.password, numberOfUsers = data.users.user1.numberOfUsers, termsAndPrivacy = "checked" }) {
		if (email == "" && password == "" && numberOfUsers == "" && termsAndPrivacy == "unchecked") {
			this.checkbox.click({ force: true });
			this.submitButton.click();
		} else if (email == "") {
			this.passwordInput.should("be.visible").type(password);
			this.numberOfUsers.type(numberOfUsers);
			this.submitButton.click();
		} else if (password == "") {
			this.emailInput.should("be.visible").type(email);
			this.numberOfUsers.type(numberOfUsers);
			this.submitButton.click();
		} else if (numberOfUsers == "") {
			this.emailInput.should("be.visible").type(email);
			this.passwordInput.should("be.visible").type(password);
			this.submitButton.click();
		} else if (termsAndPrivacy == "unchecked") {
			this.emailInput.should("be.visible").type(email);
			this.passwordInput.should("be.visible").type(password);
			this.numberOfUsers.type(numberOfUsers);
			this.checkbox.click({ force: true });
			this.submitButton.click();
		} else {
			this.emailInput.should("be.visible").type(email);
			this.passwordInput.should("be.visible").type(password);
			this.numberOfUsers.type(numberOfUsers);
			this.submitButton.should("be.visible").click();
		}
	},
};
