import React, { Component } from "react";
import { Spinner } from "reactstrap";
 

class AlertMessage extends Component {

  loadingSpinner = (props) => {
    if (props.spinner && !props.gameEnded && props.gameEnded != null) {
      let message;
      if(props.waitingTurn) {
        message=<div className="text-info"><Spinner className="mr-3" color="info" size="sm"/>Waiting for opponent move...</div>;
      } else {
        message=<p className="text-info"></p>;
      }  
      return message;
    }
  }

  render() {
    return (
      <div className={this.props.classes}>
        <span className="text-info">
          {this.props.value}
        </span>
        {this.loadingSpinner(this.props)}
      </div>
    );
  }
}

export default AlertMessage;
