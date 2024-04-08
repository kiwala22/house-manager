import { useParams } from "react-router-dom";

const PropertyDetails = () => {
  const params = useParams();
  return (
    <div>detail : {params.propertyId}</div>
  )
}

export default PropertyDetails;