// AdminUsers page for user management in the CMS
"use client";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "../global.css";
import "./adminscreens.css";

export default function AdminUsers() {
  // Sample user data
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      role: "Admin",
      active: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      role: "Editor",
      active: true,
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      role: "Viewer",
      active: false,
    },
  ]);

  // State for managing modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // New user state
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "Viewer",
    active: true,
  });

  // Handle opening the create user modal
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  // Handle closing the create user modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNewUser({ name: "", email: "", role: "Viewer", active: true });
  };

  // Handle opening the edit modal for selected user
  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Handle closing the edit modal
  const handleCloseEditModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
  };

  // Handle creating a new user
  const handleCreateUser = () => {
    const newUserData = { ...newUser, id: users.length + 1 };
    setUsers([...users, newUserData]);
    handleCloseCreateModal();
  };

  // Handle deleting a user
  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div>
      <Container className="my-4">
        <h1>Manage Users</h1>
        <Row className="mt-4">
          {/* Search bar */}
          <Col xs={12} sm={12} md={4} lg={3}>
            <h5>Search Users</h5>
            <div className="CMSHeaderControlGroup">
              <Form className="d-flex">
                <Form.Group controlId="searchUser" className="flex-grow-1 me-2">
                  <Form.Control
                    type="text"
                    placeholder="Search for a user..."
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </Form>
            </div>
          </Col>

          {/* Create user button */}
          <Col xs={12} sm={12} md={4} lg={3}>
            <h5>Add New User</h5>
            <div className="CMSHeaderControlGroup">
              <Button variant="primary" onClick={handleOpenCreateModal}>
                Create User
              </Button>
            </div>
          </Col>
          <div className="ASNspliiter mt-3 mb-5"></div>
        </Row>

        {/* User Cards */}
        <Row>
          {users.map((user) => (
            <Col xs={12} sm={12} md={6} lg={3} key={user.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <Card.Text className="mb-0">
                    <strong>Email: </strong> {user.email}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    <strong>Role: </strong> {user.role}
                  </Card.Text>
                  <Card.Text className="mb-3">
                    <strong>Status: </strong>
                    {user.active ? "Active" : "Inactive"}
                  </Card.Text>

                  {/* Edit and Delete buttons */}
                  <Button
                    variant="dark"
                    className="d-block w-100 mb-2"
                    onClick={() => handleOpenEditModal(user)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="d-block w-100"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for creating new user */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="newUserName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="newUserEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group controlId="newUserRole" className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={newUser.role}
                onChange={(e) =>
                  setNewUser({ ...newUser, role: e.target.value })
                }
              >
                <option>Viewer</option>
                <option>Editor</option>
                <option>Admin</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="newUserStatus" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Active"
                checked={newUser.active}
                onChange={(e) =>
                  setNewUser({ ...newUser, active: e.target.checked })
                }
              />
            </Form.Group>

            <Button variant="primary" onClick={handleCreateUser}>
              Create User
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for editing user */}
      {selectedUser && (
        <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Edit User: {selectedUser.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="editUserName" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, name: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="editUserEmail" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  defaultValue={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, email: e.target.value })
                  }
                />
              </Form.Group>

              <Form.Group controlId="editUserRole" className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  defaultValue={selectedUser.role}
                  onChange={(e) =>
                    setSelectedUser({ ...selectedUser, role: e.target.value })
                  }
                >
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Admin</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="editUserStatus" className="mb-3">
                <Form.Check
                  type="checkbox"
                  label="Active"
                  defaultChecked={selectedUser.active}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      active: e.target.checked,
                    })
                  }
                />
              </Form.Group>

              <Button variant="primary" onClick={handleCloseEditModal}>
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
