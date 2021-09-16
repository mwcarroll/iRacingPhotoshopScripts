<javascriptresource>
    <name>$$$/JavaScripts/iRacing Toggle Folders/Menu=iRacing Toggle Folders</name>
    <category>Scripts/iRacing</category>
</javascriptresource>
#target photoshop

// var wecButton;
// var imsaButton;

doc = app.activeDocument;

var dlg = new Window( "dialog", "Decals Toggle" );
var btnPnl = dlg.add( "panel", undefined, "Decals" );

// base folders: paintable area, custom spec map
var PA_folder = doc.layers["Paintable Area"];
var CSM_folder = doc.layers["Custom Spec Map"];

// custom spec map folders: red channel metallic, green channel roughness
var CSM_RCM_folder = findFolder(CSM_folder, "Red Channel Metallic");
var CSM_GCR_folder = findFolder(CSM_folder, "Green Channel Roughness");

// stickers folders: paintable area, red channel metallic, green channel roughness
var PA_stickersFolder = findFolder(PA_folder, "Stickers");
var CSM_RCM_stickersFolder = findFolder(CSM_RCM_folder, "Stickers");
var CSM_GCR_stickersFolder = findFolder(CSM_GCR_folder, "Stickers");

// individual series folders; paintable area, red channel metallic, green channel roughness
var PA_seriesFolder = findFolder(PA_stickersFolder, "Series");
var CSM_RCM_seriesFolder = findFolder(CSM_RCM_stickersFolder, "Series");
var CSM_GCR_seriesFolder = findFolder(CSM_GCR_stickersFolder, "Series");

var PA_series = [];
var CSM_RCM_series = [];
var CSM_GCR_series = [];

PA_series = getAllChildrenFolders(PA_seriesFolder, PA_series);
CSM_RCM_series = getAllChildrenFolders(CSM_RCM_seriesFolder, CSM_RCM_series);
CSM_GCR_series = getAllChildrenFolders(CSM_GCR_seriesFolder, CSM_GCR_series);

for(var i = 0; i < PA_series.length; i++){
	var seriesButton = btnPnl.add("button", undefined, PA_series[i].name);

	seriesButton.onClick = function() {
		// the scope here is dumb and the series needs to be repopulated
		PA_series = [];
		PA_series = getAllChildrenFolders(PA_seriesFolder, PA_series);

		CSM_RCM_series = [];
		CSM_RCM_series = getAllChildrenFolders(CSM_RCM_seriesFolder, CSM_RCM_series);

		CSM_GCR_series = [];
		CSM_GCR_series = getAllChildrenFolders(CSM_GCR_seriesFolder, CSM_GCR_series);

		// show/hide Paintable Area series stickers folders
		for(var i = 0; i < PA_series.length; i++){
			if(PA_series[i].name.toUpperCase() !== this.text.toUpperCase()){
				PA_series[i].visible = false;
			} else {
				PA_series[i].visible = true;
			}
		}

		// show/hide Custom Spec Map - Red Channel Metallic stickers folders
		for(var i = 0; i < PA_series.length; i++){
			if(CSM_RCM_series[i].name.toUpperCase() !== this.text.toUpperCase()){
				CSM_RCM_series[i].visible = false;
			} else {
				CSM_RCM_series[i].visible = true;
			}
		}

		// show/hide Custom Spec Map - Green Channel Roughness stickers folders
		for(var i = 0; i < PA_series.length; i++){
			if(CSM_GCR_series[i].name.toUpperCase() !== this.text.toUpperCase()){
				CSM_GCR_series[i].visible = false;
			} else {
				CSM_GCR_series[i].visible = true;
			}
		}

		dlg.close();
	}
}

cancelBtn = btnPnl.add( "button", undefined, "Cancel", { name: "cancel" } );

dlg.show();


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