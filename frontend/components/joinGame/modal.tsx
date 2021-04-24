import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { Col, Container, Jumbotron, Form, Row, Modal } from 'react-bootstrap';
import Link from 'next/link';
import axios from 'axios';
import styles from './modal.module.scss';
import { useAuth } from 'hooks/auth';

const NativeInput = ({ label, value, onChange, onBlur, onFocus }) => (
    <label className="k-form-field">
      <span>{label}</span>
      <input
        className="k-textbox"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </label>
  );
export const JoinModal = (props) => {

  const router = useRouter();
  const [room, setRoom] = useState('');
  const [name, setName] = useState(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if(user){
      setName(user.displayName);
    }
  },[user]);

  const handleChangeName = (e) => {
    setName(e.target.value);
    if(user){
      (async () => {
        try {
            await user.updateProfile({
                  displayName: name
                });
        } catch (err) {
            console.error(err.message);
        }
      })();
    }
  };
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <Modal.Header
        closeButton
        className={`show-grid ${styles['browse-body']}`}>
        <Modal.Title className={`${styles['browse-title']}`}>
          Join Game
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className={`show-grid ${styles['browse-body']}`}>
        <Container>
            <Form>
            <Form.Group>
                    <Form.Label className={styles.label}>
                        Name
                    </Form.Label>
                    <Form.Control
                        className= {`form-control ${styles[""]}`}
                        type="text"
                        placeholder="Type here"
                        defaultValue = {name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label className={styles.label}>
                        Room ID
                    </Form.Label>
                    <Form.Control
                        className="form-control"
                        type="number" 
                        min="0" 
                        step="1"
                        placeholder="Type here"
                        onChange={(e) => setRoom(e.target.value)}
                    />
                </Form.Group>
                <button type="button" className="btn btn-primary" onClick={() => {router.push(`/player/${room}/wait`)}}>
                      Join Room
                </button>


                
            </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default JoinModal;