import Book from "./Book.js";

const lotr = new Book(
    "The Lord of The Rings",
    "leather bound",
    383,
    "fantasy"
);

console.log(lotr);
console.log(lotr.currentPage = 382);
console.log(lotr.turnPage());