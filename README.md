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
To install (replace where ever "your_theme" appears with the name of your theme with no spaces):<br />
1. <code>git clone https://github.com/startinggravity/Drupal-8-Theme.git your_theme</code><br />
2. <code>cd your_theme</code><br />
3. <code>mv drupal8_theme.info.yml your_theme.info.yml</code><br />
4. Edit your_theme.info.yml to reflect your theme's name and other details. See https://www.drupal.org/node/2349827.<br />
5. <code>mv drupal8_theme.theme your_theme.theme</code><br />
6. Edit your_theme.theme to reflect your theme's name in the provided preprocess function. Add more conditional logic
and data (pre)processing of the output here as needed.<br />
7. <code>mv drupal8_theme.breakpoints.yml your_theme.breakpoints.yml</code><br />
8. Edit your_theme.breakpoints.yml as needed.<br />
9. <code>mv drupal8_theme.libraries.yml your_theme.libraries.yml</code><br />
10. Edit your_theme.libraries.yml as needed.<br />
11. <code>node install</code><br />
12. <code>gulp install-all</code><br />
