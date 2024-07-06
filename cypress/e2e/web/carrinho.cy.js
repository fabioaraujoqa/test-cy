/// <reference types="cypress" />

describe("Funcionalidade: Carrinho", () => {
  before(() => {
    cy.limparCarrinho();
  });

it("Deve validar produtos no carrinho", () => {
    //cy.addProdutosCarrinho()
    cy.get("#quantity-1").clear().type(10);
    cy.get(".btn").eq(3).click();
    cy.visit("cart.html");


  }); 

  
});
