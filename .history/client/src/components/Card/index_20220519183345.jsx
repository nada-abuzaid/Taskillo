import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTask } from '../../state/tasks';
import styled from 'styled-components';

export default function Card({
  status,
  taskTitle,
  description,
  endDate,
//   priority, 
}) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks.value);

  const getDetails = async (projectid) => {
    try {
      const response = await axios.get(
        `/api/v1/project/${projectid}/tasksSection`
      );
      if (response.status === 200) {
        dispatch(setTask({ tasks: response.data.data }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetails(id);
  }, [id]);

  return (
    <Cards>
      <span>{status}</span>
      <span className="fw-bold">{taskTitle}</span>
      <p className="task-desc">{description}</p>
      <div>
        <span className="task-date">{endDate}</span>
      </div>
    </Cards>
  );
}

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 55%;
  border-radius: 10px;
  padding: 10px;
  height: 100%;
  background: #21222c;
  color: #fff;
  .task-desc,
  .task-date {
    color: #818098;
  }
  .task-date {
    color: #818098;
    font-weight: bold;
    font-size: 0.9rem;
  }
`;
