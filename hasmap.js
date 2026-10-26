export class  HashMap {
    constructor() {
        this.capacity = 16
        this.loadFactor = 0.75

        this.buckets = new Array(this.capacity)

        this.size = 0
    }

    hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
        hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
    }

    set(key, value) {
        const index = this.hash(key)

        if (!this.buckets[index]) {
            this.buckets[index] = [];
        }

        for (const item of this.buckets[index]) {
            if (item.key === key) {
                item.value = value
                return
            }
        }

        this.buckets[index].push({
            key: key,
            value: value
        })

        this.size += 1

        if (this.size / this.capacity > this.loadFactor) {
            const entriesCopy = this.entries()

            this.capacity *= 2
            this.buckets = new Array(this.capacity)
            this.size = 0

            for (const entry of entriesCopy) {
                this.set(entry[0], entry[1])
            }
        }
    }

    get(key) {
        const index = this.hash(key)

        if (!this.buckets[index]) {
            return undefined
        }

        for (const item of this.buckets[index]) {
            if (item.key === key) {
                return item.value
            }
        }
        return undefined
    }

    has(key) {
        const index = this.hash(key)

        if (!this.buckets[index]) {
            return false
        }

        for(const item of this.buckets[index]) {
            if(item.key === key) {
                return true
            }
        }

        return false
    }

    remove(key) {
        const index = this.hash(key)

        if (!this.buckets[index]) {
            return false
        }

        for(const item of this.buckets[index]) {
            if(item.key === key) {
                const indexOfItem = this.buckets[index].indexOf(item)
                this.buckets[index].splice(indexOfItem, 1)
                this.size -= 1
                if (this.buckets[index].length === 0) {
                    this.buckets[index] = undefined;
                }
                return true
            }
        }

        return false
    }

    length() {
        return this.size
    }

    clear() {
        this.capacity = 16
        this.buckets = new Array(this.capacity)
        this.size = 0
        this.loadFactor = 0.75
    }

    keys() {
        let keyArr = []

        for (const bucket of this.buckets) {
            if(bucket) {
                for (const item of bucket) {
                    keyArr.push(item.key)
                }
            }
        }

        return keyArr
    }

    values() {
        let valueArr = []

        for (const bucket of this.buckets) {
            if(bucket) {
                for (const item of bucket) {
                    valueArr.push(item.value)
                }
            }
        }

        return valueArr
    }

    entries() {
        let entriesArr = []

        for (const bucket of this.buckets) {
            if(bucket) {
                for(const item of bucket) {
                    entriesArr.push([item.key, item.value])
                }
            }
        }

        return entriesArr
    }
}