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
      console.log(res);
      setNextURL(res.next);
      setPrevURL(res.previous)
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  // 取得したデータをさらに展開（ネストが深い）
  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // 各ポケモンにアクセス、名前とURLが取り出せている状態になる。そのURLが欲しい。
        // pokemonの中のURLを渡して関数を実行
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  // console.log(pokemonData);

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setPrevURL(data.previpus);
    setLoading(false);
  }
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
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
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
