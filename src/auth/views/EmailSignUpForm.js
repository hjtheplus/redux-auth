import React, { PropTypes } from "react";
import Input from "./Input";
import ButtonLoader from "./ButtonLoader";
import { emailSignUpFormUpdate, emailSignUp } from "../actions/email-sign-up";
import { connect } from "react-redux";

@connect(({auth}) => ({auth}))
class EmailSignUpForm extends React.Component {
  static propTypes = {
    title: PropTypes.string
  }

  static defaultProps = {
    title: "Sign Up"
  }

  handleInput (key, val) {
    this.props.dispatch(emailSignUpFormUpdate(key, val));
  }

  handleSubmit () {
    let formData = this.props.auth.getIn(["emailSignUp", "form"]).toJS();
    this.props.dispatch(emailSignUp(formData));
  }

  render () {
    let disabled = (
      this.props.auth.getIn(["user", "isSignedIn"]) ||
      this.props.auth.getIn(["emailSignUp", "loading"])
    );

    return (
      <div className='redux-auth email-sign-up-form'>
        <h2>{this.props.title}</h2>
        <Input type="text"
               label="Email"
               placeholder="Email"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", "form", "email"])}
               errors={this.props.auth.getIn(["emailSignUp", "errors", "email"])}
               onChange={this.handleInput.bind(this, "email")} />

        <Input type="password"
               label="Password"
               placeholder="Password"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", "form", "password"])}
               errors={this.props.auth.getIn(["emailSignUp", "errors", "password"])}
               onChange={this.handleInput.bind(this, "password")} />

        <Input type="password"
               label="Password Confirmation"
               placeholder="Password Confirmation"
               disabled={disabled}
               value={this.props.auth.getIn(["emailSignUp", "form", "password_confirmation"])}
               errors={this.props.auth.getIn(["emailSignUp", "errors", "password_confirmation"])}
               onChange={this.handleInput.bind(this, "password_confirmation")} />


        <ButtonLoader loading={this.props.auth.getIn(["emailSignUp", "loading"])}
                      glyph="send"
                      disabled={disabled}
                      onClick={this.handleSubmit.bind(this)}>
          Sign Up
        </ButtonLoader>
      </div>
    );
  }
}

export default EmailSignUpForm;