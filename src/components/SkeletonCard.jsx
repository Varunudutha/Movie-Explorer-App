import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const SkeletonCard = () => {
    return (
        <Card style={{ minHeight: '300px', backgroundColor: '#222' }} className="h-100 border-0">
            <div style={{ aspectRatio: '2/3', backgroundColor: '#333' }} className="w-100 placeholder-wave">
                <span className="placeholder w-100 h-100"></span>
            </div>
            <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={8} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} />
                    <Placeholder xs={6} />
                </Placeholder>
            </Card.Body>
        </Card>
    );
};

export default SkeletonCard;
