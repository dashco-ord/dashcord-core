import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When(`I visit {string}`, (url: string) => {
  cy.visit(`https://${url}`);
});
