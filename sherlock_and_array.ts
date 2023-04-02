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

function smallEdgeCases(arr:number[]):boolean{
    if(arr.length<2){
        //arr.length<0 not possible
        //arr.length===0 ?yes or no?
        //arr.length===1 yes
        return true;
    } 
    //arr.length===2
    if(arr[0]===0 || arr[1]===0){
        return true;
    } else {
        return false;
    }
}

function headTailEdgeCases(arr:number[], right:number):boolean{
    right-=arr[arr.length-1];
    if(right===0){
        //edge case
        //[11,0, ..., 0]
        return true;
    }
    right+=arr[arr.length-1];
    right-=arr[0];
    if(right===0){
        //edge case
        //[0,0, ..., 11]
        return true;
    }
    return false;
}

function balancedSums(arr: number[]): string {
    // Write your code here
    const success:string="YES";
    const failure:string="NO";
    if(arr.length<3){
        if(smallEdgeCases(arr)){
            return success;
        }
        return failure;
    }
    let left:number=0;
    let right:number=0;
    for(let i=0;i<arr.length;i++){
        right+=arr[i];
    }
    if(headTailEdgeCases(arr, right)){
        return success;
    }
    right-=arr[0];
    for(let i=1;i<arr.length-1;i++){
        right-=arr[i];
        left+=arr[i-1];
        if(left===right){
            return success;
        }
    }
    return failure;
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
