import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteBook } from "../../actions/profileActions.js";

class BookList extends Component {
  onDeleteClick(id) {
    this.props.deleteBook(id);
  }

  render() {
    const book = this.props.books.map(book => (
      <tr key={book._id}>
        <td>{book.name}</td>
        <td>{book.author}</td>
        <td>{book.price}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, book._id)}
            className="btn btn-danger ml-2"
          >
            Delete
          </button>
          <button className="btn btn-grey">
            <Link to={`/edit-book/${book._id}`}>Edit</Link>
          </button>
        </td>
      </tr>
    ));
    return (
      <div>
        <h4 className="mb-4">Book List</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Price</th>
              <th />
            </tr>
          </thead>
          <tbody>{book}</tbody>
        </table>
      </div>
    );
  }
}

BookList.propTypes = {
  deleteBook: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteBook }
)(BookList);
