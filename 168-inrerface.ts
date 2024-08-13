interface resonse {
  id: string;
  age: number;
  sex: string;
}

function myaxios<resonse>(id, age, sex) {}
myaxios(1, 2, 3);
const modal = <response>(id, age, sex) => {
  return {
    id: id,
    age: age,
    sex: sex,
  };
};
modal(1, 2, 3);
