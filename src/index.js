import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {rootReducer} from "./redux/rootReducer";
import {increment, decrement, asyncIncrement} from "./redux/actions";
import "./styles/styles.css";

const counter = document.getElementById("counter");
const addBtn = document.getElementById("add");
const subBtn = document.getElementById("sub");
const asyncBtn = document.getElementById("async");
const themeBtn = document.getElementById("theme");

function logger(state) {
    return function(next){
        return function (action){
            console.log('State:', state.getState())
            console.log('Action:', action)
            return next(action)
        }
    }
}

const store = createStore (
    rootReducer,
    0,
    applyMiddleware(thunk, logger)
)

addBtn.addEventListener("click", () => {
    store.dispatch(increment())
});

subBtn.addEventListener("click", () => {
    store.dispatch(decrement())
});

asyncBtn.addEventListener("click", function () {
    store.dispatch(asyncIncrement ())
});

store.subscribe(() => {
    const state = store.getState()
    counter.textContent = state
})

store.dispatch({type: 'INIT_APPLICATION'})

themeBtn.addEventListener("click", function () {
    // document.body.classList.toggle("dark");
});
