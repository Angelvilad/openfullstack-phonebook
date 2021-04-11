module.exports = (err, request, response, next) => {
  console.err(err.message);
  return response.status(500).end(); //Server error
};