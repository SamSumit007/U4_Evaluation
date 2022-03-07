
const { response } = require("express");
const express = require("express");
const app = express();

app.get("", function(request, response){

    response.send("hello");

});


app.get("/books", function(request, response){
    const books = {
        Ulysses: `Ulysses chronicles the passage of Leopold Bloom through Dublin during an ordinary day, June 16, 1904. The title parallels and alludes to Odysseus (Latinised into Ulysses), the hero of Homer's Odyss.`,

        Lolita: `The book is internationally famous for its innovative style and infamous for its controversial subject: the protagonist and unreliable narrator, middle aged Humbert Humbert, becomes obsessed`,

        Middlemarch: `Middlemarch: A Study of Provincial Life is a novel by George Eliot, the pen name of Mary Anne Evans, later Marian Evans.`,

        Beloved: `Beloved (1987) is a Pulitzer Prize-winning novel by Nobel laureate Toni Morrison. The novel, her fifth, is loosely based on the life and legal case of the slave Margaret Garner, about whom Morrison.`,

    }
    response.send(JSON.stringify(books))
});


app.listen(5000, () =>{
    console.log("listning")
});