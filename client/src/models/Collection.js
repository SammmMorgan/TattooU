export class Collection {
    constructor(data) {
        this.title = data.title
        this.coverImg = data.coverImg
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.likedImages = data.likedImages || []
    }
}