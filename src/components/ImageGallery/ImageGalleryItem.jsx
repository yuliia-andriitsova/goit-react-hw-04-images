import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

function ImageGalleryItem({ id, web, tags, largeImageURL, toggleModal }) {
  return (
    <li
      className={css.ImageGalleryItem}
      key={id}
      onClick={() => toggleModal(largeImageURL)}
    >
      <img src={web} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
  );
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  web: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
};
