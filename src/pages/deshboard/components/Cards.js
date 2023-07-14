import Card from 'react-bootstrap/Card';

const Cards = ({data , className} ) => {
  return <Card className={className} >
    <Card.Body>{data.business_name}</Card.Body>
   <Card.Body>{data.street}</Card.Body>
   <Card.Body>{data.phone}</Card.Body>
  </Card>
}

export default Cards;