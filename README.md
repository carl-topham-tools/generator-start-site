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

To install generator-start-site, clone this repo. inside the repo folder run:

```
npm link
```

When you want to create a new site simply create a folder and inside run:

```
yo start-site
```

Answer the questions and Yeoman will sort you out!


## Basic workflow

Grunt lives in the tasks folder. Navigate to this folder and run (Stop grunt watch running using cmd + c):

```
grunt watch
```

Any changes you make to the 'dev/src/scss' files will be compiled into the 'dev/static/css' folder.

Once your site is ready to go run:


```
grunt dist
```

Grunt will process all your sass, minify and copy it, concatonate and minify your js to the header and footer scripts (pre & post) and copy and html files across to the dist folder. You can the FTP or copy your dist folder to where ever you want. It's all self contained.

## License

MIT
