import React from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = ({ query, onChange, onSearch }) => (
  <Form onSubmit={onSearch} className="my-3">
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={onChange}
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </InputGroup>
  </Form>
);

export default SearchBar;
