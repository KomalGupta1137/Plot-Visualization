
// import React, { useEffect, useState } from "react";
// import authHeader from "../../services/auth-header";
// import BingMapsReact from "bingmaps-react";

// const BingMap = () => {
//   var infobox, pushpinClicked, clusterClicked;
//   const BaseAPI = process.env.REACT_APP_SERVER_URL;
//   const [plot, setPlot] = useState([]);
//   const [cluster, setCluster] = useState([]);

//   var map = new window.Microsoft.Maps.Map("#myMap", {
//     credentials:
//       "Aqzz7vJy_E3lMdTdyc3Wq5648lftCQIpLcnUYANnul7xMFefdRqtdzneBwfdFpWX",
//     center: new window.Microsoft.Maps.Location(20.5937, 78.9629),
//     mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
//     zoom: 5,
//   });
//   var center = map.getCenter();

//   //Create custom Pushpin
//   var pin = new window.Microsoft.Maps.Pushpin(center, {
//     text: "AGRIX ",
//     color: "green",
//   });

//   //Add the pushpin to the map
//   map.entities.push(pin);

//   //Create an infobox at the center of the map but don't show it.
//   infobox = new window.Microsoft.Maps.Infobox(map.getCenter(), {
//     visible: false,
//   });

//   //Assign the infobox to a map instance.
//   infobox.setMap(map);

//   //Create  pushpin for plot
//   var latlongs = plot;
//   for (var i = 0; i < latlongs.length; i++) {
//     var pin = new window.Microsoft.Maps.Pushpin(latlongs[i], {
//       text: "",
//       color: "red",
//     });

//     //Store some metadata with the pushpin.
//     pin.metadata = {
//       title: latlongs[i].plotId,
//       description: "Area :" + latlongs[i].areaOfPlot,
//     };

//     //Add a click event handler to the pushpin.
//     window.Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

//     //Add pushpin to the map.
//     map.entities.push(pin);
//   }

//   //Create  Pushpin for cluster
//   var latLongsCluster = cluster;
//   for (var i = 0; i < latLongsCluster.length; i++) {
//     var pin = new window.Microsoft.Maps.Pushpin(latLongsCluster[i], {
//       title: "ClusterId :" + latLongsCluster[i].clusterId,
//       // subTitle: "Village" + latLongsCluster[i].village,
//       icon: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" stroke="orange" stroke-width="6" fill="yellow" /></svg>',
//       // text: latlongs[i].village,
//       color: "green",
//     });

//     //Store some metadata with the pushpin.
//     pin.metadata = {
//       title: latLongsCluster[i].clusterId,
//       description: latLongsCluster[i].manager + "  is Manager",
//     };

//     //Add a click event handler to the pushpin.
//     window.Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

//     //Add pushpin to the map.
//     map.entities.push(pin);
//   }

