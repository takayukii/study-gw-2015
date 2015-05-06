/**
* @exports MessageApp
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;

var MessageForm = require('./MessageForm.react');
var MessageList = require('./MessageList.react');
var MessageActions = require('../actions/MessageActions');
var MessageStore = require('../stores/MessageStore');

var MessageApp = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    messageThread: ReactPropTypes.object
  },

  getInitialState: function() {
     return {
      allMessages: [],
    };
  },

  componentDidMount: function() {

    MessageStore.addChangeListener(this._onStoreChange);

    var self = this;

    window.io.socket.on('messagethreads', function(message){
      console.log('io.socket.on messagethreads:', message);
      if(message.verb === 'updated' && message.data.message_thread_id === self.props.messageThread.id){
        MessageActions.receiveCreatedMessage(message.data);
      }
    });
    
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onStoreChange);
  },

  /**
   * @return {object}
   */
  render: function() {

    if(!this.props.authUser || !this.props.messageThread){
      return null;
    }

  	return (
      <div className="message">
        <MessageForm authUser={this.props.authUser} messageThread={this.props.messageThread} />
        <MessageList
          allMessages={this.state.allMessages} authUser={this.props.authUser}
        />
      </div>
  	);
  },

  /**
   * Event handler for 'change' events coming from the TodoStore
   */
  _onStoreChange: function() {
    // 変更を検知したら同期する
    this.setState({allMessages: MessageStore.getAllMessages()});
  },

});

module.exports = MessageApp;