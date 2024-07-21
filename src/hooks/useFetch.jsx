/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useReducer } from "react";
const initialState = { data: [], status: "loading", secondsRemaining: null };

const reducer = (currState, action) => {
  switch (action.type) {
    case "success":
      return {
        ...currState,
        status: "success",
        data: action.payLoad,
      };
    case "error":
      return {
        ...currState,
        status: "error",
      };
    case "start":
      return {
        ...currState,
        status: "start",
        secondsRemaining: 300,
      };
    case "finish":
      return {
        ...currState,
        status: "finish",
      };
    case "reset":
      return {
        ...currState,
        status: "success",
      };

    case "tick":
      return {
        ...currState,
        secondsRemaining:
          currState.secondsRemaining > 0 ? currState.secondsRemaining - 1 : 0,
        status: currState.secondsRemaining === 0 ? "finish" : currState.status,
      };
    default:
      throw new Error("Invalid Action");
  }
};

export const useFetch = (src) => {
  const [{ data, status, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(src);
        if (!res.ok) throw new Error("Something Went Wrong");

        const data = await res.json();
        dispatch({ type: "success", payLoad: data });
      } catch (err) {
        dispatch({ type: "error" });
      }
    }

    fetchData();
  }, [src]);

  return [data, status, secondsRemaining, dispatch];
};
