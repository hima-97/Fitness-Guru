# Testing Approach of FitnessGuru

1)
For our unit test requirement from the previous lab, we used the react testing library and we tested the home page of our app. 
This unit test assures that the home page renders without crashing.

2)
Going forward, given the time constraint, I believe we will not go forward with unit tests to test functions and components. Instead, we plan on using higher level testing. We are restricted with time and we think higher level tests will be more beneficial for us to determine whether the user functionality 
components function well in the user's point of view.

3)
For our integration testing requirement from this week's lab, we performed front end integration testing on the Navbar component.
- We used the react testing library, which works more directly with DOM nodes, along with Jest for improved assertions.
- We tested that the Navbar component renders correctly without crashing.
- We tested that the Navbar component correctly displays the Home page button before a user is logged in.
- We tested that the Navbar component correctly displays the user's full name after a user is logged in.
- We tested that the Navbar component correctly displays the Profile page button after a user is logged in.
- We tested that the Navbar component correctly displays the My Exercises page button after a user is logged in.
- We tested that the Navbar component correctly displays the My Workouts page button after a user is logged in.
- We tested that the Navbar component correctly displays the My Splits page button after a user is logged in.
- We tested that the Navbar component correctly displays the My Weights page button after a user is logged in.

4)
Going forward, if the time allows us, we want to implement high-level testing for both front end and back end.
We would keep using the react test library along with Jest to write our tests so that we have a TDD approach when building the web application.
This would allow us to make sure that all the components work well together and provide more user functionality.
