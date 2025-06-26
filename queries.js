//TASK 
//Basic CRUD operations

// Find all books in a genre (e.g., "Fantasy")
db.books.find({ genre: "Fantasy" })
// This will return "The Hobbit" and "The Lord of the Rings"

// Find books published after a year (e.g., 1950)
db.books.find({ published_year: { $gt: 1950 } })
// Returns: "To Kill a Mockingbird" (1960), "The Catcher in the Rye" (1951), 
// "The Lord of the Rings" (1954), and "The Alchemist" (1988)

// Find books by an author (e.g., "George Orwell")
db.books.find({ author: "George Orwell" })
// Returns: "1984" and "Animal Farm"

// Update a book's price (e.g., "The Hobbit" to 15.99)
db.books.updateOne(
  { title: "The Hobbit" },
  { $set: { price: 15.99 } }
)

// Delete a book by title (e.g., "Animal Farm")
db.books.deleteOne({ title: "Animal Farm" })


//TASK 3
//Advanced Querries

1.//Find books in stock published after 2010 (with projection):
   
   db.books.find({
     in_stock: true,
     published_year: { $gt: 2010 }
   }, {
     title: 1,
     author: 1,
     price: 1,
     _id: 0
   })
 
   //(Books in the dataset are published after 2010, so this will return an empty result.)

2.//Sort books by price (ascending and descending):
 
   // Ascending
   db.books.find().sort({ price: 1 })

   // Descending
   db.books.find().sort({ price: -1 })
  

3.//Pagination (5 books per page, skip for page 2):
   //Page 1 (Books 1-5)
   db.books.find().limit(5)

   //Page 2 (Books 6-10)
   db.books.find().skip(5).limit(5)
   

 

//TASK 4:
//AGGREGATION PIPELINE

1.//Average price by genre:
   db.books.aggregate([
     { $group: { 
         _id: "$genre", 
         avgPrice: { $avg: "$price" } 
     }}
   ])
 

2.//Author with the most books:
   db.books.aggregate([
     { $group: { 
         _id: "$author", 
         bookCount: { $sum: 1 } 
     }},
     { $sort: { bookCount: -1 } },
     { $limit: 1 }
   ])
   
//Will Return J.R.R. Tolkien or George Orwell, each with 2 books.

3.//Group books by publication decade:
   db.books.aggregate([
     { $project: { 
         decade: { 
           $subtract: [ 
             "$published_year", 
             { $mod: ["$published_year", 10] } 
           ] 
         } 
     }},
     { $group: { 
         _id: "$decade", 
         count: { $sum: 1 } 
     }},
     { $sort: { _id: 1 } }
   ])
    
//Will return 1810s (1), 1840s (1), 1850s (1), 1930s (2), 1940s (2), 1950s (3), 1980s (1)

 

//TASK 5:
//INDEXING

1. //Create an index on `title` for faster searches:
   db.books.createIndex({ title: 1 })
   

2. //Create a compound index on `author` and `published_year`:
   db.books.createIndex({ author: 1, published_year: 1 })
 

3. //Performance comparison with `explain()`:
    
   //Without index (COLLSCAN)
   db.books.find({ title: "The Hobbit" }).explain("executionStats")

   //With index (IXSCAN)
   db.books.find({ title: "The Hobbit" }).explain("executionStats")

   //Compound index usage
   db.books.find({ 
     author: "George Orwell", 
     published_year: { $gt: 1940 } 
   }).explain("executionStats")
 
   //(`explain()` will show whether the query uses an index (`IXSCAN`) or a full collection scan (`COLLSCAN`). The indexed queries should be faster.)*

 