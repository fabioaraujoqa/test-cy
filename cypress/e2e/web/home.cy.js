/// <reference types="cypress" />

describe('Funcionalidade: Home Page', () => {
    beforeEach(() => {
        //cy.visit('')
        const url = Cypress.env('webUrl')
        cy.visit(url)
    });

    it('Deve validar inserção no carrinho pelo botão', () => {
        cy.get(':nth-child(1) > .card > .card-body > .btn').click() //TODO: Melhorar este elemento
        cy.get('#alert-container').should('contain', 'Produto adicionado ao carrinho!')
    });

    it('Deve validar inserção de quantidade de produtos', () => {
        cy.get(':nth-child(1) > .card > .card-body > .btn').click() //TODO: Melhorar este elemento
        cy.get('#alert-container').should('contain', 'Produto adicionado ao carrinho!')
    });

    it('Validar link da página de produto', () => {
        cy.get('.card-img-top').eq(0).click()
        cy.url().should('include', 'product.html');
    });

    it('Validar link do nome do produto', () => {
        cy.contains('Produto 2').click()
        cy.url().should('include', 'product.html');
    });



});