RUNNING PROJECT AND SCRIPTS - MWANGI JOSPHAT KARANJA MERN WK1 ASSIGNMENT

This project demonstrates basic and advanced MongoDB operations on a bookstore database, including CRUD operations, advanced queries, aggregation pipelines, and indexing optimizations.

 Prerequisites

- MongoDB installed locally or accessible via a connection string
- Node.js (For running JavaScript scripts)
- MongoDB Compass

 
1. Start MongoDB  
Type in the windows command prompt:
   mongod
   
2. Ensure you have database called plp_bookstore
3. Inside plp_bookstore, make sure you have a collection named books
4. Ensure also you have db.js which connects to the database and book.js which holds main data and operations as well as app.js which is our entry file.

5. Configure db.js to read database `plp_bookstore`
   async function connectDB(){
    await client.connect();
    return client.db('plp_bookstore').collection('books');
}

6. Using node in the cmd,
Run:
node insert_books.js topopulate data in the books collection

7. Now you can use the below querries toperform CRUD operations on the existing data in the plp_bookstore

.Access the MongoDB Shell/or use Command prompt  
Open the MongoDB shell to run queries:
 
mongosh
  
 
Running the Scripts

CRUD Operations
 
 
// Find all books
db.books.find()

// Insert a new book
db.books.insertOne({
  title: "Enter Book name",
  author: "Enter Book Author",
  genre: "Enter Book genre",
  published_year: //Enter Book publication year,
  price: //Enter Book price,
  in_stock: //Enter Book status..Whether in stock or not,
  pages: //Enter the number of pages for the particular book you want to add,
  publisher: "Enter the Publisher of the book"
})

// Update a book's price
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.99 } }
)

// Delete a book
db.books.deleteOne({ title: "Animal Farm" })
 
 
// Find books in stock published after 1950 (with projection)
db.books.find(
  { in_stock: true, published_year: { $gt: 1950 } },
  { title: 1, author: 1, price: 1, _id: 0 }
)

// Sort books by price (descending)
db.books.find().sort({ price: -1 })

// Pagination (5 books per page)
db.books.find().skip(5).limit(5) // Page 2
 

 
// Average price by genre
db.books.aggregate([
  { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }
])

// Author with most books
db.books.aggregate([
  { $group: { _id: "$author", bookCount: { $sum: 1 } } },
  { $sort: { bookCount: -1 } },
  { $limit: 1 }
])

// Books grouped by publication decade
db.books.aggregate([
  { $project: { decade: { $subtract: ["$published_year", { $mod: ["$published_year", 10] }] } } },
  { $group: { _id: "$decade", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
 

//Indexing & Performance
 
Create indexes
db.books.createIndex({ title: 1 })
db.books.createIndex({ author: 1, published_year: 1 })

Check query performance
db.books.find({ title: "1984" }).explain("executionStats")
 

What I expect:

1. CRUD Operations:  
   - Successful inserts/updates/deletes.
   - Modified book prices and stock statuses.

2. Advanced Queries:  
   - Filtered lists (e.g., in-stock books).
   - Sorted results by price/author.
   - Paginated output (5 books per page).

3. Aggregations:  
   - Average price per genre (e.g., `Fiction: $10.99`).
   - Top author (e.g., `J.R.R. Tolkien` with 2 books).
   - Decadal counts (e.g., `1950s: 3 books`).

4. Indexing:  
   - Faster queries confirmed via `explain()` (`IXSCAN` instead of `COLLSCAN`).

 

 