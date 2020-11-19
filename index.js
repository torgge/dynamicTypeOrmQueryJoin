const relations = ['costo', 'costo.mercaderia', 'costo.mercaderia.unidadMedida', 'costo.mercaderia.unidadMedida.usuario', 'costo.mercaderia.unidadMedida.usuario.localidad']

function buildQueryJoins(str) {
    let tables = [];
    return str
        .split('.')
        .reduce(function (joinArray, table, index) {
            // console.log(table, index, index % 2)
            joinArray.push(
                (index > 0)
                    ? { join: `${tables[index - 1]}.${table}`, table: table }
                    : { join: `c.${table}`, table: table }
            )
            tables.push(table)
            return joinArray
        }, []);
}

function relationsToQueryBuilderJoins(relations) {
    let array = []
    let result = [];
    const map = new Map()
    relations.map(rel => array = array.concat(buildQueryJoins(rel)))
    for (const item of array) {
        if (!map.has(item.join)) {
            map.set(item.join, true);
            result.push({
                join: item.join,
                table: item.table
            });
        }
    }
    return result;
}

console.log(relationsToQueryBuilderJoins(relations))

