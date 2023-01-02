<javascriptresource>
    <name>$$$/JavaScripts/iRacing Toggle Folders/Menu=iRacing Toggle Folders</name>
    <category>Scripts/iRacing</category>
</javascriptresource>
#target photoshop

iRacingToggleLayers();

function iRacingToggleLayers(){
	const FN_CustomSpecMap = "Custom Spec Map";                     // folder name for "Custom Spec Map"
	const FN_CSM_RedChannelMetallic = "Red Channel Metallic";       // folder name for "Custom Spec Map\Red Channel Metallic"
	const FN_CSM_GreenChannelRoughness = "Green Channel Roughness"; // folder name for "Custom Spec Map\Green Channel Roughness"
	const FN_CSM_BlueChannelClearcoat = "Blue Channel Clearcoat";   // folder name for "Custom Spec Map\Blue Channel Clearcoat"
	const FN_PaintableArea = "Paintable Area";                      // folder name for "Paintable Area"
	const FN_Stickers = "Stickers";                                 // folder name for stickers and logos
	const FN_Series = "Series";                                     // folder name for series inside stickers folder

	doc = app.activeDocument;

	var dlg = new Window( "dialog", "Decals Toggle" );
	var btnPnl = dlg.add( "panel", undefined, "Decals" );

	// base folders: paintable area, custom spec map
	var PA_folder = doc.layers[FN_PaintableArea];
	var CSM_folder = doc.layers[FN_CustomSpecMap];

	if(PA_folder == undefined){
		exitFolder("'Paintable Area' folder was not found.", 14);
		return;
	}

	if(CSM_folder == undefined){
		exitFolder("'Custom Spec Map' folder was not found.", 10);
		return;
	}

	// custom spec map folders: red channel metallic, green channel roughness
	var CSM_RCM_folder = findFolder(CSM_folder, FN_CSM_RedChannelMetallic);
	var CSM_GCR_folder = findFolder(CSM_folder, FN_CSM_GreenChannelRoughness);
	var CSM_BCC_folder = findFolder(CSM_folder, FN_CSM_BlueChannelClearcoat);

	// stickers folders: paintable area, red channel metallic, green channel roughness, blue channel clearcoat
	var PA_stickersFolder = findFolder(PA_folder, FN_Stickers);
	var CSM_RCM_stickersFolder = CSM_RCM_folder != undefined ? findFolder(CSM_RCM_folder, FN_Stickers) : undefined;
	var CSM_GCR_stickersFolder = CSM_GCR_folder != undefined ? findFolder(CSM_GCR_folder, FN_Stickers) : undefined;
	var CSM_BCC_stickersFolder = CSM_BCC_folder != undefined ? findFolder(CSM_BCC_folder, FN_Stickers) : undefined;

	if(PA_stickersFolder == undefined){
		exitFolder("'Stickers' folder (inside 'Paintable Area') was not found.", 15);
		return;
	}

	// individual series folders; paintable area, red channel metallic, green channel roughness, blue channel clearcoat
	var PA_seriesFolder = findFolder(PA_stickersFolder, FN_Series);
	var CSM_RCM_seriesFolder = CSM_RCM_stickersFolder != undefined ? findFolder(CSM_RCM_stickersFolder, FN_Series) : undefined;
	var CSM_GCR_seriesFolder = CSM_GCR_stickersFolder != undefined ? findFolder(CSM_GCR_stickersFolder, FN_Series) : undefined;
	var CSM_BCC_seriesFolder = CSM_BCC_stickersFolder != undefined ? findFolder(CSM_BCC_stickersFolder, FN_Series) : undefined;

	if(PA_seriesFolder == undefined){
		exitFolder("'Series' folder (inside 'Paintable Area\\Stickers') was not found.", 16);
		return;
	}

	var PA_series = [];
	var CSM_RCM_series = [];
	var CSM_GCR_series = [];
	var CSM_BCC_series = [];

	PA_series = getAllChildrenFolders(PA_seriesFolder, PA_series);

	for(var i = 0; i < PA_series.length; i++){
		var seriesButton = btnPnl.add("button", undefined, PA_series[i].name);

		seriesButton.onClick = function() {
			// the scope here is dumb and the series needs to be repopulated
			PA_series = [];
			PA_series = getAllChildrenFolders(PA_seriesFolder, PA_series);

			CSM_RCM_series = [];
			if(CSM_RCM_seriesFolder != undefined)
				CSM_RCM_series = getAllChildren(CSM_RCM_seriesFolder, CSM_RCM_series);

			CSM_GCR_series = [];
			if(CSM_GCR_seriesFolder != undefined)
				CSM_GCR_series = getAllChildren(CSM_GCR_seriesFolder, CSM_GCR_series);

			CSM_BCC_series = [];
			if(CSM_BCC_seriesFolder != undefined)
				CSM_BCC_series = getAllChildren(CSM_BCC_seriesFolder, CSM_BCC_series);

			var layersToManipulate = [].concat(PA_series, CSM_RCM_series, CSM_GCR_series, CSM_BCC_series);

			for(var i = 0; i < layersToManipulate.length; i++){
				if(layersToManipulate[i].name.toUpperCase() !== this.text.toUpperCase()){
					layersToManipulate[i].visible = false;
				} else {
					layersToManipulate[i].visible = true;
				}
			}

			dlg.close();
		}
	}

	cancelBtn = btnPnl.add( "button", undefined, "Cancel", { name: "cancel" } );

	dlg.show();
}

// Function: find a singular folder
function findFolder(parent, findName){
	for(var i = 0; i < parent.layers.length; i++){
		var currentFolder = parent.layers[i];

		if(currentFolder.typename === "LayerSet"){
			if(currentFolder.name.toUpperCase() === findName.toUpperCase()){
				return currentFolder;
			} else {
				findFolder(currentFolder, findName);
			}
		} 
	}
}

// Function: returns a list of all children folders of parent, one layer deep
function getAllChildrenFolders(parent, list){
	for(var i = 0; i < parent.layers.length; i++){
		var currentFolder = parent.layers[i];

		if(currentFolder.typename === "LayerSet"){
			list.push(currentFolder);
		}
	}

	return list;
}

// Function: returns a list of all children of parent, one layer deep
function getAllChildren(parent, list){
	for(var i = 0; i < parent.layers.length; i++){
		list.push(parent.layers[i]);
	}

	return list;
}

// Function: alert exit reason
function exit(reason){
	alert(reason + "\n\nThis is required for the script to work.\n\nExiting script.");
}

// Function: alert exit reason, with line number for folder name
function exitFolder(reason, lineNumber){
	exit(reason + "\n\nPlease check the folder name (inside quotation marks) on line number " + lineNumber + " of this script.")
}
