class GameConsole {
    constructor(
        name, 
        color, 
        power, 
        usbPorts, 
        game, 
        isRunning
    ) {
        this.name = name;
        this.color = color;
        this.power = power;
        this.usbPorts = usbPorts;
        this.game = {
            name: game.name,
            isDisc: game.isDisc,
            size: game.size
        };
        this.isRunning = isRunning;
    }
    startGame() {
        this.isRunning = true;
        this.startUpMessage(this.game);
    }
    startUpMessage(game) {
        console.log(`${game.name} has started on your ${this.name}`);
    }
};

export default GameConsole;