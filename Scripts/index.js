import {Tool} from "./tool.js"

let itemList = [];
let listItems =[];
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
let d1c = false;
let d1d = false;
let d1x = false;
let rp1 = false;
let expand = false;
let filters = 0;
let exist = true;

/****************************************************************/

function  saveToFirebase(a, b, c, d, e, f, g) {
    console.log("saveToFirebase() started")
    //Creates the ID LSA403 and assigns values to it
    var dbContent = firebase.database();    
    var toolContent = dbContent.ref().child('Tool').child(g).set({
        Building: a,
        Bay: b,
        Contamination: c,
        ProdOrTW: d,
        Deseg: e,
        Purge: f
    });
    console.log("saveToFirebase() finished")
  }

var databaseRef = firebase.database().ref("Tool");
databaseRef.on('child_added', function(snapshot) {
    var item = snapshot.val(); 

    // add row to the Table
    var elm1 = document.createElement('tr')
    document.querySelector('#newBody').appendChild(elm1);
    
    // add cell to the table row
    var elm2 = document.createElement('td');
    elm2.setAttribute("id", elm2.id);
    elm2.setAttribute("class", "leftTD");

    // define button attributes
    var btn = document.createElement('button', 'snapshot.key');
    btn.setAttribute("id", 'elm2-'+ snapshot.key);
    btn.setAttribute("class", "tButton");
    btn.setAttribute("type", "button");
    btn.onclick = function() { toolButtons(snapshot.key) };

    // add buttion to cell
    document.querySelector('#newBody').appendChild(btn)
    document.querySelector('#'+btn.id).textContent = snapshot.key;
    
    // add second cell with building and bay
    var elm3 = document.createElement('td');
    elm3.id = 'elm3-'+ snapshot.key;
    elm3.innerText = item.Building + " " + item.Bay;
    document.querySelector('#newBody').appendChild(elm3);

    // add the tool and details to the items list
    listItems.push({
        Tool: snapshot.key,
        Building: item.Building, 
        Bay: item.Bay,
        Contamination: item.Contamination,
        Deseg: item.Deseg,
        ProdOrTW: item.ProdOrTW,
        Purge: item.Purge
    });
});
console.log(listItems);

function creatTableHeader() {

    // add row to the Table
    var row1 = document.createElement('tr')
    row1.setAttribute("id", "row1");
    document.querySelector('#tblBody').appendChild(row1);

    // add cell to the table row
    var cell1 = document.createElement('td');
    cell1.setAttribute("id", "cell1");
    cell1.innerText = "Tool ID";
    document.querySelector('#tblBody').appendChild(cell1);
    
    // add cell to the table row
    var cell2 = document.createElement('td');
    cell2.setAttribute("id", "cell2");
    cell2.innerText = "Location";
    document.querySelector('#tblBody').appendChild(cell2);

    // format cells
    document.getElementById("cell1").style.fontWeight = "900";
    document.getElementById("cell2").style.fontWeight = "900";
    document.getElementById("cell1").style.paddingRight  = "140px";
    document.getElementById("cell1").style.borderBottom  = "solid #000000";
    document.getElementById("cell2").style.borderBottom  = "solid #000000";
}

function recreatTable(){
    // clear table
    document.querySelector("#newList").innerHTML = "";

    // recreate table
    var tbl = document.createElement('table');
    tbl.setAttribute("id", 'newList');
    tbl.setAttribute("class", "centered");
    document.querySelector('#listTable').appendChild(tbl);

    //recreate table body
    var tbod = document.createElement('tbody');
    tbod.setAttribute("id", 'newBody')
    document.querySelector('#newList').appendChild(tbod);
}

function editList() {
    listItems.length = 0;

    // clear table
    document.querySelector("#newList").innerHTML = "";
    recreatTable();

    // Add tools to table
    var databaseRef = firebase.database().ref("Tool");
    databaseRef.on('child_added', function(snapshot) {
    var item = snapshot.val(); 

    // add row to the Table
    var elm1 = document.createElement('tr')
    document.querySelector('#newBody').appendChild(elm1);
    
    // add cell to the table row
    var elm2 = document.createElement('td');
    elm2.setAttribute("id", elm2.id);

    // define button attributes
    var btn = document.createElement('button', 'snapshot.key');
    btn.setAttribute("id", 'elm2-'+ snapshot.key);
    btn.setAttribute("class", "tButton");
    btn.setAttribute("type", "button");
    btn.onclick = function() { toolButtons(snapshot.key) };

    // add buttion to cell
    document.querySelector('#newBody').appendChild(btn)
    document.querySelector('#'+btn.id).textContent = snapshot.key;
    
    // add second cell with building and bay
    var elm3 = document.createElement('td');
    elm3.id = 'elm3-'+ snapshot.key;
    elm3.innerText = item.Building + " " + item.Bay;
    elm3.style.fontSize = '18px';
    document.querySelector('#newBody').appendChild(elm3);

    // add third cell to delete the item from the list
    var elm4 = document.createElement('td');
    elm4.id = snapshot.key;
    elm4.value = snapshot.key;
    elm4.innerText = "X";
    elm4.setAttribute('style', 'color: #ff0000;');
    elm4.style.fontSize = '16px';
    elm4.style.fontWeight = '900';
    document.querySelector('#newBody').appendChild(elm4);

    // add the tool and details to the items list
    listItems.push({
        Tool: snapshot.key,
        Building: item.Building, 
        Bay: item.Bay,
        Contamination: item.Contamination,
        Deseg: item.Deseg,
        ProdOrTW: item.ProdOrTW,
        Purge: item.Purge
    });
});
console.log(listItems);
}

