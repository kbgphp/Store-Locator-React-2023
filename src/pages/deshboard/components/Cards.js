import Card from 'react-bootstrap/Card';

const Cards = ({ data, className }) => {
  return <Card className={className} >
    <Card.Body style={{ paddingLeft: "100px" }}>
      <h6 style={{ fontWeight: "800", color: "#565b61" }}>{data.business_name}</h6>
      <p style={{margin:'0' }}>{data.street}</p>
      <p style={{ margin: "0" }}> {data.phone} </p>
    </Card.Body>
  </Card>
}

export default Cards;