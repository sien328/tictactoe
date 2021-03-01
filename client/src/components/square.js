import React, { Component } from "react";
import { Button } from "reactstrap";
import './square.css';

class Square extends Component {

  render() {
    // console.log("props in square",this.props);
    return (
      <Button outline color="primary p-5"
        className="square position-relative"
        data-r={this.props.row}
        data-c={this.props.col}
        onClick={(e) => this.props.placeMove(e)}
        disabled={this.props.waitingTurn}
      >
        <span className="position-absolute top-50 start-50" >
            {this.props.value}
        </span>
      </Button>
    );
  }
}

export default Square;
