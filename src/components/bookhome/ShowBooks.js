import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles, deleteAccount } from "../../actions/profileActions.js";
import Spinner from "../common/Spinner.js";
// import ProfileActions from "./ProfileActions.js";
// import Experience from "./Experience.js";
import BookItem from "./BookItem";

class ShowBooks extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { user } = this.props.auth;
    const { profiles, loading } = this.props.profile;
    console.log(profiles);
    let dashboardContent;

    if (profiles === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // check logged in user
      if (Object.keys(profiles).length > 0) {
        console.log(profiles);
        const book = profiles.map(book => book.name);
        dashboardContent = (
          <div>
            <BookItem books={profiles} />
          </div>
        );
      } else {
        dashboardContent = (
          <h4>
            Sorry, No Book Listed : <Link to={"/add-book"}>Add Book</Link>
          </h4>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Book List</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShowBooks.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles }
)(ShowBooks);
