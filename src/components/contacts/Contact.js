import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import CardHeader from '../layout/CardHeader';
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';
import axios from 'axios';
class Contact extends Component {
  state = {
    ShowContactInfo: false
  };
  onShowClick = e => {
    this.setState({ ShowContactInfo: !this.state.ShowContactInfo });
  };
  onDeleteClick = async (id, dispatch) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    dispatch({ type: 'DELETE_CONTACT', payload: id });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { ShowContactInfo } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className=" col-lg-4 col-sm-6 col-md-4 col-12">
              <div className="card border-info mb-3">
                <CardHeader
                  isBodyShown={ShowContactInfo}
                  onclick={this.onShowClick}
                  firstClass="fa-chevron-down"
                  oppositeClass="fa-chevron-up"
                  title={[<strong>{name}</strong>]}
                  color="info"
                  key={v4()}
                />
                {ShowContactInfo ? (
                  <React.Fragment>
                    <div className="card-body text-success">
                      <p className="card-text">
                        <ul className="list-group">
                          <li className="list-group-item">Email : {email}</li>
                          <li className="list-group-item">Phone : {phone}</li>
                        </ul>
                      </p>
                    </div>
                    <div className="card-footer bg-transparent border-success">
                      <Link
                        to={`contact/edit/${id}`}
                        className="btn btn-warning"
                      >
                        <i
                          className="fas fa-edit fa-xs"
                          style={{ cursor: 'pointer' }}
                        />{' '}
                        Edit
                      </Link>
                      <button
                        style={{ float: 'right' }}
                        className="btn btn-danger pull-right"
                        onClick={this.onDeleteClick.bind(this, id, dispatch)}
                      >
                        <i
                          className="fas fa-times fa-xs"
                          style={{ cursor: 'pointer' }}
                        />{' '}
                        Delete
                      </button>
                    </div>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact;
