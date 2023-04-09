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
Given an interger n, find each x such that:
    0<=x<=n
    n+x===n^x
    where ^ denotes bitwise XOR
return the number of x's that satisfy this condition.
*/

/*
Code to find the results below
function sumXor(n: number): number {
    // Write your code here
    //n=10;
    const results: [number,number][] = [];
    for(n=0;n<31;n++){
        let count:number =0;
        for(let i=0;i<n;i++){
            if((n^i)===(n+i)){
                count+=1;
            }
        }
        results.push([n,count]);
    }
    for(let i=0;i<results.length;i++){
        console.log(results[i][0], results[i][0].toString(2), results[i][1]);
    }
    return 0;
}
*/

/*
Results
n   n(binary)   number of solutions ((n^x)===(n+x) where x<=n)
0   0           0
1   1           1
2   10          2
3   11          1
4   100         4
5   101         2
6   110         2
7   111         1
8   1000        8
9   1001        4
10  1010        4
11  1011        2
12  1100        4
13  1101        2
14  1110        2
15  1111        1
16  10000       16
17  10001       8
18  10010       8
19  10011       4
20  10100       8
21  10101       4
22  10110       4
23  10111       2
24  11000       8
25  11001       4
26  11010       4
27  11011       2
28  11100       4
29  11101       2
30  11110       2

As we can see the number of solutions is equal to 2^(zeroes in the binary
sequence)
*/

/*
 * Complete the 'sumXor' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts LONG_INTEGER n as parameter.
 */

function sumXor(n: number): number {
    // Write your code here
    if(n===0){
        return 1;
    }
    const binary_string:string=n.toString(2);
    let count:number=0;
    for(let i=0;i<binary_string.length;i++){
        if(binary_string[i]==="0"){
            count++;
        }
    }
    return Math.pow(2,count);
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const n: number = parseInt(readLine().trim(), 10);

    const result: number = sumXor(n);

    ws.write(result + '\n');

    ws.end();
}
