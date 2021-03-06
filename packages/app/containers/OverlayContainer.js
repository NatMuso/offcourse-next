import React, { Component } from "react";
import { Query, Mutation } from "../components";
import Composer from "react-composer";
import { Group, Loading } from "@offcourse/atoms";
import { Modal } from "@offcourse/molecules";
import { queries, mutations } from "../graphql";
import { overlayModes } from "../constants";
import { AuthContainer, CourseFormContainer } from ".";

const {
  SIGNING_IN,
  SIGNING_UP,
  SIGNING_OUT,
  RETRIEVING_PASSWORD,
  CREATE_COURSE,
  EDIT_COURSE
} = overlayModes;

class LoadingModal extends Component {
  render() {
    return (
      <Group height="400px" justifyContent="center" alignItems="center">
        <Modal.Section>
          <Loading size="large" />
        </Modal.Section>
      </Group>
    );
  }
}

export default class OverlayContainer extends Component {
  selectMode(mode) {
    switch (mode) {
      case SIGNING_UP:
      case SIGNING_IN:
      case SIGNING_OUT:
      case RETRIEVING_PASSWORD:
        return <AuthContainer />;
      case EDIT_COURSE:
      case CREATE_COURSE:
        return <CourseFormContainer />;
      default:
        return <LoadingModal />;
    }
  }

  render() {
    return (
      <Composer
        components={[
          <Query query={queries.overlay} />,
          <Mutation mutation={mutations.closeOverlay} />
        ]}
      >
        {([queryResult, closeOverlay]) => {
          const { overlay } = queryResult.data;
          return (
            <Modal close={closeOverlay} isOpen={overlay.isOpen}>
              {this.selectMode(overlay.mode, closeOverlay)}
            </Modal>
          );
        }}
      </Composer>
    );
  }
}
