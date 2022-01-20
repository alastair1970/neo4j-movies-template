import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Loading from '../components/Loading.jsx';
import Carousel from '../components/Carousel.jsx';
import * as ActionActions from '../redux/actions/ActionActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: ''};
    this.handleStateChange = this.handleStateChange.bind(this);
    this.setAction         = this.setAction.bind(this);
    this.newAction         = this.newAction.bind(this);
    // this.deleteAction      = this.deleteAction.bind(this);
    this.renderActions     = this.renderActions.bind(this);
  }

  componentWillUnmount() {
    this.props.clearAction();
  }

  componentDidMount() {
    var {id} = this.props.match.params;
    this.props.getAction(id);
    this.props.getActions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.clearAction();
      var {id} = this.props.match.params;
      this.props.getAction(id);
    }
  }

  handleStateChange(e,field) {
    console.log(`action handleStateChange 'field: '+${field} 'value: '+${e.target.value}`);
    this.setState({[field]:e.target.value});
  }

  setAction(){
    var {id} = this.props.match.params;
    this.props.setAction(id,this.state);
  }

  deleteAction(){
    var {id} = this.props.match.params;
    this.props.deleteAction(id);
  }

  newAction(){
    this.props.newAction(this.state);
  }

  render() {
    var {isFetching, detail, profile} = this.props;
    return (
      <div className="nt-action">
        {isFetching ? <Loading/> : null}
            {profile
                ?
                <div className="nt-box">
                  <button onClick={() => this.setAction()}>Save</button>
                  <button onClick={() => this.newAction()}>New</button>
                  {detail ?
                  <div>
                    <p className="nt-box-row">
                      <strong>action ID: </strong><span>{detail.id}</span>
                    </p>
                    <p className="nt-box-row">
                      <strong>Description: </strong>
                      <input Value={detail.description} onChange={(e)=>this.handleStateChange(e,"description")}/>
                    </p>
                  </div>
                  :
                  <div>
                    <p className="nt-box-row">
                      <strong>action ID: </strong><span>...</span>
                    </p>
                    <p className="nt-box-row">
                      <strong>Description: </strong>
                      <input Value='...' onChange={(e)=>this.handleStateChange(e,"description")}/>
                    </p>
                  </div>
                  }
                </div>
              :
              null
            }
        {this.renderActions()} 
      </div>
    );
  }

  renderActions() {
    var {actionsList} = this.props;
    if (_.isEmpty(actionsList)) { return null; }
    return (
      <div className="nt-home-actions">
        <div className="nt-box">
          <Carousel>
            {actionsList.map(m => {
              return (
                <div key={m.id}>
                  <div className="nt-carousel-action-description">
                    <Link to={`/action/${m.id}`}>{m.description}</Link>
                  </div>
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    detail: state.actions.detail,
    actionsList: state.actions.actionsList,
    profile: _.get(state, 'profile.profile')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionActions, dispatch);
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(action);

action.displayName = 'action';
