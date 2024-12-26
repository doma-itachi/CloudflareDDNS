import Cloudflare from "cloudflare";
import { env } from "./env.ts";
import { zHttpbinResponse } from "./types.ts";

const cloudflare = new Cloudflare({
    apiEmail: env.API_EMAIL,
    apiKey: env.API_KEY
})

async function main(){
    const ipres = await fetch("https://httpbin.org/ip");
    const httpbin = zHttpbinResponse.parse(await ipres.json());
    let oldIp = "";
    
    for await (const recordListResponse of cloudflare.dns.records.list({
        zone_id: env.ZONE_ID
    })){
        
        if(recordListResponse.content===httpbin.origin || !recordListResponse.id) continue;
        if(recordListResponse.type!=="A")continue;

        oldIp = recordListResponse.content;

        await cloudflare.dns.records.edit(recordListResponse.id, {
            type: recordListResponse.type,
            name: recordListResponse.name,
            zone_id: env.ZONE_ID,
            content: httpbin.origin,
        })
    }
    if(oldIp){
        console.log(`${getNow()} IP:${oldIp}からIP:${httpbin.origin}に変更しました`);
    }
    else{
        console.log(`${getNow()} DNSは変更されていません`);
    }
}

function getNow(): string{
    const formatter = new Intl.DateTimeFormat("ja-JP", {
        timeZone: "Asia/Tokyo",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    return formatter.format(new Date());
}

main();