const left_pad = require('left-pad')
const Promise = require('promise-a-plus');

gaepyhelper.register_webapp2_path_handlers( '/', {
    get : self => {
        gaepyhelper.set_webapp2_request_header( self, 'Content-Type', 'application/json' );

        let promise = new Promise( ( resolve, reject ) => {
            setTimeout( () => {
                resolve('1000 ms Delayed');
            }, 1000 )
        });

        promise.then( result => {
            let padded_world = left_pad('Hello, ' + result + ' And Left Padded World!', 50);
            let json_greeting = JSON.stringify({ greeting : padded_world });
            self.response.write( json_greeting );
        });

        __event_loop__();
    }
})

global.app = gaepyhelper.create_webapp2_app();
