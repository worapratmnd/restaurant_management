interface IRecipeStatus {
    key: string;
    value: string;
}
export const recipeStatus: IRecipeStatus[] = [
    {
        key: "A",
        value: "Available",
    },
    {
        key: "O",
        value: "Out of service",
    },
];

const recipeStatusMap = new Map();
recipeStatus.forEach((status) => {
    recipeStatusMap.set(status.key, status.value);
});

export const getRecipeStatusByKey = (key: string) => {
    return recipeStatusMap.get(key);
};
