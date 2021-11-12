const root = document.getElementById('root');

fetch('./students.json')
    .then(response => response.json())
    // .then(response => localStorage.setItem('students', JSON.stringify(response)))
    // .then(response => displayStudent(localStorage.getItem('students')))
    .then(response => displayStudent(response))
    .catch(err => alert(err))
// console.log(localStorage.students)
function displayStudent(students) {
    console.log(students)
    students.forEach(student => {
        let parents = [];
        Object.keys(student).forEach(key => {
            if (key === 'parents'){
                parents = (displayParent(student[key]))
            }
        })
        this.root.innerHTML += renderSingleStudent(student, parents)
    })   
}

function renderSingleStudent(student, parents) {
    if(localStorage.getItem(student.name)!=null){
        student.nameEdit = localStorage[student.name]
        return `<details class="student"><summary id="${student.name}" contenteditable="true" onload="checkEdits('${student.name}')"  onclick="saveEdits('${student.name}')">${student.nameEdit}</summary>${parents}</details>`
    } else{
        return `<details class="student"><summary id="${student.name}" contenteditable="true" onload="checkEdits('${student.name}')"  onclick="saveEdits('${student.name}')">${student.name}</summary>${parents}</details>`
    }
}


function displayParent(parents){
    let results = [];
    if (!parents){
        return [];
    } else if (parents.constructor.name === "Array") {
        parents.forEach(parent => {
            results += (renderSingleParent(parent))
        })
    } else {
        results += (renderSingleParent(parents))
    }
    return results;
}

function renderSingleParent(parent) {
    if(localStorage.getItem(parent.name)!=null){
        parent.nameEdit = localStorage[parent.name]
        return `<details class="parent"><summary id="${parent.name}" contenteditable="true" onload="checkEdits('${parent.name}')"  onclick="saveEdits('${parent.name}')">${parent.nameEdit}</summary></details>`
    } else{
        return `<details class="parent"><summary id="${parent.name}" contenteditable="true" onload="checkEdits('${parent.name}')"  onclick="saveEdits('${parent.name}')">${parent.name}</summary></details>`
    }
}


function saveEdits(person) {
    document.getElementById(person).addEventListener("input", function() {
        let updateName = document.getElementById(person).innerText
        localStorage.setItem(person, updateName )
    }, false);
}


function checkEdits(person) {
    // console.log('checkEdit', person)
	if(localStorage.getItem(person.name)!=null){
			document.getElementById(person).innerHTML = localStorage[person];
	}
}