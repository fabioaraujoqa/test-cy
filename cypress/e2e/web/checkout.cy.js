/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('Funcionalidade: Checkout', () => {
    beforeEach(() => {
        cy.visit('')
        cy.get(':nth-child(1) > .card > .card-body > .btn').click()
        cy.visit('checkout.html')
    });

    it('Deve preencher checkout com sucesso de usuário ', () => {
        //Preencher dados
        let nome = "Fábio"
        let senha = "Teste@123"
        let email = `email@${Date.now()}.com`
        cy.get('#first-name').type('Fábio')
        cy.get('#last-name').type('Araújo')
        cy.get('#address').type('Endereço qq')
        cy.get('#number').type('100')
        cy.get('#cep').type('12345678')
        cy.get('#phone').type('1155555555')
        cy.get('#email').type(email)
        cy.get('#payment-boleto').click()
        cy.get('#terms').check()
        cy.get('.btn').click()

        cy.get('h4').should('contain', `Obrigado pelo seu pedido ${nome}`)
    });

    it.only('Deve preencher checkout com sucesso de usuário - Faker', () => {
        //Preencher dados
        cy.get('#first-name').type(faker.person.firstName())
        cy.get('#last-name').type(faker.person.lastName())
        cy.get('#address').type(faker.location.street())
        cy.get('#number').type('100')
        cy.get('#cep').type('12345678')
        cy.get('#phone').type('1155555555')
        cy.get('#email').type(faker.internet.email())
        cy.get('#payment-boleto').click()
        cy.get('#terms').check()
        cy.get('.btn').click()
        cy.get('h4').should('contain', `Obrigado pelo seu pedido`)
    });

    it('Deve preencher checkout com sucesso de usuário com cadastro', () => {
        
    });

    it('Deve validar as mensagens de alerta quando preencher campos', () => {
        
    });
});