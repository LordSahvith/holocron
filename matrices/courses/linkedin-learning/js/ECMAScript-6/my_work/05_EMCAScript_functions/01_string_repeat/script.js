let yell = 'woo!';

let party = yell.repeat(20);

console.log(party);

let cat = {
    meow(times) {
        console.log('meow'.repeat(times));
    },
    purr(times) {
        console.log('prrrr'.repeat(times));
    },
    snore(times) {
        console.log('zZzZ'.repeat(times));
    }
};

cat.meow(4);
cat.purr(5);
cat.snore(2);
