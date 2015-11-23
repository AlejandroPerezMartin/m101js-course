config = { _id: "replica_Set", members:[
          { _id : 0, host : "Alejandros-MacBook-Pro.local:30001"},
          { _id : 1, host : "Alejandros-MacBook-Pro.local:30002"},
          { _id : 2, host : "Alejandros-MacBook-Pro.local:30003"} ]
};

rs.initiate(config);
rs.status();
