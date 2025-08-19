// process js
const gulp = require("gulp");
const merge = require('merge-stream');
const es = require('event-stream');
const log = require("fancy-log");
const browserify = require("browserify");
const buffer = require("vinyl-buffer");
const source = require("vinyl-source-stream");
const uglify = require("gulp-uglify");
const sourcemaps = require("gulp-sourcemaps");
const rename = require("gulp-rename");
const linter = require("gulp-eslint");

function jslint() {
  return gulp
    .src(["./_scripts/js/**/*.js"])
    .pipe(linter(".eslintrc"))
    .pipe(linter.format());
}

function jsbuild() {
  var entryArray = ["main","quiz","filters"]

  var tasks = entryArray.map(function(packagename) {
    log(packagename);
    var minifiedStream = browserify({
      entries: "_scripts/" + packagename + ".js",
      debug: true,
    });
  
    return minifiedStream
      .bundle()
      .pipe(source(packagename + ".js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on("error", log)
      .pipe(
        rename({
          basename: packagename,
        }),
      )
      .pipe(sourcemaps.write("."))
      
    });

  let mergedstreams = es.merge.apply(null, tasks)
    .pipe(gulp.dest("assets/js"));

  return mergedstreams;

};

function jswatch(done) {
  return gulp.watch(["./_scripts/js/*.js"], gulp.series(jslint, jsbuild));
}

module.exports = {
  jslint,
  jsbuild,
  jswatch,
};