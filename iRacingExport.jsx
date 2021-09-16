<javascriptresource>
    <name>$$$/JavaScripts/iRacing Export/Menu=iRacing Export</name>
    <category>Scripts/iRacing</category>
</javascriptresource>
#target photoshop

homeDrive = $.getenv("HOMEDRIVE");
homePath = $.getenv("HOMEPATH");
paintPath = homeDrive + homePath + "\\Documents\\iRacing\\paint";

doc = app.activeDocument;

// details from filename
carInfo = doc.name.split(".")[0].split("_")
carModel = carInfo[0];
carPath = paintPath + "\\" + carModel;
carNum = carInfo[1].substring(0, 6);

// layers
specLayer = doc.layers["Custom Spec Map"];
paintableLayer = doc.layers["Paintable Area"];
infoLayer = doc.layers["Turn Off Before Exporting TGA"];

// store visibility of layers so that we can go back to how they were
specVisible = specLayer.visible;
paintableVisible = paintableLayer.visible;
infoVisible = infoLayer.visible;

// save spec layer
specPath = carPath + "\\car_spec_" + carNum;
paintableLayer.visible = false;
infoLayer.visible = false;
specLayer.visible = true;
saveTarga(specPath);

// save main paint layer
mainPath = carPath + "\\car_" + carNum;
paintableLayer.visible = true;
infoLayer.visible = false;
specLayer.visible = false;
saveTarga(mainPath);

// undo visibility changes
paintableLayer.visible = paintableVisible;
specLayer.visible = specVisible;
infoLayer.visible = infoVisible;

function saveTarga(filepath) {
    targaSaveOptions = new TargaSaveOptions();
    targaSaveOptions.alphaChannels = true;
    targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;
    app.activeDocument.saveAs(File(filepath), targaSaveOptions, true, Extension.LOWERCASE);
};