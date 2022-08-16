let person = {
    first: 'savith',
    hobbies: ['eat', 'read', 'sleep', 'game'],
    printHobbies: function() {
        this.hobbies.forEach(function(hobby) {
            let string = `${this.first} like to ${hobby}`; // this is NOT scoped
            console.log(string);
        });
    }
}

person.printHobbies();

let personThisScoped = {
    first: 'savith',
    hobbies: ['eat', 'read', 'sleep', 'game'],
    printHobbies: function() {
        let _this = this;
        this.hobbies.forEach(function(hobby) {
            let string = `${_this.first} like to ${hobby}`; // this IS scoped
            console.log(string);
        });
    }
}

personThisScoped.printHobbies();

let personArrow = {
    first: 'savith',
    hobbies: ['eat', 'read', 'sleep', 'game'],
    printHobbies: function() {
        this.hobbies.forEach((hobby) => {
            let string = `${this.first} like to ${hobby}`; // this IS scoped
            console.log(string);
        });
    }
}

personArrow.printHobbies();
