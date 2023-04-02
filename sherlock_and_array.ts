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
Watson gives Sherlock an array of integers. His challenge is to find an element
of the array such that the sum of all elements to the left is equal to the sum
of all elements to the right.
*/

/*
***Chat-GPT***
This is TypeScript code for a function called balancedSums. This function takes
an array of integers as an argument and returns a string. The goal of the
function is to determine if there is an index where the sum of the elements on
the left is equal to the sum of the elements on the right.

The function begins with two helper functions: smallEdgeCases and
headTailEdgeCases. These helper functions are used to handle edge cases where
the array is either empty, has only one or two elements, or has zeros at the
beginning or end of the array.

The balancedSums function then checks if the length of the array is less than 3.
If it is, it calls the smallEdgeCases function to handle the edge cases and
returns "YES" or "NO" depending on whether the edge case is balanced.

If the length of the array is 3 or greater, the function initializes two
variables, left and right, to 0. It then calculates the sum of all the elements
in the array and assigns it to right.

The function then checks for head and tail edge cases by calling the
headTailEdgeCases function. If the array has zeros at either the beginning or
the end, the headTailEdgeCases function handles these cases and returns "YES" if
they are balanced. 
@@@This is false. It checks for [number,0,...,0] or [0,...,0,number]@@@

If the array is not an edge case, the function enters a loop that iterates over
all elements of the array except the first and last ones. Inside the loop, the
function subtracts the current element from right and adds it to left. If left
and right are equal, the function returns "YES".

If the loop completes without finding a balanced index, the function returns
"NO".

The main function reads input from the user, calls the balancedSums function,
and writes the result to the console.
*/

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
