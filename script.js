
document.addEventListener('DOMContentLoaded', function () {
    const mappings = {
        capShape: { b: 'bell', c: 'conical', x: 'convex', f: 'flat', k: 'knobbed', s: 'sunken' },
        capSurface: { f: 'fibrous', g: 'grooves', y: 'scaly', s: 'smooth' },
        capColor: { n: 'brown', b: 'buff', c: 'cinnamon', g: 'gray', r: 'green', p: 'pink', u: 'purple', e: 'red', w: 'white', y: 'yellow' },
        bruises: { t: 'bruises', f: 'no' },
        odor: { a: 'almond', l: 'anise', c: 'creosote', y: 'fishy', f: 'foul', m: 'musty', n: 'none', p: 'pungent', s: 'spicy' },
        gillAttachment: { a: 'attached', d: 'descending', f: 'free', n: 'notched' },
        gillSpacing: { c: 'close', w: 'crowded', d: 'distant' },
        gillSize: { b: 'broad', n: 'narrow' },
        gillColor: { k: 'black', n: 'brown', b: 'buff', h: 'chocolate', g: 'gray', r: 'green', o: 'orange', p: 'pink', u: 'purple', e: 'red', w: 'white', y: 'yellow' },
        stalkShape: { e: 'enlarging', t: 'tapering' },
        stalkRoot: { b: 'bulbous', c: 'club', u: 'cup', e: 'equal', z: 'rhizomorphs', r: 'rooted', '?': 'missing' },
        stalkSurfaceAboveRing: { f: 'fibrous', y: 'scaly', k: 'silky', s: 'smooth' },
        stalkSurfaceBelowRing: { f: 'fibrous', y: 'scaly', k: 'silky', s: 'smooth' },
        stalkColorAboveRing: { n: 'brown', b: 'buff', c: 'cinnamon', g: 'gray', o: 'orange', p: 'pink', e: 'red', w: 'white', y: 'yellow' },
        stalkColorBelowRing: { n: 'brown', b: 'buff', c: 'cinnamon', g: 'gray', o: 'orange', p: 'pink', e: 'red', w: 'white', y: 'yellow' },
        veilType: { p: 'partial', u: 'universal' },
        veilColor: { n: 'brown', o: 'orange', w: 'white', y: 'yellow' },
        ringNumber: { n: 'none', o: 'one', t: 'two' },
        ringType: { c: 'cobwebby', e: 'evanescent', f: 'flaring', l: 'large', n: 'none', p: 'pendant', s: 'sheathing', z: 'zone' },
        sporePrintColor: { k: 'black', n: 'brown', b: 'buff', h: 'chocolate', r: 'green', o: 'orange', u: 'purple', w: 'white', y: 'yellow' },
        population: { a: 'abundant', c: 'clustered', n: 'numerous', s: 'scattered', v: 'several', y: 'solitary' },
        habitat: { g: 'grasses', l: 'leaves', m: 'meadows', p: 'paths', u: 'urban', w: 'waste', d: 'woods' }
    };

    function populateDropdown(id, options) {
        const select = document.getElementById(id);
        for (const [value, text] of Object.entries(options)) {
            const option = document.createElement('option');
            option.value = value;
            option.textContent = text;
            select.appendChild(option);
        }
    }

    for (const [id, options] of Object.entries(mappings)) {
        populateDropdown(id, options);
    }

    function loadCSV(file, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', file, true);
        xhr.onload = function () {
            if (xhr.status === 200) {
                console.log(`${file} data loaded successfully`);
                callback(xhr.responseText);
            } else {
                console.error(`Error loading ${file}`);
            }
        };
        xhr.onerror = function () {
            console.error('Request error');
        };
        xhr.send();
    }

    function parseCSV(data) {
        const lines = data.split('\n');
        const result = [];
        const headers = lines[0].split(',');

        for (let i = 1; i < lines.length; i++) {
            const obj = {};
            const currentline = lines[i].split(',');

            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result;
    }

    let mushrooms = [];

    loadCSV('mushroom1.csv', function (data) {
        mushrooms = parseCSV(data);
        console.log('Parsed mushroom1 data:', mushrooms);
    });

    loadCSV('mushroom2.csv', function (data) {
        const mushrooms2 = parseCSV(data);
        mushrooms = mushrooms.concat(mushrooms2);
        console.log('Parsed mushroom2 data:', mushrooms);
    });

    window.predict = function () {
        const form = document.getElementById('mushroomForm');
        const formData = new FormData(form);
        const inputs = {};

        for (const [key, value] of formData.entries()) {
            inputs[key] = value;
        }

        console.log('Form inputs:', inputs);

        const match = mushrooms.find(mushroom => {
            return Object.entries(inputs).every(([key, value]) => mushroom[key] === value);
        });

        const resultDiv = document.getElementById('result');
        if (match) {
            resultDiv.textContent = match['class'] === 'e' ? 'Edible' : 'Poisonous';
        } else {
            resultDiv.textContent = 'No match found';
        }
    };
});
