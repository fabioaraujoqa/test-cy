 Cypress.Commands.add('login', (email, senha) => { 
    cy.get("#email").type(email)
    cy.get("#password").type(senha)
    cy.get(".btn").click()
  })

  Cypress.Commands.add('limparCarrinho', () =>{
    cy.visit('')
        cy.get('.btn').eq(0).click()
        cy.visit('cart.html')
        cy.wait(1000); 
        cy.get('.cart-item > .btn').each(($btn) => {
            cy.wrap($btn).click();
            cy.wait(1000); 
          });
          cy.get('.text-center > .btn').click()
  })

Cypress.Commands.add('limparCarrinhoApi', () => {
  cy.api({
    method: "DELETE",
    url: "api/carrinho/1",
    failOnStatusCode: false
  })    
  cy.reload()
});


// cypress/support/commands.js

Cypress.Commands.add('visitWeb', (path = '') => {
  cy.visit(`${Cypress.env('webUrl')}/${path}`);
});

Cypress.Commands.add('addProduto', (quantidade) => {
  cy.get('#quantity-1').clear().type(10)
  cy.get('.btn').eq(0).click()
  cy.contains('CARRINHO').click()
});

Cypress.Commands.add('apiRequest', (method, endpoint, body = null) => {
  const options = {
    method: method,
    url: `${Cypress.env('apiUrl')}/${endpoint}`,
    failOnStatusCode: false
  };
  if (body) {
    options.body = body;
  }
  cy.request(options);
});


Cypress.Commands.add('inserirCarrinho', (produto) => {
  cy.request({
    method: 'POST', 
    url: 'api/carrinho',
    body:{
        userId: 1,
        productId: produto,
        quantity: 1
      }
  })
});

Cypress.Commands.add('cadastrarUsuario', () => {
  let email = Date.now() + "-teste@command.com";
  cy.api({
    method: "POST",
    url: "api/users",
    body: {
      name: "UsuarioCommands",
      email: email,
      password: "Password123!",
      isAdmin: false,
    },
  }).then((response) =>{
    //return cy.wrap(response.body.id);
    return response.body.id
  })
});


Cypress.Commands.add('token', (email, senha) => { 
  cy.api({
    method: 'POST', 
    url: 'api/login', 
    body: {
        "email": email,
        "password": senha
      }
  }).then((response) =>{
    return cy.wrap(response.body.token)
  })
})

















