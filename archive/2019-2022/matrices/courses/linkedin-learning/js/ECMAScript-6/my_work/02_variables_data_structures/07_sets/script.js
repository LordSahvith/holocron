let books = new Set();
books.add('Black Flag');
books.add('Unity').add('Rule of Two');
books.add('Oliver Twist');
books.add('Rule of Two');

console.log(books);

books.forEach(function(book) {
    console.log(book);
});

books.delete('Oliver Twist');

console.log(books);
console.log('Rule of Two', books.has('Rule of Two'));