'use strict';

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
Given pointers to the heads of two sorted linked lists, merge them into a
single, sorted linked list. Either head pointer may be null meaning that the
corresponding list is empty.

arr1:   1->3->7
arr2    1->2

out:    1->2->3->7
*/


/*Write Code starting from here*/

import { WriteStream, createWriteStream } from "fs";

function mergeLists(arr1:number[],arr2:number[]):number[]{
    let out:number[]=[];
    let i:number=0;
    let j:number=0;
    while(i<arr1.length && j<arr2.length){
        if(arr1[i]<arr2[j]){
            out.push(arr1[i]);
            i++;
        } else {
            out.push(arr2[j]);
            j++;
        }
    }
    while(i<arr1.length){
        out.push(arr1[i]);
        i++;
    }
    while(j<arr2.length){
        out.push(arr2[j]);
        j++;
    }
    return out;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);
    for(let i=0;i<t;i++){
        let arr1: number[] = [];
        let arr2: number[] = [];
        const n: number = parseInt(readLine().trim(), 10);
        for (let j: number = 0; j < n; j++) {
            const arrItem: number = parseInt(readLine().trim(), 10);
            arr1.push(arrItem);
        }
        const m: number = parseInt(readLine().trim(), 10);
        for (let j: number = 0; j < m; j++) {
            const arrItem: number = parseInt(readLine().trim(), 10);
            arr2.push(arrItem);
        }
        const result: number[] = mergeLists(arr1, arr2);
        ws.write(result.join(" ") + '\n');
    }
    ws.end();
}