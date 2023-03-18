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
Comparison Sorting
Quicksort usually has a running time of nlog(n), but is there an algorithm that
can sort even faster? In general, this is not possible. Most sorting algorithms
are comparison sorts, i.e. they sort a list just by comparing the elements to
one another. A comparison sort algorithm cannot beat nlong(n) (worst-case)
running time, since nlog(n) represents the minimum number of comparisons needed
to know where to place each element.

Alternative Sorting
Another sorting method, the counting sort, does not require comparison. Instead,
you create an integer array whose index range covers the entire range of values
in your array to sort. Each time a value occurs in the original array, you
increment the counter at that index. At the end, run through your counting
array, printing the value of each non-zero valued index that number of times.

Note
For this exercise, always return a frequency array with 100 elements. The
example above shows only the first 4 elements, the remainder being zeros.

Challenge
Given a list of integers, count and return the number of times each value
appears as an array of integers.

Function Description

Complete the countingSort function in the editor below.

countingSort has the following parameter(s):

arr[n]: an array of integers Returns

int[100]: a frequency array
*/

/*
 * Complete the 'countingSort' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function countingSort(arr: number[]): number[] {
    // Write your code here
    let frequency: number[] = new Array(100).fill(0);
    for(let i=0;i<arr.length;i++){
        frequency[arr[i]]+=1;
    }
    return frequency;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const arr: number[] = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result: number[] = countingSort(arr);

    ws.write(result.join(' ') + '\n');

    ws.end();
}
