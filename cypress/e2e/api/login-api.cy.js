/// <reference types="cypress" />

const urlApi = Cypress.env('apiUrl')

describe('Login via API', () => {
    it('Deve fazer login com sucesso', () => {
        cy.api({
            method: 'POST', 
            url: urlApi + 'login', 
            body: {
                "email": "admin@admin.com",
                "password": "admin"
              }
        }).then((response) => {
            expect(response.status).equal(200)
            cy.log(response.body.token)
            expect(response.body.name).contains('Teste')
            expect(response.body).to.have.property('token')
            expect(response.duration).lessThan(100)
        })    
    });
});