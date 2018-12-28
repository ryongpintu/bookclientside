import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { deleteExperience } from "../../actions/profileActions.js";

class BookList extends Component {
  onDeleteClick(id) {
    this.props.deleteExperience(id);
  }

  render() {
    const book = this.props.books.map(exp => (
      <tr key={exp._id}>
        <td>{exp.name}</td>
        <td>{exp.author}</td>
        <td>{exp.price}</td>
        <td>
          <button
            onClick={this.onDeleteClick.bind(this, exp._id)}
            className="btn btn-danger ml-2"
          >
            Delete
          </button>
          <button className="btn btn-grey">
            <Link to={`/edit-book/${exp._id}`}>Edit</Link>
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
  deleteExperience: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteExperience }
)(BookList);
