module.exports = {
	IP: process.env.IP || '127.0.0.1',
	PORT: process.env.PORT || 3000,
	MONGOOSE: function (mongoose) {
		mongoose.Promise = global.Promise;
		//var connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
		//	process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
		//	process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
		//	process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
		//	process.env.OPENSHIFT_APP_NAME;
		//mongoose.connect('mongodb://' + connection_string)
		mongoose.connect('mongodb://127.0.0.1:27017/at')
			.then(function () {
				console.log('Connected to MONGOD !!');
			}).catch(function (err) {
				console.log('Failed to establish connection with MONGOD !!');
				console.log(err.message);
			});
	},
	MW: function (app, morgan, cors) {
		app.use(morgan('dev'));
		app.use(cors());
	},
	ROUTES: function (app) {
		var routes = require('./routes');
		routes(app);
		app.get('/*', function (req, res) {
			res.json('404 not found');
		});
	}
};
