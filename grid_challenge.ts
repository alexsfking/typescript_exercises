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
Given a square grid of characters in the range ascii[a-z], rearrange elements of
each row alphabetically, ascending. Determine if the columns are also in
ascending alphabetical order, top to bottom. Return YES if they are or NO if
they are not.
*/

/*
***Chat-GPT***
This is a TypeScript program that reads input from standard input, processes the
input, and writes output to standard output. The program reads in a square grid
of characters, where each row is a string and each character is in the range
ascii[a-z]. The program rearranges the elements of each row alphabetically in
ascending order and then checks if the columns are also in ascending
alphabetical order, top to bottom.

The isAlphabetical function takes an array of strings as input and checks if the
strings are in ascending alphabetical order. It uses the every method to iterate
over each character in the array and compare it to the previous character. If
the current character is greater than or equal to the previous character, it
returns true, indicating that the array is in order. If any comparison returns
false, the every method returns false, indicating that the array is not in
order.

The gridChallenge function takes an array of strings representing a square grid
of characters and returns a string ("YES" or "NO") indicating whether the
columns are in ascending alphabetical order. The function first rearranges the
elements of each row of the grid using the split, sort, and join methods. It
then iterates over the columns of the grid and constructs an array of characters
for each column using a nested loop. It then calls the isAlphabetical function
to check if the column is in order. If any column is not in order, the function
returns "NO". If all columns are in order, the function returns "YES".

The main function reads the input from standard input using the readLine
function and processes it using the gridChallenge function. It writes the output
to standard output using the createWriteStream method.
*/

/*
 * Complete the 'gridChallenge' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function isAlphabetical(arr:string[]):boolean{
    return arr.every((char, index) => {
        if (index === 0) {
          return true; // first character is always in order
        }
        return char >= arr[index - 1];
    });
}

function gridChallenge(grid: string[]): string {
    // Write your code here
    for(let i=0;i<grid.length;i++){
        grid[i]=grid[i].split('').sort().join('');
    }
    for(let i=0;i<grid[0].length;i++){
        let temp:string[]=[];
        for(let j=0;j<grid.length;j++){
            temp.push(grid[j][i]);
        }
        if(!isAlphabetical(temp)){
            return "NO";
        }
    }
    return "YES";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        let grid: string[] = [];

        for (let i: number = 0; i < n; i++) {
            const gridItem: string = readLine();
            grid.push(gridItem);
        }

        const result: string = gridChallenge(grid);

        ws.write(result + '\n');
    }

    ws.end();
}
