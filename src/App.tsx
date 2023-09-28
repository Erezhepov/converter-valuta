import Converter from "./components/converter/Converter"
import {useEffect} from "react";
import {getData, supportedCodes} from "./store/converter.thunk";
import {useAppDispatch, useAppSelector} from "./hooks/hooks";
import Error from "./components/Error";

const App = () => {
    const dispatch = useAppDispatch()
    const {base_code, error} = useAppSelector(state => state.converterState)
    useEffect(() => {
        dispatch(supportedCodes())
    }, []);
    useEffect(() => {
        dispatch(getData(base_code))
    }, [base_code])
  return (
      <div className={'app'}>
        <div className="container">
            {error && <Error text={error} />}
            <Converter />
        </div>
      </div>
  )
}

export default App