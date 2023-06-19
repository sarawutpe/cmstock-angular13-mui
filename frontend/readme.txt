-------------------------------------------------------------------
angular v14 (stock + material-ui)
-------------------------------------------------------------------
frontend http://localhost:4200
backend http://localhost:8085/api
-------------------------------------------------------------------
# building
Compiles an Angular application or library into an output directory
named dist/ at the given output path.
# basic build
$ ng build (put file on root path only)

# basic serve
$ npx server -p 4200 // serve on port 4200
https://angular.io/cli/build
-------------------------------------------------------------------
# angular cli
$ ng help
-------------------------------------------------------------------
# passing props
# in components
@Input() count: number = 0
# out components
@Output() handle = new EventEmitter()
-------------------------------------------------------------------
# create components
$ ng g c component_name
-------------------------------------------------------------------
# create services
$ ng g service service_name
-------------------------------------------------------------------
# create interceptors
$ ng g interceptor interceptor_name
-------------------------------------------------------------------
# create module
$ ng g module module_name
-------------------------------------------------------------------
# THEME
$ npm i bootstrap jquery
-------------------------------------------------------------------
