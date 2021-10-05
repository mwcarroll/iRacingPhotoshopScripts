<javascriptresource>
    <name>$$$/JavaScripts/iRacing Add to Spec Map/Menu=iRacing Add to Spec Map</name>
    <category>Scripts/iRacing</category>
</javascriptresource>
#target photoshop

function cTID(s) { return app.charIDToTypeID(s); };
function sTID(s) { return app.stringIDToTypeID(s); };

const dialogMode = DialogModes.NO;

var selectedLayersIdxs = getSelectedLayersIdx();

selectedLayersIdxs = cleanUpIdxs(selectedLayersIdxs).sort();

clearSelection();
addToSelectionByIdxs(selectedLayersIdxs);

function clearSelection() {
    var dialogMode = DialogModes.NO;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Chnl'), sTID("selection"));
    desc1.putReference(cTID('null'), ref1);
    var ref2 = new ActionReference();
    ref2.putEnumerated(cTID('Chnl'), cTID('Chnl'), cTID('Trsp'));
    desc1.putReference(cTID('T   '), ref2);
    executeAction(cTID('setd'), desc1, dialogMode);
}

function addToSelectionByIdx(idx) {
    var dialogMode = DialogModes.NO;
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putEnumerated(cTID('channel'), cTID('channel'), cTID('transparency'));
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

    var layersetIdxs = [];
    getLayersetIdxs(app.activeDocument.layers, layersetIdxs);

    for(var i = 0; i < idxs.length; i++){
        if(indexOf(layersetIdxs, idxs[i]) === -1) returnIdxs.push(idxs[i]);
        else {
            var childrenIdxs = [];

            var foundLayerSet = findLayerSetByIdx(app.activeDocument.layerSets, idxs[i]);
            getAllChildrenArtLayerIdxs(foundLayerSet, childrenIdxs);
            returnIdxs = [].concat(returnIdxs, childrenIdxs);
        }
    }

    return returnIdxs;
}

function getLayersetIdxs(layersToSearch, layersetIdxs){
    for(var i = 0; i < layersToSearch.length; i++){
        if(layersToSearch[i].typename === "LayerSet"){
            layersetIdxs.push(layersToSearch[i].itemIndex);
            getLayersetIdxs(layersToSearch[i].layers, layersetIdxs);
        }
    }

    return layersetIdxs;
}

function getAllChildrenArtLayerIdxs(parent, childrenIdxs){
    for(var i = 0; i < parent.layers.length; i++){
        if(parent.layers[i].typename === "LayerSet"){
            getAllChildrenArtLayerIdxs(parent.layers[i].layers, childrenIdxs);
        } else {
            childrenIdxs.push(parent.layers[i].itemIndex);
        }
    }


    return childrenIdxs;
}

function findLayerSetByIdx(layerSets, idx){
    for(var i = 0; i < layerSets.length; i++) {
        if(layerSets[i].itemIndex === idx) return layerSets[i];
        else {
            if(layerSets[i].typename === "LayerSet") findLayersetByIdx(layerSets[i].layerSets, idx);
        }
    }
}

function indexOf(array, target) {
    for (var i=0; i < array.length; i++) {
        if (array[i] === target) {
            return i;
        }
    }
    // item was not found
    return -1;
}