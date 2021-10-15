/// <reference types="Cypress" />
import loginPage from "../fixtures/login.json";
import common from "../fixtures/common.json";
import registration from "../fixtures/register.json";
import data from "../fixtures/data.json";

describe("Register", () => {
	it("visit", () => {
		cy.visit("/");
		cy.get(loginPage.goToSignUpLink).click();
	});

	it("Open Registration Modal", () => {
		cy.get(" a[title='Growth']").eq(0).click({ force: true });
	});

	it("Invalid Registration - Empty email", () => {
		cy.get(common.loginRegisterModals.passwordInput).type(data.users.user2.password);
		cy.get(registration.numberOfUsers).type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid Registration - Invalid email 1", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.invalidUser.noDomainEmail);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid Registration - Invalid email 2", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.invalidUser.noTopLevelDomainEmail);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid Registration - Empty password", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear();
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid  Registration - Empty Number of Users", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid  Registration - Number of Users less than 51", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.invalidUser.invalidNumberofUsers1);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid  Registration - Number of Users greater than 100", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.invalidUser.invalidNumberOfUsers2);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid  Registration - User doesn't agree with terms & policy", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(registration.checkbox).click();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible");
	});

	it("Invalid  Registration - Existing account", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user1.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user1.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(registration.checkbox).click();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("not.contain", "/my-organizations");
	});

	it("Valid  Registration", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.url().should("contain", "/my-organizations");
	});

	it("Logout", () => {
		cy.get(common.loginRegisterModals.profileIcon).click({ timeout: 30000 });
		cy.get(registration.accountDetails.cancelButton).click({ timeout: 30000 });
		cy.get(common.loginRegisterModals.goToProfileSettings).click({ timeout: 30000 });
		cy.get(registration.accountDetails.cancelButton).click({ timeout: 30000 });
		cy.get(common.loginRegisterModals.logoutButton).click({ timeout: 30000 });
		cy.url().should("contain", "/login");
	});

	it("Valid Login with New Account", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(loginPage.loginButton).click();
		cy.url().should("contain", "/my-organizations");
	});

	//Ponasa se drugacije kada prolazim manuelno i na testovima
	//koje pokrene cypress ovaj modal za Account details:

	// it("Adding Account details", () => {
	// 	cy.get(registration.accountDetails.firstName).type(data.users.user2.name);
	// 	cy.get(registration.accountDetails.lastName).type(data.users.user2.lastName);
	// 	cy.get(registration.accountDetails.finishRegistrationButton).click();
	// 	cy.url().should("contain", "/my-organizations");
	// });
});
