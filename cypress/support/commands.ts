Cypress.Commands.add("signup", ({ email, password }) => {
  cy.contains("a", "Sign Up").click()

  cy.contains("Email").find("input").type(email)
  cy.contains("Password").find("input").type(password)
  cy.contains("button", "Create Account").click()
})

export {}
