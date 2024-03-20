export class LikedImage {
    constructor(data) {
        this.name = data.name
        this.accountId = data.accountId
        this.collectionId = data.collectionId
        this.tattooId = data.tattooId
        this.tattoo = data.tattoo
        this.collection = data.collection
    }
}