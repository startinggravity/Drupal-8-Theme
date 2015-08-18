# Drupal 8 Theme

Includes:
* [Gulp](http://gulpjs.com) for task-running
* [Sass](http://sass-lang.com) for pre-processing CSS
* [Browsersync](http://www.browsersync.io) for simultaneous testing on multiple browsers
* [Imagemin](https://www.npmjs.com/package/gulp-imagemin) for minifying PNG, JPEG, GIF and SVG images on the fly
* [Singularity Grid System](https://github.com/at-import/Singularity) for a responsive grid framework
* [Pattern Lab](http://patternlab.io) for designing in the browser and creating a living styleguide
* And much more theme development goodness

## Pre-installation Notes

(TODO: Make a Yeoman generator to simplify all of this.)

The installation steps below presume you have already installed Node.js and npm on your system. If you are certain you do, you can skip down to the installation instructions. Otherwise, follow the information here.

Node.js should be at least version v0.10.32. If you have not installed it before, download and install it from this page: https://nodejs.org, or if you are using a Mac and Homebrew, you can install node using: 

```bash
brew install node
```

If you are unsure if you have installed it or are unsure of the version, you can check that by running from the command line:

```bash
node -v
```

You should next make sure npm is installed. You can check that with: 

```bash 
npm -v
```

If you get an error indicating it's not installed, you can easily install it using the command: 

```bash
sudo npm install npm -g
```

Finally, we are using Gulp to automate many development steps. It's best to install it globally as well, so do that with:

```bash
npm install -g gulp
```

Once you are sure you have Node.js, npm and Gulp installed, you are ready to install your theme with the following steps. Where you see `your_theme` you should replace that text with the name you have given to your theme (without spaces).

## Installation Instructions

0. Navigate in your Drupal installation to themes (`cd themes`). If you wish, you can add a new directory for your custom themes (`mkdir custom && cd custom`). Then install the theme files using: 

```bash
git clone https://github.com/startinggravity/Drupal-8-Theme.git your_theme
```

0. Change directories to where your put your theme.

```bash
cd your_theme
```

0. Rename the theme info.yml file.

```bash 
mv drupal8_theme.info.yml your_theme.info.yml
```

0. Edit your_theme.info.yml to reflect your theme's name and other details. Make sure you change the path under "# Locate files" to reflect your theme directory's name. See also https://www.drupal.org/node/2349827.

0. Rename the .theme file.

```bash
mv drupal8_theme.theme your_theme.theme
```

0. Edit your_theme.theme to reflect your theme's name in the provided preprocess function. Add more conditional logic and data (pre)processing of the output here as needed.

0. Rename the breakpoints.yml file.

```bash
mv drupal8_theme.breakpoints.yml your_theme.breakpoints.yml
```

0. Edit your_theme.breakpoints.yml by changing 'drupal8_theme' to 'your_theme'. This appears in three places. You should also remove, add or edit breakpoints as needed for your theme layout. At least for now, this will get you started.

0. Rename the libraries.yml file.

```bash
mv drupal8_theme.libraries.yml your_theme.libraries.yml
```

0. Editing may not be needed in your_theme.libraries.yml, or at least not right away. This is where you can add other CSS and JS files. You can find more information on the use of the libraries.yml file here: https://www.drupal.org/developing/api/8/assets.

0. Edit line 26 of gulpfile.js, replacing "drupal.loc" with the domain of your local site.

0. Now install all of the Node.js modules we need.

```bash
npm install
```

0. Then install the Bower modules.

```bash
gulp install-all
```

0. Finally, set up Pattern Lab.

```bash
gulp generate-pattern-lab
```

## Post-installation Notes

Running `npm install` (step 11) and `gulp install-all` (step 12) will add several files in directories called node_modules and bower_components. The .gitignore file in your theme will prevent these files from being added to your repo. This is intentional because the files are only needed for development. 

If you are adding developers on a team who are editing the theme, after they have cloned your site's repo they will need to navigate to the theme directory and run the commands in steps 11, 12 and 13.

## Using PatternLab

To set patterns, follow instructions provided here: https://github.com/pattern-lab/patternengine-php-twig/blob/master/README.md

To provide SCSS files to Pattern Lab, edit the Drupal theme Sass files. They will be automatically imported to Pattern Lab when you run `gulp`, `gulp generate-pattern-lab`, or `gulp sass-pattern-lab`.

## For development

The development of a theme using these files and configuation would normally proceed as follows:

1. Provide pattern files in Pattern Lab to match markup in Drupal theme template files. The pattern lab files are based on Twig, the same theming engine used in Drupal 8.

1. Edit Sass files to provide layout and styling. These files are replicated in Pattern Lab to largely eliminate redundant coding.

1. Gulp commands provide automation of the development process. Under normal circumstances, the default command `gulp` is all that is needed to watch for file changes, process Sass files into CSS, trigger Drush to clear cache, and refresh the browser.

1. Pattern Lab can be found at "http://your-site/themes/your_theme/pattern-lab" and "http://localhost:3000/themes/pattern-lab/pattern-lab/public/" (when Browsersync is running), or else "http://your-site/themes/custom/your_theme/pattern-lab" and "http://localhost:3000/themes/custom/pattern-lab/pattern-lab/public/" if you chose to place your theme inside a subdirectory "custom" in /themes.
