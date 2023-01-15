import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// import { Card, Col, Container, Row } from "react-bootstrap";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
// import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";

const ClusterEdit = ({ props, handleUpdate }) => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [cluster, setCluster] = useState({
    clusterCode: "",
    clusterName: "",
    clusterManager: "",
    village: "",
    district: "",
    state: "",
    latitude:"",
    longitude:"",
    officeAddress: "",
    contactDetail: "",
    customerState: "",
    hrBasicDetails: "",
    leadDetails: "",
  });
  const { clusterId } = useParams();
  const [stateList, setStateList] = useState([]);
  const [errorContact, setErrorContact] = useState(false);
  const [districtFlag, setDistrictFlag] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [errorLatitude ,setErrorLatitude] = useState(false)
  const [errorLongitude ,setErrorLongitude] = useState(false)
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const ClusterEdit = () => {
    fetch(`${BaseAPI}/api/cluster/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((cluster) => {
      cluster.json().then((data) => {
        console.log(data);
        setCluster(data);
      });
    });
  };

  useEffect(() => {
    fetch(`${BaseAPI}/api/state`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateList) => {
      stateList.json().then((data) => {
        setStateList(data);
        console.log(data);
      });
    });
  }, []);

  const handleState = (selected) => {
    fetch(`${BaseAPI}/api/district/${selected}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((dataValue) => {
        setFilteredDistricts(dataValue);
        setDistrictFlag(true);
        // console.log(data);
      });
    });
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setCluster((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const UpdateCluster = (e) => {
    e.preventDefault();
    if (cluster.contactDetail.toString().length != 10) {
      setErrorContact(true);
      return;
    }if (!cluster.latitude.toString().includes(".")) {
      setErrorLatitude(true);
      return;
    }
    if (!cluster.longitude.toString().includes(".")) {
      setErrorLongitude(true);
      return;
      
    } 
      fetch(`${BaseAPI}/api/cluster/${props._id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(cluster),
      }).then((res) => {
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Updated Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });}
      })
      handleUpdate();
      toggle();
    
  };

  return (
    <>
    <Col xs="12">
    <Link
      className="sidebar-text "
      onClick={() => {
        toggle();
        ClusterEdit();
      }}
    >
      {" "}
      Edit
    </Link>
    <Row>
      <Modal
        size="xl"
        isOpen={modal}
        toggle={toggle}
        unmountOnClose={unmountOnClose}
        className="text-center"
      >
        <ModalHeader toggle={toggle}>
         {cluster.clusterCode}   &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
          <Button color="success" onClick={UpdateCluster}>
            Update
          </Button> &nbsp; &nbsp;
          <Button color="danger" onClick={toggleNested}>
            Cancel
          </Button>
        </ModalHeader>
        <ModalBody className="text-center">
          <Col>
            <Col>
              <Row>
                <Col lg="12">
                  <Form>
                    <Card className="rounded-0 p-4">
                    <Row>
                    <div className="col-sm">
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Cluster Id
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="text"
                            name="clusterCode"
                            value={cluster.clusterCode}
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Cluster Name
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="text"
                            name="clusterName"
                            value={cluster.clusterName}
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Cluster Manager
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="text"
                            name="clusterManager"
                            value={cluster.clusterManager}
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Contact Detail
                        </Label>
                        <Col md="7">
                        
                          <Input
                            id="example-text-input"
                            type="text"
                            value={cluster.contactDetail}
                            name="contactDetail"
                            onChange={(e) => {
                              const check = e.target.value;
                              const flag = true;
                              for (var i of check) {
                                if (!"0123456789".includes(i)) {
                                  flag = false;
                                }
                              }
                              if (flag) {
                                handleChange(e);
                                setErrorContact(false);
                              }
                            }}
                          />
                          <div className="my-2">
                            {errorContact === true ? (
                              <span style={{ color: "red" }}>
                                Please Enter Valid Contact Details
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Office Address
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="textarea"
                            value={cluster.officeAddress}
                            name="officeAddress"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                    </div>
                    <div className="col-sm">
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="4"
                        >
                          State
                        </Label>
                        <Col md="6">
                          <Input
                            id="example-text-input"
                            type="select"
                            value={cluster.state}
                            name="state"
                            onChange={(e) => {
                              handleState(e.target.value);
                              handleChange(e);
                            }}
                          >
                            {/* <option selected>Select State</option> */}
                            {stateList.map((states, index) => {
                              return (
                                <option key={index} value={states._id}>
                                  {states.name}
                                </option>
                              );
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="4"
                        >
                          District
                        </Label>
                        <Col md="6">
                          <Input
                            id="example-text-input"
                            type="select"
                            value={cluster.district}
                            name="district"
                            onChange={handleChange}
                          >
                            {districtFlag === true ? (
                              <option>Select District</option>
                            ) : (
                              <option selected>{cluster.district}</option>
                            )}
            
                            {/* <option selected>Select District</option> */}
                            {filteredDistricts.map((filters, index) => {
                              return <option key={index}>{filters.name}</option>;
                            })}
                          </Input>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="4"
                        >
                          Village
                        </Label>
                        <Col md="6">
                          <Input
                            id="example-text-input"
                            type="text"
                            name="village"
                            value={cluster.village}
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="4"
                        >
                          Latitude
                        </Label>
                        <Col md="6">
                          <Input
                            id="example-text-input"
                            type="text"
                            name="latitude"
                            value={cluster.latitude}
                            onChange={(e) => {
                              const check = e.target.value;
                              const flag = true;
                              for (var i of check) {
                                if (!"0123456789.".includes(i)) {
                                  flag = false;
                                }
                              }
                              if (flag) {
                                handleChange(e);
                                setErrorLatitude(false);
                              }
                            }}
                          />
                          <div className="my-2">
                            {errorLatitude === true ? (
                              <span style={{ color: "red" }}>
                                Please Enter Correct Latitude
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="4"
                        >
                          Longitude
                        </Label>
                        <Col md="6">
                          <Input
                            id="example-text-input"
                            type="text"
                            name="longitude"
                            value={cluster.longitude}
                            onChange={(e) => {
                              const check = e.target.value;
                              const flag = true;
                              for (var i of check) {
                                if (!"0123456789.".includes(i)) {
                                  flag = false;
                                }
                              }
                              if (flag) {
                                handleChange(e);
                                setErrorLongitude(false);
                              }
                            }}
                          />
                           <div className="my-2">
                            {errorLongitude === true ? (
                              <span style={{ color: "red" }}>
                                Please Enter Correct Longitude
                              </span>
                            ) : (
                              ""
                            )}
                          </div>
                        </Col>
                      </FormGroup>
                 
                 
                    </div>
            
                    <div className="col-sm">
                  
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Hr Basic Details
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="text"
                            value={cluster.hrBasicDetails}
                            name="hrBasicDetails"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Customer Stat
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="text"
                            value={cluster.customerState}
                            name="customerState"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>
                      <FormGroup className="row">
                        <Label
                          className="form-control-label"
                          htmlFor="example-text-input"
                          md="5"
                        >
                          Lead Details
                        </Label>
                        <Col md="7">
                          <Input
                            id="example-text-input"
                            type="text"
                            value={cluster.leadDetails}
                            name="leadDetails"
                            onChange={handleChange}
                          />
                        </Col>
                      </FormGroup>

                      
                    </div>
                  </Row>
                    </Card>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Col>
          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <ModalHeader>Do you want to exit ?</ModalHeader>
            <ModalBody className="text-center">
              {" "}
              <Button color="danger" onClick={toggleAll}>
                Yes
              </Button> &nbsp; &nbsp;
              <Button color="success" onClick={toggleNested}>
                No
              </Button>{" "}
            </ModalBody>
          </Modal>
        </ModalBody>
      </Modal>
    </Row>
  </Col>
    </>
  );
};

export default ClusterEdit;

// import { Link, useNavigate, useParams } from "react-router-dom";
// // import { Card, Col, Container, Row } from "react-bootstrap";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardHeader,
//   Col,
//   Container,
//   Form,
//   FormGroup,
//   Input,
//   Label,
//   Table,
//   Row,
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
// } from "reactstrap";
// // import ReactHtmlTableToExcel from "react-html-table-to-excel";
// import Sidebar from "../../components/Sidebar";
// import Header from "../../components/Header";
// import authHeader from "../../services/auth-header";

// const ClusterEdit = () => {
//   let history = useNavigate();
//   const BaseAPI = process.env.REACT_APP_SERVER_URL;
//   const [cluster, setCluster] = useState({
//     clusterCode: "",
//     clusterName: "",
//     clusterManager: "",
//     village: "",
//     district: "",
//     state: "",
//     officeAddress: "",
//     contactDetail: "",
//     customerState: "",
//     sales: "",
//     purchase: "",
//     expenditure: "",
//     hrBasicDetails: "",
//     leadDetails: "",
//   });
//   const { clusterId } = useParams();
//   const [stateList, setStateList] = useState([]);
//   const [districtList, setDistrictList] = useState([]);
//   const [selectedState, setSelectedState] = useState([]);
//   const [filteredDistricts, setFilteredDistricts] = useState([]);

//   const [modal, setModal] = useState(false);
//   const [unmountOnClose, setUnmountOnClose] = useState(true);

//   const toggle = () => setModal(!modal);
//   const changeUnmountOnClose = (e) => {
//     let { value } = e.target;
//     setUnmountOnClose(JSON.parse(value));
//   };

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/cluster/${clusterId}`, {
//       // fetch(`http://localhost:8081/api/cluster/${clusterId}`, {
//       method: "GET",
//       headers: authHeader(),
//     }).then((cluster) => {
//       cluster.json().then((data) => {
//         console.log(data);
//         setCluster(data);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/state`, {
//       // fetch("http://localhost:8081/api/state", {
//       method: "GET",
//       headers: authHeader(),
//     }).then((stateList) => {
//       stateList.json().then((data) => {
//         setStateList(data);
//         console.log(data);
//       });
//     });
//   }, []);

//   const handleState = (selected) => {
//     fetch(`${BaseAPI}/api/district/${selected}`,{
//       method:"GET",
//       headers:authHeader()
//      }).then((data) => {
//       data.json().then((dataValue) => {
//         setFilteredDistricts(dataValue);
//         console.log(data);
//       });
//     });
//   };

//   const handleChange = (e) => {
//     console.log(e.target.name);
//     var key = e.target.name;
//     var value = e.target.value;
//     setCluster((prevState) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const UpdateCluster = (e) => {
//     e.preventDefault();
//     fetch(`${BaseAPI}/api/cluster/${clusterId}`, {
//       // fetch(`http://localhost:8081/api/cluster/${clusterId}`, {
//       method: "PUT",
//       headers: authHeader(),
//       body: JSON.stringify(cluster),
//     });
//     alert("Data Updated successfully.");
//     history(`/cluster`);
//     console.log("update",cluster);
//   };

//   return (
//     <>
//       <Col lg="12">
//         <Container fluid lg="12">
//           <Col lg="12">
//             <Row>
//               {/* Sidebar */}
//               <Col className="start-end  bg-white" lg="2">
//                 <Sidebar />
//               </Col>

//               {/* Header */}
//               <Col className="end-start" lg="10">
//                 <Header />

//                 {/* Body */}
//                 <Col>
//                   <Col>
//                     <Row>
//                       <Col xs="12">
//                         <Form onSubmit={UpdateCluster}>
//                           <Card className="rounded-0 p-4">
//                             <Col className="m-2">
//                               <Row>
//                                 <Col>
//                                   <h4>
//                                     <b>{cluster.clusterName}</b>
//                                   </h4>
//                                 </Col>
//                                 <Col xs="7">&nbsp;</Col>
//                                 <Col xs='1'>
//                                     <Button color="success">Submit</Button>
//                                 </Col>
//                                 <Col xs='1'>
//                                   <Button color="success" onClick={toggle}>
//                                     Cancel
//                                   </Button>
//                                   <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose} className="text-center">
//                                     <ModalHeader toggle={toggle} >Do you want to exit</ModalHeader>
//                                     <ModalBody className="text-center">
//                                       <Link to={'/cluster'}>
//                                         <Button color="danger">
//                                         Yes
//                                         </Button>
//                                       </Link>&nbsp; &nbsp;
//                                       <Button color="success" onClick={toggle}>
//                                         No
//                                       </Button>
//                                     </ModalBody>
//                                   </Modal>
//                                 </Col>
//                                 <Col xs='1'>&nbsp;</Col>
//                               </Row>
//                             </Col>
//                             <Col xs="6">
//                               {/* <h3 className="mb-0">Applicant Details</h3> */}
//                             </Col>
//                             <div>&nbsp;</div>
//                             <Row>
//                               <div className="col-sm">
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Cluster Id
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       name="clusterCode"
//                                       value={cluster.clusterCode}
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Cluster Name
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       name="clusterName"
//                                       value={cluster.clusterName}
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Cluster Manager
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       name="clusterManager"
//                                       value={cluster.clusterManager}
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Contact Detail
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.contactDetail}
//                                       name="contactDetail"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Office Address
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="textarea"
//                                       value={cluster.officeAddress}
//                                       name="officeAddress"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                               </div>
//                               <div className="col-sm">
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     State
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="select"
//                                       // value={cluster.state}
//                                       name="state"
//                                       onChange={(e) => {handleState(e.target.value )
//                                         handleChange(e)
//                                         }}
//                                     >
//                                       <option selected>Select State</option>
//                                       {stateList.map((states, index) => {
//                                         return (
//                                           <option key={index} value={states._id}>
//                                             {states.name}
//                                           </option>
//                                         );
//                                       })}
//                                     </Input>
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     District
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="select"
//                                       value={cluster.district}
//                                       name="district"
//                                       onChange={handleChange}
//                                     >
//                                       <option selected>Select District</option>
//                                       {filteredDistricts.map(
//                                         (filters, index) => {
//                                           return (
//                                             <option>{filters.name}</option>
//                                           );
//                                         }
//                                       )}
//                                     </Input>
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     Village
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       name="village"
//                                       value={cluster.village}
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     Sales
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.sales}
//                                       name="sales"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     Purchase
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.purchase}
//                                       name="purchase"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                               </div>

//                               <div className="col-sm">

//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Expenditure
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.expenditure}
//                                       name="expenditure"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Hr Basic Details
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.hrBasicDetails}
//                                       name="hrBasicDetails"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Customer Stat
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.customerState}
//                                       name="customerState"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="5"
//                                   >
//                                     Lead Details
//                                   </Label>
//                                   <Col md="7">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       value={cluster.leadDetails}
//                                       name="leadDetails"
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>
//                               </div>
//                             </Row>
//                           </Card>
//                         </Form>
//                       </Col>
//                     </Row>
//                   </Col>
//                 </Col>
//               </Col>
//             </Row>
//           </Col>
//         </Container>
//       </Col>
//     </>
//   );
// };

// export default ClusterEdit;
