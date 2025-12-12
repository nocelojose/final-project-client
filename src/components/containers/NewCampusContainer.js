/*==================================================
/src/components/containers/NewCampusContainer.js

Container for adding a new campus.
It connects the form view to the Redux thunk that
creates a new campus in the backend.
==================================================*/
import Header from "./Header";
import React, { Component } from "react";
import { connect } from "react-redux";
import { addCampusThunk } from "../../store/thunks";
import { NewCampusView } from "../views";

class NewCampusContainer extends Component {
  render() {
    return (
      <div>
        <Header />
        <NewCampusView
          addCampus={this.props.addCampus}
          history={this.props.history}
        />
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  };
};

export default connect(null, mapDispatch)(NewCampusContainer);
