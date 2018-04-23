import axios from "axios";

export function getCards(limit = 3, start = 0, cards = "") {
  const request = axios
    .get(`/api/recommendations?limit=${limit}&skip=${start}`)
    .then(response => {
      if (cards) {
        return [...cards, ...response.data];
      } else {
        return response.data;
      }
    });

  return {
    type: "SET_CARDS",
    payload: request
  };
}

export function showDescription(showDesc) {
  return {
    type: "SHOW_DESCRIPTION",
    payload: !showDesc
  };
}

export function addToAccepted(id, status) {
  const request = axios
    .put(`/api/recommendations/${id}/${status}`)
    .then(response => response.data);

  return {
    type: "ADD_TO_ACCEPTED",
    payload: request
  };
}

export function addToRejected(id, status) {
  const request = axios
    .put(`/api/recommendations/${id}/${status}`)
    .then(response => response.data);

  return {
    type: "ADD_TO_REJECTED",
    payload: request
  };
}
