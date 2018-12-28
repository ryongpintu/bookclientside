import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup.js";
// import TextAreaFieldGroup from "../common/TextAreaFieldGroup.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addBook } from "../../actions/profileActions.js";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      author: "",
      price: "",
      ISBN: "",

      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const expData = {
      name: this.state.name,
      author: this.state.author,
      price: this.state.price,
      ISBN: this.state.ISBN
    };

    this.props.addBook(expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="dispalty-4 text-center">Add Book</h1>
              <p className="lead text-center">
                Add any book that you have read in the past or current
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors}
                />

                <TextFieldGroup
                  placeholder="* Author"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  error={errors.author}
                />

                <TextFieldGroup
                  placeholder="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />

                <TextFieldGroup
                  name="ISBN"
                  placeholder="ISBN"
                  type="text"
                  value={this.state.ISBN}
                  onChange={this.onChange}
                  error={errors.ISBN}
                />

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddBook.propTyes = {
  addBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addBook }
)(withRouter(AddBook));
