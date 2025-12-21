import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';
import { FaStar, FaSortAmountDown } from 'react-icons/fa';

const ReviewHeader = ({ stats, sortBy, setSortBy }) => {
    return (
        <div className="mb-5 fade-in-up">
            <Row className="align-items-end">
                <Col md={8}>
                    <h3 className="mb-2 d-flex align-items-center gap-2 fw-bold">
                        User Reviews
                        <span className="badge bg-danger rounded-pill fs-6 ms-2" style={{ verticalAlign: 'middle' }}>
                            {stats.total}
                        </span>
                    </h3>
                    <p className="text-secondary mb-0">
                        See what the community is saying about this movie.
                    </p>
                </Col>

                <Col md={4} className="d-flex justify-content-md-end align-items-center gap-3 mt-3 mt-md-0">
                    {/* Big Rating Badge */}
                    <div className="d-flex align-items-center gap-2 p-2 px-3 rounded-pill glass-card">
                        <FaStar className="text-warning fs-4" />
                        <span className="fs-3 fw-bold lh-1">{stats.average}</span>
                        <span className="text-muted small">/ 5</span>
                    </div>

                    {/* Sort Dropdown */}
                    <Dropdown onSelect={(k) => setSortBy(k)}>
                        <Dropdown.Toggle
                            variant="link"
                            id="sort-dropdown"
                            className="text-secondary text-decoration-none d-flex align-items-center gap-2 p-0 border-0"
                        >
                            <FaSortAmountDown /> {sortBy.charAt(0).toUpperCase() + sortBy.slice(1)}
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="glass-card border-0 shadow-lg">
                            <Dropdown.Item eventKey="newest" active={sortBy === 'newest'}>Newest First</Dropdown.Item>
                            <Dropdown.Item eventKey="oldest" active={sortBy === 'oldest'}>Oldest First</Dropdown.Item>
                            <Dropdown.Item eventKey="highest" active={sortBy === 'highest'}>Highest Rated</Dropdown.Item>
                            <Dropdown.Item eventKey="lowest" active={sortBy === 'lowest'}>Lowest Rated</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <hr className="border-secondary opacity-25 mt-4" />
        </div>
    );
};

export default ReviewHeader;
