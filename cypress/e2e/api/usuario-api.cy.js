/// <reference types="cypress" />

describe("Usuario API", () => {
  let token;

  before(() => {
    cy.token('admin@admin.com', 'admin').then((tokenGerado) => {
      token = tokenGerado;
    });
  });

  it("GET - Deve listar os usuários com sucesso", () => {
    cy.api({
      method: "GET",
      url: "api/users",
    }).then((response) => {
      expect(response.status).equal(200);
      expect(response.body).to.be.an("array");
      expect(response.body[0]).to.have.property("id");
    });
  });

  it("GET - Contrato Deve validar cada propriedade e seus tipos no array", () => {
    cy.api("api/users").then((response) => {
      response.body.forEach((user) => {
        expect(user).to.have.property("id").that.is.a("number");
        expect(user).to.have.property("name"); //.that.is.a("string");
        expect(user).to.have.property("email"); //.that.is.a("string");
        expect(user).to.have.property("isAdmin").that.is.a("number");
      });
    });
  });

  it("POST - Deve cadastrar um usuário com sucesso - Usnado its", () => {
    let email = Date.now() + "-teste@bootcamp.com";
    cy.api({
      method: "POST",
      url: "api/users",
      body: {
        name: "Marcia",
        email: email,
        password: "Password123!",
        isAdmin: false,
      },
    })
      .its("status")
      .should("equal", 201);
  });

  it("POST - Deve cadastrar um usuário com sucesso - Usnado Then", () => {
    let email = Date.now() + "-teste@bootcamp.com";
    cy.api({
      method: "POST",
      url: "api/users",
      body: {
        name: "Marcia",
        email: email,
        password: "Password123!",
        isAdmin: false,
      },
    }).then((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.contains("Usuário criado com sucesso.");
      expect(response.duration).to.lessThan(100);
    });
  });

  it("PUT - Deve editar um usuário com sucesso", () => {
    let email = Date.now() + "-teste@put.com";
    cy.cadastrarUsuario().then((id) => {
      cy.api({
        method: "PUT",
        url: `api/users/${id}`,
        headers: {
          Authorization: token,
        },
        body: {
          name: "TestePut",
          email: email,
          password: "Password123!",
          isAdmin: true,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        //expect(response.body.message).to.contains('Usuário criado com sucesso.')
        expect(response.duration).to.lessThan(100);
      });
    });
  });

  it("DELETE - Deve deletar um usuário com sucesso", () => {
    cy.cadastrarUsuario().then((id) => {
      cy.api({
        method: "DELETE",
        url: `api/users/${id}`,
        headers: {
          Authorization: token,
        },
      })
        .its("body.message")
        .should("contain", "Usuário deletado com sucesso.");
    });
  });
});
