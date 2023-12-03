

type OperationArgs = "AND" | "OR" | null;

export class SqliteHelper {

    constructor() {

    }

    /** フィルター演算子 */
    public filterBuilter(key: string, value: any, operator: string) {
        const v = typeof value === 'string' ? `'${value}'` : value;
        let right = "";
        switch (operator) {
            case "equals": 
                right = `= ${v}`
                break;
            case "gtl":
                right = `>= ${v}`
                break;
            default:
                right = `= ${v}`
                break;
        }
        return `${key} ${right}`;
    }

    public boolCondition(where: any, operation: OperationArgs = null) {
        let res = [];
        // ORチェック
        if ("OR" in where) {
            res.push(where["OR"].map((v: any) => {
                return this.condition1(v, "OR");
            }).join(` OR `).replace(/^/, "(").replace(/$/, ")"));
        }
        // ANDチェック
        if ("AND" in where) {
            res.push(where["AND"].map((v: any) => {
                return this.condition1(v, "AND");
            }).join(` AND `).replace(/^/, "(").replace(/$/, ")"));
        }
        if (res.length === 0) {
            // AND,ORの指定がない場合はANDで結合
            return this.condition1(where, "AND");
        }
        // TODO:各SQLはANDで結合 ORが後から来る場合はORで結合する必要がある？
        return res.join(` AND `).replace(/^/, "(").replace(/$/, ")");
    }

    public condition1(where: any, boolOperator: OperationArgs) {
        return Object.entries(where).map(([itemName, itemValue]) => {
            return this.condition2(itemValue, itemName, boolOperator);
        }).join(` ${boolOperator} `).replace(/^/, "(").replace(/$/, ")");
    }

    public condition2(where: any, key: string, boolOperator: OperationArgs) {
        return Object.entries(where).map(([operator, value]) => {
            return this.filterBuilter(key, value, operator);
        }).join(` ${boolOperator} `);
    }
}