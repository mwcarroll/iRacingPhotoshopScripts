<javascriptresource>
    <name>$$$/JavaScripts/iRacing Add to Spec Map/Menu=iRacing Add to Spec Map</name>
    <category>Scripts/iRacing</category>
</javascriptresource>
#target photoshop

const FN_CustomSpecMap = "Custom Spec Map";                     // folder name for "Custom Spec Map"
const FN_CSM_RedChannelMetallic = "Red Channel Metallic";       // folder name for "Custom Spec Map\Red Channel Metallic"
const FN_CSM_GreenChannelRoughness = "Green Channel Roughness"; // folder name for "Custom Spec Map\Green Channel Roughness"
const FN_CSM_BlueChannelClearcoat = "Blue Channel Clearcoat";   // folder name for "Custom Spec Map\Blue Channel Clearcoat"

var color_RedChannelMetallic = new HSBColor();
color_RedChannelMetallic.hue = 0;
color_RedChannelMetallic.saturation = 0;

var color_GreenChannelRoughness = new HSBColor();
color_GreenChannelRoughness.hue = 0;
color_GreenChannelRoughness.saturation = 0;

function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

const dialogMode = DialogModes.NO;

var selectedLayersIdxs = getSelectedLayersIdx();

selectedLayersIdxs = cleanUpIdxs(selectedLayersIdxs).sort();

clearSelection(selectedLayersIdxs);
addToSelectionByIdxs(selectedLayersIdxs);

var dlg = new Window('dialog', 'Add Current Layer/Group to Spec Map');

//Add Red panel
dlg.RedPanel = dlg.add("panel", undefined, "Metallic");
dlg.RedPanel.alignChildren = "right";
dlg.RedPanel.orientation = 'row';
dlg.RedPanel.sliderRed = dlg.RedPanel.add('scrollbar', undefined, 50.0, 0, 100);
dlg.RedPanel.sliderRed.preferredSize = [100,20];
dlg.RedPanel.RedValue = dlg.RedPanel.add('edittext');
dlg.RedPanel.RedValue.preferredSize = [50,25];
dlg.RedPanel.RedValue.onChange = function (){
   if (!isNaN(dlg.RedPanel.RedValue.value)){
      alert("Metallic value is not a valid number", dlg.RedPanel.RedValue.value);}
}
dlg.RedPanel.RedPercent = dlg.RedPanel.add('statictext');
dlg.RedPanel.RedPercent.text = "%";
dlg.RedPanel.RedValue.text = Math.round(dlg.RedPanel.sliderRed.value * 10)/10;
dlg.RedPanel.sliderRed.onChanging = function () {
    dlg.RedPanel.RedValue.text = Math.round(dlg.RedPanel.sliderRed.value * 10)/10;

    color_RedChannelMetallic.brightness = Math.round(dlg.RedPanel.sliderRed.value * 10)/10;
}

//Add Green panel
dlg.GreenPanel = dlg.add("panel", undefined, "Roughness");
dlg.GreenPanel.alignChildren = "right";
dlg.GreenPanel.orientation = 'row';
dlg.GreenPanel.sliderGreen = dlg.GreenPanel.add('scrollbar', undefined, 50.0, 0, 100);
dlg.GreenPanel.sliderGreen.preferredSize = [100,20];
dlg.GreenPanel.GreenValue = dlg.GreenPanel.add('edittext');
dlg.GreenPanel.GreenValue.preferredSize = [50,25];
dlg.GreenPanel.GreenValue.onChange = function (){
   if (isNaN(dlg.GreenPanel.GreenValue.value)){
      alert("Roughness value is not a valid number", dlg.GreenPanel.GreenValue.value);}
}
dlg.GreenPanel.GreenPercent = dlg.GreenPanel.add('statictext');
dlg.GreenPanel.GreenPercent.text = "%";
dlg.GreenPanel.GreenValue.text = Math.round(dlg.GreenPanel.sliderGreen.value * 10)/10;
dlg.GreenPanel.GreenValue.text.onChanging = function(){
    dlg.GreenPanel.sliderGreen.value = dlg.GreenPanel.GreenValue.text;
}
dlg.GreenPanel.sliderGreen.onChanging = function () {
    dlg.GreenPanel.GreenValue.text = Math.round(dlg.GreenPanel.sliderGreen.value * 10)/10;

    color_GreenChannelRoughness.brightness = Math.round(dlg.GreenPanel.sliderGreen.value * 10)/10;
}

