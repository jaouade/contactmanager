import React, { Component } from 'react';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';
import CardHeader from '../layout/CardHeader';
import { v4 } from 'uuid';
import axios from 'axios';
class AddContact extends Component {
  state = {
    id: '',
    name: '',
    email: '',
    phone: '',
    isFormShown: true,
    errors: {}
  };
  onFormChanged = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onClickShowForm = e => {
    this.setState({
      isFormShown: !this.state.isFormShown
    });
  };
  onSubmitContactForm = async (dispatch, e) => {
    e.preventDefault();
    if (this.validateInputs()) {
      const { name, email, phone } = this.state;
      const newContact = {
        name,
        email,
        phone
      };
      const res = await axios.post(
        'https://jsonplaceholder.typicode.com/users',
        newContact
      );
      dispatch({ type: 'ADD_CONTACT', payload: res.data });

      this.setState({
        id: '',
        name: '',
        email: '',
        phone: '',
        errors: {}
      });
      this.props.history.push('/');
    }
  };
  validateInputs() {
    if (this.state.name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return false;
    }
    if (this.state.email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return false;
    }
    if (this.state.phone === '') {
      this.setState({
        errors: {
          phone: 'Phone is required'
        }
      });
      return false;
    }
    return true;
  }

  render() {
    const { name, email, phone, isFormShown, errors } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card  bg-transparent border-success mb-3">
              <CardHeader
                isBodyShown={isFormShown}
                onclick={this.onClickShowForm}
                title="Add Contact "
                key={v4()}
              />
              {isFormShown ? (
                <div className="card-body">
                  <form
                    onSubmit={this.onSubmitContactForm.bind(this, dispatch)}
                  >
                    <TextInputGroup
                      label="Name"
                      name="name"
                      onChange={this.onFormChanged}
                      value={name}
                      placeholder="Enter Name ..."
                      error={errors.name}
                    />
                    <TextInputGroup
                      label="Email"
                      name="email"
                      onChange={this.onFormChanged}
                      value={email}
                      type="email"
                      placeholder="Enter Email ..."
                      error={errors.email}
                    />
                    <TextInputGroup
                      label="Phone"
                      name="phone"
                      onChange={this.onFormChanged}
                      value={phone}
                      placeholder="Enter Phone ..."
                      error={errors.phone}
                    />
                    <input
                      type="submit"
                      className="btn btn-block btn-danger"
                      value="Add Contact"
                    />
                  </form>
                </div>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