function updateList() {
    listItems.length = 0;
    var databaseRef = firebase.database().ref("Tool");
    databaseRef.on('child_added', function(snapshot) {
    var item = snapshot.val(); 

    // add row to the Table
    var elm1 = document.createElement('tr')
    document.querySelector('#newBody').appendChild(elm1);
    
    // add cell to the table row
    var elm2 = document.createElement('td');
    elm2.setAttribute("id", elm2.id);

    // define button attributes
    var btn = document.createElement('button', 'snapshot.key');
    btn.setAttribute("id", 'elm2-'+ snapshot.key);
    btn.setAttribute("class", "tButton");
    btn.setAttribute("type", "button");
    btn.onclick = function() { toolButtons(snapshot.key) };

    // add buttion to cell
    document.querySelector('#newBody').appendChild(btn)
    document.querySelector('#'+btn.id).textContent = snapshot.key;
    
    // add second cell with building and bay
    var elm3 = document.createElement('td');
    elm3.id = 'elm3-'+ snapshot.key;
    elm3.innerText = item.Building + " " + item.Bay;
    document.querySelector('#newBody').appendChild(elm3);

    // add the tool and details to the items list
    listItems.push({
        Tool: snapshot.key,
        Building: item.Building, 
        Bay: item.Bay,
        Contamination: item.Contamination,
        Deseg: item.Deseg,
        ProdOrTW: item.ProdOrTW,
        Purge: item.Purge
    });
});
}

