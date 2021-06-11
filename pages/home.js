import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import TopBarInput from "../components/TopBarInput.js";

import { reducer, initialState } from "../reducers/toolReducer";

import styles from "../styles/Home.module.css";
import Pagination from "../components/Pagination";

const defaultUrl =
  "http://my-json-server.typicode.com/romualdo-ah/vuttr-json-server/";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);
  const numberOfElementsPerPage = 9;
  const [totalCount, setTotalCount] = useState(0);
  const [actualURL, setActualURL] = useState("");

  //could have first, prev, next and last api links pages.
  const [fixedPageLinks,setFixedPageLinks]= useState([])
  const [innerPageLinks, setLinks] = useState([]);

  useEffect(() => {
    if (state.tools.length === 0) {
      const firstUrl =
        defaultUrl +
        `tools?_limit=${numberOfElementsPerPage}&_page=${currentPage}`;

      loadApiTools(firstUrl);
    }
  }, [state.searchingByTag]);

  const handleSpace = (e) => {
    const keyCode = e.which || e.keyCode;
    keyCode === 27 && showModal(false, null, false);
  };

  const loadApiTools = (url) => {

    if (url !== actualURL)
      axios.get(url).then((response) => {
        setActualURL(url);
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        getLinks(response.headers);
      });
  };

  const getLinks = (headers) => {
    const innerPageLinks = headers["link"];
    const _totalCount = headers["x-total-count"];

    // console.log(headers);

    setTotalCount(_totalCount);
    const _numberOfPages = Math.ceil(_totalCount / numberOfElementsPerPage);
    // console.log(_numberOfPages);

    let _links = [];
    for (let i = 1; i <= _numberOfPages; i++) {
      _links.push([
        defaultUrl + `tools?_limit=${numberOfElementsPerPage}&_page=${i}`,
        i,
      ]);
    }
    // console.log(_links);
    const header_links = Object.fromEntries(
      innerPageLinks.split(",").map((link) => {
        const pair = link.replace("<", "").replace(">", "").trim().split(";");
        pair[1] = pair[1].replace("rel=", "").replaceAll('"', "").trim();

        return pair.reverse();
      })
    );

    // console.log("header_links", header_links);
    setFixedPageLinks(header_links);
 
    setLinks(_links);
  };

  const showModal = (isAdding, id, shouldShowModal) => {
    dispatch({
      type: "TOGGLE_MODAL",
      payload: { isAdding, id, shouldShowModal },
    });
  };

  const removeTool = (id) => {
    axios.delete(`/${id}`).then(() => {
      const newTools = state.tools.filter((tool) => tool.id !== id);
      dispatch({ type: "REMOVE_SUCCESS", payload: newTools });
    });
  };

  const addTool = (newTool) => {
    axios.post(defaultUrl, newTool).then((response) => {
      dispatch({ type: "ADD_SUCCESS", payload: response.data });
    });
  };

  const toggleSearchByTag = (searchingByTag) => {
    dispatch({ type: "TOGGLE_SEARCH_BY_TAG", payload: { searchingByTag } });
  };

  const search = (searchTerm) => {
    const searchingByTag = state.searchingByTag;
    let url_query = "";
    const global_query = `?q=`;
    const tag_query = `?tags_like=`;
    if (searchTerm) {
      const query = `${searchingByTag ? tag_query : global_query}${searchTerm}`;
      url_query = `${defaultUrl}${query}`;
    }

    axios.get(url_query).then((response) => {
      dispatch({
        type: "SEARCH_SUCCESS",
        payload: { searchTerm, tools: response.data },
      });
    });
  };

  return (
    <main className={styles.main}>
      <Hero />
      <div className={styles.grid}>
        <TopBarInput
          {...{
            state,
            showModal,
            search,
            toggleSearchByTag,
          }}
        />

        {state.loading ? (
          <Spinner />
        ) : (
          <div className={styles.cardList}>
            {<Modal {...{ state, addTool, removeTool, showModal }} />}

            {state.tools.map((tool) => (
              <Card
                key={tool.id}
                {...{
                  tool,
                  state,
                  search,
                  showModal,
                  toggleSearchByTag,
                }}
              />
            ))}
            <Pagination
              loadApiTools={loadApiTools}
              innerPageLinks={innerPageLinks}
              actualURL={actualURL}
              fixedPageLinks={fixedPageLinks}
              links={innerPageLinks}
            />
          </div>
        )}
      </div>
    </main>
  );
}
