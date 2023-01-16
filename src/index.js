import {createStore} from 'redux';
import {rootReducer} from "./redux/rootReducer";
import "./styles/styles.css";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

const store = createStore(rootReducer, 0)

addBtn.addEventListener("click", () => {
    store.dispatch({type:'INCREMENT'})
});

subBtn.addEventListener("click", () => {
    store.dispatch({type:'DECREMENT'})
});

asyncBtn.addEventListener("click", function () {

});

store.subscribe(() => {
    const state = store.getState()

    counter.textContent = state
})

store.dispatch({type: 'INIT_APPLICATION'})

themeBtn.addEventListener("click", function () {
    // document.body.classList.toggle("dark");
});
