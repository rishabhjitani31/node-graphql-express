const mysql = require("mysql");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const cors = require("cors");
const bodyParser = require("body-parser");

const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require("graphql/type");

const app = express();

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Astics",
  database: "mysql"
});
con.connect();

var userType = new GraphQLObjectType({
  name: "user",
  fields: {
    tutorial_id: {
      type: GraphQLInt
    },
    tutorial_title: {
      type: GraphQLString
    }
  }
});

const users = new GraphQLObjectType({
  name: "users",
  fields: {
    users: {
      type: new GraphQLList(userType),
      args: {
        tutorial_id: {
          name: "tutorialId",
          type: new GraphQLNonNull(GraphQLInt)
        }
      },
      resolve: (root, { tutorial_id }) => {
        return new Promise((resolve, reject) => {
          con.query(
            `select * from tutorials_tbl where tutorial_id = ${tutorial_id} `,
            function(err, result) {
              if (err) reject(err);
              resolve(result);
            }
          );
        });
      }
    }
  }
});

const schema = new GraphQLSchema({
  query: users
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cross origin
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(3001, () => console.log("Example app listening on port 3001!"));
