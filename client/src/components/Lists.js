import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserLists, addList, removeList } from '../actions/list';

const Lists = (props) => {
  const [formData, setFormData] = useState({
    name: '',
    addList: false,
  });

  useEffect(() => {
    props.getUserLists();
  }, []);

  const { name, addList } = formData;

  const onAddList = () => {
    setFormData({ ...formData, addList: !addList });
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSave = (e) => {
    props.addList(formData);
    if (name.trim().length > 0) {
      setFormData({ ...formData, name: '', addList: false });
    }
  };

  const onRemove = (id) => {
    props.removeList(id);
  };

  return (
    <div>
      <div className='page' id='lists-page'>
        <div className='page-header'>
          <h1 className='page-title'>My Lists</h1>
          <button onClick={() => onAddList()}>
            <img alt='' src='/img/icons8-add-48.png' />
            Add List
          </button>
        </div>
        <div className='page-content'>
          <div id='lists'>
            {props.lists.lists.map((list) => (
              <div className='list' key={list._id}>
                <Link to={`/my-lists/${list._id}`} className='list-name'>
                  {list.name}
                </Link>
                <button className='remove' onClick={() => onRemove(list._id)}>
                  <img alt='' src='/img/icons8-cancel-48.png' />
                  <img
                    alt=''
                    className='hovered'
                    src='/img/icons8-cancel-48-red.png'
                  />
                </button>
              </div>
            ))}
            {addList && (
              <div className='list'>
                <input
                  type='text'
                  name='name'
                  value={name}
                  onChange={(e) => onChange(e)}
                />
                <div className='buttons'>
                  <button className='save' onClick={(e) => onSave(e)}>
                    <img alt='' src='/img/icons8-save-48-blue.png' />
                    <span>SAVE</span>
                  </button>
                  <button className='remove' onClick={() => onAddList()}>
                    <img alt='' src='/img/icons8-cancel-48.png' />
                    <img
                      alt=''
                      className='hovered'
                      src='/img/icons8-cancel-48-red.png'
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Lists.propTypes = {
  lists: PropTypes.object.isRequired,
  getUserLists: PropTypes.func.isRequired,
  addList: PropTypes.func.isRequired,
  removeList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps, { getUserLists, addList, removeList })(
  Lists
);
