import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, tags, toggleModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = e => {
    if (e.code === 'Escape') {
      toggleModal();
    }
  };

  const oncloseModal = e => {
    if (e.currentTarget === e.target) {
      toggleModal();
    }
  };

  return (
    <div className={css.Overlay} onClick={oncloseModal}>
      <div className={css.Modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
};

export { Modal };

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
};

//---------------------------------------------------
// import { Component } from 'react';
// import css from './Modal.module.css';
// import PropTypes from 'prop-types';

// export class Modal extends Component {
//   state = { isOpen: false };

//   componentDidMount() {
//     window.addEventListener('keydown', this.onKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.onKeyDown);
//   }

//   onKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.toggleModal();
//     }
//   };

//   oncloseModal = e => {
//     if (e.currentTarget === e.target) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props;
//     return (
//       <div className={css.Overlay} onClick={this.oncloseModal}>
//         <div className={css.Modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     );
//   }
// }

// Modal.propTypes = {
//   toggleModal: PropTypes.func.isRequired,
//   largeImageURL: PropTypes.string.isRequired,
//   tags: PropTypes.string,
// };
