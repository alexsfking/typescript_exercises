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
The timeConversion function in this code is responsible for converting a time
string from 12-hour AM/PM format to 24-hour military time format.

The function takes a single parameter s, which is the time string in the format
"hh:mm:ssAM" or "hh:mm:ssPM", where "hh" is the hour, "mm" is the minute, "ss"
is the second, and "AM" or "PM" indicates whether the time is in the morning or
the afternoon/evening.

The function first creates a regular expression to match the time string using
the RegExp constructor. It then uses the match method on the input string s to
check if it matches the regular expression. If there is no match, it throws a
TypeError with an error message indicating that the input is invalid.

If the input string matches the regular expression, the function extracts the
hour, minute, second, and AM/PM indicator from the match result using
destructuring assignment.

It then checks the AM/PM indicator and adjusts the hour accordingly, using the
parseInt function to convert the hour string to a number and the toString method
to convert it back to a string. If the hour is 12 and the time is in the
morning, it sets the hour to 0.

Finally, the function returns a string representing the converted time in
24-hour format.

The main function in this code reads input from stdin and writes output to
stdout using the createWriteStream method from the fs module. It calls the
timeConversion function to convert the input time string to 24-hour format, and
writes the result to the output stream.
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
    const match: RegExpMatchArray | null =s.match(regex);
    if(match===null){
        throw new TypeError("Invalid input: 'hh:mm:ssAM' or 'hh:mm:ssPM'");
    }
    let [, hour, min, sec, ampm] :string[] = match;
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
