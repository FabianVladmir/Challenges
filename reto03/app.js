import {readFileSync} from "fs";

try {  
    // Intitializing the readFileLines with filename
    const data = readFileSync('encryption_policies.txt' , 'utf8').split('\n');
    // console.log(data)
    const keysValid = {};
    const keysInvalid = {};
    
    let valid = 0;
    let invalid = 0;
    let global = 0;

    function processData(linea) {
        // Divide the line into parts using spaces and ":" as delimiters.
        const portion = linea.split(' ');
        const rangeValues = portion[0].split('-');
        // Get values 
        const minVal = parseInt(rangeValues[0]);
        const maxVal = parseInt(rangeValues[1]);
        const evalCharacter = portion[1][0];
        const mainString = portion[2];

        // console.log(evalCharacter)
        return { minVal, maxVal, evalCharacter, mainString };
    }

    function getFrecuencyElem(mainString, evalCaracter) {
        let count = 0;
        for (const char of mainString) {
            if (char === evalCaracter) {
                count++;
            }
        }
        return count;
    }


    // Process each data line
    for (const linea of data) {

        const { minVal, maxVal, evalCharacter, mainString } = processData(linea);      

        const frecuencyLetter = getFrecuencyElem(mainString, evalCharacter);
        // console.log(frecuencyLetter)

        // Create the object with the corresponding index
        const entry = { state: (frecuencyLetter >= minVal && frecuencyLetter <= maxVal) ? 'valid' : 'invalid', string: mainString };
        // console.log(entry);
        //Increment index and add entry to keys object
        if (entry.state === 'valid') {            
            keysValid[++valid] = entry;
        } else {
            keysInvalid[++invalid] = entry;            
        }
    }
    console.log(keysValid);
    console.log(keysInvalid);
}catch(e) {
    // Printing error 
    console.log('Error:', e.stack);
}


