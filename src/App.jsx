// App.jsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AddBook from './components/AddBook';
import BookLists from './components/BookLists';
import './App.css'; // Import custom CSS for styling

const App = () => {
  return (
    <div className="app-container">
      {/* <Container> */}
        <Row>
          <Col>
            <AddBook />
          </Col>
        </Row>
        <Row>
          <Col>
            <BookLists />
          </Col>
        </Row>
      {/* </Container> */}
    </div>
  );
}

export default App;