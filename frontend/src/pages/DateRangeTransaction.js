import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Input
} from '@chakra-ui/react';
function DateRangeTransaction() {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(''); // Set the start date
  const [endDate, setEndDate] = useState(''); // Set the end date

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/daterange?start=${startDate}&end=${endDate}`);
      if (response.status < 200 || response.status >= 300) {
        throw new Error('Network response was not ok');
      }
      setData(response.data);
      setStartDate(startDate);
      setEndDate(endDate);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  function formatUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  useEffect(() => {
    if (startDate && endDate) {
      fetchData();
    }
  }, [startDate, endDate]);

  return (
    <div>
      <Container>
        <h1>Data Within Date Range</h1>
        <label>
          Start Date: <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date: <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </label>
      </Container>

      <TableContainer>
        <Table variant="striped" colorScheme="teal">
          <TableCaption>Your Transactions</TableCaption>
          <Thead>
            <Tr>
              <Th>Date</Th>
              <Th>Description</Th>
              <Th>Credit</Th>
              <Th>Debit</Th>
              <Th>Balance</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, index) => (
              <Tr key={index}>
                <Td>{formatUnixTimestamp(row.Date)}</Td>
                <Td>{row.Description}</Td>
                <Td>{row.Credit}</Td>
                <Td>{row.Debit}</Td>
                <Td>{row.Balance}</Td>
              </Tr>
            ))}
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>End of Transactions</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </div>
  );
}

export default DateRangeTransaction;
