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
There is a collection of input strings and a collection of query strings. For
each query string, determine how many times it occurs in the list of input
strings. Return an array of the results.

Example
strings=['ab','ab','abc']
queries=['ab','abc','bc']

There are 2 instances of ab, 1 of abc and 0 of bc. For each query, add an
element to the return array.
results=[2,1,0]

Function Description

Complete the function matchingStrings in the editor below. The function must
return an array of integers representing the frequency of occurrence of each
query string in strings.

matchingStrings has the following parameters:
string strings[n] - an array of strings to search
string queries[q] - an array of query strings

Returns
int[q]: an array of results for each query
*/

/*
***Chat-GPT***
This is a TypeScript program that reads input strings from the user and
processes them to find the frequency of occurrence of each query string in an
array of input strings.

The program defines a function matchingStrings that takes two string arrays,
strings and queries, as input parameters. The function uses a Record<string,
number> object wc to store the frequency of occurrence of each string in the
strings array. The Record type is a built-in TypeScript utility type that allows
defining an object type with string keys and values of a specific type. In this
case, it defines an object with string keys and number values.

The matchingStrings function first iterates through the strings array and
updates the frequency count of each string in the wc object. It then iterates
through the queries array and checks if each query string exists in the wc
object. If it does, the frequency count of the query string is pushed to an
output array out. If not, a 0 is pushed to the out array.

The main function reads the input strings from the user, calls the
matchingStrings function to process them, and writes the results to the console
using a WriteStream.

Overall, this program demonstrates the use of arrays, objects, loops,
conditional statements, and built-in TypeScript utility types like Record.
*/

/*
 * Complete the 'matchingStrings' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY strings
 *  2. STRING_ARRAY queries
 */

function matchingStrings(strings: string[], queries: string[]): number[] {
    // Write your code here
    type WordCount = Record<string, number>;
    const wc: WordCount = {};

    for(let i=0;i<strings.length;i++){
        if(strings[i] in wc){
            wc[strings[i]]+=1;
        } else {
            wc[strings[i]]=1;
        }
    }

    let out: number[]=[];
    for(let i=0;i<queries.length;i++){
        if(queries[i] in wc){
            out.push(wc[queries[i]]);
        } else{
            out.push(0);
        }
    }

    return out;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const stringsCount: number = parseInt(readLine().trim(), 10);

    let strings: string[] = [];

    for (let i: number = 0; i < stringsCount; i++) {
        const stringsItem: string = readLine();
        strings.push(stringsItem);
    }

    const queriesCount: number = parseInt(readLine().trim(), 10);

    let queries: string[] = [];

    for (let i: number = 0; i < queriesCount; i++) {
        const queriesItem: string = readLine();
        queries.push(queriesItem);
    }

    const res: number[] = matchingStrings(strings, queries);

    ws.write(res.join('\n') + '\n');

    ws.end();
}
