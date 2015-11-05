# Installation

Developing this Drupal 8 theme requires several components that are not provided natively by most operating systems. The following instructions presume no previous use of Node.js, NPM, Gulp and such, and presumes installation on a computer running MacOSX.

If you are certain you have used Node.js, Bower and Drush before, you can skip these instructions and continue with the information provided on the [README page](https://github.com/startinggravity/Drupal-8-Theme/blob/master/README.md#installation-instructions).

## Node.js

Node.js should be at least version v0.10.32. If you are unsure if you have installed it or are unsure of the version, you can check that by running from the command line:

```bash
node -v
```

To install it, download and install it from this page: https://nodejs.org, or if you are using a Mac and Homebrew, you can install node using: 

```bash
brew install node
```

## NPM

You should next make sure npm is installed. This can be done with: 

```bash 
npm -v
```

If you get an error indicating it's not installed, you can easily install it using the command: 

```bash
sudo npm install npm -g
```

## Gulp

We are using Gulp to automate many development steps. It's best to install it globally as well, so do that with:

```bash
npm install -g gulp
```

## Drush

Finally, you will need Drush. If you are a regular Drupal developer this may already be on your system, but make sure it is version 8, because that is the only version compatible with Drupal 8. To check, run:

```bash
drush version
```

If you are not running Drush 8, follow instalation instructions [provided here](http://www.drush.org/en/master/install/).

Once you are sure you have these packages installed, you are ready to install your theme with the steps provided in the [README page](https://github.com/startinggravity/Drupal-8-Theme/blob/master/README.md#installation-instructions). 
