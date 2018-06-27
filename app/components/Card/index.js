/**
 *
 * Card
 *
 */

import React from 'react';
import { findDOMNode } from 'react-dom'
import {
	DragSource,
	DropTarget,
} from 'react-dnd';
import _ from 'lodash';

import './styles.scss';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const cardSource = {
  beginDrag: (props, monitor, component) => {
		const el =  findDOMNode(component)
		el.className = 'draggedCard';

    return {
      id: props.id,
			index: props.index,
    };
	},
	endDrag: (props, monitor, component) => {
		const el =  findDOMNode(component)
		el.className = 'defaultCard';
		return {
		}
	}
}

const cardTarget = {
  hover: (props, monitor, component) => {
    const dragIndex = monitor.getItem().index
		const hoverIndex = props.index

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return
		}

		// Determine rectangle on screen
		const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()
	
		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top

		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%

		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}

		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}

		// Time to actually perform the action
		props.moveCard(dragIndex, hoverIndex)

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex
  },
}

/* eslint-disable react/prefer-stateless-function */
class Card extends React.Component {
  render() {
    const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props;
		const opacity = isDragging ? 0 : 1;
		
    return (
			connectDragSource(
				connectDropTarget(<div style={{ opacity }} className="defaultCard" onClick={() => console.log('click')}>{text}</div>),
			)
		);
  }
}

const withDropTarget = DropTarget('card', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}));
const withDragSource = DragSource('card', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	connectDragPreview: connect.dragPreview(),
	isDragging: monitor.isDragging(),
}));

Card.propTypes = {};

export default _.flow([withDropTarget, withDragSource])(Card);
