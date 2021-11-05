/// <reference types = "cypress" / >
import loginPage from "../fixtures/login.json";
import common from "../fixtures/common.json";
import registration from "../fixtures/register.json";
import data from "../fixtures/data.json";
import errorMessages from "../fixtures/errorMessages.json";
import strings from "../fixtures/strings.json";
import registrationModule from "../models/registerModule";

describe("Register", () => {
	beforeEach("Visit url", () => {
		cy.visit("/");
		cy.url().should("contain", "cypress.vivifyscrum-stage.com");
		cy.get(loginPage.goToSignUpLink).click();
		cy.url().should("contain", "/pricing", { timeout: 3000 });
		cy.get(" a[title='Growth']").eq(0).click({ force: true });
	});

	it("Invalid Registration - Empty email", () => {
		registrationModule.register({ email: "" });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Registration - No domain email", () => {
		registrationModule.register({ email: data.users.invalidUser.noDomainEmail });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Registration - No top level domain email", () => {
		registrationModule.register({ email: data.users.invalidUser.noTopLevelDomainEmail });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Registration - Empty password", () => {
		registrationModule.register({ password: "" });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageWrongPassword.should("have.text", errorMessages.requiredPassword);
	});

	it("Invalid  Registration - Empty Number of Users", () => {
		registrationModule.register({ numberOfUsers: "" });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("have.text", errorMessages.requiredNumberOfUsers);
	});

	it("Invalid  Registration - Number of Users less than 51", () => {
		registrationModule.register({ numberOfUsers: data.users.invalidUser.invalidNumberofUsers1 });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("have.text", errorMessages.invalidNumberOfUsers);
	});

	it("Invalid  Registration - Number of Users greater than 100", () => {
		registrationModule.register({ numberOfUsers: data.users.invalidUser.invalidNumberofUsers2 });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("have.text", errorMessages.invalidNumberOfUsers);
	});

	it("Invalid  Registration - User doesn't agree with terms & policy", () => {
		registrationModule.register({ termsAndPrivacy: "unchecked" });
		cy.url().should("contain", "/sign-up");
		registrationModule.errorMessageEmptyField.should("be.visible").and("have.text", errorMessages.termsAndPrivacy);
	});

	it("Invalid  Registration - Existing account", () => {
		registrationModule.register({ email: data.users.user1.email });
		cy.url().should("contain", "/sign-up");
		registrationModule.existingAccountError.should("have.text", errorMessages.existingEmail);
	});

	it("Valid  Registration", () => {
		cy.intercept("POST", "api/v2/register").as("registeredUser");
		registrationModule.register({});
		cy.url().should("contain", "/my-organizations");
		cy.wait("@registeredUser").then((intercept) => {
			expect(intercept.response.statusCode).to.eq(200);
		});
	});

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
