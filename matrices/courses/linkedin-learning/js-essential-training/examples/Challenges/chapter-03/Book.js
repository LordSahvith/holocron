class Book {
    constructor(
        name,
        coverType,
        pageCount,
        genre
    ) {
        this.name = name;
        this.coverType = coverType;
        this.pageCount = pageCount;
        this.genre = genre;
        this.isOpen = false;
        this.currentPage = 0;
    }
    openBook() {
        this.isOpen = true;
        console.log("Book opened.");
    }
    closeBook() {
        this.isOpen = false;
        console.log("Book closed.");
    }
    turnPage() {
        this.currentPage++;
        console.log("Page turned.");

        if (this.currentPage >= this.pageCount) {
            console.log(`You finished the ${this.name}!`);
        }
    }
};

export default Book;