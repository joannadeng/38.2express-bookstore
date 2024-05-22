process.env.NODE_ENV = "test";

const jsonschema = require('jsonschema');
const db = require('../db');
const Book = require('../models/book');
const bookSchema = require('../schema/schema')


describe('Test book class', function() {
    beforeEach(async function(){
        await db.query("DELETE FROM books");
    
    const data = {
        "isbn": "0691161518",
        "amazon_url": "http://a.co/eobPtX2",
        "author": "Matthew Lane",
        "language": "english",
        "pages": 264,
        "publisher": "Princeton University Press",
        "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
        "year": 2017
      }
      const book = await Book.create(data);
    })
  
    test("create a book successfully", async function(){
        const newData = {
            "isbn": "0691161519",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "French",
            "pages": 200,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2018
          }
        const book = await Book.create(newData);
        expect (jsonschema.validate(book, bookSchema).valid).toBe(true);
        const result = await Book.findAll();
        expect(result.length).toBe(2)
       
    })

    test("invalid schema", async function(){
        const data = {
            "isbn": "0691161520",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "english",
            "pages": 264,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games"
          }
        const book = await Book.create(data);
        expect (jsonschema.validate(book, bookSchema).valid).toBe(false);
    })
})

describe("update a book", function(){
    test("updata a book successfully", async function(){
        const data = {
            "isbn": "0691161518",
            "amazon_url": "http://a.co/eobPtX2",
            "author": "Matthew Lane",
            "language": "Chinese",
            "pages": 324,
            "publisher": "Princeton University Press",
            "title": "Power-Up: Unlocking the Hidden Mathematics in Video Games",
            "year": 2020
          }

        const result = await Book.update(data.isbn,data);
        expect (result.year).toBe(2020)
    })
})



afterAll(async function(){
    await db.end();
});
    
