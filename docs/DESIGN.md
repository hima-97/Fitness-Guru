# FitnessGuru Design

## Overview
[FitnessGuru Design Diagram.pdf](https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/files/7664869/FitnessGuru.Design.Diagram.2.pdf)


## User Flow
[User Flow.pdf](https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/files/7664471/User.Flow.1.pdf)


## Team Decisions

- Using MERN Stack
  - MongoDB used for database
  - Express and Mongoose used for server side logic
  - React.js used for front end
  - Node.js used for backend
- Using Google Oauth for authentication
- Creating pages for users to create lists of exercises, workouts, and splits (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint02/sprint02.md)
- Allow for users to select from pre-made exercises to add to their exercise list (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint03/sprint03.md)
- Allow for users to record their weights and reps for specific exercises and check their progress by being able to view charts that display their logged data (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint03/sprint03.md)
- Allow users to make their splits public and view other users' splits that have been made public (https://github.com/ucsb-cs148-f21/project-t03-fitnessguru/blob/main/team/sprint03/sprint03.md)
- We started by creating basic pages like the profile page and MyExercises page for the MVP. From there, we built out our more advanced pages like the MyWorkouts, MySplits, MyProgress, and Public Splits pages.

## Specifics
- Pages: Home, Profile, MyExercises, MyWorkouts, MySplits, MyWeights, Progress

  - Home
    - Prompts user with a welcome message
  - Profile
    - Connected to MongoDB database via Node.js backend
    - Allows user to log profile picture, name, weight, height, and notes
  - MyExercises
    - Connected to MongoDB database via Node.js backend
    - Lists all exercises that user has added to their exercises list
    - User can create a new exercise (CreateExercise component) which allows them to select from wgerAPI's exercises or create a custom one
    - User can edit and delete exercises
  - MyWorkouts
    - Connected to MongoDB database via Node.js backend
    - Lists all workouts that user has added to their workouts list
    - User can create a new workout (CreateWorkout component) which allows them to add different exercises to a new workout
      - Any new exercises from the new workout will be added to the MyExercises page
    - User can log exercise information (repetitions and weight) for exercises within workouts. This information is automatically updated on the MyWeights page, where it can then be visualized on the MyProgress page.
    - User can edit and delete workouts
  - MySplits
    - Connected to MongoDB database via Node.js backend
    - Lists all Splits that user has added to their splits list
    - User can create a new split, and add workouts to the split.
    - User can edit and delete splits
    - User can make split public
  - Public Splits
    - Lists all splits that have been made public by all users
    - Users are able to copy these splits into their own MySplits page.
  - MyWeights
    - User can log their weights that they lifted for specific exercises from the MyExercises page
    - This information is posted to the MongoDB database via Node.js backend
  - Progress
    - User can select an exercise and the number of reps to see a chart of their progress for that given exercise for that amount of reps.
