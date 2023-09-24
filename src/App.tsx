import Converter from "./components/converter/Converter"
import {useEffect} from "react";
import {getData, supportedCodes} from "./store/converter.thunk";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";

const App = () => {
    const dispatch = useAppDispatch()
    const base_code = useAppSelector(state => state.converterState.base_code)
    useEffect(() => {
        dispatch(supportedCodes())
    }, []);
    useEffect(() => {
        dispatch(getData(base_code))
    }, [base_code])
  return (
      <div className={'app'}>
        <div className="container">
            <Converter />
        </div>
      </div>
  )
}

export default App