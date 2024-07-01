class RequestQueue {
    constructor(interval = 200) {
        this.queue = [];
        this.interval = interval;
        this.isProcessing = false;
    }

    add(requestFunc) {
        this.queue.push(requestFunc);
        this.processQueue();
    }

    async processQueue() {
        if (this.isProcessing) return;

        this.isProcessing = true;
        while (this.queue.length > 0) {
            const requestFunc = this.queue.shift();
            try {
                await requestFunc();
            } catch (error) {
                console.error("Error processing request:", error);
            }
            await this.delay(this.interval);
        }
        this.isProcessing = false;
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getQueueSize() {
        return this.queue.length;
    }
}

module.exports = RequestQueue;