//Add Blue panel
dlg.BluePanel = dlg.add("panel", undefined, "Roughness");
dlg.BluePanel.alignChildren = "right";
dlg.BluePanel.orientation = 'row';
dlg.BluePanel.sliderBlue = dlg.BluePanel.add('scrollbar', undefined, 50.0, 0, 100);
dlg.BluePanel.sliderBlue.preferredSize = [100,20];
dlg.BluePanel.BlueValue = dlg.BluePanel.add('edittext');
dlg.BluePanel.BlueValue.preferredSize = [50,25];
dlg.BluePanel.BlueValue.onChange = function (){
   if (isNaN(dlg.BluePanel.BlueValue.value)){
      alert("Roughness value is not a valid number", dlg.BluePanel.BlueValue.value);}
}
dlg.BluePanel.BluePercent = dlg.BluePanel.add('statictext');
dlg.BluePanel.BluePercent.text = "%";
dlg.BluePanel.BlueValue.text = Math.round(dlg.BluePanel.sliderBlue.value * 10)/10;
dlg.BluePanel.BlueValue.text.onChanging = function(){
    dlg.BluePanel.sliderBlue.value = dlg.BluePanel.BlueValue.text;
}
dlg.BluePanel.sliderBlue.onChanging = function () {
    dlg.BluePanel.BlueValue.text = Math.round(dlg.BluePanel.sliderBlue.value * 10)/10;

    color_BlueChannelRoughness.brightness = Math.round(dlg.BluePanel.sliderBlue.value * 10)/10;
}

dlg.btnRun = dlg.add("button", undefined, "Run");
dlg.btnRun.onClick = function() {
    color_RedChannelMetallic.brightness = Math.round(dlg.RedPanel.sliderRed.value * 10)/10;
    color_GreenChannelRoughness.brightness = Math.round(dlg.GreenPanel.sliderGreen.value * 10)/10;
    color_BlueChannelRoughness.brightness = Math.round(dlg.BluePanel.sliderGreen.value * 10)/10;

    var customSpecMapLayerSet = app.activeDocument.layerSets[FN_CustomSpecMap];
    var redChannelMetallicLayerSet = customSpecMapLayerSet.layerSets.getByName(FN_CSM_RedChannelMetallic);
    var greenChannelRoughnessLayerSet = customSpecMapLayerSet.layerSets.getByName(FN_CSM_GreenChannelRoughness);
    var blueChannelClearcoatLayerSet = customSpecMapLayerSet.layerSets.getByName(FN_CSM_BlueChannelClearcoat);

    var newRedChannelLayer = redChannelMetallicLayerSet.artLayers.add();
    app.activeDocument.activeLayer = newRedChannelLayer;
    app.activeDocument.selection.fill(color_RedChannelMetallic);   

    var newGreenChannelLayer = greenChannelRoughnessLayerSet.artLayers.add();
    app.activeDocument.activeLayer = newGreenChannelLayer;
    app.activeDocument.selection.fill(color_GreenChannelRoughness);   

    var newBlueChannelLayer = blueChannelClearcoatLayerSet.artLayers.add();
    app.activeDocument.activeLayer = newBlueChannelLayer;
    app.activeDocument.selection.fill(color_BlueChannelRoughness);   

    app.activeDocument.selection.deselect();
    this.parent.close(0);
}

dlg.btnCancel = dlg.add("button", undefined, "Cancel");
dlg.btnCancel.onClick = function() { 
    app.activeDocument.selection.deselect();
    this.parent.close(0);
}

