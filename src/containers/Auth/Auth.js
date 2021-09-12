import React, {Component} from 'react'
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/input/input'


function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export default class Auth extends Component {

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

  loginHandler() {

  }

  registerHandler() {

  }

  submitHandler = (event) => {
    event.preventDefault()
  }

  validControl(value, validated){
    if (!validated)
      return true

    let isValid = true
    if (validated.required)
      isValid = value.trim() !== '' && isValid

    if (validated.email)
      isValid = validateEmail(value) && isValid

    if (validated.minLength)
      isValid = value.length >= validated.minLength && isValid

    return isValid
  }

  onChangeHandler = (event, nameControl) => {
    const formControls = {...this.state.formControls}
    const control = formControls[nameControl]

    control.value = event.target.value
    control.touched = true
    control.valid = this.validControl(control.value, control.validation)

    let isFormValid = true
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    formControls[nameControl] = control
    this.setState({
      formControls: formControls,
      isFormValid: isFormValid

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