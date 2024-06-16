export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    //
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

export const getPokemon = (url) => {
  return new Promise((resolve, reject) => {
    //promiseチェーンのthenでつなげる
    // urlをresに入れてjson化させる
    // さらにそれをdataという名前で受け取り、resolveにして返す・
    // url先のデータをjson形式にして返すメソッド
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        resolve(data);
      });
  });
};
