import FirstComponent from './FistComponent.jsx'
import {FifthComponent} from './FistComponent.jsx'
import SecondComponent from './SecondComponent.jsx'
import ThirdComponent from './ThirdComponent.jsx'
import FourthComponent from './FourthComponent.jsx'
import LearningJavaScript from './LearningJavaScript.jsx'

export default function App() {
    return (
      <div className="App">
        <FirstComponent />
        <SecondComponent></SecondComponent>
        <ThirdComponent></ThirdComponent>
        <FourthComponent></FourthComponent>
        <FifthComponent />
        <LearningJavaScript />
      </div>
    );
  }
