// book.services.js

import { db } from '../firebase-config';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";

const bookCollectionRef = collection(db, "books");

const bookService = {
    getAllBooks: async () => {
        try {
            const querySnapshot = await getDocs(bookCollectionRef);
            // return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return querySnapshot;
        } catch (error) {
            console.error('Error getting books:', error);
            throw new Error('Error getting books:', error);
        }
    },

    addBook: async (newBook) => {
        try {
            await addDoc(bookCollectionRef, newBook);
            console.log('Book added successfully');
        } catch (error) {
            console.error('Error adding book:', error);
            throw new Error('Error adding book:', error);
        }
    },

    getBookById: async (id) => {
        try {
            const docSnapshot = await getDoc(doc(bookCollectionRef, id));
            if (docSnapshot.exists()) {
                return { id: docSnapshot.id, ...docSnapshot.data() };
            } else {
                throw new Error('No such document exists!');
            }
        } catch (error) {
            console.error('Error getting book by ID:', error);
            throw new Error('Error getting book by ID:', error);
        }
    },

    updateBook: async (id, updatedBook) => {
        try {
            await updateDoc(doc(bookCollectionRef, id), updatedBook);
            console.log('Book updated successfully');
        } catch (error) {
            console.error('Error updating book:', error);
            throw new Error('Error updating book:', error);
        }
    },

    deleteBook: async (id) => {
        try {
            await deleteDoc(doc(bookCollectionRef, id));
            console.log('Book deleted successfully');
        } catch (error) {
            console.error('Error deleting book:', error);
            throw new Error('Error deleting book:', error);
        }
    },
};

export { bookService };
