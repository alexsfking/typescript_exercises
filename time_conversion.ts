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
Given a time in 12-hour AM/PM format, convert it to military (24-hour) time.
*/

/*
***Chat-GPT***
This TypeScript code reads a time string in 12-hour format from the standard
input, converts it to military (24-hour) format using the timeConversion
function, and writes the result to the standard output.

The timeConversion function takes a single string parameter s representing a
time in 12-hour format (e.g. "07:05:45PM"). It uses a regular expression to
match the input string against a pattern that captures the hour, minute, second,
and AM/PM indicator. If the pattern matches, the function converts the time to
24-hour format by adding 12 to the hour if the time is in PM and the hour is not
already 12, and setting the hour to 00 if the time is in AM and the hour is 12.
The function then returns a string representing the time in 24-hour format.
*/

/*
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s: string): string {
    // Write your code here
    const regex: RegExp = /^([0-9]+):([0-9][0-9]):([0-9][0-9])([AP][M])$/;
    let [, hour, min, sec, ampm]: RegExpMatchArray | null = s.match(regex) ?? null;
    if(hour && min && sec && ampm){
        if(ampm==='PM'){
            if(hour!=='12'){
                hour=(parseInt(hour)+12).toString();
            }
        } else {
            //AM
            if(hour==='12'){
                hour='00';
            }
        }
    }
    return([hour,min,sec].join(":"));
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const s: string = readLine();

    const result: string = timeConversion(s);

    ws.write(result + '\n');

    ws.end();
}
