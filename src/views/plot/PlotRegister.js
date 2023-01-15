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
} from "reactstrap";
// import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";

const PlotRegister = () => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [farmerName, setFarmerName] = useState("");
  const [plotId, setPlotId] = useState("");
  const [location, setLocation] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [latitude, setLatitude] = useState("");
  const [long, setLong] = useState("");
  const [clusterId, setClusterId] = useState("");
  const [areaOfPlot, setAreaOfPlot] = useState("");
  const [perimeterOfPlot, setPerimeterOfPlot] = useState("");
  const [plotShape, setPlotShape] = useState("");
  const [soilType, setSoilType] = useState("");
  const [cluster, setCluster] = useState([]);
  const [nutrientContentAnalysis, setNutrientContentAnalysis] = useState("");
  const [waterSource, setWaterSource] = useState("");
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [errorLatitude, setErrorLatitude] = useState(false);
  const { farmerId } = useParams();
  const [cropType, setCropType] = useState("");
  const [state, setState] = useState("");
  const [cultivationDate, setCultivationDate] = useState("");
  const [harvestingDate, setHarvestingDate] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cropTypeList, setCropTypeList] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  console.log("farmerId", farmerId);

  const AddPlot = (e) => {
    e.preventDefault();
    if (!latitude.includes(".")) {
      setErrorLatitude(true);

      return;
    }
    if (!long.includes(".")) {
      setErrorLongitude(true);
      return;
    }

    let registerplot = {
      farmerId: farmerId,
      plotId: plotId,
      state: state,
      location: location,
      clusterId: clusterId,
      village: village,
      district: district,
      latitude: latitude,
      long: long,
      areaOfPlot: areaOfPlot,
      perimeterOfPlot: perimeterOfPlot,
      plotShape: plotShape,
      soilType: soilType,
      cropType: cropType,
      cultivationDate:cultivationDate,
      harvestingDate:harvestingDate,
      nutrientContentAnalysis: nutrientContentAnalysis,
      waterSource: waterSource,
    };
    fetch(`${BaseAPI}/api/plot`, {
      method: "POST",
      headers: authHeader(),
      // headers: {
      //   'Content-Type': 'application/json',
      // },
      body: JSON.stringify(registerplot),
    }).then((res) => {
      console.log(res.status);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Registered Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });

    history(`/plot/${farmerId}`);
  };

  useEffect(() => {
    console.log(farmerId);
  });

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

  const handleState = (selected) => {
    fetch(`${BaseAPI}/api/district/${selected}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((dataValue) => {
        setFilteredDistricts(dataValue);
        // console.log(dataValue);
        setState(selected);
      });
    });
  };

  useEffect(() => {
    fetch(`${BaseAPI}/api/croptype`, {
      method: "GET",
      headers: authHeader(),
    }).then((cropLists) => {
      cropLists.json().then((data) => {
        setCropTypeList(data);

        console.log(data);
      });
    });
  }, []);

  return (
    <>
      <Col lg="12">
        <Container fluid lg="12">
          <Col lg="12">
            <Row>
              {/* Sidebar */}
              <Col className="start-end  bg-white" lg="2">
                <Sidebar />
              </Col>

              {/* Header */}
              <Col className="end-start" lg="10">
                <Header />

                {/* Body */}
                <Col>
                  <Col>
                    <Row>
                      <Col xs="12">
                        <Form onSubmit={AddPlot}>
                          <Card className="rounded-0 p-4">
                            <Col className="m-2">
                              <Row>
                                <Col>
                                  <h4>
                                    <b>Plot</b>
                                  </h4>
                                </Col>
                                <Col xs="8">&nbsp;</Col>
                                <Col xs="1">
                                  <Button color="danger" onClick={toggle}>
                                    Cancel
                                  </Button>
                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    unmountOnClose={unmountOnClose}
                                    className="text-center"
                                  >
                                    <ModalHeader toggle={toggle}>
                                      Do you want to Exit
                                    </ModalHeader>
                                    <ModalBody className="text-center">
                                      <Link to={`/farmer`}>
                                        <Button color="danger">Yes</Button>
                                      </Link>
                                      &nbsp; &nbsp;
                                      <Button color="success" onClick={toggle}>
                                        No
                                      </Button>
                                    </ModalBody>
                                  </Modal>
                                </Col>
                                <Col xs="1">
                                  <Button color="success" type="submit">
                                    Submit
                                  </Button>
                                </Col>
                                <Col xs="1">&nbsp;</Col>
                              </Row>
                            </Col>
                            <Col xs="6">
                              {/* <h3 className="mb-0">Farmer Details</h3> */}
                            </Col>
                            <div>&nbsp;</div>
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
                                      onChange={(e) =>
                                        setPlotId(e.target.value)
                                      }
                                      required
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="3"
                                  >
                                    Cluster Id
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Cluster Id"
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        setClusterId(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select ClusterId
                                      </option>
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
                                      required
                                      onChange={(e) =>
                                        setVillage(e.target.value)
                                      }
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
                                      onChange={(e) =>
                                        handleState(e.target.value)
                                      }
                                    >
                                      <option value="" selected>
                                        Select State
                                      </option>
                                      {stateList.map((states, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={states._id}
                                          >
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
                                      required
                                      onChange={(e) =>
                                        setDistrict(e.target.value)
                                      }
                                    >
                                      <option value="" selected>
                                        Select District
                                      </option>
                                      {filteredDistricts.map(
                                        (filters, index) => {
                                          return (
                                            <option>{filters.name}</option>
                                          );
                                        }
                                      )}
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
                                      required
                                      onChange={(e) =>
                                        setLocation(e.target.value)
                                      }
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
                                      value={latitude}
                                      placeholder="Latitude"
                                      required
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789.".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setErrorLatitude(false);
                                          setLatitude(e.target.value);
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
                                      value={long}
                                      placeholder="Longitude"
                                      required
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789.".includes(i)) {
                                            flag(false);
                                          }
                                        }
                                        if (flag) {
                                          setLong(e.target.value);
                                          setErrorLongitude(false);
                                        }
                                      }}
                                    />
                                  </Col>
                                  <div className="my-6">
                                    {errorLongitude === true ? (
                                      <span style={{ color: "red" }}>
                                        Please Enter Correct Longitude
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </div>
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
                                      placeholder="Area of Plot"
                                      onChange={(e) =>
                                        setAreaOfPlot(e.target.value)
                                      }
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
                                      placeholder="Perimeter of Plot"
                                      onChange={(e) =>
                                        setPerimeterOfPlot(e.target.value)
                                      }
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
                                      onChange={(e) =>
                                        setPlotShape(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                                {/* <FormGroup className="row">
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
                                      placeholder="Soil Type"
                                     
                                      onChange={(e) =>
                                        setSoilType(e.target.value)
                                      }
                                    ></Input>
                                  </Col>
                                </FormGroup> */}
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Crop Type
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        setCropType(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select Crop Type
                                      </option>
                                      {cropTypeList.map((cropLists, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={cropLists._id}
                                          >
                                            {cropLists.name}
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
                                    Cultivation Date
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="date"
                                      onChange={(e) =>
                                        setCultivationDate(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Harvesting Date
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="date"
                                      onChange={(e) =>
                                        setHarvestingDate(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                                {/* <FormGroup className="row">
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
                                      placeholder="Water Source"
                                     
                                      onChange={(e) =>
                                        setWaterSource(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup> */}
                              </div>
                            </Row>
                          </Card>
                        </Form>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Col>
            </Row>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default PlotRegister;