dlg.show();


function clearSelection(selectedLayersIdxs) {
    var dialogMode = DialogModes.NO;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Trsp'));
    ref2.putIndex(cTID('Lyr '), selectedLayersIdxs[selectedLayersIdxs.length - 1])
    desc1.putReference(cTID('T   '), ref2);
    executeAction(cTID('setd'), desc1, dialogMode);
}

function addToSelectionByIdx(idx) {
    var dialogMode = DialogModes.NO;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(sTID('channel'), sTID('channel'), sTID('transparencyEnum'));
    ref1.putIndex(cTID('Lyr '), idx);
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('T   '), ref2);
    executeAction(cTID('Add '), desc1, dialogMode);
}

function addToSelectionByIdxs(idxs) {
    for(var i = 0; i < idxs.length; i++){
        addToSelectionByIdx(idxs[i]);
    }
}

function getSelectedLayersIdx(){   
    var selectedLayers = new Array;   
    var ref = new ActionReference();   

    ref.putEnumerated(cTID("Dcmn"), cTID("Ordn"), cTID("Trgt") );   
    var desc = executeActionGet(ref);   

    if( desc.hasKey(sTID('targetLayers'))){   
        desc = desc.getList(sTID('targetLayers'));   

        var c = desc.count;
        var selectedLayers = new Array();   

        for(var i=0;i < c;i++){   
            try {   
                activeDocument.backgroundLayer;
                selectedLayers.push(desc.getReference(i).getIndex());
            } catch(e) {   
                selectedLayers.push(desc.getReference(i).getIndex() + 1);
            }
        }   
    } else {   
        var ref = new ActionReference();
        ref.putProperty(cTID("Prpr"), cTID( "ItmI" ));
        ref.putEnumerated(cTID("Lyr "), cTID("Ordn"), cTID("Trgt") );

        try {   
            activeDocument.backgroundLayer;   
            selectedLayers.push(executeActionGet(ref).getInteger(cTID("ItmI")) - 1);
        } catch(e) {   
            selectedLayers.push(executeActionGet(ref).getInteger(cTID("ItmI")));
        }
    }

    return selectedLayers;
}

function cleanUpIdxs(idxs){
    var returnIdxs = [];

    var allLayerSets = [];
    getLayerSets(app.activeDocument.layers, allLayerSets);

    for(var i = 0; i < idxs.length; i++){
        if(isItemIndexInArray(allLayerSets, idxs[i])){
            // add its children to array
            var foundLayerSet = findItemByIdxInArray(allLayerSets, idxs[i]);

            var childrenIdxs = [];

            getAllChildrenArtLayerIdxs(foundLayerSet.layers, childrenIdxs);

            returnIdxs = [].concat(returnIdxs, childrenIdxs);
        } else {
            returnIdxs.push(idxs[i]);
        }
    }
    

    return returnIdxs;
}

function getLayerSets(layersToSearch, layerSets){
    for(var i = 0; i < layersToSearch.length; i++){
        if(layersToSearch[i].typename === "LayerSet"){
            layerSets.push(layersToSearch[i]);
            getLayerSets(layersToSearch[i].layers, layerSets);
        }
    }

    return layerSets;
}

function getAllChildrenArtLayerIdxs(layersToSearch, childrenIdxs){
    for(var i = 0; i < layersToSearch.length; i++){
        if(layersToSearch[i].typename === "LayerSet"){
            getAllChildrenArtLayerIdxs(layersToSearch[i].layers, childrenIdxs);
        } else {
            childrenIdxs.push(layersToSearch[i].itemIndex);
        }
    }
}

function findItemByIdxInArray(array, idx){
    for(var i = 0; i < array.length; i++){
        if(array[i].itemIndex === idx) return array[i];
    }

    return undefined;
}

function isItemIndexInArray(array, idx){
    for(var i = 0; i < array.length; i++){
        if(array[i].itemIndex === idx) return true;
    }

    return false;
}