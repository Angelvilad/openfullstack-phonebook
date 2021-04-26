module.exports = (err, request, response, next) => {
  console.error(err.message);
  
  if(err.name === 'CastError') {
    return response.status(400).json({error: 'malformatted id'});
  } else if(err.name === 'ValidationError') {
    return response.status(400).json({error: err.message});
  }
    
  next(err);
};