import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
const ShowTransactions = () => {
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    const response = await axios.get('http://localhost:5000/api/alltransactions');
    setData(response.data);
    console.log(data);
  };
  useEffect(() => {
    fetchdata();
  }, []);
  function formatUnixTimestamp(unixTimestamp) {
    const date = new Date(unixTimestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
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
  );
};

export default ShowTransactions;
