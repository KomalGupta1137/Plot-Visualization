// import React, { useState, useEffect } from "react";
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
// } from "reactstrap";
// // import ReactHtmlTableToExcel from "react-html-table-to-excel";
// import Sidebar from '../../components/Sidebar'
// import Header from '../../components/Header'
// import authHeader from "../../services/auth-header";
// import { faLessThanEqual } from "@fortawesome/free-solid-svg-icons";

// const DriverEdit = () => {
//   const BaseAPI = process.env.REACT_APP_SERVER_URL
//   const { driverId } = useParams();
//   let history = useNavigate();
//   const [driver, setDriver] = useState({
//     firstName: "",
//     lastName: "",
//     ownerType: "",
//     contactDetails: "",
//     state: "",
//     district: "",
//     village: "",
//     clusterId: "",
//   });
//   const [errorContact, setErrorContact] = useState(false);

//   const [cluster, setCluster] = useState([]);
//   const [stateList, setStateList] = useState([]);
//   const [districtList, setDistrictList] = useState([]);
//   const [selectedState, setSelectedState] = useState([]);
//   const [filteredDistricts, setFilteredDistricts] = useState([]);
//   const[districtFlag , setDistrictFlag] = useState(false)
//   console.log("driver state",driver.state)

//   const [modal, setModal] = useState(false);
//   const [unmountOnClose, setUnmountOnClose] = useState(true);

