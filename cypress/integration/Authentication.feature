Feature: Authentication System
    Testing The Authentication System For Dashcord

  Scenario: Login as A student
    When I try to login with "Rick.Leffler@yahoo.com" as email and "Rick.Leffler@yahoo.com" as password
    Then I should see "Dashcord - Home" as the "title"

  Scenario: User want's to Logout
    Given I open "signout" page
    When I click "signout"
    Then I should see "Please Login" as the "h1"

  Scenario: Login as A TG
    When I try to login with "Ronaldo_Lehner@gmail.com" as email and "Ronaldo_Lehner@gmail.com" as password
    Then I should see "Dashcord - Home" as the "title"

    Scenario: Login as A incharge
        When I try to login with "Rick.Leffler@yahoo.com" as email and "Rick.Leffler@yahoo.com" as password
        Then I should see "Dashcord - Home" as the "title"
