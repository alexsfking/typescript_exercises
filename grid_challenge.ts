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
