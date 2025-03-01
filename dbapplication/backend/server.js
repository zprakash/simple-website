const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.static('public'));

let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the mydatabase database.');
});

// Create a table
db.run('CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY AUTOINCREMENT, product_name TEXT, product_price REAL, product_description TEXT)', (err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('Table created successfully');
});

// endpoint to add product
app.post('/add', (req, res) => {
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_description = req.body.product_description;
    db.run(`INSERT INTO products(product_name, product_price, product_description) VALUES(?, ?, ?)`, [product_name, product_price, product_description], function(err) {
        if (err) {
            return console.log(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
    res.send('Record added successfully');
});

// endpoint to get all products
app.get('/products', (req, res) => {
    db.all('SELECT * FROM products', [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.product_name);
        });
        res.send(rows);
    });
});

// endpoint to update a product using id
app.put('/update/:id', (req, res) => {
    const id = req.params.id;
    const product_name = req.body.product_name;
    const product_price = req.body.product_price;
    const product_description = req.body.product_description;
    db.run(`UPDATE products SET product_name = ?, product_price = ?, product_description = ? WHERE id = ?`, [product_name, product_price, product_description, id], (err) => {
        if (err) {
            console.log(err.message);
        }
        res.send('Record updated successfully');
    });
});

// endpoint to delete a product
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    db.run(`DELETE FROM products WHERE id = ?`, id, (err) => {
        if (err) {
            console.log(err.message);
        }
        res.send('Record deleted successfully');
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});