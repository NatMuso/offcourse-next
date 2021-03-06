import React, { Component } from "react";
import { times, map, identity } from "ramda";
import { Masonry, Group, Loading } from "@offcourse/atoms";
import { CourseCard } from "..";
import CourseCardLayoutWrapper from "./CourseCardLayoutWrapper";
import PropTypes from "prop-types";
import Waypoint from "react-waypoint";

export default class CourseCardLayout extends Component {
  static propTypes = {
    goToCollection: PropTypes.func,
    goToCourse: PropTypes.func,
    hasMore: PropTypes.bool,
    loadMore: PropTypes.func,
    courses: PropTypes.arrayOf(
      PropTypes.shape({
        courseId: PropTypes.string.isRequired,
        goal: PropTypes.string.isRequired,
        curator: PropTypes.string.isRequired,
        avatarUrl: PropTypes.string,
        courseUrl: PropTypes.string
      })
    )
  };

  static defaultProps = {
    hasMore: false,
    goToCollection: () => {},
    goToCourse: () => {},
    loadMore: () => {}
  };

  calculateBreakpoints() {
    return times(identity, 100).map(columns => {
      const gutter = 16;
      const columnWidth = 288;
      const offset = columnWidth + gutter;
      const colSpace = (columns + 1) * columnWidth;
      const gutterSpace = columns * gutter;
      return colSpace + offset + gutterSpace;
    });
  }

  handlePositionChange = ({ currentPosition, ...rest }) => {
    const { loadMore } = this.props;
    currentPosition === "inside" ? loadMore() : null;
  };

  render() {
    const { courses, goToCollection, goToCourse, hasMore } = this.props;
    return (
      <CourseCardLayoutWrapper>
        <Masonry breakpoints={this.calculateBreakpoints()}>
          {map(
            course => (
              <CourseCard
                onCuratorClick={goToCollection}
                onGoalClick={goToCourse}
                onTagClick={goToCollection}
                key={course.courseId}
                course={course}
              />
            ),
            courses
          )}
        </Masonry>
        <Waypoint
          key={courses.length}
          onPositionChange={this.handlePositionChange}
          onEnter={this.handlePositionChange}
        >
          <Group alignItems="center">
            {hasMore && <Loading size="large" />}
          </Group>
        </Waypoint>
      </CourseCardLayoutWrapper>
    );
  }
}
