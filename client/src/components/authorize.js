import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";

class Authorize extends Component {
  state = {
    formMessageOn: false,
    authenticated: false,
  };

  handleFormSubmit = async (e) => {
    if (e) e.preventDefault();
    const email = e.target.email.value;
    // console.log('Your email is:', email);
    let idVaild = this.validateEmail(email);
    if (idVaild) {
      // call backend route
      // console.log("is a vaild email");
      if (this.state.formMessageOn) {
        this.setState({ formMessageOn: false });
      }

      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });
      let body = await response.text();
      body = JSON.parse(body);

      if (body.success) {
        sessionStorage.setItem("ticTacToeUserToken", body.token);
        this.setState({ authenticated: true });
        this.props.history.push("/tictactoe");
      }
    } else {
      // visual notice
      this.setState({ formMessageOn: true });
    }
  };

  validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  validationMessage = () => {
    console.log("validation message", this.state.formMessageOn);
    if (this.state.formMessageOn) {
      return <Label className="pb-1">Invalid email, try again</Label>;
    } else {
      return <Label className="pb-1">Input your email</Label>;
    }
  };

  render() {
    return (
      <Container className="pt-4">
        <Row className="themed-container justify-content-center">
          <Col
            xs={{ size: 10 }}
            sm={{ size: 8 }}
            md={{ size: 6 }}
            lg={{ size: 4 }}
          >
            <Form onSubmit={this.handleFormSubmit} noValidate="novalidate">
              <FormGroup>
                {this.validationMessage()}
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@abc.com"
                />
                <Button className="mt-3" type="submit" color="info">
                  Submit
                </Button>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Authorize;
