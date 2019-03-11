# Gulp 4 Front-End package "gulp": "^4.0.0"
Task: to compile the npm plugins in production of HTML, CSS, IMAGES and JS files.

## Feature:
**All JS files in the target source path will be separately bundled, browserified, babelified and uglified; The destination path will consist file.js.map, file.js and file.min.js;**

- It minimizes HTML files;
- It compiles and minimizes SCSS files;
- It compiles and minimizes JS files, using "Browserify" 
in combination with "Watchify", "Babelify" and "Uglify" plugins;
- it compresses the image files with special rules for
the each type of the image file;


### Getting Started:

- 'gulp watch': please, init in the console for the single build of
the target files, starting Browser and following watching of the
files to be changed; 
- 'gulp build': please, init in the console for the single build of
the target files and starting Browser. The following changes of the 
target files will not be checked;

### Directory Structure

.
|-- build
     |-- css
        main.css        //piped with dependencies
        main.min.css    //to be linked to *.html
        pageNew.css
        pageNew.min.css //to be linked to *.html
     |-- fonts
     |-- img            //already compressed files
     |-- js
        main.js
        main.js.map     //mapping of js file
        main.min.js     //to be linked to *.html
        pageNew.js
        pageNew.js.map
        pageNew.min.js  //to be linked to *.html
     index.html         //minimized html
     pageNew.html       //minimized html
|-- src
     |-- scss
        |-- partial
            _mixins.scss
            .......
        main.scss
        pageNew.scss
     |-- img         //initial image files to be compressed
     |-- js
        |-- partial
            data1.js
            data2.js
            .......
        |-- utils
            funcCollection.js   //for gulp tasks
            pathMap.js
        main.js                 //*.js will be piped from here
        pageNew.js
     index.html                 //*.html will be piped from here
     pageNew.html
gulpfile.js
package.json
package-lock.json
README.md

### Instructions

- The Browser Reloading is realized with "browser-sync": "^2.26.3"

#### HTML: 

Each HTML file, located in 'src/' will minimized and
piped to 'build/';
##### Plugins:
###### "gulp-filesize": "0.0.6" 
- to log the sizes of the files before and after minimizing;

###### "gulp-htmlmin": "^5.0.1" 
- to minimize *.html with white space collapsing;

#### CSS: 

Each scss file, located in 'src/scss' (except inner
directories), will be piped to 'build/css' as minimized 
file (with 'min' prefix) and not minimized version
for convenience; The minimized version of css file will
be linked in html page;
##### Plugins:
###### "gulp-filesize": "0.0.6" 
- to log the sizes of the files before and after minimizing;

###### "gulp-sass": "^4.0.2"
- to compile .scss files to css;

###### "gulp-autoprefixer": "^6.0.0"
to parse CSS and add vendor prefixes to CSS rules;

###### "gulp-rename": "^1.4.0"
- to rename the file in stream and passing further;

###### "gulp-clean-css": "^4.0.0"
- to minify CSS file;

###### "gulp-filesize": "0.0.6" 
- to log the sizes of the files before and after minimizing;

#### JS:

Each js file, located in 'src/js' (except inner
directories), will be piped to 'build/js' as minimized 
file (with 'min' prefix) and not minimized version
for convenience; The minimized version of js file can
be linked in html page;
##### Plugins:
###### node-js path
will be required for path.basename property;

###### "browserify": "^16.2.3"
- to require module.exports from the separate js files;
It gives convenience in importing files as in node.js
by using 'require';
- browserify will recursively analyze all the require()
 calls in the app in order to build a bundle, which can
 be served up to the browser in a single <script> tag.
 
###### "babelify": "^10.0.0"
###### "@babel/core": "^7.3.4"
###### "@babel/preset-env": "^7.3.4"
- works in combination with "browserify", converting 
ECMAScript 2015+ code into a backwards compatible version 
of JavaScript in current and older browsers or environments;

###### "watchify": "^3.11.1"
- works in combination with "browserify", watching for
the changes, then the "browserify" bundle will be recompiled;

###### "gulp-watch": "^5.0.1"
- is used for watching the files in the target path, then
the callback function repipes the files to the 'build' path;

###### "exorcist": "^1.0.1"
- is used in combination with "browserify" to create 
separate map.js files in the pipe;

###### "vinyl-buffer": "^1.0.1"
###### "vinyl-source-stream": "^2.0.0"
- Convert streaming vinyl files to use buffers.
"vinyl-source-stream" module is just a bridge that makes it simple to 
use conventional text streams such as this in combination 
with gulp.

###### "gulp-uglify": "^3.0.2"
- Uglifying JavaScript involves changing variable and 
function names to reduce their size;

#### IMAGES:

Each image file, located in 'src/img', will be piped to 'build/img' 
as minimized file

###### "gulp-newer": "^1.4.0"
- to check the 'build' directory and to pipe the images 
from 'src/img' only if a new file exists;

###### "gulp-imagemin": "^5.0.3"
- to compress the image files, corresponding to the rules 
for compressing: gif, jpeg, png and svg files;