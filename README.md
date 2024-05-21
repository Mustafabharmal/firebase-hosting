# 📚 E-Commerce Book Management Platform

This repository contains a React-based frontend application integrated with Firebase for managing a collection of books. The application allows users to add new books, view the list of existing books, and see their details.

## 📖 Table of Contents

- [🔧 Installation](#installation)
- [🚀 Usage](#usage)
- [📋 Components](#components)
  - [AddBook](#addbook)
  - [BookLists](#booklists)
- [💾 Services](#services)
- [⚙️ Configuration](#configuration)
- [🏗️ Project Structure](#project-structure)
- [📜 License](#license)

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mustafabharmal/firebase-hosting.git
   ```

2. Navigate to the project directory:
   ```bash
   cd firebase-hosting
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Set up your Firebase configuration in `firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-auth-domain",
     projectId: "your-project-id",
     storageBucket: "your-storage-bucket",
     messagingSenderId: "your-messaging-sender-id",
     appId: "your-app-id",
     measurementId: "your-measurement-id"
   };
   ```

5. Start the development server:
   ```bash
   npm start
   ```

## 🚀 Usage

Once the server is running, you can interact with the application in your web browser. Use the form to add new books and view the list of existing books.

## 📋 Components

### AddBook

The `AddBook` component allows users to add new books to the collection. It includes a form with fields for the book title, author, and status.

#### Code:
```jsx
// AddBook.jsx
import React, { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { bookService } from '../services/book.services';
import './AddBook.css'; // Import custom CSS for styling

const AddBook = () => {
  const [formData, setFormData] = useState({ title: '', author: '', status: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook();
  };

  const addBook = () => {
    const newBook = {
      title: formData.title,
      author: formData.author,
      status: formData.status
    };
    bookService.addBook(newBook).then(() => {
      console.log('Book added successfully');
      setFormData({ title: '', author: '', status: '' }); // Clear form after submission
      window.location.reload(); // Reload the page to show the updated list
    }).catch(error => {
      console.error('Error adding book:', error);
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className='add-book-container'>
      <h2>Add New Book</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>Title</InputGroup.Text>
            <Form.Control
              name="title"
              type="text"
              placeholder="Book Title"
              value={formData.title}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>Author</InputGroup.Text>
            <Form.Control
              name="author"
              type="text"
              placeholder="Book Author"
              value={formData.author}
              onChange={handleChange}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group>
          <InputGroup>
            <InputGroup.Text>Status</InputGroup.Text>
            <Form.Select
              aria-label="Book Status"
              onChange={handleChange}
              name="status"
              value={formData.status}
            >
              <option>Select Status</option>
              <option value="Available">Available</option>
              <option value="Not Available">Not Available</option>
            </Form.Select>
          </InputGroup>
        </Form.Group>
        <Button variant="primary" type="submit">Add Book</Button>
      </Form>
    </div>
  );
};

export default AddBook;
```

### BookLists

The `BookLists` component fetches and displays a list of all books from Firebase. It shows the book title, author, and status in a table format.

#### Code:
```jsx
// BookLists.jsx
import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { bookService } from '../services/book.services';
import './BookLists.css'; // Import custom CSS for styling

const BookLists = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const data = await bookService.getAllBooks();
      const newdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(newdata);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="book-lists-container">
      <h2>Book Lists</h2>
      <Table striped bordered size='sm' className="book-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Title</th>
            <th>Author</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BookLists;
```

## 💾 Services

### Book Services

The `bookService` provides methods for interacting with the Firebase Firestore to add and retrieve books.

#### Code:
```javascript
// book.services.jsx
import { db } from '../firebase-config';
import { addDoc, collection, getDocs } from "firebase/firestore";

const bookCollectionRef = collection(db, "books");

export const bookService = {
  getAllBooks: () => {
    return getDocs(bookCollectionRef);
  },
  addBook: (newBook) => {
    return addDoc(bookCollectionRef, newBook);
  }
};
```

## ⚙️ Configuration

### Firebase Configuration

Configure Firebase in `firebase-config.js`:

```javascript
// firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
  measurementId: "your-measurement-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

## 🏗️ Project Structure

```
.
├── components
│   ├── AddBook.jsx
│   ├── BookLists.jsx
├── services
│   └── book.services.jsx
├── App.jsx
├── firebase-config.js
├── index.js
├── App.css
├── AddBook.css
├── BookLists.css
└── README.md
```

## 📜 License

This project is licensed under the MIT License. 
