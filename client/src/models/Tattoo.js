export class Tattoo {
    constructor(data) {
        this.name = data.name
        this.id = data.id || data._id
        this.url = data.url
        this.source = data.source
        this.createdAt = new Date(data.posted)
        this.isLiked = false
    }

    get fullURL() {
        if (this.url.startsWith('https')) {
            return this.url
        }
        return 'https://mijntattoo.nl/' + this.url
    }

}