//   const toggle = () => setModal(!modal);
//   const changeUnmountOnClose = (e) => {
//     let { value } = e.target;
//     setUnmountOnClose(JSON.parse(value));
//   };

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/driver/${driverId}`, {
//       method: "GET",
//       headers: authHeader()
//     }).then((driverdata) => {
//       driverdata.json().then((data) => {
//         console.log(data);
//         setDriver(data);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/state`, {
//       method: "GET",
//       headers: authHeader()
//     }).then((stateList) => {
//       stateList.json().then((data) => {
//         setStateList(data);
//         console.log(data);
//       });
//     });
//   }, []);

//   const handleState = (selected) => {
//     fetch(`${BaseAPI}/api/district/${selected}`, {
//       method: "GET",
//       headers: authHeader()
//     }).then((data) => {
//       data.json().then((dataValue) => {
//         setFilteredDistricts(dataValue);
//         console.log(data);
//         setDistrictFlag(true)
//       });
//     });
//   };

//   const handleChange = (e) => {
//     console.log(e.target.name);
//     var key = e.target.name;
//     var value = e.target.value;
//     setDriver((prevState) => ({
//       ...prevState,
//       [key]: value,
//     }));
//   };

//   const UpdateDriver = (e) => {
//     e.preventDefault();
//     if (driver.contactDetails.length != 10) {
//       setErrorContact(true);
//     } else {

//     fetch(`${BaseAPI}/api/driver/${driverId}`, {
//       method: "PUT",
//       headers: authHeader(),
//       body: JSON.stringify(driver),
//     });

//     alert("Details updated Successfully.");
//     history(`/driver`);
//   };
// }

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/cluster/?page=1&size=100000`, {
//       method: "GET",
//       headers: authHeader()
//     }).then(cluster => {
//       cluster.json().then((data) => {
//         setCluster(data.cluster)
//         // console.log('cluster',data)
//       })
//     })
//   }, [])

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
//                         <Form onSubmit={UpdateDriver}>
//                           <Card className="rounded-0 p-4">
//                             <Col className="m-2">
//                               <Row>
//                                 <Col><h4><b>Driver</b></h4></Col>
//                                 <Col xs='7'>&nbsp;</Col>
//                                 <Col xs='1'><Button color="success" type="submit">Submit</Button></Col>
//                                 <Col xs='1'>
//                                   <Button color="success" onClick={toggle}>
//                                     Cancel
//                                   </Button>
//                                   <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose} className="text-center">
//                                     <ModalHeader toggle={toggle} >Do you want to exit</ModalHeader>
//                                     <ModalBody className="text-center">
//                                       <Link to={'/driver'}>
//                                         <Button color="danger">
//                                           Yes
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
//                               {/* <h3 className="mb-0">Driver Details</h3> */}
//                             </Col>
//                             <div>&nbsp;</div><br />
//                             <Row>
//                               <div className="col-sm">
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     Driver Id
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="text"
//                                       name="driverId"
//                                       value={driver.driverId}
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
//                                     First Name
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       placeholder="First Name "
//                                       id="example-text-input"
//                                       type="text"
//                                       name="firstName"
//                                       value={driver.firstName}
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
//                                     Last Name
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       placeholder="Last Name"
//                                       id="example-text-input"
//                                       type="text"
//                                       name="lastName"
//                                       value={driver.lastName}
//                                       onChange={handleChange}
//                                     />
//                                   </Col>
//                                 </FormGroup>

//                                 <FormGroup className="row">
//                                 <Label
//                                   className="form-control-label"
//                                   htmlFor="example-text-input"
//                                   md="4"
//                                 >
//                                   Contact Details
//                                 </Label>
//                                 <Col md="6">
//                                   <Input
//                                     placeholder="Contact Details"
//                                     id="example-text-input"
//                                     name="contactDetails"
//                                     value={driver.contactDetails}
//                                     onChange={(e) =>
//                                       { const check = e.target.value
//                                         const flag = true
//                                         for (var i of check){
//                                           if (!"0123456789".includes(i)){
//                                             flag =  false
//                                           }
//                                         }
//                                         if (flag){

//                                          handleChange(e)
//                                           setErrorContact(false)
//                                         }
//                                       }
//                                     }
//                                   />
//                                   <div className="my-2">
//                                     {errorContact === true ? (
//                                       <span style={{ color: "red" }}>
//                                         Please Enter Valid Contact Details
//                                       </span>
//                                     ) : (
//                                       ""
//                                     )}
//                                   </div>
//                                 </Col>
//                               </FormGroup>

//                                 <br />
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
//                                   <Input
//                                   id="example-text-input"
//                                   type="select"
//                                   name="state"
//                                   value={driver.state}
//                                   onChange={(e) => {
//                                     handleState(e.target.value);
//                                     handleChange(e);
//                                   }}
//                                 >
//                                   <option selected>Select State</option>
//                                   {stateList.map((states, index) => {
//                                     return (
//                                       <option
//                                         key={index}
//                                         value={states._id}
//                                       >
//                                         {states.name}
//                                       </option>
//                                     );
//                                   })}
//                                 </Input>
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
//                                   <Input
//                                   placeholder="District"
//                                   id="example-text-input"
//                                   type="select"
//                                   name="district"
//                                   value={driver.district}
//                                   onChange={handleChange}
//                                 >
//                                 {districtFlag === true ?
//                                 <option>Select District</option>:
//                                 <option selected>{driver.district}</option>
//                                 }
//                                   {filteredDistricts.map(
//                                     (filters, index) => {
//                                       return (
//                                         <option key={index}>
//                                           {filters.name}
//                                         </option>
//                                       );
//                                     }
//                                   )}
//                                 </Input>
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
//                                       value={driver.village}
//                                       onChange={handleChange}
//                                     ></Input>
//                                   </Col>
//                                 </FormGroup>
//                                 <FormGroup className="row">
//                                   <Label
//                                     className="form-control-label"
//                                     htmlFor="example-text-input"
//                                     md="4"
//                                   >
//                                     cluster Id
//                                   </Label>
//                                   <Col md="6">
//                                     <Input
//                                       id="example-text-input"
//                                       type="select"
//                                       name="clusterId"
//                                       value={driver.clusterId}
//                                       onChange={handleChange}
//                                     >
//                                       {cluster.map((List, index) => {
//                                         return (
//                                           <option key={index} value={List.id}>
//                                             {List.clusterCode}
//                                           </option>
//                                         );
//                                       })}
//                                     </Input>
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

// export default DriverEdit;

import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
} from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const DriverEdit = ({ props, handleUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const { driverId } = useParams();
  let history = useNavigate();
  const [driver, setDriver] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    ownerType: props.ownerType,
    contactDetails: props.contactDetails,
    state: props.state,
    district: props.district,
    village: props.village,
    clusterId: props.clusterId,
  });
  const [stateId, setStateId] = useState("");
  const [cluster, setCluster] = useState([]);
  const size = 1000000;
  const [stateList, setStateList] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [errorContact, setErrorContact] = useState(false);
  const [districtFlag, setDistrictFlag] = useState(false);
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

  // console.log("handleUpdate", handleUpdate)

  useEffect(() => {
    fetch(`${BaseAPI}/api/state`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateList) => {
      stateList.json().then((data) => {
        setStateList(data);
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
        console.log(data);
        setDistrictFlag(true);
      });
    });
  };

  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setDriver((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const DriverEdit = () => {
    fetch(`${BaseAPI}/api/driver/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfdriver) => {
      listOfdriver.json().then((datalist) => {
        setDriver(datalist);
        setStateId(datalist.state);
      });
    });
  };

  const UpdateDriver = (e) => {
    e.preventDefault();
    if (driver.contactDetails.length != 10) {
      setErrorContact(true);
    } else {
      fetch(`${BaseAPI}/api/driver/${props._id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(driver),
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
    }
  };

  useEffect(() => {
    fetch(`${BaseAPI}/api/cluster`, {
      method: "GET",
      headers: authHeader(),
    }).then((cluster) => {
      cluster.json().then((data) => {
        setCluster(data);
      });
    });
  }, []);

  return (
    <>
      <Col xs="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            toggle();
            DriverEdit();
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
              {driver.firstName} {driver.lastName} &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              <Button color="success" onClick={UpdateDriver}>
                Update
              </Button>
              &nbsp; &nbsp; &nbsp;
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
                            <div className="col-md-6">
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="4"
                                >
                                  Driver Id
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="driverId"
                                    value={driver.driverId}
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
                                  First Name
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="First Name "
                                    id="example-text-input"
                                    type="text"
                                    name="firstName"
                                    value={driver.firstName}
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
                                  Last Name
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="Last Name"
                                    id="example-text-input"
                                    type="text"
                                    name="lastName"
                                    value={driver.lastName}
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
                                  Contact Details
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="Contact Details"
                                    id="example-text-input"
                                    name="contactDetails"
                                    value={driver.contactDetails}
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

                              <br />
                            </div>
                            <div className="col-md-6">
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
                                    name="state"
                                    value={driver.state}
                                    onChange={(e) => {
                                      handleState(e.target.value);
                                      handleChange(e);
                                    }}
                                  >
                                    <option>Select State</option>
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
                                    placeholder="District"
                                    id="example-text-input"
                                    type="select"
                                    name="district"
                                    value={driver.district}
                                    onChange={handleChange}
                                  >
                                    {districtFlag === true ? (
                                      <option>Select District</option>
                                    ) : (
                                      <option selected>
                                        {driver.district}
                                      </option>
                                    )}
                                    {filteredDistricts.map((filters, index) => {
                                      return (
                                        <option key={index}>
                                          {filters.name}
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
                                  Village
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="village"
                                    value={driver.village}
                                    onChange={handleChange}
                                  ></Input>
                                </Col>
                              </FormGroup>
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="4"
                                >
                                  cluster Id
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="select"
                                    name="clusterId"
                                    value={driver.clusterId}
                                    onChange={handleChange}
                                  >
                                    {cluster.map((List, index) => {
                                      return (
                                        <option key={index} value={List.id}>
                                          {List.clusterCode}
                                        </option>
                                      );
                                    })}
                                  </Input>
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
                <ModalHeader toggle={toggle}>Do you want to exit</ModalHeader>
                <ModalBody className="text-center">
                  {" "}
                  &nbsp; &nbsp; &nbsp;
                  <Button color="danger" onClick={toggleAll}>
                    Yes
                  </Button>{" "}
                  &nbsp; &nbsp;
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

export default DriverEdit;
