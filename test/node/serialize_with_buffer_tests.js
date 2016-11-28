var BSON = require('../..'),
  f = require('util').format,
  assert = require('assert');

function createBSON() {
  return new BSON([BSON.Binary, BSON.Code, BSON.DBRef, BSON.Decimal128,
    BSON.Double, BSON.Int32, BSON.Long, BSON.Map, BSON.MaxKey, BSON.MinKey,
    BSON.ObjectId, BSON.BSONRegExp, BSON.Symbol, BSON.Timestamp]);
}

/**
 * @ignore
 */
exports['correctly serialize into buffer using serializeWithBufferAndIndex'] = function(test) {
  var bson = createBSON();
  // Create a buffer
  var b = new Buffer(256);
  // Serialize from index 0
  var r = bson.serializeWithBufferAndIndex({a:1}, b);
  test.equal(11, r);

  // Serialize from index r+1
  var r = bson.serializeWithBufferAndIndex({a:1}, b, {
    index: r + 1
  });
  console.log("index :: " + r)
  test.equal(23, r);

  // Deserialize the buffers
  var doc = bson.deserialize(b.slice(0, 12));
  test.deepEqual({a:1}, doc);
  var doc = bson.deserialize(b.slice(12, 24));
  test.deepEqual({a:1}, doc);
  test.done();
}
