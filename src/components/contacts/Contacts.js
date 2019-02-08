import React, { Component } from 'react';
import Contact from './Contact';
import { Consumer } from '../../context';
import CardHeader from '../layout/CardHeader';
import { v4 } from 'uuid';
class Contacts extends Component {
  state = {
    showContacts: true
  };
  onClickShowContacts = e => {
    this.setState({
      showContacts: !this.state.showContacts
    });
  };
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          const { showContacts } = this.state;
          return (
            <React.Fragment>
              <h1 className="display-4 mb-2">
                <span className="text-danger">Contact </span> List
              </h1>
              <div className="card bg-transparent border-warning mb-3">
                <CardHeader
                  isBodyShown={showContacts}
                  onclick={this.onClickShowContacts}
                  color="warning"
                  title="Contacts"
                  key={v4()}
                />

                {showContacts ? (
                  <div className="card-body">
                    <div className="row">
                      {contacts.length > 0 ? (
                        contacts.map(contact => (
                          <Contact key={contact.id} contact={contact} />
                        ))
                      ) : (
                        <div className="alter alert-info">
                          there is no contacts yet
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default Contacts;
