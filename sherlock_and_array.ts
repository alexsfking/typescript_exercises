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
 * Complete the 'balancedSums' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function balancedSums(arr: number[]): string {
    // Write your code here
    if(arr.length<3){
        //edge cases
        if(arr.length===0 || arr.length===1){
            //unsure if 0 should be yes or no
            return "YES";
        } else if(arr.length===2){
            if(arr[0]===0 || arr[1]===0){
                return "YES";
            } else {
                return "NO";
            }
        }
        throw new Error("Not implemented.")
    }
    let left:number=0;
    let right:number=0;
    for(let i=0;i<arr.length;i++){
        right+=arr[i];
    }
    right-=arr[arr.length-1];
    if(right===0){
        //edge case
        //[11,0, ..., 0]
        return "YES";
    }
    right+=arr[arr.length-1];
    right-=arr[0];
    if(right===0){
        //edge case
        //[11,0, ..., 0]
        return "YES";
    }
    for(let i=1;i<arr.length-1;i++){
        right-=arr[i];
        left+=arr[i-1];
        if(left===right){
            return "YES";
        }
    }
    return "NO";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const T: number = parseInt(readLine().trim(), 10);

    for (let TItr: number = 0; TItr < T; TItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

        const result: string = balancedSums(arr);

        ws.write(result + '\n');
    }

    ws.end();
}
