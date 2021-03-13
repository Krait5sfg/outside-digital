import React, {Fragment, useState} from 'react';
import Modal from '../modal/modal';
import {EscapeCode} from '../../utils/utils';


const MainPage = () => {
  const [isModalActive, setModalActive] = useState(false);

  React.useEffect(() => {
    isModalActive ?
      document.addEventListener(`keydown`, onEscButtonPress, false) :
      document.removeEventListener(`keydown`, onEscButtonPress, false);
  });

  const onEscButtonPress = (evt) => {
    if (evt.key === EscapeCode.STRING && evt.keyCode === EscapeCode.NUMBER) {
      setModalActive(false);
    }
  };

  const onMainButtonClick = () => {
    setModalActive(true);
  };

  const onModalButtonCloseClick = () => {
    setModalActive(false);
  };

  const onModalButtonSubmitClick = () => {
    setModalActive(false);
  };

  return (
    <Fragment>
      <section className={isModalActive ? `main main--not-active` : `main`}>
        <button className="main__button" onClick={onMainButtonClick}>Налоговый вычет</button>
      </section>
      <Modal
        isModalActive={isModalActive}
        onModalButtonCloseClick={onModalButtonCloseClick}
        onModalButtonSubmitClick={onModalButtonSubmitClick} />
    </Fragment>
  )
}

export default MainPage;