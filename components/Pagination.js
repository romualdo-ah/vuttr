import React from "react";
import styles from "../styles/Home.module.css";
import button_styles from "../styles/Buttons.module.css";

function Pagination({
  loadApiTools,
  fixedPageLinks,
  actualURL,
  links,
}) {
  return (
    <div className={[styles.paginationContainer, styles.grid].join(" ")}>
      
      <div
        onClick={() => {
          fixedPageLinks["prev"] != undefined &&
            loadApiTools(fixedPageLinks["prev"]);
        }}
        className={[
          button_styles.pagination_button,
          button_styles.external_button,
          !fixedPageLinks["prev"] ? button_styles.disabled : "",
        ].join(" ")}
      >
        <span className={button_styles.lessThan}>&lt; </span>
        Anterior
      </div>

      <div className={button_styles.inner_button_container}>
        {links.map((link, index) => {
         
          
          return (
            <div
              className={[
                button_styles.pagination_button,
                link[0] === actualURL ? button_styles.activated : "",
                button_styles.inner_button,
              ].join(" ")}
              key={"page_" + index}
              onClick={() => {loadApiTools(link[0])}}
            >
              {link[1]}
            </div>
          );
        })}
      </div>

     
      <div
        onClick={() => {
          fixedPageLinks["next"] && loadApiTools(fixedPageLinks["next"]);
        }}
        className={[
          button_styles.pagination_button,
          button_styles.external_button,
          !fixedPageLinks["next"] ? button_styles.disabled : "",
        ].join(" ")}
      >
        Próximo <span className={button_styles.greaterThan}>&gt;</span>
      </div>
    </div>
  );
}

export default Pagination;
