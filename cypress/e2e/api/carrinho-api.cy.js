/// <reference types="cypress" />

describe("Testes na API - Carrinho", () => {
  it("GET - Deve listar carrinho com sucesso", () => {
    cy.inserirCarrinho(15);
    cy.api("api/carrinho/1").then((response) => {
      expect(response.body[0]).to.have.property("productId");
      expect(response.status).equal(200);
    });
  });

  it("POST - Deve inserir itens no carrinho com sucesso", () => {
    cy.api({
      method: "POST",
      url: "api/carrinho",
      body: {
        userId: 1,
        productId: 9,
        quantity: 20,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property(
        "message",
        "Produto adicionado ao carrinho com sucesso."
      );
      expect(response.duration).to.be.lessThan(100);
    });
  });

  it.skip("PUT - Atualizar carrinho - API COM BUG ", () => {
    cy.inserirCarrinho(8);
    cy.api({
      method: "PUT",
      url: "api/carrinho",
      body: {
        userId: 1,
        productId: 8,
        quantity: 20,
      },
    });
  });

  it("DELETE - Deve deletar um produto do carrinho sucesso", () => {
    cy.inserirCarrinho(15);
    cy.api({
      method: "DELETE",
      url: "api/carrinho/1/15",
    })
      .its("body.message")
      .should("contain", "Item do carrinho removido com sucesso.");
  });

  it("Deve deletar um produto com sucesso - usando Then", () => {
    cy.inserirCarrinho(15).then(() => {
      cy.api({
        method: "DELETE",
        url: "api/carrinho/1/15",
      }).its("body.message")
        .should("contain", "Item do carrinho removido com sucesso.");
    });
  });

  it.only("DELETE - Deve deletar carrinho completo e validando GET", () => {
    cy.inserirCarrinho(15);
    cy.inserirCarrinho(1);
    cy.inserirCarrinho(9);
    cy.api({
      method: "DELETE",
      url: "api/carrinho/1",
    }).then((response)=>{
      expect(response.status).equal(200)
      expect(response.body.message).contain("Todos os itens do carrinho removidos com sucesso.")
      cy.request('api/carrinho/1').its('body').should('not.have.length')
    })
  });

  it("BUG NA API - DELETE - Deve tentar deletar um carrinho inexistente", () => {
    let user = "/1/";
    let produto = "20";
    cy.api({
      method: "DELETE",
      url: "api/carrinho" + user + produto,
      failOnStatusCode: false,
    })
      .its("body")
      .should("contain", "Produto não encontrado no carrinho.");
  });
});
