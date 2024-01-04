import {PropTypes} from 'prop-types';

export default function CounterButton({by, incrementMethod, decrementMethod}) {

    // function incrementCounterFunction() {
    //     incrementMethod(by)
    // }

    // function decrementCounterFunction() {
    //     decrementMethod(by)
    // }

    return (
        <div className="Counter">
            <div>
                <button className="counterButton" 
                onClick={() => incrementMethod(by)}>
                    +{by}
                </button>
                <button className="counterButton" 
                onClick={() => decrementMethod(by)}>
                    -{by}
                </button>
            </div>
        </div>
    )
}

// 프로토타입 타입
CounterButton.propTypes = {
    by: PropTypes.number
}

// 프로토타입 기본값
CounterButton.defaultProps = {
    by: 1
}