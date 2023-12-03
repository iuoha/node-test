import { SqliteHelper } from "./SqliteHelper";

console.log("============ start ============");

const helper = new SqliteHelper();

const where1 = {
    AND: [
        {item_id: {equals: 1, gtl: 567}},
        {item_id: {equals: 2}},
        {item_id: {equals: 3}},
    ],
}

const res1 = where1["AND"].map((v)=> {
   return Object.entries(v).map(([key, value]) => {
       console.log(`${key}: ${value}`)
       return Object.entries(value).map(([wKey, wValue]) => {
        console.log(`${wKey}: ${wValue}`)
        let right = "";
        switch (wKey) {
            case "equals": 
                right = `= ${wValue}`
                break;
            case "gtl":
                right = `>= ${wValue}`
                break;
            default:
                right = `= ${wValue}`
        }
        return `${key} ${right}`;
       }).join(` AND `)
   }).join(` AND `)
}).join(` AND `).replace(/^/, "(").replace(/$/, ")");

console.log("helper res1:", helper.boolCondition(where1))

const where2 = {
    item_id_A: {equals: 1, gtl: 567},
    item_id_B: {equals: "aiueo"},
    item_id_C: {equals: 3},
}

const res2 = Object.entries(where2).map(([key, value]) => {
    return Object.entries(value).map(([wKey, wValue]) => {
        const v = typeof wValue === 'string' ? `'${wValue}'` : wValue;
        let right = "";
        switch (wKey) {
            case "equals": 
                right = `= ${v}`
                break;
            case "gtl":
                right = `>= ${v}`
                break;
            default:
                right = `= ${v}`
        }
        return `${key} ${right}`;
    }).join(` AND `)
}).join(` AND `).replace(/^/, "(").replace(/$/, ")");

console.log("helper res2:", helper.boolCondition(where2))

const where3 = {
    OR: [
        {item_id: {equals: 1, gtl: 567}},
        {item_id: {equals: 2}},
        {item_id: {equals: 3}},
    ]
}

const res3 = where3["OR"].map((v)=> {
    return Object.entries(v).map(([key, value]) => {
        return Object.entries(value).map(([wKey, wValue]) => {
            let right = "";
            switch (wKey) {
                case "equals": 
                    right = `= ${wValue}`
                    break;
                case "gtl":
                    right = `>= ${wValue}`
                    break;
                default:
                    right = `= ${wValue}`
            }
            return `${key} ${right}`;
        }).join(` OR `)
    }).join(` OR `)
}).join(` OR `).replace(/^/, "(").replace(/$/, ")");

console.log("helper res3:", helper.boolCondition(where3));

const where4 = {
    OR: [
        {item_id: {equals: 1, gtl: 567}},
        {item_id: {equals: 2}},
        {item_id: {equals: 3}},
    ],
    AND: [
        {item_id: {equals: 555}},
        {item_id: {equals: 666, gtl: 100000}},
        {item_id: {equals: 777}},
    ],
}

console.log("helper res4:", helper.boolCondition(where4));

console.log("============= end =============");