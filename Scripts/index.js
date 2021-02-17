import {Tool} from "./tool.js"


let itemList = [];
let completedItems = [];
let filter = 1;
let toggle = 1;
let production = false;
let testWafer = false;
let copper = false;
let nonCopper = false;
let purge = false;
let nonPurge = false;
let deseg = false;
let nonDeseg = false;
let expand = false;

function addNewItem() {
    let toolID = document.getElementById('item').value;
    toolID = toolID.toUpperCase();
    let building = document.getElementById('building').value;
    let bay = document.getElementById('bay').value;
    let contamination = document.querySelector('input[name = "contamination"]:checked').value;
    let prodType = document.querySelector('input[name = "production"]:checked').value;
    let purgeType = document.querySelector('input[name = "n2"]:checked').value;
    let segmentation = document.querySelector('input[name = "desegragate"]:checked').value;

    document.querySelector('input[name = "contamination"]:checked').checked = false;
    document.querySelector('input[name = "production"]:checked').checked = false;
    document.querySelector('input[name = "n2"]:checked').checked = false;
    document.querySelector('input[name = "desegragate"]:checked').checked = false;
    
    const tool = new Tool(toolID);
    tool.building = building;
    tool.bay = bay;
    if(contamination === "NC"){
        tool.cu = false;
        tool.nonCu = true;
    }
    else{
        tool.cu = true;
        tool.nonCu = false;
    }
    if(prodType === "TW"){
        tool.prod = false;
        tool.tw = true;
    }
    else{
        tool.prod = true;
        tool.tw = false;
    }
    if(segmentation === "Deseg"){
        tool.nonDeseg = false;
        tool.deseg = true;
    }
    else{
        tool.deseg = true;
        tool.nonDeseg = false;
    }
    if(purgeType === "NonPurge"){
        tool.purge = false;
        tool.noPurge = true;
    }
    else{
        tool.purge = true;
        tool.noPurge = false;
    }
    
    console.table(tool);
    if(document.getElementById('item').value === ""){
        
    } 
    else{
        itemList.push(tool);
        saveToBrowserMemorey();
        //updateItemCount();
       // document.getElementById('item').value = "";
       // document.getElementById('building').value = "";
      //  document.getElementById('bay').value = "";
       // displayList(itemList);
        showEdit();
    }  
}

function saveToBrowserMemorey() {
    const json = JSON.stringify(itemList);
    localStorage.setItem("tool", json);
}

function saveToFirebase() {
    firebase.database().ref("LSA410").child("id").val() //get value from firebase
    firebase.database().ref("LSA410").child("id").set() //save value to firebase
}

function getFromBrowserMemery() {
    const strng = localStorage.getItem("tool");
    itemList = JSON.parse(strng);
    const strng2 = localStorage.getItem("done");
    completedItems = JSON.parse(strng2);
    if(!itemList){
        itemList = [];
    }
    if(!completedItems){
        completedItems = [];
    }
    displayList();
    showAll();
    //updateItemCount();
}

function removeItem(e) {
    // Figure out how to do this
    itemList.forEach(function(item) {
            if(e == item.id){
            itemList.splice(itemList.indexOf(item), 1);
            //updateItemCount();
            saveToBrowserMemorey();
            showEdit();
        }      
    })
    completedItems.forEach(function(item) {
        if(e == item.id){
            completedItems.splice(completedItems.indexOf(item), 1);
        //updateItemCount();
        saveToBrowserMemorey();
        displayList();
    }      
})
}

