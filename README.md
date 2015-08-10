# Drupal 8 Theme

Includes:
* Gulp
* Sass
* Browser-sync
* Imagemin
* Singularity Grid System
* PatternLab
* Phantomas
* And much more theme development goodness

## Instructions

To install follow the following steps. Where you see `text like this`, enter the text from a command line terminal. Where you see `your_theme` you should replace that text with the name of your theme (without spaces).

Some steps presume you have already installed Node.js on your system. If you have not installed it before download and install it from this page: https://nodejs.org.

0. `git clone https://github.com/startinggravity/Drupal-8-Theme.git your_theme`

0. `cd your_theme`

0. `mv drupal8_theme.info.yml your_theme.info.yml`

0. Edit your_theme.info.yml to reflect your theme's name and other details. Make sure you change the path under "# Locate files" to reflect your theme directory's name. See also https://www.drupal.org/node/2349827.

0. `mv drupal8_theme.theme your_theme.theme`

0. Edit your_theme.theme to reflect your theme's name in the provided preprocess function. Add more conditional logic
and data (pre)processing of the output here as needed.

0. `mv drupal8_theme.breakpoints.yml your_theme.breakpoints.yml`

0. Edit your_theme.breakpoints.yml by changing 'drupal8_theme' to 'your_theme'. This appears in three places. You should also remove, add or edit breakpoints as needed for your theme layout.

0. `mv drupal8_theme.libraries.yml your_theme.libraries.yml`

0. Edit your_theme.libraries.yml as needed.

0. `node update`

0. `gulp install-all`

0. Edit line 26 of gulpfile.js, replacing "drupal.loc" with the domain of your local site.

Note: Running `node update` (step 11) and `gulp install-all` (step 12) will add several files in directories called node_modules and bower_components. The .gitignore file your theme will prevent these files from being added to your repo. This is intentional because the files are only needed for development. Additional developers on a team using the theme you have set up will also need to navigate to the theme and run the commands in steps 11 and 12.
