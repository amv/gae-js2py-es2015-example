# Google App Engine Standard with Js2Py ES2015 JavaScript template

This project is a proof of concept on how to take ES6 code with Promises and required NPM modules, and package it to be run in the Google App Engine Python Standard environment.

1. ES6 JavaScript code is translated to ES5 using [Babel](https://babeljs.io/).
2. ES5 code and required NPM modules are packaged with [Browserify](http://browserify.org/).
3. setTimeout polyfill by [Piotr Dabkowski](https://github.com/PiotrDabkowski) is prepended.
4. Code bundle is translated to Python using [Js2Py](https://github.com/PiotrDabkowski/Js2Py).
5. Code is served with [Google App Engine Python Standard](https://cloud.google.com/appengine/docs/standard/python/) using a Python wrapper module.

Please note that this template is for academic purposes, and it is not very advisable to run it in production ;)

## Installation

You need `python 2.7`, `Google Cloud SDK` and `Node.js` installed.

First install the python and node packages:

    git clone https://github.com/amv/
    pip install -r requirements.txt -t lib
    npm install

Then start the gulp translator watcher in the background, and then the GAE dev server in the foreground after a few seconds:

    gulp & sleep 5; dev_appserver.py .

You can then test the service using curl, but bear in mind that it has an intentional 1000 ms delay for showcasing the Promise in action:

    curl -v 'http://localhost:8080/'

Modifying the code in `src/main.js` should result in the code being retranslated by the gulp watcher, and the App Engine development server should also refresh the new code automatically.
