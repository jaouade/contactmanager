import React, { Component } from 'react';
import { notify } from 'react-notify-toast';
import { v4 } from 'uuid';
import axios from 'axios';
const Context = React.createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return deleteContact(state, action);

    case 'ADD_CONTACT':
      return addContact(state, action);
    case 'UPDATE_CONTACT':
      return updateContact(state, action);
    default:
      return state;
  }
};
const deleteContact = (state, action) => {
  notify.show('Contact Deleted ', 'success');
  return {
    ...state,
    contacts: state.contacts.filter(contact => contact.id !== action.payload)
  };
};
const addContact = (state, action) => {
  if (contacrAlreadyExists(state, action.payload)) {
    notify.show('Contact already exists ! ', 'warning');
  } else {
    notify.show('your new contact has been added successfully !', 'success');
    const contact = action.payload;
    contact.id = v4();
    return {
      ...state,
      contacts: [action.payload, ...state.contacts]
    };
  }
  return state;
};
const updateContact = (state, action) => {
  const contact = action.payload;
  notify.show('your new contact has been update successfully !', 'success');
  return {
    ...state,
    contacts: state.contacts.map(ct =>
      ct.id === contact.id ? (ct = contact) : ct
    )
  };
};
const contacrAlreadyExists = (state, contact) => {
  let exist;
  state.contacts.forEach(ct => {
    ct.name === contact.name &&
    ct.phone === contact.phone &&
    ct.email === contact.email
      ? (exist = true)
      : (exist = false);
  });
  return exist;
};
export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };
  async componentDidMount() {
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');

    this.setState({
      contacts: res.data
    });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
