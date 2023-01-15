import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReactPlayer from "react-player";
import ReactPaginate from "react-paginate";
import Form from "react-bootstrap/Form";
import PlotEdit from "./PlotEdit";
import PlotView from "./PlotView";
import {
  Card,
  CardBody,
  CardTitle,
  Table,
  Row,
  Input,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { faHistory } from "@fortawesome/free-solid-svg-icons";
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Line,
  Area,
  ComposedChart,
  LineChart,
} from "recharts";

const BingMap = () => {
  var infobox, pushpinClicked;

  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const { farmerId } = useParams();
  const [farmerPlotList, setFarmerPlotList] = useState([]);
  const [farmer, setFarmer] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [plotCount, setPlotCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [plot, setPlot] = useState([]);
  const [barData, setBarData] = useState([]);
  const [lineGraph, setLineGraph] = useState([]);
  console.log("LineGraph Data", lineGraph);
  const [pieChartData, setPieChartData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [plotArea, setPlotArea] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const plotToggle = () => setDropdown((prevState) => !prevState);

  var map = new window.Microsoft.Maps.Map("#myMap", {
    credentials:
      "Aqzz7vJy_E3lMdTdyc3Wq5648lftCQIpLcnUYANnul7xMFefdRqtdzneBwfdFpWX",
    center: new window.Microsoft.Maps.Location(24.661994, 77.58655),
    zoom: 3,
  });
  var center = map.getCenter();

  //Adding center location
  var pin = new window.Microsoft.Maps.Pushpin(center, {
    text: "AGRIX ",
    color: "green",
  });

  //Add the pushpin to the map
  map.entities.push(pin);

  //Create an infobox at the center of the map
  infobox = new window.Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false,
  });

  //Assign the infobox to a map instance.
  infobox.setMap(map);

  //Create  pushpin for plot
  var latlongs = plot;
  for (var i = 0; i < latlongs.length; i++) {
    var pin = new window.Microsoft.Maps.Pushpin(latlongs[i], {
      text: "",
      color: "red",
    });

    //Store some metadata with the pushpin.
    pin.metadata = {
      title: latlongs[i].plotId,
      description: "Cultivation:" + latlongs[i].cultivationDate,
    };

    //Add a click event handler to the pushpin.
    window.Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

    //Add pushpin to the map.
    map.entities.push(pin);
  }

  //Set the infobox options with the metadata of the pushpin.
  function pushpinClicked(e) {
    if (e.target.metadata) {
      infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true,
      });
    }
  }

  //set plot data for pushpin
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var templot = [];
        for (var i of data) {
          templot.push({
            latitude: i.latitude,
            longitude: i.long,
            clusterId: i.clusterId,
            plotId: i.plotId,
            areaOfPlot: i.areaOfPlot,
            village: i.village,
            perimeter: i.perimeterOfPlot,
            cultivationDate: i.cultivationDate,
          });
        }
        setPlot(templot);
      });
    });
  }, []);

  //Bar  graph data
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var barData = [];
        for (var i of data) {
          barData.push({
            name: i.plotId,
            Area: i.areaOfPlot,
            Seeds: i.seedAmount,
            amount: i.cropType,
            // cultivationDate:i.cultivationDate
          });
        }
        setBarData(barData);
      });
    });
  }, []);

  //Line  graph data
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var lineGraph = [];
        for (var i of data) {
          lineGraph.push({
            name: i.harvestingDate,
            Area: i.areaOfPlot,
            Yield: i.yield,
            amount: i.cropType,
          });
        }
        setLineGraph(lineGraph);
      });
    });
  }, []);

  //Pie Chart Data
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var pieChartData = [];
        for (var i of data) {
          pieChartData.push({
            name: i.plotId,
            value: i.areaOfPlot,
          });
        }
        setPieChartData(pieChartData);
      });
    });
  }, []);

  //Farmer name by farmerId
  useEffect(() => {
    fetch(`${BaseAPI}/api/farmer/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((farmer) => {
      farmer.json().then((data) => {
        console.log(data);
        setFarmer(data);
      });
    });
  }, []);

  //Plot count against each farmerId
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/plotcount/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((plot) => {
        setPlotCount(plot.plotCount);
        setpageCount(plot.plotCount);
      });
    });
  }, []);

  let size = 3;

  //page 1 data
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/plot/page/${farmerId}/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerPlotList(data.plot);
    };
    getComments();
  }, [size]);

  //Plot Count Update
  const plotCountUpdate = () => {
    fetch(`${BaseAPI}/api/plot/plotcount/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((plot) => {
        setPlotCount(plot.plotCount);
        setpageCount(plot.plotCount);
      });
    });
  };

  //Plots for current page
  const FetchPlot = (currentPage) => {
    fetch(
      `${BaseAPI}/api/plot/page/${farmerId}/?page=${currentPage}&size=${size}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    ).then((plot) => {
      plot.json().then((datalist) => {
        if (datalist.plot.length == 0 && currentPage > 1) {
          FetchPlot(currentPage - 1);
          return;
        }
        setFarmerPlotList(datalist.plot);
      });
    });
  };
  const handleUpdate = () => {
    FetchPlot(currentPage);
  };

  //Handlepageclick
  const handlePageClick = (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const value = FetchPlot(currentPage);
    setCurrentPage(currentPage);
  };

  const nPages = Math.ceil(pageCount / size);

  //Set plot area data for pie chart
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var plotArea = [];
        for (var i of data) {
          plotArea.push({
            Area: i.areaOfPlot,
          });
        }
        setPlotArea(plotArea);
      });
    });
  }, []);

  //Sum of Plot Area Data
  let total = 0;
  plotArea.forEach((item) => {
    total = total + item.Area;
  });

  //Function for search filter by plotId
  if (query.length >= 2) {
    var filterBySearch = async () => {
      const res = await fetch(
        `${BaseAPI}/api/plot/plotSearch/data?plotId=${query}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerPlotList(data);
    };
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      FetchPlot(currentPage);
    }
  }, [query]);

  const handleToggle = (e, id) => {
    console.log("Api call", id);
    fetch(`${BaseAPI}/api/cultivation/${id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((dataValue) => {
        setDateList(dataValue);
      });
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <div style={{ width: "30%", height: 200 }}>
          {" "}
          <Card style={{ height: 225 }}>
            <CardBody
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LineChart
                width={410}
                height={220}
                data={lineGraph}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Area"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Yield" stroke="#82ca9d" />
              </LineChart>
            </CardBody>
          </Card>
          <Card style={{ marginTop: "12px" }}>
            <CardBody>
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
              <Table style={{ height: 120 }} id="table-to-xls" responsive>
                <thead className="thead-light">
                  <tr>
                    <th>Plot Id</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Action</th>
                  </tr>
                </thead>
                {farmerPlotList.map((item, index) => (
                  <tbody>
                    <tr>
                      <td>{item.plotId}</td>
                      <td>{item.latitude}</td>
                      <td>{item.long}</td>

                      <td>
                        <PlotView
                          props={item}
                          handleUpdate={handleUpdate}
                          plotCountUpdate={plotCountUpdate}
                        />
                        <PlotEdit props={item} handleUpdate={handleUpdate} />
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
                containerClassName={"pagination justify-content-center"}
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
        </div>
        <div style={{ width: "40%", height: 200 }}>
          {" "}
          <Card style={{ height: 320 }}>
            <CardBody className="p-0">
              {" "}
              <div id="myMap" width="100%"></div>
            </CardBody>
          </Card>
          <Card style={{ height: 315 ,marginTop:"12px" }}>
            {" "}
            <CardBody>
              <CardTitle tag="h4" className="text large  text-black ">
                Cultivation Analysis
              </CardTitle>
              <ComposedChart
                width={440}
                height={240}
                data={barData}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="amt"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Bar dataKey="Area" barSize={30} fill="#413ea0" />
                <Line type="monotone" dataKey="Seeds" stroke="#ff7300" />
              </ComposedChart>
            </CardBody>
          </Card>
        </div>
        <div style={{ width: "27%", height: 200 }}>
          <Card style={{ height: 130 }}>
            <CardBody>
              <CardTitle  tag="h4" className="text large  text-black ">
                Total Plot{" "}
                
              </CardTitle>
              <span className="h1 font-weight-bold mb-0">{plotCount}</span>
            </CardBody>
          </Card>
          <Card style={{ height: 130, marginTop: "12px" }}>
            <CardBody>  <CardTitle tag="h4" className="text large  text-black ">
              Total Area Served
            </CardTitle>{" "}
            <span className="h1 font-weight-bold mb-0">{total} acre</span></CardBody>
          
          </Card>
          <Card style={{ height: 345, marginTop: "12px" }}>
          <CardBody>
      <CardTitle>
        <h4>{farmer.firstName} {farmer.lastName}'s Plot in acre</h4>
      
        <PieChart width={270} height={270}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </CardTitle>
    </CardBody>
          
          </Card>
        </div>
      </div>
    </>
  );
};

export default BingMap;

{
  /* <Row>
<Col md="4 p-2">
  {" "}
  <Card style={{ height: "28%", width: "100%" }}>
    <CardBody
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
     
      <LineChart
        width={320}
        height={240}
        data={lineGraph}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Area"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="Yield" stroke="#82ca9d" />
      </LineChart>
    </CardBody>
  </Card>
  <Card style={{ marginTop: "2px" }}>
    <CardBody>
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
      <Table
        className="align-items-center table-flush"
        id="table-to-xls"
        responsive
      >
        <thead className="thead-light">
          <tr>
            <th>Plot Id</th>
            <th>Latitude</th>
            <th>Longitude</th>
            <th>Action</th>
          </tr>
        </thead>
        {farmerPlotList.map((item, index) => (
          <tbody>
            <tr>
              <td>{item.plotId}</td>
              <td>{item.latitude}</td>
              <td>{item.long}</td>

              <td>
                <PlotView
                  props={item}
                  handleUpdate={handleUpdate}
                  plotCountUpdate={plotCountUpdate}
                />
                <PlotEdit props={item} handleUpdate={handleUpdate} />
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
        containerClassName={"pagination justify-content-center"}
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
<Col md="5 p-2">
  <Card style={{ height: "200px", width: "100% m-0" }}>
    <CardBody className="p-0">
      {" "}
      <div id="myMap" width="100%"></div>
    </CardBody>
  </Card>
  <Card style={{ height: "300px", width: "100% ", marginTop: "10px" }}>
    <CardBody className="p-2">
      <CardTitle tag="h4" className="text large  text-black ">
        Cultivation Analysis
      </CardTitle>
      <ComposedChart
        width={440}
        height={300}
        data={barData}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="band" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="amt"
          fill="#8884d8"
          stroke="#8884d8"
        />
        <Bar dataKey="Area" barSize={30} fill="#413ea0" />
        <Line type="monotone" dataKey="Seeds" stroke="#ff7300" />
      </ComposedChart>
    </CardBody>
  </Card>
</Col>
<Col md="3 p-2">
  <Card style={{ height: "18%", width: "100%" }}>
    <CardBody>
      <CardTitle
        style={{ display: "flex", justifyContent: "space-between" }}
        tag="h4"
        className="text large  text-black "
      >
        <Row>
          <Col md="4">Total Plot</Col>
          <Col md="5">
            <Form.Select
              style={{ width: "87%" }}
              className="m-1"
              aria-label="Default select example"
              onChange={(e) => {
                handleToggle(e, e.target.value);
              }}
            >
              <option>Select PlotId</option>
              {plot.map((plot, index) => {
                return (
                  <option key={index} value={plot.plotId}>
                    {plot.plotId}
                  </option>
                );
              })}
            </Form.Select>
          </Col>
          <Col md="3">
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle
                color="success"
                caret
                size="lg"
                style={{ width: "60px" }}
              >
                <FontAwesomeIcon
                  role="button"
                  icon={faHistory}
                  className="fs-5 rounded-5 p-2 border"
                ></FontAwesomeIcon>
              </DropdownToggle>
              <DropdownMenu>
                {dateList.map((item) => (
                  <DropdownItem>{item.cultivationDate}</DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
      </CardTitle>
      <span className="h1 font-weight-bold mb-0">{plotCount}</span>{" "}
     
    </CardBody>
  </Card>
  <Card style={{ height: "18%", width: "100%", marginTop: "12px" }}>
    <CardBody>
      <CardTitle tag="h4" className="text large  text-black ">
        Total Area Served
      </CardTitle>
      <span className="h1 font-weight-bold mb-0">{total} acre</span>
    </CardBody>
  </Card>

  <Card style={{ height: "42%", width: "100%", marginTop: "12px" }}>
    <CardBody>
      <CardTitle>
        <h4>{farmer.firstName} {farmer.lastName}'s Plot in acre</h4>
      
        <PieChart width={270} height={270}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />

          <Tooltip />
        </PieChart>
      </CardTitle>
    </CardBody>
  </Card>
 
</Col>
</Row> */
}
