function print(firstName) {
    console.log(`Hello ${firstName}`);
}

print('Lord Savith');

function createEmail(firstName, price) {
    let shipping = 5.95;
    console.log(`
    Hi ${firstName}! Thanks!
    Total: $${price}
    Shipping: $${shipping}
    Grand Total: $${price + shipping}
    `);
}

createEmail('the dude', 9000);
