/// <reference types="cypress" />
import LoginPage from "../../support/pages/login-page";

describe('Funcionalidade: Login', () => {
    
    beforeEach(() => {
       // LoginPage.visitarUrlLogin()
       const url = Cypress.env('webUrl') + '/login.html'
       cy.visit(url)
    });

    it('Deve fazer login com sucesso usando Pages', () => {
        LoginPage.fazerLogin('email@1718949079792.com', 'Teste@123')
        cy.get('h1').should('contain', 'Minha conta')
    });

    it('Deve fazer login com sucesso usando Comando customizado', () => {
        cy.login('email@1718949079792.com', 'Teste@123')
        cy.get('h1').should('contain', 'Minha conta')
    });

    it.only('Deve fazer login com sucesso usando Comando customizado e fixture', () => {
        cy.fixture('usuarios').then((user)=>{
            cy.login(user[1].email, user[1].senha)
        })
        cy.get('h1').should('contain', 'Minha conta')
    });

});