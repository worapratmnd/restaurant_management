interface ITableStatus {
  key: string;
  value: string;
}
export const tableStatus: ITableStatus[] = [
  {
    key: "A",
    value: "Available",
  },
  {
    key: "R",
    value: "Reserved",
  },
  {
    key: "O",
    value: "Out of service",
  },
];

const tableStatusMap = new Map();
tableStatus.forEach((status) => {
  tableStatusMap.set(status.key, status.value);
});

export const getTableStatusByKey = (key: string) => {
  return tableStatusMap.get(key);
};
