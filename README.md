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

To install (replace where ever "your_theme" appears with the name of your theme with no spaces):
1.     git clone https://github.com/startinggravity/Drupal-8-Theme.git your_theme
2.     cd your_theme
3.     mv drupal8_theme.info.yml your_theme.info.yml
4. Edit your_theme.info.yml to reflect your theme's name and other details. See https://www.drupal.org/node/2349827.
5.     mv drupal8_theme.theme your_theme.theme
6. Edit your_theme.theme to reflect your theme's name in the provided preprocess function. Add more conditional logic
and data (pre)processing of the output here as needed.
7.     mv drupal8_theme.breakpoints.yml your_theme.breakpoints.yml
8. Edit your_theme.breakpoints.yml as needed.
9.     mv drupal8_theme.libraries.yml your_theme.libraries.yml
10. Edit your_theme.libraries.yml as needed.