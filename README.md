#Team task manager with JS

This application is designed as a management tool for teams.

## Usage

To use this app, just clone, and run 'rails s'.

When creating a user you must select which team they are apart of or create one, and you must select their position within a team (1 = lowest ranking).
A base user(position of 1) on its own is able to create to-do lists, check off their completed tasks, view all their uncompleted tasks, and view their team's page and teammate's tasks but are not able to edit them or create lists for them.

If you are a team member with a ranking above other team members, you have all the functionality of a base user plus, from the team page you are able to create to-do lists for your employees, check off their completed tasks, and delete any of their to-do lists.

This allows for a hierarchical team structure, which so many teams are, and functionality for the app.

The Javascript additions allow a user to dynamically
  - View their lists from the users homepage by clicking the lists link, the user may then select a list to go to said list's page.
  - Switch between lists that belong to the user by clicking the next or previous buttons from the list show View
  - Add tasks to a list if you are the list owner from the list show view



Enjoy!


MIT open source license
