import Navbar from '../NavBar';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import '../../index.css';
import { useState } from 'react';

const Home = () => {

    const [bookedInfoModalShow, setbookedInfoModalShow] = useState(false);
    const [slotFullInfoModalShow, setslotFullInfoModalShow] = useState(false);
    const [unbookedInfoModalShow, setunbookedInfoModalShow] = useState(false);
    const [bookedSlotInformation, setbookedSlotInformation] = useState([]);
    const [SlotFullInformation, setSlotFullInformation] = useState();
    const [unbookedSlotInformation, setunbookedSlotInformation] = useState([]);

    const bookingHandle = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8000/node/api/v1/vehicle/book')
        .then((response) => {
            if(response.data.response === true) {
                setbookedSlotInformation(response.data.data);
                setbookedInfoModalShow(true);
            }
            else if(response.data.response === false) {
              setSlotFullInformation(response.data.data);
              setslotFullInfoModalShow(true);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const unbookingHandle = (event) => {
        event.preventDefault();
        axios.get('http://localhost:8000/node/api/v1/vehicle/unbook')
        .then((response) => {
          // console.log(response.data.data);
            if(response.data.response === true) {
                console.log(response.data.data);
                setunbookedSlotInformation(response.data.data);
                setunbookedInfoModalShow(true);
            }
            else {
                setunbookedInfoModalShow(false);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    return(
        <div className="App">
            <Navbar />

            <Modal
              bsStyle="primary"
              style={{ opacity: 1 }}
              fade
              backdrop="static"
              keyboard={false}
              animation
              show={slotFullInfoModalShow}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter"><h4>Slot Status</h4></Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>{SlotFullInformation}</h4>
              </Modal.Body>
              <Modal.Footer>
                <Button style={{
                  color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '10px', fontSize: '15px', fontWeight: 'bold', alignItems: 'left',
                }} onClick={()=>{setslotFullInfoModalShow(false);}}>Okay!</Button>
              </Modal.Footer>
            </Modal>


            <Modal
            bsStyle="primary"
            style={{ opacity: 1 }}
            fade
            backdrop="static"
            keyboard={false}
            animation
            show={bookedInfoModalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <ModalHeader>
              <ModalTitle id="contained-modal-title-vcenter">
                <h4>Inward Parking Slot Details</h4>
                <h5>Hurray! Your parking slot is on its calibration!!!</h5>
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <table>
                <tbody>
                  <tr>
                    <th>Parking Slot Number</th>
                    <td>{bookedSlotInformation.parkingSlotNumber}</td>
                  </tr>
                  <tr>
                    <th>Vehicle Number</th>
                    <td style={{color:"red", fontWeight:"bolder", fontSize:"25px"}}>{bookedSlotInformation.vehicleNumber}</td>
                  </tr>
                  <tr>
                    <th>Inward Time</th>
                    <td>{bookedSlotInformation.inTime}</td>
                  </tr>
                  <tr>
                    <th>Booking status</th>
                    <td style={{color:"green", fontWeight:"bolder", fontSize:"20px"}}>Booked</td>
                  </tr>
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <Button
                style={{
                  color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '10px', fontSize: '15px', fontWeight: 'bold', alignItems: 'left',
                }}
                onClick={() => { setbookedInfoModalShow(false); }}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>

          <Modal
            bsStyle="primary"
            style={{ opacity: 1 }}
            fade
            backdrop="static"
            keyboard={false}
            animation
            show={unbookedInfoModalShow}
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >

            <ModalHeader>
              <ModalTitle id="contained-modal-title-vcenter">
                <h4>Outward Parked Vehicle Details</h4>
                <h5>Hope you had a great time! <br /> Thank you for choosing us!!</h5>
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              <table>
                <tbody>
                <tr>
                    <th>Parking Slot Number</th>
                    <td>{unbookedSlotInformation.parkingSlotNumber}</td>
                  </tr>
                  <tr>
                    <th>Vehicle Number</th>
                    <td style={{color:"red", fontWeight:"bolder", fontSize:"25px"}}>{unbookedSlotInformation.vehicleNumber}</td>
                  </tr>
                  <tr>
                    <th>Inward Time</th>
                    <td>{unbookedSlotInformation.inTime}</td>
                  </tr>
                  <tr>
                    <th>Outward Time</th>
                    <td>{unbookedSlotInformation.outTime}</td>
                  </tr>
                  <tr>
                    <th>Total Payable Amount</th>
                    <td style={{color:"green", fontWeight:"bolder", fontSize:"20px"}}>₹ {unbookedSlotInformation.totalPayable}</td>
                  </tr>
                </tbody>
              </table>
            </ModalBody>
            <ModalFooter>
              <Button
                style={{
                  color: 'white', backgroundColor: '#f1356d', borderRadius: '8px', padding: '20px', fontSize: '15px', fontWeight: 'bold', alignItems: 'left',
                }}
                onClick={() => { setunbookedInfoModalShow(false); }}
              >
                Close
              </Button>
            </ModalFooter>
          </Modal>


            <div className="content">
                <table>
                <tr>
                    <tr>
                    <td><Button type="button" onClick={bookingHandle} className="inTime">In</Button></td>
                    </tr>
                    
                    <td><Button type="button" onClick={unbookingHandle} className="outTime">Out</Button></td>
                </tr>
                </table>
            </div>
        </div>
    );
};

export default Home;

