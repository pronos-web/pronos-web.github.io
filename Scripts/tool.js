export class Tool {
    constructor(content){
        const d = new Date;
        this.id = d.getTime(),
        this.content = content,
        this.complete = false,
        this.cu = true,
        this.nonCu = true,
        this.prod = true,
        this.tw = true,
        this.purge = true,
        this.noPurge = true,
        this.deseg = true,
        this.nonDeseg = true,
        this.show = true,
        this.building = "unknown",
        this.bay = "unknown";
    }
}