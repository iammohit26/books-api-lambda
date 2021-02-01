'use strict';
const AWS = require('aws-sdk');
const db = new AWS.DynamoDB.DocumentClient({ apiVersion: '2012-08-10' });


const BooksTable = process.env.BOOKS_TABLE;
// Create a response
function response(statusCode, message) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(message)
  };
}

// Create a post
module.exports.createbook = (event, context, callback) => {
  const reqBody = JSON.parse(event.body);

  if (
    !reqBody.name ||
    reqBody.name.trim() === ''
  ) {
    return callback(
      null,
      response(400, {
        error: 'Book must have a name'
      })
    );
  }

  const book = {
    id: context.awsRequestId,
    bookName: reqBody.name,
    authorName: reqBody.author,
    price: reqBody.price
  };

  return db
    .put({
      TableName: BooksTable,
      Item: book
    })
    .promise()
    .then(() => {
      callback(null, response(201, book));
    })
    .catch((err) => response(null, response(err.statusCode, err)));
};
// Get all posts
module.exports.getAllbooks = (event, context, callback) => {
  return db
    .scan({
      TableName: BooksTable
    })
    .promise()
    .then((res) => {
      callback(null, response(200, res.Items));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};

// Get a single post
module.exports.getbook = (event, context, callback) => {
  const id = event.pathParameters.id;

  const params = {
    Key: {
      id: id
    },
    TableName: BooksTable
  };

  return db
    .get(params)
    .promise()
    .then((res) => {
      if (res.Item) callback(null, response(200, res.Item));
      else callback(null, response(404, { error: 'Book not found' }));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
// Update a post
module.exports.updatebook = (event, context, callback) => {
  const id = event.pathParameters.id;
  const reqBody = JSON.parse(event.body);
  const { name,author,price } = reqBody;

  const params = {
    Key: {
      id: id
    },
    TableName: BooksTable,
    ConditionExpression: 'attribute_exists(id)',
    UpdateExpression: 'SET bookName = :name, authorName = :author, price = :price',
    ExpressionAttributeValues: {
      ':name': name,
      ':author': author,
      ':price': price
    },
    ReturnValues: 'ALL_NEW'
  };
  console.log('Updating');

  return db
    .update(params)
    .promise()
    .then((res) => {
      console.log(res);
      callback(null, response(200, res.Attributes));
    })
    .catch((err) => callback(null, response(err.statusCode, err)));
};
// Delete a post
module.exports.deletebook = (event, context, callback) => {
  const id = event.pathParameters.id;
  const params = {
    Key: {
      id: id
    },
    TableName: BooksTable
  };
  return db
    .delete(params)
    .promise()
    .then(() =>
      callback(null, response(200, { message: 'Book deleted successfully' }))
    )
    .catch((err) => callback(null, response(err.statusCode, err)));
};
