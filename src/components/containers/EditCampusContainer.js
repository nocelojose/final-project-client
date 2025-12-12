/*==================================================
EditCampusContainer.js

Fetches the campus data, passes it to the form view,
and handles updating via editCampusThunk.
==================================================*/
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchCampusThunk, editCampusThunk } from "../../store/thunks";
import { EditCampusView } from "../views";

class EditCampusContainer extends Component {
  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
  }

  render() {
    return (
      <div>
        <Header />
        <EditCampusView
          campus={this.props.campus}
          editCampus={this.props.editCampus}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

export default connect(mapState, mapDispatch)(EditCampusContainer);
