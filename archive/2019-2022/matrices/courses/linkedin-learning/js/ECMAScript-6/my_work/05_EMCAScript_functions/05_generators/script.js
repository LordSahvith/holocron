function* director() {
    yield 'step 1';
    yield 'step 2';
    yield 'step 3';
    yield 'step 4';
}

let countdown = director();

console.log(countdown.next().value);
console.log(countdown.next());
console.log(countdown.next());
console.log(countdown.next());
console.log(countdown.next());
