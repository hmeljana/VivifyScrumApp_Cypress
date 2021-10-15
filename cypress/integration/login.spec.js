/// <reference types="cypress" / >
import common from "../fixtures/common.json";
import data from "../fixtures/data.json";

describe("Login", () => {
	it("Visit VivifyScrum", () => {
		cy.visit("/", { timeout: 30000 });
	});

	it("Invalid Login - Empty email", () => {
		cy.get(common.loginRegisterModals.passwordInput).type(data.users.user1.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/login");
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid Login - Wrong email", () => {
		cy.get(common.loginRegisterModals.emailInput).type(data.users.user3.email);
		cy.get(common.loginRegisterModals.passwordInput).type(data.users.user1.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/login");
		cy.get(common.loginRegisterModals.errorMessageWrongPassword).should("be.visible");
	});

	it("Invalid Login - Non-existing email", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.invalidUser.nonExistingEmail);
		cy.get(common.loginRegisterModals.passwordInput).type(data.users.user1.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/login");
		cy.get(common.loginRegisterModals.errorMessageWrongPassword).should("be.visible");
	});

	it("Invalid Login - Empty password", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user1.email);
		cy.get(common.loginRegisterModals.passwordInput).clear();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/login");
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid Login - Wrong password", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user1.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user3.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/login");
		cy.get(common.loginRegisterModals.errorMessageWrongPassword).should("be.visible");
	});

	it("Valid Login", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user1.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user1.password);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("not.contain", "/login");
	});

	it("Logout", () => {
		cy.get(common.loginRegisterModals.profileIcon).click();
		cy.get(common.loginRegisterModals.goToProfileSettings).click();
		cy.get(common.loginRegisterModals.logoutButton).click();
		cy.url().should("contain", "/login");
	});
});
