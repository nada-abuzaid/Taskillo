import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import TaskForm from '../TaskForm';
import { setTaskOpen } from '../../state/modal';
import { BiX } from 'react-icons/bi';

export default function Modal({ handleSubmit, values={} }) {
  const { openTask } = useSelector((state) => state.modal.value);
  const { type } = useSelector((state) => state.action.value);

  const display = openTask ? 'show' : '';
  const dispatch = useDispatch();
  return (
    openTask && (
      <Modall className={`modal ${display}`} style={{ display: 'block' }}>
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{`${type} Task`}</h5>
              <BiX
                className="btn-close"
                onClick={() => dispatch(setTaskOpen(!openTask))}
              />
            </div>
            <div className="modal-body">
              <TaskForm handleSubmit={handleSubmit} values={values}/>
            </div>
          </div>
        </div>
      </Modall>
    )
  );
}

const Modall = styled.div`
  background: rgba(0, 0, 0, 0.4);
  .modal-header {
    padding: 0.9rem;
  }
  .modal-content {
    background: #21222c;
    color: #fff;
    padding: 10px 20px;
    border-radius: 20px;
    border: none;
    outline: none;
  }
  .btn-close{
    color: #fff;
  }
  .form-control {
    background: #282a36;
    border: none;
    color: #fff;
    padding: 8px;
  }
  .modal-footer {
    flex-wrap: np-wrap;
    align-items: center;
  }
  .modal-body {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 1rem;
  }
  .submit-div {
    width: 75%;
  }
  .add-task-btn {
    width: 100%;
  }
  .btn.btn-secondary {
    width: 20%;
  }
  .modal-body {
    justify-content: space-between;
  }
  select.option-default {
    color: gray;
  }
  @media (max-width: 630px) {
    .add-task-btn {
      width: 50%;
    }
    .btn.btn-secondary {
      width: 40%;
    }
  }
`;
