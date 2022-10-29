describe('Login to the QA Application', () => {
  beforeEach(() => {
    cy.visit("https://app.qa.formuslabs.com")
  })

  it('Displays the login window', () => {
    // Ensuring the the user is shown the login form
    cy.get('form').should('be.visible').within((loginForm) => {
      // Validating the header texts within the login window
      cy.get('span').should('have.class', 'headline').contains('Login')
      cy.get('span').should('have.class', 'pa-2').contains('(Formus Labs QA Server)')

      // Validating the email entry field
      cy.get('input[type=email]').should('have.length', 1).and('not.be.disabled')
      // Validate forgot password button
      cy.get('input[type=password]').should('have.length', 1).and('not.be.disabled')
    })
  })

  it('Enters the email', () => {
    cy.get('form').within(() => {
      cy.get('input[type=email]').type('ravik@formuslabs.com')
    })
  })

  it('Enters the password', () => {
    cy.get('form').within(() => {
      cy.get('input[type=password]').type('ravik')
    })
  })
  // TODO: Investigate and fix the reloading issue between it() steps
})