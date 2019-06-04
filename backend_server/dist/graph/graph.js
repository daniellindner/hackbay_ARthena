"use strict";
const Graph = require("graph.js");
var map = new Graph(["test1", { data: "hello" }], ["test2", { data: "hello2" }], [["test1", "test2"], { distance: 123 }]);
console.log(map.toJson());
