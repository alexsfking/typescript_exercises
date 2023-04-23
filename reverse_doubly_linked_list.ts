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

class DoublyLinkedListNode {
    data: number;
    next: DoublyLinkedListNode | null;
    prev: DoublyLinkedListNode | null;

    constructor(nodeData: number) {
        this.data = nodeData;
        this.next = null;
        this.prev = null;
    }
};

class DoublyLinkedList {
    head: DoublyLinkedListNode | null;
    tail: DoublyLinkedListNode | null;

    constructor() {
        this.head = null;
        this.tail = null;
    }

    insertNode(nodeData: number): void {
        let node = new DoublyLinkedListNode(nodeData);

        if (this.head == null) {
            this.head = node;
        } else {
            this.tail!.next = node;
            node.prev = this.tail;
        }

        this.tail = node;
    }
};

function printDoublyLinkedList(node: DoublyLinkedListNode | null, sep: string, ws: WriteStream): void {
    while (node != null) {
        ws.write(String(node.data));

        node = node.next;

        if (node != null) {
            ws.write(sep);
        }
    }
}

/*
 * Complete the 'reverse' function below.
 *
 * The function is expected to return an INTEGER_DOUBLY_LINKED_LIST.
 * The function accepts INTEGER_DOUBLY_LINKED_LIST llist as parameter.
 */

/*
***Chat-GPT***
The given code is a TypeScript implementation of a doubly linked list with a
reverse function and a helper function called swapNodePointers. Let's go through
the code and understand its functionality.

The DoublyLinkedListNode class represents a node in a doubly linked list. It has
three properties:

    data: a number that stores the data of the node.
    next: a reference to the next node in the doubly linked list.
    prev: a reference to the previous node in the doubly linked list.

The DoublyLinkedList class represents the doubly linked list itself. It has two
properties:

    head: a reference to the head (first) node of the doubly linked list.
    tail: a reference to the tail (last) node of the doubly linked list.

The insertNode method of the DoublyLinkedList class is used to insert a new node
with the given data at the end of the doubly linked list.

The printDoublyLinkedList function is a helper function that prints the data of
each node in the doubly linked list, separated by a given separator, to a given
write stream.

The swapNodePointers function is a helper function that takes a
DoublyLinkedListNode object as input and swaps its next and prev pointers. It
simply swaps the references of the next and prev properties of the node.

The reverse function is the main function that is expected to reverse the doubly
linked list. It takes a DoublyLinkedListNode object as input and returns the
head (first) node of the reversed doubly linked list. The function uses an
iterative approach to reverse the doubly linked list. It maintains two pointers,
current_node and prev_node, initially pointing to the head of the doubly linked
list. It iterates through the list, swapping the next and prev pointers of each
node using the swapNodePointers function, until it reaches the end of the list.
Finally, it returns the prev_node which now points to the head of the reversed
doubly linked list.

The main function reads input from standard input, creates a doubly linked list,
calls the reverse function to reverse the doubly linked list, and prints the
reversed doubly linked list to standard output using the printDoublyLinkedList
function. It repeats this process for multiple test cases as specified by the
input.
*/

/*
 * For your reference:
 *
 * DoublyLinkedListNode {
 *     number data;
 *     DoublyLinkedListNode next;
 *     DoublyLinkedListNode prev;
 * }
 *
 */

function swapNodePointers(node:DoublyLinkedListNode): void{
    const temp=node.next;
    node.next=node.prev;
    node.prev=temp;
    return;
}

function reverse(llist: DoublyLinkedListNode): DoublyLinkedListNode {
    // Write your code here
    let current_node:DoublyLinkedListNode|null=llist;
    let prev_node:DoublyLinkedListNode=llist;
    while(current_node!==null){
        prev_node=current_node;
        current_node=current_node.next;
        swapNodePointers(prev_node);
    }
    return prev_node;
}

function main() {
    const ws: WriteStream = createWriteStream(process.env['OUTPUT_PATH']);

    const t: number = parseInt(readLine().trim(), 10);

    for (let tItr: number = 0; tItr < t; tItr++) {
        let llist: DoublyLinkedList = new DoublyLinkedList();

        const llistCount: number = parseInt(readLine().trim(), 10);

        for (let i: number = 0; i < llistCount; i++) {
            const llistItem: number = parseInt(readLine().trim(), 10);

            llist.insertNode(llistItem);
        }

        const llist1: DoublyLinkedListNode = reverse(llist.head);

        printDoublyLinkedList(llist1, ' ', ws);
        ws.write('\n');
    }

    ws.end();
}
