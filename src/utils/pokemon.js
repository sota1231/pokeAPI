

// ポケモンのデータをjson形式にして返すメソッド
export const getAllPokemon = (url) => {
  return new Promise((resolve, reject) => {
    // fetchを行うことでurl(パス)先のデータを取得することができる（多分）
    // そのデータをjson形式にしてdataという名前で返す
    fetch(url)
      .then((res) => res.json())
      .then((data) => resolve(data));
  });
};

// 上記で取得したデータをmapで回してその中に格納されているURLをさらにjsonにしてdataにして返す工程
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
