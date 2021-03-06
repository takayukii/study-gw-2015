/**
* @exports Message
**/

var React = require('react');
var ReactPropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');

var TimeAgo = React.createFactory(require('react-timeago'));

var OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');
var Tooltip = require('react-bootstrap/lib/Tooltip');

var Message = React.createClass({

  propTypes: {
    authUser: ReactPropTypes.object,
    message: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {

    var datetime = String() + this.props.message.createdAt;
    var messages = this.props.message.text.split("\n");
    var paragraphs = [];
    messages.forEach(function(message){
      paragraphs.push(<p>{message}</p>);
    });

    var timeago = TimeAgo({
      date: this.props.message.createdAt,
      formatter: function(value, unit, exp){

        if(unit === 'second'){
          return 'ちょうど今';
        }else{
          var _unit = null;
          var _exp = null;
          switch(unit){
            case 'minute':
              _unit = '分';
              _exp = '前';
              break;
            case 'hour':
              _unit = '時間';
              _exp = '前';
              break;
            case 'day':
              _unit = '日';
              _exp = '前';
              break;
            case 'week':
              _unit = '週間';
              _exp = '前';
              break;
            case 'month':
              _unit = 'ヶ月';
              _exp = '前';
              break;
            case 'year':
              _unit = '年';
              _exp = '前';
              break;
          }
          return String() + value + _unit + _exp;
        }

      }
    });

    var isMine = false;
    if(this.props.message.username === this.props.authUser.username){
      isMine = true;
    }

    var photo = 'https://a2.muscache.com/ic/users/24725606/profile_pic/1418303411/original.jpg?interpolation=lanczos-none&crop=w:w;*,*&crop=h:h;*,*&resize=36:*&output-format=jpg&output-quality=70';
    switch(this.props.message.username){
      case 'bob':
        photo = 'data:image/jpeg;base64,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';
        break;

      case 'joe':
        photo = 'http://ecx.images-amazon.com/images/I/51fo3YfmjaL.jpg';
        break;
    }

    if(isMine){
      return (
        <li className="thread-list-item">
          <div className="row">
            <div className="col-xs-2 col-md-1 text-center">
              <a className="photo-round photo-zoom" href="#">
                <img src={photo} />
              </a>
            </div>
            <div className="col-xs-8 col-md-10">
              <div className="panel panel-quote-left">
                <div className="clearfix">
                  <div className="message-text">{paragraphs}</div>
                  <OverlayTrigger placement='bottom' overlay={<Tooltip>{datetime}</Tooltip>}>
                    <p className="pull-right datetime">{timeago}</p>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
          </div>
        </li>
      );
    }else{
      return (
        <li className="thread-list-item">
          <div className="row">
            <div className="col-xs-8 col-xs-offset-2 col-md-10 col-md-offset-1">
              <div className="panel panel-quote-right">
                <div className="clearfix">
                  <div className="message-text">{paragraphs}</div>
                  <OverlayTrigger placement='bottom' overlay={<Tooltip>{datetime}</Tooltip>}>
                    <p className="pull-right datetime">{timeago}</p>
                  </OverlayTrigger>
                </div>
              </div>
            </div>
            <div className="col-xs-2 col-md-1 text-center">
              <a className="photo-round photo-zoom" href="#">
                <img src={photo} />
              </a>
            </div>
          </div>
        </li>
      );
    }

  },

});

module.exports = Message;
