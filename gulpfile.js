// Load plugins
var gulp = require( 'gulp' ),
	sass = require( 'gulp-sass' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	minifycss = require( 'gulp-minify-css' ),
	jshint = require( 'gulp-jshint' ),
	stylish = require( 'jshint-stylish' ),
	jshinthtmlreporter = require( 'gulp-jshint-html-reporter' ),
	uglify = require( 'gulp-uglify' ),
	imagemin = require( 'gulp-imagemin' ),
	rename = require( 'gulp-rename' ),
	clean = require( 'gulp-clean' ),
	concat = require( 'gulp-concat' ),
	notify = require( 'gulp-notify' ),
	cache = require( 'gulp-cache' ),
	livereload = require( 'gulp-livereload' ),
	lr = require( 'tiny-lr' ),
	server = lr();

// Styles
gulp.task( 'sass', function () {
	return gulp.src( './styles/sass/**/*.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sass( {
			outputStyle: 'compressed'
		} ).on( 'error', sass.logError ) )
		.pipe( autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
		.pipe( sourcemaps.write() )
		.pipe( gulp.dest( './styles/css' ) )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( minifycss() )
		.pipe( livereload( server ) )
		.pipe( notify( {
			message: 'Styles task complete'
		} ) );
} );

// gulp.task('styles', function() {
//   return gulp.src('styles/scss/main.scss')
//     .pipe(sass({ style: 'expanded', }))
//     .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
//     .pipe(gulp.dest('styles/css'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(minifycss())
//     .pipe(livereload(server))
//     .pipe(gulp.dest('styles/css'))
//     .pipe(notify({ message: 'Styles task complete' }));
// });

// Scripts
gulp.task( 'scripts', function () {
	return gulp.src( './js/**/*.js' )
		.pipe( jshint( '.jshintrc' ) )
		.pipe( jshint.reporter( stylish ) )
		.pipe( jshint.reporter( 'gulp-jshint-html-reporter', {
			filename: 'jshint-output.html'
		} ) )
		.pipe( concat( 'main.js' ) )
		.pipe( gulp.dest( './js/min' ) )
		.pipe( rename( {
			suffix: '.min'
		} ) )
		.pipe( uglify() )
		.pipe( livereload( server ) )
		.pipe( gulp.dest( './js/min' ) )
		.pipe( notify( {
			message: 'Scripts task complete'
		} ) );
} );

// Images
gulp.task( 'images', function () {
	return gulp.src( './img/**/*' )
		.pipe( cache( imagemin( {
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		} ) ) )
		.pipe( livereload( server ) )
		.pipe( gulp.dest( './img/opt' ) )
		.pipe( notify( {
			message: 'Images task complete'
		} ) );
} );

// Clean
gulp.task( 'clean', function () {
	return gulp.src( [ './styles/css', './js/min', './img/opt' ], {
			read: false
		} )
		.pipe( clean() );
} );

// Default task
gulp.task( 'default', [ 'clean' ], function () {
	gulp.start( 'sass', 'scripts', 'images' );
} );

// Watch
gulp.task( 'watch', function () {

	// Listen on port 35729
	server.listen( 35729, function ( err ) {
		if ( err ) {
			return console.log( err )
		};

		// Watch .scss files
		gulp.watch( './styles/sass/**/*.scss', [ 'sass' ] );

		// Watch .js files
		gulp.watch( './js/**/*.js', [ 'scripts' ] );

		// Watch image files
		gulp.watch( './img/**/*', [ 'images' ] );

	} );

} );

var lr = require( 'tiny-lr' )();

function notify( lr, root ) {
	return function ( event ) {
		var fname = require( 'path' ).relative( root, event.path );
		lr.changed( {
			body: {
				files: [ fname ]
			}
		} );
	};
}

gulp.task( 'livereload', function () {
	lr.listen( 35729 )
	gulp.watch( './**/*', notify( lr, __dirname + './' ) );
} );

// Express
app.use( require( 'connect-livereload' )() )
	<!-- livereload -->
	<
	script > document.write( '<script src="' + ( location.protocol || 'http:' ) + '//' + ( location.hostname || 'localhost' ) + ':35729/livereload.js?snipver=1"><\/scr' + 'ipt>' ) < /script>
