import { useReducer, useState } from "react";






var largeList = new Array(9000000).fill(0).map((_, i) => {
    return {
        "data": i,
        "isSelected": i === 8999999
    }
})

var formState = {
    "Name": '',
    "Password": '',
    "Age": '',
    "errors": {}
}

const reducer = (state, action) => {
    switch (action.Type) {
        case 'SET_FIELD':
            if (action.value === '') {
                return {
                    ...state,
                    [action.field]: action.value,
                    "errors": {
                        ...state.errors,
                        [action.field]: ""
                    }
                };
            }
            return { ...state, [action.field]: action.value, "errors": {
                        ...state.errors,
                        [action.field]: "Value cannot be empty"
                    } };
        case 'SET_ERROR':
            return { ...state, "errors": { ...state.errors, [action.field]: action.error } };

        case 'RESET_FORM':
            return {
                ...state,
                "Name": '',
                "Password": '',
                "Age": '',
                "errors": {}
            };
        default:
            return state;
    }
}

function Hooks() {
    const [count, setCount] = useState(0)


    const [state, dispatch] = useReducer(reducer, formState);

    // useEffect(() => {
    //     // console.log("Inside Effect")
    //     const clear = setInterval(() => {
    //         //console.log(count);  // Logs the previous state value
    //         setCount(prevCount => prevCount + 1);
    //     }, 10000);

    //     // Cleanup function to clear the interval when the component unmounts
    //     return () => clearInterval(clear);
    // }, [count]); // This ensures the effect runs only once, on mount

    // useEffect(()=>{
    //     largeList = [{ "data": 4, "isSelected": true }, ...largeList];
    // }, [count])


    // const selectedValue = useMemo(()=>{
    //     return largeList.find((data) => data.isSelected)
    // }, [largeList])

    const handleChange = (e) => {
        console.log(e.target);
        const { name, value } = e.target;
        console.log(name, value)
        dispatch({ "Type": "SET_FIELD", "field": name, value })
    }

    const handleOnsubmit = (e) => {
        e.preventDefault()
        console.log(state)
    }

    return (<>


        <button onClick={() => { setCount(count + 1) }}>Increment</button>
        <button onClick={() => { setCount(count - 1) }}>Decrement</button>



        <form onSubmit={handleOnsubmit}>
            <label htmlFor="">Name</label>
            <input
                type="text"
                name="Name"
                id=""
                value={state.Name}
                onChange={handleChange}
            />
            {state.errors?.Name && <p> {state.errors.Name} </p>}

            <label htmlFor="">Password</label>
            <input
                type="text"
                name="Password"
                value={state.Password}
                onChange={handleChange}
            />

            <label htmlFor="">Age</label>
            <input
                type="text"
                name="Age"
                value={state.Age}
                onChange={handleChange}
            />

            <input type="submit" />
        </form>


        ghgh <p>{state.Name}</p>
        <p>{state.Password}</p>
        <p>{state.Age}</p>






    </>)
}


export default Hooks;