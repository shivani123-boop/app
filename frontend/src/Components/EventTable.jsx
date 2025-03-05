import React from "react";
import { Link } from 'react-router-dom';

function EventTable({}) {
  const headers = ['Name', 'Email', 'Phone', 'Department', 'Actions'];

  const events = [
    { _id: 1, name: 'Shivani', email: 'Shivani@gmail.com', phone: '66666666', department: 'IT' },
    { _id: 2, name: 'John', email: 'John@gmail.com', phone: '77777777', department: 'HR' },
  ];

  const TableRow = ({ event }) => {
    return (
      <tr>
        <td>
          <Link to={`/event/${event._id}`} className="text-decoration-none">{event.name}</Link>
        </td>
        <td>{event.email}</td>
        <td>{event.phone}</td>
        <td>{event.department}</td>
        <td>
          <i
            className='bi bi-pencil-fill text-warning me-4'
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Edit"
            onClick={() => { }}
          ></i>
          <i
            className='bi bi-trash-fill text-danger me-4'
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Delete"
            onClick={() => { }}
          ></i>
        </td>
      </tr>
    );
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map((header, i) => (
            <th key={i}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {events.map(event => (
          <TableRow key={event._id} event={event} />
          
        ))}
      </tbody>
    </table>
  );
}

export default EventTable;
