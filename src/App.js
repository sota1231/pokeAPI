import { useEffect, useState } from "react";
import "./App.css";
import { getAllPokemon, getPokemon } from "./utils/pokemon.js";
import Card from "./components/Card/Card.js";
import Navbar from "./components/Navbar/Navbar.js";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState('');
  const [prevURL, setPrevURL] = useState('');

  // ブラウザを読み込んだ時に実行してほしいuseEffect
  // 一回だけ呼び出してほしいから第二引数は空
  useEffect(() => {
    const fetchPokemonData = async () => {
      // すべてのポケモンデータを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);

      // 状態変数の更新
      setNextURL(res.next);
      setPrevURL(res.previous)
      setLoading(false);
    };
    // 上記の関数を実行
    fetchPokemonData();
  }, []);

  // 上記の関数内の関数
  // 取得したデータをさらに展開（２回目）
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // 各ポケモンにアクセス、名前とURLが取り出せている状態になる。そのURLが欲しい。
        // pokemonの中のURLを渡して関数を実行
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    
    // _pokemonDataをpokemonデータに格納して関数外でも使えるようにする
    // 最後表示するときに使う
    setPokemonData(_pokemonData);
  };

  // 次へボタン
  const handleNextPage = async () => {
    setLoading(true);

    // すべてのポケモンデータを取得し、詳細データを取得
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);

    // 状態変数を更新
    setNextURL(data.next);
    setPrevURL(data.previpus);
    setLoading(false);
  }

  // 前へボタン
  const handlePrevPage = async () => {
    if(!prevURL) return;
    setLoading(true);
    let data = await getAllPokemon(prevURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previpus);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">

        {/* loadingがtrueの時ロード中を表示 */}
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {/* useEffectで取得した詳細データを状態変数に格納してここでさらにmapで詳細データを取得する */}
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="btn">
              <button onClick={handlePrevPage} >前へ</button>
              <button onClick={handleNextPage}>後へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
