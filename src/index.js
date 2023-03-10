import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {logger} from "redux-logger/src";
import {rootReducer} from "./redux/rootReducer";
import {increment, decrement, asyncIncrement, changeTheme} from "./redux/actions";
import "./styles/styles.css";
import {composeWithDevTools} from "redux-devtools-extension";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

let store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk, logger),
    )

)

addBtn.addEventListener("click", () => {
    store.dispatch(increment())
});

subBtn.addEventListener("click", () => {
    store.dispatch(decrement())
});

asyncBtn.addEventListener("click", function () {
    store.dispatch(asyncIncrement())
});

themeBtn.addEventListener("click", function () {
    const newTheme = document.body.classList.contains('ligth')
        ? 'dark'
        : 'ligth'
    store.dispatch(changeTheme(newTheme))
});

store.subscribe(() => {
    const state = store.getState()

    counter.textContent = state.counter
    document.body.className = state.theme.value;

    [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn =>  {
        btn.disabled = state.theme.disabled
    })
})

store.dispatch({type: 'INIT_APPLICATION'})