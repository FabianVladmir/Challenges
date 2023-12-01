import {readFileSync} from "fs";

try {
    // Initializing the readFileLines with filename
    const data = readFileSync('database_attacked.txt' , 'utf8').split('\n');

    let valid = 0;
    let invalid = 0;

    const userValid = {};
    const userInvalid = {};

    function processData(dataLine){    
        const portion = dataLine.split(',');   
        
        const id = portion[0];
        const username = portion[1];
        const email = portion[2];
        const age = portion[3];
        const location = portion[4];

        const user = {
            id,
            username,
            email,
            age: age || null, 
            location: location || null,
        };
        
        return user;
        // return {id, username, email, age, location};
    }

    function isAlphanumeric(str){
        let regex = new RegExp(/^[a-zA-Z0-9]+$/);
        if(str === '')
            return false;

        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    function isValidEmail(str){
        let regex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
        if(str === '')
            return false;

        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    function isAlphabetic(str){
        let regex = new RegExp(/^[a-zA-Z]+$/);
        if(str === '')
            return false;

        if(regex.test(str)){
            return true;
        }
        else{
            return false;
        }
    }

    function isValidAge(str){    
        let num = parseInt(str);    
        if(!isNaN(Number(num)) || str === '')
            return true;
        return false;
    }

    function isValidLocation(str){        
        if(str === '')
            return true;
        const trimmed = str?.replace(/\s+/g, '');
        if(isAlphabetic(trimmed))
            return true;
        return false;
    }

    function checkUser(user){
        if(isAlphanumeric(user.id) && isAlphanumeric(user.username) && isValidEmail(user.email) && isValidAge(user.age) && isValidLocation(user.location))
            return true;
        return false;        
    }

 
    for(const line of data){
        const user = processData(line);
        const entry = {state: (checkUser(user)) ? 'valid' : 'invalid', username: user.username }; 
        if (entry.state === 'valid') {            
            userValid[++valid] = entry;
        } else {
            userInvalid[++invalid] = entry;            
        }
    }

    // console.log(userValid);
    // console.log(userInvalid);

    //extract first character from invalid users
    let firstChars = "";

    for (let key in userInvalid) {
        const item = userInvalid[key];

        firstChars+=(item.username.charAt(0));
    }
    console.log(firstChars)
    //youh4v3beenpwnd

} catch (error) {
    console.log('Error:', error.stack);
}




