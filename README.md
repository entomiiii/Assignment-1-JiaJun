# Assignment 1 Audiobook Lending Manager

Author: Ren Jia Jun

This Node module simulates an audiobook library inspired by Libby. Users can browse books, search by genre, check availability, borrow and return books, view their active loans, and process returns for loans past their due dates.
Book and loan records are stored in arrays.

## Functions

| Function | Parameters | Expected Returns |
| --- | --- | --- |
| `getAllBooks()` | None | An array of all books with their IDs, titles, genres, total copies, and available copies. |
| `searchByGenre(genre)` | Exact genre string, such as `"Mystery" or "Fantasy"`. | An array of matching books and their available copies.  |
| `checkAvailability(bookIdOrTitle)` | Exact book ID or full title, such as `"A002"` or `"Lord of the Rings"`. | The number of available copies. Throws an error if the book cannot be found. |
| `borrowAudiobook(readerId, audiobookId, borrowDate, dueDate)` | Reader ID, exact book ID, borrow date, and due date. All of the above are string. | A new loan record containing its ID, reader ID, book ID, dates, and active status. |
| `viewActiveLoans(readerId)` | Reader ID matching the one stored when borrowing. | An array of the reader's active loans.|
| `returnAudiobook(loanId)` | Loan ID obtained from a successful borrowing result. | The returned loan record with status `"returned"`. |
| `processOverdueLoans(currentDate)` | A date string used to check due dates. | An array of loans returned during this call. |


## Usage example

Run this complete example in a fresh program session:

```js
const lending = require("./RenJiaJun_AudiobookLending.js");

//  Browse the catalogue.
console.log("All books:", lending.getAllBooks());

//  Search using an exact genre.
console.log("Mystery books:", lending.searchByGenre("Mystery"));

//  Check availability using an exact ID or full title.
console.log("Available by ID:", lending.checkAvailability("A002")); // 2
console.log(
    "Available by title:",
    lending.checkAvailability("Lord of the Rings")
); // 2

//  Jim borrows one copy.
const jimLoan = lending.borrowAudiobook(
    "Jim", "A002", "2026-11-20", "2026-12-04"
);
console.log("Jim's new loan:", jimLoan);

// Jim's duplicate borrowing attempt fails.
try {
    lending.borrowAudiobook(
        "Jim", "A002", "2026-11-20", "2026-12-04"
    );
} catch (error) {
    console.log("Duplicate attempt:", error.message);
}

// Sam borrows the remaining copy.
const samLoan = lending.borrowAudiobook(
    "Sam", "A002", "2026-11-20", "2026-12-10"
);
console.log("Sam's new loan:", samLoan);
console.log("Copies remaining:", lending.checkAvailability("A002")); 

// Alex's attempt fails because all copies are borrowed.
try {
    lending.borrowAudiobook(
        "Alex", "A002", "2026-11-20", "2026-12-04"
    );
} catch (error) {
    console.log("Alex's attempt:", error.message);
}

// View active loans.
console.log("Jim's active loans:", lending.viewActiveLoans("Jim"));
console.log("Alex's active loans:", lending.viewActiveLoans("Alex")); 

// Return Sam's loan manually.
console.log("Manual return:", lending.returnAudiobook(samLoan.id));
console.log("Copies after manual return:", lending.checkAvailability("A002")); 

// Check Jim's due date and process his return.
console.log("On the due date:", lending.processOverdueLoans("2026-12-04")); 
console.log("Returned after due date:", lending.processOverdueLoans("2026-12-05"));
console.log("Copies after processing:", lending.checkAvailability("A002")); 
console.log("Jim's active loans:", lending.viewActiveLoans("Jim"));
```

I Use `try...catch` to display expected errors and continue testing.

## AI declaration

ChatGPT was used to generate ideas for application and generate mock data 

## References
- https://www.nlb.gov.sg/main/services/faqs/NLB-Mobile/get-started-with-libby
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
- https://nodejs.org/api/modules.html?