# Installation

Developing this Drupal 8 theme requires several components that are not provided natively by most operating systems. The following instructions presume no previous use of Node.js, NPM, Gulp, Bower and such, and presumes installation on a computer running MacOSX.

If you are certain you have used Node.js, Gulp and Bower before, you can skip these instructions and continue with the information provide on the (README page)[https://github.com/startinggravity/Drupal-8-Theme/blob/master/README.md].

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

Finally, we are using Gulp to automate many development steps. It's best to install it globally as well, so do that with:

```bash
npm install -g gulp
```

Once you are sure you have Node.js, npm and Gulp installed, you are ready to install your theme with the following steps. Where you see `your_theme` you should replace that text with the name you have given to your theme (without spaces).
