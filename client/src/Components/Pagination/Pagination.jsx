import React from "react";

export default function Pagination({
  allPokemons,
  pokemonPage,
  pagination,
  currentPage,
}) {
  // total de paginas
  const totalPages = Math.ceil(allPokemons / pokemonPage);
  const numberPage = [];
  //  páginas necesarias en base a la cantidad total de pokemons
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPage); i++) {
    numberPage.push(i);
  }
  return (
    <div>
      <ul>
        {numberPage &&
          numberPage.map((num) => {
            return (
              <li key={num}>
                <button onClick={() => pagination(num)}>{num}</button>
              </li>
            );
          })}
      </ul>
      <button
        onClick={() => pagination(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={() =>
          pagination(currentPage < totalPages ? currentPage + 1 : totalPages)
        }
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
