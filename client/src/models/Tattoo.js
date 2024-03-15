export class Tattoo {
constructor(data){
    this.id = data.id || data._id
    this.url = data.url
    this.source = data.source
    this.createdAt = new Date(data.posted)
}

}