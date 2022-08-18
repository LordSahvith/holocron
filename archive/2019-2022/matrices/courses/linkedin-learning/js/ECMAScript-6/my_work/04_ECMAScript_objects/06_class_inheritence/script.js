class Vehicle {
    constructor(description, wheels) {
        this.description = description;
        this.wheels = wheels;
    }

    describeYourself() {
        console.log(`I am a ${this.description} with ${this.wheels} wheels.`);
    }
}

class SemiTruck extends Vehicle {
    constructor(description, wheels, doors) {
        super(description, wheels);
        this.doors = doors;
    }

    describeYourself() {
        console.log(`I am a ${this.description} with ${this.wheels} wheels & ${this.doors} doors.`);
    }
}

let storeSemi = new SemiTruck('semi truck', 18, 2);
storeSemi.describeYourself();