function filterContent() {
    listItems.length = 0;

    // clear table
    document.querySelector("#newList").innerHTML = "";
    recreatTable();

        // Add tools to table
        var databaseRef = firebase.database().ref("Tool");
        databaseRef.on('child_added', function(snapshot) {
        var item = snapshot.val(); 

/**************** No Filter Selected  *************************/

if( !production &&
    !testWafer &&
    !copper &&
    !nonCopper &&
    !purge &&
    !nonPurge &&
    !deseg &&
    !nonDeseg &&
    !d1c &&
    !d1d &&
    !d1x &&
    !rp1){
        // add row to the Table
            var elm1 = document.createElement('tr')
            document.querySelector('#newBody').appendChild(elm1);

            // add cell to the table row
            var elm2 = document.createElement('td');
            elm2.setAttribute("id", elm2.id);

            // define button attributes
            var btn = document.createElement('button', 'snapshot.key');
            btn.setAttribute("id", 'elm2-'+ snapshot.key);
            btn.setAttribute("class", "tButton");
            btn.setAttribute("type", "button");
            btn.onclick = function() { toolButtons(snapshot.key) };

            // add buttion to cell
            document.querySelector('#newBody').appendChild(btn)
            document.querySelector('#'+btn.id).textContent = snapshot.key;

            // add second cell with building and bay
            var elm3 = document.createElement('td');
            elm3.id = 'elm3-'+ snapshot.key;
            elm3.innerText = item.Building + " " + item.Bay;
            elm3.style.fontSize = '18px';
            document.querySelector('#newBody').appendChild(elm3);
            
            //add the tool and details to the items list
            listItems.push({
                Tool: snapshot.key,
                Building: item.Building, 
                Bay: item.Bay,
                Contamination: item.Contamination,
                Deseg: item.deseg,
                ProdOrTW: item.ProdOrTW,
                Purge: item.Purge
            });
        }

/**************** Building Only Filter Selsected *************************/

/**************************** D1C *************************************/
if( production,
    !testWafer,
    !copper,
    !nonCopper,
    !purge,
    !nonPurge,
    !deseg,
    !nonDeseg,
    d1c,
    !d1d,
    !d1x,
    !rp1){

        if(item.Building == "D1C"){
        
        // add row to the Table
            var elm1 = document.createElement('tr')
            document.querySelector('#newBody').appendChild(elm1);

            // add cell to the table row
            var elm2 = document.createElement('td');
            elm2.setAttribute("id", elm2.id);

            // define button attributes
            var btn = document.createElement('button', 'snapshot.key');
            btn.setAttribute("id", 'elm2-'+ snapshot.key);
            btn.setAttribute("class", "tButton");
            btn.setAttribute("type", "button");
            btn.onclick = function() { toolButtons(snapshot.key) };

            // add buttion to cell
            document.querySelector('#newBody').appendChild(btn)
            document.querySelector('#'+btn.id).textContent = snapshot.key;

            // add second cell with building and bay
            var elm3 = document.createElement('td');
            elm3.id = 'elm3-'+ snapshot.key;
            elm3.innerText = item.Building + " " + item.Bay;
            elm3.style.fontSize = '18px';
            document.querySelector('#newBody').appendChild(elm3);
            
            // add the tool and details to the items list
            listItems.push({
                Tool: snapshot.key,
                Building: item.Building, 
                Bay: item.Bay,
                Contamination: item.Contamination,
                Deseg: item.Deseg,
                ProdOrTW: item.ProdOrTW,
                Purge: item.Purge
            });
        }}
        
/**************************** D1D *************************************/
if( production,
    !testWafer,
    !copper,
    !nonCopper,
    !purge,
    !nonPurge,
    !deseg,
    !nonDeseg,
    !d1c,
    d1d,
    !d1x,
    !rp1){

        if(item.Building == "D1D"){
        
        // add row to the Table
            var elm1 = document.createElement('tr')
            document.querySelector('#newBody').appendChild(elm1);

            // add cell to the table row
            var elm2 = document.createElement('td');
            elm2.setAttribute("id", elm2.id);

            // define button attributes
            var btn = document.createElement('button', 'snapshot.key');
            btn.setAttribute("id", 'elm2-'+ snapshot.key);
            btn.setAttribute("class", "tButton");
            btn.setAttribute("type", "button");
            btn.onclick = function() { toolButtons(snapshot.key) };

            // add buttion to cell
            document.querySelector('#newBody').appendChild(btn)
            document.querySelector('#'+btn.id).textContent = snapshot.key;

            // add second cell with building and bay
            var elm3 = document.createElement('td');
            elm3.id = 'elm3-'+ snapshot.key;
            elm3.innerText = item.Building + " " + item.Bay;
            elm3.style.fontSize = '18px';
            document.querySelector('#newBody').appendChild(elm3);
            
            // add the tool and details to the items list
            listItems.push({
                Tool: snapshot.key,
                Building: item.Building, 
                Bay: item.Bay,
                Contamination: item.Contamination,
                Deseg: item.Deseg,
                ProdOrTW: item.ProdOrTW,
                Purge: item.Purge
            });
        }}
/**************************** D1X *************************************/
if( production,
    !testWafer,
    !copper,
    !nonCopper,
    !purge,
    !nonPurge,
    !deseg,
    !nonDeseg,
    !d1c,
    !d1d,
    d1x,
    !rp1){

        if(item.Building == "D1X"){
        
        // add row to the Table
            var elm1 = document.createElement('tr')
            document.querySelector('#newBody').appendChild(elm1);

            // add cell to the table row
            var elm2 = document.createElement('td');
            elm2.setAttribute("id", elm2.id);

            // define button attributes
            var btn = document.createElement('button', 'snapshot.key');
            btn.setAttribute("id", 'elm2-'+ snapshot.key);
            btn.setAttribute("class", "tButton");
            btn.setAttribute("type", "button");
            btn.onclick = function() { toolButtons(snapshot.key) };

            // add buttion to cell
            document.querySelector('#newBody').appendChild(btn)
            document.querySelector('#'+btn.id).textContent = snapshot.key;

            // add second cell with building and bay
            var elm3 = document.createElement('td');
            elm3.id = 'elm3-'+ snapshot.key;
            elm3.innerText = item.Building + " " + item.Bay;
            elm3.style.fontSize = '18px';
            document.querySelector('#newBody').appendChild(elm3);
            
            // add the tool and details to the items list
            listItems.push({
                Tool: snapshot.key,
                Building: item.Building, 
                Bay: item.Bay,
                Contamination: item.Contamination,
                Deseg: item.Deseg,
                ProdOrTW: item.ProdOrTW,
                Purge: item.Purge
            });
        }}
/**************************** RP1 *************************************/

if( production,
    !testWafer,
    !copper,
    !nonCopper,
    !purge,
    !nonPurge,
    !deseg,
    !nonDeseg,
    !d1c,
    !d1d,
    !d1x,
    rp1){

        if(item.Building == "RP1"){
        
        // add row to the Table
            var elm1 = document.createElement('tr')
            document.querySelector('#newBody').appendChild(elm1);

            // add cell to the table row
            var elm2 = document.createElement('td');
            elm2.setAttribute("id", elm2.id);

            // define button attributes
            var btn = document.createElement('button', 'snapshot.key');
            btn.setAttribute("id", 'elm2-'+ snapshot.key);
            btn.setAttribute("class", "tButton");
            btn.setAttribute("type", "button");
            btn.onclick = function() { toolButtons(snapshot.key) };

            // add buttion to cell
            document.querySelector('#newBody').appendChild(btn)
            document.querySelector('#'+btn.id).textContent = snapshot.key;

            // add second cell with building and bay
            var elm3 = document.createElement('td');
            elm3.id = 'elm3-'+ snapshot.key;
            elm3.innerText = item.Building + " " + item.Bay;
            elm3.style.fontSize = '18px';
            document.querySelector('#newBody').appendChild(elm3);
            
            // add the tool and details to the items list
            listItems.push({
                Tool: snapshot.key,
                Building: item.Building, 
                Bay: item.Bay,
                Contamination: item.Contamination,
                Deseg: item.Deseg,
                ProdOrTW: item.ProdOrTW,
                Purge: item.Purge
            });
        }}
/****************** One Filter *********************/

/**** Production ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper ********/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper *****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Deseg ********/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonDeseg *****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/****************** Two Filters *********************/

/**** Production Copper ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonCopper ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonPurge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer Copper ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonCopper ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Purge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonPurge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonPurge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "	NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg== "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper Purge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonPurge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Purge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonPurge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}


/****************** Three Filters *********************/

/**** Production Copper Purge ****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Deseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonDeseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge ****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonDeseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/**** Production nonCopper Deseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Purge Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge nonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge ****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Deseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonDeseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge ****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "Purge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "NonPurge"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Deseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonDeseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Purge Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Purge nonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Purge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper nonPurge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper nonPurge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper Purge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper Purge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper nonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper nonPurge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/****************** Four Filters *********************/

/**** Production Copper Purge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Purge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Copper nonPurge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper Purge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonPurge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Purge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper nonPurge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Purge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper nonPurge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** One Filter plus Bulding *****************/

/************** D1C ********************/
/**** Production ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper ********/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper *****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Deseg ********/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonDeseg *****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1D ********************/
/**** Production ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper ********/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper *****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Deseg ********/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonDeseg *****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1X ********************/
/**** Production ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper ********/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper *****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NC" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Deseg ********/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonDeseg *****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** RP1 ********************/
/**** Production ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper ********/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper *****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NC" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge ****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Purge == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Deseg ********/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonDeseg *****/

if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/************** Two Filters plus Bulding *****************/

/************** D1C ********************/
/**** Production Copper ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonCopper ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonPurge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer Copper ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonCopper ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Purge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonPurge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonPurge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "	NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg== "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper Purge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonPurge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Purge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonPurge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1D ********************/
/**** Production Copper ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonCopper ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonPurge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer Copper ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonCopper ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Purge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonPurge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/**** Test Wafer NonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonPurge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "	NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg== "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper Purge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonPurge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Purge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonPurge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1X ********************/
/**** Production Copper ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonCopper ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonPurge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer Copper ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonCopper ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Purge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonPurge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonPurge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "	NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg== "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper Purge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonPurge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Purge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonPurge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** RP1 ********************/
/**** Production Copper ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonCopper ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonPurge ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production NonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Test Wafer Copper ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonCopper ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Purge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonPurge ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Test Wafer NonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonPurge ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Purge == "	NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper NonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Deseg== "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonCopper Purge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonPurge ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NonCopper" &&
       item.Purge == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper NonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonCopper Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NonCopper" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Purge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Purge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** NonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** NonPurge NonDeseg ****/
if( !production,
!testWafer,
!copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/************** Three Filters plus Bulding *****************/

/************** D1C ********************/
/**** Production Copper Purge ****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Deseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonDeseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge ****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonDeseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/**** Production nonCopper Deseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Purge Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge nonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge ****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Deseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonDeseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge ****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "Purge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "NonPurge" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Deseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonDeseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Purge Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Purge nonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Purge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper nonPurge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper nonPurge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper Purge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper Purge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper nonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper nonPurge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1D ********************/
/**** Production Copper Purge ****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Deseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonDeseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge ****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonDeseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/**** Production nonCopper Deseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Purge Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge nonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge ****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Deseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonDeseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge ****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "Purge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "NonPurge" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Deseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonDeseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Purge Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Purge nonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Purge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper nonPurge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper nonPurge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper Purge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper Purge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper nonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper nonPurge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1X ********************/
/**** Production Copper Purge ****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Deseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonDeseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge ****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonDeseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/**** Production nonCopper Deseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Purge Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge nonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge ****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Deseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonDeseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge ****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "Purge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "NonPurge" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Deseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonDeseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Purge Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Purge nonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Purge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper nonPurge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper nonPurge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper Purge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper Purge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper nonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper nonPurge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** RP1 ********************/
/**** Production Copper Purge ****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Deseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonDeseg ****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge ****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonDeseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
    
/**** Production nonCopper Deseg ****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Purge Deseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Purge nonDeseg ****/
if( production,
!testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge ****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Purge == "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Deseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonDeseg ****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "Cu" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge ****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "Purge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Purge== "NonPurge" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Deseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonDeseg ****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination== "NC" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Purge Deseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Purge nonDeseg ****/
if( !production,
testWafer,
!copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper Purge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper Purge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Copper nonPurge Deseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Copper nonPurge nonDeseg ****/
if( !production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "Cu" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper Purge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper Purge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** nonCopper nonPurge Deseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** nonCopper nonPurge nonDeseg ****/
if( !production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.Contamination == "NC" &&
       item.Purge== "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** Four Filters plus Bulding *****************/

/************** D1C ********************/
/**** Production Copper Purge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Purge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Copper nonPurge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper Purge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonPurge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Purge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper nonPurge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Purge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper nonPurge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
d1c,
!d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1C"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1D ********************/
/**** Production Copper Purge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Purge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Copper nonPurge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper Purge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonPurge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Purge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper nonPurge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Purge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper nonPurge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
d1d,
!d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1D"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** D1X ********************/
/**** Production Copper Purge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Purge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Copper nonPurge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper Purge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonPurge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Purge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper nonPurge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Purge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper nonPurge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
d1x,
!rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "D1X"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/************** RP1 ********************/
/**** Production Copper Purge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper Purge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production Copper nonPurge Deseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production Copper nonPurge nonDeseg****/
if( production,
!testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper Purge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper Purge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** Production nonCopper nonPurge Deseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** Production nonCopper nonPurge nonDeseg****/
if( production,
!testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "Prod" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper Purge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper Purge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer Copper nonPurge Deseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer Copper nonPurge nonDeseg****/
if( !production,
testWafer,
copper,
!nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "Cu" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper Purge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper Purge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
purge,
!nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "Purge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

/**** TestWafer nonCopper nonPurge Deseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
deseg,
!nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "Deseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}
/**** TestWafer nonCopper nonPurge nonDeseg****/
if( !production,
testWafer,
!copper,
nonCopper,
!purge,
nonPurge,
!deseg,
nonDeseg,
!d1c,
!d1d,
!d1x,
rp1){

    if(item.ProdOrTW == "TW" &&
       item.Contamination == "NC" &&
       item.Purge == "NonPurge" &&
       item.Deseg == "nonDeseg" &&
                   item.Building == "RP1"){
    
    // add row to the Table
        var elm1 = document.createElement('tr')
        document.querySelector('#newBody').appendChild(elm1);

        // add cell to the table row
        var elm2 = document.createElement('td');
        elm2.setAttribute("id", elm2.id);

        // define button attributes
        var btn = document.createElement('button', 'snapshot.key');
        btn.setAttribute("id", 'elm2-'+ snapshot.key);
        btn.setAttribute("class", "tButton");
        btn.setAttribute("type", "button");
        btn.onclick = function() { toolButtons(snapshot.key) };

        // add buttion to cell
        document.querySelector('#newBody').appendChild(btn)
        document.querySelector('#'+btn.id).textContent = snapshot.key;

        // add second cell with building and bay
        var elm3 = document.createElement('td');
        elm3.id = 'elm3-'+ snapshot.key;
        elm3.innerText = item.Building + " " + item.Bay;
        elm3.style.fontSize = '18px';
        document.querySelector('#newBody').appendChild(elm3);
        
        // add the tool and details to the items list
        listItems.push({
            Tool: snapshot.key,
            Building: item.Building, 
            Bay: item.Bay,
            Contamination: item.Contamination,
            Deseg: item.Deseg,
            ProdOrTW: item.ProdOrTW,
            Purge: item.Purge
        });
    }}

    });
}

/****************************************************************/

function addNewItem() {
    console.log("New item added");
    let toolID;
    let toolNumb;
    let building;
    let bay;
    let contamination;
    let prodType;
    let purgeType;
    let segmentation;
    
    if(document.getElementById('toolTyp').value === ""){
        //Add prompt that field is required
        document.querySelector('#tool1').innerHTML = "Tool Type *";
        document.querySelector('#tool1').style.color = 'red';
        document.querySelector('#numb').style.width = '32%';
    }
    else {
        toolID = document.getElementById("toolTyp").value;
    }
    if(document.getElementById('numb').value === ""){
        //Add prompt that field is required
        document.querySelector('#numb').placeholder  = "* Required field";
        document.getElementById("numb").style.border = "thick solid #ff0000";
    }
    else {
        toolNumb = document.getElementById("numb").value;
    }
    if (document.getElementById('toolTyp').value != "" 
        && document.getElementById('numb').value != ""){
            toolID = toolID + toolNumb;
            //See if tool aready exist
            exist = toolExist(toolID);
        }

    if(document.getElementById('toolBld').value === ""){
        //Add prompt that field is required
        document.querySelector('#bld1').innerHTML = "Building *";
        document.querySelector('#bld1').style.color = 'red';
        document.querySelector('#bay').style.width = '35%';
    }
    else {
        building = document.getElementById("toolBld").value;
    }
    if(document.getElementById('bay').value === ""){
        //Add prompt that field is required
        document.querySelector('#bay').placeholder  = "* Required field";
        document.getElementById("bay").style.border = "thick solid #ff0000";
    }
    else {
        bay = document.getElementById('bay').value;
    }

    if(!document.getElementById('1').checked  && !document.getElementById('2').checked ){
    //Add prompt that field is required
    document.querySelector('#req1').style.display = "inline";
    }
    else {
        contamination = document.querySelector('input[name = "contamination"]:checked').value;
        document.querySelector('#req1').style.display = "none";
    }
    if(!document.getElementById('3').checked  && !document.getElementById('4').checked ){
        //Add prompt that field is required
        document.querySelector('#req2').style.display = "inline";
        }
    else {
        prodType = document.querySelector('input[name = "production"]:checked').value;
        document.querySelector('#req2').style.display = "none";
    }
    if(!document.getElementById('5').checked  && !document.getElementById('6').checked ){
        //Add prompt that field is required
        document.querySelector('#req3').style.display = "inline";
        }
    else {
        purgeType = document.querySelector('input[name = "n2"]:checked').value;
        document.querySelector('#req3').style.display = "none";
    }
    if(!document.getElementById('7').checked  && !document.getElementById('8').checked ){
        //Add prompt that field is required
        document.querySelector('#req4').style.display = "inline";
        }
    else {
        segmentation = document.querySelector('input[name = "desegragate"]:checked').value;
        document.querySelector('#req4').style.display = "none";
    }
    
    if(!exist){
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
        
        //itemList.push(tool);
        saveToFirebase(building, bay, contamination, prodType,segmentation, purgeType, toolID);
        saveToBrowserMemorey();
        displayList(itemList);
        showEdit();

        //console.table(tool);
        clearAddItem();
    }
}

function clearAddItem() {
    document.getElementById("myForm").reset();
    document.querySelector('#tool1').innerHTML = "Tool Type:";
        document.querySelector('#tool1').style.color = 'black';
        document.querySelector('#numb').style.width = '40%';
        document.querySelector('#bld1').innerHTML = "Building:";
        document.querySelector('#bld1').style.color = 'black';
        document.querySelector('#bay').style.width = '42%';
        document.querySelector('#req1').style.display = "none";
        document.querySelector('#req2').style.display = "none";
        document.querySelector('#req3').style.display = "none";
        document.querySelector('#req4').style.display = "none";
        document.querySelector('#numb').placeholder = "Enter tool #";
        document.querySelector('#bay').placeholder = "Enter bay #";
        document.getElementById("numb").style.borderColor = "var(--primary-color)";
        document.getElementById("bay").style.borderColor = "var(--primary-color)";
}

function toolExist(toolID){
    let toolExist = false;

    itemList.forEach(
        tool => {
            console.log("tool content: " + tool.content);
            console.log("tool toolID: " + toolID);
            if(toolID == tool.content){
                console.log("Tool already exist");
                alert("Tool Already Exist")
                return true;
            }
            else{
                //Do Something
                console.log("Tool not found");
                return false;
            }
        }
    );
}

function saveToBrowserMemorey() {
    console.log("saveToBrowserMemery called");
    const json = JSON.stringify(itemList);
    localStorage.setItem("tool", json);
}

function getFromBrowserMemery() {
    //New code
    // var dbContent = firebase.database(); 
    // var test01 = dbContent.ref().child('Tool');
    // test01.on('value', function(datasnapshot){
    //     listItems = datasnapshot.val();
    //     showAll();
    // })

    // Original code below
    console.log("getFromBrowserMemery called");
    const strng = localStorage.getItem("tool");
    itemList = JSON.parse(strng);
    displayList();
    showAll();
}


function removeItem(e) {
    console.log("removeItem(e) called");
    console.log(e);

     var databaseRef = firebase.database().ref("Tool");
     var item = databaseRef.child(e);
     console.log(item.key);
     firebase.database().ref('Tool').child(item.key).remove();

     editList();
}

function toolButtons(e){
    console.log("toolButtons() called for " + e);

    //Hide list and buttons
    document.getElementById('theList').style.display = "none";
    document.getElementById('fltr').style.display = "none";
    document.getElementById('listTitle').style.display = "none";
    document.getElementById('listTitle').style.display = "none";
    document.getElementById('tst').style.display = "block";
    document.getElementById('filterTable').style.display = "none";
    document.getElementById('filterTable2').style.display = "block";
    document.getElementById('clrfltr').style.display = "none";
    document.getElementById('listTable').style.display = "none";
    document.getElementById('listTitle').style.display = "none";
    document.querySelector('#addBtn').innerHTML = "Back";
    document.getElementById('hdTable').style.display = "none";

    toggle = 2;

    listItems.length = 0;
    var databaseRef = firebase.database().ref("Tool");
    databaseRef.on('child_added', function(snapshot) {
    var item = snapshot.val(); 

    console.log('e: ' + e);
    console.log('snapshot: ' + snapshot);
    console.log('snapshot.key: ' + snapshot.key);
    console.log('item.Contamination: ' + item.Contamination);

    if(e == snapshot.key){ 
        document.querySelector('#tst').innerHTML = snapshot.key + " Tool Info";
        if(item.Contamination === 'Cu'){document.querySelector('#q1').innerHTML = "Cu";}
        else {document.querySelector('#q1').innerHTML = "NC";}
        if(item.Purge === 'Purge'){document.querySelector('#q2').innerHTML = "Yes";}
        else {document.querySelector('#q2').innerHTML = "No";}
        if(item.ProdOrTW === 'Prod'){document.querySelector('#q3').innerHTML = "Prod";}
        else{document.querySelector('#q3').innerHTML = "TW";}
        if(item.Deseg === 'Deseg'){document.querySelector('#q4').innerHTML = "Yes";}
        else {document.querySelector('#q4').innerHTML = "No";}
        document.querySelector('#q5').innerHTML = item.Building;
        document.querySelector('#q6').innerHTML = item.Bay;
        if(item.flip === true){document.querySelector('#q7').innerHTML = "Yes";}
        else{document.querySelector('#q7').innerHTML = "No";}
       
    }

    // add the tool and details to the items list
    listItems.push({
        Tool: snapshot.key,
        Building: item.Building, 
        Bay: item.Bay,
        Contamination: item.Contamination,
        Deseg: item.Deseg,
        ProdOrTW: item.ProdOrTW,
        Purge: item.Purge
    });
});

    //Display informaton for selected tool
//     itemList.forEach(function(item) {
//         if(e == item.content){ 
//             document.querySelector('#tst').innerHTML = item.content + " Tool Info";
//             if(item.cu === true){document.querySelector('#q1').innerHTML = "Cu";}
//             else {document.querySelector('#q1').innerHTML = "NC";}
//             if(item.purge === true){document.querySelector('#q2').innerHTML = "Yes";}
//             else {document.querySelector('#q2').innerHTML = "No";}
//             if(item.prod === true){document.querySelector('#q3').innerHTML = "Prod";}
//             else{document.querySelector('#q3').innerHTML = "TW";}
//             if(item.deseg === true){document.querySelector('#q4').innerHTML = "Yes";}
//             else {document.querySelector('#q4').innerHTML = "No";}
//             document.querySelector('#q5').innerHTML = item.building;
//             document.querySelector('#q6').innerHTML = item.bay;
//             if(item.flip === true){document.querySelector('#q7').innerHTML = "Yes";}
//             else{document.querySelector('#q7').innerHTML = "No";}
           
//         }
//    })
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

    //Hide Clear Filters button
    document.getElementById('clrfltr').style.display = "none";

    // Change bacground color of 'All' button to gray and others to white
    //document.getElementById('all').style.backgroundColor = "#000000";
    document.getElementById('Cu').style.backgroundColor = "#ffffff";
    document.getElementById('TW').style.backgroundColor = "#ffffff";
    document.getElementById('active').style.backgroundColor = "#ffffff";
    document.getElementById('NC').style.backgroundColor = "#ffffff";
    document.getElementById('NonPurge').style.backgroundColor = "#ffffff";
    document.getElementById('Purge').style.backgroundColor = "#ffffff";
    document.getElementById('Deseg').style.backgroundColor = "#ffffff";
    document.getElementById('nonDeseg').style.backgroundColor = "#ffffff";

    // Show filter buttons
    //document.getElementById('all').style.display = "inline";
    document.getElementById('fltr').style.display = "inline";
    document.getElementById('theList').style.display = "inline";
    document.getElementById('listTitle').style.display = "inline";
    document.getElementById('filterTable').style.display = "none"; 
    document.getElementById('tst').style.display = "none"; 
        
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
        </tr>`;

    itemList.forEach(
        tool => {
            if(tool.show){
        html += 
        `<tr class="listRows">
            <td class="leftColumn">
                <button class="tButton" type="button" id="toolBtn" onclick="toolButtons(${tool})"value="${tool.content}">${tool.content}</button>
            </td>
            <td class="listRows">${tool.building} ${tool.bay}</td>
            <td class="rmvBtn">
                <button type="button" id="removeItem" value="${tool.id}">X</button>
            </td>
        </tr>
        `;
            }
        }  
    );
    html += '</table>';

    document.getElementById('listBody').innerHTML = html;
    document.getElementById('listBody').style.display = "none";
    console.log("showAll() called");
}

/*************************************************************************************/

function clearFilters(){
    console.log("clearFilters() Called");

    //Reset filter button color to white
    document.getElementById('TW2').style.backgroundColor = "#ffffff";
    document.getElementById('active2').style.backgroundColor = "#ffffff";
    document.getElementById('Cu2').style.backgroundColor = "#ffffff";
    document.getElementById('NC2').style.backgroundColor = "#ffffff";
    document.getElementById('Purge2').style.backgroundColor = "#ffffff";
    document.getElementById('NonPurge2').style.backgroundColor = "#ffffff";
    document.getElementById('nonDeseg2').style.backgroundColor = "#ffffff";
    document.getElementById('Deseg2').style.backgroundColor = "#ffffff";

    document.getElementById('D1C').style.backgroundColor = "#ffffff";
    document.getElementById('D1D').style.backgroundColor = "#ffffff";
    document.getElementById('D1X').style.backgroundColor = "#ffffff";
    document.getElementById('RP1').style.backgroundColor = "#ffffff";

    //Hide Clear Filters button
    document.getElementById('clrfltr').style.display = "none";

    //Set filter variables to false
    production = false;
    testWafer = false;
    copper = false;
    nonCopper = false;
    purge = false;
    nonPurge = false;
    deseg = false;
    nonDeseg = false;
    filters = 0;

    //Display all tools
    itemList.forEach(tool => { tool.show = true;});
    showAll();
}

function showProd(){
    console.log("showProd() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";

    if(production == false) {
        production = true;
        testWafer = false;

        document.getElementById('active2').style.backgroundColor = "#000000";
        document.getElementById('TW2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('active2').style.backgroundColor = "#ffffff";
        production = false;
    }

    filterContent();
}

function showTW(){
    console.log("showTW() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(testWafer == false) {
        testWafer = true;
        production = false;

        document.getElementById('TW2').style.backgroundColor = "#000000";
        document.getElementById('active2').style.backgroundColor = "#ffffff";

    }
    else {
        document.getElementById('TW2').style.backgroundColor = "#ffffff";
        testWafer = false;

 
    }   

    filterContent();
}

function showCu(){
    console.log("showCu() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(copper == false) {
        copper = true;
        nonCopper = false;

        document.getElementById('Cu2').style.backgroundColor = "#000000";
        document.getElementById('NC2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('Cu2').style.backgroundColor = "#ffffff";
        copper = false;
    } 

    filterContent();
}

function showNC(){
    console.log("showNC() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(nonCopper == false) {
        nonCopper = true;
        copper = false;

        document.getElementById('Cu2').style.backgroundColor = "#ffffff";
        document.getElementById('NC2').style.backgroundColor = "#000000";
    }
    else {
        document.getElementById('NC2').style.backgroundColor = "#ffffff";
        nonCopper = false;
    }   

    filterContent();
}

function showPurge(){
    console.log("showPurge() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(purge == false) {
        purge = true;
        nonPurge = false;

        document.getElementById('Purge2').style.backgroundColor = "#000000";
        document.getElementById('NonPurge2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('Purge2').style.backgroundColor = "#ffffff";
        purge = false;
    } 

    filterContent();
}

function showNonPurge(){
    console.log("showNonPurge() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(nonPurge == false) {
        nonPurge = true;
        purge = false;

        document.getElementById('NonPurge2').style.backgroundColor = "#000000";
        document.getElementById('Purge2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('NonPurge2').style.backgroundColor = "#ffffff";
        nonPurge = false;
    }   

    filterContent();
}

function showDeseg(){
    console.log("showPurge() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(deseg == false) {
        deseg = true;
        nonDeseg = false;

        document.getElementById('Deseg2').style.backgroundColor = "#000000";
        document.getElementById('nonDeseg2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('Deseg2').style.backgroundColor = "#ffffff";
        deseg = false;
    } 

    filterContent();
}

function showNonDeseg(){
    console.log("showNonPurge() called");

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(nonDeseg == false) {
        nonDeseg = true;
        deseg = false;

        document.getElementById('nonDeseg2').style.backgroundColor = "#000000";
        document.getElementById('Deseg2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('nonDeseg2').style.backgroundColor = "#ffffff";
        nonDeseg = false;
    }   

    filterContent();
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
        `<tr class="listRows">
            <td class="leftColumn">
                <button class="tButton" type="button" id="toolBtn" onclick="toolButtons(${tool})"value="${tool.content}">${tool.content}</button>
            </td>
            <td class="listRows">${tool.building} ${tool.bay}</td>
            <td class="rmvBtn">
                <button type="button" id="removeItem" value="${tool.id}">X</button>
            </td>
        </tr>
        `;
            }
        }  
    );
    html += '</table>';

    document.getElementById('listBody').innerHTML = html;
    document.getElementById('listBody').style.display = "none";
    console.log("displayTools() called");
}

function showEdit() {
    console.log("showEdit() called");
    filter = 3;
    // Reset filters so all tools are visible after edit
    clearFilters();
    editList();

    // Hide fileter buttons
    document.getElementById('filterTable').style.display = "none";
    document.getElementById('fltr').style.display = "none";
    document.getElementById('listTitle').style.display = "none";
    
   // Read itemList and display all fo the items
   let html = `
   <tr>
       <th>Tool ID</th>
       <th>Location</th>
       <th></th>
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

document.getElementById('listBody').innerHTML = html;
document.getElementById('listBody').style.display = "none";
console.log("showEdit() called");
}

function displayList() {
    console.log("displyList() called");
    if(filter == 1) {showAll();}
    else if(filter == 2) {showCompleted();}
    else {showAll();}    
}

function showForm() {
    console.log("showForm() called");
    clearFilters();

    //Display form for adding tools & change 'Edit' button to 'Done'
    if(toggle === 1){
        toggle = 2;
        document.querySelector('#addForm').style.display = "inline";
        document.querySelector('#addBtn').innerHTML = "Done"; 
        clearAddItem(); 
        showEdit();
    }
    //Hide form for adding tools & change 'Done' button to 'Edit'
    //Also hide tool info table
    else{
        toggle = 1;
        document.querySelector('#addForm').style.display = "none";
        document.querySelector('#addBtn').textContent = "Edit";
        document.getElementById('listTable').style.display = "block";
        document.getElementById('listTitle').style.display = "block";
        document.getElementById('hdTable').style.display = "block";
        clearAddItem();
        document.getElementById('filterTable2').style.display = "none";
        recreatTable();
        updateList();
        showAll();
    }
    
}

/**************************************************************************/

document.querySelector('#addItem').addEventListener('click', addNewItem);
document.querySelector('#showProd').addEventListener('click', showProd);
document.querySelector('#showProd2').addEventListener('click', showProd);
document.querySelector('#showTW2').addEventListener('click', showTW);
document.querySelector('#showTW').addEventListener('click', showTW);
document.querySelector('#showPurge').addEventListener('click', showPurge);
document.querySelector('#showPurge2').addEventListener('click', showPurge);
document.querySelector('#showNonPurge').addEventListener('click', showNonPurge);
document.querySelector('#showNonPurge2').addEventListener('click', showNonPurge);
document.querySelector('#showDeseg').addEventListener('click', showDeseg);
document.querySelector('#showDeseg2').addEventListener('click', showDeseg);
document.querySelector('#shownonDeseg').addEventListener('click', showNonDeseg);
document.querySelector('#shownonDeseg2').addEventListener('click', showNonDeseg);
document.querySelector('#showNC').addEventListener('click', showNC);
document.querySelector('#showNC2').addEventListener('click', showNC);
document.querySelector('#showCu').addEventListener('click', showCu);
document.querySelector('#showCu2').addEventListener('click', showCu);
document.querySelector('#clrfltr').addEventListener('click', clearFilters);

document.querySelector('#addBtn').addEventListener('click', showForm);
window.addEventListener('load', getFromBrowserMemery);
window.addEventListener('load', creatTableHeader);

// Get the element, add a click listener...
document.getElementById('theList').addEventListener("click", function(e) {
	// e.target is the clicked element
	// If it was a list item
	if(e.target && e.target.id == "removeItem") {
		// List item found!  Output the ID!
		removeItem(e.target.value);
    } 
})

// Get the building element, add a click listener...
document.getElementById('D1C').addEventListener("click", function(e) {
        //Show Clear Filters button
        document.getElementById('clrfltr').style.display = "block";
        if(d1c == false) {
            d1c = true;
            d1d = false;
            d1x = false;
            rp1 = false;
    
            document.getElementById('D1C2').style.backgroundColor = "#000000";
            document.getElementById('D1D2').style.backgroundColor = "#ffffff";
            document.getElementById('D1X2').style.backgroundColor = "#ffffff";
            document.getElementById('RP12').style.backgroundColor = "#ffffff";
        }
        else {
            document.getElementById('D1C2').style.backgroundColor = "#ffffff";
            d1c = false;
        }   
    
        filterContent();
})

document.getElementById('D1C2').addEventListener("click", function(e) {
    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(d1c == false) {
        d1c = true;
        d1d = false;
        d1x = false;
        rp1 = false;

        document.getElementById('D1C2').style.backgroundColor = "#000000";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('D1C2').style.backgroundColor = "#ffffff";
        d1c = false;
    }   

    filterContent();
})

document.getElementById('D1D').addEventListener("click", function(e) {

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(d1d == false) {
        d1d = true;
        d1c = false;
        d1x = false;
        rp1 = false;

        document.getElementById('D1D2').style.backgroundColor = "#000000";
        document.getElementById('D1C2').style.backgroundColor = "#ffffff";
        document.getElementById('D1X2').style.backgroundColor = "#ffffff";
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        d1d = false;
    }   

    filterContent();
})
document.getElementById('D1D2').addEventListener("click", function(e) {

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(d1d == false) {
        d1d = true;
        d1c = false;
        d1x = false;
        rp1 = false;

        document.getElementById('D1D2').style.backgroundColor = "#000000";
        document.getElementById('D1C2').style.backgroundColor = "#ffffff";
        document.getElementById('D1X2').style.backgroundColor = "#ffffff";
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        d1d = false;
    }   

filterContent();
})

document.getElementById('D1X').addEventListener("click", function(e) {
    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(d1x == false) {
        d1x = true;
        d1d = false;
        d1c = false;
        rp1 = false;

        document.getElementById('D1X2').style.backgroundColor = "#000000";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        document.getElementById('D1C2').style.backgroundColor = "#ffffff";
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('D1X2').style.backgroundColor = "#ffffff";
        d1x = false;
    }   

    filterContent();
})

document.getElementById('D1X2').addEventListener("click", function(e) {
    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(d1x == false) {
        d1x = true;
        d1d = false;
        d1c = false;
        rp1 = false;

        document.getElementById('D1X2').style.backgroundColor = "#000000";
        document.getElementById('D1C2').style.backgroundColor = "#ffffff";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('D1X2').style.backgroundColor = "#ffffff";
        d1x = false;
    }   

    filterContent();
})

document.getElementById('RP1').addEventListener("click", function(e) {

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(rp1 == false) {
        rp1 = true;
        d1c = false;
        d1x = false;
        d1d = false;

        document.getElementById('RP12').style.backgroundColor = "#000000";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
        document.getElementById('D1X2').style.backgroundColor = "#ffffff";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
        rp1 = false;
    }   

    filterContent();
})

document.getElementById('RP12').addEventListener("click", function(e) {

    //Show Clear Filters button
    document.getElementById('clrfltr').style.display = "block";
    if(rp1 == false) {
        rp1 = true;
        d1c = false;
        d1x = false;
        d1d = false;

        document.getElementById('RP12').style.backgroundColor = "#000000";
        document.getElementById('D1C2').style.backgroundColor = "#ffffff";
        document.getElementById('D1X2').style.backgroundColor = "#ffffff";
        document.getElementById('D1D2').style.backgroundColor = "#ffffff";
    }
    else {
        document.getElementById('RP12').style.backgroundColor = "#ffffff";
        rp1 = false;
    }   

    filterContent();
})

/**** More event listeners ****/
document.getElementById('newList').addEventListener("click", function(e) {
    console.log("Event listener for newList: 'X' clicked");
		removeItem(e.target.id);
})

document.getElementById('numb').addEventListener("click", function(e) {
	document.getElementById('numb').value = ""; 
})

document.getElementById('bay').addEventListener("click", function(e) {
	document.getElementById('bay').value = ""; 
})

document.getElementById('listBody').addEventListener("click", function(e) {
    console.log("Event listener for listBody: toolButton clicked");
	// e.target is the clicked element!
	// If it was a list item
    if(e.target && e.target.id == "toolBtn") {
        // List item found call toolButton() and pass tool name
        toolButtons(e.target.value);
        document.querySelector('#addBtn').innerHTML = "Back";
    }
})

// Collapsible div for filters
let coll = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
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