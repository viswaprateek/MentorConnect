import React from 'react'
import Card from 'react-bootstrap/Card';

function MenteeRemarkCard() {
    return (
        
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>*date*</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">*Venue*</Card.Subtitle>
            <Card.Text>
              *here comes the Remarks*
            </Card.Text>
          </Card.Body>
        </Card>
      );
}

export default MenteeRemarkCard;