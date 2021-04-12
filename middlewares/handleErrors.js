module.exports = (err, request, response, next) => {
  console.error(err.message);
  return response.status(500).end(); //Server error
};