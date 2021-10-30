/// <reference types = "cypress" / >
import loginPage from "../fixtures/login.json";
import common from "../fixtures/common.json";
import registration from "../fixtures/register.json";
import data from "../fixtures/data.json";
import errorMessages from "../fixtures/errorMessages.json";
import strings from "../fixtures/strings.json";

describe("Register", () => {
	before("Visit url", () => {
		cy.visit("/");
		cy.url().should("contain", "cypress.vivifyscrum-stage.com");
		cy.get(loginPage.goToSignUpLink).click();
		cy.url().should("contain", "/pricing", { timeout: 3000 });
		cy.get(" a[title='Growth']").eq(0).click({ force: true });
	});

	it("Invalid Registration - Empty email", () => {
		cy.get(common.loginRegisterModals.passwordInput).type(data.users.user2.password);
		cy.get(registration.numberOfUsers).type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Registration - Invalid email 1", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.invalidUser.noDomainEmail);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Registration - Invalid email 2", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.invalidUser.noTopLevelDomainEmail);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Registration - Empty password", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear();
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.requiredPassword);
	});

	it("Invalid  Registration - Empty Number of Users", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.requiredNumberOfUsers);
	});

	it("Invalid  Registration - Number of Users less than 51", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.invalidUser.invalidNumberofUsers1);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.invalidNumberOfUsers);
	});

	it("Invalid  Registration - Number of Users greater than 100", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.invalidUser.invalidNumberOfUsers2);
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.invalidNumberOfUsers);
	});

	it("Invalid  Registration - User doesn't agree with terms & policy", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(registration.checkbox).click();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.errorMessageEmptyField).should("be.visible").and("have.text", errorMessages.termsAndPrivacy);
	});

	it("Invalid  Registration - Existing account", () => {
		cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user1.email);
		cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user1.password);
		cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
		cy.get(registration.checkbox).click();
		cy.get(common.loginRegisterModals.submitButton).click();
		cy.get(common.loginRegisterModals.existingAccountError).should("be.visible").and("have.text", errorMessages.existingEmail);
		cy.url().should("not.contain", "/my-organizations");
	});

	// it.only("Valid  Registration", () => {
	// 	cy.intercept("POST", "api/v2/register").as("registeredUser");
	// 	cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
	// 	cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
	// 	cy.get(registration.numberOfUsers).clear().type(data.users.user1.numberOfUsers);
	// 	cy.get(common.loginRegisterModals.submitButton).click();
	// 	cy.wait(3000);
	// 	cy.url().should("contain", "/my-organizations");
	// 	cy.wait("@registeredUser").then((intercept) => {
	// 		expect(intercept.response.statusCode).to.eq(200);
	// 	})
	// });

	// after("Logout", () => {
	// 	cy.get(common.loginRegisterModals.profileIcon).click({ timeout: 30000 });
	// 	cy.get(common.loginRegisterModals.goToProfileSettings).click({ timeout: 30000 });
	// 	cy.get(common.loginRegisterModals.logoutButton).click({ timeout: 30000 });
	// 	cy.url().should("contain", "/login");
	// 	cy.get(common.loginRegisterModals.modalTitle).should("have.text", strings.modalTitle);
	// });

	// it("Valid Login with New Account", () => {
	// 	cy.get(common.loginRegisterModals.emailInput).clear().type(data.users.user2.email);
	// 	cy.get(common.loginRegisterModals.passwordInput).clear().type(data.users.user2.password);
	// 	cy.get(loginPage.loginButton).click();
	// 	cy.url().should("contain", "/my-organizations");
	// });

	//Ponasa se drugacije kada prolazim manuelno i na testovima
	//koje pokrene cypress ovaj modal za Account details:

	// it("Adding Account details", () => {
	// 	cy.get(registration.accountDetails.firstName).type(data.users.user2.name);
	// 	cy.get(registration.accountDetails.lastName).type(data.users.user2.lastName);
	// 	cy.get(registration.accountDetails.finishRegistrationButton).click();
	// 	cy.url().should("contain", "/my-organizations");
	// });
});
