/// <reference types="cypress" />

describe('Testes de ponta a ponta em QA-Commerce', () => {
    beforeEach(() => {
        cy.limparCarrinhoApi()
        cy.visit('')
    });
    
    it('Deve fechar o pedido com usuario cadastro e depois fazer login', () => {
        cy.addProduto(10)
        cy.get('#totals > .btn').click()

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
        cy.get('#create-account').check()
        cy.get('#password').type(senha)
        cy.get('#confirm-password').type(senha)
        cy.get('#payment-boleto').click()
        cy.get('#terms').check()
        cy.get('.btn').click()

        cy.get('h4').should('contain', `Obrigado pelo seu pedido ${nome}`)
        //TODO: Fazer funcionar isto: 
        //cy.get('#cart-count').should('have.text', '0');

        //Minha conta
        cy.get('#account-link').click()
        cy.get('#email').type(email)
        cy.get('#password').type(senha)
        cy.get('.btn').click()
        cy.get('legend').should('contain',  'Status do seu último Pedido')
    });

    it('Deve fechar o pedido sem usuário cadastrado', () => {
        cy.addProduto(10)
        cy.get('#totals > .btn').click()

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

    it('Deve fazer o teste de ponta a ponta com senha', () => {
        cy.addProduto(10)
        cy.get('#totals > .btn').click()

        //Preencher dados
        let nome = "Fábio"
        let email = `email@${Date.now()}.com`
        cy.get('#first-name').type('Fábio')
        cy.get('#last-name').type('Araújo')
        cy.get('#address').type('Endereço qq')
        cy.get('#number').type('100')
        cy.get('#cep').type('12345678')
        cy.get('#phone').type('1155555555')
        cy.get('#email').type(email)
       // cy.get('#create-account').check()
        cy.get('#payment-pix').click()
        cy.get('#terms').check()
        cy.get('.btn').click()

        cy.get('h4').should('contain', `Obrigado pelo seu pedido ${nome}`)
        cy.get('#cart-count').should('have.text', '0');
    });

    it('Validar página de produtos', () => {
        cy.contains('Xícara Const').click()
        cy.get('#add-to-cart').click()
        cy.get('#cart-count').then((el) =>{
            expect(el).not.eq(0)
        })
        cy.get('#alert-container').should('contain', 'Produto adicionado ao carrinho')
        cy.get('.btn-secondary').click()
        cy.get('h1').should('contain', 'Sua Melhor Experiência de Compra Está Aqui!')
    });

    it('Remover produto do carrinho', () => {
        cy.addProduto(10)
        cy.get('.cart-item > .btn').click()
        cy.get('#cart-list > .text-center > p').should('contain', 'Seu carrinho está vazio')
        cy.reload()
        cy.get('#cart-count').should('have.text', '0')
    });

    it('Validar cadastro sem campos obrigatórios', () => {
        cy.addProduto(10)
        cy.get('#totals > .btn').click()
        cy.get('#create-account').check()
        cy.get('.btn').click()
        cy.get('#alert-container').should('exist')
        cy.contains('Este campo é obrigatório.').should('exist')
        cy.contains('O CEP deve ter 8 caracteres.').should('exist')
        cy.contains('Por favor, insira um email válido.').should('exist')
        cy.contains('A senha deve conter no mínimo 6 caracteres, incluindo uma letra maiúscula e um caractere especial.').should('exist')
        cy.contains('Este campo é obrigatório.').should('exist')
    });
   
});