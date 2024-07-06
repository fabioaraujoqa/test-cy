class LoginPage {
    // Seletores
    campoEmail() {
      return cy.get("#email");
    }
  
    campoSenha() {
      return cy.get("#password");
    }
  
    botaoEnviar() {
      return cy.get(".btn");
    }
  
    // Métodos de Ações
    visitarUrlLogin() {
      cy.visit("login.html");
    }
  
    fazerLogin(email, senha) {
      this.campoEmail().clear().type(email);
      this.campoSenha().clear().type(senha);
      this.botaoEnviar().click();
    }
  }
  
  export default new LoginPage();
  