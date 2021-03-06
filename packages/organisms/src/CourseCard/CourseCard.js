import React, { Component } from "react";
import PropTypes from "prop-types";
import { identity, isEmpty, isNil } from "ramda";
import { Card, Heading } from "@offcourse/atoms";
import {
  Description,
  TagGroup,
  Share,
  Curator,
  CheckpointList
} from "@offcourse/molecules";

/**
 * The course card component for the Offcourse project
 */

export default class CourseCard extends Component {
  static propTypes = {
    onCheckpointToggle: PropTypes.func,
    onCuratorClick: PropTypes.func,
    onGoalClick: PropTypes.func,
    onTagClick: PropTypes.func,
    shareMessage: PropTypes.string,
    course: PropTypes.shape({
      courseId: PropTypes.string.isRequired,
      goal: PropTypes.string.isRequired,
      curator: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string,
      courseUrl: PropTypes.string
    })
  };

  static defaultProps = {
    shareMessage: "Checkout This Course",
    onCuratorClick: identity,
    onGoalClick: identity,
    onTagClick: identity
  };

  handleCheckpointToggle = ({ checkpointId, checked }) => {
    const { course, onCheckpointToggle } = this.props;
    onCheckpointToggle({
      courseId: course.courseId,
      checkpointId,
      checked
    });
  };

  hasTags = tags => {
    return !isEmpty(tags) && !isNil(tags);
  };

  render() {
    const {
      course,
      onCheckpointToggle,
      onGoalClick,
      onTagClick,
      onCuratorClick,
      shareMessage
    } = this.props;
    const {
      courseId,
      goal,
      curator,
      courseUrl,
      avatarUrl,
      profileUrl,
      checkpoints,
      description,
      tags
    } = course;
    return (
      <Card>
        <Heading
          onClick={() => onGoalClick({ goal, curator, courseId })}
          section="header"
        >
          {goal}
        </Heading>
        <Curator
          section="meta"
          curator={curator}
          onClick={onCuratorClick}
          profileUrl={profileUrl}
          avatarUrl={avatarUrl}
        />
        {description && (
          <Description label="Course Description" section="description">
            {description}
          </Description>
        )}
        <CheckpointList
          section="heckpoints"
          onToggle={onCheckpointToggle && this.handleCheckpointToggle}
          checkpoints={checkpoints}
        />
        {this.hasTags(tags) && (
          <TagGroup
            onClick={onTagClick}
            flex={1}
            direction="both"
            section="tags"
            tags={tags}
          />
        )}
        <Share
          section="social"
          url={courseUrl || "loading..."}
          text={shareMessage}
          providers={["twitter", "facebook", "url"]}
        />
      </Card>
    );
  }
}
