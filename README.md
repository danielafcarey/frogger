# Game Time - Frogger

## Project Requirements
Learn object oriented programming (OOP) principles by building a game that is playable in the browser.

### Goals
* Use OOP to drive the design of the game and the code
* Separate business-logic code from view-related code
* Create a robust test suite that thoroughly tests all functionality of a client-side application


### Playability Features
We want your game to be full-featured and playable — not just a proof of concept of the gameplay and rendering features.

To this end, make sure to include sufficient UX to allow the user to fully interact with the game. This would include:

* Indicate when the game is over and won or lost
* Allow the user to start a new game
* Display a score (if applicable)
* Include a clean UI surrounding the actual game interface itself, including thorough instructions
* Create multiple rounds of difficulty (consider increasing factors such as game speed, randomness of starting setup, etc)

### Code organization
Your game should make use of at least two classes; the exact number will depend on which game you choose and your design choices.

You should use inheritance with your classes.

Each class should have its own file with the filename capitalized. The class should be capitalized as well. Only code that is a part of this class should be in this file.

### User Interface
The UI of the game should be clean, intuitive, and informative:

* instructions to begin and play the game
* tell the user when the game is over (due to losing, winning, or completing the game)
* tell the user the score or number of lives remaining (if applicable)
allow the user to start a new game
* If your game uses the arrow keys, you should prevent the page from scrolling when the arrow keys are pressed.

### Testing
Each javascript file in your project should have its own test file e.g. if you have a MasterChief.js class file, all the tests for that class should be located in MasterChief-test.js

The test suite will test all functionality of the game (excepting anything touching the DOM):

* Class default properties
* Class methods
* Anything that updates class properties
* Class interactions (e.g. a ball colliding with a brick, a frog landing on a lilypad, a score or level incrementing, etc)


