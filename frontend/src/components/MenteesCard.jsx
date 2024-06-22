import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import './MenteesCard.css'; // Import custom CSS for additional styling

const MenteesCard = ({ mentee, onCheckboxChange, onViewMentee }) => {
  return (
    <Card className="fade-in text-center shadow-sm mentee-card">
      <Card.Img variant="top" src={mentee.photoLink} alt={`${mentee.name}'s profile`} className="mentee-card-img" />
      <Card.Body>
        <Card.Title>{mentee.name}</Card.Title>
        <Card.Text>Registration: {mentee.registrationNumber}</Card.Text>
        <Card.Text>Class: {mentee.class1}</Card.Text>
        <Card.Text>Phone: {mentee.phone}</Card.Text>
        <div>
        <Form.Check
          type="checkbox"
          label="Select"
          className="custom-checkbox"
          onChange={() => onCheckboxChange(mentee._id)}
        />
        
        <Button variant="primary" className="mt-2" onClick={() => onViewMentee(mentee._id)}>
          View Mentee
        </Button>
        </div>
  
      </Card.Body>
    </Card>
  );
};

export default MenteesCard;
