import {readFileSync} from "fs";


try {  
    // Intitializing the readFileLines with filename
    const data = readFileSync('data.txt', 'utf8');
    let ans = '';
    let currVal = 0;

    for (let index = 0; index < data.length; index++) {
        const element = data[index];

        if(element === '#') currVal++;
        else if(element === '@') currVal--;
        else if(element === '*') currVal*=currVal;
        else if(element === '&') ans+=currVal

        // console.log(ans);
    }

console.log(ans);
   
}catch(e) {
    // Printing error 
    console.log('Error:', e.stack);
}
