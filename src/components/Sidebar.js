import {
  faTvAlt,
  faAtom,
  faIdBadge,
  faUser,
  faBusAlt,
  faAddressCard,
  faShield,
  faGear,
  faTractor,
  faTruck,
  faMap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Logo from "../assets/image/logo-gif.gif";

const Sidebar = () => {
  const activeLink = "text-black fw-bold sidebar-text col-sm-10";
  const inActiveLink = "text-black sidebar-text col-sm-10";
  return (
    <>
      <Col xs="12" className="position-fixed">
        <Col>
          <Col className="p-3">
            <Image className="sidebar-image" src={Logo} />
          </Col>
        </Col>
        <Col className="p-2  m-2 position-fixed">
          {/* <Col className='mt-3' >
                        <Row>
                            <Col xs="2" className='text-success'><FontAwesomeIcon icon={faTvAlt} /></Col>
                            <Link to='/home' className='text-black sidebar-text col-sm-10'><Col xs="2">Home</Col></Link>
                        </Row>
                    </Col> */}
          <Col className="mt-3">
            <Row>
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faTvAlt} />
              </Col>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="2">Dashboard</Col>
              </NavLink>
            </Row>
          </Col>
          <Col className="mt-3">
            <Row>
              {/* <Col xs="1">&nbsp;</Col> */}
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faAtom} />
              </Col>
              <NavLink
                to="/cluster"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="2">Cluster</Col>
              </NavLink>
            </Row>
          </Col>
          <Col className="mt-3">
            <Row>
              {/* <Col xs="1">&nbsp;</Col> */}
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faAddressCard} />
              </Col>
              <NavLink
                to="/farmer"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="2">Farmer</Col>
              </NavLink>
            </Row>
          </Col>
          <Col className="mt-3"></Col>
          <Col className="mt-3">
            <Row>
              {/* <Col xs="1">&nbsp;</Col> */}
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faUser} />
              </Col>
              <NavLink
                to="/driver"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="2">Driver</Col>
              </NavLink>
            </Row>
          </Col>

          <Col className="mt-3">
            <Row>
              {/* <Col xs="1">&nbsp;</Col> */}
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faTractor} />
              </Col>
              <NavLink
                to="/machine"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="2">Machine</Col>
              </NavLink>
            </Row>
          </Col>
          <Col className="mt-3">
            <Row>
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faTruck} />
              </Col>
              <NavLink
                to="/device-management"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="12" className="p-0">
                  Machine History
                </Col>
              </NavLink>
              <Col></Col>
            </Row>
          </Col>
          <Col className="mt-3">
            <Row>
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faGear} />
              </Col>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  isActive ? activeLink : inActiveLink
                }
              >
                <Col xs="12" className="p-0">
                  Settings
                </Col>
              </NavLink>
            </Row>
          </Col>
          <Col className="mt-3">
            <Row>
              <Col xs="2" className="text-success">
                <FontAwesomeIcon icon={faMap} />
              </Col>
              <Link to="/bingmap" className="text-black sidebar-text col-sm-10">
                <Col xs="12" className="p-0">
                  Map View
                </Col>
              </Link>
              <Col></Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col xs="2">
                <h6>2023 Agrix.All Rights Reserved |Privacy Policy</h6>
              </Col>
            </Row>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default Sidebar;
