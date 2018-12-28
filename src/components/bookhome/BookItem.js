import React, { Component } from "react";

export default class BookItem extends Component {
  render() {
    const book = this.props.books.map(book => (
      <div className="col col-6">
        <div className="card card-body mb-3">
          <h4>{book.name}</h4>
          <ul className="list-group">
            <li className="list-group-item">Author: {book.author}</li>
            <li className="list-group-item">Price: {book.price}</li>
            <li className="list-group-item">ISBN: {book.ISBN}</li>
          </ul>
        </div>
      </div>
    ));
    return <div className="row">{book}</div>;
  }
}
