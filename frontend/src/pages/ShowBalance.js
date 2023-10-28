import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Container } from '@chakra-ui/react';
function ShowBalance() {
  const [data, setData] = useState([]);
  const [balance_date, setBalance_date] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/balance?date=${balance_date}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok');
      }
      const { balance } = response.data;
      setData(balance);
      setBalance_date(balance_date);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    if (balance_date) {
      fetchData();
    }
  }, [balance_date]);

  return (
    <Container>
      <div>
        <h1>Show Balance as on</h1>
        <label>
          <Input type="date" onChange={(e) => setBalance_date(e.target.value)} />
        </label>
      </div>
      <div>{data}</div>
    </Container>
  );
}

export default ShowBalance;
