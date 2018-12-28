import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentBook, updateBook } from "../../actions/profileActions.js";

class EditBook extends Component {
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

  componentDidMount() {
    const { id } = this.props.match.params;

    this.props.getCurrentBook(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({ errors: nextProps.errors });
    }

    console.log("aaaaa", nextProps.profile.profile);
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;
      this.setState({
        name: profile.name,
        author: profile.name,
        price: profile.price,
        ISBN: profile.ISBN
      });
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

    const { id } = this.props.match.params;

    this.props.updateBook(id, expData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { profile } = this.state;
    console.log(this.state.profile);
    console.log(this.state);

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="dispalty-4 text-center">Edit Book</h1>
              <p className="lead text-center">
                Edit This book that you have read in the past or current
              </p>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Name"
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
                  error={errors.name}
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

EditBook.propTyes = {
  updateBook: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.book
});

export default connect(
  mapStateToProps,
  { getCurrentBook, updateBook }
)(withRouter(EditBook));