function showAll() {
    filter = 3;
    production = false;
    testWafer = false;
    copper = false;
    nonCopper = false;
    purge = false;
    nonPurge = false;
    deseg = false;
    nonDeseg = false;
    expand = false;

    //Collaps show filter bar ready to expand
    document.getElementById("fltr").innerHTML = "Filters +";
    
    // Change bacground color of 'All' button to gray and others to white
    //document.getElementById('all').style.backgroundColor = "#000000";
    document.getElementById('Cu').style.backgroundColor = "#ffffff";
    document.getElementById('TW').style.backgroundColor = "#ffffff";
    document.getElementById('active').style.backgroundColor = "#ffffff";
    document.getElementById('NC').style.backgroundColor = "#ffffff";
    document.getElementById('NonPurge').style.backgroundColor = "#ffffff";
    document.getElementById('Purge').style.backgroundColor = "#ffffff";
    document.getElementById('Deseg').style.backgroundColor = "#d3d3ffffffd3";
    document.getElementById('nonDeseg').style.backgroundColor = "#ffffff";

    // Show filter buttons
    //document.getElementById('all').style.display = "inline";
    document.getElementById('fltr').style.display = "inline";
    document.getElementById('theList').style.display = "inline";
    document.getElementById('listTitle').style.display = "inline";
    document.getElementById('filterTable').style.display = "none";
    // Maybe delete these below
    document.getElementById('Cu').style.display = "inline";
    document.getElementById('active').style.display = "inline";
    document.getElementById('Purge').style.display = "inline";
    document.getElementById('NC').style.display = "inline";
    document.getElementById('TW').style.display = "inline";
    document.getElementById('NonPurge').style.display = "inline";
    document.getElementById('Deseg').style.display = "inline";
    document.getElementById('nonDeseg').style.display = "inline";
    
    // Read itemList and display all fo the items
    let html = `
    <table>
        <tr>
            <th>Tool ID</th>
            <th>Location</th>
            <th></th>
        </tr>
    </table>
    `;

    itemList.forEach(
        tool => {
            if(tool.show){
        html += 
        `<table><tr class="listRows">
            <td class="leftColumn"><button id="toolFltr" type="button" class="collapsible">${tool.content}</button></td>
            <td class="listRows">${tool.building} ${tool.bay}</td>
            <td class="rmvBtn">
                <button type="button" id="removeItem" value="${tool.id}">X</button>
            </td>
        </tr>
        </table>
            <div class="content">
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
            `;
            }
        }  
    );
    //html += '</table>'

    document.getElementById('listBody').innerHTML = html;
    console.log("showAll() called");
}

/*************************************************************************************/

function clearFilters(){
    document.getElementById('TW2').style.backgroundColor = "#ffffff";
    document.getElementById('active2').style.backgroundColor = "#ffffff";
    document.getElementById('Cu2').style.backgroundColor = "#ffffff";
    document.getElementById('NC2').style.backgroundColor = "#ffffff";
    document.getElementById('Purge2').style.backgroundColor = "#ffffff";
    document.getElementById('NonPurge2').style.backgroundColor = "#ffffff";
    document.getElementById('nonDeseg2').style.backgroundColor = "#ffffff";
    document.getElementById('Deseg2').style.backgroundColor = "#ffffff";
    production = false;
    testWafer = false;
    copper = false;
    nonCopper = false;
    purge = false;
    nonPurge = false;
    deseg = false;
    nonDeseg = false;

    itemList.forEach(tool => { tool.show = true;});
}

