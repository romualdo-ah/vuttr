import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Modal from "../components/Modal";
import Spinner from "../components/Spinner";
import TopBarInput from "../components/TopBarInput.js";

import { reducer, initialState } from "../reducers/toolReducer";

import styles from "../styles/Home.module.css";

const default_url = "http://localhost:3000/tools";
axios.defaults.baseURL = default_url;

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [tools, setTools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfElementsPerPage = 5;

  const getElementsOfCurrentPage = () => {
    const elements = state.tools.slice(
      numberOfElementsPerPage * (currentPage - 1),
      numberOfElementsPerPage * currentPage
    );
      setTools(elements)
    console.log(elements);
  };

  useEffect(() => {
    if (state.tools.length === 0) {
      axios
        .get(default_url)
        .then((response) => {
          dispatch({ type: "FETCH_SUCCESS", payload: response.data });
        })
        .then(setTools(getElementsOfCurrentPage()));
    }
  }, [state.searchingByTag]);

  const handleSpace = (e) => {
    const keyCode = e.which || e.keyCode;
    keyCode === 27 && showModal(false, null, false);
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
    axios.post(default_url, newTool).then((response) => {
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
      url_query = `${default_url}${query}`;
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
          </div>
        )}
      </div>
    </main>
  );
}
