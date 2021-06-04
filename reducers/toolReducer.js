export const initialState = {
  //global state
  loading: true,

  //modal states
  shouldShowModal: false,
  isAdding: false,

  // search states
  searchingByTag: false,
  searchTerm: "",
  tools: new Array(),

  //add, delete tool
  tool: {
    id: null,
    title: "",
    description: "",
    link: "",
    tags: new Array(),
  },
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
 
      return {
        ...state,
        loading: false,
        shouldShowModal: false,
        tools: action.payload,
      };
    case "SEARCH_SUCCESS":
      return {
        ...state,
        tools: action.payload.tools,
        searchTerm: action.payload.searchTerm,
      };
    case "ADD_SUCCESS":
      return {
        ...state,
        loading: false,
        shouldShowModal: false,
        tools: [...state.tools, action.payload],
      };
    case "REMOVE_SUCCESS":
      return {
        ...state,
        loading: false,
        shouldShowModal: false,
        tools: action.payload,
      };

    case "TOGGLE_SEARCH_BY_TAG":
      return {
        ...state,
        searchingByTag: action.payload.searchingByTag,
      };

    case "TOGGLE_MODAL":
      return {
        ...state,
        shouldShowModal: action.payload.shouldShowModal,
        isAdding: action.payload.isAdding,
        tool: state.tools.filter((t) => t.id === action.payload.id),
        id: action.payload.id,
      };
    default:
      return state;
  }
};
