// default min heap class to use in various algorithm class was orginally written as max heap but converted to min heap
export default class MinHeap {
  constructor() {
    this.list = new Array(1);
  }
  parent(index) {
    return Math.floor(index - 1 / 2);
  }
  leftChild(index) {
    return index * 2 + 1;
  }
  rightChild(index) {
    return index * 2 + 2;
  }
  isLeaf(index) {
    return (
      index >= Math.floor(this.list.length / 2) && index <= this.list.length - 1
    );
  }
  swap(index1, index2) {
    [this.list[index1], this.list[index2]] = [
      this.list[index2],
      this.list[index1],
    ];
  }
  insert(element) {
    // add element to the end of the heap
    this.list.push(element);
    // move element up until it's in the correct position
    this.heapifyUp(this.list.length - 1);
  }
  heapifyUp(index) {
    let currentIndex = index,
      parentIndex = this.parent(currentIndex);

    // while we haven't reached the root node and the current element is greater than its parent node
    while (
      currentIndex > 1 &&
      this.list[currentIndex].distance < this.list[parentIndex].distance
    ) {
      // swap
      this.swap(currentIndex, parentIndex);
      // move up the binary heap
      currentIndex = parentIndex;
      parentIndex = this.parent(parentIndex);
    }
  }
  // removes and returns min element
  extractMin() {
    if (this.list.length < 2) return "heap is empty";

    // get max and last element
    const max = this.list[1];
    this.list.splice(1, 1);
    // reassign first element to the last element
    // heapify down until element is back in its correct position
    this.heapifyDown(1);

    // return the max
    return max;
  }

  heapifyDown(index) {
    // if the node at index has children
    if (!this.isLeaf(index)) {
      // get indices of children
      let leftChildIndex = this.leftChild(index),
        rightChildIndex = this.rightChild(index),
        // start out largest index at parent index
        largestIndex = index;
      if (
        !leftChildIndex > this.list.length ||
        !rightChildIndex > this.list.length
      ) {
        // if the left child > parent
        if (
          this.list[leftChildIndex].distance < this.list[largestIndex].distance
        ) {
          // reassign largest index to left child index
          largestIndex = leftChildIndex;
        }

        // if the right child > element at largest index (either parent or left child)
        if (
          this.list[rightChildIndex].distance <=
          this.list[largestIndex].distance
        ) {
          // reassign largest index to right child index
          largestIndex = rightChildIndex;
        }

        // if the largest index is not the parent index
        if (largestIndex !== index) {
          // swap
          this.swap(index, largestIndex);
          // recursively move down the heap
          this.heapifyDown(largestIndex);
        }
      }
    }
  }
  buildHeap(array) {
    this.list = array;
    // since leaves start at floor(nodes / 2) index, we work from the leaves up the heap
    for (let i = Math.floor(this.list.length / 2); i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
  peek() {
    return this.list[0];
  }

  print() {
    let i = 0;
    while (!this.isLeaf(i)) {
      console.log("PARENT:", this.list[i]);
      console.log("LEFT CHILD:", this.list[this.leftChild(i)]);
      console.log("RIGHT CHILD:", this.list[this.rightChild(i)]);
      i++;
    }
  }
}
