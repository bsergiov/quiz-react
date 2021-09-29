import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'
import is from 'is_js'
import {connect} from 'react-redux'
import {auth} from '../../store/actions/auth'

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    )
  }

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    )

  }

  submitHandler = event => {
    event.preventDefault()
  }

  validControl(value, validated) {
    if (!validated){
      return true
  }

    let isValid = true

    if (validated.required){
      isValid = value.trim() !== '' && isValid
    }

    if (validated.email){
      isValid = is.email(value) && isValid
    }

    if (validated.minLength) {
      isValid = value.length >= validated.minLength && isValid
    }

    return isValid
  }

  onChangeHandler = (event, nameControl) => {
    const formControls = {...this.state.formControls}
    const control = { ...formControls[nameControl] }

    control.value = event.target.value
    control.touched = true
    control.valid = this.validControl(control.value, control.validation)

    formControls[nameControl] = control

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
     formControls, isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((nameControl, index) => {
      const control = this.state.formControls[nameControl]
      return (
        <Input
          key={nameControl + index}
          type={control.type}
          Value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={event => this.onChangeHandler(event, nameControl)}
        />
      )
    })
  }

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>

            {this.renderInputs()}

            <Button
              type="success"
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>

            <Button
              type="primary"
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Регистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
  }
}

export default connect(null, mapDispatchToProps)(Auth)