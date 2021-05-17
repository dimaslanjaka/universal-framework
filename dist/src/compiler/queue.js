"use strict";
/**
 * Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 * @example
 * // create a new queue
 * var queue = new Queue();
 * // enqueue an item
 * queue.enqueue('item');
 * // dequeue an item
 * var item = queue.dequeue();
 * // get the item at the front of the queue
 * var item = queue.peek();
 * // determine the number of items in the queue
 * var length = queue.getLength();
 * // determine whether the queue is empty
 * var isEmpty = queue.isEmpty();
 */
function Queue() {
    // initialise the queue and offset
    var queue = [];
    var offset = 0;
    // Returns the length of the queue.
    this.getLength = function () {
        return queue.length - offset;
    };
    // Returns true if the queue is empty, and false otherwise.
    this.isEmpty = function () {
        return queue.length == 0;
    };
    /* Enqueues the specified item. The parameter is:
     *
     * item - the item to enqueue
     */
    this.enqueue = function (item) {
        queue.push(item);
    };
    /* Dequeues an item and returns it. If the queue is empty, the value
     * 'undefined' is returned.
     */
    this.dequeue = function () {
        // if the queue is empty, return immediately
        if (queue.length == 0)
            return undefined;
        // store the item at the front of the queue
        var item = queue[offset];
        // increment the offset and remove the free space if necessary
        if (++offset * 2 >= queue.length) {
            queue = queue.slice(offset);
            offset = 0;
        }
        // return the dequeued item
        return item;
    };
    /* Returns the item at the front of the queue (without dequeuing it). If the
     * queue is empty then undefined is returned.
     */
    this.peek = function () {
        return queue.length > 0 ? queue[offset] : undefined;
    };
}
module.exports = Queue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVldWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9saWJzL3NyYy9jb21waWxlci9xdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxTQUFTLEtBQUs7SUFDWixrQ0FBa0M7SUFDbEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDO0lBQ2YsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBRWYsbUNBQW1DO0lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUc7UUFDZixPQUFPLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGLDJEQUEyRDtJQUMzRCxJQUFJLENBQUMsT0FBTyxHQUFHO1FBQ2IsT0FBTyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUM7SUFFRjs7O09BR0c7SUFDSCxJQUFJLENBQUMsT0FBTyxHQUFHLFVBQVUsSUFBSTtRQUMzQixLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQztJQUVGOztPQUVHO0lBQ0gsSUFBSSxDQUFDLE9BQU8sR0FBRztRQUNiLDRDQUE0QztRQUM1QyxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQztZQUFFLE9BQU8sU0FBUyxDQUFDO1FBRXhDLDJDQUEyQztRQUMzQyxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFekIsOERBQThEO1FBQzlELElBQUksRUFBRSxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxNQUFNLEVBQUU7WUFDaEMsS0FBSyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDNUIsTUFBTSxHQUFHLENBQUMsQ0FBQztTQUNaO1FBRUQsMkJBQTJCO1FBQzNCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFDO0lBRUY7O09BRUc7SUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHO1FBQ1YsT0FBTyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7SUFDdEQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELGlCQUFTLEtBQUssQ0FBQyJ9