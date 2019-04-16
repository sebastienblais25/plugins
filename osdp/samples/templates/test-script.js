function parser(data, lang) {
    return {
        Id: data[1].value,
        Category: data[2].value,
        Title: data[3].value,
        Prop: data[4].value,
        Province: data[5].value,
        Place: data[6].value,
        Publish: data[7].value,
        Website: data[8].value,
        Start: data[9].value
    };
}
