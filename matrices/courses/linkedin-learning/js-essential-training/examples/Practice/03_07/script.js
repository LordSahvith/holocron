/**
 * Practice: Building objects
 *
 * - Create JavaScript objects based on objects in your current environment.
 * - Give each object an identifiable name.
 * - Create properties to describe the objects and set their values.
 * - Find an object that has another object inside of it to create a nested object.
 * - Test your objects in the browser console by accessing the entire object and its specific properties.
 */

const gameConsole = {
    name: "Xbox One X",
    color: "black",
    power: "AC",
    usbPorts: "3",
    game: {
        name: "Red Dead Redemption 2",
        isDisc: false,
        size: "95gb"
    },
    isRunning: false,
    startGame: function () {
        this.isRunning = true;
        this.startUpMessage(this.game);
    },
    startUpMessage: function (game) {
        console.log(game.name, "has started.");
    }
};