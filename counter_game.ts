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
Louise and Richard have developed a numbers game. They pick a number and check
to see if it is a power of 2. If it is, they divide it by 2. If not, they reduce
it by the next lower number which is a power of 2. Whoever reduces the number to
1 wins the game. Louise always starts.

Given an initial value, determine who wins the game.

Example
n=132
It's Louise's turn first. She determines that 132 is not a power of 2. The next
lower power of 2 is 128, so she subtracts that from 132 and passes 4 to Richard.
4 is a power of 2, so Richard divides it by 2 and passes 2 to Louise. Likewise,
2 is a power so she divides it by 2 and reaches 1. She wins the game.

Update If they initially set counter to 1, Richard wins. Louise cannot make a
move so she loses.
*/

/*
 * Complete the 'counterGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts LONG_INTEGER n as parameter.
 */

/*
This is a TypeScript code that takes input from the user, performs a specific
game algorithm, and outputs the result. Here is an explanation of what each part
of the code does:

The use strict statement enforces stricter parsing and error handling of the
code.

The import statement imports the necessary functions from the "fs" module of
Node.js. Specifically, it imports the WriteStream and createWriteStream
functions.

The process.stdin statement sets the standard input stream to read data from the
user.

The inputString, inputLines, and currentLine variables are initialized to empty
string, empty array, and zero, respectively.

The process.stdin.on statements listen for data events and end events on the
standard input stream, and store the input data into inputString and split it
into an array of lines, respectively.

The readLine function returns the next line of input from inputLines and
increments currentLine.

The nearestPowerOf2 function takes a number n and returns the nearest power of 2
that is less than or equal to n.

The isPowerOf2 function takes a number n and returns true if n is a power of 2,
and false otherwise.

The counterGame function takes a number n as input, and implements the numbers
game algorithm described in the comments. It returns a string indicating the
winner of the game.

The main function sets up a WriteStream to write the output of the program,
reads the number of test cases t, loops over each test case and reads the input
number n, runs the counterGame function on n, writes the result to the output
stream, and finally ends the output stream.

Overall, this code implements a simple algorithmic game, takes input from the
user, processes it, and outputs the result to the user.

nearestPowerOf2(n: number): number: This function takes a number n as input and
returns the nearest power of 2 that is less than or equal to n. The function
calculates the logarithm base 2 of n using the Math.log2 function, rounds it
down to the nearest integer using Math.floor, and then raises 2 to that power
using Math.pow. The resulting value is the nearest power of 2 that is less than
or equal to n.

isPowerOf2(n: number): boolean: This function takes a number n as input and
returns true if n is a power of 2, and false otherwise. The function first
checks if n is non-negative, and then checks if n has only one bit set to 1
using the bitwise AND operator &. If the bitwise AND of n and n-1 equals 0, then
n has only one bit set to 1, and therefore n is a power of 2.

counterGame(n: number): string: This function takes a number n as input and
implements the numbers game algorithm described in the comments. The function
initializes a boolean variable player to true, which indicates that it is
Louise's turn to play first. The function then enters a while loop that
continues until n equals 1. In each iteration of the loop, the function checks
if n is a power of 2 using the isPowerOf2 function. If it is, then n is divided
by 2. If it is not, then n is reduced by the nearest power of 2 using the
nearestPowerOf2 function. After each iteration of the loop, the player variable
is toggled using the NOT operator !, which switches the current player from
Louise to Richard, or vice versa. Finally, after the while loop ends, the
function checks if the last player to move was Louise or Richard, and returns
the appropriate string indicating the winner of the game.

In summary, the nearestPowerOf2 and isPowerOf2 functions are helper functions
that are used by the counterGame function to implement the numbers game
algorithm. The counterGame function takes a number n as input, implements the
algorithm using the helper functions, and returns a string indicating the winner
of the game.
*/

function nearestPowerOf2(n: number): number {
    // Calculate the logarithm base 2 of n
    return(Math.pow(2,Math.floor(Math.log2(n))));
}

function isPowerOf2(n: number): boolean {
    // Check if n is non-negative and has only one bit set to 1
    return n >= 0 && (n & (n - 1)) === 0;
}

function counterGame(n: number): string {
    // Write your code here
    let player:boolean=true;
    while(n!=1){
        if(isPowerOf2(n)){
            n=n/2;
        } else {
            n=n-nearestPowerOf2(n);
        }
        player=!player;
    }
    if(player===false){
        return "Louise";
    }
    return "Richard";
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        const n: number = parseInt(readLine().trim(), 10);

        const result: string = counterGame(n);

        ws.write(result + '\n');
    }

    ws.end();
}
