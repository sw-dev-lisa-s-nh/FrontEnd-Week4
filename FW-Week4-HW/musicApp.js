//
// Modeled on the Promineo Tech Week3 TeamApp Video code
//
class Instrument {
    constructor(instrument, section) {
        this.instrument = instrument;
        this.section = section;
    }
}

class Musician {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.instruments = [];
    }
    addMusician(musician) {
        this.musicians.push(musician);
    }

    deleteMusician(musician) {
        let index = this.musicians.indexOf(musician);
        this.musicians.splice(index, 1);
    }
}

let musicians = [];
let musicId = 0;

onClick('new-musician', () => {
    musicians.push(new Musician(musicId++, getValue('new-musician-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    let returnValue = document.getElementById(id).value;
    return returnValue;
}

function drawDOM() {
    // clear the view, and re"draw" the table
    let musicDiv = document.getElementById('musicians');
    while (musicDiv.firstChild) {
            musicDiv.removeChild(musicDiv.firstChild);
    }
    // for every musician in musicians 
    for (musician of musicians) {
        console.log(musician.name);
        console.log(musician.email);
        let table = createMusicTable(musician);
        let title = document.createElement('h2');
        title.innerHTML = musician.name;
        title.appendChild(createDeleteMusicianButton(musician));
        musicDiv.appendChild(title);
        musicDiv.appendChild(table);
        for (instrument of musician.instruments) {
            console.log(instrument.instrument);
            createInstrumentRow(musician, table, instrument);
        }       
    }
    document.getElementById('new-musician-name').value = '';
}

function createMusicTable(musician) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-primary table-striped');
    let row = table.insertRow(0);
    let instrumentColumn = document.createElement('th');
    let sectionColumn = document.createElement('th');
    instrumentColumn.innerHTML = 'Instrument';
    sectionColumn.innerHTML = 'Section';
    row.appendChild(instrumentColumn);
    row.appendChild(sectionColumn);

    let formRow = table.insertRow(1);
    let instrumentTh = document.createElement('th');
    let sectionTh = document.createElement('th');
    let createTh = document.createElement('th');

    let instrumentInput = document.createElement('input');
    instrumentInput.setAttribute('id', `instrument-input-${musician.id}`);
    instrumentInput.setAttribute('type', 'text');
    instrumentInput.setAttribute('class', 'form-control');

    let sectionInput = document.createElement('input');
    sectionInput.setAttribute('id', `section-input-${musician.id}`);
    sectionInput.setAttribute('type', 'text');
    sectionInput.setAttribute('class', 'form-control');

    let newInstrumentButton = createNewInstrumentButton(musician);
    instrumentTh.appendChild(instrumentInput);
    sectionTh.appendChild(sectionInput);
    createTh.appendChild(newInstrumentButton);
    formRow.appendChild(instrumentTh);
    formRow.appendChild(sectionTh);
    formRow.appendChild(createTh);
    return table;
}

function createDeleteMusicianButton(musician) {
    let btn = createButton('Delete Musician','btn btn-danger');
    btn.onclick = () => {
        let location = musicians.indexOf(musician);
        musicians.splice(location,1);
        drawDOM();
    };
    return btn;
}

function createInstrumentRow(musician, table, instrument) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = instrument.instrument;
    row.insertCell(1).innerHTML = instrument.section;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(musician, instrument));
}

function createButton(btnLabel, className) {
    let btn = document.createElement('button');
    btn.className = className;
    btn.innerHTML = btnLabel;
    return btn;
}

function createNewInstrumentButton(musician) {
    let btn = createButton('Create Instrument', 'btn btn-primary');
    btn.onclick = () => {
        musician.instruments.push(new Instrument(getValue(`instrument-input-${musician.id}`), getValue(`section-input-${musician.id}`)));
        drawDOM();
    };
    return btn;
}

function createDeleteRowButton(musician, instrument) {
    let btn = createButton('Delete Instrument', 'btn btn-danger');
    btn.onclick = () => {
        let location = musician.instruments.indexOf(instrument);
        musician.instruments.splice(location,1);
        drawDOM();
    };
    return btn;
}
