import app from './config/expressConfig';

app.listen(process.env.PORT, () =>{
	console.log('Server hosted on port: ' + process.env.PORT);
});

