
import './Spinner.css'

export default function Spinner(){


    return <div id="spinner">
    {" "}
    <div className="lds-grid">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>{" "}
  </div>
}