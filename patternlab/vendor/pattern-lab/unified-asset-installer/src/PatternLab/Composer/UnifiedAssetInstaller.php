<?php

/*!
 * Pattern Lab Unified Asset Installer Plugin for Composer
 *
 * Copyright (c) 2013-2014 Dave Olsen, http://dmolsen.com
 * Licensed under the MIT license
 *
 * Makes sure plugins and the like get put in a special folder. Post-install move of assets
 * is handled by core/src/PatternLab/Installer.
 *
 * Based on phpDocumenter's UnifiedAssetsInstaller class. Original info:
 *
 * @copyright 2010-2013 Mike van Riel / Naenius (http://www.naenius.com)
 * @license   http://www.opensource.org/licenses/mit-license.php MIT
 * @link      http://phpdoc.org
 *
 */

namespace PatternLab\Composer;

use \Composer\Installer\LibraryInstaller;
use \Composer\Package\PackageInterface;

class UnifiedAssetInstaller extends LibraryInstaller {
	
	/**
	* Determines the install path for all of the types
	*/
	public function getInstallPath(PackageInterface $package) {
		
		return $this->getPackageDir().DIRECTORY_SEPARATOR.$package->getName();
		
	}
	
	/**
	 * Returns the package directory based on Pattern Lab's config
	 *
	 * @return string a path relative to the root of the composer.json that holds the packages
	 */
	protected function getPackageDir() {
		
		$baseDir    = realpath(getcwd()).DIRECTORY_SEPARATOR;
		$configDir  = (is_dir($baseDir."_config")) ? "_config" : "config";
		$configFile = $baseDir.$configDir.DIRECTORY_SEPARATOR."config.yml";
		
		if (file_exists($configFile)) {
			$configData = file_get_contents($configFile);
			preg_match("/packagesDir:([ ]+)?([\"'])?([A-z0-9-]{1,})([\"'])?([ ]+)?/",$configData,$matches);
			$packageDir = (isset($matches[3])) ? $matches[3] : "packages"; // provide an expected default just in case
		} else {
			$packageDir = "vendor";
		}
		
		return $packageDir;
		
	}
	
	/**
	* Determines which composer types are supported
	*/
	public function supports($packageType) {
		if (strpos($packageType,"patternlab-") !== false) {
			$cleanPackageType  = str_replace("patternlab-","",$packageType);
			$cleanPackageTypes = array("command", "datakit", "mustachehelper", "twighelper", "patternengine", "patternkit", "plugin", "starterkit", "styleguidekit", "styleguidetheme");
			return (bool) (in_array($cleanPackageType,$cleanPackageTypes));
		}
		return false;
	}
	
}
