const getUniqueValues = (items: string[]) => {
    return items.filter(
        (item, index) => {
            return items.indexOf(item) === index;
        }
    );
};

export default getUniqueValues;