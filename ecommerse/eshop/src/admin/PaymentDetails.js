
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPaymentById, updatePayment } from '../api/paymentApi';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import AdminNavbar from './AdminNavbar'; 
const PaymentDetails = () => {
  const { id } = useParams();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const data = await getPaymentById(id);
        setPayment(data);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updatePayment(id, payment);
      alert('Payment updated successfully');
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <CircularProgress />;

  return (<><AdminNavbar/>
    <Container  style={{
                    backgroundColor: '#e1f5fe', 
                    padding: '2rem', 
                    borderRadius: '8px', 
                }}>
      <Typography variant="h4" gutterBottom>
        Payment Details
      </Typography>
      {payment && (
        <div>
          <TextField
            label="Amount"
            value={payment.amount}
            onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Status"
            value={payment.status}
            onChange={(e) => setPayment({ ...payment, status: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button onClick={handleUpdate} color="primary" variant="contained">
            Update Payment
          </Button>
        </div>
      )}
    </Container></>
  );
};

export default PaymentDetails;
