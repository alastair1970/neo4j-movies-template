import React from 'react';
import _ from 'lodash';
import Loading from '../components/Loading.jsx';
import * as ActionActions from '../redux/actions/ActionActions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class action extends React.Component {
  constructor(props) {
    super(props);
    this.state = {description: ''};
    this.handleStateChange = this.handleStateChange.bind(this);
    this.setActionState    = this.setActionState.bind(this);
    this.createNewAction   = this.createNewAction.bind(this);
  }
  componentDidMount() {
    var {id} = this.props.match.params;
    this.props.getAction(id);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.clearAction();
      var {id} = this.props.match.params;
      this.props.getAction(id);
    }
  }

  componentWillUnmount() {
    this.props.clearAction();
  }

  handleStateChange(e,field) {
    console.log(`action handleStateChange 'field: '+${field} 'value: '+${e.target.value}`);
    this.setState({[field]:e.target.value});
  }

  setActionState(){
    var {id} = this.props.match.params;
    this.props.setActionState(id,this.state);
  }

  createNewAction(){
    this.props.createNewAction(this.state);
  }

  render() {
    var {isFetching, action, profile} = this.props;
    return (
      <div className="nt-action">
        {isFetching ? <Loading/> : null}
        {action ?
          <div>
              {profile
                ?
                <div className="nt-box">
                  <button onClick={() => this.setActionState()}>Save</button>
                  <button onClick={() => this.createNewAction()}>New</button>
                  <p className="nt-box-row">
                    <strong>action ID: </strong><span>{action.id}</span>
                  </p>
                  <p className="nt-box-row">
                    <strong>Description: </strong>
                    <input Value={action.description} onChange={(e)=>this.handleStateChange(e,"description")}/>
                  </p>
                </div>
              :
              null
              }
            </div>
          :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    action: state.actions.detail,
    isFetching: state.actions.isFetching,
    profile: _.get(state, 'profile.profile')
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionActions, dispatch);
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(action);

action.displayName = 'action';
