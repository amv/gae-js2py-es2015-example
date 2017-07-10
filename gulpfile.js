const gulp = require('gulp');
const babel = require('babelify');
const exec = require('child_process').execSync;
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');

gulp.task('babel', () => {
    browserify('src/main.js', { debug: true })
      .transform("babelify", { presets: ["es2015"] })
      .bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('main.js'))
      .pipe(gulp.dest('dist')
      .on('end', function() {
          return exec('mkdir -p build;'
              + 'cat src/mainprefix.jstmpl > build/main.js;'
              + 'cat dist/main.js >> build/main.js;'
              + ' python -c \'import js2py; js2py.translate_file("build/main.js","js_main.py")\'');
      }));
});

gulp.task('olddefault', [ 'babel' ] )

function compile(watch) {
    var bundler = watchify(
        browserify('./src/main.js', { debug: true } )
        .transform("babelify", { presets: ["es2015"] })
    );

    function rebundle() {
        bundler.bundle()
            .on('error', function(err) { console.error(err); this.emit('end'); })
            .pipe(source('main.js'))
            .pipe(gulp.dest('dist')
            .on('end', function() {
                return exec('mkdir -p build;'
                    + 'cat src/mainprefix.jstmpl > build/main.js;'
                    + 'cat dist/main.js >> build/main.js;'
                    + ' python -c \'import js2py; js2py.translate_file("build/main.js","js_main.py")\'');
            }));
    }

    if (watch) {
        bundler.on('update', function() {
            console.log('-> rebundling...');
            rebundle();
        });
    }

    rebundle();
}

function watch() {
  return compile(true);
};


gulp.task('build', function() { return compile(); });
gulp.task('watch', function() { return watch(); });

gulp.task('default', ['watch']);
