/// <reference types="Cypress" />
import loginPage from '../fixtures/login.json';
import navigation from '../fixtures/navigation.json';
import data from '../fixtures/data.json'

describe('login', () => {
    // it('first test', () => {
    //     expect(true).to.eq(true);
    // });

    // it('first test', () => {
    //     expect(true).to.eq(false);
    // });

    it('visit vivify scrum', () => {
        cy.visit("/", { timeout: 30000 });
    });

    it('invalid login - no email', () => {
        cy.get(navigation.loginRegisterModals.passwordInput).type(data.user.password);
        cy.get(navigation.loginRegisterModals.submitButton).click();
        cy.url().should("contain", "/login");
        cy.get(navigation.loginRegisterModals.errorMessageEmptyField).should("be.visible");
    });

    it('invalid login - no password', () => {
        cy.get(navigation.loginRegisterModals.passwordInput).clear();
        cy.get(navigation.loginRegisterModals.emailInput).type(data.user.email);
        cy.get(navigation.loginRegisterModals.submitButton).click();
        cy.url().should("contain", "/login");
        cy.get(navigation.loginRegisterModals.errorMessageEmptyField).should("be.visible");
    });

    it('invalid login - wrong password', () => {
        cy.get(navigation.loginRegisterModals.emailInput).clear().type(data.user.email);
        cy.get(navigation.loginRegisterModals.passwordInput).clear().type("blabla");;
        cy.get(navigation.loginRegisterModals.submitButton).click();
        cy.url().should("contain", "/login");
        cy.get(navigation.loginRegisterModals.errorMessageWrongPassword).should("be.visible");
        //fali error message getter za pogresnu lozinku
    });

    it('valid login', () => {
        cy.get(navigation.loginRegisterModals.emailInput).clear().type(data.user.email);
        cy.get(navigation.loginRegisterModals.passwordInput).clear().type(data.user.password);
        cy.get(navigation.loginRegisterModals.submitButton).click();
        cy.url().should("not.contain", "/login");

    });

    it('logout', () => {
        cy.get(navigation.loginRegisterModals.profileIcon).click();
        cy.get(navigation.loginRegisterModals.goToProfileSettings).click();
        cy.get(navigation.loginRegisterModals.logoutButton).click();
        cy.url().should("contain", "/login");
    })

})