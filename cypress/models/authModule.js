/// <reference types = "Cypress" />
import data from "../fixtures/data.json";
import sidebar from "./sidebarModule";
import navigation from "./navigationModule";

module.exports = {
	get forgotPasswordLink() {
		return cy.get("a[href='/forgot-password']");
	},

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

	login({ email = data.users.user1.email, password = data.users.user1.password }) {
		if (email == "" && password == "") {
			this.submitButton.click();
		} else if (email == "") {
			this.passwordInput.should("be.visible").type(password);
			this.submitButton.click();
		} else if (password == "") {
			this.emailInput.should("be.visible").type(email);
			this.submitButton.click();
		} else {
			cy.intercept("POST", "**api/v2/login").as("login");
			this.emailInput.should("be.visible").type(email);
			this.passwordInput.should("be.visible").type(password);
			this.submitButton.should("be.visible").click();
			if (email == data.users.user1.email && password == data.users.user1.password) {
				cy.wait("@login").then((intercept) => {
					expect(intercept.response.statusCode).to.eq(200);
				});
			}
		}
	},

	logout() {
		cy.intercept("POST", "**api/v2/logout").as("logout");
		sidebar.profileIcon.should("be.visible").click();
		sidebar.goToProfileSettings.should("be.visible").click();
		navigation.logoutButton.should("be.visible").click();
		cy.wait("@logout").then((intercept) => {
			expect(intercept.response.statusCode).to.eq(201);
		});
	},

	// get loginButton() {
	// 	return cy.get(".vs-l-login-page .vs-c-btn--primary");
	// },
};
