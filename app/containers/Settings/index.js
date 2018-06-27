/**
 *
 * Settings
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { bindActionCreators, compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { findIndex } from 'lodash';

import Card from 'components/Card';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { getSchema, moveCard, onClick } from './actions';
import makeSelectSettings from './selectors';
import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class Settings extends React.Component {
  state = { isOpen: false };

  componentDidMount() {
    this.props.getSchema('user');
  }

  getOptions = () => {
    const { settings: { schema, schemaList } } = this.props;
    return Object.keys(schema.attributes || [])
      .filter(attr => findIndex(schemaList, ['name', attr]) === -1)
      .map(attr => Object.assign(schema.attributes[attr], { name: attr}));
  }

  toggle = () => {

    if (this.getOptions().length > 0) {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }))
    }
  };

  render() {
    const { settings } = this.props;
    const { isOpen } = this.state;

    return (
      <div style={{ width: 400, paddingTop: '140px', marginLeft: '100px' }}>
        <div>
          {settings.schemaList.map((attr, i) => (
            <Card
              key={attr.name}
              index={i}
              text={attr.label}
              moveCard={this.props.moveCard}
            />
          ))}
        </div>
        <div>
          <ButtonDropdown isOpen={isOpen} toggle={this.toggle}>
            <DropdownToggle caret>
              Button Dropdown
            </DropdownToggle>
            <DropdownMenu>
              {this.getOptions().map((item, i) => {
                if (i !== this.getOptions().length - 1 && this.getOptions().length > 0) {
                  return (
                    <React.Fragment key={item.name}>
                      <DropdownItem onClick={() => this.props.onClick(item)}>{item.label}</DropdownItem>
                      <DropdownItem divider />
                    </React.Fragment>
                  );
                }

                return <DropdownItem key={item.name} onClick={() => this.props.onClick(item)}>{item.label}</DropdownItem>                
              })}
            </DropdownMenu>
          </ButtonDropdown>
        </div>
      </div>
    );
  }
}

Settings.propTypes = {
  // dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settings: makeSelectSettings(),
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getSchema,
      moveCard,
      onClick,
    },
    dispatch,
  );
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'settings', reducer });
const withSaga = injectSaga({ key: 'settings', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DragDropContext(HTML5Backend)(Settings));
