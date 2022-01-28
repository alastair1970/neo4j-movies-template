import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Loading from '../components/Loading.jsx';
import * as ActionActions from '../redux/actions/ActionActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class action extends React.Component {
  constructor(props) {
    super(props);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.setAction         = this.savAction.bind(this);
    this.newAction         = this.newAction.bind(this);
    this.delAction         = this.delAction.bind(this);
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
    var {id} = this.props.detail;
    this.props.setAction(id,{[field]:e.target.value});
  }

  savAction(){
    var {id,description} = this.props.detail;
    this.props.savAction(id,{description:description});
  }

  delAction(){
    var {id} = this.props.match.params;
    this.props.delAction(id);
  }

  newAction(){
    var {description} = this.props.detail;
    this.props.newAction({description:description});
  }

  render() {
    var {isFetching, detail} = this.props;
    return (
      <div className="nt-action">
        {isFetching ? <Loading/> : null}
        <div className="nt-box">
          <button onClick={() => this.savAction()}>Save</button>
          <button onClick={() => this.newAction()}>New</button>
          <button onClick={() => this.delAction()}>Delete</button>
          {detail ?
          <div>
            <p className="nt-box-row">
              <strong>action ID: </strong><span>{detail.id ?? ""}</span>
            </p>
            <p className="nt-box-row">
              <strong>Description: </strong>
              <input type="text" className="input-description" value={detail.description ?? ""} onChange={(e)=>this.handleStateChange(e,"description")}/>
            </p>
          </div>
          :
          <div>
            <p className="nt-box-row">
              <strong>action ID: </strong><span>...</span>
            </p>
            <p className="nt-box-row">
              <strong>Description: </strong>
              <input type="text" className="input-description" value="..." onChange={(e)=>this.handleStateChange(e,"description")}/>
            </p>
          </div>
          }  
        </div>
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
          {actionsList.map(m => {
            return (
              <div key={m.id}>
                <div className="nt-action-description">
                  <Link to={`/action/${m.id}`}>{m.description?(m.description):('...')}</Link>
                </div>
              </div>
            );
          })}
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
