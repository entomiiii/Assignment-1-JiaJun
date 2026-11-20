const audiobooks = [
    { id: "A001", title: "Project Hail Mary", genre: "Science Fiction", totalCopies: 1 },
    { id: "A002", title: "Lord of the Rings", genre: "Fantasy", totalCopies: 2 },
    { id: "A003", title: "Harry Potter", genre: "Fantasy", totalCopies: 1 },
    { id: "A004", title: "Moby Dick", genre: "Fiction", totalCopies: 3 },
    { id: "A005", title: "Sherlock Holmes", genre: "Mystery", totalCopies: 2 },
    { id: "A006", title: "Knifes Out", genre: "Mystery", totalCopies: 1 },
    { id: "A007", title: "A Garden Above the City", genre: "Fiction", totalCopies: 2 },
    { id: "A008", title: "The Station Beyond Neptune", genre: "Science Fiction", totalCopies: 3 }
];

const loans = [];

const lending = {
    //  Get all books 
    getAllBooks() {
        const books = [];

        for (const book of audiobooks) {
            books[books.length] = {
                id: book.id,
                title: book.title,
                genre: book.genre,
                totalCopies: book.totalCopies,
            };
        }

        return books;
    },

    //  Search using an exact genre.
    searchByGenre(genre) {
        const matchingBooks = [];

        for (const book of audiobooks) {
            if (book.genre === genre) {
                matchingBooks[matchingBooks.length] = {
                    id: book.id,
                    title: book.title,
                    genre: book.genre,
                };
            }
        }

        return matchingBooks;
    },

    //  Check availability by exact book ID or full title.
    checkAvailability(bookIdOrTitle) {
        let selectedBook;

        for (const book of audiobooks) {
            if (book.id === bookIdOrTitle ||
                book.title === bookIdOrTitle) {
                selectedBook = book;
                break;
            }
        }

        if (!selectedBook) {
            throw new Error("Audiobook not found. Enter the exact ID or full title.");
        }

        let borrowedCopies = 0;

        for (const loan of loans) {
            if (loan.audiobookId === selectedBook.id &&
                loan.status === "active") {
                borrowedCopies++;
            }
        }

        return selectedBook.totalCopies - borrowedCopies;
    },

    // Borrow one copy using its exact book ID.
    borrowAudiobook(readerId, audiobookId, borrowDate, dueDate) {
        readerId = readerId.trim();

        let selectedBook;

        for (const book of audiobooks) {
            if (book.id === audiobookId) {
                selectedBook = book;
                break;
            }
        }

        for (const loan of loans) {
            if (loan.readerId === readerId &&
                loan.audiobookId === audiobookId &&
                loan.status === "active") {
                throw new Error("You already have an active loan for this book.");
            }
        }

        if (lending.checkAvailability(audiobookId) <= 0) {
            throw new Error("No copies are available.");
        }

        if (dueDate <= borrowDate) {
            throw new Error("Due date must be after the borrow date.");
        }

        const loan = {
            id: "L" + (loans.length + 1),
            readerId: readerId,
            audiobookId: audiobookId,
            borrowDate: borrowDate,
            dueDate: dueDate,
            status: "active"
        };

        loans[loans.length] = loan;

        return {
            id: loan.id,
            readerId: loan.readerId,
            audiobookId: loan.audiobookId,
            borrowDate: loan.borrowDate,
            dueDate: loan.dueDate,
            status: loan.status
        };
    },

    // View a reader's active loans.
    viewActiveLoans(readerId) {
        const activeLoans = [];

        for (const loan of loans) {
            if (loan.readerId === readerId && loan.status === "active") {
                activeLoans[activeLoans.length] = {
                    id: loan.id,
                    readerId: loan.readerId,
                    audiobookId: loan.audiobookId,
                    borrowDate: loan.borrowDate,
                    dueDate: loan.dueDate,
                    status: loan.status
                };
            }
        }

        return activeLoans;
    },

    //  Return a book using its loan ID.
    returnAudiobook(loanId) {
        for (const loan of loans) {
            if (loan.id === loanId && loan.status === "active") {
                loan.status = "returned";

                return {
                    id: loan.id,
                    readerId: loan.readerId,
                    audiobookId: loan.audiobookId,
                    borrowDate: loan.borrowDate,
                    dueDate: loan.dueDate,
                    status: loan.status
                };
            }
        }

        throw new Error("Active loan not found.");
    },

    //  Return active loans that have passed their due dates.
    processOverdueLoans(currentDate) {
        const returnedLoans = [];

        for (const loan of loans) {
            if (loan.status === "active" && loan.dueDate < currentDate) {
                loan.status = "returned";

                returnedLoans[returnedLoans.length] = {
                    id: loan.id,
                    readerId: loan.readerId,
                    audiobookId: loan.audiobookId,
                    dueDate: loan.dueDate,
                    status: loan.status
                };
            }
        }

        return returnedLoans;
    }
};


module.exports = lending;