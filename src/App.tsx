import Converter from "./components/Converter"
import React, {useEffect} from "react";
import {getData, supportedCodes} from "./store/converter.thunk";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import Errors from "./components/Errors";

const App = () => {
    const dispatch = useAppDispatch()
    const {base_code, error, error_history} = useAppSelector(state => state.converterState)
    useEffect(() => {
        dispatch(supportedCodes())
    }, []);
    useEffect(() => {
        dispatch(getData(base_code))
    }, [base_code])
    return (
      <div className={'app'}>
        <div className="container">
            <Errors>
                {error && <p>{error}</p>}
                {error_history && <p>{error_history}</p>}
            </Errors>
            <Converter />
        </div>
      </div>
  )
}

export default App