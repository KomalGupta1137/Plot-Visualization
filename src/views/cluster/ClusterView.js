import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
// reactstrap components
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
// import ReactHtmlTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";

const ClusterView = ({props ,handleUpdate}) => {
  const history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [cluster, setCluster] = useState({});
  const [stateId, setStateId] = useState("");
  const [stateData, setStateData] = useState([]);

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


const ClusterView = () => {
  fetch(`${BaseAPI}/api/cluster/${props._id}`, {
    method: "GET",
    headers: authHeader(),
  }).then((listOfCluster) => {
    listOfCluster.json().then((datalist) => {
      setCluster(datalist);
      setStateId(datalist.state);
    });
  });
}


  useEffect(() => {
    fetch(`${BaseAPI}/api/state/${stateId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateData) => {
      stateData.json().then((state) => {
        setStateData(state);
      });
    });
  }, []);

  const DeleteCluster = () => {
    fetch(`${BaseAPI}/api/cluster/${props._id}`, {
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
      <div>
        <Link
          className="sidebar-text "
          onClick={() => {
            ClusterView();
            toggle();
          }}
        >
          {" "}
          View
        </Link>
        <Modal size="xl" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
         {cluster.clusterCode}  &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            <Link to={"/cluster"}>
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
                  <th>Cluster Id</th>
                  <td>{cluster.clusterCode}</td>
                  <th>Village</th>
                  <td>{cluster.village}</td>
                  
               
                </tr>
                <tr>
                  <th>Cluster Name</th>
                  <td>{cluster.clusterName}</td>
                  <th>Latitude</th>
                  <td>{cluster.latitude}</td>
                 
                </tr>
                <tr>
                  <th>Cluster Manager</th>
                  <td>{cluster.clusterManager}</td>
                  <th>Longitude</th>
                  <td>{cluster.longitude}</td>
                </tr>
                <tr>
                  <th>Contact Detail</th>
                  <td>{cluster.contactDetail}</td>
                  <th>Customer Stat</th>
                  <td>{cluster.customerState}</td>
                </tr>
                
                <tr>
                <th>Office Address</th>
                  <td>{cluster.officeAddress}</td>
                 
                  <th>Lead Details</th>
                  <td>{cluster.leadDetails}</td>
                </tr>
                <tr>
                   <th>State</th>
                 <td> {stateData.map((data) => {
                    return (
                      <>{data._id === stateId ? <td>{data.name}</td> : ""}</>
                    );
                  })} </td>
                 
                  <th>Hr Basic Details</th>
                  <td>{cluster.hrBasicDetails}</td> 
                </tr>
                <tr>
                <th>District</th>
                  <td>{cluster.district}</td>
               
                  
                </tr>

              </thead>
            </Table>
            <Modal
              className="text-center"
              isOpen={nestedModal}
              toggle={toggleNested}
              onClosed={closeAll ? toggle : undefined}
            >
              <ModalHeader toggle={toggle}>Do you want to Delete Record</ModalHeader>
              <ModalBody className="text-center">
                <Link to={"/cluster"}>
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleAll();
                      DeleteCluster();
                    }}
                  >
                    Yes
                  </Button>
                </Link> &nbsp; &nbsp;
                <Button color="success" onClick={toggleNested}>
                  No
                </Button>
              </ModalBody>
            </Modal>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default ClusterView;
