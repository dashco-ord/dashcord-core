/// <reference types="cypress" />
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

const baseUrl = "http://localhost:3000/";
Given(`I open {string} page`, (endpoint) => {
  let path;
  switch (endpoint) {
    case "Home":
      path = baseUrl;
      break;
    case "Login":
      path = baseUrl + "login";
      break;
    default:
      path = baseUrl + endpoint;
      break;
  }
  cy.visit(path);
});

When(
  `I try to login with {string} as email and {string} as password`,
  (email, password) => {
    cy.login(email, password);
  }
);

Then(`I should see {string} as the {string}`, (value, location) => {
  cy.get(location).should("contain", value);
});

When(`I click {string}`, (id) => {
  cy.get(`#${id}`).click();
  cy.wait(4000);
});
