
function saveData() {
    var firebaseRef = firebase.database().ref();
    firebaseRef.child("Text").set("testing data upload");
}

document.querySelector('#addBtn').addEventListener('click', saveData);