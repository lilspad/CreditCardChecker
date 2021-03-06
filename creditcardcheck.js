//this code still needs fixing; findInvalidCards() returns the newArr from validateCred() -> inverted and every other doubled

// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:

/*
validateCred() uses the Luhn algorithm to check if
the credit card number passed as a parameter is valid, 
returning true if it is, and false if it's invalid
*/
const validateCred = arr => {
    // declaring a new variable to hold the sum of all the numbers in an array
    let sum = 0;
    // substracting 1 from arr.length in order to match index values (starting at 0, rather than 1)
    let length = arr.length - 1;

    /*
    two functions: isOdd() checks if the length of an array is odd,
    then everyOther() uses isOdd() result (true or false) to return
    an equation for either checking if the index is even or odd.

    this is because the elements need to be counted from the right
    (last element) rather than left (first element), and the starting
    number has to be second to last, which means every other element's
    index will be either odd or even depending on the array length
    */
    const isOdd = x => x % 2 !== 0;

    const everyOther = index => {

        if (isOdd(length) === true) {
            return index % 2 === 0;
        } else {
            return index % 2 !== 0;
        }
    }

    // for loop that iterates through the array of numbers and adds the number to sum at the end of the loop
    for (i = length; i >= 0; i--) {
        let num = arr[i];

        // following Luhn's algorithm - every other number is mulptiplied by 2...
        if (everyOther(i)) {
            num *= 2;
        };
        // ...and after multiplication if the number is larger than 9, substract 9
        while (num > 9) {
            num -= 9;
        };
        sum += num;
    };
    /* 
    once all numbers have been added to sum, if the sum's modulo 10 is 0, the card number
    is likely valid, and the function returns true, otherwise it returns false
     */
    if (sum % 10 === 0) {
        return true;
    } else {
        return false;
    };
};

// findInvalidCards() checks a nested array such as batch provided above, and returns all the invalid cards
const findInvalidCards = nestedArr => {
    //declaring a new array to add invalid cards to
    let newNested = [];

    /*
    .forEach() executes validateCred() on each element
    of nestedArr and adds any element returning false
    to the newNested, thus creating an array of all invalid cards
    */
    nestedArr.forEach(card => {
        if (!validateCred(card)) {
            newNested.push(card);
        }
    });
    return newNested;
};
console.log(findInvalidCards([valid1, valid3, invalid1, invalid2]))

/*
purpose of idInvalidCardCompanies() is to return names of the
companies that issued the invalid cards, by checking the first
digit of each card number and compare it to four unique digits
identifying a company
*/
function idInvalidCardCompanies(invalidCards) {
    //new array to store all the company names
    let companyNames = [];

    /*
    this loop checks the first digit of each number found in the nested
    array, and uses switch case to push() the correct company name to
    companyNames, according to their unique number. if there is no
    corresponding number, it returns 'Company not found' instead
    */
    for (i = 0; i < invalidCards.length; i++) {

        let firstDigit = invalidCards[i][0];

        switch (firstDigit) {
            case 3:
                companyNames.push('Amex (American Express)');
                break;
            case 4:
                companyNames.push('Visa');
                break;
            case 5:
                companyNames.push('Mastercard');
                break;
            case 6:
                companyNames.push('Discover');
                break;
            default:
                companyNames.push('Company not found');
        }
    }

    //.filter() is applied to companyNames to get rid off duplicates 
    const finalNames = companyNames.filter((id, index) => companyNames.indexOf(id) === index);
    //final array with company names that issued invalid cards
    return finalNames;
}

console.log(idInvalidCardCompanies(findInvalidCards(batch)))
    // Expected output (given above example arrays): [ 'Visa', 'Mastercard', 'Amex (American Express)', 'Discover' ]