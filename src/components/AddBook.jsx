
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
            <Form.Select aria-label="Book Status" onChange={handleChange} name="status" value={formData.status}>
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

