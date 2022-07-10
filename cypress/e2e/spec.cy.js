describe('Homepage', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })
})

describe('Signup page -- successful signup', () => {
  it('successfully signs the user up', () => {
    cy.visit('http://localhost:3000/signup')

    cy.get('#email')
        .should('be.visible')
        .type('eve.holt@reqres.in');
    cy.get('#password')
        .should('be.visible')
        .type('Correctpassword@!1');
    cy.get('#passwordConfirmation')
        .should('be.visible')
        .type('Correctpassword@!1');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click();
    cy.url()
        .should("be.equals", "http://localhost:3000/")
  })
})


describe('Signup page -- failed signup', () => {
  it('fails due to an incorrect password', () => {
    cy.visit('http://localhost:3000/signup')

    cy.get('#email')
        .should('be.visible')
        .type('eve.holt@reqres.in');
    cy.get('#password')
        .should('be.visible')
        .type('wrongpassword');
    cy.get('#passwordConfirmation')
        .should('be.visible')
        .type('wrongpassword');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click();
    cy.get('.MuiAlert-message')
        .should('be.visible')
        .contains('password must contain at least 1 symbol')
    cy.url()
        .should("be.equals", "http://localhost:3000/signup")
  })
})

describe('Signin page -- successful sign in', () => {
  it('successfully signs in the user', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#email')
        .should('be.visible')
        .type('eve.holt@reqres.in');
    cy.get('#password')
        .should('be.visible')
        .type('Correctpassword@!1');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click();
    cy.url()
        .should("be.equals", "http://localhost:3000/")
  })
})

describe('Signin page -- failed sign in', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#email')
        .should('be.visible')
        .type('eve.holt@reqres.in');
    cy.get('#password')
        .should('be.visible')
        .type('wrongpassword');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click();
    cy.get('.MuiAlert-message')
        .should('be.visible')
        .contains('password must contain at least 1 symbol')
    cy.url()
        .should("be.equals", "http://localhost:3000/login")
  })
})


describe('As logged in user -- create new user successfully', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#email')
        .should('be.visible')
        .type('eve.holt@reqres.in');
    cy.get('#password')
        .should('be.visible')
        .type('correctPassowrd@1');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click();

    cy.url()
        .should("be.equals", "http://localhost:3000/")

    cy.get('#add-user')
        .should('be.visible')
        .click();

    cy.url()
        .should("be.equals", "http://localhost:3000/add")

    cy.get('#email')
        .should('be.visible')
        .type('test@reqres.in');
    cy.get('#first_name')
        .should('be.visible')
        .type('first');
    cy.get('#last_name')
        .should('be.visible')
        .type('last');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click()

    cy.url()
        .should("be.equals", "http://localhost:3000/")
  })
})

describe('As logged in user -- attempt to create user with missing email field', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('#email')
        .should('be.visible')
        .type('eve.holt@reqres.in');
    cy.get('#password')
        .should('be.visible')
        .type('correctPassowrd@1');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click();

    cy.url()
        .should("be.equals", "http://localhost:3000/")

    cy.get('#add-user')
        .should('be.visible')
        .click();

    cy.url()
        .should("be.equals", "http://localhost:3000/add")

    cy.get('#first_name')
        .should('be.visible')
        .type('first');
    cy.get('#last_name')
        .should('be.visible')
        .type('last');
    cy.get('button[type="submit"]')
        .should('be.visible')
        .click()

      cy.get('.MuiAlert-message')
        .should('be.visible')
        .contains('email is a required field')

    cy.url()
        .should("be.equals", "http://localhost:3000/add")
  })
})

