'use strict';

import { WriteStream, createWriteStream } from "fs";
process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString: string = '';
let inputLines: string[] = [];
let currentLine: number = 0;

process.stdin.on('data', function(inputStdin: string): void {
    inputString += inputStdin;
});

process.stdin.on('end', function(): void {
    inputLines = inputString.split('\n');
    inputString = '';

    main();
});

function readLine(): string {
    return inputLines[currentLine++];
}

/*
Sherlock considers a string to be valid if all characters of the string appear
the same number of times. It is also valid if he can remove just 1 character at
1 index in the string, and the remaining characters will occur the same number
of times. Given a string s, determine if it is valid. If so, return YES,
otherwise return NO.

Examples
s="abc"
This is valid because the frequency of each character are:
{a=1,b=1,c=1}

s="abcc"
This is valid because we can remove one "c"

s="abccc"
This is not valid because we can only remove one "c" and the frequency is still
greater than one.

Function Description
Complete the isValid function in the editor below.
isValid has the following parameter(s):
    string s: a string

Returns
    string: either YES or NO

Input Format
A single string s.
*/

/*
***Chat-GPT***
This is a TypeScript code that defines a function isValid which takes a string s
as input and returns either "YES" or "NO" depending on whether the input string
is valid or not. The validity of the string is determined based on two
conditions:

    * If all the characters in the string have the same frequency, then the 
    string is valid. 
    * If we can remove only one character from the string and the remaining
    characters will occur the same number of times, then the string is valid.

The code first defines two helper functions, countFrequency and
countFrequencyValues. countFrequency takes a string as input and returns a
dictionary (Record) where the keys are the characters in the input string and
the values are their frequency in the string. countFrequencyValues takes the
frequency dictionary as input and returns another dictionary where the keys are
the frequencies of the characters and the values are the number of characters
that have that frequency.

The isValid function uses these two helper functions to determine the validity
of the input string. It first calculates the frequency dictionary of the input
string using countFrequency, and then calculates the frequency value dictionary
using countFrequencyValues. It then checks the following conditions:

    * If there is only one key in the frequency value dictionary, then the 
    string is valid.
    * If there are two keys in the frequency value dictionary, then the string
    is valid if either of the following conditions are met: 
        * One of the keys has a frequency of 1.
        * The difference between the two keys is 1 and one of the keys has
        a frequency of 1. 
    * If there are more than two keys in the frequency value
    dictionary, then the string is not valid.

The main function reads the input string from standard input, calls the isValid
function to determine the validity of the input string, and then writes the
result to standard output. The output is written to a file whose path is
specified in the OUTPUT_PATH environment variable.
*/

/*
 * Complete the 'isValid' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function countFrequency(s:string): Record<string,number>{
    const freq:Record<string,number>={};
    for(let i=0;i<s.length;i++){
        if(s[i] in freq){
            freq[s[i]]+=1;
        } else {
            freq[s[i]]=1;
        }
    }
    return freq;
}

function countFrequencyValues(freq:Record<string,number>): Record<number,number> {
    const freq_values:Record<number,number>={};
    for(const key in freq){
        if(freq[key]in freq_values){
            freq_values[freq[key]]+=1;
        } else {
            freq_values[freq[key]]=1;
        }
    }
    return freq_values;
}

function isValid(s: string): string {
    // Write your code here
    const success:string="YES";
    const failure:string="NO";
    const freq:Record<string,number>=countFrequency(s);
    const freq_values:Record<number,number>=countFrequencyValues(freq);
    /*
    Possibilities for freq_values
    1 key -> Valid
    2 keys
        -> 1 key less than the others -> Not valid
        -> 1 key greater than the others
            ->greater by 1 -> Valid
            ->greater by more than 1 -> Not Valid
    More than 2 keys -> Not valid
    */
    const num_keys = Object.keys(freq_values).length;
    if(num_keys===1){
        return success;
    } else if (num_keys===2) {
        const results: [number, number][] = Object.entries(freq_values).map(([key, value]) => [Number(key), value] as [number, number]);;
        results.sort((a,b)=>b[0]-a[0]);
        if((results[0][0]===1 && results[0][1]===1)||(results[1][0]===1 && results[1][1]===1)){
            return success;
        }
        if(results[0][0]-results[1][0]===1){
            if(results[0][1]===1 || results[1][1]===1){
                return success;
            }
        }
    }
    return failure;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = isValid(s);

    ws.write(result + '\n');

    ws.end();
}
