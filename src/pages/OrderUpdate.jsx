
import api from '../components/api/index';
import React, { useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import vendorApi from '../components/api/vendorApi';
import authHeader from '../services/auth-header';
import styled from 'styled-components'
import { API_URL } from './url';
const user = JSON.parse(localStorage.getItem('user'));

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`
const File = (props) => {
  const [state, setState] = useState({
    id: props.match.params.id,
    notes:"",
    price1: "",
    price2: "",
    submission: "",
    receivedDate: "",
    orderStatus: false,
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const handleCheckBox = async event => {
    setState({
      ...state,
      [event.target.name]: event.target.checked
    });
  }
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const {id, orderStatus, receivedDate, price1, price2, submission, notes} = state
      const payload = {orderStatus, receivedDate, price1, price2, submission, notes}
      await api.updateOrderById(id, payload);
      props.history.push('/ordersList');
    } catch (error) {
      error.response && setErrorMsg(error.response.data);
    }
  };
  return (
    <>
    <br />
    <Container>
      <Row>
        <Col md={{ span: 8, offset: 2}}>
          <Jumbotron>
          <h1>Update Order</h1>
            <Form onSubmit={handleOnSubmit} >
              <Form.Row>
              <Form.Group style = {{marginLeft: '50px'}}>
                <Form.Label>
                  Price 1
                </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="1"
                    name = "price1"
                    value = {state.price1}
                    onChange = {handleChange} 

                />
              </Form.Group>
              <Form.Group style = {{marginLeft: '20px'}}>
                <Form.Label>
                    Price 2
                </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="1"
                    name = "price2"
                    value = {state.price2}
                    onChange = {handleChange} 
                />
              </Form.Group>
              <Form.Group style = {{marginLeft: '20px'}}>
                <Form.Label>
                    Submission
                </Form.Label>
                <Form.Control 
                    as="textarea" 
                    rows="1"
                    name = "submission"
                    value = {state.submission}
                    onChange = {handleChange} 
                />
              </Form.Group>
              </Form.Row>

              <Form.Row>
              <Form.Group style = {{marginLeft: '120px'}}>
                <Form.Label>Received Date</Form.Label>
                <Form.Control
                  type="date"
                  name = "receivedDate"
                  value={state.receivedDate}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group style = {{marginLeft: '50px'}}>
                  <Form.Label>Is Order Finished</Form.Label>
                  <Form.Check 
                      type="switch"
                      id="custom-switch"
                      name ="orderStatus"
                      onChange ={handleCheckBox }
                  />
                </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label>
                  Notes
                </Form.Label>
                <Form.Control as="textarea" rows="3" 
                    name = "notes"
                    value = {state.notes}
                    onChange = {handleChange} 
                />
              </Form.Group>

              <Button variant="primary" type="submit" >
                Update
              </Button>

              <CancelButton href={'/ordersList'} style = {{marginLeft: '50px'}}>Back</CancelButton>
            </Form>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
    
        
  </>
  );
};

export default File;