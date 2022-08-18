class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    get getName() {
        return this.name;
    }

    get getAge() {
        return this.age;
    }

    get printName() {
        $('.printName').append(this.getName);
    }
}