//   function pushpinClicked(e) {
//     //Make sure the infobox has metadata to display.
//     if (e.target.metadata) {
//       //Set the infobox options with the metadata of the pushpin.
//       infobox.setOptions({
//         location: e.target.getLocation(),
//         title: e.target.metadata.title,
//         description: e.target.metadata.description,
//         visible: true,
//       });
//     }
//   }

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/plot/`, {
//       method: "GET",
//       headers: authHeader(),
//     }).then((data) => {
//       data.json().then((data) => {
//         var templot = [];
//         for (var i of data) {
//           templot.push({
//             latitude: i.latitude,
//             longitude: i.long,
//             clusterId: i.clusterId,
//             plotId: i.plotId,
//             areaOfPlot: i.areaOfPlot,
//             // village: i.village,
//             perimeter: i.perimeterOfPlot,
//           });
//         }
//         setPlot(templot);
//       });
//     });
//   }, []);

//   useEffect(() => {
//     fetch(`${BaseAPI}/api/cluster/`, {
//       method: "GET",
//       headers: authHeader(),
//     }).then((data) => {
//       data.json().then((data) => {
//         var tempcluster = [];
//         for (var i of data) {
//           tempcluster.push({
//             latitude: i.latitude,
//             longitude: i.longitude,
//             clusterId: i.clusterCode,
//             clusterName: i.clusterName,
//             // village: i.village,
//             manager: i.clusterManager,
//           });
//         }
//         setCluster(tempcluster);
//       });
//     });
//   }, []);

//   return <div id="myMap" width="100%"></div>;
// };

// export default BingMap;

import React, { useEffect, useState } from "react";
import authHeader from "../../services/auth-header";

const BingMap = () => {
  var infobox,
    pushpinClicked,
    clusterClicked,
    polygons,
    pinLayer,
    drawingLayer,
    tools,
    rectangleFinished,
    clusterLayer;

  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [plot, setPlot] = useState([]);
  const [cluster, setCluster] = useState([]);

  var map = new window.Microsoft.Maps.Map("#myMap", {
    credentials:
      "Aqzz7vJy_E3lMdTdyc3Wq5648lftCQIpLcnUYANnul7xMFefdRqtdzneBwfdFpWX",
    center: new window.Microsoft.Maps.Location(25.9644, 85.2722),
    mapTypeId: window.Microsoft.Maps.MapTypeId.aerial,
    zoom: 5,
  });
  var center = map.getCenter();

  //Adding shapes to pushpin
  var latLongCordinates = cluster;
  for (var i = 0; i < latLongCordinates.length; i++) {
    var lat = parseFloat(latLongCordinates[i].latitude);
    var long = parseFloat(latLongCordinates[i].longitude);
    var polygon = new window.Microsoft.Maps.Polygon([
      [
        new window.Microsoft.Maps.Location(lat - 0.5, long - 0.5),
        new window.Microsoft.Maps.Location(lat + 0.5, long - 0.5),
        new window.Microsoft.Maps.Location(lat + 0.5, long + 0.5),
        new window.Microsoft.Maps.Location(lat - 0.5, long + 0.5),
        new window.Microsoft.Maps.Location(lat - 0.5, long - 0.5),
      ],
    ]);

    var pin = new window.Microsoft.Maps.Pushpin(
      new window.Microsoft.Maps.Location(lat, long),
      {
        title: "ClusterId :" + latLongCordinates[i].clusterId,
        subTitle: "Village" + latLongCordinates[i].village,
        // icon: '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50"><circle cx="25" cy="25" r="20" stroke="orange" stroke-width="6" fill="yellow" /></svg>',
        text: "",
        color: "green",
      }
    );

    //Create an array of shapes.
    var shapes = [polygon, pin];

    //Add the shapes to the map so we can see them (optional).
    map.entities.push(shapes);

    //Adding infobox with pushpin.
    pin.metadata = {
      title: latLongCordinates[i].clusterId,
      description: latLongCordinates[i].manager + "  is Manager",
    };

    //Add a click event handler to the pushpin.
    window.Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

    //Add pushpin to the map.
    map.entities.push(pin);
  }

  //Adding center location
  var agrixLocation = new window.Microsoft.Maps.Location(23.260057, 77.410829);
  var pin = new window.Microsoft.Maps.Pushpin(agrixLocation, {
    text: "AGRIX ",
    color: "green",
  });

  //Add the pushpin to the map
  map.entities.push(pin);

  //Create an infobox at the center of the map but don't show it.
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
      description: "Area :" + latlongs[i].areaOfPlot,
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

  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/`, {
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
          });
        }
        setPlot(templot);
      });
    });
  }, []);

  // useEffect(() => {
  //   fetch(`${BaseAPI}/api/plot/`, {
  //     method: "GET",
  //     headers: authHeader(),
  //   }).then((data) => {
  //     data.json().then((data) => {
  //       var templot = [];
  //       for (var i of data) {
  //         console.log("latitude", i.latitude);
  //         templot.push({
  //           id: "16117",
  //           crs: {
  //             id: "LatLon",
  //             bounds: [90, 180, -90, -180],
  //           },
  //           geometryType: 1,
  //           geometry: {
  //             x: i.latitude,
  //             y: i.long,
  //             bounds: [i.latitude, i.long, i.latitude, i.long],
  //           },
  //           entity: {
  //             id: "Pushpin_7319",
  //             collisionBehavior: 2,
  //             title: null,
  //             subtitle: null,
  //             iconText: null,
  //           },
  //           anchor: null,
  //           image: null,
  //           bucket: "999999",
  //           _options: {
  //             icon: null,
  //             anchor: null,
  //             title: null,
  //             subTitle: null,
  //             text: null,
  //             draggable: false,
  //             visible: true,
  //             textOffset: {
  //               x: 0,
  //               y: 5,
  //             },
  //             enableHoverStyle: false,
  //             enableClickedStyle: false,
  //             ariaHaspopup: false,
  //             bucket: "999999",
  //             color: null,
  //             cursor: "pointer",
  //             roundClickableArea: false,
  //           },
  //           _state: 2,
  //           changed: {
  //             _handlers: [],
  //             _throttledEventInvokers: [],
  //             isPreviouslyInvoked: false,
  //             lastInvokedArgs: null,
  //           },
  //           changing: {
  //             _handlers: [],
  //             _throttledEventInvokers: [],
  //             isPreviouslyInvoked: false,
  //             lastInvokedArgs: null,
  //           },
  //           revision: 0,
  //         });
  //       }
  //       setPlot(templot);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    fetch(`${BaseAPI}/api/cluster/`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var tempcluster = [];
        for (var i of data) {
          tempcluster.push({
            latitude: i.latitude,
            longitude: i.longitude,
            clusterId: i.clusterCode,
            clusterName: i.clusterName,
            village: i.village,
            manager: i.clusterManager,
          });
        }
        setCluster(tempcluster);
      });
    });
  }, []);

  //Load the Clustering module.
  window.Microsoft.Maps.loadModule("Microsoft.Maps.Clustering", function () {
    var latlongs = plot;
    for (var i = 0; i < latlongs.length; i++) {
      console.log("MyTotalPlot", latlongs.length);
      var pins = new window.Microsoft.Maps.Pushpin(
        latlongs[i],
        {
          text: "",
          color: "red",
        },
        map.getBounds()
      );
    }
    console.log("MyPins", pins);

    //Generate 1,000 random pushpins in the map view.
    var pins = window.Microsoft.Maps.TestDataGenerator.getPushpins(
      1,
      map.getBounds()
    );
    console.log("BingPins", pins);

    //Create a ClusterLayer and add it to the map.
    clusterLayer = new window.Microsoft.Maps.ClusterLayer(pins);
    map.layers.insert(clusterLayer);
  });

  return (
    <>
      <div id="myMap" width="100%"></div>
    </>
  );
};

export default BingMap;