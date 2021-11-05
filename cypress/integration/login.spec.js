/// <reference types="cypress" / >
import common from "../fixtures/common.json";
import data from "../fixtures/data.json";
import authModule from "../models/authModule";
import errorMessages from "../fixtures/errorMessages.json";
import faker from "faker";

describe("Login", () => {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};
	beforeEach("Visit VivifyScrum", () => {
		cy.visit("/", { timeout: 30000 });
	});

	it("Invalid Login - wrong email", () => {
		authModule.login({ email: user.email });
		cy.url().should("contain", "/login");
		authModule.nonExistingAccountError.should("have.text", errorMessages.nonExistingUser);
	});

	it("Invalid Login - empty email", () => {
		authModule.login({ email: "" });
		cy.url().should("contain", "/login");
		authModule.errorMessageEmptyField.should("have.text", errorMessages.invalidEmail);
	});

	it("Invalid Login - non-existing email", () => {
		authModule.login({ email: data.users.invalidUser.nonExistingEmail });
		cy.url().should("contain", "/login");
		authModule.nonExistingAccountError.should("have.text", errorMessages.nonExistingUser);
	});

	it("Invalid Login - empty password", () => {
		authModule.login({ password: "" });
		cy.url().should("contain", "/login");
		authModule.errorMessageWrongPassword.should("have.text", errorMessages.requiredPassword);
	});

	it("Invalid Login - wrong password", () => {
		authModule.login({ password: data.users.user3.password });
		cy.url().should("contain", "/login");
		authModule.nonExistingAccountError.should("have.text", errorMessages.nonExistingUser);
	});

	it("Login with pom", () => {
		authModule.login({});
		cy.url().should("not.contain", "/login");
	});

	it("Logout", () => {
		authModule.login({});
		authModule.logout();
		cy.url().should("contain", "/login");
	});
});
