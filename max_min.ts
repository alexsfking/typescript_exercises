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
You will be given a list of integers, arr, and a single integer k. You must
create an array of length k from elements of arr such that its unfairness is
minimized. Call that array arr'. Unfairness of an array is calculated as

max(arr')-min(arr')

Where:
- max denotes the largest integer in arr'
- min denotes the smallest integer in arr'

Example arr=[1,4,7,2]   k=2 
Pick any two elements, say arr'=[4,7]. 
unfairness = max([4,7]) - min([4,7]) 
           = 7          - 4 = 3

Testing for all pairs, the solution [1,2] provides the minimum unfairness.

Note: Integers in arr may not be unique.

Function Description
Complete the maxMin function in the editor below.
maxMin has the following parameter(s):
    int k: the number of elements to select
    int arr[n]:: an array of integers

Returns
int: the minimum possible unfairness
*/

/*
 * Complete the 'maxMin' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY arr
 */

function maxMin(k: number, arr: number[]): number {
    // Write your code here
    arr.sort((a,b)=>a-b);
    //sliding window
    let window_start:number=0;
    let window_end:number=0;
    const window_size:number=k-1;
    let max_min:number=arr[arr.length-1]-arr[0];
    while (window_end<arr.length){
        window_end+=1;
        if(window_end-window_start===window_size){
            if(arr[window_end]-arr[window_start]<max_min){
                max_min=arr[window_end]-arr[window_start];
            }
            window_start+=1;
        }
    }
    return max_min;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const k: number = parseInt(readLine().trim(), 10);

    let arr: number[] = [];

    for (let i: number = 0; i < n; i++) {
        const arrItem: number = parseInt(readLine().trim(), 10);

        arr.push(arrItem);
    }

    const result: number = maxMin(k, arr);

    ws.write(result + '\n');

    ws.end();
}
