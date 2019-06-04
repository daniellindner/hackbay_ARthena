var Graph = require('graph.js/dist/graph.full.js');
var map = new Graph(["test1", { data: "hello" }], ["test2", { data: "hello2" }], ["test3", { data: "hello" }], [["test1", "test2"], { distance: 123 }]);
console.log(map.toJSON());
