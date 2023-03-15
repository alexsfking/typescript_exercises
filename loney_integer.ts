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
Given an array of integers, where all elements but one occur twice, find the unique element.

Example
a=[1,2,3,4,3,2,1]
The unique element is 4.
*/

/*
***Chat-GPT***
The lonelyinteger function takes an array of integers as input, where all
elements appear twice except for one. The goal is to find and return the unique
element. The function uses a hash table and a Set to accomplish this:

    1. Create an empty Set called uniq and an empty hash table called hash.
    2. Loop through the array a.
    3. For each element a[i], check if it is in hash. If it is:
        a. If a[i] is also in uniq, it means we have encountered the element 
        twice. So we remove it from uniq.
        b. If a[i] is not in hash, it means we have encountered it for the first
        time. So we add it to both uniq and hash.
    4. After the loop, there should be only one element left in uniq, which is 
    the unique element we are looking for. We use the values method of the Set to
    get an iterator over its values, and the next method of the iterator to get 
    the first (and only) value.

Finally, the main function reads the input from the standard input stream, calls
the lonelyinteger function with the input array, and writes the result to the
standard output stream.
*/

/*
 * Complete the 'lonelyinteger' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function lonelyinteger(a: number[]): number {
    // Write your code here
    const uniq = new Set<number>();
    const hash: Record<number,number>={}
    for(let i=0;i<a.length;i++){
        if(a[i] in hash){
            if(uniq.has(a[i])){
                //remove from unique
                uniq.delete(a[i]);
            }
        } else {
            //add to hash and unique
            uniq.add(a[i]);
            hash[a[i]]=1;
        }
    }
    return uniq.values().next().value;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const a: number[] = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result: number = lonelyinteger(a);

    ws.write(result + '\n');

    ws.end();
}
