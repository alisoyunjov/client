import React, { useState, useRef,useEffect  } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import '../styles.scss';
import { Container, Col, Row, Jumbotron, Form, Button } from 'react-bootstrap';
import vendorApi from '../components/api/vendorApi';
import authHeader from '../services/auth-header';
import { API_URL } from './url';
const user = JSON.parse(localStorage.getItem('user'));
// window.alert(user.role)
const File = (props) => {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage
  const [vendorList, setVendorList] = useState([]);
  const [state, setState] = useState({
    title: '',
    description2: '',
    orderMadeBy: '',
    daysSinceRequest: "",
    vendor1: "",
    vendor2: "",
    category: "",
    catalog1: "",
    catalog2: "",
    date: "",
    notes:"",
    msdFile:false, 
    price1: "",
    price2: "",
    submission: "",
    receivedDate: "",
    orderStatus: "",
    description: "",
    requestDay: "",
    vendors:[]
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area
  const [filesList, setFilesList] = useState([]);




  useEffect(() => {
    const getFilesList = async () => {
      try {
        const { data } = await axios.get('http://localhost:8082/api/vendors/allVendors');
        setErrorMsg('');
        setVendorList(data.data);
      } catch (error) {
        error.response && setErrorMsg(error.response.data);
      }
    };

    getFilesList();
  }, []);
  
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

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
    dropRef.current.style.border = '2px dashed #e9ebeb';
  };

  const updateBorder = (dragState) => {
    if (dragState === 'over') {
      dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const { title, description2, orderStatus, receivedDate, price1, daysSinceRequest, price2, requestDay, submission, vendor1, vendor2, category, catalog1, catalog2, date, description,notes, msdFile} = state;
     
        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
          formData.append('description2', description2);
          formData.append('vendor1', vendor1);
          formData.append('vandor2', vendor2);
          formData.append('catalog1', catalog1 );
          formData.append('catalo2', catalog2);
          formData.append('category', category);
          formData.append('date', date);
          formData.append('requestDay', requestDay);
          formData.append('description', description);
          formData.append('notes', notes);
          formData.append('orderMadeBy', user.name);
          formData.append('msdFile', msdFile);
          formData.append('price1', price1);
          formData.append('submission', submission);
          formData.append('price2', price2);
          formData.append('receivedDate', receivedDate);
          formData.append('orderStatus', orderStatus);
          formData.append('daysSinceRequest', daysSinceRequest);
          setErrorMsg('');
          await axios.post(`${API_URL}/upload`, formData,
            {headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': user.token
            }});
          props.history.push('/viewOrders');
        } else {
          setErrorMsg('Please select a file to add.');
        }
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
            <h1>Make Order</h1>
              <Form onSubmit={handleOnSubmit}>
              {errorMsg && <p className="errorMsg">{errorMsg}</p>}
                  <Form.Row>
                  <Form.Group as={Col} controlId="formGridBreed">
                    <Form.Label>Vendor1</Form.Label>
                    <Form.Control
                      as="select"
                      value={state.vendor1}
                      name = "vendor1"
                      onChange={handleChange}
                    >
                      <option>Choose Vendor</option>
                      {vendorList.map((vendor) =>(
                        <option>{vendor.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridBreed">
                    <Form.Label>Vendor2</Form.Label>
                    <Form.Control
                      as="select"
                      value={state.vendor2}
                      name = "vendor2"
                      onChange={handleChange}
                    >
                      <option>Choose Vendor</option>
                      {vendorList.map((vendor) =>(
                        <option>{vendor.name}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form.Row>
                <Form.Group as={Col} controlId="formGridBreed">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      as="select"
                      value={state.category}
                      name = "category"
                      onChange={handleChange}
                    >
                      <option>Choose category</option>
                      <option>Consumable, reagent</option>
                      <option>Equipment</option>
                      <option>Bengal</option>
                      <option>Birman</option>
                    </Form.Control>
                  </Form.Group>
                <Form.Group>
                  <Form.Label>
                    Catalog 1
                  </Form.Label>
                  <Form.Control 
                      as="textarea" 
                      rows="1"
                      name = "catalog1"
                      value = {state.catalog1}
                      onChange = {handleChange} 

                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                      Catalog 2
                  </Form.Label>
                  <Form.Control 
                      as="textarea" 
                      rows="1"
                      name = "catalog2"
                      value = {state.catalog2}
                      onChange = {handleChange} 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                      Item Description
                  </Form.Label>
                  <Form.Control 
                      as="textarea" 
                      rows="1"
                      name = "description"
                      value = {state.description}
                      onChange = {handleChange} 
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Needed By</Form.Label>
                  <Form.Control
                    type="date"
                    name = "date"
                    value={state.date}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Row>

                <Form.Group style = {{margin: 'auto', marginBottom: '20px'}}>
                  <Form.Label>Is MSD File Attached</Form.Label>
                  <Form.Check 
                      type="switch"
                      id="custom-switch"
                      name ="msdFile"
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
                <Form.Group>
                  <Form.Label>
                     Description
                  </Form.Label>
                  <Form.Control 
                      type="text"
                      name="description2"
                      value={state.description2 || ''}
                      placeholder="Enter description"
                      onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                      Title
                  </Form.Label>
                  <Form.Control 
                      type="text"
                      name="title"
                      value={state.title || ''}
                      placeholder="Enter title"
                      onChange = {handleChange} 
                  />
                </Form.Group>
                <div className="upload-section" style = {{marginBottom: '20px'}}>
                  <Dropzone
                    onDrop={onDrop}
                    onDragEnter={() => updateBorder('over')}
                    onDragLeave={() => updateBorder('leave')}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                        <input {...getInputProps()} />
                        <button style = {{width: '50%', height: '3em'}}> Attach your file</button>
                        {file && (
                          <div>
                            <strong>Selected file:</strong> {file.name}
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                </div>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default File;