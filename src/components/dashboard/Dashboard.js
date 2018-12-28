import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfiles, deleteAccount } from "../../actions/profileActions.js";
import Spinner from "../common/Spinner.js";
// import ProfileActions from "./ProfileActions.js";
// import Experience from "./Experience.js";
import BookList from "./BookList.js";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
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
            <p className="lead text-muted">Welcome {user.name}</p>
            <BookList books={profiles} />
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfiles, deleteAccount }
)(Dashboard);
