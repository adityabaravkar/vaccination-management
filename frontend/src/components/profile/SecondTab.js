import React, {useEffect, useState} from "react";
import { getAppointment } from "../../util/APIUtils";
const SecondTab = () => {

    const [state, setstate] = useState("")

    useEffect(() => {
        getAppointment(state)
        .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log("Error");
          });
    }, [])
  return (
    <div className="SecondTab">
      <p>Second Tab!!</p>
      {/* First tab content will go here */}
    </div>
  );
};
export default SecondTab;