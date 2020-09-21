import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = (props) => {
  return (
    <div className='alerts'>
      {props.alerts.map((alert, id) => (
        <div className={`alert ${alert.alertType}`} key={id}>
          Alert: {alert.msg}
        </div>
      ))}
    </div>
  );
};

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alerts,
});

export default connect(mapStateToProps)(Alert);
