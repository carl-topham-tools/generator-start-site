# generator-start-site

> A [Yeoman](http://yeoman.io) generator that creates a basic site template with grunt setup ready for development and distribution.

## Includes

- Grunt setup for sass and distribution
- Sass project scafolding. As minimal as possible.
- jQuery & Modernizer (using Bower package manager) so you can get working straight way.
- index.html so you can start building your site template asap.


## Getting Started

### Requirements
- Yeoman
- Bower
- Grunt
- Sass

#### Yeoman, Grunt & Bower (Best buddies!)

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.* If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


```
npm install -g yo
```

### Installing the start-site generator

To install generator-start-site, run:

```
npm install -g generator-start-site
#Lots of code will happen... This is npm installing what it needs
```

When you want to create a new site simply run:

```
yo start-site
```

Answer the questions and Yeoman will sort you out!


## Basic workflow

Grunt lives in the tasks folder. Navigate to this folder and run (Stop grunt watch running using cmd + c):

```
#ignore this if your in the 'tasks' folder already
cd /yourproject/tasks/

#run
grunt watch
```

Your HTML templates and css/scss live in the dev folder. Any changes you make to the 'dev/src/scss' files will be compiled into the 'dev/static/css' folder. you can make as many HTML file as you need in the dev folder - they will all be copied to the dist folder when you're ready to go live!

Once your site is ready to go live you will need to run:


```
#ignore this if your in the 'tasks' folder already
cd /yourproject/tasks/  

#run
grunt dist
```

Grunt will process all your sass, minify and copy it, concatonate and minify your js to the header and footer scripts (pre & post) and copy and html files across to the dist folder. You can the FTP or copy your dist folder to where ever you want. It's all self contained.


## Template hints

In the included index.html you will see:

```
 <!-- build:js static/js/pre.js -->
  <script src="static/js/header.js"></script>
  <script src="bower_components/modernizr/modernizr.js"></script>
  <!-- endbuild -->
```

When you run your distribution grunt will optimize all the files between the comments into one javascipt file. If you have a specific group of javascipts for one page (eg a gallery and slider) put them between a new set of comments and you'll get the extra javascript. If it's in the same comment block then it might get overwritten when it compiles! Wrap all js in a comment tag if it's not in the provided blocks. Grunt will take care of the rest for you! :-)



## License

MIT
