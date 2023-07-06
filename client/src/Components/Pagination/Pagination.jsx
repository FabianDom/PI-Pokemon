import React from "react";
import Styles from "./Pagination.module.css";

export default function Pagination({
  allPokemons,
  pokemonPage,
  pagination,
  currentPage,
}) {
  // total de paginas
  const totalPages = Math.ceil(allPokemons / pokemonPage);
  const numberPage = [];
  // páginas necesarias en base a la cantidad total de pokemons
  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPage); i++) {
    numberPage.push(i);
  }

  // Ajuste para mostrar los números de página de 5 en 5 en dispositivos móviles
  const mobileNumberPage =
    window.innerWidth <= 768
      ? numberPage.filter(
          (num) =>
            num === currentPage ||
            num === currentPage - 1 ||
            num === currentPage + 1 ||
            num === currentPage - 2 ||
            num === currentPage + 2
        )
      : numberPage;

  return (
    <div className={Styles.container}>
      <button
        onClick={() => pagination(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <ul>
        {mobileNumberPage &&
          mobileNumberPage.map((num) => {
            return (
              <li key={num}>
                <a
                  className={num === currentPage ? Styles.active : ""}
                  onClick={() => pagination(num)}
                >
                  {num}
                </a>
              </li>
            );
          })}
      </ul>
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
