class Book {
  constructor(
    name,
    type,
    pageNum,
    currentPage,
    readStatus
  ) {
      this.name = name;
      this.type = type;
      this.pageNum = pageNum;
      this.currentPage = currentPage;
      this.readStatus = readStatus
  }

  updateCurrentPage(newPage) {
      this.currentPage = newPage;
  }

  updateReadStatus(newStatus) {
      this.readStatus = newStatus;
  }
}

export default Book;
