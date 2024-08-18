<javascriptresource>
    <name>$$$/JavaScripts/iRacing Export/Menu=iRacing Export</name>
    <category>Scripts/iRacing</category>
</javascriptresource>
#target photoshop

homeDrive = $.getenv("HOMEDRIVE");
homePath = $.getenv("HOMEPATH");
var paintPath = homeDrive + homePath + "\\Documents\\iRacing\\paint";
var specPath = "";
var mainPath = "";

doc = app.activeDocument;

// details from filename
var isHelmet = false;
var isSuit = false;

var fileInfo = doc.name.split(".")[0].split("_")

var model = fileInfo[0];
var number = fileInfo[1].split("-")[0];

switch(model){
    case "helmet":
        isHelmet = true;

        mainPath = paintPath + "\\helmet_" + number;   
        break;
    case "suit":
        isSuit = true;

        mainPath = paintPath + "\\suit_" + number;   
        break;
    default:
        paintPath = paintPath + "\\" + model; 
        specPath = paintPath + "\\car_spec_" + number;
        mainPath = paintPath + "\\car_" + number;

        break;
}

var specLayer, paintableLayer, infoLayer;

// layers
try {
    specLayer = doc.layers["Custom Spec Map"];
} catch(e) {}

try {
    paintableLayer = doc.layers["Paintable Area"];
} catch(e) {}

try {
    infoLayer = doc.layers["Turn Off Before Exporting TGA"];
} catch(e) {}

// store visibility of layers so that we can go back to how they were
specVisible = specLayer != undefined ? specLayer.visible : false;
paintableVisible = paintableLayer != undefined ? paintableLayer.visible : false;
infoVisible = infoLayer != undefined ? infoLayer.visible : false;

// save spec layer
if(!isHelmet && !isSuit){
    if(paintableLayer != undefined) paintableLayer.visible = false;
    if(infoLayer != undefined) infoLayer.visible = false;
    if(specLayer != undefined) specLayer.visible = true;

    saveTarga(specPath);
}

// save main paint layer
if(paintableLayer != undefined) paintableLayer.visible = true;
if(infoLayer != undefined) infoLayer.visible = false;
if(specLayer != undefined) specLayer.visible = false;

saveTarga(mainPath);

// undo visibility changes
if(paintableLayer != undefined) paintableLayer.visible = paintableVisible;
if(infoLayer != undefined) infoLayer.visible = infoVisible;
if(specLayer != undefined) specLayer.visible = specVisible;

function saveTarga(filePath) {
    targaSaveOptions = new TargaSaveOptions();
    targaSaveOptions.alphaChannels = true;
    targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;
    app.activeDocument.saveAs(File(filePath), targaSaveOptions, true, Extension.LOWERCASE);
};