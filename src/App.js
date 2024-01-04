import './App.css';
// import Counter from './components/counter/Counter.jsx'
import TodoApp from './components/todo/TodoApp.jsx'


function App() {
  return (
    <div className="App">
      {/* <PlayingWithProps property1="1" property2="2"/> */}
      {/* <Counter /> */}
      <TodoApp />
    </div>
  );
}

// function PlayingWithProps(properties) {
//   console.log(properties)
//   console.log(properties.property1)

//   return (
//     <div>Props</div>
//   )
// }


export default App;
