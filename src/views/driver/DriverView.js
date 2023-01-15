// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useParams } from 'react-router-dom';
// // reactstrap components
// import {
//   Badge,
//   Button,
//   Card,
//   CardHeader,
//   NavLink,
//   Table,
//   Container,
//   Row,
//   Col,
//   Form,
//   UncontrolledTooltip,
//   Modal,
//   ModalHeader,
//   ModalBody
// } from "reactstrap";
// // import ReactHtmlTableToExcel from "react-html-table-to-excel";
// import Sidebar from '../../components/Sidebar'
// import Header from '../../components/Header'
// import authHeader from "../../services/auth-header";

// const DriverView = () => {
//   const history=useNavigate();
//   const BaseAPI = process.env.REACT_APP_SERVER_URL;
//   const [driver, setDriver] = useState([])
//   const [stateData, setStateData] = useState([]);
//   const [stateId, setStateId] = useState("");
//   const [modal, setModal] = useState(false);
//   const [unmountOnClose, setUnmountOnClose] = useState(true);
//   const {driverId} =useParams();
//   const toggle = () => setModal(!modal);
//   const changeUnmountOnClose = (e) => {
//     let { value } = e.target;
//     setUnmountOnClose(JSON.parse(value));
//   };

//   // Cluster is currently on this page
//   const [currentPage, setCurrentPage] = useState(1)
//   //No of Records to be displayed on each page
//   const [recordsPerPage] = useState(10)

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/driver/${driverId}`, {
//       method: 'GET',
//       headers: authHeader()
//     }).then((listOfdriver) => {
//       listOfdriver.json().then((datalist) => {
//         setDriver(datalist)
//         setStateId(datalist.state)
//       })
//     })

//   }, []);

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/state/${stateId}`, {
//       method: "GET",
//       headers: authHeader()
//     }).then((stateData) => {
//       stateData.json().then((state) => {
//         setStateData(state)
//       });
//     });
//   }, []);

//   const DeleteDriver = () => {
//     fetch(`${BaseAPI}/api/driver/${driverId}`, {
//       method: "DELETE",
//       headers: authHeader()
//     }).then((deletedriver) => {
//       deletedriver.json().then((data) => {
//         console.log(data);
//         setDriver(data);
//       });
//     });
//     history(`/driver`);
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
//                         <Card className="rounded-0 p-4">
//                         {driver &&
//                             <>
//                               <Col className="m-2">
//                                 <Row>
//                                   <Col><h4><b>{driver.driverId}</b></h4></Col>
//                                   <Col xs='6'>&nbsp;</Col>
//                                   <Col xs='1'><Link to={'/driver'}><Button color="success" onClick={toggle}>Back</Button></Link></Col>
//                                   <Col xs='1'>
//                                     <Button color="danger" onClick={toggle}>
//                                       Delete
//                                     </Button>
//                                     <Modal isOpen={modal} toggle={toggle} unmountOnClose={unmountOnClose} className="text-center">
//                                       <ModalHeader toggle={toggle} >Do you want to Delete Record</ModalHeader>
//                                       <ModalBody className="text-center">
//                                         <Button color="danger" onClick={DeleteDriver}>
//                                           Yes
//                                         </Button>
//                                         &nbsp; &nbsp;
//                                         <Button color="success" onClick={toggle}>
//                                           No
//                                         </Button>
//                                       </ModalBody>
//                                     </Modal>
//                                   </Col>
//                                   <Col xs='1'>&nbsp;</Col>
//                                 </Row>
//                               </Col>
//                               <Col xs='12' className="p-4">
//                                 <Row>
//                                   <Col xs="6">
//                                     <Table bordered>
//                                       <thead>
//                                         <tr>
//                                           <th>Driver Id</th>
//                                           <td>{driver.driverId}</td>
//                                         </tr>
//                                         <tr>
//                                           <th>First Name</th>
//                                           <td>{driver.firstName}</td>
//                                         </tr>
//                                         <tr>
//                                           <th>Last Name</th>
//                                           <td>{driver.lastName}</td>
//                                         </tr>
//                                         <tr>
//                                           <th>Contact Detail</th>
//                                           <td>{driver.contactDetails}</td>
//                                         </tr>
//                                         <tr>
//                                           <th>State</th>
//                                           {stateData.map((data) => {
//                                             return (
//                                               <>
//                                                 {data._id === stateId ? <td>{data.name}</td> : ""}
//                                               </>
//                                             )
//                                           })}
//                                         </tr>
//                                         <tr>
//                                           <th>District</th>
//                                           <td>{driver.district}</td>
//                                         </tr>
//                                         <tr>
//                                           <th>Village</th>
//                                           <td>{driver.village}</td>
//                                         </tr>
//                                         <tr>
//                                           <th>Cluster Id</th>
//                                           <td>{driver.clusterId}</td>
//                                         </tr>
//                                       </thead>
//                                     </Table>
//                                   </Col>
//                                   <Col >&nbsp;</Col>
//                                 </Row>
//                               </Col>
//                             </>
//                           }
//                         </Card>
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

// export default DriverView;


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
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";

const DriverView = ({ props, handleUpdate }) => {
  const history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [driver, setDriver] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateId, setStateId] = useState("");
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

  // console.log("handleUpdate", handleUpdate)

  const DriverView = () => {
    fetch(`${BaseAPI}/api/driver/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfdriver) => {
      listOfdriver.json().then((datalist) => {
        setDriver(datalist);
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

  const DeleteDriver = () => {
    fetch(`${BaseAPI}/api/driver/${props._id}`, {
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
        <Link className="sidebar-text " onClick={
          () => {
            DriverView()
            toggle()
          }
        }>
          {" "}
          View
        </Link>
        <Modal size="xl" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>

            {driver.firstName} {driver.lastName} &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            <Link to={"/driver"}>
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
                  <th>Driver Id</th>
                  <td>{driver.driverId}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{driver.firstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{driver.lastName}</td>
                </tr>
                <tr>
                  <th>Contact Detail</th>
                  <td>{driver.contactDetails}</td>
                </tr>
                <tr>
                  <th>State</th>
                  {stateData && stateData.map((data) => {
                    return (
                      <>{data._id === stateId ? <td>{data.name}</td> : ""}</>
                    );
                  })}
                </tr>
                <tr>
                  <th>District</th>
                  <td>{driver.district}</td>
                </tr>
                <tr>
                  <th>Village</th>
                  <td>{driver.village}</td>
                </tr>
                <tr>
                  <th>Cluster Id</th>
                  <td>{driver.clusterId}</td>
                </tr>
              </thead>
            </Table>
            <Modal
              className="text-center"
              isOpen={nestedModal}
              toggle={toggleNested}
              onClosed={closeAll ? toggle : undefined}
            >
              <ModalHeader>Do you want to Delete Record</ModalHeader>
              <ModalBody className="text-center">
                <Link to={'/driver'}>
                  <Button color="danger" onClick={() => {
                    toggleAll()
                    DeleteDriver()
                  }} >
                    Yes
                  </Button>
                </Link>&nbsp; &nbsp;
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

export default DriverView;
