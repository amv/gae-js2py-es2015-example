import webapp2

app_handlers = [];

def register_webapp2_path_handlers( path, handlers ):
    app_handlers.append( [ path, handlers ] )

def create_webapp2_app():
    tuples = []

    for index, handlers in enumerate(app_handlers):
        path = str(handlers[0])
        handler_functions = handlers[1].to_dict()
        tuples.append( ( path, _create_class( 'HandlerClass' + str(index), webapp2.RequestHandler, handler_functions ) ) )

    return webapp2.WSGIApplication(tuples, debug=True)

def _create_class(name, BaseClass, functions):
    methods = {};
    for fn, fndef in functions.iteritems():
        def wrapper(*args):
            fndef(*args)
        methods[ str(fn) ] = wrapper

    newclass = type(str(name), (BaseClass,), methods)
    return newclass

def set_webapp2_request_header( self, key, value):
    self.response.headers[str(key)] = str(value)
