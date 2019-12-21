require('dotenv').config()
var Airtable = require('airtable')

const AIRTABLE_KEY = process.env.AIRTABLE_KEY

exports.handler = function(e, context, callback) {
  var base = new Airtable({ apiKey: AIRTABLE_KEY }).base('tblWR6Blt3dJDBgzO')
  const event = e.queryStringParameters.pepite

  console.log(event)

  base('pepites').create({ name: event }, function(err, record) {
    if (err) {
      callback(err)
      return
    }

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({ id: record.getId(), status: 'created' }),
    })
  })
}
