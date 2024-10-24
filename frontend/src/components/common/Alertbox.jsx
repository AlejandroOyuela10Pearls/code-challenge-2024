import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Textarea } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import Icon from './Icon';
import { clearAlert } from '../../services/redux-toolkit/slices/listenerSlice';

/** @type {*} */
const alertStyles = {
  info: {
    borderColor: 'border-[#82BDFF]',
    backgroundColor: 'bg-[#E6F2FF]',
    icon: 'info-circle', 
  },
  warning: {
    borderColor: 'border-[#FFD166]',
    backgroundColor: 'bg-[#FFF4E5]',
    icon: 'triangle-exclamation', 
  },
  success: {
    borderColor: 'border-[#8ACFC2]',
    backgroundColor: 'bg-[#E8F6F3]',
    icon: 'circle-check', 
  },
  error: {
    borderColor: 'border-[#FF7273]',
    backgroundColor: 'bg-[#FFEDED]',
    icon: 'circle-exclamation', 
  },
};

const AlertBox = ({
  show = false,
  text,
  textClasses,
  extraClasses,
  type = 'info',
  autoHide = false,
  showCloseButton = true,
  onClosed = () => {},
  children,
}) => {
  const dispatch = useDispatch();
  const [isVisible, setIsVisible] = useState(show);
  const [animationClass, setAnimationClass] = useState();
  const { borderColor, backgroundColor, icon } = alertStyles[type] || alertStyles.info;

  useEffect(() => {
    let timeoutId;
    if (show) {
      setAnimationClass('animate-easein');
      setIsVisible(true);
      if (autoHide) {
        timeoutId = setTimeout(() => {
          setIsVisible(false);
          onClosed();
          dispatch(clearAlert());
        }, 5000);
      }
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [show, autoHide, dispatch, onClosed]);

  const handleAnimationEnd = useCallback(
    (event) => {
      if (!autoHide) return;
      if (event.animationName === 'fadeout') {
        setIsVisible(false);
        onClosed();
        dispatch(clearAlert());
      } else if (event.animationName === 'fadein') {
        setAnimationClass('animate-easeout');
      }
    },
    [autoHide, dispatch, onClosed],
  );

  const handleClose = useCallback(() => {
    setIsVisible(false);
    onClosed();
    dispatch(clearAlert());
  }, [dispatch, onClosed]);

  if (!isVisible) return null;

  return (
    <div
      className={`${animationClass} flex flex-row items-center justify-between rounded border ${borderColor} ${backgroundColor} gap-4 py-2 px-4 text-left ${extraClasses}`}
      onAnimationEnd={handleAnimationEnd}
      style={{ zIndex: 999, width: "400px", minHeight: "50px" }} 
      data-testid="alert-box"
    >
      {/* Icon on the left, set to black */}
      <Icon
        icon={`fa-solid fa-${icon}`}
        className="text-lg text-black" // Set icon to black
        aria-hidden="true"
        data-testid="alert-box-icon"
      />
  
      {/* Message text, set to black */}
      <div className={`flex-grow text-black ${textClasses}`} style={{ overflow: "hidden" }}>
        <span>{text}</span> 
      </div>
    </div>
  );
  
};

AlertBox.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  textClasses: PropTypes.string,
  extraClasses: PropTypes.string,
  type: PropTypes.oneOf(['info', 'warning', 'success', 'error']),
  autoHide: PropTypes.bool,
  showContact: PropTypes.bool,
  showCloseButton: PropTypes.bool,
  onClosed: PropTypes.func,
  children: PropTypes.node,
};

AlertBox.defaultProps = {
  text: '',
  extraClasses: '',
  type: 'info',
  autoHide: false,
  showContact: false,
  showCloseButton: true,
  onClosed: () => {},
};

export default AlertBox;
