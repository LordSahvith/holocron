let studentList = function(students) {
    console.log(students);
};

studentList(['A', 'b', 'C']);

let studentListArrow = (students) => {
    console.log(students);
};

studentListArrow(['A', 'b', 'C']);

let studentListArrowSimplified = (students) => console.log(students);

studentListArrowSimplified(['A', 'b', 'C']);

let list = ['apple', 'banna', 'orange'];

list.map(function(item) {
    console.log(item);
});

list.map((item) => {
    console.log(item);
});

list.map((item) => console.log(item));
