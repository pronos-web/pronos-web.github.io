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
        this.eng = true;
        this.purge = true,
        this.noPurge = true,
        this.deseg = true,
        this.nonDeseg = true,
        this.flip = true;
        this.noFlip = true;
        this.show = true,
        this.building = "unknown",
        this.bay = "unknown";
        this.lsa = true;
        this.lsb = true;
        this.dfw = true;
        this.afw = true;
        this.afq = ture;
        this.udl = true;
        this.udc = true;
    }
}