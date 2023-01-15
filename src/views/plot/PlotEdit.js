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
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const PlotEdit = ({ props, handleUpdate }) => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [plot, setPlot] = useState({
    state: "",
    district: "",
    location: "",
    village: "",
    latitude: "",
    clusterId:"",
    long: "",
    areaOfPlot: "",
    perimeterOfPlot: "",
    plotShape: "",
    soilType: "",
    nutrientContentAnalysis: "",
    waterSource: "",
  });
  const [errorLatiitude, setErrorLatitude] = useState(false);
  const [districtFlag, setDistrictFlag] = useState(false);
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [stateId, setStateId] = useState("");
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

  //Plot By Id
  const PlotEdit = () => {
    fetch(`${BaseAPI}/api/plot/plotById/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((Plot) => {
      Plot.json().then((data) => {
        console.log(data);
        setPlot(data);
        setStateId(data.state);
      });
    });
  };

  //List Of State
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
        setDistrictFlag(true);
      });
    });
  };

  //Handle Change
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setPlot((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  //Update API
  const UpdatePlot = (e) => {
    e.preventDefault();
    if (!plot.latitude.toString().includes(".")) {
      setErrorLatitude(true);
      return;
    }
    if (!plot.long.toString().includes(".")) {
      setErrorLongitude(true);
      return;
      
    }
    
    
    fetch(`${BaseAPI}/api/plot/${props._id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(plot),
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
            PlotEdit();
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
              {plot.plotId} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              <Button color="success" onClick={UpdatePlot}>
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
                            <div className="col-sm">
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="3"
                                >
                                  Plot Id
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="Plot Id"
                                    id="example-text-input"
                                    type="text"
                                    name="plotId"
                                    readOnly
                                    value={plot.plotId}
                                    onChange={handleChange}
                                  />
                                </Col>
                              </FormGroup>

                              <FormGroup className="row">
                              <Label
                                className="form-control-label"
                                htmlFor="example-text-input"
                                md="3"
                              >
                                ClusterId
                              </Label>
                              <Col md="6">
                                <Input
                                  id="example-text-input"
                                  type="text"
                                  placeholder="Cluster Id"
                                  name="clusterId"
                                  value={plot.clusterId}
                                  onChange={handleChange}
                                />
                              </Col>
                            </FormGroup>
                              <FormGroup className="row">
                              <Label
                                className="form-control-label"
                                htmlFor="example-text-input"
                                md="3"
                              >
                                Village
                              </Label>
                              <Col md="6">
                                <Input
                                  id="example-text-input"
                                  type="text"
                                  placeholder="Village"
                                  name="village"
                                  value={plot.village}
                                  onChange={handleChange}
                                />
                              </Col>
                            </FormGroup>
                            

                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="3"
                                >
                                  State
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="select"
                                    required
                                    name="state"
                                    value={plot.state}
                                    onChange={(e) => {
                                      handleState(e.target.value);
                                      handleChange(e);
                                    }}
                                  >
                                    <option selected>Select State</option>
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
                                md="3"
                              >
                                District
                              </Label>
                              <Col md="6">
                                <Input
                                  id="example-text-input"
                                  type="select"
                                  placeholder="Select District"
                                  name="district"
                                  value={plot.district}
                                  onChange={handleChange}
                                >
                                  {districtFlag === true ? (
                                    <option>Select District</option>
                                  ) : (
                                    <option selected>{plot.district}</option>
                                  )}
                                  {filteredDistricts.map((filters, index) => {
                                    return <option>{filters.name}</option>;
                                  })}
                                </Input>
                              </Col>
                            </FormGroup>
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="3"
                                >
                                  Location
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    placeholder="Location"
                                    name="location"
                                    value={plot.location}
                                    onChange={handleChange}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="3"
                                >
                                  Latitude
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="latitude"
                                    placeholder="Latitude"
                                    value={plot.latitude}
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
                                    {errorLatiitude === true ? (
                                      <span style={{ color: "red" }}>
                                        Please Enter Correct Latitude
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                </Col>
                              </FormGroup>
                              <br />
                            </div>
                            <div className="col-sm">
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
                                    name="long"
                                    placeholder="Longitude"
                                    value={plot.long}
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
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="4"
                                >
                                  Area 
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    placeholder="Area"
                                    name="areaOfPlot"
                                    value={plot.areaOfPlot}
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
                                  Perimeter 
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    placeholder="Perimeter"
                                    name="perimeterOfPlot"
                                    value={plot.perimeterOfPlot}
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
                                  Plot Shape
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    placeholder="Plot Shape"
                                    name="plotShape"
                                    value={plot.plotShape}
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
                                  Soil Type
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="soilType"
                                    placeholder="Soil Type"
                                    value={plot.soilType}
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
                                  Water Source
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="waterSource"
                                    placeholder="Water Source"
                                    value={plot.waterSource}
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

export default PlotEdit;
