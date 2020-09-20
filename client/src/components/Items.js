import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getList, updateList } from '../actions/list';
import { addItem, updateItem, removeItem } from '../actions/item';
import { useParams } from 'react-router-dom';

const Items = (props) => {
  const [formData, setFormData] = useState({
    listName: '',
    moveCompleted: false,
    prioritize: false,
    editList: false,
    items: [],
    editItem: '',
    itemName: '',
    itemPriority: '',
    addItem: false,
    addItemName: '',
    addItemPriority: '',
  });

  // get params
  let params = useParams();

  // on page load, get the list
  useEffect(() => {
    props.getList(params.id);
  }, []);

  // once doc has loaded, populate state
  useEffect(() => {
    // verify list exists in state
    if (props.lists.list) {
      const { name, moveCompleted, prioritize, items } = props.lists.list;
      setFormData({
        ...formData,
        listName: name,
        moveCompleted,
        prioritize,
        editList: false,
        items,
        editItem: '',
        itemName: '',
        itemPriority: '',
      });
    }
  }, [props.lists.list]);

  // update list on list state changes (moveCompleted and prioritize)
  useEffect(() => {
    if (props.lists.list) {
      onUpdateList();
    }
  }, [formData.moveCompleted, formData.prioritize]);

  // Variables
  const {
    listName,
    moveCompleted,
    prioritize,
    editList,
    items,
    editItem,
    itemName,
    itemPriority,
    addItem,
    addItemName,
    addItemPriority,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onUpdateList = () => {
    // run update list action
    props.updateList({
      id: props.lists.list._id,
      name: listName,
      moveCompleted,
      prioritize,
    });
  };

  // list functions
  const onMoveCompleted = () => {
    setFormData({ ...formData, moveCompleted: !moveCompleted });
  };
  const onPrioritizeList = () => {
    setFormData({ ...formData, prioritize: !prioritize });
  };
  const onEditList = () => {
    setFormData({ ...formData, editList: !editList });
  };
  const onCancelEditList = () => {
    setFormData({
      ...formData,
      listName: props.lists.list.name,
      editList: !editList,
    });
  };

  const onUpdateItem = (completed) => {
    // run update item action
    props.updateItem({
      id: editItem,
      name: itemName,
      priority: itemPriority,
      completed,
    });
  };

  // item functions
  const onCompletedClick = (id, name, priority, completed) => {
    // setFormData({...formData, })
    props.updateItem({
      id,
      name,
      priority,
      completed: !completed,
    });
  };
  const onEditItem = (editItem, itemName, itemPriority) => {
    setFormData({ ...formData, editItem, itemName, itemPriority });
  };
  const onCancelEditItem = () => {
    setFormData({
      ...formData,
      editItem: '',
      itemName: '',
      itemPriority: '',
    });
  };
  const onRemoveItem = (id) => {
    // call removeItem action
    props.removeItem(id, params.id);
  };

  // Add Item functions
  const onAddItemCLick = () => {
    setFormData({
      ...formData,
      addItem: !addItem,
      addItemName: '',
      addItemPriority: '',
    });
  };
  const onAddItemSave = () => {
    // call additem action
    props.addItem({
      name: addItemName,
      priority: addItemPriority,
      list: params.id,
    });
    if (addItemName.trim().length > 0 && addItemPriority.length > 0) {
      setFormData({
        ...formData,
        addItemName: '',
        addItemPriority: '',
        addItem: false,
      });
    }
  };

  // DOM elements
  const pageTitle = editList ? (
    <h1 className='page-title'>
      <input
        type='text'
        name='listName'
        value={listName}
        onChange={(e) => onChange(e)}
      />
      <button className='cancel' onClick={() => onCancelEditList()}>
        <img alt='' src='/img/icons8-cancel-48.png' />
      </button>
      <button className='save' onClick={() => onUpdateList()}>
        <img alt='' src='/img/icons8-save-48-blue.png' />
        <span>SAVE</span>
      </button>
    </h1>
  ) : (
    <h1 className='page-title'>
      {listName}
      <button className='edit' onClick={() => onEditList()}>
        <img alt='' src='/img/icons8-edit-file-48.png' />
      </button>
    </h1>
  );

  const additemDOM = (
    <div className='item add-item'>
      <button className='completed'>
        <img alt='' src='/img/icons8-round-48.png' />
      </button>
      <input
        type='text'
        name='addItemName'
        value={addItemName}
        onChange={(e) => onChange(e)}
      />
      <div className='priorities'>
        <p
          className={`priority high ${addItemPriority === 'high' && 'active'}`}
          onClick={() => setFormData({ ...formData, addItemPriority: 'high' })}
        >
          HIGH
        </p>
        <p
          className={`priority med ${addItemPriority === 'med' && 'active'}`}
          onClick={() => setFormData({ ...formData, addItemPriority: 'med' })}
        >
          MED
        </p>
        <p
          className={`priority low ${addItemPriority === 'low' && 'active'}`}
          onClick={() => setFormData({ ...formData, addItemPriority: 'low' })}
        >
          LOW
        </p>
      </div>
      <div className='buttons'>
        <button className='cancel' onClick={() => onAddItemCLick()}>
          <img alt='' src='/img/icons8-cancel-48.png' />
          <span>CANCEL</span>
        </button>
        <button className='save' onClick={() => onAddItemSave()}>
          <img alt='' src='/img/icons8-save-48-blue.png' />
          <span>SAVE</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className='page' id='single-list-page'>
      <div className='page-header'>
        {pageTitle}
        <button
          className='list-header-button'
          onClick={() => onMoveCompleted()}
        >
          {moveCompleted ? (
            <img alt='' src='/img/icons8-checked-48.png' />
          ) : (
            <img alt='' src='/img/icons8-round-48.png' />
          )}
          <span>Move Completed Tasks</span>
        </button>
        <button
          className='list-header-button'
          onClick={() => onPrioritizeList()}
        >
          {prioritize ? (
            <img alt='' src='/img/icons8-checked-48.png' />
          ) : (
            <img alt='' src='/img/icons8-round-48.png' />
          )}
          <span>Prioritize</span>
        </button>
        <button onClick={() => onAddItemCLick()}>
          <img alt='' src='/img/icons8-add-48.png' />
          Add Item
        </button>
      </div>
      <div className='page-content'>
        <div id='items'>
          {items.map((item) => (
            <div className='item' key={item._id}>
              <button
                className='completed'
                onClick={() =>
                  onCompletedClick(
                    item._id,
                    item.name,
                    item.priority,
                    item.completed
                  )
                }
              >
                {item.completed ? (
                  <img alt='' src='/img/icons8-checked-48.png' />
                ) : (
                  <img alt='' src='/img/icons8-round-48.png' />
                )}
              </button>
              {editItem === item._id ? (
                <Fragment>
                  <input
                    type='text'
                    name='itemName'
                    value={itemName}
                    onChange={(e) => onChange(e)}
                  />
                  <div className='priorities'>
                    <p
                      className={`priority high ${
                        itemPriority === 'high' && 'active'
                      }`}
                      onClick={() => onEditItem(editItem, itemName, 'high')}
                    >
                      HIGH
                    </p>
                    <p
                      className={`priority med ${
                        itemPriority === 'med' && 'active'
                      }`}
                      onClick={() => onEditItem(editItem, itemName, 'med')}
                    >
                      MED
                    </p>
                    <p
                      className={`priority low ${
                        itemPriority === 'low' && 'active'
                      }`}
                      onClick={() => onEditItem(editItem, itemName, 'low')}
                    >
                      LOW
                    </p>
                  </div>
                  <div className='buttons'>
                    <button
                      className='cancel'
                      onClick={() => onCancelEditItem()}
                    >
                      <img alt='' src='/img/icons8-cancel-48.png' />
                      <span>CANCEL</span>
                    </button>
                    <button
                      className='save'
                      onClick={() => onUpdateItem(item.completed)}
                    >
                      <img alt='' src='/img/icons8-save-48-blue.png' />
                      <span>SAVE</span>
                    </button>
                  </div>
                </Fragment>
              ) : (
                <Fragment>
                  <p className={`item-name ${item.completed && 'completed'}`}>
                    {item.name}
                  </p>
                  <div className='priorities'>
                    <p
                      className={`priority ${item.priority} active ${
                        item.completed && 'completed'
                      }`}
                    >
                      {item.priority.toUpperCase()}
                    </p>
                  </div>
                  <div className='buttons'>
                    <button
                      className='edit'
                      onClick={() =>
                        onEditItem(item._id, item.name, item.priority)
                      }
                    >
                      <img alt='' src='/img/icons8-edit-file-48.png' />
                    </button>
                    <button
                      className='remove'
                      onClick={() => onRemoveItem(item._id)}
                    >
                      <img alt='' src='/img/icons8-cancel-48.png' />
                      <img
                        className='hovered'
                        alt=''
                        src='/img/icons8-cancel-48-red.png'
                      />
                    </button>
                  </div>
                </Fragment>
              )}
            </div>
          ))}
          {addItem && additemDOM}
        </div>
      </div>
    </div>
  );
};

Items.propTypes = {
  lists: PropTypes.object.isRequired,
  getList: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lists: state.lists,
});

export default connect(mapStateToProps, {
  getList,
  updateList,
  addItem,
  updateItem,
  removeItem,
})(Items);
