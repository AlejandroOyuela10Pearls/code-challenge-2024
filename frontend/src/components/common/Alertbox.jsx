import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Textarea } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import Icon from './Icon';
import { clearAlert } from '../../redux-toolkit/slices/employee-payroll-onboarding/uiSlice';

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
      className={`${animationClass} flex items-start justify-between rounded border ${borderColor} ${backgroundColor} gap-1 py-2 pl-4 text-left ${extraClasses}`}
      onAnimationEnd={handleAnimationEnd}
      data-testid="alert-box"
    >
      <div className="flex items-start">
        <Icon
          icon="fa-solid fa-bell" 
          className="mt-[0.125rem] text-lg"
          aria-hidden="true"
          data-testid="alert-box-icon"
        />
        {children || (
          <Textarea
            label="Message"
            labelPlacement="outside"
            placeholder="Alert message"
            value={text}
            className={`pl-2 bg-transparent border-none ${textClasses}`}
            readOnly
            minRows={1}
            maxRows={4}
            data-testid="message-body"
          />
        )}
      </div>
      {showCloseButton && (
        <button
          onClick={handleClose}
          className="ml-4 rounded p-1"
          aria-label="Close alert"
          type="button"
        >
          <Icon icon={['fas', 'xmark']} className="text-gray-500 text-sm" />
        </button>
      )}
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
