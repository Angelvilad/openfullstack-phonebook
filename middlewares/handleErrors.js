module.exports = (err, request, response, next) => {
  console.error(err.message);
  if(err.name === 'CastError') {
    return response.status(400).json({error: 'malformatted id'});
  } else if(err.name === 'ValidationError' && err.errors.name.kind === 'unique') {
    return response.status(400).json({error: err.errors.name.message});
  }
    
  next(err);
};