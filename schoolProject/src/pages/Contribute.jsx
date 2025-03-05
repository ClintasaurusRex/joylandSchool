import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { FaHeart, FaHandsHelping, FaCalendarAlt, FaDollarSign } from "react-icons/fa";
import "../styles/Contribute.scss";

const Contribute = () => {
  const [volunteerForm, setVolunteerForm] = useState({
    name: "",
    email: "",
    phone: "",
    interests: "",
    availability: "",
  });

  const [donationAmount, setDonationAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  const handleVolunteerChange = (e) => {
    const { name, value } = e.target;
    setVolunteerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    console.log("Volunteer form submitted:", volunteerForm);
    // Here you would typically send the form data to your backend
    setVolunteerForm({
      name: "",
      email: "",
      phone: "",
      interests: "",
      availability: "",
    });
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    const finalAmount = donationAmount === "custom" ? customAmount : donationAmount;
    console.log("Donation submitted:", finalAmount);
    // Here you would typically redirect to a payment processor
    setDonationAmount("");
    setCustomAmount("");
    setShowThankYou(true);
    setTimeout(() => setShowThankYou(false), 5000);
  };

  return (
    <Container className="contribute-container py-5">
      {showThankYou && (
        <Alert variant="success" onClose={() => setShowThankYou(false)} dismissible>
          Thank you for your support! Your contribution helps make Joyland School a better place.
        </Alert>
      )}

      <div className="text-center mb-5">
        <h1 className="display-4">Support Joyland School</h1>
        <p className="lead">
          Your contributions help us provide quality education and enriching experiences for our
          students.
        </p>
      </div>

      <Row className="mb-5">
        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                <FaHandsHelping className="icon-large text-primary" />
                <h2>Volunteer</h2>
                <p>Share your time and talents with our school community</p>
              </div>

              <div className="mb-4">
                <h4>Volunteer Opportunities</h4>
                <ul>
                  <li>Classroom Assistant</li>
                  <li>Library Helper</li>
                  <li>Event Planning Committee</li>
                  <li>Garden & Grounds Maintenance</li>
                  <li>Tutoring & Mentorship</li>
                  <li>Parent-Teacher Association</li>
                </ul>
              </div>

              <Form onSubmit={handleVolunteerSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={volunteerForm.name}
                    onChange={handleVolunteerChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={volunteerForm.email}
                    onChange={handleVolunteerChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={volunteerForm.phone}
                    onChange={handleVolunteerChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Areas of Interest</Form.Label>
                  <Form.Control
                    as="select"
                    name="interests"
                    value={volunteerForm.interests}
                    onChange={handleVolunteerChange}
                    required
                  >
                    <option value="">Select an option</option>
                    <option value="classroom">Classroom Assistant</option>
                    <option value="library">Library Helper</option>
                    <option value="events">Event Planning</option>
                    <option value="garden">Garden & Grounds</option>
                    <option value="tutoring">Tutoring & Mentorship</option>
                    <option value="pta">PTA</option>
                    <option value="other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>
                    Availability <FaCalendarAlt className="ms-1" />
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="availability"
                    placeholder="Please let us know when you're available to volunteer"
                    value={volunteerForm.availability}
                    onChange={handleVolunteerChange}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Submit Volunteer Application
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="text-center mb-4">
                <FaHeart className="icon-large text-danger" />
                <h2>Donate</h2>
                <p>Your financial support makes a difference</p>
              </div>

              <div className="mb-4">
                <h4>How Your Donation Helps</h4>
                <ul>
                  <li>Classroom supplies and learning materials</li>
                  <li>Technology upgrades</li>
                  <li>Scholarships for students in need</li>
                  <li>Field trips and enrichment activities</li>
                  <li>Teacher development programs</li>
                  <li>Campus improvement projects</li>
                </ul>
              </div>

              <Form onSubmit={handleDonationSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label>
                    Donation Amount <FaDollarSign className="ms-1" />
                  </Form.Label>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {["25", "50", "100", "250", "500", "custom"].map((amount) => (
                      <Button
                        key={amount}
                        variant={donationAmount === amount ? "primary" : "outline-primary"}
                        className="donation-btn"
                        onClick={() => setDonationAmount(amount)}
                      >
                        {amount === "custom" ? "Custom" : `$${amount}`}
                      </Button>
                    ))}
                  </div>

                  {donationAmount === "custom" && (
                    <Form.Control
                      type="number"
                      placeholder="Enter custom amount"
                      className="mb-3"
                      min="1"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      required
                    />
                  )}
                </Form.Group>

                <div className="mb-4">
                  <h5>Other Ways to Donate</h5>
                  <p>
                    In addition to online donations, we accept checks made payable to "Joyland
                    School Foundation" mailed to our address, or you can contact our Development
                    Office at (555) 123-4567 for information about planned giving and corporate
                    matching programs.
                  </p>
                </div>

                <Button
                  variant="success"
                  type="submit"
                  className="w-100"
                  disabled={!donationAmount || (donationAmount === "custom" && !customAmount)}
                >
                  Proceed to Donation
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="text-center mt-5 pt-3 border-top">
        <h3>Questions About Contributing?</h3>
        <p>
          Contact our Community Relations Office at <strong>(555) 123-4567</strong> or email us at{" "}
          <a href="mailto:contribute@joylandschool.org">contribute@joylandschool.org</a>
        </p>
      </div>
    </Container>
  );
};

export default Contribute;
