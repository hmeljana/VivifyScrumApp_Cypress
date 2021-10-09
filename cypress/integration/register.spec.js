/// <reference types="Cypress" />
import loginPage from '../fixtures/login.json';
import navigation from '../fixtures/navigation.json';
import data from '../fixtures/data.json'

describe('register', () => {

    it('visit', () => {
        cy.visit("/");
        cy.get(loginPage.goToSignUpLink).click();
    })

    it('open registration modal', () => {
        cy.get(" a[title='Growth']").eq(0).click({force: true})
    })

   

    


    // it('logout', () => {
    //     cy.get(navigation.loginRegisterModals.profileIcon).click();
    //     cy.get(navigation.loginRegisterModals.goToProfileSettings).click();
    //     cy.get(navigation.loginRegisterModals.logoutButton).click();
    //     cy.url().should("contain", "/login");
    // })

})