// Code credits: this code was written by Dr. Pavol Federl for the SENG 513 course at the UofC
// https://codepen.io/pfederl/pen/JEMKwB


function getStats(txt) {
    //nChars
    let nChars = txt.length;

    //nWords
    function isLetter(x){
	    return x.toUpperCase() != x.toLowerCase();
    }

    //getWords
    let arr = txt.split(/\s/); //split by whitespace and place in array
    let wordsArr = [];
    let str = "";
    for (let word of arr) { //iterate through each word in array
        let cleantxt = word.replaceAll(/\W/g, ''); //take out any special characters
        str = "";
        if(/\d/.test(cleantxt)){ //if word contains a digit, go through word
            for (let i = 0; i < cleantxt.length-1; i++){
                let nextChar = cleantxt[i+1];
                
                if (isLetter(cleantxt[i])){
                    str += cleantxt[i];
                    if (!isLetter(nextChar))
                    {
                        wordsArr.push(str);
                        str = "";
                    }
                }
                
                else if (!isLetter(cleantxt[i])){
                    str += cleantxt[i];
      	            if (isLetter(nextChar))
                    {
                        wordsArr.push(str);
                        str = "";
                    }
      		    }
            }
            
            str += cleantxt[cleantxt.length-1]
            wordsArr.push(str);
        }
        else if (/\S/.test(cleantxt))
        {
            wordsArr.push(cleantxt);
        }
    }

    let nWords = 0;
    nWords = wordsArr.length;

    //nLines
    let lineArr = txt.split(/\r|\n/);
    let nLines = lineArr.length;

    //nNonEmptyLines
    //split by newline
    //test for any non-whitespace character in each line
    let nNonEmptyLines = 0;
    for (let line of lineArr){
        if (/\S/.test(line)){
            nNonEmptyLines++;
        }
    }

    //avgWordLength
    arr = txt.split(/\s/); //split by whitespace and place in array
    let avgWordLength = 0.0;
    
    for (let word of wordsArr){
        avgWordLength += word.length;
    }
    avgWordLength /= nWords;

    //maxLineLength
    let maxLineLength = 0;
    for (let line of lineArr){
        if (line.length > maxLineLength){
            maxLineLength = line.length;
        }
    }


    //tenLongestWords
    let sortedWords = wordsArr;
    //https://stackoverflow.com/questions/44554122/how-to-sort-by-length-and-then-alphabetically
    sortedWords.sort(function(a, b) {
        return b.length - a.length || a.localeCompare(b);
      });

    //remove duplicates
    //https://www.geeksforgeeks.org/how-to-remove-duplicate-elements-from-javascript-array/
    function removeDuplicates(arr) {
        return arr.filter((item, 
            index) => arr.indexOf(item) === index);
    }

    sortedWords = removeDuplicates(sortedWords);

    let tenLongestWords = [];
    let i = 0;
    while (i < 10 && i < sortedWords.length){
        tenLongestWords.push(sortedWords[i]);
        i++;
    }
    
    //tenMostFrequentWords

    return {
        nChars: nChars,                                                     
        nWords: nWords,
        nLines: nLines,
        nNonEmptyLines: nNonEmptyLines,
        averageWordLength: avgWordLength,
        maxLineLength: maxLineLength,
        tenLongestWords: tenLongestWords,
        tenMostFrequentWords: ["Hello(1)", "World(1)", "77(1)"]
    };

}
