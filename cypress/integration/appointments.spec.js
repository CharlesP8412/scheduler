describe("Appointment", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {
    cy.get('[alt=Add]')
      .first()
      .click();

    cy.get('[data-testid=student-name-input]').type('Lydia Miller-Jones');
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save').click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });

  it("Edit an interview", () => {
    //Click Edit
    cy.get("[alt='Edit']")
    .first()
    .click({ force: true });

    //Change Appt
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
    //Click Save
    cy.contains('Save').click();
    //Cfm Update
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");

  });

  it("Edit an interview", () => {
    cy.get("[alt='Delete']")
      .first()
      .click({ force: true });

    //Click Save
    cy.contains('Confirm').click();
    //Cfm Update
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Lydia Miller-Jones").should('not.exist');
  });

});
