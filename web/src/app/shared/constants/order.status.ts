interface IOrderStatus {
    key: string;
    value: string;
}
export const orderStatus: IOrderStatus[] = [
    {
        key: "O",
        value: "Ordered",
    },
    {
        key: "P",
        value: "Wait for payment",
    },
    {
        key: "Z",
        value: "Completed",
    },
    {
        key: "C",
        value: "Cancel",
    },
];

const orderStatusMap = new Map();
orderStatus.forEach((status) => {
    orderStatusMap.set(status.key, status.value);
});

export const getOrderStatusByKey = (key: string) => {
    return orderStatusMap.get(key);
};
