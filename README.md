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

The installation steps below presume you have already installed Node.js on your system. It should be at least version v0.10.32. If you have not installed it before download and install it from this page: https://nodejs.org. If you are unsure you have installed it or are unsure of the version, you can check that by running `node -v` from the command line.

You should next make sure npm is installed. You can check that with `npm -v`. If you get an error indicating it's not installed, you can easily install using the command `sudo npm install npm -g`.

Once you have Node.js and npm installed, install your theme with the following steps. Where you see `text like this`, enter the text from a command line terminal. Where you see `your_theme` you should replace that text with the name you have given to your theme (without spaces).

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

0. Edit may not be needed to your_theme.libraries.yml unless you choose to add other CSS and JS files. You can find more information on the use of the libraries.yml file here: https://www.drupal.org/developing/api/8/assets.

0. `npm update`

0. `gulp install-all`

0. Edit line 26 of gulpfile.js, replacing "drupal.loc" with the domain of your local site.

Note: Running `node update` (step 11) and `gulp install-all` (step 12) will add several files in directories called node_modules and bower_components. The .gitignore file your theme will prevent these files from being added to your repo. This is intentional because the files are only needed for development. Additional developers on a team using the theme you have set up will also need to navigate to the theme and run the commands in steps 11 and 12.
