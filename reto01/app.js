import { readFileSync } from 'fs';

try {  
    // Intitializing the readFileLines with filename
    const data = readFileSync('data.txt', 'utf8');

    // Separate the elements
    const words = data.split(" ");

    const frecuencyWords = [];
    // Returns the total frequency of each element in Word.
    words.forEach(currWord => {
        if(frecuencyWords[currWord])
            frecuencyWords[currWord]++;
        else
            frecuencyWords[currWord] = 1;
    });

    let ans = '';
    // Generate the submit format 
    // perro3gato3coche1sol1...
    Object.keys(frecuencyWords).forEach((animal)=>{
        ans+= animal + frecuencyWords[animal];
    });

    //console.log(ans);
       
}catch(e) {
    // Printing error 
    console.log('Error:', e.stack);
}