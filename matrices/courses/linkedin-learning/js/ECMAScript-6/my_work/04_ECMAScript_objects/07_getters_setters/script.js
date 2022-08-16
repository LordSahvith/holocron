let attendance = {
    _list: [],
    set addName(name) {
        this._list.push(name);
    },
    get list() {
        return this._list.join(', ');
    }
};

attendance.addName = 'bob';
attendance.addName = 'whaddamean';
console.log(attendance.list);

class Hike {
    constructor(distance, pace) {
        this.distance = distance;
        this.pace = pace;
    }

    get lengthInHours() {
        return `${this.calcLength()} hours`;
    }

    calcLength() {
        return this.distance / this.pace;
    }
}

const trail = new Hike(10, 2);
console.log(trail.lengthInHours);
