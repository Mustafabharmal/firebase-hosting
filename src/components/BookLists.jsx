// BookLists.jsx

import React, { useEffect, useState } from 'react';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { bookService } from '../services/book.services';
import './BookLists.css'; // Import custom CSS for styling

const BookLists = () => {
    const [books, setBooks] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [editedBook, setEditedBook] = useState({});

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            const data = await bookService.getAllBooks();
            // if (Array.isArray(data)) {
              const newdata = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setBooks(newdata);
                // setBooks(data);
            // } else {
            //     console.error('Error: Data is not an array');
            // }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await bookService.deleteBook(id);
            console.log('Book deleted successfully');
            getBooks(); // Refresh book list after deletion
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleShowEditModal = (book) => {
        setSelectedBook(book);
        setEditedBook(book);
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setSelectedBook(null);
        setEditedBook({});
        setShowEditModal(false);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedBook({ ...editedBook, [name]: value });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await bookService.updateBook(selectedBook.id, editedBook);
            console.log('Book updated successfully');
            handleCloseEditModal();
            getBooks(); // Refresh book list after update
        } catch (error) {
            console.error('Error updating book:', error);
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
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.status}</td>
                            <td>
                                <Button variant="primary" onClick={() => handleShowEditModal(book)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(book.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Book</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditSubmit}>
                        <Form.Group controlId="editTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={editedBook.title} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group controlId="editAuthor">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" name="author" value={editedBook.author} onChange={handleEditChange} />
                        </Form.Group>
                        <Form.Group controlId="editStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Control as="select" name="status" value={editedBook.status} onChange={handleEditChange}>
                                <option>Select Status</option>
                                <option value="Available">Available</option>
                                <option value="Not Available">Not Available</option>
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit">Save Changes</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BookLists;
