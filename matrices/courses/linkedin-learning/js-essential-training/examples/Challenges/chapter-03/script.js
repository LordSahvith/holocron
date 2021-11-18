import Book from "./Book.js";

const lotr = new Book(
    "The Lord of The Rings",
    "leather bound",
    383,
    "fantasy"
);

const nightAngel = new Book(
    "The Night Angel Trilogy",
    "paper bound",
    383,
    "fantasy"
);

console.log(lotr);
console.log(lotr.currentPage = 382);
console.log(lotr.turnPage());

console.log(nightAngel);
console.log(nightAngel.currentPage = 382);
console.log(nightAngel.turnPage());