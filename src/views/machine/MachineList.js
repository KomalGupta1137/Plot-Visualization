import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
  FormGroup,
  Label,
  Input,
  UncontrolledTooltip,
} from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import authHeader from "../../services/auth-header";
import ReactPaginate from "react-paginate";
import MachineView from "./MachineView";
import MachineEdit from "./MachineEdit";

const MachineList = () => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [machineList, setMachineList] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  let size = 5;

  //List of machine for 1st page
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/machine/page/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setMachineList(data.machine);
      setpageCount(data.total);
    };

    getComments();
  }, [size]);

  //List of machine in accordance with current page and size
  const FetchMachine = (currentPage) => {
    fetch(`${BaseAPI}/api/machine/page/?page=${currentPage}&size=${size}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfMachine) => {
      listOfMachine.json().then((datalist) => {
        if (datalist.machine.length == 0 && currentPage > 1) {
          FetchMachine(currentPage - 1);
          return;
        }
        setMachineList(datalist.machine);
        setpageCount(datalist.total);
      });
    });
  };

  //Props of view/edit Modal
  const handleUpdate = () => {
    FetchMachine(currentPage);
  };

  //Function for handling page click
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const value = FetchMachine(currentPage);
    setCurrentPage(currentPage);
  };

  //counting number of pages
  const nPages = Math.ceil(pageCount / size);

   //Function for search filter by implementCode
   if (query.toString().length >= 2) {
    var filterBySearch = async () => {
      const res = await fetch(
        `${BaseAPI}/api/machine/machineSearch/data?implementCode=${query}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setMachineList(data);
    };
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      FetchMachine(currentPage);
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
                                  <b>Machine</b>
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
                                <Link to={"/machine-register"}>
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
                          
                          <Table id="table-to-xls" responsive>
                            <thead>
                              <tr>
                                <th>Implement Code</th>
                                <th>Cluster Code</th>
                                <th> Machine Brand</th>
                                <th>IMEI No</th>
                                <th>SIM No</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            {machineList
                              .map((item) => (
                                <tbody>
                                  <tr>
                                    <td>{item.implementCode}</td>
                                    <td>{item.cluster}</td>
                                    <td>{item.machineBrand}</td>
                                    <td>{item.imieNo}</td>
                                    <td>{item.simNo}</td>
                                    <td>
                                      <MachineView
                                        props={item}
                                        handleUpdate={handleUpdate}
                                      />
                                      <MachineEdit
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

export default MachineList;
