
import {readFileSync} from "fs";

try {  
    // Initializing the readFileLines with filename
    const data = readFileSync('files_quarantine.txt' , 'utf8').split('\n');
   
    let valid = 0;
    let invalid = 0;

    const namesValid = {};
    const namesInvalid = {};

    function processData(dataLine){    
        const portion = dataLine.split('-');   
        
        const strInput = portion[0];
        const strOutput = portion[1];

        return {strInput, strOutput};
    }
    // return the frequency of the string
    function countFrequency(arr){    
        const freqMap = new Map();
        for (const element of arr) {  
            // console.log(element);
            if (freqMap.has(element)) {
                freqMap.set(element, freqMap.get(element) + 1);
            } else {
                freqMap.set(element, 1);
            }      
        };
        return freqMap;
    }

    // return only elements that appears at least once
    function getUniqueValues(myMap){
        let uniqueKeys = "";
        for(const [key, value] of myMap.entries()){
            if(value === 1){
                // console.log(value);           
                uniqueKeys+=key;
            }
                
        }
        return uniqueKeys;
    }

    // Process each data line
    for(const line of data){    
        const {strInput, strOutput} = processData(line);
        const frequencyInput = countFrequency(strInput);
        const inputExpect = getUniqueValues(frequencyInput);

        const entry = {state: (inputExpect === strOutput) ? 'valid' : 'invalid', string: strOutput };
        console.log(entry);
        console.log(inputExpect);

        if (entry.state === 'valid') {            
            namesValid[++valid] = entry;
        } else {
            namesInvalid[++invalid] = entry;            
        }
    }
    console.log(namesValid);
    console.log(namesInvalid);
    
}catch(e) {
    // Printing error 
    console.log('Error:', e.stack);
}