function showProd(){

    if(production == false) {
        production = true;
        testWafer = false;

        document.getElementById('active2').style.backgroundColor = "#000000";
        document.getElementById('TW2').style.backgroundColor = "#ffffff";

        itemList.forEach(
            tool => {
                tool.show = false;

                if(tool.prod && !copper && !nonCopper && !purge && !nonPurge){
                    tool.show = true;
                }
                else{
                    if(tool.prod && copper && tool.cu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.prod && copper && tool.cu && purge && tool.cu){
                        tool.show = true;
                    }
                    if(tool.prod && copper && tool.cu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.prod && nonCopper && tool.nonCu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.prod && nonCopper && tool.nonCu && purge && tool.cu){
                        tool.show = true;
                    }
                    if(tool.prod && nonCopper && tool.nonCu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.prod && purge && tool.purge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.prod && purge && tool.purge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(tool.prod && purge && tool.purge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(tool.prod && nonPurge && tool.noPurge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.prod && nonPurge && tool.noPurge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(tool.prod && nonPurge && tool.noPurge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }
                }
            }
        );
    }
    else {
        document.getElementById('active2').style.backgroundColor = "#ffffff";
        production = false;

        itemList.forEach(
            tool => {
                if(!copper && !nonCopper && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                    showAll();
                }
                else{
                    if(copper  && tool.cu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(copper  && tool.cu && purge && tool.purge){
                        tool.show = true;
                    }
                    if(copper  && tool.cu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(nonCopper  && tool.nonCu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(nonCopper  && tool.nonCu && purge && tool.purge){
                        tool.show = true;
                    }
                    if(nonCopper  && tool.nonCu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(purge && tool.purge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(purge && tool.purge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(purge && tool.purge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(nonPurge && tool.noPurge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(nonPurge && tool.noPurge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(nonPurge && tool.noPurge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }
                }
            }
        );
    } 

    displayTools();
}

function showTW(){
    if(testWafer == false) {
        testWafer = true;
        production = false;
        document.getElementById('TW2').style.backgroundColor = "#000000";
        document.getElementById('active2').style.backgroundColor = "#ffffff";

        itemList.forEach(
            tool => {
                tool.show = false;

                if(tool.tw && !copper && !nonCopper && !purge && !nonPurge){
                    tool.show = true;
                }
                else{
                    if(tool.tw && copper && tool.cu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.tw && copper && tool.cu && purge && tool.purge){
                        tool.show = true;
                    }
                    if(tool.tw && copper && tool.cu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.tw && nonCopper && tool.nonCu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.tw && nonCopper && tool.nonCu && purge && tool.purge){
                        tool.show = true;
                    }
                    if(tool.tw && nonCopper && tool.nonCu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.tw && purge && tool.purge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.tw && purge && tool.purge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(tool.tw && purge && tool.purge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(tool.tw && nonPurge && tool.noPurge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.tw && nonPurge && tool.noPurge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(tool.tw && nonPurge && tool.noPurge&& nonCopper && tool.nonCopper){
                        tool.show = true;
                    }
                }
            }
        );

    }
    else {
        document.getElementById('TW2').style.backgroundColor = "#ffffff";
        testWafer = false;

        itemList.forEach(
            tool => {
                if(!copper && !nonCopper && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                    showAll();
                }
                else{
                    if(copper  && tool.cu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(copper  && tool.cu && purge && tool.purge){
                        tool.show = true;
                    }
                    if(copper  && tool.cu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(nonCopper  && tool.nonCu && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(nonCopper  && tool.nonCu && purge && tool.purge){
                        tool.show = true;
                    }
                    if(nonCopper  && tool.nonCu && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(purge && tool.purge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(purge && tool.purge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(purge && tool.purge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(nonPurge && tool.noPurge && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(nonPurge && tool.noPurge && copper && tool.cu){
                        tool.show = true;
                    }
                    if(nonPurge && tool.noPurge && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }
                }
            }
        );
    }   

    displayTools();
}

function showCu(){
    if(copper == false) {
        copper = true;
        nonCopper = false;
        document.getElementById('Cu2').style.backgroundColor = "#000000";
        document.getElementById('NC2').style.backgroundColor = "#ffffff";

        itemList.forEach(
            tool => {
                tool.show = false;

                if(tool.cu && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                }
                else{
                    if(tool.cu && production  && tool.prod && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.cu && production  && tool.prod && purge && tool.purge){
                        tool.show = true;
                    }
                    if(tool.cu && production  && tool.prod && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.cu && testWafer  && tool.tw && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.cu && testWafer  && tool.tw && purge && tool.purge){
                        tool.show = true;
                    }
                    if(tool.cu && testWafer  && tool.tw && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.cu && purge && tool.purge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.cu && purge && tool.purge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.cu && purge && tool.purge && testWafer && tool.tw){
                        tool.show = true;
                    }
                    
                    if(tool.cu && nonPurge && tool.noPurge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.cu && nonPurge && tool.noPurge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.cu && nonPurge && tool.noPurge && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    }
    else {
        document.getElementById('Cu2').style.backgroundColor = "#ffffff";
        copper = false;

        itemList.forEach(
            tool => {
                if(!copper && !nonCopper && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                    showAll();
                }
                else{
                    if(production  && tool.prod && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(production  && tool.prod && purge && tool.purge){
                        tool.show = true;
                    }
                    if(production  && tool.prod && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(testWafer  && tool.tw && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && purge && tool.purge){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(purge && tool.purge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(purge && tool.purge && production  && tool.prod){
                        tool.show = true;   
                    }
                    if(purge && tool.purge && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(nonPurge && tool.noPurge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(purge && tool.purge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(purge && tool.purge && testWafer && tool.tw){
                        tool.show = true;
                    }

                }
            }
        );
    } 

    displayTools();
}

function showNC(){
    if(nonCopper == false) {
        nonCopper = true;
        copper = false;
        document.getElementById('Cu2').style.backgroundColor = "#ffffff";
        document.getElementById('NC2').style.backgroundColor = "#000000";

        itemList.forEach(
            tool => {
                tool.show = false;

                if(tool.nonCu && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                }
                else{
                    if(tool.nonCu && production  && tool.prod && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.nonCu && production  && tool.prod && purge && tool.purge){
                        tool.show = true;
                    }
                    if(tool.nonCu && production  && tool.prod && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.nonCu && testWafer  && tool.tw && !purge && !nonPurge){
                        tool.show = true;
                    }
                    if(tool.nonCu && testWafer  && tool.tw && purge && tool.purge){
                        tool.show = true;
                    }
                    if(tool.nonCu && testWafer  && tool.tw && nonPurge && tool.noPurge){
                        tool.show = true;
                    }

                    if(tool.nonCu && purge && tool.purge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.nonCu && purge && tool.purge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.nonCu && purge && tool.purge && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(tool.nonCu && nonPurge && tool.noPurge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.nonCu && nonPurge && tool.noPurge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.nonCu && nonPurge && tool.noPurge && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    }
    else {
        document.getElementById('NC2').style.backgroundColor = "#ffffff";
        nonCopper = false;

        itemList.forEach(
            tool => {
                if(!copper && !nonCopper && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                    showAll();
                }
                else{
                    if(production  && tool.prod && !purge && ! nonPurge){
                        tool.show = true;
                    }
                    if(production  && tool.prod && purge && tool.purge){
                        tool.show = true;
                    }
                    if(production  && tool.prod && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(testWafer  && tool.tw && !purge && ! nonPurge){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && purge && tool.purge){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(purge && tool.purge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(purge && tool.purge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(purge && tool.purge && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(nonPurge && tool.noPurge && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(nonPurge && tool.noPurge && production  && tool.prod){
                        tool.show = true;
                    }
                    if(nonPurge && tool.noPurge && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    }   

    displayTools();
}

function showPurge(){
    if(purge == false) {
        purge = true;
        nonPurge = false;
        document.getElementById('Purge2').style.backgroundColor = "#000000";
        document.getElementById('NonPurge2').style.backgroundColor = "#ffffff";

        itemList.forEach(
            tool => {
                tool.show = false;

                if(tool.purge && !production  && !testWafer  && !copper && !nonCopper){
                    tool.show = true;
                }
                else{
                    if(tool.purge && production  && tool.prod && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.purge && production  && tool.prod && copper && tool.copper){
                        tool.show = true;
                    }
                    if(tool.purge && production  && tool.prod && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }
                    
                    if(tool.purge && testWafer  && tool.tw && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.purge && testWafer  && tool.tw && copper && tool.copper){
                        tool.show = true;
                    }
                    if(tool.purge && testWafer  && tool.tw && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(tool.purge && copper && tool.cu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.purge && copper && tool.cu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.purge && copper && tool.cu && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(tool.purge && nonCopper && tool.nonCu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.purge && nonCopper && tool.nonCu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.purge && nonCopper && tool.nonCu && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    }
    else {
        document.getElementById('Purge2').style.backgroundColor = "#ffffff";
        purge = false;

        itemList.forEach(
            tool => {
                if(!copper && !nonCopper && !production  && !testWafer  && !copper && !nonCopper){
                    tool.show = true;
                    showAll();
                }
                else{
                    if(production  && tool.prod && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(production  && tool.prod && copper && tool.cu){
                        tool.show = true;
                    }
                    if(production  && tool.prod && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(testWafer  && tool.tw && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && copper && tool.cu){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(copper && tool.cu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(copper && tool.cu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(copper && tool.cu && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(nonCopper && tool.nonCu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(nonCopper && tool.nonCu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(nonCopper && tool.nonCu && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    } 

    displayTools();
}

function showNonPurge(){
    if(nonPurge == false) {
        nonPurge = true;
        purge = false;
        document.getElementById('NonPurge2').style.backgroundColor = "#000000";
        document.getElementById('Purge2').style.backgroundColor = "#ffffff";

        itemList.forEach(
            tool => {
                tool.show = false;

                if(tool.noPurge && !production  && !testWafer && !copper && !nonCopper){
                    tool.show = true;
                }
                else{
                    if(tool.noPurge && production && tool.prod && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.nonPurge && production && tool.prod && copper && tool.cu){
                        tool.show = true;
                    }
                    if(tool.noPurge && production && tool.prod && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(tool.noPurge && testWafer && tool.tw && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(tool.noPurge && testWafer && tool.tw && copper && tool.cu){
                        tool.show = true;
                    }
                    if(tool.noPurge && testWafer && tool.tw && nonCopper && tool.nonCopper){
                        tool.show = true;
                    }

                    if(tool.noPurge && copper && tool.cu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.noPurge && copper && tool.cu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.noPurge && copper && tool.cu && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(tool.noPurge && nonCopper && tool.nonCu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(tool.noPurge && nonCopper && tool.nonCu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(tool.noPurge && nonCopper && tool.nonCu && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    }
    else {
        document.getElementById('NonPurge2').style.backgroundColor = "#ffffff";
        nonPurge = false;

        itemList.forEach(
            tool => {
                if(!copper && !nonCopper && !production  && !testWafer  && !purge && !nonPurge){
                    tool.show = true;
                    showAll();
                }
                else{
                    if(production  && tool.prod && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(production  && tool.prod && copper && tool.cu){
                        tool.show = true;
                    }
                    if(production  && tool.prod && nonCopper && tool.nonCu){
                        tool.show = true;
                    }

                    if(testWafer  && tool.tw && !copper && !nonCopper){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && copper && tool.cu){
                        tool.show = true;
                    }
                    if(testWafer  && tool.tw && nonCopper && tool.nonCu){
                        tool.show = true;
                    }

                    if(copper && tool.cu && !production && !testWafer){
                        tool.show = true;
                    }
                    if(copper && tool.cu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(copper && tool.cu && testWafer && tool.tw){
                        tool.show = true;
                    }

                    if(nonCopper && tool.nonCu && !production  && !testWafer){
                        tool.show = true;
                    }
                    if(nonCopper && tool.nonCu && production  && tool.prod){
                        tool.show = true;
                    }
                    if(nonCopper && tool.nonCu && testWafer && tool.tw){
                        tool.show = true;
                    }
                }
            }
        );
    }   

    displayTools();
}

/*****************************************************************************************/

function displayTools() { 
    let toolLoc;
    let html = `
    <table>
        <tr>
            <th>Tool ID</th>
            <th>Location</th>
            <th></th>
        </tr>
    `;

    itemList.forEach(
        tool => {
            if(tool.show){
        html += 
        ` <tr class="listRows">
                <td class="leftColumn">${tool.content}</td>
                <td class="listRows">${tool.building} ${tool.bay}</td>
                <td class="rmvBtn">
                    <button type="button" id="removeItem" value="${tool.id}">X</button>
                </td>
            </tr>`;
            }
        }  
    );
    html += '</table>'

    document.getElementById('listBody').innerHTML = html;
    console.log("displayTools() called");
}

function showEdit() {
    filter = 3;
    // Reset filters so all tools are visible after edit
    clearFilters();

    // Hide fileter buttons
    //document.getElementById('all').style.display = "none"; 
    document.getElementById('filterTable').style.display = "none";
    document.getElementById('fltr').style.display = "none";
    //document.getElementById('theList').style.display = "none";
    //document.getElementById('listTitle').style.display = "none";
    // Maybe delete these below
    document.getElementById('active').style.display = "none";
    document.getElementById('Cu').style.display = "none";
    document.getElementById('Purge').style.display = "none";
    document.getElementById('TW').style.display = "none";
    document.getElementById('NC').style.display = "none";
    document.getElementById('NonPurge').style.display = "none";
    document.getElementById('Deseg').style.display = "none";
    document.getElementById('nonDeseg').style.display = "none";
    
    // Read itemList and display all fo the items
    let html = `
    <table>
        <tr>
            <th>Tool ID</th>
            <th>Location</th>
        </tr>
    `;
    
    itemList.forEach(
        tool => {
            if(tool.complete == false){
        html += 
            `
            <tr>
                <td class="leftColumn">${tool.content}</td>
                <td class="listRows">${tool.building} ${tool.bay}</td>
                <td>
                    <button type="button" id="removeItem" value="${tool.id}">X</button>
                </td>
            </tr>
            `;
            }
        }  
    );
    html += '</table>'

    document.getElementById('listBody').innerHTML = html;
    console.log("showEdit() called");
}

/* function showCompleted() {
     filter = 2;
     // Change bacground color of 'Completed' button to gray and others to white
     document.getElementById('all').style.backgroundColor = "#d3d3d3";
     document.getElementById('active').style.backgroundColor = "#d3d3d3";
    
     // Read itemList and display only those with completed = true
     let html = "";

     completedItems.forEach(
         tool => {
             if(tool.complete == true) {
             html += 
                 `
                 <tr>
                     <td class="leftColumn">
                         <label class="container2"> ${tool.content}
                             <input type="checkbox" checked="checked" value="${tool.id}">
                             <span class="checkmark" ></span>
                         </label>
                     </td>
                     <td>
                         <button type="button" id="removeItem" value="${tool.id}">X</button>
                     </td>
                 </tr>
                 `;
             }
         }
     );
     document.getElementById('listBody').innerHTML = html;
     console.log("showCompleted() called");
 }
*/

/*     //Not sure I want or need this
function updateItemCount() {
    let numItems = itemList.length;
    document.getElementById('toolCnt').innerHTML = numItems + " Tools"
}
*/

function displayList() {
    if(filter == 1) {showAll();}
    else if(filter == 2) {showCompleted();}
    else {showAll();}    
}

function showForm() {
    if(toggle === 1){
        toggle = 2;
        document.querySelector('#addForm').style.display = "inline";
        document.querySelector('#addBtn').innerHTML = "Done";  
        showEdit();      
    }
    else{
        toggle = 1;
        document.querySelector('#addForm').style.display = "none";
        document.querySelector('#addBtn').textContent = "Edit";
        showAll();
    }
    
}

document.querySelector('#addItem').addEventListener('click', addNewItem);
/* document.querySelector('#showAll').addEventListener('click', showAll);*/ //Not used yet
document.querySelector('#showProd').addEventListener('click', showProd);
document.querySelector('#showProd2').addEventListener('click', showProd);
document.querySelector('#showTW').addEventListener('click', showTW);
document.querySelector('#showTW2').addEventListener('click', showTW);
document.querySelector('#showNonPurge').addEventListener('click', showNonPurge);
document.querySelector('#showNonPurge2').addEventListener('click', showNonPurge);
document.querySelector('#showNC').addEventListener('click', showNC);
document.querySelector('#showNC2').addEventListener('click', showNC);
document.querySelector('#showPurge').addEventListener('click', showPurge);
document.querySelector('#showPurge2').addEventListener('click', showPurge);
document.querySelector('#showCu').addEventListener('click', showCu);
document.querySelector('#showCu2').addEventListener('click', showCu);
TODO: //add function & event listener for showDeseg & showNonDeseg

document.querySelector('#addBtn').addEventListener('click', showForm);
window.addEventListener('load', getFromBrowserMemery);

// Get the element, add a click listener...
document.getElementById('theList').addEventListener("click", function(e) {
	// e.target is the clicked element!
	// If it was a list item
	if(e.target && e.target.id == "removeItem") {
		// List item found!  Output the ID!
		removeItem(e.target.value);
    } 
})

// Collapsible div for filters
let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    console.log(content);
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
    if (expand == false){
        expand = true;
        document.getElementById("fltr").innerHTML = "Filters  --";
    }
    else {
        expand = false;
        document.getElementById("fltr").innerHTML = "Filters +";
    }
  });
}