const lending = require("./RenJiaJun_AudiobookLending.js");

//Display all books.
console.log("All books:", lending.getAllBooks());

//Search by genre.
console.log("Mystery books:", lending.searchByGenre("Mystery"));

//availability by ID title.
console.log("Available by ID:", lending.checkAvailability("A002")); // 2
console.log(
    "Available by title:",
    lending.checkAvailability("Harry Potter")
); 

//Borrow
const jimLoan = lending.borrowAudiobook(
    "Jim", "A002", "2026-11-20", "2026-12-04"
);

console.log("Jim's new loan:", jimLoan);

//Jim tries to borrow the same book again.
try {
    lending.borrowAudiobook(
        "Jim", "A002", "2026-11-20", "2026-12-04"
    );
} catch (error) {
    console.log("Jim's duplicate attempt:", error.message);
}

//Sam borrows the remaining copy.
const samLoan = lending.borrowAudiobook(
    "Sam", "A002", "2026-11-20", "2026-12-10"
);

console.log("Sam's new loan:", samLoan);
console.log("Copies remaining:", lending.checkAvailability("A002")); // 0

//Alex tries to borrow when all copies are taken.
try {
    const alexLoan = lending.borrowAudiobook(
        "Alex", "A002", "2026-11-20", "2026-12-04"
    );

    console.log("Alex's new loan:", alexLoan);
} catch (error) {
    console.log("Alex's borrowing attempt:", error.message);
}

// 5. View active loans.
console.log("Jim's active loans:", lending.viewActiveLoans("Jim"));
console.log("Sam's active loans:", lending.viewActiveLoans("Sam"));
console.log("Alex's active loans:", lending.viewActiveLoans("Alex")); // []

// 6. Return Sam's loan manually.
console.log("Manual return:", lending.returnAudiobook(samLoan.id));
console.log("Copies after manual return:", lending.checkAvailability("A002")); // 1

// 7. Process overdue loans.
console.log(
    "AutoReturn Overdue Loan:",
    lending.processOverdueLoans("2026-12-05")
);

console.log("Copies after processing:", lending.checkAvailability("A002")); // 2
console.log("Jim's active loans:", lending.viewActiveLoans("Jim")); // []