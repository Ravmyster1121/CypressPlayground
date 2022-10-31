describe('Test Login Form', () => {
	before(() => {
		cy.visit('https://app.qa.formuslabs.com')
	})

	it('Ensure login form is displayed', () => {
		cy.get('form').should('be.visible').within((form) => {
			cy.get('span').should('have.class', 'headline').contains('Login')
			cy.get('span').should('have.class', 'pa-2').contains('(Formus Labs QA Server)')

			cy.get('input[type=email]').should('have.length', 1).and('not.be.disabled')
			cy.get('input[type=password]').should('have.length', 1).and('not.be.disabled')
			cy.get('button[type=submit]').should('be.disabled')
		})
	})

	it('Typing in email', () => {
		// Entering email and making sure clear button appears
		cy.get('input[type=email]').type('ravik@formuslabs.com')
		cy.get('Button[aria-label="clear icon"]').should('be.visible')

		cy.get('button[type=submit]').should('not.be.enabled')
	})
	
	it('Typing in password', () => {
		cy.get('input[type=password]').type('badPassword')
		cy.get('button[type=submit]').should('be.enabled')
	})

	it('Submitting bad credentials', () => {
		// Clicking submit button to submit bad credentials
		cy.get('button[type=submit').click()
		cy.get('button[type=submit').should('not.be.enabled') // Submit button should become disabled after clicking

		// Verifying bad credentials message
		cy.get('div').contains('Login failed, your email address and/or password are incorrect')
	})

	it('Testing incorrect email formats', () => {
		// Empty email field 
		cy.get('input[type=email]').clear()
		cy.get('div').contains('Login email address is not valid.').should('be.visible')
		cy.get('button[type=submit]').should('be.disabled')
		
		// Email format without '@' or '.com'
		cy.get('input[type=email]').type('wrongFormatEmail')
		cy.get('div').contains('Login email address is not valid.').should('be.visible')
		cy.get('button[type=submit]').should('be.disabled')
		cy.get('Button[aria-label="clear icon"]').first().click()
		
		// Email including '.com'
		cy.get('input[type=email]').type('wrongFormatEmail.com')
		cy.get('div').contains('Login email address is not valid.').should('be.visible')
		cy.get('button[type=submit]').should('be.disabled')
		cy.get('Button[aria-label="clear icon"]').first().click()
		
		// Email including '@'
		cy.get('input[type=email]').type('wrong@Format')
		cy.get('div').contains('Login email address is not valid.').should('be.visible')
		cy.get('button[type=submit]').should('be.disabled')
	})
	
	it('Submitting correct credentials to login', () => {
		cy.get('Button[aria-label="clear icon"]').first().click()
		cy.get('Button[aria-label="clear icon"]').last().click()

		cy.get('input[type=email').type('ravik@formuslabs.com')
		cy.get('input[type=password').type('ravik')
		cy.get('button[type=submit').should('be.enabled').click()
	})
})

describe('Test dashboard view', () => [
	it('Waiting for dashboard to load', () => {
		cy.get('form').should('not.be.visible');
		cy.get('div.text-center').contains('Loading your Cases...').should('be.visible')
		cy.get('div[role=progressbar]').should('be.visible')

		// TODO figure out a way to get the value of the <h2></h2> span and cy.log it out
		cy.get('h2').contains(' Your Formus cases ').should('be.visible')
		cy.get('span[class=custom-grey--text]').should('contain', '(1964)')
		
	})

])