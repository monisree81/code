import React, { useState } from 'react';
const initialInventory = [
{ id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', stock: 12,
price: 10.5 },
{ id: 2, title: '1984', author: 'George Orwell', stock: 8, price: 9.0 },
{ id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', stock: 15,
price: 12.0 },
];
export default function Bookstore() {
const [inventory, setInventory] = useState(initialInventory);
const [newBook, setNewBook] = useState({
title: '',
author: '',
stock: '',
price: '',
});
const handleChange = (e) => {
const { name, value } = e.target;
setNewBook((prev) => ({ ...prev, [name]: value }));
};
const handleAddBook = () => {
const { title, author, stock, price } = newBook;
if (
title.trim() === '' ||
author.trim() === '' ||
stock === '' ||
price === ''
) {
alert('Please fill in all fields');
return;
}
const nextId =
inventory.length === 0
? 1
: Math.max(...inventory.map((b) => b.id)) + 1;
const book = {
id: nextId,
title: title.trim(),
author: author.trim(),
stock: Number(stock),
price: Number(price),
};
setInventory((prev) => [...prev, book]);
// clear inputs
setNewBook({
title: '',
author: '',
stock: '',
price: '',
});
};
const formatPrice = (n) =>
`$${Number(n).toFixed(2)}`;
return (
<div className="container my-5">
<h1 className="fw-bold text-primary text-center">Bookstore Inventory</h1>

<p className="text-muted text-center">
Manage your book collection with ease
</p>
<h2 className="mt-4 mb-3">Available Books</h2>
<div className="row g-3">
{inventory.map((book) => (
<div className="col-md-4" key={book.id}>
<div className="card h-100 shadow-sm">
<div className="card-body">
<h5 className="card-title text-success">{book.title}</h5>
<p className="card-subtitle mb-2 text-muted">by
{book.author}</p>
<p className="mb-1">
<span className="fw-bold">Stock:</span> {book.stock}
</p>
<p className="mb-0">
<span className="fw-bold">Price:</span>
{formatPrice(book.price)}
</p>
</div>
<div className="card-footer bg-transparent border-0">
<span className="badge bg-info">ID: {book.id}</span>
</div>
</div>
</div>
))}
</div>
<h2 className="mt-5 mb-3">Add a New Book</h2>
<div className="card shadow-sm">
<div className="card-body">
<div className="row g-3">
<div className="col-md-3">
<input
className="form-control"
type="text"
name="title"
placeholder="Book Title"
value={newBook.title}
onChange={handleChange}
/>
</div>
<div className="col-md-3">
<input
className="form-control"
type="text"
name="author"
placeholder="Author"
value={newBook.author}
onChange={handleChange}
/>
</div>
<div className="col-md-2">
<input
className="form-control"
type="number"
name="stock"
placeholder="Stock"
min="0"
value={newBook.stock}
onChange={handleChange}
/>
</div>
<div className="col-md-2">
<input

className="form-control"
type="number"
name="price"
placeholder="Price ($)"
step="0.01"
min="0"
value={newBook.price}
onChange={handleChange}
/>
</div>
<div className="col-md-2 d-grid">
<button
className="btn btn-success w-100"
onClick={handleAddBook}
>
Add Book
</button>
</div>
</div>
</div>
</div>
</div>
);
}
