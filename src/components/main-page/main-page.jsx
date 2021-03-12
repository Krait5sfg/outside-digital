import React, {Fragment, useState} from 'react';
import Modal from '../modal/modal';

const MainPage = () => {
  // const [isModalActive, setModalActive] = useState(false);

  return (
    <Fragment>
      {/* <section className="main">
        <h1 class="visually-hidden">Сайт Outside digital</h1>
        <button className="main__button">Налоговый вычет</button>
      </section> */}
      <Modal />
    </Fragment>
  )
}

export default MainPage;