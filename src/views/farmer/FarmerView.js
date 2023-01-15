import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  NavLink,
  Table,
  Container,
  Row,
  Col,
  Form,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import authHeader from "../../services/auth-header";
import Swal from "sweetalert2";


const FarmerView = ({ props, handleUpdate }) => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [farmer, setFarmer] = useState({});
  const [cropName, setCropName] = useState([]);
  const [cropId, setCropId] = useState("");
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  const FarmerView = () => {
    fetch(`${BaseAPI}/api/farmer/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((farmer) => {
      farmer.json().then((data) => {
        setCropId(data.cropType);
        console.log(data);
        setFarmer(data);
      });
    });
  };

  useEffect(() => {
    fetch(`${BaseAPI}/api/croptype`, {
      method: "GET",
      headers: authHeader(),
    }).then((crop) => {
      crop.json().then((data) => {
        setCropName(data);
      });
    });
  }, []);

  const DeleteFarmer = () => {
    fetch(`${BaseAPI}/api/farmer/${props._id}`, {
      method: "DELETE",
      headers: authHeader(),
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Deleted Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });}
      res.json().then((data) => {
        handleUpdate();
      });
    });
  };

  return (
    <>
      <Col lg="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            FarmerView();
            toggle();
          }}
        >
          {" "}
          View
        </Link>
        <Modal size="xl" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {farmer.firstName} {farmer.lastName} &nbsp; &nbsp; &nbsp;&nbsp;
            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;
            <Link to={"/farmer"}>
              <Button
                color="danger"
                onClick={() => {
                  toggleNested();
                }}
              >
                Delete
              </Button>
            </Link>
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Owner Type</th>
                  <td>{farmer.ownerType}</td>
                </tr>
                <tr>
                  <th>Contact Detail</th>
                  <td>{farmer.contact}</td>
                </tr>

                <tr>
                  <th>Address</th>
                  <td>{farmer.address}</td>
                </tr>
                <tr>
                  <th>Cluster Id</th>
                  <td>{farmer.clusterId}</td>
                </tr>
                <tr>
                  <th>Farming Season</th>
                  <td>{farmer.farmingSeason}</td>
                </tr>
                <tr>
                  <th>Crop Type</th>
                  {cropName.map((data) => {
                    return (
                      <>{data._id === cropId ? <td>{data.name}</td> : ""}</>
                    );
                  })}
                </tr>
                <tr>
                  <th>Veriety</th>
                  <td>{farmer.cropSubType}</td>
                </tr>
              </thead>
            </Table>
            <Modal
              className="text-center"
              isOpen={nestedModal}
              toggle={toggleNested}
              onClosed={closeAll ? toggle : undefined}
            >
              <ModalHeader>Do you want to Delete Record ?</ModalHeader>
              <ModalBody className="text-center">
                <Link to={"/farmer"}>
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleAll();
                      DeleteFarmer();
                    }}
                  >
                    Yes
                  </Button>
                </Link>
                &nbsp; &nbsp;
                <Button color="success" onClick={toggleNested}>
                  No
                </Button>
              </ModalBody>
            </Modal>
          </ModalBody>
        </Modal>
      </Col>
    </>
  );
};

export default FarmerView;
