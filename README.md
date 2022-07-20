# The boiler plate code from https://github.com/thecodercoder/frontend-boilerplate

## Quickstart guide

- Clone or download this Git repo onto your computer.
- Install [Node.js](https://nodejs.org/en/) if you don't have it yet.
- Run `npm install`
- Run `gulp bs` to run the default Gulp task

In this proejct, Gulp is configured to run the following functions:

- Compile the SCSS files to CSS
- Autoprefix and minify the CSS file
- Concatenate the JS files
- Uglify the JS files
- Move final CSS and JS files to the `/dist` folder

---

### Deconstruction of Wordle:

#### Html/SCSS:

<ul>
    <li>
        We need a main container that contains 6x5 divs (Can be done using JS)
    </li> 
    <li>
        Use grid to control main container
    </li>
    <li>
        Each div must have a class that controls its color 
    </li>
    <li>
        In the bottom there must a keyboard div, which contains each letter (can be done in JS)
    </li>
    <li>
        Each letter div must have a class controlling its color
    </li>
</ul>
#### JS:

- setup important global variables

  - Guesses remaning
  - Current Inputed Guesses
  - Correct Word

- Use keydown eventListiner to call a function called "changeContext"
  - changeContext checks if the button pressed was the Enter button, if it is, it runs another function called isCorrect
    -If not it runs another function called changeLetter, which changes the letter of the current row
