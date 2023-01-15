import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  CardText,
  CardTitle,
  TabPane,
  TabContent,
  NavItem,
  NavLink,
  Nav
} from "reactstrap";
// import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import CropType from "./CropType"
import Implement from "./Implement"


const Settings = () => {


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
                      <Col>
                        <Card className="p-4 rounded-0">
                          <Col>
                            <Col>
                              <Row>
                                <Tabs
                                  defaultActiveKey="home"
                                  id="fill-tab-example"
                                  className="mb-3"
                                  fill
                                >
                                  <Tab eventKey="home" title="CropType/Variety" >
                                    <CropType />
                                  </Tab>
                                  <Tab eventKey="" title="Implement" >
                                  <Implement/>
                                  </Tab>
                                  <Tab eventKey="" title="Other Crud Operation" >
                                  </Tab>


                                </Tabs>
                              </Row>
                            </Col>
                          </Col>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Col>
                {/* <Col>
                  <Col>
                    <Row>
                      <Tabs
                        defaultActiveKey="home"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                      >
                        <Tab eventKey="home" title="CropType/Variety" >
                          <CropType />
                        </Tab>
                        <Tab eventKey="" title="Implement" >
                          <h1>Coming Soon!!!</h1>
                        </Tab>
                        <Tab eventKey="" title="Other Crud Operation" >
                          <h1>Coming Soon!!!</h1>
                        </Tab>


                      </Tabs>
                    </Row>
                  </Col>
                </Col> */}

              </Col>
            </Row>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default Settings;
