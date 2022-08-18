class vehicle {
    constructor(description, wheels) {
        this.description = description;
        this.wheels = wheels;
    }

    describeYourself() {
        console.log(`I am a ${this.description} with ${this.wheels} wheels.`);
    }
}

let sedan = new vehicle('Sedan', 4);

sedan.describeYourself();
