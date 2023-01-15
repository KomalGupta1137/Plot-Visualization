import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  CardBody,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import ReactPaginate from "react-paginate";
import FarmerView from "./FarmerView";
import FarmerEdit from "./FarmerEdit";

const FarmerList = () => {
  const [cluster, setCluster] = useState("");
  const [farmerDataList, setFarmerDataList] = useState([]);
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setpageCount] = useState("");
  const [query, setQuery] = useState("");

  let size = 5;

  //List of farmer for 1st page
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/farmer/page/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerDataList(data.farmer);
      setpageCount(data.total);
    };
    getComments();
  }, [size]);

  //List of farmer in accordance with current page and size
  const FetchFarmer = (currentPage) => {
    fetch(`${BaseAPI}/api/farmer/page/?page=${currentPage}&size=${size}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfMachine) => {
      listOfMachine.json().then((datalist) => {
        setFarmerDataList(datalist.farmer);
      });
    });
  };

  //Function for updating pagination
  const handleUpdate = () => {
    console.log("value update");
    FetchFarmer(currentPage);
  };

  //Function for handling page click
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const value = FetchFarmer(currentPage);
    setCurrentPage(currentPage);
  };

  //Counting the number of page
  const nPages = Math.ceil(pageCount / size);
  console.log("farmer contact" ,farmerDataList.contact)

  //Function for search filter by first name
  if (query.length >= 2) {
    var filterBySearch = async () => {
      const res = await fetch(
        `${BaseAPI}/api/farmer/farmerSearch/data?firstName=${query}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerDataList(data);
    };
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      FetchFarmer(currentPage);
    }
  }, [query]);

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
                        <Card className="rounded-0 p-4">
                          <Col className="m-2">
                            <Row>
                              <Col>
                                <h4>
                                  <b>Farmer</b>
                                </h4>
                              </Col>
                              <Col xs="6">
                                {" "}
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  ></Label>
                                  <Col md="7">
                                    <Input
                                      id="example-text-input"
                                      placeholder="Enter at least 3 character to search"
                                      type="text"
                                      value={query}
                                      onChange={(e) => {
                                        setQuery(e.target.value);
                                        filterBySearch();
                                      }}
                                    ></Input>
                                  </Col>
                                </FormGroup>
                              </Col>
                              <Col xs="1">
                                <Link to={"/farmer-register"}>
                                  <Button color="success">Add</Button>
                                </Link>
                              </Col>
                              <Col xs="1">
                                <ReactHtmlTableToExcel
                                  id="test-table-xls-button"
                                  className="download-table-xls-button btn btn-success mb-3"
                                  table="table-to-xls"
                                  filename="tablexls"
                                  sheet="tablexls"
                                  buttonText="Export"
                                />
                              </Col>
                              <Col xs="1">&nbsp;</Col>
                            </Row>
                          </Col>
                          <CardBody className="p-4">
                            <Table
                              className="align-items-center table-flush"
                              id="table-to-xls"
                              responsive
                            >
                              <thead>
                                <tr>
                                 
                                  <th> First Name</th>
                                  <th> Last Name</th>
                                  <th>Contact</th>
                                  <th> Owner Type</th>
                                  <th>Cluster ID</th>
                                  <th> Action</th>
                                </tr>
                              </thead>
                              {farmerDataList.map((item) => (
                                <tbody>
                                  <tr>
                                    
                                    <td>
                                      {item.firstName}
                                      <Link
                                        className="sidebar-text"
                                        to={"/plot-register/" + item._id}
                                      >
                                        <br />
                                        Add Plot
                                      </Link>
                                    </td>
                                    <td>
                                      {item.lastName}
                                      <Link
                                        className="sidebar-text"
                                        to={"/plot/" + item._id}
                                      >
                                        <br />
                                        Plot List
                                      </Link>
                                    </td>
                                    
                                    <td>{item.contact}</td>
                                    <td>{item.ownerType}</td>
                                    <td>{item.clusterId}</td>
                                    <td>
                                      <FarmerView
                                        props={item}
                                        handleUpdate={handleUpdate}
                                      />  <FarmerEdit
                                      props={item}
                                      handleUpdate={handleUpdate}
                                    />
                                     
                                    </td>
                                    
                                  </tr>
                                </tbody>
                              ))}
                            </Table>
                            <br />
                            <ReactPaginate
                              previousLabel={"< previous"}
                              nextLabel={"next >"}
                              breakLabel={"..."}
                              pageCount={nPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={3}
                              onPageChange={handlePageClick}
                              containerClassName={
                                "pagination justify-content-center"
                              }
                              pageClassName={"page-item"}
                              pageLinkClassName={"page-link"}
                              previousClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextClassName={"page-item"}
                              nextLinkClassName={"page-link"}
                              breakClassName={"page-item"}
                              breakLinkClassName={"page-link"}
                              activeClassName={"active"}
                            />
                          </CardBody>
                        </Card>
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

export default FarmerList;
