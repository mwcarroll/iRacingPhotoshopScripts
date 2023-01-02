# iRacing Photoshop Scripts

A set of scripts (initially developed for personal use only), that I use in my workflow for creating liveries for iRacing in Photoshop.

## Script Descriptions

* [Add to Spec Map](iRacingAddToSpecMap.jsx)
  * A popup dialog that takes in values for red, green, and blue channel values to add to the Custom Spec Map folders with a trace of the currently selected layers
* [Export](iRacingExport.jsx)
  * Saves both the Paintable Area and Custom Spec Map folders as individual targa files, based off of the PSD filename (filename should match the format of `[car folder name]_[your member ID].psd`
* [Toggle Layers](iRacingToggleLayers.jsx)
  * A popup dialog, with values populated from folder names inside of `Paintable Area\Stickers\Series`, that automatically shows/hides folders inside `Custom Spec Map\[Channel]\Stickers\Series` and `Paintable Area\Stickers\Series`, with the assumption that they will match
  * Only the selected "series" folder will remain visible (in both the Paintable Area and Custom Spec Map)
