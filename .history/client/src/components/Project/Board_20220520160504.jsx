import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Text } from '..';
import Section from '../Section';
import { setSection } from '../../state/sections';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { setTask } from '../../state/tasks';

export default function Board() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { sections } = useSelector((state) => state.sections.value);
  const { tasks } = useSelector((state) => state.tasks.value);

  useEffect(() => {
    async function getSections(projectid) {
      try {
        const response = await axios.get(
          `/api/v1/project/${projectid}/sections`
        );
        if (response.status === 200) {
          dispatch(setSection({ sections: response.data.data }));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getSections(id);
  }, [dispatch, id]);

  const onDragEnd = ({ source, destination, draggableId }) => {
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);

      dispatch(setTask({ tasks: items }));
    } else {
      onDragStart({ destination, draggableId });
    }
  };

  const onDragStart = async ({ destination, draggableId }) => {
    const draggableTask = tasks.filter((task) => task.id === +draggableId);
    try {
      const response = await axios.put(`/api/v1/task/drag`, {
        destinationSection: +destination.droppableId,
        taskId: draggableTask[0].id,
      });
      if (response.status === 200) {
        const dragged = {
          ...response.data.data.task,
          sectionname: response.data.data.sectionname,
        };
        const ordered = tasks.map((task) => {
          if (task.id === dragged.id) {
            return dragged;
          } else {
            return task;
          }
        });
        dispatch(setTask({ tasks: ordered }));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="page-container d-flex flex-row">
      <Title className="container">
        <div>
          <Text text="Tasks & Sections" className="text-white title" />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="app">
            {(provided) => {
              <div
                className="section-container d-flex"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {sections.map(({ id, name }, index) => {
                  return <Section name={name} sectionId={id} key={id} />;
                })}
              </div>;
            }}
          </Droppable>
        </DragDropContext>
      </Title>
    </div>
  );
}

const Title = styled.div`
  .title {
    font-weight: 600;
    margin: 20px;
  }
  .section-container {
    gap: 20px;
    margin-left: 20px;
    overflow-x: auto;
    ::-webkit-scrollbar {
      width: 1px;
    }
    ::-webkit-scrollbar-thumb {
      background: #818098;
      border-radius: 50px;
      width: 0.5px;
    }
  }
  .container {
    margin-top: 20px;
  }
`;
